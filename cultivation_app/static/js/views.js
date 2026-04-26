// =============================================================================
// views.js — Top-level page renderers + the character editor.
// =============================================================================

import {
  h, clear, openDialog, closeDialog, confirmDialog, notice,
  fieldText, fieldNumber, fieldSelect, fieldTextarea, sectionHeader,
  openPicker, uid, nowIso, debounce
} from './ui.js';

import { state, saveState, replaceState } from './api.js';

import {
  REALMS, SUB_STAGES, ORIGINS, AFFILIATIONS, DAOS,
  ROOT_GRADES, FIVE_ELEMENTS, ELEMENT_CN, MUTANT_ROOTS, HEAVENLY_BODIES,
  getRootElementSpec, arePairHarmonious,
  computeDerived, advanceCharacterStage,
  TECHNIQUE_TIERS, METHOD_TYPES, ITEM_CATEGORIES,
  TREASURE_TIERS, TREASURE_CATEGORIES, favorState
} from './domain.js';

import {
  openTechniqueEditor, openTreasureEditor, openMethodEditor, openItemEditor
} from './editors.js';

import { openDetails, openUseTechniqueDialog } from './details.js';

// ============================================================================
// ROUTER
// ============================================================================

let currentView = 'home';
let routeParams = {};

const VIEWS = {
  home: renderHome,
  techniques: () => renderLibrary('techniques'),
  treasures:  () => renderLibrary('treasures'),
  methods:    () => renderLibrary('methods'),
  items:      () => renderLibrary('items'),
  characters: renderCharacterList,
  'character-edit': renderCharacterEdit,
  data: renderData
};

export function navigate(view, params = {}) {
  currentView = view;
  routeParams = params;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view ||
      (view === 'character-edit' && el.dataset.view === 'characters'));
  });
  const main = document.getElementById('main');
  clear(main);
  (VIEWS[view] || renderHome)(main);
  window.scrollTo(0, 0);
}

export function refreshCounts() {
  document.getElementById('count-techniques').textContent = state.library.techniques.length || '';
  document.getElementById('count-treasures').textContent = state.library.treasures.length || '';
  document.getElementById('count-methods').textContent = state.library.methods.length || '';
  document.getElementById('count-items').textContent = state.library.items.length || '';
  document.getElementById('count-characters').textContent = state.characters.length || '';
}

// ============================================================================
// HOME
// ============================================================================

function renderHome(root) {
  root.appendChild(h('div', { class: 'page-header' },
    h('div', { class: 'page-title' },
      h('span', { class: 'chinese' }, '逆'),
      h('span', { class: 'english' }, 'Dashboard')),
    h('div', { class: 'page-actions' },
      h('button', { class: 'btn primary', onclick: openNewCharacterDialog }, 'New Character'),
      h('button', { class: 'btn', onclick: () => openTechniqueEditor(null, () => navigate('home')) }, 'New Technique'),
      h('button', { class: 'btn', onclick: () => openTreasureEditor(null, () => navigate('home')) }, 'New Treasure')
    )
  ));

  root.appendChild(h('div', { class: 'ethos' },
    'Ruthless pragmatism. Talent is a cruel lottery. Preparation beats power. ' +
    'The Heavens are hostile, and defiance is earned through suffering — not granted. ' +
    'No plot armor, no chosen-one safety net. If you die unprepared, you die.'));

  const stats = h('div', { class: 'stat-grid' });
  [
    [state.characters.length, 'Characters'],
    [state.library.techniques.length, 'Techniques'],
    [state.library.treasures.length, 'Treasures'],
    [state.library.methods.length, 'Methods'],
    [state.library.items.length, 'Items']
  ].forEach(([n, label]) => stats.appendChild(h('div', { class: 'stat' },
    h('div', { class: 'stat-value' }, String(n)),
    h('div', { class: 'stat-label' }, label))));
  root.appendChild(stats);

  if (state.characters.length) {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('人物', 'Characters'));
    const grid = h('div', { class: 'grid-list' });
    [...state.characters]
      .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
      .slice(0, 6)
      .forEach(c => grid.appendChild(characterCard(c)));
    sec.appendChild(grid);
    root.appendChild(sec);
  }

  const recent = [
    ...state.library.techniques.map(x => ({ ...x, kind: 'technique' })),
    ...state.library.treasures.map(x => ({ ...x, kind: 'treasure' })),
    ...state.library.methods.map(x => ({ ...x, kind: 'method' })),
    ...state.library.items.map(x => ({ ...x, kind: 'item' }))
  ].sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || '')).slice(0, 6);

  if (recent.length) {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('典籍', 'Recent Library Entries'));
    const grid = h('div', { class: 'grid-list' });
    recent.forEach(e => grid.appendChild(libraryCard(e.kind + 's', e)));
    sec.appendChild(grid);
    root.appendChild(sec);
  }

  if (!state.characters.length && !recent.length) {
    root.appendChild(h('div', { class: 'note-box' },
      'Empty ledger. Start by creating Techniques, Treasures, or a Character. ' +
      'Your library and characters auto-save to the server (data/ledger.json).'));
  }
}

// ============================================================================
// LIBRARY (techniques / treasures / methods / items)
// ============================================================================

const LIBRARY_LABELS = {
  techniques: { cn: '术法', en: 'Techniques', singular: 'Technique', filter: 'tier', filterValues: TECHNIQUE_TIERS, openEditor: openTechniqueEditor },
  treasures:  { cn: '法宝', en: 'Treasures', singular: 'Treasure', filter: 'tier', filterValues: TREASURE_TIERS, openEditor: openTreasureEditor },
  methods:    { cn: '功法', en: 'Cultivation Methods', singular: 'Method', filter: 'type', filterValues: METHOD_TYPES, openEditor: openMethodEditor },
  items:      { cn: '器物', en: 'Items', singular: 'Item', filter: 'category', filterValues: ITEM_CATEGORIES, openEditor: openItemEditor }
};

const _libSearch = { techniques: '', treasures: '', methods: '', items: '' };
const _libFilter = { techniques: 'All', treasures: 'All', methods: 'All', items: 'All' };

function renderLibrary(kind) {
  const root = document.getElementById('main');
  const label = LIBRARY_LABELS[kind];

  root.appendChild(h('div', { class: 'page-header' },
    h('div', { class: 'page-title' },
      h('span', { class: 'chinese' }, label.cn),
      h('span', { class: 'english' }, label.en)),
    h('div', { class: 'page-actions' },
      h('button', { class: 'btn primary',
        onclick: () => label.openEditor(null, () => navigate(kind))
      }, '+ New ' + label.singular))
  ));

  const toolbar = h('div', { class: 'toolbar' });
  const searchInput = h('input', {
    type: 'text', class: 'search-input',
    placeholder: 'Search ' + label.en.toLowerCase() + '…',
    value: _libSearch[kind]
  });
  searchInput.addEventListener('input', () => {
    _libSearch[kind] = searchInput.value;
    renderLibraryGrid(kind, grid);
  });
  toolbar.appendChild(searchInput);

  const chips = h('div', { class: 'filter-chips' });
  ['All', ...label.filterValues].forEach(f => {
    chips.appendChild(h('button', {
      class: 'chip' + (_libFilter[kind] === f ? ' active' : ''),
      onclick: () => { _libFilter[kind] = f; navigate(kind); }
    }, f));
  });
  toolbar.appendChild(chips);
  root.appendChild(toolbar);

  const grid = h('div', { class: 'grid-list' });
  root.appendChild(grid);
  renderLibraryGrid(kind, grid);
}

