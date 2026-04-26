// =============================================================================
// details.js — Read-only detail views for library entries, plus the
// "Use Technique" dialog that calculates and rolls the dice pool.
// =============================================================================

import { h, clear, openDialog, closeDialog, notice } from './ui.js';
import { saveCharacter, canEditCharacter } from './api.js';

import {
  computeDerived, techniqueBonusDice, masteryDiceBonus, masteryQiReduction,
  rollDicePool, MASTERY_LABELS, favorState
} from './domain.js';

// ============================================================================
// PUBLIC ENTRY — dispatch by library kind
// ============================================================================

export function openDetails(kind, entry) {
  if (kind === 'techniques') return openTechniqueDetails(entry);
  if (kind === 'treasures')  return openTreasureDetails(entry);
  if (kind === 'methods')    return openMethodDetails(entry);
  if (kind === 'items')      return openItemDetails(entry);
}

// ----- Shared helpers --------------------------------------------------------

function detailGrid(rows) {
  const grid = h('div', { class: 'detail-grid' });
  rows.forEach(r => {
    if (!r) return;
    const [label, value] = r;
    if (value == null || value === '') return;
    grid.appendChild(h('div', { class: 'detail-row' },
      h('div', { class: 'detail-label' }, label),
      h('div', { class: 'detail-value' }, String(value))));
  });
  return grid;
}

function detailSection(title, ...content) {
  return h('div', { class: 'detail-section' },
    h('div', { class: 'detail-section-title' }, title),
    ...content);
}

function effectList(rows, costSuffix) {
  if (!rows?.length) return null;
  const list = h('div', { class: 'list-rows' });
  rows.forEach(e => {
    list.appendChild(h('div', { class: 'effect-row' },
      h('div', { class: 'effect-name' },
        e.name + (e.qty > 1 ? ` ×${e.qty}` : '') + (e.kind ? ` · ${e.kind}` : '')),
      h('div', { class: 'effect-cost ' + (e.refund ? 'refund' : 'spend') },
        (e.refund ? '−' + e.refund : (e.cost * (e.qty || 1))) + ' ' + costSuffix)));
  });
  return list;
}

// ============================================================================
// TECHNIQUE DETAILS
// ============================================================================

function openTechniqueDetails(t) {
  const body = h('div', {});

  body.appendChild(h('div', { class: 'detail-tier-banner' },
    h('span', { class: 'detail-tier' }, t.tier || ''),
    t.cost != null ? h('span', { class: 'detail-cost' }, t.cost + ' qi') : null
  ));

  body.appendChild(detailGrid([
    ['Source', t.source],
    ['Type', t.type],
    ['Range', t.range],
    ['Action', t.action],
    ['Dao Affinity', t.dao],
    ['Tags', t.tags],
    ['Prerequisites', t.requires]
  ]));

  if (t.effect) body.appendChild(detailSection('Effect', h('div', {}, t.effect)));

  if (t.description) body.appendChild(detailSection('Description',
    h('div', { style: { whiteSpace: 'pre-wrap', lineHeight: '1.55' } }, t.description)));

  const eff = effectList(t.chosenEffects, 'PP');
  if (eff) body.appendChild(detailSection('Effects (PP-budget)', eff));

  if (t.chosenProps?.length) {
    const list = h('div', { class: 'list-rows' });
    t.chosenProps.forEach(p => list.appendChild(h('div', { class: 'effect-row' },
      h('div', { class: 'effect-name' }, p.name),
      h('div', { class: 'effect-cost' }, '1 slot'))));
    body.appendChild(detailSection('Special Properties', list));
  }

  const restr = effectList(t.chosenRestrictions, 'PP');
  if (restr) body.appendChild(detailSection('Restrictions (refunds)', restr));

  if (t.masteryProficient || t.masteryMastered || t.masteryPerfected) {
    const c = h('div', { class: 'mastery-list' });
    if (t.masteryProficient) c.appendChild(h('div', { class: 'mastery-row' },
      h('strong', {}, 'Proficient: '), t.masteryProficient));
    if (t.masteryMastered) c.appendChild(h('div', { class: 'mastery-row' },
      h('strong', {}, 'Mastered: '), t.masteryMastered));
    if (t.masteryPerfected) c.appendChild(h('div', { class: 'mastery-row' },
      h('strong', {}, 'Perfected (Ji Realm): '), t.masteryPerfected));
    body.appendChild(detailSection('Mastery Scaling', c));
  }

  openDialog({
    title: t.name || 'Technique',
    wide: true,
    content: body,
    actions: [{ label: 'Close', handler: closeDialog }]
  });
}

