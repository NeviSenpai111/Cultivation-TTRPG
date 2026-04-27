// =============================================================================
// wizard.js — 11-step character-creation wizard following the
// Character Creation Framework. Self-contained: holds all the step data
// (origins, methods, starter techniques, dao categories, etc.) and walks
// the player through each decision before handing the finished character
// to the editor.
// =============================================================================

import { state, createCharacterRemote } from './api.js';
import {
  openDialog, closeDialog, h, clear, notice, uid, nowIso,
  fieldText, fieldTextarea, fieldSelect, fieldNumber
} from './ui.js';
import {
  AFFILIATIONS, DAOS, ROOT_GRADES, FIVE_ELEMENTS, ELEMENT_CN,
  arePairHarmonious, MUTANT_ROOTS, HEAVENLY_BODIES,
  getRootElementSpec
} from './domain.js';

// -----------------------------------------------------------------------------
// FRAMEWORK DATA TABLES
// -----------------------------------------------------------------------------

const ORIGIN_DATA = {
  'Mortal Village Youth': {
    attrBonus: 'body',
    lores: ['Mortal Lore', 'Herb & Pill Lore'],
    practices: ['Survival', 'Athletics'],
    wealth: 'Impoverished',
    face: { value: 1, scope: 'home village', type: 'Righteous' },
    tieHook: 'Living parents — Life Debt',
    hook: 'Filial obligation. The village fed you when no one else would.'
  },
  'Fallen Noble': {
    attrBonus: 'soul',
    lores: ['Sect Politics', 'Mortal Lore'],
    practices: ['Etiquette', 'Insight'],
    wealth: 'Modest (debts)',
    face: { value: 2, scope: 'noble circles / 0 elsewhere', type: 'Righteous' },
    tieHook: 'Scattered kin and a ruined name',
    hook: 'A house to restore. The world remembers your family\'s fall.',
    karmaMod: { black: -1, note: 'Ruined name — soft karmic stain.' }
  },
  "Merchant's Child": {
    attrBonus: 'choice',
    lores: ['Mortal Lore', 'Artifact Appraisal'],
    practices: ['Negotiation', 'Deception'],
    wealth: 'Modest',
    face: { value: 1, scope: '2-3 trade cities', type: 'Righteous' },
    tieHook: 'Living trading family',
    hook: 'A specific debt you carry — money, favor, or both.'
  },
  'Mountain Hunter / Herbalist': {
    attrBonus: 'body',
    lores: ['Herb & Pill Lore', 'Beast Lore'],
    practices: ['Tracking', 'Survival'],
    wealth: 'Modest (self-reliant)',
    face: { value: 0, scope: 'rural', type: 'Righteous' },
    tieHook: 'Isolated family or sole survivor',
    hook: 'A wilderness only you know. The mountain remembers your steps.'
  },
  'Servant of a Sect': {
    attrBonus: 'soul',
    lores: ['Sect Politics', 'Cultivation Lore'],
    practices: ['Stealth', 'Etiquette'],
    wealth: 'Impoverished',
    face: { value: 1, scope: 'home sect', type: 'Righteous' },
    tieHook: 'A former master',
    hook: 'Unfinished sect business. You served, watched, and learned more than they meant to teach.'
  },
  'Orphan / Wanderer': {
    attrBonus: 'choice',
    lores: ['Mortal Lore'],
    practices: ['Stealth', 'Survival'],
    wealth: 'Destitute',
    face: { value: 0, scope: '', type: 'Righteous' },
    tieHook: 'No family. No net.',
    hook: 'Your life starts now. Whatever came before is rubble.',
    note: 'Note: this Origin grants only 1 starting Lore. Pick a 2nd in Step 9 (free choice).'
  },
  'Battlefield Survivor': {
    attrBonus: 'body',
    lores: ['Cultivation Lore'],
    practices: ['Intimidation', 'Tracking'],
    wealth: 'Modest (loot)',
    face: { value: 1, scope: 'among veterans', type: 'Righteous' },
    tieHook: 'Scattered comrades',
    hook: 'Bloodstained karma. The field knows your name; some of the dead do too.',
    karmaMod: { bloodDebt: 'A named pursuer (currently inactive — can activate in play)' },
    note: 'Note: this Origin grants only 1 starting Lore. Pick a 2nd in Step 9 (free choice).'
  },
  'Young Master / Clan Heir': {
    attrBonus: 'soul',
    lores: ['Sect Politics', 'Cultivation Lore'],
    practices: ['Etiquette', 'Insight'],
    wealth: 'Wealthy',
    face: { value: 3, scope: 'clan / 1 allied', type: 'Righteous' },
    tieHook: 'Extensive clan; rivals',
    hook: 'Inherited duties + inherited enemies. The crown weighs.',
    karmaMod: { bloodDebt: 'An inherited family enemy from an ancestor\'s action' }
  },
  'Temple Initiate': {
    attrBonus: 'soul',
    lores: ['Cultivation Lore', 'Mortal Lore'],
    practices: ['Etiquette', 'Insight'],
    wealth: 'Impoverished',
    face: { value: 1, scope: 'temple', type: 'Righteous' },
    tieHook: 'Temple master',
    hook: 'A spiritual calling. The gods may or may not be listening.',
    variant: true
  },
  'Criminal / Outlaw': {
    attrBonus: 'choice',
    lores: ['Mortal Lore'],
    practices: ['Stealth', 'Deception'],
    wealth: 'Destitute',
    face: { value: -1, scope: 'infamous', type: 'Demonic' },
    tieHook: 'Whoever the law wants',
    hook: 'You did what you had to. They put a price on you for it.',
    karmaMod: { black: -2, bloodDebt: 'An active Blood Debt' },
    variant: true,
    note: 'Note: this Origin grants only 1 starting Lore. Pick a 2nd in Step 9 (free choice).'
  },
  'Disgraced Disciple': {
    attrBonus: 'choice',
    lores: ['Sect Politics', 'Cultivation Lore'],
    practices: ['Stealth', 'Insight'],
    wealth: 'Destitute',
    face: { value: 0, scope: 'former sect — negative', type: 'Righteous' },
    tieHook: 'Former master who turned away',
    hook: 'You broke a rule, lost a duel, or refused an order. The sect remembers.',
    variant: true
  }
};

const AFFILIATION_DATA = {
  'Sect Disciple': {
    rank: 'Outer Disciple (typical start)',
    face: 2,
    faceType: 'Righteous',
    obligations: 'Monthly sect tasks, loyalty to superiors, attendance at competitions',
    countermeasure: 'Spirit-tier life-saving talisman (sect-issued, single-use)',
    spatialRing: 'Spirit-grade Spatial Ring (Inner Disciple+)',
    bonusLore: 'Cultivation Lore',
    bonusPractice: 'Spiritual Sense',
    note: 'Most common start. Stable resources, real obligations.'
  },
  'Clan Heir': {
    rank: 'Direct-line heir or branch family',
    face: 3,
    faceType: 'Righteous',
    obligations: 'Family duties, marriage considerations, honor obligations',
    countermeasure: 'Mysterious-tier life-saving talisman (family heirloom)',
    spatialRing: 'Mysterious-grade Spatial Ring',
    bonusLoreChoice: ['Karmic Lore', 'Artifact Appraisal'],
    bonusPractice: 'Negotiation',
    extraTechnique: 'One heirloom Mysterious-tier technique (work with GM)',
    note: 'Most resource-rich start. Most pre-existing enemies.'
  },
  'Rogue Cultivator': {
    rank: 'No formal affiliation',
    face: 0,
    faceType: 'Righteous',
    obligations: 'None — total freedom',
    countermeasure: 'None. No safety net. No rescue.',
    spatialRing: 'None — pockets, pouches, saddlebags',
    bonusLoreChoice: 'free',
    bonusPracticeChoice: 'free',
    note: 'Mechanically the hardest start. Narratively the most flexible.'
  },
  'Mortal World Starter': {
    rank: 'Not yet a cultivator',
    face: 0,
    faceType: 'Righteous',
    obligations: 'Mortal life — family, village, town',
    countermeasure: 'None (mortal world)',
    spatialRing: 'None',
    note: 'Slowest-starting frame. Richest "becoming a cultivator" arc.'
  }
};

