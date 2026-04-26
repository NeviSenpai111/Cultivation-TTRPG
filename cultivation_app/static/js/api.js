// =============================================================================
// api.js — In-memory state + REST persistence to the Flask backend.
// State is the single source of truth; saveState() PUTs the whole blob back.
// Saves are debounced so a flurry of edits collapses into one network round-trip.
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

export async function loadState() {
  try {
    const res = await fetch('/api/data', { method: 'GET' });
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

async function _putRaw() {
  try {
    setConnection(_connected, 'saving…');
    const res = await fetch('/api/data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    setConnection(true, 'saved');
    _saveListeners.forEach(fn => { try { fn(); } catch {} });
  } catch (e) {
    setConnection(false, e.message || 'save failed');
    console.error('Save failed:', e);
  }
}

const _putDebounced = debounce(_putRaw, 250);

export function saveState() { _putDebounced(); }

export async function saveStateNow() { await _putRaw(); }

// Replace the in-memory state wholesale (used by Import).
export function replaceState(newState) {
  Object.assign(state, normalize(newState));
  saveState();
}