function renderLibraryGrid(kind, grid) {
  clear(grid);
  const label = LIBRARY_LABELS[kind];
  const search = (_libSearch[kind] || '').toLowerCase().trim();
  const filter = _libFilter[kind];
  let entries = state.library[kind];

  if (filter && filter !== 'All') {
    entries = entries.filter(e => e[label.filter] === filter);
  }
  if (search) {
    entries = entries.filter(e =>
      (e.name || '').toLowerCase().includes(search) ||
      (e.description || '').toLowerCase().includes(search) ||
      (e.effect || '').toLowerCase().includes(search));
  }
  if (!entries.length) {
    grid.appendChild(h('div', { class: 'card empty' },
      'No entries. Click "+ New" above to create one.'));
    return;
  }
  entries.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  entries.forEach(e => grid.appendChild(libraryCard(kind, e)));
}

function libraryCard(kind, e) {
  const label = LIBRARY_LABELS[kind];
  const tag = (kind === 'techniques' || kind === 'treasures') ? e.tier
            : kind === 'methods' ? e.type
            : e.grade;
  const subtitle = subtitleFor(kind, e);
  const body = e.effect || e.description || h('em', {}, 'No description.');

  const nameEl = h('div', {
    class: 'card-name',
    style: { cursor: 'pointer' },
    title: 'Click for full details',
    onclick: () => openDetails(kind, e)
  }, e.name || '(Unnamed)');

  const card = h('div', { class: 'card' },
    tag ? h('div', { class: 'card-tier' }, tag) : null,
    nameEl,
    h('div', { class: 'card-subtitle' }, subtitle),
    h('div', { class: 'card-body' }, body));

  const meta = metaFor(kind, e);
  if (meta) card.appendChild(h('div', { class: 'card-meta' }, ...meta));

  card.appendChild(h('div', { class: 'card-actions' },
    h('button', { class: 'btn small',
      onclick: () => openDetails(kind, e) }, 'View'),
    h('button', { class: 'btn small',
      onclick: () => label.openEditor(e, () => navigate(kind)) }, 'Edit'),
    h('button', { class: 'btn small danger',
      onclick: () => deleteLibraryEntry(kind, e.id) }, 'Delete')
  ));
  return card;
}

function subtitleFor(kind, e) {
  if (kind === 'techniques') {
    return [e.source, e.type, e.cost != null ? (e.cost + ' qi') : null].filter(Boolean).join(' · ');
  }
  if (kind === 'treasures') {
    return [e.category, e.quality, e.binding].filter(Boolean).join(' · ');
  }
  if (kind === 'methods') {
    return ['Peak: ' + (e.peakRealm || '—'), e.rootReq].filter(Boolean).join(' · ');
  }
  return [e.category, e.consumable ? 'Consumable' : null].filter(Boolean).join(' · ');
}

function metaFor(kind, e) {
  if (kind === 'techniques') {
    const m = [];
    if (e.dao) m.push(h('span', {}, 'Dao: ' + e.dao));
    if (e.range) m.push(h('span', {}, e.range));
    return m.length ? m : null;
  }
  if (kind === 'treasures') {
    const m = [];
    if (e.dao) m.push(h('span', {}, 'Dao: ' + e.dao));
    if (e.swordSpirit?.name) m.push(h('span', {}, 'Spirit: ' + e.swordSpirit.name));
    if (e.realmReq) m.push(h('span', {}, 'Req: ' + e.realmReq));
    return m.length ? m : null;
  }
  return null;
}

async function deleteLibraryEntry(kind, id) {
  const ok = await confirmDialog('Delete this entry? Characters that reference it keep a frozen copy.');
  if (!ok) return;
  state.library[kind] = state.library[kind].filter(e => e.id !== id);
  saveState();
  navigate(kind);
  notice('Deleted.', 'cinnabar');
}

// ============================================================================
// CHARACTERS LIST
// ============================================================================

function renderCharacterList(root) {
  root.appendChild(h('div', { class: 'page-header' },
    h('div', { class: 'page-title' },
      h('span', { class: 'chinese' }, '人物'),
      h('span', { class: 'english' }, 'Characters')),
    h('div', { class: 'page-actions' },
      h('button', { class: 'btn primary', onclick: openNewCharacterDialog }, '+ New Character'))
  ));

  if (!state.characters.length) {
    root.appendChild(h('div', { class: 'note-box' },
      'No characters yet. Click "+ New Character" to forge your first cultivator.'));
    return;
  }

  const grid = h('div', { class: 'grid-list' });
  [...state.characters]
    .sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))
    .forEach(c => grid.appendChild(characterCard(c)));
  root.appendChild(grid);
}

function characterCard(c) {
  const realmLine = [c.realm, c.substage].filter(Boolean).join(' · ') || 'Mortal';
  return h('div', { class: 'card' },
    h('div', { class: 'card-tier' }, c.origin || ''),
    h('div', { class: 'card-name' }, c.name || '(Unnamed Cultivator)'),
    h('div', { class: 'card-subtitle' }, realmLine),
    h('div', { class: 'card-body' },
      h('div', {}, 'Body ' + (c.attributes?.body ?? 1) +
        ' · Qi ' + (c.attributes?.qi ?? 1) +
        ' · Soul ' + (c.attributes?.soul ?? 1)),
      c.daoSeed ? h('div', {
        style: { marginTop: '4px', color: 'var(--ink-faded)' }
      }, h('em', {}, 'Dao Seed: ' + c.daoSeed)) : null),
    h('div', { class: 'card-meta' },
      c.affiliation ? h('span', {}, c.affiliation) : null,
      c.player ? h('span', {}, c.player) : null),
    h('div', { class: 'card-actions' },
      h('button', { class: 'btn small',
        onclick: () => navigate('character-edit', { id: c.id }) }, 'Open'),
      h('button', { class: 'btn small danger',
        onclick: () => deleteCharacter(c.id) }, 'Delete')));
}

function openNewCharacterDialog() {
  const c = makeBlankCharacter();
  const body = h('div', {});
  body.appendChild(fieldText('Character Name', c.name, v => c.name = v, { placeholder: 'Wang Lin' }));
  body.appendChild(fieldText("Player's Name", c.player, v => c.player = v, { placeholder: 'Optional' }));
  const r = h('div', { class: 'field-row two' });
  r.appendChild(fieldSelect('Origin', c.origin, ORIGINS, v => c.origin = v));
  r.appendChild(fieldSelect('Affiliation', c.affiliation, AFFILIATIONS, v => c.affiliation = v));
  body.appendChild(r);
  body.appendChild(h('div', { class: 'note-box' },
    "You can refine attributes, realm, roots, and everything else on the next screen."));

  openDialog({
    title: 'Forge a New Cultivator',
    content: body,
    actions: [
      { label: 'Cancel', handler: closeDialog },
      { label: 'Create', primary: true, handler: () => {
        if (!c.name?.trim()) { notice('Name required.', 'cinnabar'); return; }
        c.name = c.name.trim();
        state.characters.push(c);
        saveState();
        closeDialog();
        navigate('character-edit', { id: c.id });
        notice('Character forged.');
      }}
    ]
  });
}