const METHOD_TYPES = [
  { name: 'Orthodox Sect Method', peakRealm: 'Soul Formation',
    bonus: 'Safe; +1 die to Spirit-Gathering formations; broadly compatible',
    cost: 'Sect-branded; loyalty expectations; not portable' },
  { name: 'Demonic Method', peakRealm: 'Variable; some reach Nirvana',
    bonus: '+1 cultivation speed tier; faster Insight',
    cost: 'Demonic Heart corruption; +1 Black Karma per major use; Qi Deviation at corruption ≥10' },
  { name: 'Body Refinement Method', peakRealm: 'Ascendant',
    bonus: '+1 Body tier advancement; wounds halved',
    cost: 'Qi growth halved; qi-techniques permanently weaker' },
  { name: 'Family Heirloom / Incomplete', peakRealm: 'Partial — missing upper realms',
    bonus: 'Unique techniques; often secret',
    cost: 'Must find rest of method by Core Formation or stall' },
  { name: 'Self-Taught / Improvised', peakRealm: 'Limited; depends on talent',
    bonus: 'Resistance to mind attacks; +1 die on novel technique use',
    cost: 'Slow progression; no support network' }
];

const SAMPLE_METHODS = {
  'Orthodox Sect Method': ['Heng Yue Pure Heart Method', 'Three-Slash Sword Method'],
  'Demonic Method': ['Underworld Ascension Method'],
  'Body Refinement Method': ['Iron Flesh Scripture', 'Nine Yang Golden Body'],
  'Family Heirloom / Incomplete': ['Family Scroll (fragmentary)'],
  'Self-Taught / Improvised': ['Wandering Cloud Scripture']
};

// Starter Spirit-tier techniques (framework §3.6.1). Stored as frozen objects
// on the character — no library dependency.
const STARTER_TECHNIQUES = [
  // Attack
  { name: 'Cloud Piercing Finger', tier: 'Spirit', source: 'Qi', type: 'Attack',
    cost: 1, range: 'Short (10m)', action: 'Standard',
    effect: '+2 dice to a ranged attack roll.',
    category: 'Attack' },
  { name: 'Azure Wind Slash', tier: 'Spirit', source: 'Qi', type: 'Attack',
    cost: 1, range: 'Melee', action: 'Standard',
    effect: '+2 dice to a sword/blade attack.',
    category: 'Attack' },
  { name: 'Rising Sun Palm', tier: 'Spirit', source: 'Body', type: 'Attack',
    cost: 1, range: 'Touch', action: 'Standard',
    effect: '+2 dice to a close-range fire-tinged strike.',
    category: 'Attack' },
  { name: 'Crimson Pulse Arrow', tier: 'Spirit', source: 'Qi', type: 'Attack',
    cost: 1, range: 'Long', action: 'Standard',
    effect: '+2 dice to a bow/projectile attack.',
    category: 'Attack' },
  { name: 'Bone-Shaking Shout', tier: 'Spirit', source: 'Soul', type: 'Attack',
    cost: 1, range: 'Short (10m)', action: 'Standard',
    effect: 'Soul-adjacent intimidate/stun. +2 dice vs lower-realm targets.',
    category: 'Attack' },
  // Defense
  { name: 'Iron Skin (Lesser)', tier: 'Spirit', source: 'Body', type: 'Defense',
    cost: 1, range: 'Self', action: 'Standard',
    effect: '+1 die to physical defense for one scene.',
    category: 'Defense' },
  { name: 'Cloud Barrier', tier: 'Spirit', source: 'Qi', type: 'Defense',
    cost: 1, range: 'Self', action: 'Reaction',
    effect: 'Temporary qi shield — absorbs 1 success worth of incoming damage.',
    category: 'Defense' },
  { name: 'Sliding Step', tier: 'Spirit', source: 'Body', type: 'Defense',
    cost: 1, range: 'Self', action: 'Reaction',
    effect: 'Reactive dodge. +2 dice to one defense roll.',
    category: 'Defense' },
  // Movement
  { name: 'Concealment Step', tier: 'Spirit', source: 'Qi', type: 'Movement',
    cost: 1, range: 'Self', action: 'Standard',
    effect: '+2 dice to evasion or stealth for one action.',
    category: 'Movement' },
  { name: 'Wind Walk', tier: 'Spirit', source: 'Qi', type: 'Movement',
    cost: 1, range: 'Self', action: 'Standard',
    effect: 'Short burst of speed — double movement for one action.',
    category: 'Movement' },
  { name: 'Shadow Trace', tier: 'Spirit', source: 'Qi', type: 'Movement',
    cost: 1, range: 'Self', action: 'Standard',
    effect: 'Silent, leaves no tracks for a scene.',
    category: 'Movement' },
  // Utility
  { name: 'Spirit Sight', tier: 'Spirit', source: 'Soul', type: 'Utility',
    cost: 1, range: 'Self', action: 'Standard',
    effect: 'Reveals nearby spiritual presences and auras.',
    category: 'Utility' },
  { name: 'Muffle Sound', tier: 'Spirit', source: 'Qi', type: 'Utility',
    cost: 1, range: 'Self', action: 'Standard',
    effect: 'Silences sound around you for a scene.',
    category: 'Utility' },
  { name: 'Minor Flame', tier: 'Spirit', source: 'Qi', type: 'Utility',
    cost: 0, range: 'Touch', action: 'Free',
    effect: 'Basic fire ignition; illumination.',
    category: 'Utility' }
];

const DAO_CATEGORIES = [
  { name: 'Elemental', desc: 'Common, combat-versatile, well-documented',
    daos: ['Sword', 'Fire', 'Water', 'Earth', 'Metal', 'Wood', 'Wind', 'Lightning'] },
  { name: 'Conceptual', desc: 'Rare, difficult, devastating at Adept+',
    daos: ['Space', 'Time', 'Karma', 'Cause & Effect'] },
  { name: 'Dark', desc: 'Fast progression, karmic cost',
    daos: ['Slaughter', 'Demonic', 'Ghost', 'Corpse'] },
  { name: 'Life-Death', desc: 'Healing, ending, the cycle',
    daos: ['Life', 'Death', 'Medicine', 'Poison'] },
  { name: 'Craft', desc: 'Slow in combat, devastating in downtime',
    daos: ['Formation', 'Artifact', 'Alchemy'] },
  { name: 'Personal / Unconventional', desc: 'Wang Lin-style — defiance Daos',
    daos: ['Solitude', 'Endurance', 'Resentment', 'Perseverance'] }
];

const LORE_LIST = [
  'Mortal Lore', 'Sect Politics', 'Cultivation Lore', 'Herb & Pill Lore',
  'Artifact Appraisal', 'Beast Lore', 'Ruin & Tomb Lore', 'Karmic Lore'
];