// ============================================================================
// TREASURE DETAILS
// ============================================================================

function openTreasureDetails(tr) {
  const body = h('div', {});

  body.appendChild(h('div', { class: 'detail-tier-banner' },
    h('span', { class: 'detail-tier' }, [tr.tier, tr.quality].filter(Boolean).join(' · ')),
    h('span', { class: 'detail-cost' }, tr.category || '')
  ));

  body.appendChild(detailGrid([
    ['Binding', tr.binding],
    ['Sentience', tr.sentience],
    ['Origin', tr.origin],
    ['Realm Requirement', tr.realmReq],
    ['Dao Affinity', tr.dao],
    ['Tags', tr.tags],
    ['Sword-shape', tr.swordShape ? 'Yes — Sword Soaring native at Mysterious+' : null]
  ]));

  if (tr.description) body.appendChild(detailSection('Description',
    h('div', { style: { whiteSpace: 'pre-wrap', lineHeight: '1.55' } }, tr.description)));

  const ab = effectList(tr.abilities, 'TP');
  if (ab) body.appendChild(detailSection('Abilities', ab));

  const rest = effectList(tr.restrictions, 'TP');
  if (rest) body.appendChild(detailSection('Restrictions (refunds)', rest));

  // Sentience flavor
  const sf = tr.sentienceFlavor || {};
  if (sf.temperament || sf.preference || sf.aversion || sf.voice) {
    body.appendChild(detailSection('Sentience & Voice',
      detailGrid([
        ['Temperament', sf.temperament],
        ['Voice', sf.voice],
        ['Preference', sf.preference],
        ['Aversion', sf.aversion]
      ])
    ));
  }

  // Sword Spirit sub-sheet
  if (tr.swordSpirit) {
    const sp = tr.swordSpirit;
    const fs = favorState(sp.favor || 0);
    const spiritBlock = h('div', {});
    spiritBlock.appendChild(detailGrid([
      ['Spirit Name', sp.name],
      ['Realm', sp.realm],
      ['Sword Dao Rank', sp.daoRank],
      ['Temperament', sp.temperament],
      ['Favor', (sp.favor ?? 0) + ' / 10 — ' + fs.label]
    ]));
    if (fs.desc) spiritBlock.appendChild(h('div', {
      class: 'note-box', style: { fontStyle: 'normal', marginTop: '8px' }
    }, fs.desc));
    if (sp.techniques) spiritBlock.appendChild(h('div', {
      style: { whiteSpace: 'pre-wrap', marginTop: '8px' }
    }, h('strong', {}, 'Techniques: '), sp.techniques));
    if (sp.preferences) spiritBlock.appendChild(h('div', { style: { marginTop: '6px' } },
      h('strong', {}, 'Preferences: '), sp.preferences));
    if (sp.aversions) spiritBlock.appendChild(h('div', { style: { marginTop: '4px' } },
      h('strong', {}, 'Aversions: '), sp.aversions));
    if (sp.origin) spiritBlock.appendChild(h('div', { style: { marginTop: '6px' } },
      h('strong', {}, 'Origin tie: '), sp.origin));
    body.appendChild(detailSection('剑魂 · Sword Spirit', spiritBlock));
  }

  // Evolution
  const ev = tr.evolution || {};
  if (ev.trigger || ev.threshold || ev.effect) {
    body.appendChild(detailSection('Evolution Hook',
      detailGrid([
        ['Trigger', ev.trigger],
        ['Threshold', ev.threshold],
        ['Effect', ev.effect]
      ])
    ));
  }

  openDialog({
    title: tr.name || 'Treasure',
    wide: true,
    content: body,
    actions: [{ label: 'Close', handler: closeDialog }]
  });
}

