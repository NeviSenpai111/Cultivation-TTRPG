// =============================================================================
// editors.js — Library entry editors.
//
//   • openTechniqueEditor   PP-budget creator per Techniques Framework Part B
//   • openTreasureEditor    TP-budget creator per Treasures Framework Part B
//   • openMethodEditor      simple method record
//   • openItemEditor        generic items / pills / talismans / etc.
// =============================================================================

import {
  h, clear, openDialog, closeDialog, notice,
  fieldText, fieldNumber, fieldSelect, fieldTextarea,
  uid, nowIso
} from './ui.js';

import { state, createLibraryEntry, saveLibraryEntry } from './api.js';

// Helper: persist a library entry (POST if new, PUT if existing) AND keep
// the in-memory state array in sync. Returns true on success.
async function persistLibraryEntry(kind, entry, isNew) {
  try {
    if (isNew) {
      await createLibraryEntry(kind, entry);
      state.library[kind].push(entry);
    } else {
      await saveLibraryEntry(kind, entry);
      const i = state.library[kind].findIndex(x => x.id === entry.id);
      if (i >= 0) state.library[kind][i] = entry;
      else state.library[kind].push(entry);
    }
    return true;
  } catch (e) {
    notice('Save failed: ' + e.message, 'cinnabar');
    return false;
  }
}

import {
  TECHNIQUE_TIERS, TECHNIQUE_TIER_DATA, TECHNIQUE_SOURCES, TECHNIQUE_TYPES,
  TECHNIQUE_RANGES, TECHNIQUE_ACTIONS, TECHNIQUE_EFFECTS, TECHNIQUE_SPECIAL_PROPS,
  TECHNIQUE_RESTRICTIONS, MASTERY_RECIPES, tierMeets,
  TREASURE_TIERS, TREASURE_TIER_DATA, TREASURE_QUALITIES, TREASURE_CATEGORIES,
  TREASURE_BINDINGS, TREASURE_SENTIENCE, TREASURE_ORIGINS, TREASURE_TEMPERAMENTS,
  TREASURE_ABILITIES, TREASURE_RESTRICTIONS, SPIRIT_FAVOR_STATES, favorState,
  METHOD_TYPES, PEAK_REALMS, ITEM_CATEGORIES, ITEM_GRADES,
  DAOS, REALMS
} from './domain.js';

// ============================================================================
// TECHNIQUE EDITOR — PP budget
// ============================================================================