const PRACTICE_LIST = [
  'Spiritual Sense', 'Stealth', 'Deception', 'Insight', 'Intimidation',
  'Negotiation', 'Tracking', 'Survival', 'Etiquette', 'Athletics'
];

const HEART_OATH_EXAMPLES = [
  'I swear on my cultivation to avenge [name]\'s death before I reach Core Formation.',
  'I swear on my Dao to protect [name] until they are grown.',
  'I swear never to take a human life unnecessarily.',
  'My blade will not be sheathed in peace until [name]\'s blood is on it.',
  'I will craft a Mysterious-tier treasure before I leave my sect.'
];

// -----------------------------------------------------------------------------
// HELPERS
// -----------------------------------------------------------------------------

function rollD10() { return 1 + Math.floor(Math.random() * 10); }
function rollD6()  { return 1 + Math.floor(Math.random() * 6); }
function rollD3()  { return 1 + Math.floor(Math.random() * 3); }

function gradeFor2d10(roll) {
  if (roll === 2) return 'Heavenly Spiritual Root (×3)';
  if (roll <= 4)  return 'Heavenly Dao Root (×2.5)';
  if (roll <= 7)  return 'Superior Root (×2)';
  if (roll <= 12) return 'Common Root (×1)';
  if (roll <= 15) return 'Mortal / Waste Root (×0.5)';
  if (roll <= 17) return 'Broken Root (—)';
  if (roll <= 19) return 'Mutant Root (Variable)';
  return 'Heavenly Body';
}

function rollWealthFor(tier) {
  // Returns { low, mid, high } based on the framework's wealth tiers.
  switch (tier) {
    case 'Destitute':    return { low: rollD3(), mid: 0, high: 0 };
    case 'Impoverished': return { low: rollD6(), mid: 0, high: 0 };
    case 'Modest':       return { low: rollD6() + rollD6(), mid: 0, high: 0 };
    case 'Modest (debts)':       return { low: rollD6() + rollD6(), mid: 0, high: 0 };
    case 'Modest (self-reliant)':return { low: rollD6() + rollD6(), mid: 0, high: 0 };
    case 'Modest (loot)':        return { low: rollD6() + rollD6(), mid: 0, high: 0 };
    case 'Wealthy':      return { low: 0, mid: rollD6(), high: 0 };
    default:             return { low: 1, mid: 0, high: 0 };
  }
}

function startingResentmentFor(grade) {
  if (grade && grade.startsWith('Mortal'))  return 3;
  if (grade && grade.startsWith('Broken'))  return 3;
  if (grade && grade.startsWith('Mutant'))  return 1;
  return 0;
}

function makeWipCharacter() {
  return {
    id: uid(),
    name: '', player: '',
    age: null, appearance: '',
    origin: 'Mortal Village Youth',
    affiliation: 'Sect Disciple',
    realm: 'Mortal', substage: 'Early',
    attributes: { body: 0, qi: 0, soul: 0 },
    root: { grade: '', elements: [], mutant: '', heavenlyBody: '', notes: '' },
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
    tiesNamed: [
      { kind: 'love', name: '', description: '' },
      { kind: 'owe',  name: '', description: '' },
      { kind: 'hate', name: '', description: '' }
    ],
    heartOath: { text: '', daoBonus: false, takenAtCreation: false },
    personalItem: { name: '', description: '' },
    countermeasures: '',
    spatialRing: '',
    notes: '',
    createdAt: nowIso(),
    updatedAt: nowIso()
  };
}

// -----------------------------------------------------------------------------
// STEP RENDERERS — each returns the dialog body for that step.
// -----------------------------------------------------------------------------

function stepHeader(step, total, title, subtitle) {
  return h('div', { style: { marginBottom: '14px' } },
    h('div', {
      style: {
        fontFamily: 'Cormorant SC, serif', fontSize: '11px', letterSpacing: '3px',
        color: 'var(--ink-faded)', textTransform: 'uppercase', marginBottom: '4px'
      }
    }, `Step ${step} of ${total}`),
    h('div', {
      style: { fontFamily: 'Cormorant Garamond, serif', fontSize: '22px',
        color: 'var(--cinnabar-deep)', fontWeight: '600' }
    }, title),
    subtitle ? h('div', {
      style: { fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '13px', marginTop: '4px' }
    }, subtitle) : null);
}

// --- Step 1: Origin ----------------------------------------------------------

function renderStep1(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(1, 11, 'Origin & Background',
    'Every cultivator was someone before they were a cultivator. Your Origin grants attribute, lores, practices, wealth, and a starting Tie.'));

  const list = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px',
    maxHeight: '320px', overflowY: 'auto', border: '1px solid var(--paper-edge)',
    padding: '10px', background: 'var(--paper-dark)' } });

  Object.entries(ORIGIN_DATA).forEach(([key, data]) => {
    const card = h('div', {
      style: {
        padding: '10px 12px', cursor: 'pointer',
        border: c.origin === key ? '2px solid var(--cinnabar)' : '1px solid var(--paper-edge)',
        background: c.origin === key ? 'var(--paper)' : 'transparent'
      }
    });
    card.addEventListener('click', () => {
      c.origin = key;
      ctx.rerender();
    });
    card.appendChild(h('div', {
      style: { fontWeight: '600', color: 'var(--ink)', fontSize: '14px' }
    }, key + (data.variant ? '  (variant)' : '')));
    card.appendChild(h('div', {
      style: { fontSize: '11px', color: 'var(--ink-faded)', marginTop: '3px',
        textTransform: 'uppercase', letterSpacing: '1.5px' }
    }, [
      `+1 ${data.attrBonus === 'choice' ? 'to any' : data.attrBonus}`,
      data.wealth,
      `Face ${data.face.value}${data.face.scope ? ' (' + data.face.scope + ')' : ''}`
    ].join(' · ')));
    card.appendChild(h('div', { style: { fontSize: '13px', marginTop: '5px', color: 'var(--ink-soft)' } },
      'Lores: ' + data.lores.join(', ') + ' · Practices: ' + data.practices.join(', ')));
    if (data.hook) card.appendChild(h('div', {
      style: { fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: '12px', marginTop: '4px' }
    }, data.hook));
    if (data.note) card.appendChild(h('div', {
      style: { fontSize: '11px', color: 'var(--cinnabar-deep)', marginTop: '4px' }
    }, data.note));
    list.appendChild(card);
  });
  body.appendChild(list);

  // If "+1 to any" attribute, let player pick now
  const sel = ORIGIN_DATA[c.origin];
  if (sel && sel.attrBonus === 'choice') {
    body.appendChild(h('div', { class: 'note-box', style: { marginTop: '12px' } },
      'This Origin gives a +1 attribute bonus of your choice. Pick now:'));
    body.appendChild(fieldSelect('Bonus attribute', ctx.originAttrChoice || 'body',
      [['body', 'Body'], ['qi', 'Qi'], ['soul', 'Soul']],
      v => { ctx.originAttrChoice = v; }));
  }
  return body;
}

// --- Step 2: Attributes ------------------------------------------------------