function makeBlankCharacter() {
  return {
    id: uid(),
    name: '', player: '',
    origin: 'Mortal Village Youth',
    affiliation: 'Sect Disciple',
    realm: 'Mortal', substage: 'Early',
    attributes: { body: 2, qi: 2, soul: 1 },
    root: { grade: 'Common Root (×1)', elements: [], mutant: '', heavenlyBody: '', notes: '' },
    daoSeed: '',
    daos: [],
    method: { ref: null, frozen: null, notes: '' },
    techniques: [],
    treasures: [],
    items: [],
    lores: [],
    practices: [],
    wealth: { low: 0, mid: 0, high: 0 },
    karma: { white: 0, black: 0, resentment: 0, resentmentMax: 3 },
    face: { value: 1, type: 'Righteous', notes: '' },
    qi: { current: 0 },
    wounds: 0, woundsCritical: 0,
    ties: '',
    notes: '',
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

async function deleteCharacter(id) {
  const ok = await confirmDialog('Delete this character permanently? This cannot be undone.');
  if (!ok) return;
  state.characters = state.characters.filter(c => c.id !== id);
  saveState();
  navigate('characters');
  notice('Character removed.', 'cinnabar');
}

// ============================================================================
// CHARACTER EDITOR
// ============================================================================

function renderCharacterEdit(root) {
  const id = routeParams.id;
  const c = state.characters.find(x => x.id === id);
  if (!c) { root.appendChild(h('div', { class: 'note-box' }, 'Character not found.')); return; }

  // Normalize legacy data
  if (!c.qi || typeof c.qi !== 'object') c.qi = { current: 0 };
  if ('max' in c.qi) delete c.qi.max;
  if (typeof c.wounds !== 'number') c.wounds = 0;
  if (typeof c.woundsCritical !== 'number') c.woundsCritical = 0;
  if (!Array.isArray(c.treasures)) c.treasures = [];
  if (typeof c.root.elements === 'string') {
    c.root.elements = c.root.elements.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (!Array.isArray(c.root.elements)) c.root.elements = [];
  if (c.root.mutant == null) c.root.mutant = '';
  if (c.root.heavenlyBody == null) c.root.heavenlyBody = '';

  const save = () => { c.updatedAt = nowIso(); saveState(); };
  const debouncedSave = debounce(save, 250);
  const updaters = [];
  const recalc = () => updaters.forEach(fn => fn());

  root.appendChild(h('div', { class: 'page-header' },
    h('div', { class: 'page-title' },
      h('span', { class: 'chinese' }, '人'),
      h('span', { class: 'english' }, c.name || 'Cultivator')),
    h('div', { class: 'page-actions' },
      h('button', { class: 'btn', onclick: () => navigate('characters') }, '← Back'),
      h('button', { class: 'btn danger', onclick: () => deleteCharacter(c.id) }, 'Delete'))));

  const idBand = h('div', { class: 'identity-band' });
  idBand.appendChild(fieldText('Character Name', c.name, v => { c.name = v; debouncedSave(); }));
  idBand.appendChild(fieldText('Player', c.player, v => { c.player = v; debouncedSave(); }));
  idBand.appendChild(fieldSelect('Origin', c.origin, ORIGINS, v => { c.origin = v; debouncedSave(); }));
  root.appendChild(idBand);

  const grid = h('div', { class: 'char-editor' });
  root.appendChild(grid);
  const left = h('div', {}); const right = h('div', {});
  grid.appendChild(left); grid.appendChild(right);

  // ----- LEFT -----

  // Realm
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('境界', 'Realm & Sub-stage'));
    const wrap = h('div', {});
    sec.appendChild(wrap);
    const renderRealm = () => {
      clear(wrap);
      const r = h('div', { class: 'field-row two' });
      r.appendChild(fieldSelect('Realm', c.realm, REALMS, v => {
        c.realm = v;
        if (v === 'Mortal') c.substage = 'Early';
        debouncedSave(); recalc(); renderRealm();
      }));
      if (c.realm !== 'Mortal') {
        r.appendChild(fieldSelect('Sub-stage', c.substage, SUB_STAGES, v => {
          c.substage = v; debouncedSave(); recalc();
        }));
      } else {
        r.appendChild(h('div', { class: 'field' },
          h('label', { class: 'field-label' }, 'Sub-stage'),
          h('div', { style: { padding: '8px 0', color: 'var(--ink-faded)', fontStyle: 'italic' } },
            'Mortal (Tier 0) — no sub-stages')));
      }
      wrap.appendChild(r);

      const tier = computeDerived(c).tier;
      wrap.appendChild(h('div', {
        style: { marginTop: '6px', fontFamily: 'Cormorant SC, serif', fontSize: '11px',
          letterSpacing: '2px', color: 'var(--ink-faded)', textTransform: 'uppercase' }
      }, 'Realm Tier: ', h('span', {
        style: { color: 'var(--cinnabar-deep)', fontWeight: '600' }
      }, String(tier))));

      const ctrls = h('div', { class: 'stage-controls' });
      ctrls.appendChild(h('button', {
        class: 'btn small',
        disabled: c.realm === 'Mortal',
        onclick: () => {
          advanceCharacterStage(c, -1);
          save(); recalc(); renderRealm();
          notice('Regressed to ' + c.realm + (c.realm === 'Mortal' ? '' : ' ' + c.substage));
        }
      }, '← Regress'));
      ctrls.appendChild(h('button', {
        class: 'btn small primary',
        disabled: c.realm === 'Nirvana Shatterer' && c.substage === 'Peak',
        onclick: () => {
          const prevQiMax = computeDerived(c).qiMax;
          advanceCharacterStage(c, 1);
          const newQiMax = computeDerived(c).qiMax;
          if (newQiMax > prevQiMax) c.qi.current = newQiMax;
          save(); recalc(); renderRealm();
          notice('Advanced to ' + c.realm + (c.realm === 'Mortal' ? '' : ' ' + c.substage));
        }
      }, 'Advance Sub-stage →'));
      wrap.appendChild(ctrls);
    };
    renderRealm();
    sec.appendChild(h('div', { style: { marginTop: '14px' } },
      fieldSelect('Affiliation', c.affiliation, AFFILIATIONS,
        v => { c.affiliation = v; debouncedSave(); })));
    left.appendChild(sec);
  }

  // Attributes
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('本命', 'Attributes'));
    const attrs = h('div', { class: 'attributes' });
    [
      { key: 'body', cn: '体', en: 'Body' },
      { key: 'qi',   cn: '气', en: 'Qi' },
      { key: 'soul', cn: '魂', en: 'Soul' }
    ].forEach(a => {
      const input = h('input', {
        type: 'number', class: 'attr-input', min: '1', max: '5',
        value: c.attributes[a.key]
      });
      input.addEventListener('input', () => {
        c.attributes[a.key] = Number(input.value) || 1;
        debouncedSave(); recalc();
      });
      attrs.appendChild(h('div', { class: 'attr' },
        h('div', { class: 'attr-label' }, a.cn),
        h('div', { class: 'attr-en' }, a.en),
        input));
    });
    sec.appendChild(attrs);
    left.appendChild(sec);
  }

  // Spiritual Root
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('根·道', 'Spiritual Root & Dao Seed'));
    const wrap = h('div', {});
    sec.appendChild(wrap);

    const renderRoot = () => {
      clear(wrap);
      wrap.appendChild(fieldSelect('Root Grade', c.root.grade, ROOT_GRADES, v => {
        c.root.grade = v;
        const spec = getRootElementSpec(v);
        if (spec?.type === 'fixed') c.root.elements = [...spec.elements];
        else if (spec?.type === 'none') c.root.elements = [];
        else if (spec?.type === 'pick') c.root.elements = (c.root.elements || []).filter(e => FIVE_ELEMENTS.includes(e));
        else if (spec?.type === 'mutant' || spec?.type === 'body') c.root.elements = [];
        if (spec?.type !== 'mutant') c.root.mutant = '';
        if (spec?.type !== 'body') c.root.heavenlyBody = '';
        save(); renderRoot();
      }));

      const spec = getRootElementSpec(c.root.grade);
      if (spec?.hint) {
        wrap.appendChild(h('div', {
          style: { fontSize: '12px', marginTop: '6px', marginBottom: '10px',
            padding: '8px 12px', border: '1px dashed var(--rule)',
            color: 'var(--ink-soft)', fontStyle: 'italic',
            background: 'rgba(244,235,214,0.3)' }
        }, spec.hint));
      }

      if (spec && (spec.type === 'pick' || spec.type === 'fixed')) {
        const ew = h('div', { class: 'field' });
        ew.appendChild(h('label', { class: 'field-label' }, 'Elements — 五行 Five Elements'));
        const g = h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' } });
        FIVE_ELEMENTS.forEach(el => {
          const sel = c.root.elements.includes(el);
          const dis = spec.type === 'fixed';
          g.appendChild(h('button', {
            class: 'chip' + (sel ? ' active' : ''),
            style: { padding: '10px 8px', textAlign: 'center', cursor: dis ? 'not-allowed' : 'pointer' },
            disabled: dis,
            onclick: () => {
              if (dis) return;
              if (sel) c.root.elements = c.root.elements.filter(x => x !== el);
              else c.root.elements = [...c.root.elements, el];
              save(); renderRoot();
            }
          },
            h('div', { style: { fontFamily: 'Noto Serif SC, serif', fontSize: '16px', fontWeight: '600' } }, ELEMENT_CN[el]),
            h('div', { style: { fontSize: '10px', letterSpacing: '1.5px' } }, el)));
        });
        ew.appendChild(g);
        const cnt = c.root.elements.length;
        const warns = [];
        if (spec.min && cnt < spec.min) warns.push(`Pick ${spec.min - cnt} more.`);
        if (spec.max && cnt > spec.max) warns.push(`Remove ${cnt - spec.max}.`);
        if (spec.harmonious && cnt === 2 && !arePairHarmonious(c.root.elements[0], c.root.elements[1])) {
          warns.push(`${c.root.elements[0]}+${c.root.elements[1]} is not harmonious.`);
        }
        if (warns.length) ew.appendChild(h('div', {
          style: { fontSize: '11px', color: 'var(--cinnabar)', marginTop: '8px',
            fontFamily: 'Cormorant SC, serif', letterSpacing: '1.5px', textTransform: 'uppercase' }
        }, warns.join(' ')));
        if (spec.harmonious) ew.appendChild(h('div', {
          style: { fontSize: '11px', color: 'var(--ink-faded)', marginTop: '6px',
            fontFamily: 'Cormorant SC, serif', letterSpacing: '1px' }
        }, 'Generative: Wood → Fire → Earth → Metal → Water → Wood'));
        wrap.appendChild(ew);
      }

      if (spec?.type === 'mutant') {
        const w = h('div', { class: 'field' });
        w.appendChild(h('label', { class: 'field-label' }, 'Mutant Root (d6)'));
        const sel = h('select', { class: 'field-select' });
        sel.appendChild(h('option', { value: '' }, '— choose —'));
        MUTANT_ROOTS.forEach((m, i) => {
          const o = h('option', { value: m.name }, `${i + 1}. ${m.name}`);
          if (m.name === c.root.mutant) o.setAttribute('selected', '');
          sel.appendChild(o);
        });
        sel.value = c.root.mutant || '';
        sel.addEventListener('change', () => { c.root.mutant = sel.value; save(); renderRoot(); });
        w.appendChild(sel);
        if (c.root.mutant) {
          const m = MUTANT_ROOTS.find(x => x.name === c.root.mutant);
          if (m) w.appendChild(h('div', {
            style: { fontSize: '13px', color: 'var(--ink-soft)', marginTop: '8px', fontStyle: 'italic', lineHeight: '1.5' }
          }, m.desc));
        }
        wrap.appendChild(w);
      }

      if (spec?.type === 'body') {
        const w = h('div', { class: 'field' });
        w.appendChild(h('label', { class: 'field-label' }, 'Heavenly Body (d12)'));
        const sel = h('select', { class: 'field-select' });
        sel.appendChild(h('option', { value: '' }, '— choose —'));
        HEAVENLY_BODIES.forEach((b, i) => {
          const o = h('option', { value: b.name }, `${i + 1}. ${b.name}`);
          if (b.name === c.root.heavenlyBody) o.setAttribute('selected', '');
          sel.appendChild(o);
        });
        sel.value = c.root.heavenlyBody || '';
        sel.addEventListener('change', () => { c.root.heavenlyBody = sel.value; save(); renderRoot(); });
        w.appendChild(sel);
        if (c.root.heavenlyBody) {
          const b = HEAVENLY_BODIES.find(x => x.name === c.root.heavenlyBody);
          if (b) w.appendChild(h('div', {
            style: { fontSize: '13px', color: 'var(--ink-soft)', marginTop: '8px', fontStyle: 'italic', lineHeight: '1.5' }
          }, b.desc));
        }
        wrap.appendChild(w);
      }

      wrap.appendChild(fieldSelect('Dao Seed', c.daoSeed, ['', ...DAOS],
        v => { c.daoSeed = v; debouncedSave(); }, { allowEmpty: true }));
      wrap.appendChild(fieldText('Root Notes', c.root.notes,
        v => { c.root.notes = v; debouncedSave(); },
        { placeholder: 'Lineage notes, awakened quirks, ceremony details…' }));
    };
    renderRoot();
    left.appendChild(sec);
  }

  // Cultivation Method
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('功法', 'Cultivation Method'));
    const display = h('div', { class: 'list-rows' });
    sec.appendChild(display);
    const renderMethod = () => {
      clear(display);
      const ref = c.method.ref ? state.library.methods.find(m => m.id === c.method.ref) : null;
      const source = ref || c.method.frozen;
      if (!source) {
        display.appendChild(h('div', { class: 'list-empty' }, 'No method selected.'));
        return;
      }
      const row = h('div', { class: 'list-row' });
      row.appendChild(h('div', {},
        h('div', { class: 'list-row-name' }, source.name),
        h('div', { class: 'list-row-meta' },
          [source.type, 'Peak: ' + (source.peakRealm || '—')].filter(Boolean).join(' · ')),
        source.description ? h('div', {
          style: { fontSize: '13px', marginTop: '4px', color: 'var(--ink-soft)' }
        }, source.description) : null));
      row.appendChild(h('span', {}));
      row.appendChild(h('button', {
        class: 'row-delete',
        onclick: () => { c.method = { ref: null, frozen: null, notes: c.method.notes || '' }; save(); renderMethod(); }
      }, '×'));
      display.appendChild(row);
    };
    renderMethod();
    const acts = h('div', { style: { marginTop: '8px', display: 'flex', gap: '8px' } });
    acts.appendChild(h('button', {
      class: 'btn small',
      onclick: () => openPicker({
        title: 'Choose Cultivation Method',
        entries: state.library.methods,
        subtitleFn: m => [m.type, 'Peak: ' + (m.peakRealm || '—')].filter(Boolean).join(' · '),
        onPick: m => {
          c.method.ref = m.id;
          c.method.frozen = structuredClone(m);
          save(); renderMethod(); closeDialog();
        }
      })
    }, 'Pick from Library'));
    sec.appendChild(acts);
    sec.appendChild(fieldText('Method Notes', c.method.notes,
      v => { c.method.notes = v; debouncedSave(); },
      { placeholder: 'Reconciliation progress, quirks…' }));
    left.appendChild(sec);
  }

  // Techniques
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('术法', 'Techniques'));
    const list = h('div', { class: 'list-rows' });
    sec.appendChild(list);
    const renderTechs = () => {
      clear(list);
      if (!c.techniques.length) { list.appendChild(h('div', { class: 'list-empty' }, 'No techniques learned.')); return; }
      c.techniques.forEach((tech, idx) => {
        const source = tech.ref ? state.library.techniques.find(t => t.id === tech.ref) : null;
        const info = source || tech.frozen || {};
        const dots = h('div', { class: 'dot-row', title: 'Mastery (0–4)' });
        for (let i = 0; i < 5; i++) {
          const d = h('div', { class: 'dot cinnabar' + (i < (tech.mastery || 0) ? ' filled' : '') });
          d.addEventListener('click', () => {
            tech.mastery = (tech.mastery === i + 1) ? i : i + 1;
            save(); renderTechs();
          });
          dots.appendChild(d);
        }
        const row = h('div', { class: 'list-row',
          style: { gridTemplateColumns: '1fr auto auto auto auto' } });
        const nameEl = h('div', { class: 'list-row-name',
          style: { cursor: 'pointer', color: 'var(--cinnabar-deep)' },
          title: 'Click for full details',
          onclick: () => openDetails('techniques', info)
        }, info.name || '(Unnamed)');
        row.appendChild(h('div', {},
          nameEl,
          h('div', { class: 'list-row-meta' },
            [info.tier, info.type, info.cost != null ? (info.cost + ' qi') : null].filter(Boolean).join(' · ')),
          info.effect ? h('div', { style: { fontSize: '12px', marginTop: '3px', color: 'var(--ink-soft)' } }, info.effect) : null));
        row.appendChild(dots);
        row.appendChild(h('button', {
          class: 'btn small primary',
          title: 'Roll dice pool — auto-deducts qi',
          onclick: () => openUseTechniqueDialog(c, info, tech, () => recalc())
        }, '⚔ Use'));
        row.appendChild(h('button', {
          class: 'btn small ghost',
          onclick: () => openDetails('techniques', info)
        }, 'View'));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { c.techniques.splice(idx, 1); save(); renderTechs(); } }, '×'));
        list.appendChild(row);
      });
    };
    renderTechs();
    sec.appendChild(h('div', { style: { marginTop: '8px' } },
      h('button', {
        class: 'btn small',
        onclick: () => openPicker({
          title: 'Choose a Technique',
          entries: state.library.techniques,
          subtitleFn: t => [t.tier, t.type, t.cost != null ? (t.cost + ' qi') : null].filter(Boolean).join(' · '),
          onPick: t => {
            c.techniques.push({ ref: t.id, frozen: structuredClone(t), mastery: 0 });
            save(); renderTechs(); closeDialog();
          }
        })
      }, '+ Add Technique')));
    left.appendChild(sec);
  }

  // Treasures
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('法宝', 'Treasures'));
    const list = h('div', { class: 'list-rows' });
    sec.appendChild(list);
    const renderTreas = () => {
      clear(list);
      if (!c.treasures.length) { list.appendChild(h('div', { class: 'list-empty' }, 'No treasures held.')); return; }
      c.treasures.forEach((tr, idx) => {
        const source = tr.ref ? state.library.treasures.find(t => t.id === tr.ref) : null;
        const info = source || tr.frozen || {};
        // Pass the per-character favor through to the details view by merging.
        const detailEntry = info.swordSpirit
          ? { ...info, swordSpirit: { ...info.swordSpirit, favor: tr.swordSpirit?.favor ?? info.swordSpirit.favor } }
          : info;

        const row = h('div', { class: 'list-row',
          style: { gridTemplateColumns: '1fr auto auto auto' } });
        const meta = [info.tier, info.category, info.quality, tr.binding || info.binding].filter(Boolean).join(' · ');
        const nameEl = h('div', { class: 'list-row-name',
          style: { cursor: 'pointer', color: 'var(--cinnabar-deep)' },
          title: 'Click for full details',
          onclick: () => openDetails('treasures', detailEntry)
        }, info.name || '(Unnamed)');
        row.appendChild(h('div', {},
          nameEl,
          h('div', { class: 'list-row-meta' }, meta),
          info.swordSpirit?.name ? h('div', {
            style: { fontSize: '12px', marginTop: '3px', color: 'var(--ink-soft)', fontStyle: 'italic' }
          }, '剑魂 ' + info.swordSpirit.name + ' · Favor ' +
             (tr.swordSpirit?.favor ?? info.swordSpirit.favor ?? 0) + '/10') : null));

        // Per-character favor tracker (only if treasure has spirit)
        const ctrls = h('div', { style: { display: 'flex', gap: '4px', alignItems: 'center' } });
        if (info.swordSpirit) {
          if (!tr.swordSpirit) tr.swordSpirit = { favor: info.swordSpirit.favor ?? 5 };
          ctrls.appendChild(h('button', {
            class: 'row-delete',
            onclick: () => { tr.swordSpirit.favor = Math.max(0, (tr.swordSpirit.favor || 0) - 1); save(); renderTreas(); }
          }, '−'));
          ctrls.appendChild(h('span', { class: 'list-row-meta' }, 'Favor ' + (tr.swordSpirit.favor || 0)));
          ctrls.appendChild(h('button', {
            class: 'row-delete',
            onclick: () => { tr.swordSpirit.favor = Math.min(10, (tr.swordSpirit.favor || 0) + 1); save(); renderTreas(); }
          }, '+'));
        }
        row.appendChild(ctrls);

        row.appendChild(h('button', {
          class: 'btn small ghost',
          onclick: () => openDetails('treasures', detailEntry)
        }, 'View'));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { c.treasures.splice(idx, 1); save(); renderTreas(); } }, '×'));
        list.appendChild(row);
      });
    };
    renderTreas();
    sec.appendChild(h('div', { style: { marginTop: '8px' } },
      h('button', {
        class: 'btn small',
        onclick: () => openPicker({
          title: 'Add Treasure from Library',
          entries: state.library.treasures,
          subtitleFn: t => [t.tier, t.category, t.binding].filter(Boolean).join(' · '),
          onPick: t => {
            c.treasures.push({
              ref: t.id, frozen: structuredClone(t),
              binding: t.binding,
              swordSpirit: t.swordSpirit ? { favor: t.swordSpirit.favor ?? 5 } : null
            });
            save(); renderTreas(); closeDialog();
          }
        })
      }, '+ Add Treasure')));
    left.appendChild(sec);
  }

  // Inventory
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('物品', 'Inventory'));
    const list = h('div', { class: 'list-rows' });
    sec.appendChild(list);
    const renderItems = () => {
      clear(list);
      if (!c.items.length) { list.appendChild(h('div', { class: 'list-empty' }, 'Nothing carried.')); return; }
      c.items.forEach((entry, idx) => {
        const source = entry.ref ? state.library.items.find(i => i.id === entry.ref) : null;
        const info = source || entry.frozen || {};
        const qtyInput = h('input', {
          type: 'number', class: 'field-input', min: '0',
          value: entry.qty != null ? entry.qty : 1,
          style: { width: '50px', textAlign: 'center' }
        });
        qtyInput.addEventListener('input', () => { entry.qty = Number(qtyInput.value) || 0; debouncedSave(); });
        const row = h('div', { class: 'list-row' });
        row.appendChild(h('div', {},
          h('div', { class: 'list-row-name' }, info.name || '(Unnamed)'),
          h('div', { class: 'list-row-meta' },
            [info.category, info.grade, info.consumable ? 'Consumable' : null].filter(Boolean).join(' · ')),
          info.effect ? h('div', { style: { fontSize: '12px', marginTop: '3px', color: 'var(--ink-soft)' } }, info.effect) : null));
        row.appendChild(h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
          h('span', { class: 'inline-label' }, '×'), qtyInput));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { c.items.splice(idx, 1); save(); renderItems(); } }, '×'));
        list.appendChild(row);
      });
    };
    renderItems();
    sec.appendChild(h('div', { style: { marginTop: '8px' } },
      h('button', {
        class: 'btn small',
        onclick: () => openPicker({
          title: 'Add Item from Library',
          entries: state.library.items,
          subtitleFn: i => [i.category, i.grade].filter(Boolean).join(' · '),
          onPick: i => {
            c.items.push({ ref: i.id, frozen: structuredClone(i), qty: 1 });
            save(); renderItems(); closeDialog();
          }
        })
      }, '+ Add Item')));
    left.appendChild(sec);
  }

  // ----- RIGHT -----

  // Derived
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('推算', 'Derived Stats'));
    const panel = h('div', { class: 'derived-panel' });
    sec.appendChild(panel);
    const renderDerived = () => {
      clear(panel);
      const d = computeDerived(c);
      const rows = [
        ['Realm Tier', String(d.tier)],
        ['Wound Capacity', String(d.woundCap)],
        ['Qi Pool', String(d.qiMax)],
        ['Spiritual Sense', d.senseRange + ' m'],
        ['Soul Defense', String(d.soulDefense)],
        ['Presence Tier', String(d.presence)],
        ['Max Heart Oaths', String(d.heartOaths)],
        ['Lifespan', d.lifespan]
      ];
      rows.forEach(([l, v]) => panel.appendChild(h('div', { class: 'derived-row' },
        h('span', { class: 'derived-label' }, l),
        h('span', { class: 'derived-val' }, v))));
    };
    renderDerived();
    updaters.push(renderDerived);
    sec.appendChild(h('div', {
      style: { fontFamily: 'Cormorant SC, serif', fontSize: '10px', letterSpacing: '1.5px',
        color: 'var(--ink-faded)', marginTop: '10px', textAlign: 'right', fontStyle: 'italic' }
    }, 'Auto-calculated from Realm Tier + Attributes'));
    right.appendChild(sec);
  }

  // Vitals
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('气血', 'Vitals'));
    const qiWrap = h('div', { class: 'field' });
    qiWrap.appendChild(h('label', { class: 'field-label' }, 'Qi — current / max'));
    const qiLine = h('div', { class: 'qi-line' });
    const qiCur = h('input', { type: 'number', class: 'qi-current', min: '0', value: c.qi.current });
    qiCur.addEventListener('input', () => { c.qi.current = Number(qiCur.value) || 0; debouncedSave(); });
    const qiMaxEl = h('span', { class: 'qi-max' }, String(computeDerived(c).qiMax));
    qiLine.appendChild(qiCur);
    qiLine.appendChild(h('span', { class: 'qi-slash' }, '/'));
    qiLine.appendChild(qiMaxEl);
    qiLine.appendChild(h('button', {
      class: 'btn small ghost', style: { marginLeft: 'auto' },
      onclick: () => { c.qi.current = computeDerived(c).qiMax; qiCur.value = c.qi.current; save(); }
    }, 'Fill Pool'));
    qiWrap.appendChild(qiLine);
    sec.appendChild(qiWrap);

    const woundWrap = h('div', { class: 'field', style: { marginTop: '14px' } });
    const woundLabel = h('div', { class: 'field-label' });
    woundWrap.appendChild(woundLabel);
    const woundBox = h('div', { class: 'box-track' });
    woundWrap.appendChild(woundBox);
    const woundStatus = h('div', {
      style: { fontFamily: 'Cormorant SC, serif', fontSize: '10px', letterSpacing: '2px',
        color: 'var(--ink-faded)', marginTop: '8px', textTransform: 'uppercase' }
    });
    woundWrap.appendChild(woundStatus);

    const renderWounds = () => {
      const d = computeDerived(c);
      const TOTAL = Math.max(1, d.woundCap);
      c.wounds = Math.min(Math.max(0, c.wounds), TOTAL);
      c.woundsCritical = Math.min(Math.max(0, c.woundsCritical), c.wounds);
      qiMaxEl.textContent = String(d.qiMax);
      woundLabel.textContent = `Wounds — click once for surface, twice for critical (${c.wounds}/${TOTAL})`;
      clear(woundBox);
      for (let i = 0; i < TOTAL; i++) {
        const cls = i < c.woundsCritical ? ' critical' : (i < c.wounds ? ' filled' : '');
        const cell = h('div', { class: 'box-cell' + cls });
        cell.addEventListener('click', () => {
          if (i >= c.wounds) c.wounds = i + 1;
          else if (i >= c.woundsCritical) c.woundsCritical = i + 1;
          else { c.wounds = i; c.woundsCritical = Math.min(c.woundsCritical, i); }
          save(); renderWounds();
        });
        woundBox.appendChild(cell);
      }
      const half = Math.ceil(TOTAL / 2);
      const filled = c.wounds;
      let st = '';
      if (filled >= TOTAL) st = 'DYING — take the killing blow, or spend a prepared countermeasure.';
      else if (filled >= half) st = `Wounded (${filled}/${TOTAL}) — penalties active at ≥ ${half}.`;
      else if (filled > 0) st = `Lightly wounded (${filled}/${TOTAL}).`;
      else st = `Unhurt — penalties begin at ${half} of ${TOTAL}.`;
      woundStatus.textContent = st;
      woundStatus.style.color = filled >= TOTAL ? 'var(--cinnabar-deep)'
        : filled >= half ? 'var(--cinnabar)' : 'var(--ink-faded)';
    };
    renderWounds();
    updaters.push(renderWounds);
    sec.appendChild(woundWrap);
    right.appendChild(sec);
  }

  // Karma & Resentment
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('因果', 'Karma & Resentment'));
    const dotRow = (label, key, color, max) => {
      const w = h('div', { class: 'field' });
      w.appendChild(h('label', { class: 'field-label' }, label));
      const dots = h('div', { class: 'dot-row' });
      const render = () => {
        clear(dots);
        for (let i = 0; i < max; i++) {
          const d = h('div', { class: 'dot' + (i < c.karma[key] ? ' ' + color : '') });
          d.addEventListener('click', () => {
            c.karma[key] = (c.karma[key] === i + 1) ? i : i + 1;
            save(); render();
          });
          dots.appendChild(d);
        }
      };
      render(); w.appendChild(dots); return w;
    };
    sec.appendChild(dotRow('White Karma', 'white', 'white-filled', 10));
    sec.appendChild(dotRow('Black Karma', 'black', 'black-filled', 10));
    const r = h('div', { class: 'field-row two' });
    const maxIn = h('input', { type: 'number', class: 'field-input', value: c.karma.resentmentMax, min: '0' });
    maxIn.addEventListener('input', () => { c.karma.resentmentMax = Number(maxIn.value) || 0; debouncedSave(); });
    r.appendChild(h('div', { class: 'field' },
      h('label', { class: 'field-label' }, 'Resentment Max'), maxIn));
    const resWrap = h('div', { class: 'field' });
    resWrap.appendChild(h('label', { class: 'field-label' }, 'Heavenly Resentment'));
    const resDots = h('div', { class: 'dot-row' });
    const renderRes = () => {
      clear(resDots);
      for (let i = 0; i < Math.max(c.karma.resentmentMax, 5); i++) {
        const d = h('div', { class: 'dot cinnabar' + (i < c.karma.resentment ? ' filled' : '') });
        d.addEventListener('click', () => {
          c.karma.resentment = (c.karma.resentment === i + 1) ? i : i + 1;
          save(); renderRes();
        });
        resDots.appendChild(d);
      }
    };
    renderRes(); resWrap.appendChild(resDots);
    r.appendChild(resWrap);
    sec.appendChild(r);
    right.appendChild(sec);
  }

  // Face
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('面子', 'Face'));
    const r = h('div', { class: 'field-row two' });
    r.appendChild(fieldNumber('Face Value', c.face.value,
      v => { c.face.value = v || 0; debouncedSave(); }, { min: -5, max: 10 }));
    r.appendChild(fieldSelect('Type', c.face.type,
      ['Righteous', 'Demonic', 'Neutral', 'Infamous'],
      v => { c.face.type = v; debouncedSave(); }));
    sec.appendChild(r);
    sec.appendChild(fieldText('Face Notes', c.face.notes,
      v => { c.face.notes = v; debouncedSave(); },
      { placeholder: 'Face 2 in Heng Yue Sect; Face 0 elsewhere' }));
    right.appendChild(sec);
  }

  // Wealth
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('灵石', 'Spirit Stones'));
    const r = h('div', { class: 'field-row three' });
    r.appendChild(fieldNumber('Low-grade', c.wealth.low, v => { c.wealth.low = v || 0; debouncedSave(); }, { min: 0 }));
    r.appendChild(fieldNumber('Mid-grade', c.wealth.mid, v => { c.wealth.mid = v || 0; debouncedSave(); }, { min: 0 }));
    r.appendChild(fieldNumber('High-grade', c.wealth.high, v => { c.wealth.high = v || 0; debouncedSave(); }, { min: 0 }));
    sec.appendChild(r);
    right.appendChild(sec);
  }

  // Daos
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('诸道', 'Daos & Insight'));
    const list = h('div', { class: 'list-rows' });
    sec.appendChild(list);
    const renderDaos = () => {
      clear(list);
      if (!c.daos.length) { list.appendChild(h('div', { class: 'list-empty' }, 'No Dao comprehension yet.')); return; }
      c.daos.forEach((d, idx) => {
        const row = h('div', { class: 'list-row' });
        row.appendChild(h('div', {},
          h('div', { class: 'list-row-name' }, d.name),
          h('div', { class: 'list-row-meta' }, (d.level || 'Novice') + ' · Insight: ' + (d.insight || 0))));
        const lvl = h('select', { class: 'field-select', style: { width: '120px' } });
        ['Novice', 'Adept', 'Master', 'Grandmaster', 'Void Mastery'].forEach(l => {
          const o = h('option', { value: l }, l);
          if (l === (d.level || 'Novice')) o.setAttribute('selected', '');
          lvl.appendChild(o);
        });
        lvl.value = d.level || 'Novice';
        lvl.addEventListener('change', () => { d.level = lvl.value; save(); renderDaos(); });
        const ins = h('input', {
          type: 'number', class: 'field-input',
          style: { width: '60px', textAlign: 'center' },
          value: d.insight || 0, min: '0'
        });
        ins.addEventListener('input', () => { d.insight = Number(ins.value) || 0; debouncedSave(); });
        row.appendChild(h('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } }, lvl, ins));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { c.daos.splice(idx, 1); save(); renderDaos(); } }, '×'));
        list.appendChild(row);
      });
    };
    renderDaos();
    const addRow = h('div', { style: { marginTop: '8px', display: 'flex', gap: '8px' } });
    const sel = h('select', { class: 'field-select', style: { flex: '1' } });
    sel.appendChild(h('option', { value: '' }, '— choose Dao —'));
    DAOS.forEach(d => sel.appendChild(h('option', { value: d }, d)));
    addRow.appendChild(sel);
    addRow.appendChild(h('button', {
      class: 'btn small',
      onclick: () => {
        if (!sel.value) return;
        c.daos.push({ name: sel.value, level: 'Novice', insight: 0 });
        sel.value = ''; save(); renderDaos();
      }
    }, '+ Add'));
    sec.appendChild(addRow);
    right.appendChild(sec);
  }

  // Lores & Practices
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('学·行', 'Lores & Practices'));
    sec.appendChild(fieldTextarea('Lores (comma-separated)', c.lores.join(', '),
      v => { c.lores = v.split(',').map(s => s.trim()).filter(Boolean); debouncedSave(); },
      'Mortal Lore, Herb Lore, Sect Politics…'));
    const pracList = h('div', { class: 'list-rows' });
    const renderPrac = () => {
      clear(pracList);
      if (!c.practices.length) {
        pracList.appendChild(h('div', { class: 'list-empty' }, 'No practices trained.'));
        return;
      }
      c.practices.forEach((p, idx) => {
        const row = h('div', { class: 'list-row' });
        const name = h('input', { class: 'field-input', value: p.name });
        name.addEventListener('input', () => { p.name = name.value; debouncedSave(); });
        row.appendChild(name);
        const rs = h('select', { class: 'field-select', style: { width: '140px' } });
        ['Trained (+1)', 'Well-Practiced (+2)', 'Masterful (+3)'].forEach((r, ri) => {
          const o = h('option', { value: ri + 1 }, r);
          if ((p.rank || 1) === ri + 1) o.setAttribute('selected', '');
          rs.appendChild(o);
        });
        rs.value = p.rank || 1;
        rs.addEventListener('change', () => { p.rank = Number(rs.value); save(); });
        row.appendChild(rs);
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { c.practices.splice(idx, 1); save(); renderPrac(); } }, '×'));
        pracList.appendChild(row);
      });
    };
    renderPrac();
    sec.appendChild(h('div', { class: 'field-label', style: { marginTop: '10px' } }, 'Practices'));
    sec.appendChild(pracList);
    sec.appendChild(h('button', {
      class: 'btn small', style: { marginTop: '8px' },
      onclick: () => { c.practices.push({ name: '', rank: 1 }); save(); renderPrac(); }
    }, '+ Add Practice'));
    right.appendChild(sec);
  }

  // Ties & Notes
  {
    const sec = h('div', { class: 'section' });
    sec.appendChild(sectionHeader('缘·记', 'Ties & Notes'));
    sec.appendChild(fieldTextarea('Ties (family, allies, oaths, blood debts)',
      c.ties, v => { c.ties = v; debouncedSave(); },
      'Living parents in home village · Sworn brother Zhang Hu · Blood debt owed to Lu family…'));
    sec.appendChild(fieldTextarea('Player Notes', c.notes, v => { c.notes = v; debouncedSave(); },
      'Countermeasures prepared, favor tracking, session to-dos…'));
    right.appendChild(sec);
  }
}

