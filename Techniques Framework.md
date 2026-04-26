# Techniques: System Framework & Design Manual

*Companion document to the Cultivation TTRPG Framework. Covers (A) the in-depth system reference for how techniques function, and (B) a point-budget framework for hand-designing new techniques at calibrated balance.*

---

## Table of Contents

**Part A — Technique System Reference**
0. Xian Ni Canonical Fit
1. Anatomy of a Technique
2. Source Axis (Body / Qi / Soul)
3. Type Axis (Attack / Defense / Movement / Utility / Hybrid) + Restriction Form Modifier
4. Tier Anchors — what each tier can do
5. Action Economy
6. Mastery Scaling Conventions
7. System Interactions (Realm Barrier, Dao, Method, Counters, Artifacts)
8. Lifecycle Summary (learning, progression, evolution, loss)

**Part B — Technique Creation Framework**
9. Design Principles
10. The 7-Step Design Process
11. The Power Point (PP) Budget
12. Effect Cost Menu
13. Special Properties (unlocked at Mysterious+)
14. Mastery Scaling Recipes
15. Restrictions (budget refunds)
16. Naming & Flavor Conventions
17. Design Pitfalls
18. Three Worked Examples
19. Quick-Reference Design Sheet
20. Canonical Xian Ni Technique Cards

---

# PART A — TECHNIQUE SYSTEM REFERENCE

## 0. Xian Ni Canonical Fit

Before the mechanics, a quick alignment check. Renegade Immortal has several distinctive technique-adjacent concepts; here's how each maps to this framework.

| Canon Concept | Framework Treatment |
|---|---|
| **Five-tier progression** (Spirit → Mysterious → Celestial → Void → Nirvana) | Native. See §4. |
| **Cultivation Base split** (Body / Qi / Soul) | Native as Source Axis. See §2. |
| **Dao comprehension modifying technique** | Native via Dao Resonance. See §7.2. |
| **Orthodox vs. Demonic method compatibility** | Native via Method Compatibility. See §7.3. |
| **Realm Barrier piercing** | Native. Higher-tier techniques reduce Barrier. See §4, §7.1. |
| **Fragmentary techniques** (partial manuals, incomplete scrolls) | Covered via learning modifiers (Cultivation Framework §7.7.1). |
| **Restrictions** (禁制) — trap/ward/area-denial arts | See §7.6.1 — a distinct Form any Utility or Defense technique may take. |
| **Divine Sense / Spiritual Sense techniques** | Soul-source Utility-Perception family. See §7.6.2. |
| **Ji Realm** — "invincible within one's realm" | Canonical name for Perfected mastery scaling. See §6, §7.6.3. |
| **Domains** (Life and Death Domain, Karma Domain, etc.) | Void+ Special Property. See §7.6.4, §13. |
| **Essences** (Nirvana-tier concept-as-substance) | Nirvana-tier Special Property. See §7.6.5, §13. |
| **Blood Refining / Blood Essence burning** | Native as a Restriction (lifespan cost). See §7.6.6, §15. |
| **Celestial Emperor Spells** (Mountain Crumbles, Lands Collapse, etc.) | Void/Nirvana attack/utility techniques. See §20 for statted examples. |
| **Clone / Avatar techniques** (Slaughter, Ancient God avatars) | Treated as Treasures or Nirvana-scale constructs; out of scope for this document (see Treasures Framework). |

**Design stance:** the framework treats Renegade Immortal as its canonical reference, but deliberately generalizes so other cultivation settings (Coiling Dragon, Stellar Transformations, Reverend Insanity, etc.) remain playable. Where canon and generalization diverge, the generalization wins — except for named concepts, which are preserved (Ji Realm, Restriction, Domain, Essence).

---

## 1. Anatomy of a Technique

Every technique has these fields. When writing one up, fill all of them — missing fields create ambiguity at the table.

| Field | Description |
|---|---|
| **Name** | Evocative; usually 2–4 words. See §16. |
| **Tier** | Spirit / Mysterious / Celestial / Void / Nirvana. |
| **Source** | Body / Qi / Soul — determines attribute used (see §2). |
| **Type** | Attack / Defense / Movement / Utility / Hybrid (see §3). |
| **Qi Cost** | Base by tier: 1 / 5 / 20 / 75 / 300. Modifiable by mastery and design. |
| **Range / Target** | Self / Touch / Melee / Short (≤10m) / Medium (≤30m) / Long (≤100m) / Extreme (>100m). |
| **Action** | Free / Standard / Reaction / Sustained / Charged (see §5). |
| **Base Effect** | The core mechanical payload. |
| **Mastery Scaling** | What unlocks at Proficient / Mastered / Perfected. |
| **Dao Affinity** | Which Daos resonate (×1.5 MP earning). |
| **Requirements** | Weapon, Method compatibility, Root, minimum Realm. |
| **Tags** | Fire, water, sword, soul, stealth, etc. (for counter-interactions). |

---

## 2. Source Axis (Body / Qi / Soul)

The **Source** determines which attribute and realm tier you roll with, and which defenses apply.

| Source | Attribute Used | Typical Use | Defended By | Costs |
|---|---|---|---|---|
| **Body** | Body + Body Realm Tier | Strikes, endurance, iron-body effects, poison resistance | Body defense, armor | Usually qi-free or low qi; may cost Stamina/HP |
| **Qi** | Qi + Qi Realm Tier | Elemental blasts, projectile techniques, flight, barriers | Qi shields, elemental counters | Standard qi cost |
| **Soul** | Soul + Soul Realm Tier | Mental attacks, spiritual sense, formations, divination, soul-wound | Soul defense, spiritual fortitude | Standard qi cost; may cause Soul backlash |

**A technique has exactly one Source.** A punch reinforced by qi is still a Body technique if the attribute rolled is Body. A qi-fueled sword slash is Qi-source. A mental assault is Soul-source. The Source is the dominant channel.

**Cross-source damage:** Soul-source techniques bypass physical armor and wounds, targeting a separate Soul Wound track. Body-source techniques are resisted by physical defenses. Qi-source techniques interact with elemental affinities.

---

## 3. Type Axis

Five archetypes. A technique is primarily one; Hybrid is rare and tier-limited.

### 3.1 Attack
Deals damage or imposes a hostile condition. Rolled against target's defense.
- **Subtypes:** Melee / Ranged / Area / Multi-target / Conditional
- **Typical payload:** +dice to attack, added damage, piercing, conditions

### 3.2 Defense
Protects self or allies. Often reactive or sustained.
- **Subtypes:** Passive (always on when active) / Reactive (triggered by incoming) / Sustained (aura-like) / Absorbing (eats successes)
- **Typical payload:** +dice to defense, damage reduction, full-block chance