function renderStep2(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(2, 11, 'Attributes',
    'Distribute 5 points across Body, Qi, and Soul (max 3 in any single attribute). Your Origin\'s +1 bonus applies after.'));

  const sel = ORIGIN_DATA[c.origin];
  const bonusAttr = sel.attrBonus === 'choice' ? (ctx.originAttrChoice || 'body') : sel.attrBonus;

  const total = (c.attributes.body || 0) + (c.attributes.qi || 0) + (c.attributes.soul || 0);
  const remaining = 5 - total;

  const status = h('div', {
    style: { padding: '8px 10px', background: 'var(--paper-dark)',
      border: '1px solid var(--paper-edge)', marginBottom: '14px',
      fontFamily: 'Cormorant SC, serif', fontSize: '12px', letterSpacing: '2px',
      textTransform: 'uppercase' }
  }, `Points remaining: ${remaining} / 5  ·  Origin bonus: +1 ${bonusAttr}`);
  if (remaining < 0) status.style.color = 'var(--cinnabar-deep)';
  body.appendChild(status);

  const grid = h('div', { class: 'field-row three' });
  ['body', 'qi', 'soul'].forEach(key => {
    const wrap = h('div', { class: 'field' });
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    const baseVal = c.attributes[key] || 0;
    const finalVal = baseVal + (key === bonusAttr ? 1 : 0);
    wrap.appendChild(h('label', { class: 'field-label' },
      `${label} (max 3 base)`));
    const row = h('div', { style: { display: 'flex', gap: '8px', alignItems: 'center' } });
    const dec = h('button', { class: 'btn small ghost' }, '−');
    dec.addEventListener('click', () => {
      if (baseVal > 0) { c.attributes[key] = baseVal - 1; ctx.rerender(); }
    });
    const inc = h('button', { class: 'btn small ghost' }, '+');
    inc.addEventListener('click', () => {
      if (baseVal < 3 && remaining > 0) { c.attributes[key] = baseVal + 1; ctx.rerender(); }
    });
    row.appendChild(dec);
    row.appendChild(h('div', {
      style: { fontFamily: 'Cormorant Garamond, serif', fontSize: '24px',
        minWidth: '70px', textAlign: 'center' }
    }, baseVal + (key === bonusAttr ? '  (+1 = ' + finalVal + ')' : '')));
    row.appendChild(inc);
    wrap.appendChild(row);
    grid.appendChild(wrap);
  });
  body.appendChild(grid);

  body.appendChild(h('div', { class: 'note-box', style: { marginTop: '8px' } },
    'A 1 in any attribute is a real handicap. A Body-1 character takes 2 wounds and starts limping. A Soul-1 character can\'t see threats coming.'));
  return body;
}

// --- Step 3: Spiritual Roots -------------------------------------------------

function renderStep3(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(3, 11, 'Spiritual Roots',
    'Roll 2d10 publicly. The dice decide. No rerolls.'));

  const rollWrap = h('div', {
    style: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }
  });
  const rollBtn = h('button', { class: 'btn primary' }, '⚀ Roll 2d10');
  rollBtn.addEventListener('click', () => {
    const a = rollD10(), b = rollD10();
    const sum = a + b;
    ctx.rootRoll = { a, b, sum };
    const grade = gradeFor2d10(sum);
    c.root.grade = grade;
    c.root.elements = [];
    c.root.mutant = '';
    c.root.heavenlyBody = '';
    if (grade.startsWith('Mortal')) {
      c.root.elements = [...FIVE_ELEMENTS];
    }
    if (grade.startsWith('Mutant')) {
      const m = MUTANT_ROOTS[rollD6() - 1];
      c.root.mutant = m.name;
      c.root.notes = m.desc;
    }
    c.karma.resentment = startingResentmentFor(grade);
    c.karma.resentmentMax = c.karma.resentment + 3;
    ctx.rerender();
  });
  rollWrap.appendChild(rollBtn);

  if (ctx.rootRoll) {
    rollWrap.appendChild(h('div', {
      style: { fontFamily: 'Cormorant Garamond, serif', fontSize: '24px',
        color: 'var(--cinnabar-deep)' }
    }, `${ctx.rootRoll.a} + ${ctx.rootRoll.b} = ${ctx.rootRoll.sum}`));
  } else {
    rollWrap.appendChild(h('div', { style: { color: 'var(--ink-faded)', fontStyle: 'italic' } },
      'No roll yet. The dice are waiting.'));
  }
  body.appendChild(rollWrap);

  // Manual override (in case GM lets player choose / voluntary downgrade)
  body.appendChild(fieldSelect('Or manually set grade (e.g. voluntary Wang Lin downgrade)',
    c.root.grade, ['', ...ROOT_GRADES], v => {
      c.root.grade = v;
      c.root.elements = [];
      c.root.mutant = '';
      c.root.heavenlyBody = '';
      if (v.startsWith('Mortal')) c.root.elements = [...FIVE_ELEMENTS];
      c.karma.resentment = startingResentmentFor(v);
      c.karma.resentmentMax = c.karma.resentment + 3;
      ctx.rerender();
    }, { allowEmpty: true }));

  if (!c.root.grade) {
    body.appendChild(h('div', { class: 'note-box', style: { marginTop: '8px' } },
      'Roll the dice or pick a grade above to continue.'));
    return body;
  }

  // Show grade summary
  body.appendChild(h('div', {
    style: { padding: '10px 12px', background: 'var(--paper-dark)',
      border: '1px solid var(--paper-edge)', marginTop: '8px' }
  }, h('div', { style: { fontWeight: '600', color: 'var(--cinnabar-deep)' } }, c.root.grade),
    c.karma.resentment > 0 ? h('div', { style: { fontSize: '12px', marginTop: '4px' } },
      `Heavenly Resentment pool: ${c.karma.resentment} (cap ${c.karma.resentmentMax})`) : null));

  // Element / mutant / heavenly body picker
  const spec = getRootElementSpec(c.root.grade);
  if (spec && spec.type === 'pick') {
    body.appendChild(h('div', { class: 'field-label', style: { marginTop: '14px' } },
      `Elements (${spec.hint})`));
    const elGrid = h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } });
    FIVE_ELEMENTS.forEach(el => {
      const has = c.root.elements.includes(el);
      const chip = h('button', {
        class: 'btn small' + (has ? ' primary' : ' ghost'),
        style: { minWidth: '80px' }
      }, ELEMENT_CN[el] + '  ' + el);
      chip.addEventListener('click', () => {
        if (has) c.root.elements = c.root.elements.filter(e => e !== el);
        else if (c.root.elements.length < spec.max) c.root.elements = [...c.root.elements, el];
        else { notice(`Pick at most ${spec.max}.`, 'cinnabar'); return; }
        ctx.rerender();
      });
      elGrid.appendChild(chip);
    });
    body.appendChild(elGrid);
    if (spec.harmonious && c.root.elements.length === 2) {
      const ok = arePairHarmonious(c.root.elements[0], c.root.elements[1]);
      body.appendChild(h('div', {
        style: { marginTop: '6px', fontSize: '12px',
          color: ok ? 'var(--ink-soft)' : 'var(--cinnabar-deep)' }
      }, ok ? '✓ Harmonious pair (generative cycle).'
            : '✗ Not harmonious. Heavenly Dao Root requires adjacent generative-cycle elements.'));
    }
  } else if (spec && spec.type === 'fixed') {
    body.appendChild(h('div', { style: { marginTop: '10px', fontSize: '13px' } },
      'Elements: ' + spec.elements.map(e => ELEMENT_CN[e] + ' ' + e).join(' · ') + ' (impure)'));
  } else if (spec && spec.type === 'mutant') {
    body.appendChild(fieldSelect('Mutant root', c.root.mutant,
      ['', ...MUTANT_ROOTS.map(m => m.name)],
      v => { c.root.mutant = v; ctx.rerender(); }, { allowEmpty: true }));
    if (c.root.mutant) {
      const m = MUTANT_ROOTS.find(x => x.name === c.root.mutant);
      if (m) body.appendChild(h('div', {
        style: { fontStyle: 'italic', fontSize: '12px', color: 'var(--ink-soft)', marginTop: '4px' }
      }, m.desc));
    }
  } else if (c.root.grade === 'Heavenly Body') {
    body.appendChild(fieldSelect('Heavenly Body', c.root.heavenlyBody,
      ['', ...HEAVENLY_BODIES.map(b => b.name)],
      v => { c.root.heavenlyBody = v; ctx.rerender(); }, { allowEmpty: true }));
    if (c.root.heavenlyBody) {
      const b = HEAVENLY_BODIES.find(x => x.name === c.root.heavenlyBody);
      if (b) body.appendChild(h('div', {
        style: { fontStyle: 'italic', fontSize: '12px', color: 'var(--ink-soft)', marginTop: '4px' }
      }, b.desc));
    }
  }
  return body;
}