export function openTechniqueEditor(existing, onSavedView) {
  const isNew = !existing;
  const t = existing ? structuredClone(existing) : {
    id: uid(),
    name: '', tier: 'Spirit', source: 'Qi', type: 'Attack',
    range: 'Short (10m)', action: 'Standard', cost: 1,
    dao: '', requires: '', effect: '', description: '',
    tags: '',
    chosenEffects: [],     // [{ name, cost, qty }]
    chosenProps: [],       // [{ name }]
    chosenRestrictions: [],// [{ name, refund }]
    masteryRecipe: 'power',
    masteryProficient: '',
    masteryMastered: '',
    masteryPerfected: ''
  };

  const body = h('div', {});
  body.appendChild(fieldText('Name', t.name, v => t.name = v,
    { placeholder: 'Cloud Piercing Finger' }));

  // Tier / Source / Type / Range / Action — all in one block
  const meta1 = h('div', { class: 'field-row three' });
  meta1.appendChild(fieldSelect('Tier', t.tier, TECHNIQUE_TIERS, v => { t.tier = v; rerender(); }));
  meta1.appendChild(fieldSelect('Source', t.source, TECHNIQUE_SOURCES, v => t.source = v));
  meta1.appendChild(fieldSelect('Type', t.type, TECHNIQUE_TYPES, v => t.type = v));
  body.appendChild(meta1);

  const meta2 = h('div', { class: 'field-row three' });
  meta2.appendChild(fieldSelect('Range', t.range, TECHNIQUE_RANGES, v => t.range = v));
  meta2.appendChild(fieldSelect('Action', t.action, TECHNIQUE_ACTIONS, v => t.action = v));
  meta2.appendChild(fieldNumber('Qi Cost', t.cost, v => t.cost = v ?? 0, { min: 0 }));
  body.appendChild(meta2);

  const meta3 = h('div', { class: 'field-row two' });
  meta3.appendChild(fieldText('Dao Affinity', t.dao, v => t.dao = v,
    { placeholder: 'Sword, Fire, Karma…' }));
  meta3.appendChild(fieldText('Tags', t.tags, v => t.tags = v,
    { placeholder: 'fire, ranged, piercing' }));
  body.appendChild(meta3);

  body.appendChild(fieldText('Prerequisites', t.requires, v => t.requires = v,
    { placeholder: 'Qi Condensation Mid, Soul 2+' }));

  // Budget bar
  const budgetBar = h('div', { class: 'budget-bar' });
  body.appendChild(budgetBar);

  // Two-column layout: chosen lines | menu of options
  const grid = h('div', { class: 'tally-grid' });
  body.appendChild(grid);

  const chosenCol = h('div', {});
  const menuCol = h('div', {});
  grid.appendChild(chosenCol);
  grid.appendChild(menuCol);

  body.appendChild(h('div', { class: 'subsection-header' }, 'Mastery Scaling'));
  body.appendChild(fieldSelect(
    'Recipe', t.masteryRecipe,
    MASTERY_RECIPES.map(r => [r.id, r.name]),
    v => { t.masteryRecipe = v; rerender(); }
  ));
  const recipeHint = h('div', { class: 'note-box', style: { marginTop: '0' } });
  body.appendChild(recipeHint);

  body.appendChild(fieldText('Proficient effect', t.masteryProficient, v => t.masteryProficient = v));
  body.appendChild(fieldText('Mastered effect', t.masteryMastered, v => t.masteryMastered = v));
  body.appendChild(fieldText('Perfected (Ji Realm) effect', t.masteryPerfected, v => t.masteryPerfected = v));

  body.appendChild(h('div', { class: 'subsection-header' }, 'Description'));
  body.appendChild(fieldText('Effect (short summary)', t.effect, v => t.effect = v,
    { placeholder: '+2 dice, ranged Qi attack' }));
  body.appendChild(fieldTextarea('Full Description', t.description, v => t.description = v,
    'Flavor, mechanics detail, edge cases…'));

  function rerender() {
    renderBudget();
    renderChosen();
    renderMenus();
    renderRecipeHint();
  }

  function renderRecipeHint() {
    const r = MASTERY_RECIPES.find(x => x.id === t.masteryRecipe);
    clear(recipeHint);
    recipeHint.appendChild(h('span', {}, r ? r.desc : 'Pick a recipe.'));
  }

  function totals() {
    const tier = TECHNIQUE_TIER_DATA[t.tier];
    const spent = t.chosenEffects.reduce((s, e) => s + (e.cost * (e.qty || 1)), 0);
    const refund = t.chosenRestrictions.reduce((s, r) => s + (r.refund || 0), 0);
    const cap = Math.floor(tier.pp / 2);
    const refundEff = Math.min(refund, cap);
    const net = spent - refundEff;
    const slotsUsed = t.chosenProps.reduce((s, p) => s + (p.qty || 1), 0);
    return { tier, spent, refund, refundEff, net, slotsUsed, cap };
  }

  function renderBudget() {
    clear(budgetBar);
    const td = totals();
    const tier = td.tier;
    const cls = td.net > tier.pp ? 'budget-bar over'
              : td.net < tier.pp ? 'budget-bar under'
              : 'budget-bar';
    budgetBar.className = cls;

    budgetBar.appendChild(h('div', { class: 'budget-info' + (td.net > tier.pp ? ' warning' : '') },
      'PP: ', h('strong', {}, String(td.net)), '/', h('strong', {}, String(tier.pp))
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' },
      'Spent: ', h('strong', {}, String(td.spent)),
      ' · Refund: ', h('strong', {}, '−' + td.refundEff + (td.refund > td.refundEff ? ` (cap ${td.cap})` : ''))
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' + (td.slotsUsed > tier.slots ? ' warning' : '') },
      'Special slots: ', h('strong', {}, String(td.slotsUsed)), '/', h('strong', {}, String(tier.slots))
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' },
      'Tier qi: ', h('strong', {}, String(tier.qi)),
      ' · Max dice: +', h('strong', {}, String(tier.maxDice))
    ));
  }

  function renderChosen() {
    clear(chosenCol);
    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Chosen Effects'));
    if (!t.chosenEffects.length) {
      chosenCol.appendChild(h('div', { class: 'list-empty' }, 'Nothing yet.'));
    } else {
      const wrap = h('div', { class: 'list-rows' });
      t.chosenEffects.forEach((e, i) => {
        const row = h('div', { class: 'effect-row' });
        row.appendChild(h('div', { class: 'effect-name' }, e.name +
          (e.qty > 1 ? ` ×${e.qty}` : '')));
        row.appendChild(h('div', { class: 'effect-cost spend' }, String(e.cost * (e.qty || 1)) + ' PP'));
        const ctrls = h('div', { style: { display: 'flex', gap: '4px' } });
        if (e.repeatable) {
          ctrls.appendChild(h('button', { class: 'row-delete', onclick: () => {
            e.qty = Math.max(1, (e.qty || 1) - 1);
            rerender();
          }}, '−'));
          ctrls.appendChild(h('button', { class: 'row-delete', onclick: () => {
            e.qty = (e.qty || 1) + 1;
            rerender();
          }}, '+'));
        }
        ctrls.appendChild(h('button', { class: 'row-delete',
          onclick: () => { t.chosenEffects.splice(i, 1); rerender(); } }, '×'));
        row.appendChild(ctrls);
        wrap.appendChild(row);
      });
      chosenCol.appendChild(wrap);
    }

    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Special Properties'));
    if (!t.chosenProps.length) {
      chosenCol.appendChild(h('div', { class: 'list-empty' }, 'No special properties.'));
    } else {
      const wrap = h('div', { class: 'list-rows' });
      t.chosenProps.forEach((p, i) => {
        const row = h('div', { class: 'effect-row' });
        row.appendChild(h('div', { class: 'effect-name' }, p.name +
          (p.qty > 1 ? ` ×${p.qty}` : '')));
        row.appendChild(h('div', { class: 'effect-cost' }, '1 slot'));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { t.chosenProps.splice(i, 1); rerender(); } }, '×'));
        wrap.appendChild(row);
      });
      chosenCol.appendChild(wrap);
    }

    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Restrictions (refunds)'));
    if (!t.chosenRestrictions.length) {
      chosenCol.appendChild(h('div', { class: 'list-empty' }, 'No restrictions.'));
    } else {
      const wrap = h('div', { class: 'list-rows' });
      t.chosenRestrictions.forEach((r, i) => {
        const row = h('div', { class: 'effect-row' });
        row.appendChild(h('div', { class: 'effect-name' }, r.name));
        row.appendChild(h('div', { class: 'effect-cost refund' }, '−' + r.refund + ' PP'));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { t.chosenRestrictions.splice(i, 1); rerender(); } }, '×'));
        wrap.appendChild(row);
      });
      chosenCol.appendChild(wrap);
    }
  }

  function renderMenus() {
    clear(menuCol);

    // Effect menu, grouped
    menuCol.appendChild(h('div', { class: 'subsection-header' }, 'Effect Menu'));
    const groups = {};
    TECHNIQUE_EFFECTS.forEach(e => {
      if (!groups[e.group]) groups[e.group] = [];
      groups[e.group].push(e);
    });
    Object.entries(groups).forEach(([g, items]) => {
      const sec = h('div', { class: 'menu-section' });
      sec.appendChild(h('div', { class: 'menu-section-header' }, g));
      items.forEach(e => {
        const allowed = tierMeets(t.tier, e.minTier);
        const row = h('div', { class: 'menu-row' });
        row.appendChild(h('div', { class: 'menu-row-name' }, e.name +
          (e.minTier && e.minTier !== 'Spirit' ? ` (${e.minTier}+)` : '')));
        row.appendChild(h('div', { class: 'menu-row-cost' }, e.cost + ' PP'));
        row.appendChild(h('button', {
          class: 'btn small',
          disabled: !allowed,
          onclick: () => {
            if (e.repeatable) {
              const ex = t.chosenEffects.find(c => c.name === e.name);
              if (ex) ex.qty = (ex.qty || 1) + 1;
              else t.chosenEffects.push({ name: e.name, cost: e.cost, qty: 1, repeatable: true });
            } else {
              t.chosenEffects.push({ name: e.name, cost: e.cost, qty: 1 });
            }
            rerender();
          }
        }, '+'));
        sec.appendChild(row);
      });
      menuCol.appendChild(sec);
    });

    // Special Properties menu
    menuCol.appendChild(h('div', { class: 'subsection-header' }, 'Special Properties (slot)'));
    const propSec = h('div', { class: 'menu-section' });
    TECHNIQUE_SPECIAL_PROPS.forEach(p => {
      const allowed = tierMeets(t.tier, p.minTier);
      const row = h('div', { class: 'menu-row' });
      row.appendChild(h('div', { class: 'menu-row-name' }, p.name +
        (p.minTier ? ` (${p.minTier}+)` : '')));
      row.appendChild(h('div', { class: 'menu-row-cost' }, '1 slot'));
      row.appendChild(h('button', {
        class: 'btn small',
        disabled: !allowed,
        onclick: () => { t.chosenProps.push({ name: p.name }); rerender(); }
      }, '+'));
      propSec.appendChild(row);
    });
    menuCol.appendChild(propSec);

    // Restrictions menu
    menuCol.appendChild(h('div', { class: 'subsection-header' }, 'Restrictions Menu'));
    const restSec = h('div', { class: 'menu-section' });
    TECHNIQUE_RESTRICTIONS.forEach(r => {
      const row = h('div', { class: 'menu-row' });
      row.appendChild(h('div', { class: 'menu-row-name' }, r.name));
      row.appendChild(h('div', { class: 'menu-row-cost refund' }, '−' + r.refund + ' PP'));
      row.appendChild(h('button', {
        class: 'btn small',
        onclick: () => { t.chosenRestrictions.push({ name: r.name, refund: r.refund }); rerender(); }
      }, '+'));
      restSec.appendChild(row);
    });
    menuCol.appendChild(restSec);
  }

  rerender();

  openDialog({
    title: isNew ? 'New Technique (PP-budget)' : 'Edit Technique',
    wide: true,
    content: body,
    actions: [
      { label: 'Cancel', handler: closeDialog },
      { label: isNew ? 'Create' : 'Save', primary: true, handler: async () => {
        if (!t.name?.trim()) { notice('Name required.', 'cinnabar'); return; }
        t.name = t.name.trim();
        t.updatedAt = nowIso();
        if (isNew) t.createdAt = t.updatedAt;
        if (!await persistLibraryEntry('techniques', t, isNew)) return;
        closeDialog();
        if (onSavedView) onSavedView();
        notice('Saved.');
      }}
    ]
  });
}

