// =============================================================================
// domain.js — All campaign constants, derived-stat formulas, and the budget
// menus for the technique (PP) and treasure (TP) creators.
// Pulled directly from:
//   • Cultivation TTRPG Framework.md   (realms, roots, attributes, derived)
//   • Techniques Framework.md          (PP budget, effects, props, restrictions)
//   • Treasures Framework.md           (TP budget, abilities, sentience, etc.)
// =============================================================================

// ---- Realms & tier table -----------------------------------------------------
export const REALMS = [
  'Mortal', 'Qi Condensation', 'Foundation Establishment', 'Core Formation',
  'Nascent Soul', 'Soul Formation', 'Soul Transformation', 'Ascendant',
  'Nirvana Scryer', 'Nirvana Cleanser', 'Nirvana Shatterer'
];

export const SUB_STAGES = ['Early', 'Mid', 'Late', 'Peak'];

export const REALM_BASE_TIER = {
  'Mortal': 0,
  'Qi Condensation': 1,
  'Foundation Establishment': 5,
  'Core Formation': 9,
  'Nascent Soul': 13,
  'Soul Formation': 17,
  'Soul Transformation': 21,
  'Ascendant': 25,
  'Nirvana Scryer': 29,
  'Nirvana Cleanser': 33,
  'Nirvana Shatterer': 37
};

export const LIFESPAN_BY_REALM = {
  'Mortal': '~80 years',
  'Qi Condensation': '~120 years',
  'Foundation Establishment': '~200 years',
  'Core Formation': '~500 years',
  'Nascent Soul': '~1,000 years',
  'Soul Formation': '~3,000 years',
  'Soul Transformation': '~10,000 years',
  'Ascendant': '~30,000 years',
  'Nirvana Scryer': 'Immortal',
  'Nirvana Cleanser': 'Immortal',
  'Nirvana Shatterer': 'Immortal'
};

export function getTier(realm, substage) {
  if (!realm || realm === 'Mortal') return 0;
  const base = REALM_BASE_TIER[realm];
  if (base == null) return 0;
  const idx = Math.max(0, SUB_STAGES.indexOf(substage || 'Early'));
  return base + idx;
}

export function computeDerived(c) {
  const tier = getTier(c.realm, c.substage);
  const body = c.attributes?.body || 0;
  const qi = c.attributes?.qi || 0;
  const soul = c.attributes?.soul || 0;
  return {
    tier,
    woundCap: tier + body,
    qiMax: tier * 10 + qi * 5,
    senseRange: (tier + soul) * 10,
    soulDefense: tier + soul,
    presence: tier,
    heartOaths: Math.floor(tier / 2) + 1,
    lifespan: LIFESPAN_BY_REALM[c.realm] || '—'
  };
}

export function advanceCharacterStage(c, dir) {
  const realmIdx = REALMS.indexOf(c.realm || 'Mortal');
  const subIdx = SUB_STAGES.indexOf(c.substage || 'Early');
  if (dir > 0) {
    if (c.realm === 'Mortal') { c.realm = 'Qi Condensation'; c.substage = 'Early'; return; }
    if (subIdx < SUB_STAGES.length - 1) c.substage = SUB_STAGES[subIdx + 1];
    else if (realmIdx < REALMS.length - 1) { c.realm = REALMS[realmIdx + 1]; c.substage = 'Early'; }
  } else {
    if (c.realm === 'Mortal') return;
    if (subIdx > 0) c.substage = SUB_STAGES[subIdx - 1];
    else {
      const prev = REALMS[realmIdx - 1];
      c.realm = prev;
      c.substage = prev === 'Mortal' ? 'Early' : 'Peak';
    }
  }
}

// ---- Origins / Affiliations / Daos ------------------------------------------
export const ORIGINS = [
  'Mortal Village Youth', 'Fallen Noble', "Merchant's Child", 'Mountain Hunter / Herbalist',
  'Servant of a Sect', 'Orphan / Wanderer', 'Battlefield Survivor', 'Young Master / Clan Heir',
  'Temple Initiate', 'Criminal / Outlaw', 'Other'
];

