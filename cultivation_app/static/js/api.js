// =============================================================================
// api.js — In-memory state + REST persistence to the Flask backend.
//
// State is the single source of truth. Each granular save function PUTs only
// the affected entity (character or library entry) so that the server can
// authorize per-entity. Per-entity debouncing means a flurry of edits to one
// thing collapses into one network round-trip without delaying saves to
// other things.
//
// Roles enforced server-side:
//   gm        — full read/write
//   player    — read all, write only their claimed character
//   anonymous — read only
// =============================================================================

import { debounce } from './ui.js';

const SCHEMA_VERSION = 2;

const DEFAULT_STATE = {
  version: SCHEMA_VERSION,
  meta: { mode: 'gm' },
  library: {
    techniques: [],
    methods: [],
    items: [],
    treasures: []
  },
  characters: []
};

export const state = structuredClone(DEFAULT_STATE);

// ---- Session ---------------------------------------------------------------

export const session = { role: 'anonymous', characterId: null };

let _sessionListeners = [];
export function onSessionChange(fn) { _sessionListeners.push(fn); }
function _emitSession() { _sessionListeners.forEach(fn => { try { fn(session); } catch {} }); }

export function isGM() { return session.role === 'gm'; }
export function isPlayer() { return session.role === 'player'; }
export function canEditCharacter(c) {
  if (!c) return false;
  if (isGM()) return true;
  return isPlayer() && c.id === session.characterId;
}

export async function fetchSession() {
  try {
    const res = await fetch('/api/session', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    session.role = data.role || 'anonymous';
    session.characterId = data.character_id || null;
  } catch {
    session.role = 'anonymous';
    session.characterId = null;
  }
  _emitSession();
  return session;
}

export async function loginAsGM(password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'login failed');
  }
  await fetchSession();
}

export async function logout() {
  await fetch('/api/logout', { method: 'POST', credentials: 'same-origin' });
  await fetchSession();
}

export async function claimCharacter(characterId) {
  const res = await fetch('/api/claim', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ character_id: characterId })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'claim failed');
  }
  await fetchSession();
}

// ---- Connection indicator --------------------------------------------------

let _connected = false;
let _saveListeners = [];

export function onAfterSave(fn) { _saveListeners.push(fn); }

function setConnection(ok, msg) {
  _connected = ok;
  const el = document.getElementById('connection');
  if (!el) return;
  if (ok) {
    el.className = 'connection ok';
    el.textContent = '● Synced' + (msg ? ' · ' + msg : '');
  } else {
    el.className = 'connection err';
    el.textContent = '● Offline' + (msg ? ' · ' + msg : '');
  }
}

export function isConnected() { return _connected; }

// ---- Read ------------------------------------------------------------------

export async function loadState() {
  try {
    const res = await fetch('/api/data', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    Object.assign(state, normalize(data));
    setConnection(true, 'loaded');
    return state;
  } catch (e) {
    setConnection(false, e.message || 'load failed');
    console.error('Load failed:', e);
    return state;
  }
}

function normalize(data) {
  if (!data || typeof data !== 'object') return structuredClone(DEFAULT_STATE);
  if (!data.library || typeof data.library !== 'object') data.library = {};
  for (const key of ['techniques', 'methods', 'items', 'treasures']) {
    if (!Array.isArray(data.library[key])) data.library[key] = [];
  }
  if (!Array.isArray(data.characters)) data.characters = [];
  if (!data.meta || typeof data.meta !== 'object') data.meta = { mode: 'gm' };
  data.version = SCHEMA_VERSION;
  return data;
}

// ---- Granular writes -------------------------------------------------------

async function _send(method, url, body) {
  setConnection(_connected, 'saving…');
  try {
    const res = await fetch(url, {
      method,
      credentials: 'same-origin',
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || ('HTTP ' + res.status));
    }
    setConnection(true, 'saved');
    _saveListeners.forEach(fn => { try { fn(); } catch {} });
    return res;
  } catch (e) {
    setConnection(false, e.message || 'save failed');
    console.error(method + ' ' + url + ' failed:', e);
    throw e;
  }
}

// Per-entity debouncers so flurries of edits on one entity collapse without
// blocking saves on other entities.
const _entityDebouncers = new Map();
function _debouncedFor(key, fn, ms = 250) {
  let d = _entityDebouncers.get(key);
  if (!d) {
    d = debounce(fn, ms);
    _entityDebouncers.set(key, d);
  }
  return d;
}

export function saveCharacter(c) {
  if (!c || !c.id) return;
  const fn = () => _send('PUT', '/api/characters/' + encodeURIComponent(c.id), c)
    .catch(() => {});
  _debouncedFor('char:' + c.id, fn)();
}

export async function saveCharacterNow(c) {
  if (!c || !c.id) return;
  await _send('PUT', '/api/characters/' + encodeURIComponent(c.id), c);
}

export async function createCharacterRemote(c) {
  if (!c || !c.id) return;
  await _send('POST', '/api/characters', c);
}

export async function deleteCharacterRemote(id) {
  await _send('DELETE', '/api/characters/' + encodeURIComponent(id));
}

export async function saveLibraryEntry(kind, entry) {
  if (!entry || !entry.id) return;
  await _send('PUT', '/api/library/' + kind + '/' + encodeURIComponent(entry.id), entry);
}

export async function createLibraryEntry(kind, entry) {
  if (!entry || !entry.id) return;
  await _send('POST', '/api/library/' + kind, entry);
}

export async function deleteLibraryEntryRemote(kind, id) {
  await _send('DELETE', '/api/library/' + kind + '/' + encodeURIComponent(id));
}

// Bulk replace (Import / Erase) — GM only on the server side.
export async function replaceState(newState) {
  Object.assign(state, normalize(newState));
  await _send('PUT', '/api/data', state);
}