### 3.3 Movement
Changes position, speed, or visibility.
- **Subtypes:** Burst (single action speed) / Sustained (scene-long) / Stealth / Evasion / Teleport-adjacent (higher tiers only)
- **Typical payload:** movement speed ×N, dice to evasion, stealth fields

### 3.4 Utility
Everything non-combat, or combat support that isn't a direct hit or block.
- **Subtypes:** Perception / Social / Environmental / Support / Ritual-adjacent
- **Typical payload:** reveal hidden, communicate silently, manipulate environment, buff ally rolls

### 3.5 Hybrid
A technique that does two of the above with equal weight. **Available Mysterious+ only.** Costs more PP (see §13). Don't use Hybrid to sneak in extra value — use it when the concept is genuinely dual-nature (e.g. a counter-strike that both defends and attacks in the same beat).

### 3.6 Form Modifier: Restriction (禁制)
Any Utility, Defense, or Attack technique may optionally be designed in **Restriction form** — meaning the technique is *inscribed* into a location, object, or the user's body rather than cast in the moment. Restrictions trigger on conditions, persist until dispelled, and can be layered. This is canonically Wang Lin's signature form (he is titled *Restriction Grandmaster*). See §7.6.1 for full treatment.

Restriction form is not a separate Type — it's a *shape* a technique can take, unlocked at Mysterious tier and above.

---

## 4. Tier Anchors

This table is the single most important calibration tool. It tells you what a technique of each tier can *reasonably* do. Use it before designing anything — know the ceiling before you build.

| Tier | Qi | PP Budget | Max Dice | Max Range | Special Props | Realm Barrier | Evolves At Perfect |
|---|---|---|---|---|---|---|---|
| **Spirit** | 1 | 4 | +3 | Medium (30m) | 0 | No interaction | →Mysterious |
| **Mysterious** | 5 | 8 | +5 | Long (100m) | 1 | Reduce 1 realm | →Celestial |
| **Celestial** | 20 | 16 | +8 | Extreme (500m) | 2 | Reduce 2 realms | →Void |
| **Void** | 75 | 32 | +12 | Regional (km) | 3 | Reduce 3 realms | →Nirvana |
| **Nirvana** | 300 | 64 | +18 | Continental | 4+ | Reduce 4+ realms | Terminal tier |

**Reading this table:**
- *Max Dice* is the highest dice bonus the effect can grant at base. You can go lower; never higher.
- *Special Props* is how many exotic effects (piercing, multi-target, conditions, area, etc.) the technique can stack. Spirit-tier techniques are simple. Nirvana techniques are symphonies.
- *Realm Barrier* reduction is a flat benefit — a Celestial technique ignores 2 realms of Barrier against a higher-realm defender.
- *Evolves At Perfect* means a Perfected technique functions effectively as one tier higher. Perfection is the ceiling.

---

## 5. Action Economy

Every technique declares when and how it's used in the turn.

| Action Type | Description | Notes |
|---|---|---|
| **Free** | Use as part of another action, once per turn | Usually passive triggers or auras |
| **Standard** | Consumes your turn's main action | Default for attacks and most techniques |
| **Reaction** | Triggered by an event (incoming attack, trigger condition) | Once per round; uses next turn's reaction slot |
| **Sustained** | Activates, then persists with a per-round qi cost | Ends when qi runs out, scene ends, or you stop maintaining |
| **Charged** | Takes 2+ turns of buildup before resolution | High payoff; vulnerable during charge |

**Default:** if a technique doesn't specify, it's Standard.

**Qi for sustained:** listed cost is activation. A sustained technique at 5 qi activation typically burns 1 qi/round thereafter, or 5 qi/scene — designer's call, noted explicitly.

---

## 6. Mastery Scaling Conventions

Every technique needs scaling text for Proficient, Mastered, and Perfected. Conventions:

| Mastery | Standard Effect | Design Note |
|---|---|---|
| **Rough** | Full qi cost; base effect only | Starting state after learning |
| **Familiar** | Full qi cost; no penalty | Competent baseline |
| **Proficient** | −1 qi cost *or* +1 die (designer picks one) | First real improvement |
| **Mastered** | −2 qi cost *and* +1 die, *or* a specific evolved effect | Significant upgrade |
| **Perfected** | Functions as one tier higher; may unlock evolution into the next-tier named technique | Apotheosis |

**Proficient/Mastered choice:** when you design the technique, pick the flavor of upgrade. A technique that's about *efficiency* gets the qi discount. A technique that's about *power* gets the dice boost. A technique with a signature evolved effect (e.g. double-shot, area expansion, secondary condition) uses the Mastered "evolved effect" slot.

**Perfected as tier-higher:** a Perfected Spirit-tier technique behaves as a Mysterious-tier technique in terms of Realm Barrier interaction and effect ceiling — but it does *not* get another full PP budget. It simply punches at the next tier's weight class.

---

## 7. System Interactions

### 7.1 Realm Barrier
Against an opponent 1+ realms above you, they cancel your successes 1-for-1 before damage. A Mysterious+ technique chips at this per §4.

### 7.2 Dao Resonance
A technique whose Source, Type, tag, or named effect aligns with the user's **Dao Seed** or high-comprehension Dao gains:
- **×1.5 MP** from all MP-earning actions
- **Narrative permission** for flavor bonuses (GM grants +1 die on resonant moments)
- **Evolution eligibility** — a technique evolves only if the user's Dao aligns (see Cultivation Framework §7.7.4)

### 7.3 Cultivation Method Compatibility
- **Orthodox Method** users learning Demonic techniques: −2 dice to learn; risk of Qi Deviation at breakthrough
- **Body Method** users learning Qi-source techniques: full qi costs doubled
- **Demonic Method** users learning Orthodox techniques: +1 Demonic Heart corruption per attempt
- **Self-Taught** users: no penalties; +1 die to learn novel techniques

### 7.4 Counter-Interactions
Techniques with specific **Tags** interact:
- Fire vs. Water: one die penalty to the weaker side in direct opposition
- Stealth/Concealment vs. Spirit Sight / Perception techniques: opposed rolls
- Soul attacks vs. Soul Defense techniques: direct mitigation
- Specific counter-techniques (e.g. *Demon-Purifying Sutra* vs. Demonic techniques): full cancellation possible

### 7.5 Artifact Synergy
Techniques paired with a resonant artifact (a Sword Dao technique + a refined sword) gain the artifact's dice bonus. The artifact tier should match or exceed the technique tier for full benefit.

### 7.6 Canonical Xian Ni Forms

Six named forms from Renegade Immortal deserve explicit mechanical treatment. They are not separate from the Type Axis — they are *shapes* or *tier-gated properties* an existing Type can take.

#### 7.6.1 Restrictions (禁制) — Inscribed Persistent Techniques

A **Restriction** is a technique inscribed into a location, object, or body rather than cast in the moment. Canonically, Wang Lin is a *Restriction Grandmaster* — the art of embedding layered traps, wards, and denial patterns into terrain, treasures, or flesh.