// --- Step 4: Dao Seed --------------------------------------------------------

function renderStep4(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(4, 11, 'Dao Seed',
    'You don\'t comprehend a Dao at creation — you have a predisposition. Insight in your Seed Dao accumulates 2× faster.'));

  DAO_CATEGORIES.forEach(cat => {
    body.appendChild(h('div', {
      style: { marginTop: '14px', fontFamily: 'Cormorant SC, serif',
        fontSize: '12px', letterSpacing: '2px', color: 'var(--cinnabar-deep)',
        textTransform: 'uppercase' }
    }, cat.name + ' — ' + cat.desc));
    const row = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' } });
    cat.daos.forEach(d => {
      const chip = h('button', {
        class: 'btn small' + (c.daoSeed === d ? ' primary' : ' ghost')
      }, d);
      chip.addEventListener('click', () => { c.daoSeed = d; ctx.rerender(); });
      row.appendChild(chip);
    });
    body.appendChild(row);
  });

  if (c.daoSeed) {
    body.appendChild(h('div', { class: 'note-box', style: { marginTop: '14px' } },
      `Seed: ${c.daoSeed}. Techniques aligned with this Dao earn 1.5× Mastery Points in play.`));
  }
  return body;
}

// --- Step 5: Cultivation Method ----------------------------------------------

function renderStep5(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(5, 11, 'Cultivation Method',
    'The framework that governs how you refine qi. Distinct from individual techniques — this is the manual within which all your cultivation happens.'));

  if (!c.method.frozen) c.method.frozen = { name: '', type: '', peakRealm: '', bonus: '', cost: '', description: '' };

  const list = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' } });
  METHOD_TYPES.forEach(m => {
    const card = h('div', {
      style: { padding: '10px 12px', cursor: 'pointer',
        border: c.method.frozen.type === m.name ? '2px solid var(--cinnabar)' : '1px solid var(--paper-edge)',
        background: c.method.frozen.type === m.name ? 'var(--paper)' : 'transparent' }
    });
    card.addEventListener('click', () => {
      c.method.frozen.type = m.name;
      c.method.frozen.peakRealm = m.peakRealm;
      c.method.frozen.bonus = m.bonus;
      c.method.frozen.cost = m.cost;
      ctx.rerender();
    });
    card.appendChild(h('div', { style: { fontWeight: '600' } }, m.name));
    card.appendChild(h('div', { style: { fontSize: '11px', color: 'var(--ink-faded)', textTransform: 'uppercase', letterSpacing: '1.5px', marginTop: '3px' } },
      'Peak: ' + m.peakRealm));
    card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '4px' } },
      h('strong', {}, 'Bonus: '), m.bonus));
    card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '2px', color: 'var(--ink-soft)' } },
      h('strong', {}, 'Cost: '), m.cost));
    list.appendChild(card);
  });
  body.appendChild(list);

  if (c.method.frozen.type) {
    const samples = SAMPLE_METHODS[c.method.frozen.type] || [];
    if (samples.length) {
      body.appendChild(h('div', { class: 'field-label' }, 'Sample named methods (or write your own below)'));
      const row = h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' } });
      samples.forEach(name => {
        const chip = h('button', {
          class: 'btn small' + (c.method.frozen.name === name ? ' primary' : ' ghost')
        }, name);
        chip.addEventListener('click', () => { c.method.frozen.name = name; ctx.rerender(); });
        row.appendChild(chip);
      });
      body.appendChild(row);
    }
    body.appendChild(fieldText('Method name', c.method.frozen.name,
      v => { c.method.frozen.name = v; }, { placeholder: 'e.g. Heng Yue Pure Heart Method' }));
    body.appendChild(fieldTextarea('Method description (optional)', c.method.frozen.description || '',
      v => { c.method.frozen.description = v; },
      'Add lineage, restrictions, sect-branding details…'));
  }
  return body;
}

// --- Step 6: Starting Techniques ---------------------------------------------

function renderStep6(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(6, 11, 'Starting Techniques',
    'Pick exactly 2 Spirit-tier techniques. Both start at Mastery: Rough. A balanced pair: one that closes (attack/movement), one that saves your life (defense/perception).'));

  const picked = c.techniques.map(t => t.frozen?.name).filter(Boolean);
  body.appendChild(h('div', {
    style: { padding: '6px 10px', background: 'var(--paper-dark)',
      border: '1px solid var(--paper-edge)', marginBottom: '12px',
      fontFamily: 'Cormorant SC, serif', fontSize: '11px', letterSpacing: '2px',
      textTransform: 'uppercase' }
  }, `Picked: ${picked.length} / 2  ${picked.length ? '— ' + picked.join(', ') : ''}`));

  const grouped = {};
  STARTER_TECHNIQUES.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  Object.entries(grouped).forEach(([cat, techs]) => {
    body.appendChild(h('div', {
      style: { marginTop: '10px', fontFamily: 'Cormorant SC, serif',
        fontSize: '12px', letterSpacing: '2px', color: 'var(--cinnabar-deep)',
        textTransform: 'uppercase' }
    }, cat));
    techs.forEach(t => {
      const isPicked = picked.includes(t.name);
      const card = h('div', {
        style: {
          padding: '8px 10px', cursor: 'pointer', marginTop: '4px',
          border: isPicked ? '2px solid var(--cinnabar)' : '1px solid var(--paper-edge)',
          background: isPicked ? 'var(--paper)' : 'transparent'
        }
      });
      card.addEventListener('click', () => {
        if (isPicked) {
          c.techniques = c.techniques.filter(x => x.frozen?.name !== t.name);
        } else if (c.techniques.length >= 2) {
          notice('Pick exactly 2 techniques. Click a picked one to swap.', 'cinnabar');
          return;
        } else {
          c.techniques.push({ ref: null, frozen: structuredClone(t), mastery: 0 });
        }
        ctx.rerender();
      });
      card.appendChild(h('div', { style: { fontWeight: '600' } },
        t.name, h('span', {
          style: { float: 'right', fontSize: '11px', color: 'var(--ink-faded)' }
        }, `${t.cost} qi · ${t.action}`)));
      card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '3px', color: 'var(--ink-soft)' } },
        t.effect));
      body.appendChild(card);
    });
  });
  return body;
}

// --- Step 7: Kit, Wealth, Countermeasures ------------------------------------