// ============================================================================
// TREASURE EDITOR — TP budget + Sentience + Sword Spirit + Evolution
// ============================================================================

export function openTreasureEditor(existing, onSavedView) {
  const isNew = !existing;
  const tr = existing ? structuredClone(existing) : {
    id: uid(),
    name: '', tier: 'Spirit', quality: 'Standard', category: 'Weapon',
    swordShape: false, // Weapons-only flag → grants Sword Soaring at Mysterious+
    binding: 'Blood-bound', sentience: 'Inert', origin: 'Refined',
    realmReq: 'Qi Condensation', dao: '',
    description: '',
    abilities: [],         // [{ name, cost, kind, qty }]
    restrictions: [],      // [{ name, refund }]
    sentienceFlavor: { temperament: '', preference: '', aversion: '', voice: '' },
    swordSpirit: null,     // optional sub-NPC
    evolution: { trigger: '', threshold: '', effect: '' },
    tags: ''
  };

  const body = h('div', {});
  body.appendChild(fieldText('Name', tr.name, v => tr.name = v,
    { placeholder: 'Chill-Moon Sabre' }));

  const meta1 = h('div', { class: 'field-row three' });
  meta1.appendChild(fieldSelect('Tier', tr.tier, TREASURE_TIERS, v => { tr.tier = v; rerender(); }));
  meta1.appendChild(fieldSelect('Quality', tr.quality,
    TREASURE_QUALITIES.map(q => q.name), v => { tr.quality = v; rerender(); }));
  meta1.appendChild(fieldSelect('Category', tr.category, TREASURE_CATEGORIES,
    v => { tr.category = v; rerender(); }));
  body.appendChild(meta1);

  // Sword-shape toggle (only meaningful for Weapons)
  const swordToggle = h('div', { class: 'field' });
  const cb = h('input', { type: 'checkbox' });
  cb.checked = !!tr.swordShape;
  cb.addEventListener('change', () => { tr.swordShape = cb.checked; rerender(); });
  swordToggle.appendChild(h('label', {
    style: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
      fontFamily: 'Cormorant SC, serif', fontSize: '11px', letterSpacing: '2px',
      color: 'var(--ink-faded)', textTransform: 'uppercase' }
  }, cb, h('span', {}, 'Sword-shape Weapon (grants native Sword Soaring at Mysterious+)')));
  body.appendChild(swordToggle);

  const meta2 = h('div', { class: 'field-row three' });
  meta2.appendChild(fieldSelect('Binding', tr.binding,
    TREASURE_BINDINGS.map(b => b.name), v => { tr.binding = v; rerender(); }));
  meta2.appendChild(fieldSelect('Sentience', tr.sentience, TREASURE_SENTIENCE,
    v => { tr.sentience = v; rerender(); }));
  meta2.appendChild(fieldSelect('Origin', tr.origin, TREASURE_ORIGINS, v => tr.origin = v));
  body.appendChild(meta2);

  const meta3 = h('div', { class: 'field-row three' });
  meta3.appendChild(fieldSelect('Realm Requirement', tr.realmReq, REALMS, v => tr.realmReq = v));
  meta3.appendChild(fieldText('Dao Affinity', tr.dao, v => tr.dao = v,
    { placeholder: 'Sword, Karma, Fire…' }));
  meta3.appendChild(fieldText('Tags', tr.tags, v => tr.tags = v,
    { placeholder: 'fire, sword, sealed' }));
  body.appendChild(meta3);

  // Budget bar
  const budgetBar = h('div', { class: 'budget-bar' });
  body.appendChild(budgetBar);

  // Mandatory-feature warnings
  const warnBox = h('div', {});
  body.appendChild(warnBox);

  // Two-column abilities/menu
  const grid = h('div', { class: 'tally-grid' });
  body.appendChild(grid);
  const chosenCol = h('div', {});
  const menuCol = h('div', {});
  grid.appendChild(chosenCol);
  grid.appendChild(menuCol);

  // Sentience flavor (visible at Celestial+)
  body.appendChild(h('div', { class: 'subsection-header' }, 'Sentience & Voice'));
  const sentBlock = h('div', {});
  body.appendChild(sentBlock);

  // Sword Spirit block (toggled separately)
  body.appendChild(h('div', { class: 'subsection-header' }, 'Sword Spirit (optional)'));
  const spiritBlock = h('div', {});
  body.appendChild(spiritBlock);

  // Evolution
  body.appendChild(h('div', { class: 'subsection-header' }, 'Evolution Hook'));
  body.appendChild(fieldText('Trigger', tr.evolution.trigger, v => tr.evolution.trigger = v,
    { placeholder: '100 cultivator kills · Favor reaches 10 · Survives 3 tribulations' }));
  body.appendChild(fieldText('Threshold', tr.evolution.threshold, v => tr.evolution.threshold = v));
  body.appendChild(fieldText('Effect', tr.evolution.effect, v => tr.evolution.effect = v,
    { placeholder: 'New ability slot, quality bump, signature technique unlocks…' }));

  body.appendChild(h('div', { class: 'subsection-header' }, 'Description'));
  body.appendChild(fieldTextarea('Full Description', tr.description, v => tr.description = v,
    'Appearance, history, lore, special rules, binding ritual…'));

  function tierIdx(name) { return TREASURE_TIERS.indexOf(name); }
  function isCelestialPlus() { return tierIdx(tr.tier) >= tierIdx('Celestial'); }
  function isVoidPlus() { return tierIdx(tr.tier) >= tierIdx('Void'); }

  function totals() {
    const tier = TREASURE_TIER_DATA[tr.tier];
    const qData = TREASURE_QUALITIES.find(q => q.name === tr.quality) || { mult: 1 };
    const budget = Math.round(tier.tp * qData.mult);
    const spent = tr.abilities.reduce((s, a) => s + (a.cost * (a.qty || 1)), 0);
    const refund = tr.restrictions.reduce((s, r) => s + r.refund, 0);
    const cap = Math.floor(budget / 2);
    const refundEff = Math.min(refund, cap);
    const net = spent - refundEff;
    const slotsUsed = tr.abilities.length + (tr.swordSpirit ? 1 : 0);
    return { tier, qData, budget, spent, refund, refundEff, net, slotsUsed, cap };
  }

  function renderBudget() {
    clear(budgetBar);
    const td = totals();
    const cls = td.net > td.budget ? 'budget-bar over'
              : td.net < td.budget ? 'budget-bar under'
              : 'budget-bar';
    budgetBar.className = cls;
    budgetBar.appendChild(h('div', { class: 'budget-info' + (td.net > td.budget ? ' warning' : '') },
      'TP: ', h('strong', {}, String(td.net)), '/', h('strong', {}, String(td.budget))
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' },
      'Spent: ', h('strong', {}, String(td.spent)),
      ' · Refund: ', h('strong', {}, '−' + td.refundEff)
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' + (td.slotsUsed > td.tier.slots ? ' warning' : '') },
      'Ability slots: ', h('strong', {}, String(td.slotsUsed)), '/', h('strong', {}, String(td.tier.slots))
    ));
    budgetBar.appendChild(h('div', { class: 'budget-info' },
      'Quality: ', h('strong', {}, '×' + td.qData.mult)
    ));
  }

  function renderWarnings() {
    clear(warnBox);
    const warnings = [];
    if (isCelestialPlus()) {
      if (tr.sentience === 'Inert') warnings.push('Celestial+ treasures must have at least nascent sentience.');
      if (!tr.dao) warnings.push('Celestial+ treasures require Dao-Linkage.');
    }
    if (isVoidPlus() && (tr.sentience === 'Inert' || tr.sentience === 'Nascent')) {
      warnings.push('Void+ treasures must be at least quasi-sentient.');
    }
    if (tr.swordSpirit && (tr.category !== 'Weapon' || !tr.swordShape)) {
      warnings.push('Sword Spirits are only available on sword-shape Weapon treasures.');
    }
    if (tr.swordSpirit && tierIdx(tr.tier) < tierIdx('Celestial')) {
      warnings.push('Sword Spirits require Celestial+ tier.');
    }
    if (warnings.length) {
      warnings.forEach(w => warnBox.appendChild(h('div', {
        class: 'note-box', style: { borderColor: 'var(--cinnabar)', color: 'var(--cinnabar-deep)', fontStyle: 'normal' }
      }, '⚠  ' + w)));
    }
  }

  function renderSentience() {
    clear(sentBlock);
    if (!isCelestialPlus()) {
      sentBlock.appendChild(h('div', { class: 'note-box' },
        'Sentience flavor becomes mandatory at Celestial+. Optional at lower tiers.'));
    }
    const row = h('div', { class: 'field-row two' });
    row.appendChild(fieldSelect('Temperament', tr.sentienceFlavor.temperament,
      ['', ...TREASURE_TEMPERAMENTS],
      v => { tr.sentienceFlavor.temperament = v; }, { allowEmpty: true }));
    row.appendChild(fieldText('Voice (whispers, dreams, chimes…)',
      tr.sentienceFlavor.voice, v => tr.sentienceFlavor.voice = v));
    sentBlock.appendChild(row);
    sentBlock.appendChild(fieldText('Preference (what it likes in a wielder)',
      tr.sentienceFlavor.preference, v => tr.sentienceFlavor.preference = v));
    sentBlock.appendChild(fieldText('Aversion (what it refuses)',
      tr.sentienceFlavor.aversion, v => tr.sentienceFlavor.aversion = v));
  }

  function renderSpiritBlock() {
    clear(spiritBlock);
    const eligible = (tr.category === 'Weapon' && tr.swordShape && isCelestialPlus());
    if (!eligible) {
      spiritBlock.appendChild(h('div', { class: 'note-box' },
        'Sword Spirits require a sword-shape Weapon treasure at Celestial+ tier.'));
      return;
    }
    if (!tr.swordSpirit) {
      spiritBlock.appendChild(h('button', {
        class: 'btn',
        onclick: () => {
          tr.swordSpirit = {
            name: '', realm: 'Foundation Establishment', substage: 'Peak',
            daoRank: 'Initiate', techniques: '', temperament: 'Mournful',
            preferences: '', aversions: '', origin: '', favor: 5
          };
          // Spirit replaces nascent sentience; bump if needed
          if (tr.sentience === 'Inert' || tr.sentience === 'Nascent') tr.sentience = 'Sword Spirit';
          rerender();
        }
      }, '+ Add Sword Spirit'));
      return;
    }
    const sp = tr.swordSpirit;
    spiritBlock.appendChild(fieldText('Spirit Name', sp.name, v => sp.name = v,
      { placeholder: 'Jiao the Hermit' }));
    const r = h('div', { class: 'field-row three' });
    r.appendChild(fieldSelect('Spirit Realm', sp.realm, REALMS, v => sp.realm = v));
    r.appendChild(fieldSelect('Sword Dao Rank', sp.daoRank,
      ['Novice', 'Initiate', 'Adept', 'Master', 'Grandmaster'], v => sp.daoRank = v));
    r.appendChild(fieldSelect('Temperament', sp.temperament,
      TREASURE_TEMPERAMENTS, v => sp.temperament = v));
    spiritBlock.appendChild(r);
    spiritBlock.appendChild(fieldTextarea('Techniques (1–3)', sp.techniques,
      v => sp.techniques = v,
      'Mountain-Guarding Stroke (defensive, +3 dice, 5 qi)\nMoon-Culling Sweep (Celestial offensive sweep, once/day)'));
    spiritBlock.appendChild(fieldText('Preferences', sp.preferences, v => sp.preferences = v,
      { placeholder: 'Restraint, respect for the dying, dedication to Sword Dao' }));
    spiritBlock.appendChild(fieldText('Aversions', sp.aversions, v => sp.aversions = v,
      { placeholder: 'Killing the unarmed, sleeping, or children' }));
    spiritBlock.appendChild(fieldTextarea('Origin Tie (who they were, unfinished business)',
      sp.origin, v => sp.origin = v));

    // Favor track
    const favorWrap = h('div', { class: 'field' });
    favorWrap.appendChild(h('label', { class: 'field-label' }, 'Favor (0–10)'));
    const favorRow = h('div', { class: 'dot-row' });
    for (let i = 0; i < 10; i++) {
      const d = h('div', { class: 'dot cinnabar' + (i < sp.favor ? ' filled' : '') });
      d.addEventListener('click', () => {
        sp.favor = (sp.favor === i + 1) ? i : i + 1;
        rerender();
      });
      favorRow.appendChild(d);
    }
    favorWrap.appendChild(favorRow);
    const fs = favorState(sp.favor);
    favorWrap.appendChild(h('div', {
      style: { fontSize: '12px', color: 'var(--ink-faded)', fontStyle: 'italic', marginTop: '6px' }
    }, fs.label + ' — ' + fs.desc));
    spiritBlock.appendChild(favorWrap);

    spiritBlock.appendChild(h('button', {
      class: 'btn small danger',
      style: { marginTop: '10px' },
      onclick: () => { tr.swordSpirit = null; rerender(); }
    }, 'Remove Sword Spirit'));
  }

  function renderChosen() {
    clear(chosenCol);
    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Abilities'));
    if (!tr.abilities.length) {
      chosenCol.appendChild(h('div', { class: 'list-empty' }, 'Nothing yet.'));
    } else {
      const wrap = h('div', { class: 'list-rows' });
      tr.abilities.forEach((a, i) => {
        const row = h('div', { class: 'effect-row' });
        row.appendChild(h('div', { class: 'effect-name' },
          a.name + (a.qty > 1 ? ` ×${a.qty}` : '') + ' · ' + (a.kind || '?')));
        row.appendChild(h('div', { class: 'effect-cost spend' }, String(a.cost * (a.qty || 1)) + ' TP'));
        const ctrls = h('div', { style: { display: 'flex', gap: '4px' } });
        if (a.repeatable) {
          ctrls.appendChild(h('button', { class: 'row-delete', onclick: () => {
            a.qty = Math.max(1, (a.qty || 1) - 1); rerender();
          }}, '−'));
          ctrls.appendChild(h('button', { class: 'row-delete', onclick: () => {
            a.qty = (a.qty || 1) + 1; rerender();
          }}, '+'));
        }
        ctrls.appendChild(h('button', { class: 'row-delete',
          onclick: () => { tr.abilities.splice(i, 1); rerender(); } }, '×'));
        row.appendChild(ctrls);
        wrap.appendChild(row);
      });
      chosenCol.appendChild(wrap);
    }

    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Restrictions (refunds)'));
    if (!tr.restrictions.length) {
      chosenCol.appendChild(h('div', { class: 'list-empty' }, 'No restrictions.'));
    } else {
      const wrap = h('div', { class: 'list-rows' });
      tr.restrictions.forEach((r, i) => {
        const row = h('div', { class: 'effect-row' });
        row.appendChild(h('div', { class: 'effect-name' }, r.name));
        row.appendChild(h('div', { class: 'effect-cost refund' }, '−' + r.refund + ' TP'));
        row.appendChild(h('button', { class: 'row-delete',
          onclick: () => { tr.restrictions.splice(i, 1); rerender(); } }, '×'));
        wrap.appendChild(row);
      });
      chosenCol.appendChild(wrap);
    }

    chosenCol.appendChild(h('div', { class: 'subsection-header' }, 'Binding & Native'));
    const bnd = TREASURE_BINDINGS.find(b => b.name === tr.binding);
    chosenCol.appendChild(h('div', { class: 'note-box', style: { fontStyle: 'normal' } },
      h('strong', {}, tr.binding + ' '),
      h('span', { style: { color: 'var(--ink-faded)' } }, '(' + bnd.eff + ')'),
      h('div', { style: { fontSize: '12px', marginTop: '4px' } }, bnd.desc)));
    if (tr.category === 'Weapon' && tr.swordShape && tierIdx(tr.tier) >= tierIdx('Mysterious')) {
      chosenCol.appendChild(h('div', { class: 'note-box', style: {
        borderColor: 'var(--gold)', fontStyle: 'normal'
      } }, '✦ Sword Soaring (native) — flies as a Transport treasure of this tier, no slot cost.'));
    }
  }

  function renderMenus() {
    clear(menuCol);
    menuCol.appendChild(h('div', { class: 'subsection-header' }, 'Ability Menu'));
    const groups = {};
    TREASURE_ABILITIES.forEach(a => { (groups[a.group] ||= []).push(a); });
    Object.entries(groups).forEach(([g, items]) => {
      const sec = h('div', { class: 'menu-section' });
      sec.appendChild(h('div', { class: 'menu-section-header' }, g));
      items.forEach(a => {
        const row = h('div', { class: 'menu-row' });
        row.appendChild(h('div', { class: 'menu-row-name' }, a.name + ' · ' + a.kind));
        row.appendChild(h('div', { class: 'menu-row-cost' }, a.cost + ' TP'));
        row.appendChild(h('button', {
          class: 'btn small',
          onclick: () => {
            if (a.repeatable) {
              const ex = tr.abilities.find(x => x.name === a.name);
              if (ex) ex.qty = (ex.qty || 1) + 1;
              else tr.abilities.push({ name: a.name, cost: a.cost, kind: a.kind, qty: 1, repeatable: true });
            } else {
              tr.abilities.push({ name: a.name, cost: a.cost, kind: a.kind, qty: 1 });
            }
            rerender();
          }
        }, '+'));
        sec.appendChild(row);
      });
      menuCol.appendChild(sec);
    });

    menuCol.appendChild(h('div', { class: 'subsection-header' }, 'Restrictions Menu'));
    const restSec = h('div', { class: 'menu-section' });
    TREASURE_RESTRICTIONS.forEach(r => {
      const row = h('div', { class: 'menu-row' });
      row.appendChild(h('div', { class: 'menu-row-name' }, r.name));
      row.appendChild(h('div', { class: 'menu-row-cost refund' }, '−' + r.refund + ' TP'));
      row.appendChild(h('button', {
        class: 'btn small',
        onclick: () => { tr.restrictions.push({ name: r.name, refund: r.refund }); rerender(); }
      }, '+'));
      restSec.appendChild(row);
    });
    menuCol.appendChild(restSec);
  }

  function rerender() {
    renderBudget();
    renderWarnings();
    renderSentience();
    renderSpiritBlock();
    renderChosen();
    renderMenus();
  }

  rerender();

  openDialog({
    title: isNew ? 'New Treasure (TP-budget)' : 'Edit Treasure',
    wide: true,
    content: body,
    actions: [
      { label: 'Cancel', handler: closeDialog },
      { label: isNew ? 'Create' : 'Save', primary: true, handler: async () => {
        if (!tr.name?.trim()) { notice('Name required.', 'cinnabar'); return; }
        tr.name = tr.name.trim();
        tr.updatedAt = nowIso();
        if (isNew) tr.createdAt = tr.updatedAt;
        if (!await persistLibraryEntry('treasures', tr, isNew)) return;
        closeDialog();
        if (onSavedView) onSavedView();
        notice('Saved.');
      }}
    ]
  });
}