export const AFFILIATIONS = ['Sect Disciple', 'Clan Heir', 'Rogue Cultivator', 'Mortal World Starter'];

export const DAOS = [
  'Sword', 'Fire', 'Water', 'Earth', 'Metal', 'Wood', 'Wind', 'Lightning',
  'Space', 'Time', 'Karma', 'Cause & Effect',
  'Slaughter', 'Demonic', 'Ghost', 'Corpse',
  'Life', 'Death', 'Medicine', 'Poison',
  'Formation', 'Artifact', 'Alchemy',
  'Solitude', 'Endurance', 'Resentment', 'Perseverance',
  'Restriction', 'Stillness', 'Truth', 'Fate', 'Light', 'Shadow'
];

// ---- Spiritual roots & elements ---------------------------------------------
export const ROOT_GRADES = [
  'Heavenly Spiritual Root (×3)',
  'Heavenly Dao Root (×2.5)',
  'Superior Root (×2)',
  'Common Root (×1)',
  'Mortal / Waste Root (×0.5)',
  'Broken Root (—)',
  'Mutant Root (Variable)',
  'Heavenly Body'
];

export const FIVE_ELEMENTS = ['Metal', 'Wood', 'Water', 'Fire', 'Earth'];
export const ELEMENT_CN = { Metal: '金', Wood: '木', Water: '水', Fire: '火', Earth: '土' };

export const HARMONIOUS_PAIRS = [
  ['Wood', 'Fire'], ['Fire', 'Earth'], ['Earth', 'Metal'],
  ['Metal', 'Water'], ['Water', 'Wood']
];