**Mechanical definition:**
- Available to any Utility, Defense, or Attack technique at Mysterious tier or higher
- Takes **1 Seclusion Slot per tier** to inscribe (Mysterious = 1 slot, Celestial = 2, Void = 3, Nirvana = 4)
- Once inscribed, the qi cost is already paid — triggering is free to the creator
- Triggers on a declared condition (intrusion, command word, specific target, elemental disturbance, etc.)
- Persists until triggered, dispelled by counter-art, or degraded by time (roll vs. tier × 10 years for natural decay)
- Can be **layered** — multiple Restrictions on one site, triggering in sequence
- A cultivator with Restriction Dao at Adept+ can **read and identify** foreign Restrictions; at Master+, can *alter* them

**Restriction-form cost:** +2 PP on the originating technique design, OR burns a full additional Special Prop slot. Pick one at design time.

**Canonical examples:** Annihilation Restriction, Life and Death Restriction, Ancient Soul Restriction, Time Restriction (these are all Nirvana/Void tier).

#### 7.6.2 Divine Sense (神识) — Soul-Source Perception Family

**Divine Sense** is the cultivator's spiritual perception, extending outward from their body proportional to Soul realm. It is both a passive capacity and the channel for all Soul-source techniques.

**Passive Divine Sense range (no technique, just sensing):**

| Soul Realm Tier | Baseline Range |
|---|---|
| Qi Condensation (1–4) | 30–60m |
| Foundation Establishment (5–8) | 500m |
| Core Formation (9–12) | 5km |
| Nascent Soul (13–16) | 50km |
| Soul Formation (17–20) | planetary |
| Ascendant (21–24) | star-system |
| Nirvana (25+) | transcends distance |

Divine Sense techniques are Soul-source Utility or Attack techniques that weaponize or refine this capacity. Canonically, Wang Lin's **Red Lightning Divine Sense** (a Ji Realm technique) is a Celestial-tier Soul-source Attack that strikes directly at the opponent's soul via his spiritual perception.

**Soul Piercing Eyes / Divine Sense Eyes** — a Celestial-tier Utility technique that grants the user's Divine Sense the ability to read Restrictions, formations, and concealed bloodlines.

#### 7.6.3 Ji Realm (极境) — Canonical Perfection

The canonical concept of **Ji Realm** is "invincibility within one's realm" — a cultivator who has reached Ji Realm in a cultivation base can dominate any opponent of equal realm who has not. Early Core Formation with Ji Realm can kill Peak Core Formation without it.

**Mechanical identity:** Ji Realm is the canonical name for what this framework calls **Perfected mastery** (technique functions one tier higher). A technique that reaches Perfected has entered its Ji Realm.

A cultivator may have Ji Realm in *some* techniques without having it in others. "Ji Realm in Sword Dao" canonically means every one of their sword techniques is Perfected.

**Design note:** when writing flavor text, call Perfected-tier effects "Ji Realm" to align with canon. "Ji Realm Cloud Piercing Finger" and "Perfected Cloud Piercing Finger" are the same thing.

#### 7.6.4 Domains (领域) — Void+ Area Dominance

A **Domain** is a cultivator's Dao expressed as an area of pure will — within it, the cultivator's authority over reality is near-absolute, constrained only by the Domain's tier and the opponent's ability to pierce it.

**Mechanical definition:**
- Available only at Void tier or higher
- Takes a full Special Prop slot at design
- Standard Domain radius: 100m at Void, 1km at Nirvana
- Within the Domain, the cultivator gains **+3 dice to all rolls** and all opponents suffer **−2 dice**
- Opponents of equal or higher realm may contest the Domain with their own Domain or with a Nirvana-tier piercing technique
- Sustaining a Domain costs **10 qi/round at Void, 50 qi/round at Nirvana**