// ============================================================================
// METHOD EDITOR
// ============================================================================

export function openMethodEditor(existing, onSavedView) {
  const isNew = !existing;
  const m = existing ? structuredClone(existing) : {
    id: uid(), name: '', type: 'Orthodox', peakRealm: 'Foundation Establishment',
    rootReq: '', bonus: '', cost: '', description: ''
  };
  const body = h('div', {});
  body.appendChild(fieldText('Name', m.name, v => m.name = v));
  const r = h('div', { class: 'field-row two' });
  r.appendChild(fieldSelect('Type', m.type, METHOD_TYPES, v => m.type = v));
  r.appendChild(fieldSelect('Peak Realm', m.peakRealm, PEAK_REALMS, v => m.peakRealm = v));
  body.appendChild(r);
  body.appendChild(fieldText('Root Requirements', m.rootReq, v => m.rootReq = v));
  body.appendChild(fieldText('Bonus', m.bonus, v => m.bonus = v));
  body.appendChild(fieldText('Cost', m.cost, v => m.cost = v));
  body.appendChild(fieldTextarea('Description', m.description, v => m.description = v));
  openDialog({
    title: isNew ? 'New Cultivation Method' : 'Edit Method',
    content: body,
    actions: [
      { label: 'Cancel', handler: closeDialog },
      { label: isNew ? 'Create' : 'Save', primary: true, handler: async () => {
        if (!m.name?.trim()) { notice('Name required.', 'cinnabar'); return; }
        m.name = m.name.trim();
        m.updatedAt = nowIso();
        if (isNew) m.createdAt = m.updatedAt;
        if (!await persistLibraryEntry('methods', m, isNew)) return;
        closeDialog();
        if (onSavedView) onSavedView();
        notice('Saved.');
      }}
    ]
  });
}