function renderStep7(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(7, 11, 'Kit, Wealth & Countermeasures',
    'Your starting material loadout. Mostly determined by Origin and Affiliation.'));

  const sel = ORIGIN_DATA[c.origin];
  const aff = AFFILIATION_DATA[c.affiliation];

  // Wealth roll
  body.appendChild(h('div', { class: 'field-label' },
    `Spirit Stones (Wealth tier: ${sel.wealth})`));
  const stoneRow = h('div', { style: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' } });
  const rollBtn = h('button', { class: 'btn' }, '⚀ Roll Wealth');
  rollBtn.addEventListener('click', () => {
    c.wealth = rollWealthFor(sel.wealth);
    ctx.wealthRolled = true;
    ctx.rerender();
  });
  stoneRow.appendChild(rollBtn);
  stoneRow.appendChild(h('div', {
    style: { fontFamily: 'Cormorant Garamond, serif', fontSize: '18px' }
  }, `${c.wealth.low} low · ${c.wealth.mid} mid · ${c.wealth.high} high`));
  body.appendChild(stoneRow);

  // Personal item
  body.appendChild(h('div', { class: 'field-label' }, 'Personal Item — narratively significant, not mechanically powerful'));
  body.appendChild(fieldText('Item name', c.personalItem.name,
    v => c.personalItem.name = v,
    { placeholder: "Mother's ring, dead brother's sword, master's calligraphy…" }));
  body.appendChild(fieldTextarea('Why does it matter?', c.personalItem.description,
    v => c.personalItem.description = v,
    'The GM takes note. This item will come up — anchor for Karma, key to plots, the thing you lose at your lowest.'));

  // Countermeasure (auto-set from affiliation)
  if (!c.countermeasures && aff) c.countermeasures = aff.countermeasure;
  body.appendChild(fieldTextarea('Countermeasures (life-saving talismans, escape items)',
    c.countermeasures, v => c.countermeasures = v,
    aff?.countermeasure || 'No safety net.'));

  // Spatial ring
  if (!c.spatialRing && aff) c.spatialRing = aff.spatialRing;
  body.appendChild(fieldText('Spatial Ring', c.spatialRing,
    v => c.spatialRing = v, { placeholder: aff?.spatialRing || 'None' }));

  return body;
}

// --- Step 8: Affiliation -----------------------------------------------------

function renderStep8(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(8, 11, 'Affiliation',
    'Your organizational context. Determines starting Face, obligations, ongoing income, and who comes looking for you when you\'re in trouble.'));

  const list = h('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } });
  AFFILIATIONS.forEach(name => {
    const data = AFFILIATION_DATA[name];
    const card = h('div', {
      style: { padding: '10px 12px', cursor: 'pointer',
        border: c.affiliation === name ? '2px solid var(--cinnabar)' : '1px solid var(--paper-edge)',
        background: c.affiliation === name ? 'var(--paper)' : 'transparent' }
    });
    card.addEventListener('click', () => {
      c.affiliation = name;
      c.face.value = data.face;
      c.face.type = data.faceType;
      // Reset rogue/clan choices when switching
      ctx.affiliationLore = '';
      ctx.affiliationPractice = '';
      ctx.rerender();
    });
    card.appendChild(h('div', { style: { fontWeight: '600' } },
      name,
      h('span', { style: { float: 'right', fontSize: '11px', color: 'var(--ink-faded)' } },
        `Face ${data.face}`)));
    card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '3px', color: 'var(--ink-soft)' } },
      data.rank));
    card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '4px' } },
      h('strong', {}, 'Obligations: '), data.obligations));
    card.appendChild(h('div', { style: { fontSize: '12px', marginTop: '2px' } },
      h('strong', {}, 'Countermeasure: '), data.countermeasure));
    if (data.note) card.appendChild(h('div', {
      style: { fontStyle: 'italic', fontSize: '11px', color: 'var(--cinnabar-deep)', marginTop: '4px' }
    }, data.note));
    list.appendChild(card);
  });
  body.appendChild(list);

  // Affiliation choice fields
  const aff = AFFILIATION_DATA[c.affiliation];
  if (aff && Array.isArray(aff.bonusLoreChoice)) {
    body.appendChild(h('div', { style: { marginTop: '14px' } }));
    body.appendChild(fieldSelect('Affiliation Lore (Clan choice)',
      ctx.affiliationLore || '', ['', ...aff.bonusLoreChoice],
      v => { ctx.affiliationLore = v; }, { allowEmpty: true }));
  } else if (aff && aff.bonusLoreChoice === 'free') {
    body.appendChild(fieldSelect('Affiliation Lore (free choice — Rogue)',
      ctx.affiliationLore || '', ['', ...LORE_LIST],
      v => { ctx.affiliationLore = v; }, { allowEmpty: true }));
    body.appendChild(fieldSelect('Affiliation Practice (free choice — Rogue)',
      ctx.affiliationPractice || '', ['', ...PRACTICE_LIST],
      v => { ctx.affiliationPractice = v; }, { allowEmpty: true }));
  }
  return body;
}

// --- Step 9: Lores & Practices (review/swap) ---------------------------------

function computeLoresAndPractices(ctx) {
  const { c } = ctx;
  const sel = ORIGIN_DATA[c.origin];
  const aff = AFFILIATION_DATA[c.affiliation];
  const lores = [...sel.lores];
  const practices = sel.practices.map(p => ({ name: p, rank: 1 }));
  // Affiliation grants
  if (aff) {
    if (aff.bonusLore && !lores.includes(aff.bonusLore)) lores.push(aff.bonusLore);
    if (Array.isArray(aff.bonusLoreChoice) && ctx.affiliationLore && !lores.includes(ctx.affiliationLore)) {
      lores.push(ctx.affiliationLore);
    }
    if (aff.bonusLoreChoice === 'free' && ctx.affiliationLore && !lores.includes(ctx.affiliationLore)) {
      lores.push(ctx.affiliationLore);
    }
    if (aff.bonusPractice && !practices.find(p => p.name === aff.bonusPractice)) {
      practices.push({ name: aff.bonusPractice, rank: 1 });
    }
    if (aff.bonusPracticeChoice === 'free' && ctx.affiliationPractice
        && !practices.find(p => p.name === ctx.affiliationPractice)) {
      practices.push({ name: ctx.affiliationPractice, rank: 1 });
    }
  }
  return { lores, practices };
}

