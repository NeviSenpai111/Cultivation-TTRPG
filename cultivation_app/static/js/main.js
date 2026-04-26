// =============================================================================
// main.js — Entry point. Wires the dialog, loads state from the backend,
// installs the nav, and renders the home view.
// =============================================================================

import { initDialog } from './ui.js';
import { state, loadState, onAfterSave } from './api.js';
import { navigate, refreshCounts, setMode } from './views.js';
import { uid, nowIso } from './ui.js';

initDialog();

// Sidebar nav clicks → navigate()
document.querySelectorAll('.nav-item').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.view));
});

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

onAfterSave(refreshCounts);

(async function init() {
  await loadState();
  seedIfEmpty();
  setMode(state.meta?.mode || 'gm');
  refreshCounts();
  navigate('home');
})();

// First-run sample entries so the app isn't empty.
function seedIfEmpty() {
  const empty = !state.library.techniques.length &&
                !state.library.treasures.length &&
                !state.library.methods.length &&
                !state.library.items.length &&
                !state.characters.length;
  if (!empty) return;

  const now = nowIso();

  // A few canonical techniques (created without going through the PP creator).
  [
    { name: 'Cloud Piercing Finger', tier: 'Spirit', source: 'Qi', type: 'Attack',
      cost: 1, range: 'Short (10m)', action: 'Standard',
      dao: 'Wind, Metal', tags: 'qi, ranged, standard',
      effect: '+2 dice to a ranged attack roll.',
      description: "The Heng Yue Sect's standard Spirit-tier attack technique.",
      masteryRecipe: 'reach',
      masteryProficient: 'Range extends to 30m.',
      masteryMastered: '2 shots per action at −1 die each.',
      masteryPerfected: 'Evolves into Mysterious-tier Cloud Shattering Finger.',
      chosenEffects: [
        { name: '+1 die to roll', cost: 1, qty: 2, repeatable: true },
        { name: 'Short range (10m)', cost: 1, qty: 1 }
      ],
      chosenProps: [], chosenRestrictions: [] },

    { name: 'Attraction Force Technique', tier: 'Spirit', source: 'Qi', type: 'Utility',
      cost: 1, range: 'Short (10m)', action: 'Standard',
      dao: 'any', tags: 'qi, telekinesis, foundational',
      effect: 'Telekinetic grip: lift, restrain, throw, or strike at range.',
      description: 'Foundational. Required to wield flying-sword treasures.',
      masteryRecipe: 'reach',
      masteryProficient: 'Range to 30m; ~50kg objects.',
      masteryMastered: 'Manipulate up to 3 objects; grip holds opponents within 1 realm.',
      masteryPerfected: 'Mysterious-tier; UNLOCKS SWORD SOARING.',
      chosenEffects: [
        { name: 'Environmental manipulation (minor)', cost: 2, qty: 1 },
        { name: 'Short range (10m)', cost: 1, qty: 1 },
        { name: '+1 die to roll', cost: 1, qty: 1, repeatable: true }
      ],
      chosenProps: [], chosenRestrictions: [] },

    { name: 'Concealment Step', tier: 'Spirit', source: 'Qi', type: 'Movement',
      cost: 1, range: 'Self', action: 'Standard',
      dao: 'Wind, Solitude', tags: 'stealth',
      effect: '+2 dice to evasion or stealth for one action.',
      description: '',
      masteryRecipe: 'reach',
      chosenEffects: [
        { name: 'Stealth / concealment', cost: 2, qty: 1 },
        { name: 'Evasion (+dice vs single attack)', cost: 2, qty: 1 }
      ],
      chosenProps: [], chosenRestrictions: [] }
  ].forEach(t => state.library.techniques.push({ id: uid(), createdAt: now, updatedAt: now, ...t }));

  // Sample treasures
  [
    { name: 'Ashen Whisper', tier: 'Spirit', quality: 'Standard', category: 'Weapon',
      swordShape: true, binding: 'Blood-bound', sentience: 'Inert', origin: 'Refined',
      realmReq: 'Qi Condensation', dao: '',
      tags: 'fire, sword',
      description: 'A fire-scorched short sword that hisses when unsheathed near a lie.',
      abilities: [
        { name: 'Elemental damage (fire/lightning/etc.)', cost: 2, kind: 'passive', qty: 1 },
        { name: 'Detection (specific things)', cost: 2, kind: 'passive', qty: 1 }
      ],
      restrictions: [],
      sentienceFlavor: { temperament: '', preference: '', aversion: '', voice: '' },
      swordSpirit: null,
      evolution: { trigger: 'After 20 lies exposed', threshold: '20', effect: '+1 die vs targets who have lied to wielder within last day.' }
    },
    { name: 'Spatial Ring (Small)', tier: 'Spirit', quality: 'Standard', category: 'Utility',
      swordShape: false, binding: 'Soul-bound', sentience: 'Inert', origin: 'Refined',
      realmReq: 'Qi Condensation', dao: '', tags: 'storage',
      description: 'Standard Inner Disciple gear. Binds to the soul on first use.',
      abilities: [
        { name: 'Storage space (per tier-level)', cost: 1, kind: 'passive', qty: 4, repeatable: true }
      ],
      restrictions: [],
      sentienceFlavor: { temperament: '', preference: '', aversion: '', voice: '' },
      swordSpirit: null,
      evolution: { trigger: '', threshold: '', effect: '' }
    }
  ].forEach(t => state.library.treasures.push({ id: uid(), createdAt: now, updatedAt: now, ...t }));

  // Sample methods
  [
    { name: 'Heng Yue Pure Heart Method', type: 'Orthodox', peakRealm: 'Foundation Establishment',
      rootReq: 'Any common or better', bonus: '+1 die to Spirit-Gathering formations',
      cost: 'Sect-branded — loyalty expected; not portable',
      description: "Wang Lin's first sect method. Safe, unremarkable, broadly compatible." },
    { name: 'Iron Flesh Scripture', type: 'Body Refinement', peakRealm: 'Soul Formation',
      rootReq: '', bonus: '+1 Body tier advancement; Body wounds halved',
      cost: 'Qi growth cut in half permanently',
      description: 'Brutal physical grinding method.' }
  ].forEach(m => state.library.methods.push({ id: uid(), createdAt: now, updatedAt: now, ...m }));

  // Sample items
  [
    { name: 'Foundation Establishment Pill', category: 'Pill', grade: 'Mysterious',
      consumable: true, value: '50 low-grade stones',
      effect: '+3 dice to Foundation Establishment breakthrough roll; consumed.',
      description: 'Consumed during the breakthrough scene itself.' },
    { name: 'Life-Saving Talisman (Teleport)', category: 'Talisman', grade: 'Spirit',
      consumable: true, value: 'Issued',
      effect: 'One-use: instant short-range teleport (~50m) out of danger.',
      description: 'Sect-issued. Activate by tearing or crushing.' }
  ].forEach(i => state.library.items.push({ id: uid(), createdAt: now, updatedAt: now, ...i }));
}