// ============================================================================
// ITEM EDITOR (generic — pills, talismans, weapons, herbs)
// ============================================================================

export function openItemEditor(existing, onSavedView) {
  const isNew = !existing;
  const it = existing ? structuredClone(existing) : {
    id: uid(), name: '', category: 'Pill', grade: 'Spirit',
    consumable: true, value: '', effect: '', description: ''
  };
  const body = h('div', {});
  body.appendChild(fieldText('Name', it.name, v => it.name = v));
  const r = h('div', { class: 'field-row three' });
  r.appendChild(fieldSelect('Category', it.category, ITEM_CATEGORIES, v => it.category = v));
  r.appendChild(fieldSelect('Grade', it.grade, ITEM_GRADES, v => it.grade = v));
  r.appendChild(fieldText('Value', it.value, v => it.value = v));
  body.appendChild(r);

  const cb = h('input', { type: 'checkbox' });
  cb.checked = !!it.consumable;
  cb.addEventListener('change', () => it.consumable = cb.checked);
  body.appendChild(h('div', { class: 'field' },
    h('label', {
      style: { display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'Cormorant SC, serif', fontSize: '11px', letterSpacing: '2px',
        color: 'var(--ink-faded)', textTransform: 'uppercase' }
    }, cb, h('span', {}, 'Consumable (single-use)'))));

  body.appendChild(fieldText('Effect (short)', it.effect, v => it.effect = v));
  body.appendChild(fieldTextarea('Full Description', it.description, v => it.description = v));

  openDialog({
    title: isNew ? 'New Item' : 'Edit Item',
    content: body,
    actions: [
      { label: 'Cancel', handler: closeDialog },
      { label: isNew ? 'Create' : 'Save', primary: true, handler: async () => {
        if (!it.name?.trim()) { notice('Name required.', 'cinnabar'); return; }
        it.name = it.name.trim();
        it.updatedAt = nowIso();
        if (isNew) it.createdAt = it.updatedAt;
        if (!await persistLibraryEntry('items', it, isNew)) return;
        closeDialog();
        if (onSavedView) onSavedView();
        notice('Saved.');
      }}
    ]
  });
}