export function arePairHarmonious(a, b) {
  return HARMONIOUS_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

export const MUTANT_ROOTS = [
  { name: 'Ice Root', desc: 'Water variant — ×1 speed; ice +2, fire −2. Excels in cold regions.' },
  { name: 'Thunder Root', desc: 'Lightning variant — ×1.25 speed; tribulations +1 wave.' },
  { name: 'Wood-Metal Hybrid', desc: '×0.75 speed; produces "Blood Silver" qi that pierces armor.' },
  { name: 'Yin Spirit Root', desc: '×1 in Soul-path, ×0.5 in Body-path. Excels in Ghost/Corpse Daos.' },
  { name: 'Yang Spirit Root', desc: '×1 in Life/Medicine Daos; weak in concealment. Resists demonic corruption.' },
  { name: 'Unnamed / Unique', desc: 'GM-invented one-of-a-kind root.' }
];

export const HEAVENLY_BODIES = [
  { name: 'Demonic Body', desc: 'Feeds on qi of others. Hunted.' },
  { name: 'Immortal Bone', desc: 'Skeleton indestructible below Immortal tier.' },
  { name: "Heaven's Will Body", desc: 'Reroll 1s on all dice; tribulations harsher.' },
  { name: 'Primordial Chaos Body', desc: 'All five elements harmonize. Breakthroughs twice as hard.' },
  { name: 'Void Spirit Body', desc: 'Partly intangible.' },
  { name: 'Sword Heart Body', desc: '+1 Realm vs sword Dao; cannot wield non-swords.' },
  { name: 'Nine-Yin / Nine-Yang Body', desc: 'Extreme yin or yang. Massive speed in one element.' },
  { name: 'Undying Body', desc: '7-day resurrection at cost of memory/tie/Dao.' },
  { name: 'Devouring Body', desc: '10× resource consumption AND 10× efficiency.' },
  { name: 'Heretical God Body', desc: 'Draws power from mortal faith.' },
  { name: 'Ancient Bloodline Body', desc: 'Primordial-beast bloodline awakens through cultivation.' },
  { name: 'Hollow Body', desc: 'Can imprint any method, bloodline, or body. One of a kind.' }
];

export function getRootElementSpec(grade) {
  if (!grade) return null;
  if (grade.startsWith('Heavenly Spiritual')) return { type: 'pick', min: 1, max: 1, hint: 'Pick 1 pure element.' };
  if (grade.startsWith('Heavenly Dao'))       return { type: 'pick', min: 2, max: 2, harmonious: true, hint: 'Pick 2 harmonious elements — adjacent on the generative cycle.' };
  if (grade.startsWith('Superior'))           return { type: 'pick', min: 3, max: 3, hint: 'Pick any 3 elements.' };
  if (grade.startsWith('Common'))             return { type: 'pick', min: 4, max: 5, hint: 'Pick 4 or 5 elements.' };
  if (grade.startsWith('Mortal'))             return { type: 'fixed', elements: [...FIVE_ELEMENTS], hint: 'All five elements, impure.' };
  if (grade.startsWith('Broken'))             return { type: 'none', hint: 'Damaged root. Cannot cultivate normally.' };
  if (grade.startsWith('Mutant'))             return { type: 'mutant', hint: 'The mutation picked you. Roll d6 or pick.' };
  if (grade.startsWith('Heavenly Body'))      return { type: 'body', hint: 'Roll d12 or pick.' };
  return null;
}

// =============================================================================
// TECHNIQUE CREATION (PP-budget) — Techniques Framework Part B
// =============================================================================

export const TECHNIQUE_TIERS = ['Spirit', 'Mysterious', 'Celestial', 'Void', 'Nirvana'];

export const TECHNIQUE_TIER_DATA = {
  'Spirit':     { pp: 4,  qi: 1,   maxDice: 3,  slots: 0, range: 'Medium (30m)' },
  'Mysterious': { pp: 8,  qi: 5,   maxDice: 5,  slots: 1, range: 'Long (100m)' },
  'Celestial':  { pp: 16, qi: 20,  maxDice: 8,  slots: 2, range: 'Extreme (500m)' },
  'Void':       { pp: 32, qi: 75,  maxDice: 12, slots: 3, range: 'Regional (km)' },
  'Nirvana':    { pp: 64, qi: 300, maxDice: 18, slots: 5, range: 'Continental' }
};

export const TECHNIQUE_SOURCES = ['Body', 'Qi', 'Soul'];
export const TECHNIQUE_TYPES = ['Attack', 'Defense', 'Movement', 'Utility', 'Hybrid'];
export const TECHNIQUE_RANGES = [
  'Self', 'Touch', 'Melee', 'Short (10m)', 'Medium (30m)', 'Long (100m)',
  'Extreme (500m)', 'Regional (1km+)', 'Continental'
];
export const TECHNIQUE_ACTIONS = ['Free', 'Standard', 'Reaction', 'Sustained', 'Charged'];

// Effect Cost Menu (Techniques §12).  Each entry: { id, name, cost, group, minTier? }
export const TECHNIQUE_EFFECTS = [
  // Dice & Damage
  { group: 'Dice & Damage', name: '+1 die to roll', cost: 1, repeatable: true },
  { group: 'Dice & Damage', name: '+1 damage per net success', cost: 2 },
  { group: 'Dice & Damage', name: 'Damage ignores armor', cost: 3 },
  { group: 'Dice & Damage', name: 'Damage applies to Soul Wound track', cost: 4 },
  // Range & Targeting
  { group: 'Range & Targeting', name: 'Short range (10m)', cost: 1 },
  { group: 'Range & Targeting', name: 'Medium range (30m)', cost: 2 },
  { group: 'Range & Targeting', name: 'Long range (100m)', cost: 3 },
  { group: 'Range & Targeting', name: 'Extreme range (500m+)', cost: 5, minTier: 'Celestial' },
  { group: 'Range & Targeting', name: '+1 target', cost: 2, repeatable: true },
  { group: 'Range & Targeting', name: 'Small area (5m)', cost: 3 },
  { group: 'Range & Targeting', name: 'Large area (20m)', cost: 5, minTier: 'Celestial' },
  // Conditions
  { group: 'Conditions', name: 'Minor condition (off-balance, −1 die)', cost: 2 },
  { group: 'Conditions', name: 'Major condition (stunned/silenced 1 round)', cost: 4 },
  { group: 'Conditions', name: 'Dominant condition (paralysis/control)', cost: 6, minTier: 'Celestial' },
  // Defense & Mitigation
  { group: 'Defense & Mitigation', name: '+1 die to defense', cost: 1, repeatable: true },
  { group: 'Defense & Mitigation', name: 'Reduce damage by 1 per success', cost: 2 },
  { group: 'Defense & Mitigation', name: 'Absorb 1 incoming attack fully (reactive)', cost: 4 },
  { group: 'Defense & Mitigation', name: 'Redirect damage to attacker', cost: 5, minTier: 'Mysterious' },
  // Movement
  { group: 'Movement', name: '+movement speed (1 tier)', cost: 1 },
  { group: 'Movement', name: 'Stealth / concealment', cost: 2 },
  { group: 'Movement', name: 'Evasion (+dice vs single attack)', cost: 2 },
  { group: 'Movement', name: 'Short blink / phase (≤10m)', cost: 4, minTier: 'Celestial' },
  { group: 'Movement', name: 'True teleport', cost: 8, minTier: 'Void' },
  // Utility
  { group: 'Utility', name: 'Perception (detect hidden / auras / truth)', cost: 2 },
  { group: 'Utility', name: 'Divine Sense scan', cost: 3, minTier: 'Mysterious' },
  { group: 'Utility', name: 'Environmental manipulation (minor)', cost: 2 },
  { group: 'Utility', name: 'Silent communication', cost: 1 },
  { group: 'Utility', name: 'Buff ally roll (+1 die)', cost: 2 },
  { group: 'Utility', name: 'Ritual / formation support', cost: 3 },
  { group: 'Utility', name: 'Karma thread detection', cost: 4, minTier: 'Celestial' },
  { group: 'Utility', name: 'Restriction placement (inscribed ward)', cost: 3, minTier: 'Mysterious' }
];

// Special Properties (slot-based, Mysterious+).  Some are tier-gated.
export const TECHNIQUE_SPECIAL_PROPS = [
  { name: 'Piercing (1 realm of Barrier ignored)', minTier: 'Mysterious', repeatable: true },
  { name: 'Evolving Cascade (named chain)', minTier: 'Mysterious' },
  { name: 'Signature Effect (unique narrative effect)', minTier: 'Mysterious' },
  { name: 'Scaling (effect scales with secondary metric)', minTier: 'Mysterious' },
  { name: 'Counter-Keyword (specifically counters X)', minTier: 'Mysterious' },
  { name: 'Inheritance Lock (protected lineage)', minTier: 'Mysterious' },
  { name: 'Restriction-Inscribable', minTier: 'Mysterious' },
  { name: 'Domain-Form', minTier: 'Void' },
  { name: 'Essence-Linked (+6 dice, bypasses all Barrier)', minTier: 'Nirvana' },
  { name: 'Ji Realm Signature (extra effect at Perfected)', minTier: 'Spirit' }
];

// Restrictions (refunds; Techniques §15)
export const TECHNIQUE_RESTRICTIONS = [
  { name: 'Requires specific weapon (sword, bow, etc.)', refund: 1 },
  { name: 'Requires specific element / affinity / root', refund: 1 },
  { name: 'Only works at melee', refund: 1 },
  { name: 'Only works when opponent surprised / off-balance', refund: 1 },
  { name: 'Costs HP / Stamina per use', refund: 2 },
  { name: 'Burns Blood Essence (lifespan)', refund: 2 },
  { name: 'Burns Cultivation Base (forbidden art)', refund: 4 },
  { name: 'Once per scene', refund: 2 },
  { name: 'Once per day', refund: 3 },
  { name: 'Once per month / breakthrough', refund: 5 },
  { name: 'Requires Dao threshold', refund: 2 },
  { name: 'Requires specific bloodline / inheritance', refund: 2 },
  { name: 'Fails if interrupted mid-charge (Charged actions)', refund: 1 },
  { name: 'Sect-exclusive (lose access if you leave)', refund: 1 },
  { name: 'Karma Cost (+1 Black Karma per use)', refund: 2 },
  { name: 'Demonic Corruption (+1 Demonic Heart per use)', refund: 2 }
];

export const MASTERY_RECIPES = [
  { id: 'cost', name: 'Cost Curve',     desc: 'Proficient −1 qi · Mastered −2 qi · Perfected: tier-up, 20% cheaper' },
  { id: 'power', name: 'Power Curve',   desc: 'Proficient +1 die · Mastered +1 more or named effect · Perfected: tier-up' },
  { id: 'reach', name: 'Reach Curve',   desc: 'Proficient: range/area expand · Mastered: +1 target · Perfected: tier-up, area doubled' },
  { id: 'cascade', name: 'Evolution Cascade', desc: 'Proficient: secondary strike · Mastered: tertiary strike · Perfected: chain all three' },
  { id: 'depth', name: 'Depth Curve',   desc: 'Proficient: pierce 1 Barrier · Mastered: minor condition on hit · Perfected: tier-up, condition major' }
];

// Compute tier index so we can do "minTier" comparisons cheaply.
const TIER_INDEX = { Spirit: 0, Mysterious: 1, Celestial: 2, Void: 3, Nirvana: 4 };
export function tierMeets(currentTier, minTier) {
  if (!minTier) return true;
  return (TIER_INDEX[currentTier] ?? 0) >= (TIER_INDEX[minTier] ?? 0);
}

// =============================================================================
// TREASURE CREATION (TP-budget) — Treasures Framework Part B
// =============================================================================

export const TREASURE_TIERS = ['Spirit', 'Mysterious', 'Celestial', 'Void', 'Nirvana'];

export const TREASURE_TIER_DATA = {
  'Spirit':     { tp: 4,  slots: 1, qi: 1,   baseDice: 2 },
  'Mysterious': { tp: 8,  slots: 2, qi: 5,   baseDice: 4 },
  'Celestial':  { tp: 16, slots: 3, qi: 20,  baseDice: 6 },
  'Void':       { tp: 32, slots: 4, qi: 75,  baseDice: 9 },
  'Nirvana':    { tp: 64, slots: 5, qi: 300, baseDice: 12 }
};

export const TREASURE_QUALITIES = [
  { name: 'Rough',    mult: 0.8 },
  { name: 'Standard', mult: 1.0 },
  { name: 'Refined',  mult: 1.25 },
  { name: 'Superior', mult: 1.5 },
  { name: 'Perfect',  mult: 2.0 }
];

export const TREASURE_CATEGORIES = [
  'Weapon', 'Defensive', 'Transport', 'Utility',
  'Soul', 'Formation', 'Puppet', 'Consumable'
];

export const TREASURE_BINDINGS = [
  { name: 'Unbound',     eff: '~30%', desc: 'Base dice only, no abilities. Anyone can pick up.' },
  { name: 'Blood-bound', eff: '~70%', desc: 'Base dice + 1 ability. Forcibly seized by 2+ realms higher.' },
  { name: 'Soul-bound',  eff: '100%', desc: 'Full abilities. Cannot be taken from the living.' },
  { name: 'Core-bound',  eff: '110%+', desc: 'Special unlocks; treasure grows with wielder. Core Formation+.' }
];

export const TREASURE_SENTIENCE = ['Inert', 'Nascent', 'Quasi-sentient', 'Fully sentient', 'Sword Spirit'];

export const TREASURE_ORIGINS = [
  'Refined', 'Naturally Formed', 'Inherited', 'Living', 'Celestial Guard'
];

export const TREASURE_TEMPERAMENTS = [
  'Patient', 'Prideful', 'Wrathful', 'Mournful', 'Curious', 'Loyal',
  'Bloodthirsty', 'Cold', 'Mischievous', 'Stoic'
];

// Ability Cost Menu (Treasures §18)
export const TREASURE_ABILITIES = [
  // Combat
  { group: 'Combat', name: 'Bonus attack dice (+1)', cost: 1, kind: 'passive', repeatable: true },
  { group: 'Combat', name: 'Bonus defensive dice (+1)', cost: 1, kind: 'passive', repeatable: true },
  { group: 'Combat', name: 'Wound tier-up (wounds count one tier higher)', cost: 3, kind: 'passive' },
  { group: 'Combat', name: 'Realm Barrier pierce (1 realm)', cost: 2, kind: 'active' },
  { group: 'Combat', name: 'Elemental damage (fire/lightning/etc.)', cost: 2, kind: 'passive' },
  { group: 'Combat', name: 'Cleave / AoE strike', cost: 3, kind: 'active' },
  { group: 'Combat', name: 'Reflective shield (returns half damage)', cost: 4, kind: 'active' },
  { group: 'Combat', name: 'Auto-block (negates one killing blow)', cost: 4, kind: 'passive' },
  // Mobility & Transport
  { group: 'Mobility & Transport', name: 'Flight (slow, hundreds m/round)', cost: 2, kind: 'passive' },
  { group: 'Mobility & Transport', name: 'Flight (fast, km/round)', cost: 4, kind: 'passive' },
  { group: 'Mobility & Transport', name: 'Teleport (short, ≤100m)', cost: 4, kind: 'active' },
  { group: 'Mobility & Transport', name: 'Teleport (long, cross-region)', cost: 8, kind: 'active' },
  { group: 'Mobility & Transport', name: 'Group transport (extends to party)', cost: 2, kind: 'passive' },
  { group: 'Mobility & Transport', name: 'Altitude extension', cost: 2, kind: 'passive' },
  { group: 'Mobility & Transport', name: 'Adverse-weather flight', cost: 2, kind: 'passive' },
  // Utility
  { group: 'Utility', name: 'Storage space (per tier-level)', cost: 1, kind: 'passive', repeatable: true },
  { group: 'Utility', name: 'Scrying (short, sect/region)', cost: 3, kind: 'active' },
  { group: 'Utility', name: 'Scrying (long, cross-setting)', cost: 6, kind: 'active' },
  { group: 'Utility', name: 'Detection (specific things)', cost: 2, kind: 'passive' },
  { group: 'Utility', name: 'Illumination / cleansing', cost: 1, kind: 'passive' },
  { group: 'Utility', name: 'Beast taming (lower-realm beasts)', cost: 4, kind: 'active' },
  // Soul & Karma
  { group: 'Soul & Karma', name: 'Soul damage (+1 die)', cost: 2, kind: 'passive', repeatable: true },
  { group: 'Soul & Karma', name: 'Soul protection (+1 die)', cost: 2, kind: 'passive', repeatable: true },
  { group: 'Soul & Karma', name: 'Soul escape aid (single-use)', cost: 6, kind: 'active' },
  { group: 'Soul & Karma', name: 'Karma manipulation (redirect/bind/reveal)', cost: 4, kind: 'active' },
  { group: 'Soul & Karma', name: 'Oath binding (force a Heart Oath)', cost: 6, kind: 'active' },
  // Formation & Control
  { group: 'Formation & Control', name: 'Deployable formation (Spirit)', cost: 2, kind: 'active' },
  { group: 'Formation & Control', name: 'Deployable formation (Mysterious)', cost: 4, kind: 'active' },
  { group: 'Formation & Control', name: 'Deployable formation (Celestial)', cost: 8, kind: 'active' },
  { group: 'Formation & Control', name: 'Sealing (traps target ≤ tier−1)', cost: 4, kind: 'active' },
  { group: 'Formation & Control', name: 'Array key (controls placed formations)', cost: 3, kind: 'passive' },
  // Puppet / Autonomous
  { group: 'Puppet / Autonomous', name: 'Autonomous combat (50% effectiveness)', cost: 6, kind: 'passive' },
  { group: 'Puppet / Autonomous', name: 'Named puppet core (Celestial Guard tier)', cost: 8, kind: 'passive' },
  { group: 'Puppet / Autonomous', name: 'Swarm (multiple smaller units)', cost: 4, kind: 'passive', repeatable: true }
];

export const TREASURE_RESTRICTIONS = [
  { name: 'Condition-locked (moonlight, emotion, place)', refund: 2 },
  { name: 'Oath-bound (requires Heart Oath; breaks if oath broken)', refund: 3 },
  { name: 'Hunger (requires feeding — blood/karma/souls/qi)', refund: 2 },
  { name: 'Single-use per arc', refund: 4 },
  { name: 'Dao-exclusive (one specific Dao only)', refund: 3 },
  { name: 'Rejection risk (1-in-6 refuses to activate)', refund: 2 },
  { name: 'Karmic cost (+1 Black Karma per use)', refund: 2 },
  { name: 'Lifespan drain (weeks/months per activation)', refund: 3 },
  { name: 'Sentient refusal (refuses specific actions)', refund: 3 }
];

// Sword Spirit favor thresholds for the UI
export const SPIRIT_FAVOR_STATES = [
  { min: 0, label: 'Hostile', desc: 'Treasure functions at Unbound effectiveness; may flee at Void+.' },
  { min: 1, label: 'Disaffected', desc: 'Bonus dice halved; refuses to lend techniques.' },
  { min: 4, label: 'Working relationship', desc: 'Full benefits available.' },
  { min: 7, label: 'Bonded', desc: '+1 bonus die; spirit may manifest externally at Nascent Soul+.' },
  { min: 10, label: 'True Bond', desc: 'Unlocks signature technique (one tier above treasure).' }
];

export function favorState(favor) {
  let st = SPIRIT_FAVOR_STATES[0];
  for (const s of SPIRIT_FAVOR_STATES) if (favor >= s.min) st = s;
  return st;
}

// ---- Items library helpers (legacy generic) ---------------------------------
export const ITEM_CATEGORIES = ['Pill', 'Talisman', 'Formation Flag', 'Weapon', 'Armor', 'Tool', 'Herb', 'Spirit Stone', 'Consumable', 'Other'];
export const ITEM_GRADES = ['Mortal', 'Spirit', 'Mysterious', 'Celestial', 'Void', 'Nirvana'];

// ---- Methods -----------------------------------------------------------------
export const METHOD_TYPES = ['Orthodox', 'Demonic', 'Body Refinement', 'Incomplete / Heirloom', 'Self-Taught'];
export const PEAK_REALMS = [
  'Qi Condensation', 'Foundation Establishment', 'Core Formation',
  'Nascent Soul', 'Soul Formation', 'Ascendant', 'Nirvana', 'Variable'
];

// =============================================================================
// USE-TECHNIQUE HELPERS  (for the dice-roller on a character's technique)
// =============================================================================

// How many dice the technique itself contributes — counted from chosenEffects
// (the structured PP-budget data). Both attack and defense "+1 die" entries
// roll up; counter-roll situations apply the manual modifier.
export function techniqueBonusDice(t) {
  if (!t || !Array.isArray(t.chosenEffects)) return 0;
  return t.chosenEffects
    .filter(e => e.name === '+1 die to roll' || e.name === '+1 die to defense')
    .reduce((s, e) => s + (e.qty || 1), 0);
}

// Mastery-induced dice bonus, dependent on the recipe.
//   Power Curve   — Proficient +1, Mastered +2, Perfected +3
//   Depth Curve   — no dice (effects are condition / piercing flavoured)
//   others        — none (their bonuses are non-dice — qi/range/cascade)
export function masteryDiceBonus(recipe, mastery) {
  if (!mastery) return 0;
  if (recipe === 'power') return Math.max(0, mastery - 1);
  return 0;
}

// Mastery-induced qi cost reduction (Cost Curve recipe only).
export function masteryQiReduction(recipe, mastery) {
  if (!mastery || recipe !== 'cost') return 0;
  return Math.max(0, mastery - 1); // 0/0/1/2/3 across Rough/Familiar/Proficient/Mastered/Perfected
}

// Roll N d6, count successes (4+) per the framework's universal pool rule.
export function rollDicePool(n) {
  const dice = [];
  const safe = Math.max(0, Math.floor(n));
  for (let i = 0; i < safe; i++) dice.push(1 + Math.floor(Math.random() * 6));
  const successes = dice.filter(d => d >= 4).length;
  return { dice, successes };
}

export const MASTERY_LABELS = ['Rough', 'Familiar', 'Proficient', 'Mastered', 'Perfected (Ji Realm)'];