**Canonical examples:** Life and Death Domain, Karma Domain, True and False Domain (all Wang Lin's, all Nirvana-tier).

#### 7.6.5 Essences (精) — Nirvana-Tier Concept-as-Substance

At Nirvana tier and above, a cultivator may compress their comprehension of a Dao into an **Essence** — the concept itself made substantial within their body. Wang Lin canonically holds nine: Fire, Earth, Water, Slaughter, Restriction, Thunder, Life-and-Death, Karma, True-and-False.

**Mechanical definition:**
- **Essence-Linked** is a Nirvana-tier Special Property (costs 1 slot)
- The technique draws directly on one of the cultivator's Essences, gaining:
  - +6 dice to the relevant roll
  - Bypasses **all** Realm Barrier (the Essence is a law, not a technique)
  - Cannot be fully countered by non-Essence techniques of equal or lower tier
- Using an Essence-linked technique does *not* deplete the Essence — but a cultivator can only hold as many Essences as their Nirvana stage (Nirvana Scryer 1, Cleanser 2, Shatterer 3+)

**Canonical examples:** Vermillion Bird Divine Emperor Spells (Fire Essence), Celestial Slaughter Art (Slaughter Essence), Restrictions Essence Techniques (Restriction Essence).

#### 7.6.6 Blood Refining / Blood Essence Burn

A canonical cultivator trope — Situ Nan's signature method — is to **burn Blood Essence (lifespan and vital force)** for immediate power. This is a form of Forbidden Art: it works, but it costs what it costs.

**Mechanical definition:** a technique may be designed with the **"Burns Blood Essence"** restriction (+2 PP refund, see §15). On use, the wielder loses:
- **10 years of lifespan** per use at Spirit/Mysterious tier
- **50 years** at Celestial
- **200 years** at Void
- **Permanent loss of 1 year of Nirvana-tier lifespan** at Nirvana

For a Qi Condensation cultivator (120-year natural lifespan), even a single Mysterious-tier Blood Refining is a major sacrifice. This is how low-realm cultivators survive duels with higher realms — and why they die young.

---

## 8. Lifecycle Summary

Reference-only; full rules in Cultivation Framework §7.7.

- **Acquisition:** manual, teacher, witnessed combat, inheritance
- **Learning Roll:** Soul + Soul Realm, target by tier (3 / 6 / 10 / 15 / 20 successes)
- **Mastery via MP:** 5 / 15 / 35 / 75 cumulative thresholds
- **Evolution:** Perfected + matching Dao comprehension + 1 seclusion slot
- **Loss:** cultivation crippled, Method replaced (partial), severed by counter-art (rare)

---

# PART B — TECHNIQUE CREATION FRAMEWORK

## 9. Design Principles

**1. Tier fits the concept, not the other way around.** If your idea needs to do something only a Celestial-tier technique can do, make it Celestial. Don't cram a big concept into Spirit tier or stretch a small concept into Celestial.

**2. Every mastery tier should feel different.** If Rough and Perfected look nearly identical, you've under-designed the scaling. A player who masters a technique should feel they've unlocked something.

**3. Decisions, not defaults.** A good technique competes with other options. A technique that is always the best choice in its niche is boring; one that has a clear "when to use" and "when not to" is interesting.

**4. Interact with existing systems.** A new technique should touch at least one other system — Dao, Method, Realm Barrier, an attribute, a tag interaction. Isolated techniques feel bolted-on.

**5. Preparation beats power.** Stay true to the setting's ethos. A technique that lets a low-realm cultivator punch up via cleverness or preparation is thematically stronger than raw damage output.

## 10. The 7-Step Design Process

1. **Concept & flavor** — what does this *feel* like? One-sentence pitch. ("A finger-strike that fires condensed qi at range.")
2. **Choose tier** — based on the concept's ambition (see §4).
3. **Choose Source** — Body / Qi / Soul. What drives it?
4. **Choose Type** — Attack / Defense / Movement / Utility / Hybrid.
5. **Spend PP budget** — buy base effects from §12, optionally take Restrictions (§15) for refund.
6. **Write mastery scaling** — using recipes from §14.
7. **Stress test** — compare against peer tier techniques. Would a player pick this? Would a GM allow it?

## 11. The Power Point (PP) Budget

Each tier has a PP budget. Spend it on effects. Don't go over.

| Tier | PP Budget | Special Props Slots |
|---|---|---|
| Spirit | 4 | 0 |
| Mysterious | 8 | 1 |
| Celestial | 16 | 2 |
| Void | 32 | 3 |
| Nirvana | 64 | 4+ |

**Special Props Slots** are separate from the PP budget. They allow expensive "keyword" effects that aren't quantifiable in PP (see §13).

**Unspent PP:** refunded as qi cost reduction. Every 2 PP unspent = −1 qi cost (min 0 at Spirit, min 1 at Mysterious+).

## 12. Effect Cost Menu

This is the heart of the system. When you design, you're buying effects from this menu with your tier's PP.

### Dice & Damage
| Effect | PP Cost |
|---|---|
| +1 die to roll (up to tier's Max Dice) | 1 PP per die |
| +1 damage per net success (over normal) | 2 PP |
| Add a damage type / element tag | 0 PP (flavor-free) |
| Damage ignores armor | 3 PP |
| Damage applies to Soul Wound track (if not already Soul-source) | 4 PP |

### Range & Targeting
| Effect | PP Cost |
|---|---|
| Short range (10m) | 1 PP |
| Medium (30m) | 2 PP |
| Long (100m) | 3 PP |
| Extreme (500m+) | 5 PP (Celestial+) |
| +1 target (up to tier ceiling) | 2 PP each |
| Area (small, ~5m) | 3 PP |
| Area (large, ~20m) | 5 PP (Celestial+) |

### Conditions
| Effect | PP Cost |
|---|---|
| Minor condition (off-balance, −1 die next action) | 2 PP |
| Major condition (stunned, silenced for 1 round) | 4 PP |
| Dominant condition (paralysis, control, 1+ round) | 6 PP (Celestial+) |

### Defense & Mitigation
| Effect | PP Cost |
|---|---|
| +1 die to defense | 1 PP |
| Reduce damage by 1 per success | 2 PP |
| Absorb 1 incoming attack fully (reactive) | 4 PP |
| Redirect damage to attacker | 5 PP (Mysterious+) |

### Movement
| Effect | PP Cost |
|---|---|
| +movement speed (1 tier) | 1 PP |
| Stealth / concealment | 2 PP |
| Evasion (+dice vs. single attack) | 2 PP |
| Short blink / phase (≤10m) | 4 PP (Celestial+) |
| True teleport | 8 PP (Void+) |

### Utility
| Effect | PP Cost |
|---|---|
| Perception (detect hidden / auras / truth) | 2 PP |
| **Divine Sense scan** (read restrictions, formations, concealed bloodlines) | 3 PP (Mysterious+) |
| Environmental manipulation (minor) | 2 PP |
| Silent communication | 1 PP |
| Buff ally roll (+1 die) | 2 PP |
| Ritual / formation support | 3 PP |
| **Karma thread detection** (reveal target's oaths, blood debts, karmic weight) | 4 PP (Celestial+; requires Karma Dao) |
| **Restriction placement** (inscribe a one-shot ward that triggers on a condition) | 3 PP on top of existing technique cost (see §7.6.1) |

## 13. Special Properties (Mysterious+)

Slot-based, not PP-costed. Pick from this list, up to your tier's slot count.

- **Piercing** — +1 realm of Realm Barrier ignored (can be taken multiple times up to tier cap)
- **Evolving Cascade** — the technique has a named chain (e.g. "First Slash / Second Slash / Third Slash") that rewards sustained use in one scene
- **Signature Effect** — a unique narrative-mechanical effect that doesn't fit the menu (GM adjudicates; the *reason* Heart-Piercing Sword has the "+1 wound per net success" clause)
- **Scaling** — the effect scales with a secondary metric (remaining qi, number of enemies, injuries sustained, Dao Insight held)
- **Counter-Keyword** — this technique specifically counters a named thing (Demonic techniques, illusions, formations, Soul attacks)
- **Inheritance Lock** — cannot be learned except from a living master of this technique; higher learning target but protected from easy spread
- **Restriction-Inscribable** (Mysterious+) — technique may be inscribed as a persistent Restriction; see §7.6.1
- **Domain-Form** (Void+, 1 slot) — technique *is* a Domain; see §7.6.4. Only taken on Void or Nirvana techniques.
- **Essence-Linked** (Nirvana only, 1 slot) — technique draws directly on a cultivator Essence; see §7.6.5. Bypasses all Realm Barrier, +6 dice, cannot be fully countered by non-Essence techniques of equal-or-lower tier.
- **Ji Realm Signature** (any tier) — at Perfected mastery, this technique gains an additional unique property defined at design time (one freebie above the normal "functions one tier higher"). This canonicalizes Ji Realm flavor — pick an effect that makes sense for the technique reaching its invincibility state.

## 14. Mastery Scaling Recipes

Rather than free-form, pick a recipe. Mix and match is fine.

### Recipe A: "Cost Curve"
- Proficient: −1 qi cost
- Mastered: −2 qi cost
- Perfected: one tier up; cost reduced a further 20%

*Good for: efficient workhorses like Cloud Piercing Finger.*

### Recipe B: "Power Curve"
- Proficient: +1 die
- Mastered: +1 more die; or a named secondary effect
- Perfected: one tier up; effect applies to all uses

*Good for: signature combat techniques.*

### Recipe C: "Reach Curve"
- Proficient: range / area expands
- Mastered: multi-target unlocked (+1 target)
- Perfected: one tier up; area doubled

*Good for: battlefield-control and utility techniques.*

### Recipe D: "Evolution Cascade"
- Proficient: unlocks secondary named strike
- Mastered: unlocks tertiary named strike
- Perfected: all three strikes can be chained in one action with shared cost

*Good for: multi-part sword arts, combo-focused techniques.*

### Recipe E: "Depth Curve"
- Proficient: technique pierces 1 additional realm of Barrier
- Mastered: technique applies a minor condition on hit
- Perfected: one tier up; condition becomes major

*Good for: realm-piercing duelist techniques.*

## 15. Restrictions (Budget Refunds)

Taking a restriction refunds PP. Use this to fit bigger effects at a lower tier.

| Restriction | PP Refund |
|---|---|
| Requires specific weapon (sword, bow, etc.) | 1 PP |
| Requires specific element / affinity / root | 1 PP |
| Only works at melee | 1 PP |
| Only works when opponent is surprised / off-balance | 1 PP |
| Costs HP / Stamina per use | 2 PP |
| **Burns Blood Essence (lifespan)** — see §7.6.6 | 2 PP |
| **Burns Cultivation Base** (permanent −1 realm sub-stage on use; catastrophic-tier forbidden art) | 4 PP |
| Once per scene | 2 PP |
| Once per day | 3 PP |
| Once per month / major breakthrough | 5 PP |
| Requires Dao threshold to function at all | 2 PP |
| Requires specific bloodline / inheritance | 2 PP |
| Fails if interrupted mid-charge | 1 PP (only for Charged actions) |
| **Sect-exclusive** (traitors punished; you lose access if you leave) | 1 PP |
| **Karma Cost** — gains +1 Black Karma per use | 2 PP |
| **Demonic Corruption** — +1 Demonic Heart per use (Method-dependent) | 2 PP |

**Cap:** refunds cannot exceed 50% of tier budget (a Spirit technique cannot refund more than 2 PP).

## 16. Naming & Flavor Conventions

Cultivation techniques have a poetic grammar. Use it.

**Common patterns:**
- `[Element/Image] + [Body Part/Weapon] + [Action/State]`
  - Cloud Piercing **Finger**, Azure Wind **Slash**, Rising Sun **Palm**
- `[Number/Sequence] + [Concept] + [Form/Method]`
  - Nine Heavens **Thunder Art**, Three Returning **Sword Stances**
- `[Mythical Beast/Entity] + [Verb]`
  - Azure Dragon **Roars**, Black Tortoise **Endures**
- `[State] + [Body] + [Scripture/Sutra/Art]`
  - Iron **Body** Technique, Nine Yang **Golden Body**

**Avoid:**
- Modern gamey names ("Fireball III", "Energy Blast")
- Overly Western fantasy naming ("Smite of Doom")
- Names that don't hint at what the technique does

**Character of the name should match tier:**
- **Spirit:** grounded, elemental, observable (Cloud, Wind, Finger, Slash)
- **Mysterious:** metaphorical, geographic (Mountain-Crushing, River-Severing)
- **Celestial:** cosmic, large-scale (Heaven-Piercing, Star-Gathering)
- **Void:** paradoxical, metaphysical (Soul-Unmaking, World-Forgetting)
- **Nirvana:** reality-level (Karma-Severing, Dao-Rewriting)

## 17. Design Pitfalls

**1. The Strictly-Better Trap.** If your new Mysterious technique does everything Cloud Piercing Finger does *and more*, it makes the Spirit technique obsolete. Always have a tradeoff — higher qi, narrower use case, weapon restriction, *something*.

**2. The Niche Trap.** A technique that only works in one very specific condition (e.g. "against enemies paralyzed by another specific technique") will never be used. Niches should be common enough to matter.

**3. The Condition Stack.** Piling three conditions (stun + silence + slow) onto one technique at Celestial tier looks impressive but warps combat. Limit to one major or two minor conditions per technique.

**4. The Realm-Cheese.** Realm Barrier piercing is powerful — it's the underdog engine. Don't make Spirit-tier techniques pierce realms; that breaks the "lower realm cultivator with a great technique can punch up" to *lower realm cultivator auto-wins.*

**5. The Copy-Paste Mastery.** If Proficient/Mastered/Perfected are just "+1 die, +2 dice, +3 dice", the technique is boring to master. At least one tier should unlock a *change*, not a *number*.

**6. The Free Lunch.** Every technique should cost something — qi, action, a restriction, a narrative opening. "Passive always-on no-cost" effects are Heavenly-Body territory, not techniques.

## 18. Three Worked Examples

### Example 1: Ember Tide Palm (Spirit, Attack, 1 qi)

**Concept:** A fire-tinged palm strike that sweeps a small arc, catching adjacent enemies.

**Tier:** Spirit (4 PP)
**Source:** Body (physical strike, qi-enhanced)
**Type:** Attack (melee, small area)

**Budget spend:**
- +2 dice to attack: 2 PP
- Small area (3m arc): 3 PP (would be over budget…)

Over budget. Take a **Restriction**: *Requires open palm / unarmed strike* (+1 PP refund). Still over.

Take another: *Once per scene* (+2 PP refund). Now we have 4 + 3 = 7 PP available, spending 5 = 2 PP leftover → −1 qi cost. But Spirit tier min cost is 1; refund becomes mastery-bonus flavor instead.

**Final:**
- **Effect:** +2 dice to an unarmed strike, affecting up to 2 adjacent enemies in a 3m arc
- **Restrictions:** unarmed strike only; once per scene
- **Tags:** fire, body, area

**Mastery scaling (Recipe C — Reach Curve):**
- Proficient: arc expands to 5m (up to 3 enemies)
- Mastered: ignites struck enemies (−1 die their next round)
- Perfected: functions as Mysterious-tier; usable twice per scene

**Dao affinity:** Fire, Slaughter

---

### Example 2: Still Lake Shield (Mysterious, Defense, 5 qi)

**Concept:** A sustained qi barrier that absorbs one major incoming attack by displacing it across the water-like surface of the shield.

**Tier:** Mysterious (8 PP, 1 Special Prop slot)
**Source:** Qi
**Type:** Defense (Sustained + Reactive absorb component)

**Budget spend:**
- +2 dice to defense rolls (while active): 2 PP
- Absorb 1 incoming attack fully (reactive): 4 PP
- Small radius self-aura (1m): 1 PP

Total: 7 PP → 1 PP leftover. Convert to cost reduction? Min cost at Mysterious is 1; leftover PP becomes mastery flavor.

**Special Prop:** Counter-Keyword — *specifically effective vs. Fire techniques (full cancellation, not just absorb)*.

**Final:**
- **Effect:** Sustained aura, 1m radius. While active, +2 dice to all defense rolls. Once per scene, may fully absorb one incoming attack as a reaction. Fully cancels any Fire-tagged technique as the absorb target.
- **Sustained cost:** 5 qi activation, 1 qi per round
- **Tags:** water, defense, counter-fire

**Mastery scaling (Recipe A — Cost Curve + Mastered twist):**
- Proficient: sustained cost drops to free after activation
- Mastered: absorb usable twice per scene; water counter extends to any liquid/cold technique
- Perfected: functions as Celestial-tier; absorb becomes redirect — absorbed attack returns to attacker

**Dao affinity:** Water, Stillness

---

### Example 3: Karmic Thread Pierce (Celestial, Utility+Attack Hybrid, 20 qi)

**Concept:** A Soul-level strike that traces a karmic bond between user and target, revealing truths and dealing soul damage proportional to the moral weight of the target's past.

**Tier:** Celestial (16 PP, 2 Special Prop slots) — Hybrid costs extra
**Source:** Soul
**Type:** Hybrid (Utility + Attack)

**Hybrid cost:** A Hybrid technique at Celestial spends 4 PP up front for the dual-nature. Working budget: 12 PP.

**Budget spend:**
- Detect hidden / auras / truth (Utility payload — reveals target's karmic weight): 2 PP
- +3 dice to Soul attack: 3 PP
- Damage to Soul Wound track: 4 PP (baseline, though already Soul-source so this is "additional stacking" — or treat as free since Soul-source. Let's treat as free.)
- Adjusting: with free Soul-wound, 3 PP to spare
- Scaling: damage scales with target's Black Karma (more karma = more damage): 3 PP

Total: 8 PP, 4 PP remaining. Add:
- Medium range (30m): 2 PP → 6 PP remaining… wait, recalculate: 2 + 3 + 3 = 8 PP spent, 4 remaining.
- Medium range: 2 PP. 6 spent + 4 = 10 used, 2 left.
- Condition: target is shaken by what is revealed (−1 die for 1 round): 2 PP. Full budget spent.

**Special Props (2 slots):**
- *Counter-Keyword:* full damage bypasses all illusion / deception defenses (the karmic thread cannot be fooled)
- *Scaling:* damage formula explicitly uses target Black Karma points as dice modifier

**Final:**
- **Range:** 30m
- **Effect:** Reveal the target's karmic weight (all Black Karma points, significant oaths, blood debts) to the user. Make a Soul attack with +3 dice + (target's Black Karma) dice. On hit, deals Soul damage; target is shaken −1 die next round. Bypasses illusion/deception.
- **Tags:** soul, karma, truth
- **Requirements:** Karma Dao at Initiate or higher

**Mastery scaling (Recipe E — Depth Curve):**
- Proficient: pierces 1 additional realm of Realm Barrier
- Mastered: shaken condition becomes stunned (major) for 1 round
- Perfected: functions as Void-tier; the karmic revelation is visible to all witnesses (devastating Face damage)

**Dao affinity:** Karma, Truth, Soul

---

## 19. Quick-Reference Design Sheet

Print this. Keep it next to you when designing.

```
STEP 1 — CONCEPT
  Pitch (one sentence):
  What does it feel like?

STEP 2 — TIER
  □ Spirit (4 PP, 1 qi, +3 dice max)
  □ Mysterious (8 PP, 5 qi, +5 dice, 1 prop, piercing avail.)
  □ Celestial (16 PP, 20 qi, +8 dice, 2 props)
  □ Void (32 PP, 75 qi, +12 dice, 3 props)
  □ Nirvana (64 PP, 300 qi, +18 dice, 4+ props)

STEP 3 — SOURCE
  □ Body  □ Qi  □ Soul

STEP 4 — TYPE
  □ Attack  □ Defense  □ Movement  □ Utility  □ Hybrid (Mysterious+)

STEP 5 — BUDGET
  Dice:   ___ × 1 PP = ___
  Range:  ___ PP
  Area/Multi-target: ___ PP
  Conditions: ___ PP
  Other effects: ___ PP
  Restrictions (refund): − ___ PP
  TOTAL SPENT: ___ / ___ budget

STEP 6 — SPECIAL PROPS (Mysterious+)
  1. ________________
  2. ________________

STEP 7 — MASTERY
  Recipe: □ Cost  □ Power  □ Reach  □ Cascade  □ Depth
  Proficient: ________________
  Mastered: ________________
  Perfected (one tier up + ): ________________

STEP 8 — META
  Dao affinity: ________________
  Requirements: ________________
  Tags: ________________

STEP 9 — STRESS TEST
  □ Does it have a clear use case?
  □ Is it strictly better than any existing peer? (must be NO)
  □ Does at least one mastery tier unlock a change, not a number?
  □ Does it interact with at least one other system (Dao, Method, Realm, tag)?
  □ Does it respect the tier anchors?
```

---

## 20. Canonical Xian Ni Technique Cards

Ten canonical techniques from *Renegade Immortal*, statted using this framework. These demonstrate the framework's fit with source material and provide ready-made reference techniques for GMs and players.

---

### 20.1 Attraction Force Technique (Spirit, Utility, 1 qi)

The foundational telekinetic technique of cultivation. An invisible "hand" of qi that can grip, push, pull, restrain, or strike at range. Wang Lin's signature early technique — he used it to throw Zhou Peng off the dueling stage three times in a row at Qi Condensation Layer 3, and to physically restrain Disciple Liu mid-stab to save Zhang Hu. **Mastering this technique is a prerequisite for controlling flying swords** — every cultivator who hopes to wield a Sword Soaring treasure (see Treasures Framework §11) must learn it first.

- **Source:** Qi | **Type:** Utility (object manipulation, with combat applications)
- **Range:** Short (10m) at Spirit; extends with mastery
- **Action:** Standard
- **Effect:** Roll Qi + Qi Realm Tier + 2 dice. Successes determine what the technique can do this turn:
    - **1 success:** lift / move a small object (a few kg) at walking speed
    - **2 successes:** grip-restrain a person briefly OR throw an object at attack speed
    - **3+ successes:** forceful telekinetic _swipe_ — treat as a Body-equivalent attack with the rolled successes; can hurl a person multiple meters
    - May also be used as **Reactive** to interpose against an incoming attack (catch a blade, redirect a projectile) at the cost of your next turn's action
- **Budget:** Spirit 4 PP. Spend: 2 PP (utility — object manipulation, multi-purpose) + 1 PP (short range) + 1 PP (+1 die for combat scaling) = 4 PP. Full budget. The Reactive option is implicit in the multi-purpose utility framing.

**Mastery (Recipe C — Reach Curve):**

- Proficient: range extends to Medium (30m); can manipulate objects up to ~50 kg
- Mastered: can manipulate multiple objects simultaneously (up to 3); grip is strong enough to hold opponents within 1 realm of the user
- Perfected (Ji Realm): functions as Mysterious-tier; **unlocks Sword Soaring** — the cultivator can now bind a sword treasure for flight and remote combat (per Treasures Framework §11)

**Dao affinity:** any (this is foundational, not Dao-specific). **Tags:** qi, telekinesis, foundational, sword-prerequisite.

**Design note:** because Attraction Force is a prerequisite for flying-sword combat, characters who skip it are _narratively_ limited in a way the rules should reflect. A Foundation Establishment cultivator who never learned Attraction Force cannot wield a Sword Spirit treasure — period. This makes it the single most-learned technique in the setting.

---

### 20.2 Cloud Piercing Finger (Spirit, Attack, 1 qi)

The Heng Yue Sect's standard Spirit-tier attack technique. A condensed qi bolt fired from the fingertip. Simple, cheap, ubiquitous.

- **Source:** Qi | **Type:** Attack (Ranged)
- **Range:** Short (10m)
- **Action:** Standard
- **Effect:** +2 dice to a ranged attack roll.
- **Budget:** 2 PP (+2 dice) + 1 PP (short range) = 3 PP; 1 PP unspent → qi already at minimum.

**Mastery (Recipe C — Reach Curve):**
- Proficient: range extends to 30m
- Mastered: can fire 2 per action at −1 die each
- Perfected (Ji Realm): evolves into Mysterious-tier *Cloud Shattering Finger*

**Dao affinity:** Wind, Metal. **Tags:** qi, ranged, standard.

---

### 20.3 Blue Flames of the Underworld (Mysterious, Attack, 5 qi)

A cold-attribute flame technique granted by the Underworld Ascension Method — Situ Nan's demonic inheritance. Looks like ordinary flame but burns cold, devouring qi rather than heat. Chapter 121 debut.

- **Source:** Qi | **Type:** Attack (Ranged)
- **Range:** Medium (30m)
- **Action:** Standard
- **Effect:** +3 dice to a Qi attack. Damage bypasses heat-based defenses. On successful hit, target loses 5 qi per net success (qi is *drained*, not just prevented from regenerating).
- **Budget:** Mysterious 8 PP, 1 Special Prop slot. Spend: 3 PP (+3 dice) + 2 PP (medium range) + 3 PP (Signature-adjacent: qi-drain effect) = 8 PP. Full budget.
- **Special Prop (1/1):** Signature Effect — qi-drain via cold flame (unique to Underworld Ascension techniques)
- **Requirements:** Demonic or Underworld Ascension Method (Orthodox cultivators suffer +2 Black Karma per use, per §15).

**Mastery (Recipe B — Power Curve):**
- Proficient: +1 die
- Mastered: drain increases to 10 qi per net success
- Perfected (Ji Realm): evolves into Celestial-tier *Underworld Flame*; drain can target lifespan instead of qi

**Dao affinity:** Demonic, Fire (inverted), Slaughter. **Tags:** fire, cold, qi-drain, demonic.

---

### 20.4 Concealment of the Nine Heavens (Mysterious, Movement, 5 qi)

A layered stealth technique Wang Lin developed through years of necessity — survival through hiding when lacking power. Makes the user harder to perceive even by Divine Sense.

- **Source:** Soul | **Type:** Movement (Stealth)
- **Range:** Self
- **Action:** Standard (sustained, 1 qi/round after activation)
- **Effect:** +4 dice to stealth rolls. Reduces the user's Divine Sense footprint by one realm tier (Foundation Establishment detects as Qi Condensation; Core Formation detects as Foundation Establishment; etc.)
- **Budget:** Mysterious 8 PP, 1 Special Prop slot. Spend: 2 PP (stealth base) + 4 PP (+4 dice) + 2 PP (second condition: Divine Sense reduction) = 8 PP. Full budget used.
- **Special Prop (1/1):** Signature Effect — Divine Sense obfuscation (one realm tier lower)

**Mastery (Recipe E — Depth Curve):**
- Proficient: pierces 1 additional realm of Barrier *against* Divine Sense detection (can hide from 1 realm higher)
- Mastered: reduces Divine Sense footprint by two realm tiers instead of one
- Perfected (Ji Realm): evolves into Celestial-tier *Hidden Path*; effectively invisible to opponents ≤2 realms above the user for 1 scene

**Dao affinity:** Solitude, Shadow, Endurance. **Tags:** stealth, soul, self-hide, sustained.

---

### 20.5 Situ Nan's Blood Refining Technique (Celestial, Hybrid, 20 qi)

Situ Nan's signature forbidden art. Burns Blood Essence (lifespan) for a massive burst of combat power — the canonical mechanism that lets a Core Formation cultivator face Nascent Soul opponents.

- **Source:** Body | **Type:** Hybrid (Attack + Defense)
- **Range:** Self (enhances all personal combat actions)
- **Action:** Standard activation (lasts one scene)
- **Effect:** +8 dice to all physical combat rolls (attack and defense alike); pierces 1 realm of Realm Barrier.
- **Restrictions:** Burns Blood Essence at Celestial rate (−50 years lifespan per use); once per scene.
- **Budget:** Celestial 16 PP, 2 Special Prop slots. Hybrid surcharge: 4 PP → 12 PP working. Spend: 8 PP (+8 dice, at Celestial cap) + 4 PP (sustained for one scene, pre-scene activation) = 12 PP. Refunds: Burns Blood Essence (+2 PP), Once per scene (+2 PP) = +4 PP cycled back into the scene-duration effect. Special Prop slots (2/2): Piercing (1 realm), Counter-Keyword (physical-defense piercing).

**Mastery (Recipe B — Power Curve):**
- Proficient: +1 die (→+9 equivalent effect)
- Mastered: second Realm Barrier pierced; lifespan cost rises to 75 years
- Perfected (Ji Realm): functions as Void-tier; lifespan cost rises to 200 years but grants 2 full scenes of effect and bypasses 3 realms of Barrier

**Dao affinity:** Blood, Slaughter, Endurance, Resentment. **Tags:** forbidden art, body, blood, piercing.

---

### 20.6 Red Lightning Divine Sense (Celestial, Attack — Ji Realm Divine Sense, 20 qi)

Wang Lin's canonical Ji Realm Divine Sense at Core Formation — red lightning that strikes directly at the opponent's soul through his spiritual perception. Chapter 127 debut.

- **Source:** Soul | **Type:** Attack (Soul-damage)
- **Range:** Long (within Soul Realm's Divine Sense radius, extending to 5km at Core Formation)
- **Action:** Standard
- **Effect:** +8 dice to a Soul attack. Damage applies to Soul Wound track, bypassing physical defenses. Target suffers a major condition: cannot use Soul-source techniques for 1 round.
- **Budget:** Celestial 16 PP, 2 Special Prop slots. Spend: 8 PP (+8 dice at Celestial cap) + 3 PP (long range) + 4 PP (major condition) = 15 PP; 1 PP cycled to lower per-use qi at Perfected mastery (deferred). Soul-damage is native to Soul-source, no PP cost.
- **Special Props (2/2):** Piercing (2 realms), Counter-Keyword (ignores physical armor/wounds — travels through Divine Sense channel, not physical space)
- **Requirements:** Ji Realm in a precursor Lightning or Soul technique (Perfected mastery in a relevant technique).

**Mastery (Recipe E — Depth Curve):**
- Proficient: 1 additional Realm Barrier pierced
- Mastered: target cannot perceive user via Divine Sense for 3 rounds after hit
- Perfected (Ji Realm): functions as Void-tier; damage can shatter a Nascent Soul's escape mechanism — a canonical "this kills a higher-realm cultivator's last resort" technique

**Dao affinity:** Lightning, Soul, Slaughter. **Tags:** soul, lightning, piercing, ji-realm.

---

### 20.7 Heavenly Fate Finger (Void, Attack, 75 qi)

Chapter 1156 debut. A finger-tier technique that invokes a strand of the cultivator's Fate against the target — regardless of distance, the strike arrives where the Fate leads.

- **Source:** Soul | **Type:** Attack
- **Range:** Regional (up to 1 km) — the strike *follows* fate rather than line of sight
- **Action:** Charged (1 round charge, resolves in round 2)
- **Effect:** +12 dice to a Soul attack. Cannot be dodged by physical movement or teleportation. Target suffers a dominant condition: briefly glimpses their own death, −2 dice for 2 rounds.
- **Budget:** Void 32 PP, 3 Special Prop slots. Spend: 12 PP (+12 dice at Void cap) + 5 PP (regional range) + 6 PP (dominant condition) = 23 PP. Refund from *Charged — fails if interrupted* (+1 PP) cycles back into duration bonus. Remaining 9 PP banked for the Signature effect and Ji Realm mastery flavor.
- **Special Props (3/3):** Piercing (3 realms), Signature (fate-following — ignores illusions and teleportation), Counter-Keyword (Fate finds its target regardless of concealment)
- **Requirements:** Karma or Fate Dao at Adept+, Charged action.

**Mastery (Recipe E — Depth Curve):**
- Proficient: charge time reduced to instant
- Mastered: target also loses 1 Face (their fate has been written against them publicly)
- Perfected (Ji Realm): functions as Nirvana-tier; the strike cannot be stopped except by an equal Nirvana-tier Fate/Karma technique

**Dao affinity:** Karma, Fate, Cause & Effect. **Tags:** fate, soul, piercing, undodgeable.

---

### 20.8 Mountain Crumbles (Void, Attack — Celestial Emperor Spell, 75 qi)

One of Bai Fan's Celestial Emperor Spells, inherited by Wang Lin. A devastating area attack that crushes opponents as if a mountain has fallen on them.

- **Source:** Qi | **Type:** Attack (Area)
- **Range:** Long (100m; area 50m radius)
- **Action:** Standard
- **Effect:** +12 dice against all targets in a 50m radius. Damage is crushing/earth-type; each target rolls defense separately but the attacker's dice pool is not split. Terrain within the area is physically destroyed. Major condition on hit: prone, −2 dice next round.
- **Budget:** Void 32 PP, 3 Special Prop slots. Spend: 12 PP (+12 dice at Void cap) + 3 PP (long range) + 5 PP (large area) + 4 PP (major condition: prone) + 4 PP (environmental destruction, Signature-adjacent) = 28 PP. Remaining 4 PP banked toward mastery evolution.
- **Special Props (3/3):** Piercing (2 realms), Signature (terrain destruction persists as difficult terrain), Scaling (full dice pool against each target, no split)

**Mastery (Recipe C — Reach Curve):**
- Proficient: area expands to 100m radius
- Mastered: can target two separate areas in one action
- Perfected (Ji Realm): functions as Nirvana-tier; conjures a literal mountain that persists as difficult terrain for 1 scene

**Dao affinity:** Earth, Destruction, Celestial Emperor. **Tags:** qi, area, earth, environmental.

---

### 20.9 Life and Death Domain (Nirvana, Utility — Domain, 300 qi activation + 50 qi/round)

One of Wang Lin's signature Domains, born of his Life and Death Dao. Within its boundary, the cultivator decides who lives and who dies — almost literally.

- **Source:** Soul | **Type:** Utility (Domain-form)
- **Range:** 1 km radius from user
- **Action:** Standard activation; sustained
- **Effect:** Within the Domain, the user gains +3 dice to all rolls; all opponents suffer −2 dice. Additionally, the user may spend 50 qi and a standard action to attempt to trigger "Life" (heal one ally to full) or "Death" (soul attack with +10 dice, ignoring all Realm Barrier) once per round.
- **Budget:** Nirvana = 64 PP. Domain Special Prop: 0 PP (slot-based). Spend: 5 PP (+5 dice to user within Domain, above the Domain default) + 10 PP (Life/Death triggers via Signature) + remaining 49 PP spread across mastery flavor and piercing. This technique intentionally banks PP — a Domain's passive effects ARE the main payload; the active triggers are gravy.
- **Special Props (4/4):** Domain-form, Essence-Linked (Life and Death Essence), Piercing (unlimited for Death trigger), Signature (Life/Death active triggers)
- **Requirements:** Life and Death Essence, Nirvana Shatterer or higher.

**Mastery:** Domains do not follow standard mastery progression; they are already Perfected the moment they manifest (an unperfected Domain is not a Domain). Growth happens via *Essence evolution* — the Life and Death Essence itself refines over campaign arcs.

**Dao affinity:** Life, Death, Karma. **Tags:** domain, essence-linked, nirvana, soul.

---

### 20.10 Ji Realm Sword Intent (Any tier, Passive Signature)

Not a technique in the normal sense — but worth statting as a canonical *property* that can be attached to any sword technique the cultivator has brought to Perfected mastery. This models the Xian Ni trope of "Ji Realm in Sword Dao" — the state where a cultivator's sword technique transcends mere motion.

- **Source:** any | **Type:** passive modifier on an existing technique
- **Requirement:** the technique is at Perfected mastery AND the cultivator has Sword Dao at Initiate+
- **Effect:** While wielding a resonant sword, any Perfected sword technique used by this cultivator additionally:
  - Cannot be dodged by mundane movement (requires technique-based evasion)
  - Inflicts Sword Intent — a Soul-damage aftereffect lasting 1 round per level of Sword Dao
  - Counts as "Ji Realm" for all canonical interactions (some treasures, formations, and enemy techniques specifically respond to Ji Realm status)
- **PP cost:** None — this is a Special Property that unlocks automatically when both conditions are met.

This modifier is the mechanical expression of a fully-integrated master. A PC who reaches this point has become *the kind of cultivator other cultivators tell stories about.*

---

*End of Techniques Framework. Pair this document with sections 7.7, 8.8, and 8.9 of the main Cultivation Framework for full context. For treasures that pair with these techniques, see the Treasures Framework.*