// ============================================================================
// METHOD DETAILS
// ============================================================================

function openMethodDetails(m) {
  const body = h('div', {});
  body.appendChild(detailGrid([
    ['Type', m.type],
    ['Peak Realm', m.peakRealm],
    ['Root Requirements', m.rootReq],
    ['Bonus', m.bonus],
    ['Cost', m.cost]
  ]));
  if (m.description) body.appendChild(detailSection('Description',
    h('div', { style: { whiteSpace: 'pre-wrap', lineHeight: '1.55' } }, m.description)));
  openDialog({
    title: m.name || 'Method',
    content: body,
    actions: [{ label: 'Close', handler: closeDialog }]
  });
}

// ============================================================================
// ITEM DETAILS
// ============================================================================

function openItemDetails(it) {
  const body = h('div', {});
  body.appendChild(detailGrid([
    ['Category', it.category],
    ['Grade', it.grade],
    ['Value', it.value],
    ['Consumable', it.consumable ? 'Yes (single-use)' : 'No']
  ]));
  if (it.effect) body.appendChild(detailSection('Effect', h('div', {}, it.effect)));
  if (it.description) body.appendChild(detailSection('Description',
    h('div', { style: { whiteSpace: 'pre-wrap', lineHeight: '1.55' } }, it.description)));
  openDialog({
    title: it.name || 'Item',
    content: body,
    actions: [{ label: 'Close', handler: closeDialog }]
  });
}

// ============================================================================
// USE TECHNIQUE — dice pool calculator + d6 roll
// ============================================================================