// ============================================================================
// DATA (Export / Import)
// ============================================================================

function renderData(root) {
  root.appendChild(h('div', { class: 'page-header' },
    h('div', { class: 'page-title' },
      h('span', { class: 'chinese' }, '籍录'),
      h('span', { class: 'english' }, 'Export & Import'))));

  root.appendChild(h('div', { class: 'note-box' },
    'All data is stored on the server (data/ledger.json). Use Export to save a JSON ' +
    'snapshot — share Library with players, send characters to your GM, back up your ' +
    'campaign, or check the file into git.'));

  // Export
  const sec1 = h('div', { class: 'section' });
  sec1.appendChild(sectionHeader('导出', 'Export'));
  const r1 = h('div', { class: 'field-row three' });
  r1.appendChild(exportCard('Everything', 'Entire ledger: library + characters + settings.',
    () => doExport(state, 'cultivation_campaign')));
  r1.appendChild(exportCard('Library only', 'Techniques, Treasures, Methods, Items. GM → players.',
    () => doExport({ version: 2, library: state.library }, 'cultivation_library')));
  r1.appendChild(exportCard('Characters only', 'All characters (no library).',
    () => doExport({ version: 2, characters: state.characters }, 'cultivation_characters')));
  sec1.appendChild(r1);
  root.appendChild(sec1);

  if (state.characters.length) {
    const sec2 = h('div', { class: 'section' });
    sec2.appendChild(sectionHeader('单人', 'Export Single Character'));
    const grid = h('div', { class: 'grid-list' });
    state.characters.forEach(c => {
      grid.appendChild(h('div', { class: 'card' },
        h('div', { class: 'card-name' }, c.name || '(Unnamed)'),
        h('div', { class: 'card-subtitle' }, [c.origin, c.realm].filter(Boolean).join(' · ')),
        h('div', { class: 'card-actions' },
          h('button', {
            class: 'btn small',
            onclick: () => doExport(
              { version: 2, character: c },
              'cultivation_char_' + (c.name || 'unnamed').replace(/\s+/g, '_').toLowerCase())
          }, 'Export'))));
    });
    sec2.appendChild(grid);
    root.appendChild(sec2);
  }

  // Import
  const sec3 = h('div', { class: 'section' });
  sec3.appendChild(sectionHeader('导入', 'Import'));
  sec3.appendChild(h('div', { class: 'note-box' },
    'Imports merge into current data. Library entries with the same id are updated; ' +
    'new ones are added. Characters always import as new copies (never overwriting).'));
  const fileInput = h('input', { type: 'file', accept: '.json', style: { display: 'none' } });
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      doImport(data);
    } catch (e) {
      notice('Import failed: invalid JSON.', 'cinnabar');
    }
    fileInput.value = '';
  });
  sec3.appendChild(h('button', { class: 'btn primary',
    onclick: () => fileInput.click() }, 'Choose JSON File'));
  sec3.appendChild(fileInput);
  root.appendChild(sec3);

  // Danger
  const sec4 = h('div', { class: 'section' });
  sec4.appendChild(sectionHeader('毁', 'Danger'));
  sec4.appendChild(h('div', { class: 'note-box' },
    'Erase all data on the server. Make sure you have a backup first.'));
  sec4.appendChild(h('button', {
    class: 'btn danger',
    onclick: async () => {
      if (!await confirmDialog('Erase ALL data on the server — library, characters, settings?')) return;
      if (!await confirmDialog('Are you absolutely sure?')) return;
      replaceState({
        version: 2, meta: { mode: 'gm' },
        library: { techniques: [], treasures: [], methods: [], items: [] },
        characters: []
      });
      navigate('home');
      notice('All data erased.', 'cinnabar');
    }
  }, 'Erase Everything'));
  root.appendChild(sec4);
}