function renderStep9(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(9, 11, 'Lores & Practices',
    'Auto-derived from your Origin (2+2) and Affiliation (+1+1). Total target: 3 Lores + 3 Practices. Review and adjust if needed.'));

  // Apply derived values to character now
  const { lores, practices } = computeLoresAndPractices(ctx);
  c.lores = lores;
  c.practices = practices;

  const sel = ORIGIN_DATA[c.origin];
  const aff = AFFILIATION_DATA[c.affiliation];

  body.appendChild(h('div', { class: 'field-label' }, `From Origin (${c.origin})`));
  body.appendChild(h('div', { style: { fontSize: '13px', marginBottom: '10px' } },
    'Lores: ', sel.lores.join(', '),
    h('br', {}),
    'Practices: ', sel.practices.join(', ')));

  body.appendChild(h('div', { class: 'field-label' }, `From Affiliation (${c.affiliation})`));
  if (aff?.bonusLore) {
    body.appendChild(h('div', { style: { fontSize: '13px', marginBottom: '4px' } },
      'Lore: ' + aff.bonusLore));
  }
  if (aff?.bonusLoreChoice) {
    body.appendChild(h('div', { style: { fontSize: '13px', marginBottom: '4px' } },
      'Lore (chosen in Step 8): ' + (ctx.affiliationLore || '— not chosen —')));
  }
  if (aff?.bonusPractice) {
    body.appendChild(h('div', { style: { fontSize: '13px', marginBottom: '4px' } },
      'Practice: ' + aff.bonusPractice));
  }
  if (aff?.bonusPracticeChoice === 'free') {
    body.appendChild(h('div', { style: { fontSize: '13px', marginBottom: '4px' } },
      'Practice (chosen in Step 8): ' + (ctx.affiliationPractice || '— not chosen —')));
  }

  // Show totals
  body.appendChild(h('div', {
    style: { padding: '8px 10px', background: 'var(--paper-dark)',
      border: '1px solid var(--paper-edge)', marginTop: '14px' }
  },
    h('div', { style: { fontWeight: '600' } }, `Total Lores (${c.lores.length}): ${c.lores.join(', ')}`),
    h('div', { style: { fontWeight: '600', marginTop: '4px' } },
      `Total Practices (${c.practices.length}): ${c.practices.map(p => p.name).join(', ')} (all Trained, +1)`)));

  if (c.lores.length < 3 || c.practices.length < 3) {
    body.appendChild(h('div', { class: 'note-box', style: { marginTop: '10px',
      borderColor: 'var(--cinnabar)', color: 'var(--cinnabar-deep)' } },
      'You\'re short on starting Lores or Practices. Go back to Step 8 and finish your Affiliation choices, or your Origin only granted 1 Lore — pick a free 2nd Lore here:'));
    if (c.lores.length < 3) {
      body.appendChild(fieldSelect('Free extra Lore (origin had only 1)',
        ctx.extraLore || '', ['', ...LORE_LIST.filter(l => !c.lores.includes(l))],
        v => { ctx.extraLore = v; if (v) c.lores = [...c.lores, v]; ctx.rerender(); },
        { allowEmpty: true }));
    }
  }

  return body;
}

// --- Step 10: Karma, Ties, Heart Oath ----------------------------------------