export function openUseTechniqueDialog(character, techInfo, charTech, onAfter) {
  const source = techInfo.source || 'Qi';
  const sourceKey = source.toLowerCase();
  const attrVal = character.attributes?.[sourceKey] ?? 0;
  const tier = computeDerived(character).tier;
  const techDice = techniqueBonusDice(techInfo);
  const mastery = charTech.mastery || 0;
  const masteryDice = masteryDiceBonus(techInfo.masteryRecipe, mastery);
  const baseQi = techInfo.cost || 0;
  const masteryReduce = masteryQiReduction(techInfo.masteryRecipe, mastery);
  const minCost = techInfo.tier === 'Spirit' ? 0 : 1;
  const qiCost = Math.max(baseQi - masteryReduce, minCost);

  let modifier = 0;
  let restraintApplied = false;

  const body = h('div', {});

  // Header summary
  body.appendChild(h('div', { class: 'detail-tier-banner' },
    h('span', { class: 'detail-tier' }, techInfo.tier || ''),
    h('span', { class: 'detail-cost' }, source + '-source · ' + (techInfo.type || '—'))
  ));
  if (techInfo.effect) body.appendChild(h('div', {
    class: 'note-box', style: { fontStyle: 'italic' }
  }, techInfo.effect));

  // Breakdown
  const breakdown = h('div', { class: 'roll-breakdown' });
  body.appendChild(breakdown);

  function totalDice() {
    return Math.max(0, attrVal + tier + techDice + masteryDice + modifier);
  }

  function rerenderBreakdown() {
    clear(breakdown);
    const rows = [
      [source + ' attribute', attrVal],
      ['Realm Tier', tier]
    ];
    if (techDice) rows.push(['Technique bonus', techDice]);
    if (masteryDice) rows.push([
      'Mastery (' + (MASTERY_LABELS[mastery] || 'Rough') + ')', masteryDice
    ]);
    if (modifier !== 0) rows.push(['Manual modifier', modifier]);
    rows.forEach(([lab, n]) => breakdown.appendChild(h('div', { class: 'roll-row' },
      h('span', {}, lab),
      h('span', { class: 'roll-num' }, (n >= 0 ? '+' : '') + n))));
    breakdown.appendChild(h('div', { class: 'roll-row total' },
      h('span', {}, 'Dice pool'),
      h('span', { class: 'roll-num' }, totalDice() + 'd6')));
  }
  rerenderBreakdown();

  // Manual modifier control
  const modWrap = h('div', { class: 'field' });
  modWrap.appendChild(h('label', { class: 'field-label' },
    'Manual modifier (situational, terrain, technique vs. technique, etc.)'));
  const modRow = h('div', { style: { display: 'flex', gap: '6px', alignItems: 'center' } });
  const modInput = h('input', {
    type: 'number', class: 'field-input', value: 0, step: '1',
    style: { width: '80px', textAlign: 'center' }
  });
  modInput.addEventListener('input', () => {
    modifier = Number(modInput.value) || 0;
    rerenderBreakdown();
    updateQiBadge();
  });
  const stepBtn = (delta, label) => h('button', {
    class: 'btn small ghost',
    onclick: () => {
      modifier += delta;
      modInput.value = String(modifier);
      rerenderBreakdown();
    }
  }, label);
  modRow.appendChild(stepBtn(-1, '−1'));
  modRow.appendChild(modInput);
  modRow.appendChild(stepBtn(1, '+1'));
  modWrap.appendChild(modRow);
  body.appendChild(modWrap);

  // Qi cost / pool readout
  const qiBadge = h('div', { class: 'note-box' });
  function updateQiBadge() {
    const have = character.qi?.current || 0;
    const max = computeDerived(character).qiMax;
    const enough = have >= qiCost;
    qiBadge.style.borderColor = enough ? '' : 'var(--cinnabar)';
    qiBadge.style.color = enough ? '' : 'var(--cinnabar-deep)';
    qiBadge.textContent = `Qi cost: ${qiCost}  ·  Pool: ${have} / ${max}` +
      (enough ? '' : '  —  not enough qi.') +
      (masteryReduce ? `  (mastery saves ${masteryReduce} qi)` : '');
  }
  updateQiBadge();
  body.appendChild(qiBadge);

  // Result area (filled in after a roll)
  const resultArea = h('div', { class: 'roll-result' });
  body.appendChild(resultArea);

  function doRoll() {
    if (!canEditCharacter(character)) {
      notice('Read-only — only the GM or the character\'s owner can roll for them.', 'cinnabar');
      return;
    }
    const have = character.qi?.current || 0;
    if (have < qiCost) { notice('Not enough qi.', 'cinnabar'); return; }
    character.qi.current = have - qiCost;

    const { dice, successes } = rollDicePool(totalDice());

    clear(resultArea);
    resultArea.appendChild(h('div', { class: 'roll-result-header' },
      `Rolled ${dice.length}d6 — `,
      h('span', { class: 'roll-successes' }, successes + ' success' + (successes === 1 ? '' : 'es'))));
    const diceRow = h('div', { class: 'roll-dice' });
    dice.forEach(d => diceRow.appendChild(h('div', {
      class: 'die' + (d >= 4 ? ' success' : '')
    }, String(d))));
    resultArea.appendChild(diceRow);

    resultArea.appendChild(h('div', {
      style: { marginTop: '10px', fontFamily: 'Cormorant SC, serif', fontSize: '11px',
        letterSpacing: '2px', color: 'var(--ink-faded)', textTransform: 'uppercase' }
    }, `Qi remaining: ${character.qi.current}`));

    saveCharacter(character);
    if (onAfter) onAfter();
    updateQiBadge();
  }

  openDialog({
    title: '⚔ ' + (techInfo.name || 'Use Technique'),
    wide: true,
    content: body,
    actions: [
      { label: 'Close', handler: closeDialog },
      { label: 'Roll the Pool', primary: true, handler: doRoll }
    ]
  });
}