function exportCard(title, desc, onClick) {
  return h('div', { class: 'card' },
    h('div', { class: 'card-name' }, title),
    h('div', { class: 'card-body' }, desc),
    h('div', { class: 'card-actions' },
      h('button', { class: 'btn small', onclick: onClick }, 'Download')));
}

function doExport(data, baseName) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const stamp = new Date().toISOString().slice(0, 10);
  const a = h('a', { href: url, download: baseName + '_' + stamp + '.json' });
  document.body.appendChild(a);
  a.click(); a.remove();
  URL.revokeObjectURL(url);
  notice('Exported.');
}

function doImport(data) {
  if (!data || typeof data !== 'object') { notice('Invalid data file.', 'cinnabar'); return; }
  const summary = [];

  if (data.character && !data.characters) data.characters = [data.character];

  if (data.library) {
    for (const kind of ['techniques', 'methods', 'items', 'treasures']) {
      const entries = data.library[kind];
      if (!Array.isArray(entries)) continue;
      let added = 0, updated = 0;
      entries.forEach(e => {
        if (!e) return;
        if (!e.id) e.id = uid();
        const idx = state.library[kind].findIndex(x => x.id === e.id);
        if (idx >= 0) { state.library[kind][idx] = e; updated++; }
        else { state.library[kind].push(e); added++; }
      });
      if (added || updated) summary.push(`${kind}: +${added} new, ${updated} updated`);
    }
  }
  if (Array.isArray(data.characters)) {
    let added = 0;
    data.characters.forEach(c => {
      if (!c) return;
      c.id = uid();
      c.importedAt = nowIso();
      if (!c.updatedAt) c.updatedAt = nowIso();
      state.characters.push(c);
      added++;
    });
    if (added) summary.push(`characters: +${added}`);
  }
  saveState();
  navigate(currentView);
  notice('Imported. ' + (summary.join('; ') || 'No changes.'));
}

// ============================================================================
// MODE TOGGLE
// ============================================================================

export function setMode(mode) {
  state.meta.mode = mode;
  saveState();
  document.querySelectorAll('.mode-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
}