function renderStep10(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(10, 11, 'Karma, Ties & Heart Oaths',
    'Your starting Karma Ledger. Three named Ties — real names, real relationships. The GM\'s hooks for the campaign.'));

  // Origin karma mod display
  const sel = ORIGIN_DATA[c.origin];
  if (sel.karmaMod) {
    const parts = [];
    if (sel.karmaMod.black) parts.push(`${sel.karmaMod.black} Black Karma`);
    if (sel.karmaMod.bloodDebt) parts.push(`Blood Debt: ${sel.karmaMod.bloodDebt}`);
    if (sel.karmaMod.note) parts.push(sel.karmaMod.note);
    body.appendChild(h('div', { class: 'note-box' },
      'Origin grants: ', parts.join(' · ')));
    if (typeof sel.karmaMod.black === 'number') c.karma.black = (c.karma.black || 0) + sel.karmaMod.black;
  }

  // The three ties
  const tieLabels = {
    love: 'One person you LOVE (whose safety moves you)',
    owe:  'One person you OWE (Life Debt — who saved/paid for/protected you)',
    hate: 'One person you HATE (specific — rival, betrayer, killer)'
  };
  c.tiesNamed.forEach((tie, idx) => {
    const wrap = h('div', {
      style: { padding: '10px', border: '1px solid var(--paper-edge)',
        background: 'var(--paper-dark)', marginBottom: '10px' }
    });
    wrap.appendChild(h('div', {
      style: { fontFamily: 'Cormorant SC, serif', fontSize: '11px',
        letterSpacing: '2px', color: 'var(--cinnabar-deep)', textTransform: 'uppercase' }
    }, tieLabels[tie.kind]));
    wrap.appendChild(fieldText('Name', tie.name, v => c.tiesNamed[idx].name = v,
      { placeholder: 'e.g. Wang Mei — younger sister, fourteen, still in our village' }));
    wrap.appendChild(fieldTextarea('Relationship / why they matter', tie.description,
      v => c.tiesNamed[idx].description = v,
      'Vague ties don\'t work. Be specific.'));
    body.appendChild(wrap);
  });

  // Heart Oath
  body.appendChild(h('div', { class: 'field-label', style: { marginTop: '14px' } },
    'Optional — Starting Heart Oath (+2 Insight in your Dao Seed)'));
  const oathToggle = h('div', { style: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' } });
  const cb = h('input', { type: 'checkbox' });
  if (c.heartOath.takenAtCreation) cb.setAttribute('checked', '');
  cb.addEventListener('change', () => {
    c.heartOath.takenAtCreation = cb.checked;
    c.heartOath.daoBonus = cb.checked;
    ctx.rerender();
  });
  oathToggle.appendChild(cb);
  oathToggle.appendChild(h('span', { style: { fontSize: '13px' } },
    'I am taking a Heart Oath at creation'));
  body.appendChild(oathToggle);

  if (c.heartOath.takenAtCreation) {
    body.appendChild(fieldTextarea('Heart Oath text', c.heartOath.text,
      v => c.heartOath.text = v,
      HEART_OATH_EXAMPLES[0]));
    body.appendChild(h('div', { class: 'note-box', style: { fontSize: '12px' } },
      'Examples: ' + HEART_OATH_EXAMPLES.slice(0, 3).join(' · ')));
    body.appendChild(h('div', { style: { fontSize: '12px', color: 'var(--cinnabar-deep)', marginTop: '6px' } },
      'Breaking it: immediate Qi Deviation (drop 1 sub-stage), +3 to +5 Black Karma, Face loss.'));
  }

  return body;
}

// --- Step 11: Name, Age, Appearance ------------------------------------------

function renderStep11(ctx) {
  const { c } = ctx;
  const body = h('div', {});
  body.appendChild(stepHeader(11, 11, 'Name, Age & Appearance',
    'Identity and presentation.'));

  body.appendChild(fieldText('Birth name', c.name, v => c.name = v,
    { placeholder: 'Wang Lin' }));
  body.appendChild(fieldText("Player's name (optional)", c.player, v => c.player = v,
    { placeholder: 'Optional — for the GM\'s ledger' }));

  const ageDefaults = { 'Mortal': 16, 'Qi Condensation': 18 };
  if (c.age == null) c.age = ageDefaults[c.realm] || 18;
  body.appendChild(fieldNumber('Age', c.age, v => c.age = v, { min: 10, max: 999 }));

  body.appendChild(fieldTextarea('Appearance', c.appearance, v => c.appearance = v,
    'Distinguishing marks, robes/garb, carried objects. Faded noble robes; ancestral sword that doesn\'t match the outfit; ink-stained fingers; calloused hands…'));

  // Final summary
  body.appendChild(h('div', {
    style: { padding: '12px 14px', background: 'var(--paper-dark)',
      border: '1px solid var(--paper-edge)', marginTop: '16px' }
  },
    h('div', { style: { fontFamily: 'Cormorant SC, serif', fontSize: '11px',
      letterSpacing: '2px', color: 'var(--cinnabar-deep)', textTransform: 'uppercase', marginBottom: '6px' } },
      'Sheet Summary'),
    h('div', { style: { fontSize: '13px', lineHeight: '1.6' } },
      `${c.name || '(unnamed)'} · ${c.origin} · ${c.affiliation}`, h('br', {}),
      `Body ${c.attributes.body} · Qi ${c.attributes.qi} · Soul ${c.attributes.soul} (before Origin bonus)`, h('br', {}),
      `Root: ${c.root.grade || '—'}${c.root.elements.length ? ' (' + c.root.elements.join(', ') + ')' : ''}`, h('br', {}),
      `Dao Seed: ${c.daoSeed || '—'}`, h('br', {}),
      `Method: ${c.method.frozen?.name || '—'} (${c.method.frozen?.type || '—'})`, h('br', {}),
      `Techniques: ${c.techniques.map(t => t.frozen.name).join(', ') || '—'}`, h('br', {}),
      `Wealth: ${c.wealth.low} low · ${c.wealth.mid} mid`, h('br', {}),
      `Lores: ${c.lores.join(', ')}`, h('br', {}),
      `Practices: ${c.practices.map(p => p.name).join(', ')}`)));

  return body;
}

// -----------------------------------------------------------------------------
// VALIDATION — gates Next button per step
// -----------------------------------------------------------------------------

function validateStep(step, ctx) {
  const { c } = ctx;
  switch (step) {
    case 1:
      if (!c.origin) return 'Pick an Origin.';
      return null;
    case 2: {
      const total = (c.attributes.body || 0) + (c.attributes.qi || 0) + (c.attributes.soul || 0);
      if (total !== 5) return `Distribute exactly 5 points (${total} so far).`;
      if (c.attributes.body > 3 || c.attributes.qi > 3 || c.attributes.soul > 3)
        return 'Max 3 in any single attribute (before Origin bonus).';
      return null;
    }
    case 3: {
      if (!c.root.grade) return 'Roll roots or pick a grade.';
      const spec = getRootElementSpec(c.root.grade);
      if (spec?.type === 'pick') {
        if (c.root.elements.length < spec.min) return `Pick at least ${spec.min} element(s).`;
        if (spec.harmonious && c.root.elements.length === 2 &&
            !arePairHarmonious(c.root.elements[0], c.root.elements[1])) {
          return 'Heavenly Dao Root requires a harmonious pair.';
        }
      } else if (spec?.type === 'mutant' && !c.root.mutant) {
        return 'Pick a mutant root.';
      } else if (c.root.grade === 'Heavenly Body' && !c.root.heavenlyBody) {
        return 'Pick a Heavenly Body.';
      }
      return null;
    }
    case 4:
      if (!c.daoSeed) return 'Pick a Dao Seed.';
      return null;
    case 5:
      if (!c.method.frozen?.type) return 'Pick a method type.';
      if (!c.method.frozen?.name) return 'Give the method a name.';
      return null;
    case 6:
      if (c.techniques.length !== 2) return 'Pick exactly 2 techniques.';
      return null;
    case 7:
      return null; // wealth roll optional, items optional
    case 8: {
      if (!c.affiliation) return 'Pick an Affiliation.';
      const aff = AFFILIATION_DATA[c.affiliation];
      if (Array.isArray(aff.bonusLoreChoice) && !ctx.affiliationLore)
        return 'Clan affiliations require a lore choice (Karmic vs Artifact Appraisal).';
      if (aff.bonusLoreChoice === 'free' && !ctx.affiliationLore)
        return 'Rogue: pick a free Lore.';
      if (aff.bonusPracticeChoice === 'free' && !ctx.affiliationPractice)
        return 'Rogue: pick a free Practice.';
      return null;
    }
    case 9:
      if (c.lores.length < 3) return 'Need 3 Lores total.';
      return null;
    case 10: {
      const missing = c.tiesNamed.filter(t => !t.name?.trim());
      if (missing.length) return 'All three Ties need a name.';
      if (c.heartOath.takenAtCreation && !c.heartOath.text?.trim())
        return 'Write your Heart Oath, or uncheck the box.';
      return null;
    }
    case 11:
      if (!c.name?.trim()) return 'Birth name required.';
      return null;
  }
  return null;
}

// -----------------------------------------------------------------------------
// FINISH — apply Origin attribute bonus, push character
// -----------------------------------------------------------------------------

async function finishWizard(ctx, navigate) {
  const { c } = ctx;
  // Apply the Origin attribute bonus now (kept separate from base 5-point
  // distribution so the wizard could show "+1" clearly). Stored ON the
  // character — the editor doesn't know about wizard-time staging.
  const sel = ORIGIN_DATA[c.origin];
  const bonusAttr = sel.attrBonus === 'choice' ? (ctx.originAttrChoice || 'body') : sel.attrBonus;
  c.attributes[bonusAttr] = (c.attributes[bonusAttr] || 0) + 1;

  // Apply Heart Oath bonus to insight (stored on the dao if the char model
  // supports daos array — we just set a note since the insight system isn't
  // mechanically tracked here).
  if (c.heartOath.takenAtCreation && c.heartOath.daoBonus) {
    c.daos = [{ name: c.daoSeed, insight: 2, fromOath: true }];
  }

  // Build a free-text summary into c.ties from tiesNamed for backward compat
  c.ties = c.tiesNamed.filter(t => t.name?.trim()).map(t => {
    const label = { love: 'Love', owe: 'Owe', hate: 'Hate' }[t.kind] || 'Tie';
    return `${label}: ${t.name}${t.description ? ' — ' + t.description : ''}`;
  }).join(' · ');

  // Heart Oath into notes if not stored elsewhere
  if (c.heartOath.takenAtCreation && c.heartOath.text) {
    c.notes = (c.notes ? c.notes + '\n\n' : '') + 'HEART OATH: ' + c.heartOath.text;
  }

  // Personal item into items list as a flagged entry too
  if (c.personalItem.name) {
    c.items.push({
      id: uid(), name: c.personalItem.name, category: 'Personal',
      consumable: false, value: '', effect: '', personal: true,
      description: c.personalItem.description, qty: 1
    });
  }

  c.updatedAt = nowIso();

  try {
    await createCharacterRemote(c);
  } catch (e) {
    notice('Create failed: ' + e.message, 'cinnabar');
    return;
  }
  state.characters.push(c);
  closeDialog();
  navigate('character-edit', { id: c.id });
  notice('Character forged.');
}

// -----------------------------------------------------------------------------
// ENTRY POINT
// -----------------------------------------------------------------------------

const STEP_RENDERERS = {
  1: renderStep1, 2: renderStep2, 3: renderStep3, 4: renderStep4,
  5: renderStep5, 6: renderStep6, 7: renderStep7, 8: renderStep8,
  9: renderStep9, 10: renderStep10, 11: renderStep11
};

export function openCharacterWizard(navigate) {
  const ctx = {
    c: makeWipCharacter(),
    step: 1,
    originAttrChoice: 'body',
    rootRoll: null,
    wealthRolled: false,
    affiliationLore: '',
    affiliationPractice: '',
    extraLore: ''
  };

  function renderCurrentStep() {
    const renderer = STEP_RENDERERS[ctx.step];
    const body = renderer(ctx);

    const actions = [
      { label: 'Cancel', handler: () => closeDialog() }
    ];
    if (ctx.step > 1) {
      actions.push({ label: '← Back', handler: () => { ctx.step--; renderCurrentStep(); } });
    }
    if (ctx.step < 11) {
      actions.push({
        label: 'Next →', primary: true,
        handler: () => {
          const err = validateStep(ctx.step, ctx);
          if (err) { notice(err, 'cinnabar'); return; }
          ctx.step++;
          renderCurrentStep();
        }
      });
    } else {
      actions.push({
        label: '⚔ Forge Cultivator', primary: true,
        handler: async () => {
          const err = validateStep(ctx.step, ctx);
          if (err) { notice(err, 'cinnabar'); return; }
          await finishWizard(ctx, navigate);
        }
      });
    }

    openDialog({
      title: 'Forge a New Cultivator',
      content: body,
      actions,
      wide: true
    });
  }

  ctx.rerender = renderCurrentStep;
  renderCurrentStep();
}
