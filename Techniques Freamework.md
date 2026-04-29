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
7. System Interactions (Realm Barrier, Dao, Method, Counters, Artifacts) + Canonical Xian Ni Forms (Restrictions, Divine Sense, Ji Realm, Domains, Essences, Blood Refining, Dao Realm)
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

**Part C — Cultivation Methods (功法)**
21. What is a Method?
22. Method Anatomy
23. The Five Method Categories
24. Method Quality Tiers
25. Method Effects Menu
26. Method Restrictions (Budget Refunds)
27. Method Stages — Layered Cultivation
28. The Method Creation Process
29. Method Compatibility & Switching
30. Canonical Xian Ni Method Examples
31. Quick-Reference Method Design Sheet

**Part D — Dual Cultivation (双修)**
32. What is Dual Cultivation?
33. Dual Cultivation Framework (Compatibility, Rolls)
34. The Three Pairings (Yin-Yang, Yang-Yang, Yin-Yin)
35. Risks, Bonds, and Severance
36. Canonical Resources & Mechanics (Yin Detection, Extreme Yin types, Cold Core, Pure Bodies)
37. Quick-Reference Dual Cultivation Sheet

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
| **Ji Realm** — "invincible within one's realm" | Aspect-wide invincibility, distinct from per-technique Perfected mastery. Acquisition procedure in §7.6.3. |
| **Dao Realm** — comprehension of Dao as law | Late-game transformative state with multi-stage tribulation. See §7.6.7. |
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

#### 7.6.3 Ji Realm (极境) — Aspect-Wide Invincibility

**Ji Realm is not a technique mastery state — it is a transformative cultivator-level achievement.** Perfected mastery on a single technique is the gateway to Ji Realm in that technique's aspect, but Ji Realm itself is much harder to obtain and gives much more.

##### What Ji Realm Is

A cultivator in Ji Realm of an *aspect* — a Dao, a weapon style, a cultivation base path (Body / Qi / Soul), or a Divine Sense focus — is **invincible against equal-realm opponents within that aspect**. An early Core Formation cultivator with Ji Realm of Sword Dao can kill a Peak Core Formation cultivator without Ji Realm; their swordwork is functionally one full realm above their nominal cultivation.

Ji Realm is **aspect-specific.** A cultivator may have Ji Realm in Sword Dao, Divine Sense, and Slaughter Dao without having it in Body, Fire, or Restrictions. Wang Lin canonically reaches Ji Realm in multiple aspects at different points (Slaughter Dao, Lightning/Fire, Divine Sense). Each is a separate achievement.

##### Mechanical Effect

While operating within an aspect for which the cultivator holds Ji Realm:

- **Equal-realm Realm Barrier is auto-canceled** — the cultivator effectively counts as one realm higher within that aspect
- **All techniques within the aspect** gain +2 dice when used as primary action
- **Realm Barrier piercing** stacks with existing technique piercing (a Mysterious-tier technique that pierced 1 realm now pierces 2 if used within an Ji Realm aspect)
- **Narrative permission:** the cultivator can attempt punch-up actions that would otherwise be impossible — e.g., dueling cultivators a full realm above and winning through skill alone, not just luck or treasures

Notably, Ji Realm does *not* give the "function one tier higher" effect of Perfected mastery directly — Perfected mastery is a *prerequisite*, and the Ji Realm is the *aspect-wide upgrade* that goes beyond it.

##### Prerequisites (all required)

To attempt the Ji Realm breakthrough in an aspect, the cultivator must have:

1. **Three Perfected techniques** within that aspect (a "Sword Dao" Ji Realm requires three Perfected sword techniques; a "Divine Sense" Ji Realm requires three Perfected Soul-source perception or attack techniques)
2. **Master-level Dao comprehension** in the linked Dao (300+ Insight — the top tier of the Dao Insight track per Cultivation Framework §7.6)
3. **Realm minimum: Foundation Establishment.** Below this, the cultivator's qi pool and Soul are insufficient to sustain the transformation. (The few canonical exceptions — Wang Lin moments — involve Heavenly Resentment burning, see below.)
4. **A defining Moment of Truth** within the aspect during the current arc — a battle survived, a master witnessed, a Heart Oath fulfilled, or another scene the GM marks as transformative

##### The Ji Realm Breakthrough

Once all four prerequisites are met, the cultivator may attempt the Ji Realm breakthrough during a Seclusion of at least 4 slots dedicated to the aspect.

**The Roll:** primary attribute (Body / Qi / Soul depending on aspect) + Realm Tier + Dao Insight ÷ 50 (rounded down) dice, against a target of **15 successes**.

**Modifiers:**

| Condition | Modifier |
|---|---|
| 4+ Perfected techniques (instead of the minimum 3) | +2 dice each |
| Heavenly Body that aligns with the aspect | +3 dice |
| A master of the same aspect provides guidance | +5 dice |
| Cultivator burns 1 Heavenly Resentment to force the breakthrough | +3 dice (one-shot use) |
| Cultivator has previously attempted and failed | −2 dice cumulative |
| Cultivator's Cultivation Method is incompatible with the aspect (e.g. Body Method attempting Qi-aspect Ji Realm) | −5 dice |

**Outcomes:**

- **Success (15+):** Ji Realm achieved in the aspect. Permanent.
- **Marginal success (12–14):** Ji Realm not achieved, but progress is real. +5 to all aspect-related Insight. Re-attempt available after one full session of new aspect-related events.
- **Failure (8–11):** No progress. Re-attempt requires a new Moment of Truth within the aspect. May not retry in the same arc.
- **Catastrophic failure (0–7):** **Heart Demon manifests.** Lose 1d10 Insight in the relevant Dao; gain a permanent Heart Demon entry tied to the aspect (a doubt, an obsession, a fear) that imposes −2 dice on aspect rolls until resolved through dedicated arc work. Re-attempt requires the Heart Demon's resolution.

##### Loss of Ji Realm

Ji Realm can be *lost.* Canonically rare but mechanically real:

- **Cultivation Base shattered or sealed** — Ji Realm is gone with the base
- **Dao corruption** — if the cultivator's Dao Insight in the linked Dao drops below 300 (e.g., through Karma backlash, demonic corruption, or oath violation), Ji Realm in that aspect lapses until restored
- **Aspect Severance** — certain Nirvana-tier counter-arts can specifically sever an opponent's Ji Realm; this is a major story event

##### Design note for Perfected mastery

Perfected mastery on a single technique remains "functions one tier higher" — it is the technique's apotheosis, the gateway to Ji Realm in its aspect, and a major character moment in its own right. It is *not* the same thing as Ji Realm. Use the canonical name "Ji Realm" only for the aspect-wide state.

In flavor: "He has reached Ji Realm in his Sword Dao" is correct. "His Cloud Piercing Finger has reached Perfected mastery" is correct. "His Cloud Piercing Finger has reached Ji Realm" is *informal* but acceptable shorthand if the technique is part of an aspect for which the cultivator holds Ji Realm — otherwise it's category error.

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

#### 7.6.7 Dao Realm (道境) — Comprehension of Law

**Dao Realm is the rarest and most coveted state in cultivation.** Where Ji Realm is *invincibility within one's realm*, Dao Realm is *comprehension of the Dao itself* — the cultivator no longer merely uses techniques aligned with a Dao, they grasp the Dao as a law of reality. Canonically considered impossible below Soul Formation; the few outliers who reach it earlier are setting-defining figures.

##### What Dao Realm Is

A cultivator in Dao Realm of a specific Dao has comprehended that Dao to the point that **reality itself responds to their will within that Dao's domain**. A Sword Dao Realm cultivator can manifest swords from intention; a Karma Dao Realm cultivator can perceive and lightly manipulate karmic threads as a matter of awareness; a Time Dao Realm cultivator may briefly slow or hold moments.

**Critically, in canon:** spiritual force entering Dao Realm allows a cultivator to *quickly reach the Soul Formation stage* — Dao Realm is the established path past the Nascent Soul → Soul Formation breakthrough wall.

##### Mechanical Effect

While operating within the Dao Realm's Dao:

- **All techniques aligned with the Dao** function as one tier higher (the "Perfected effect" that Ji Realm explicitly does *not* provide is *here*, applied to every aligned technique at once)
- **Realm Barrier becomes irrelevant** for opponents within the Dao's reach — a Dao Realm Sword cultivator's swords cut through realm difference for any sword strike, not just specific techniques
- **Reality manipulation** within the Dao's purview becomes possible without a discrete technique — minor effects are free actions, major effects cost qi
- **Dao Insight cap removed** — the cultivator continues accruing Insight in this Dao indefinitely; this is what later allows Essence formation at Nirvana
- **Auto-progression:** if the cultivator is Nascent Soul or below when entering Dao Realm, they auto-progress one full sub-stage immediately, and breakthroughs to Soul Formation thereafter require half the normal resources

##### Prerequisites (all required)

1. **Realm minimum: Soul Formation.** Outliers may attempt at Nascent Soul Peak, but the catastrophic failure chance is much higher (see below). Below Nascent Soul, attempts are categorically impossible.
2. **Ji Realm in at least two aspects aligned with the target Dao.** A Sword Dao Realm requires Ji Realm in Sword aspect *and* in at least one supporting aspect (Wind, Metal, Soul, or specific weapon aspects). This represents the cultivator having mastered the Dao as practice before grasping it as law.
3. **Dao Insight: 1000+.** This is well past the normal Master tier (300). The points beyond 300 are accumulated through extraordinary experiences — major narrative arcs, witnessed Dao Realm cultivators of the same Dao, Dao Comprehension Pills consumed at high realm, ancient Dao stones, etc.
4. **A Dao Heart Forging event.** A profound test of the cultivator's connection to the Dao — typically an arc-level narrative event, not a single scene. The GM declares a candidate event; the player accepts and the event plays out as a full scenario whose stakes are the Dao Heart's integrity.

##### The Dao Realm Breakthrough

Unlike Ji Realm's single breakthrough roll, Dao Realm is a **multi-stage event spanning multiple sessions**, structured as a Dao-specific tribulation.

**Stage 1: Dao Heart Forging** — the narrative event that crystallizes the cultivator's connection to the Dao. Played out fully as a session arc.

**Stage 2: The Dao Tribulation** — a unique tribulation specific to the Dao being entered. Three waves of escalating challenge, each testing a different facet:
- *Wave 1:* mechanical mastery (a combat or technical challenge using techniques aligned with the Dao)
- *Wave 2:* moral/identity test (Heart Demons specific to the Dao manifest — a Slaughter cultivator faces the question of whether they kill for principle or compulsion; a Karma cultivator faces a debt they cannot pay)
- *Wave 3:* the Dao's own opposition — the cultivator confronts an avatar of the Dao itself, often appearing as a critique of the cultivator's understanding

Each wave uses standard combat/social mechanics but with stakes set by the GM and *no countermeasures permitted* — Dao Tribulation is an examination, not a fight to win at any cost.

**Stage 3: Comprehension** — if the cultivator survives all three waves, they enter Dao Realm. This is narratively a moment of stillness rather than a roll.

##### Outcomes

- **Full success (all three waves passed):** Dao Realm achieved. Permanent. Auto-progression triggers if applicable.
- **Partial success (1–2 waves passed):** Dao Realm not achieved, but the cultivator has glimpsed it. +500 Insight in the Dao (a massive bank). Re-attempt available after a major arc.
- **Failure (0 waves passed):** Dao Heart cracked. Lose all Insight in the Dao above 100. Cannot re-attempt for the rest of the campaign without a Dao Restoration arc (canonically: the Heaven Defying Bead, an ancient inheritance, or a senior of the same Dao mentoring the cultivator's recovery).
- **Catastrophic failure (Wave 1 outright failed at Nascent Soul or below):** Dao Heart shattered. The cultivator can never enter Dao Realm in this Dao. They may pursue another Dao, but this one is closed forever.

##### Loss of Dao Realm

Dao Realm is essentially permanent — it is comprehension, and comprehension cannot be unlearned. However:

- **The Dao itself can change** if the cultivator's Heavenly Body or fundamental nature transforms (rare, story-level events)
- **Specific Nirvana-tier techniques exist** that can suppress Dao Realm temporarily (canon: certain Devil Dao counter-techniques)
- **Voluntary abandonment** is possible if the cultivator changes Dao paths at Nirvana — this is what enables Essence-shifting

##### Design note for game balance

Dao Realm is intentionally a *late-game* state. A campaign that runs from Qi Condensation to Nascent Soul should not see PCs reach Dao Realm; one that runs to Soul Formation might see a single PC do so as a narrative climax. A campaign reaching Nirvana should expect multiple PCs to hold Dao Realm in their primary Dao, often with a second or third by the campaign's end. This is the rough cadence the canonical material implies.

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
- **Ji Realm Anchor** (any tier) — at Perfected mastery, this technique gains an additional unique property defined at design time. The technique is also marked as a *qualifying technique* for Ji Realm in its aspect (counts toward the three-Perfected-technique prerequisite per §7.6.3). Pick an effect at design time that makes sense for the technique reaching its apotheosis.

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
  - **3+ successes:** forceful telekinetic *swipe* — treat as a Body-equivalent attack with the rolled successes; can hurl a person multiple meters
  - May also be used as **Reactive** to interpose against an incoming attack (catch a blade, redirect a projectile) at the cost of your next turn's action
- **Budget:** Spirit 4 PP. Spend: 2 PP (utility — object manipulation, multi-purpose) + 1 PP (short range) + 1 PP (+1 die for combat scaling) = 4 PP. Full budget. The Reactive option is implicit in the multi-purpose utility framing.

**Mastery (Recipe C — Reach Curve):**
- Proficient: range extends to Medium (30m); can manipulate objects up to ~50 kg
- Mastered: can manipulate multiple objects simultaneously (up to 3); grip is strong enough to hold opponents within 1 realm of the user
- Perfected: functions as Mysterious-tier; **unlocks Sword Soaring** — the cultivator can now bind a sword treasure for flight and remote combat (per Treasures Framework §11)

**Dao affinity:** any (this is foundational, not Dao-specific). **Tags:** qi, telekinesis, foundational, sword-prerequisite.

**Design note:** because Attraction Force is a prerequisite for flying-sword combat, characters who skip it are *narratively* limited in a way the rules should reflect. A Foundation Establishment cultivator who never learned Attraction Force cannot wield a Sword Spirit treasure — period. This makes it the single most-learned technique in the setting.

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
- Perfected: evolves into Mysterious-tier *Cloud Shattering Finger*

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
- Perfected: evolves into Celestial-tier *Underworld Flame*; drain can target lifespan instead of qi

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
- Perfected: evolves into Celestial-tier *Hidden Path*; effectively invisible to opponents ≤2 realms above the user for 1 scene

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
- Perfected: functions as Void-tier; lifespan cost rises to 200 years but grants 2 full scenes of effect and bypasses 3 realms of Barrier

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
- **Requirements:** the user must hold Ji Realm in the Divine Sense aspect (per §7.6.3 — three Perfected Soul-source techniques + Master-level Soul or Lightning Dao Insight + breakthrough event). This is canonically Wang Lin's state when he first manifests Red Lightning at Core Formation.

**Mastery (Recipe E — Depth Curve):**
- Proficient: 1 additional Realm Barrier pierced
- Mastered: target cannot perceive user via Divine Sense for 3 rounds after hit
- Perfected: functions as Void-tier; damage can shatter a Nascent Soul's escape mechanism — a canonical "this kills a higher-realm cultivator's last resort" technique

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
- Perfected: functions as Nirvana-tier; the strike cannot be stopped except by an equal Nirvana-tier Fate/Karma technique

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
- Perfected: functions as Nirvana-tier; conjures a literal mountain that persists as difficult terrain for 1 scene

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

# PART C — CULTIVATION METHODS (功法)

## 21. What is a Method?

A **Cultivation Method** (功法, *gōngfǎ*) is the foundational system a cultivator follows to absorb qi, refine their body and soul, and progress through the realms. It is not a spell, not an ability, not a single technique — it is the entire framework that makes those things possible.

Every cultivator has exactly one Method active at a time. Without one, they are a mortal. With a low-quality one, they progress slowly and cap out early. With a high-quality one, they can ascend to states that mortals cannot imagine.

A Method defines, at minimum:

- **How** the cultivator gathers qi (orthodox absorption from heaven and earth, demonic devouring from other beings, body-tempering through physical hardship, etc.)
- **What kind** of qi they hold (orthodox, demonic, neutral, yin-aligned, yang-aligned, elemental, etc.)
- **How far** they can progress (each Method has a realm cap above which it cannot carry the cultivator without modification or replacement)
- **How fast** they progress (cultivation speed modifier on Seclusion)
- **What they're good at** (attribute affinity, element affinity, Dao alignment)
- **What they cannot do** (technique compatibility limits, restrictions on certain Daos, behavioral requirements)

Canonically, Wang Lin's arc is told *through* his Methods: he starts with the Heng Yue Sect's basic manual (a Common-grade orthodox Method), inherits Situ Nan's Underworld Ascension Method (a Mysterious-grade demonic Method that burns Blood Essence for power), and eventually develops his own self-modified approach as he ascends to Nirvana. The Method is never just background — it is the spine of his cultivation identity.

### Methods vs. Techniques

The distinction matters and should never be blurred at the table:

| | **Method (功法)** | **Technique (法术)** |
|---|---|---|
| **Scope** | The entire cultivation framework | A specific learned ability |
| **Quantity** | Exactly one active per cultivator | Many; Soul × 5 simultaneous slots |
| **Function** | Generates the cultivator's qi, attributes, realm progression | Spends qi to produce a discrete effect |
| **Acquisition** | Inheritance, sect, ancient manual, self-creation | Manual, teacher, witnessed combat, inheritance |
| **Replacement** | Difficult and costly (see §30) | Routine; learn new ones whenever |
| **Visible in play** | Mostly passive — affects all rolls | Active — declared and cast |
| **Examples** | Underworld Ascension Method, Heng Yue Standard Cultivation | Cloud Piercing Finger, Blue Flames |

Techniques *use* the qi the Method generates. Methods do not produce techniques — though they often come bundled with a starter set, and they determine which techniques the cultivator can learn well.

### The Methodless State

A cultivator without an active Method is in one of three states:

- **Mortal** — has never cultivated. Cannot progress. Cannot use techniques. Standard human attributes.
- **Method-Severed** — had a Method but lost it (sect expelled them and revoked inheritance, the manual was destroyed mid-cultivation, the cultivator chose to abandon it). Retains current realm but cannot progress further; existing techniques become harder to use (+1 difficulty on all qi techniques); risk of Qi Deviation rises sharply.
- **Methodless Sage** — Nirvana-tier cultivators may transcend the need for a discrete Method, having internalized the cultivation process to the point that Method becomes redundant. This is rare, terminal-tier, and not a goal for PCs in most campaigns.

### Method Acquisition

A starting PC has a Method assigned through their Affiliation step (see Cultivation Framework §1.4). During play, new Methods may be acquired through:

- **Sect ascension** — promoted to a tier of disciple that grants access to a higher Method
- **Inheritance** — surviving a tomb, ruin, or trial that bequeaths an ancient Method
- **Looted manual** — taking a Method from a defeated opponent (carries Karma cost)
- **Master's gift** — a senior cultivator transmits their Method as legacy
- **Self-creation** — synthesized from study, comprehension, and Dao Insight (very rare; requires Soul Formation+ and Dao Realm in at least one Dao)

---

## 22. Method Anatomy

Every Method has these fields. When designing, fill all of them.

| Field | Description |
|---|---|
| **Name** | Evocative, often referencing the Method's nature or origin |
| **Category** | Orthodox / Demonic / Body / Yin-Yang / Self-Taught (see §23) |
| **Quality** | Common / Spirit / Mysterious / Celestial / Immortal (see §24) |
| **Origin** | Sect / Inheritance / Found / Self-Created / Demonic Pact |
| **Realm Cap** | Highest realm this Method can carry the cultivator to |
| **Foundation Effects** | Passive bonuses applied at all times (qi pool, regen, attribute affinity, etc.) |
| **Stage Unlocks** | What new effects unlock as the cultivator advances through realms |
| **Compatibility** | Which technique categories the Method supports / penalizes / forbids |
| **Restrictions** | Costs, Karma, behavioral requirements, lifespan tolls |
| **Dao Alignment** | Which Daos the Method resonates with |
| **Tags** | Yin, yang, fire, water, demonic, blood, etc. |

---

## 23. The Five Method Categories

These are the canonical paths. A Method belongs to exactly one — Hybrid Methods exist but are Self-Taught by definition (you cannot officially follow two paths within an orthodox framework).

### 23.1 Orthodox (正道)

The cultivation path of harmony with heaven and earth. Qi is absorbed from the natural world; progression is steady; tribulations are predictable. Most great sects practice Orthodox cultivation.

**Identifying traits:**
- Qi nature: pure, neutral, or element-aligned
- Tribulations: standard difficulty
- Karma cost: low to none for cultivation itself
- Realm cap potential: any tier (Immortal-grade Orthodox Methods reach Nirvana)
- **Strength:** safety, sect support, stable progression
- **Weakness:** slower than competing paths; vulnerable to Demonic counter-arts

### 23.2 Demonic (魔道)

The cultivation path of taking qi from others. Cultivators of this path absorb the qi, blood, or souls of living beings to fuel their own progression — the "Devouring" approach. Faster than Orthodox cultivation but morally and karmically catastrophic.

**Identifying traits:**
- Qi nature: tainted, inverted, or "cold" (canonically appears as black, red, or dark-tinged)
- Tribulations: harsher (Heaven hates demonic cultivators); +1 tribulation tier
- Karma cost: +1 Black Karma per breakthrough (canonical)
- Realm cap potential: any tier — the path has its own Immortal-grade Methods
- **Strength:** rapid cultivation, qi-drain capabilities, freedom from sect orthodoxy
- **Weakness:** Karma accumulation, hunted by Orthodox cultivators, Heart Demons more frequent

### 23.3 Body (体修)

The cultivation path of refining the flesh into something more than mortal. Body cultivators temper their bodies through physical hardship — beating themselves with weapons, bathing in lava, withstanding lightning — until their body itself becomes the cultivation base.

**Identifying traits:**
- Qi nature: minimal (Body cultivators have small qi pools but enormous physical durability)
- Body attribute is dramatically elevated; Qi attribute remains low
- Tribulations: tested through physical destruction, often more brutal than Orthodox
- Realm cap potential: any tier; high-tier Body Methods produce Heavenly Body cultivators
- **Strength:** absurd physical attribute, low qi cost on Body-source techniques, immune to many qi attacks
- **Weakness:** Qi-source techniques cost double qi (per §7.3); slower in non-physical situations

### 23.4 Yin-Yang (双修)

The cultivation path of paired cultivation, requiring a partner of complementary nature (one Yin, one Yang) to progress. The two cultivators' qi cycles support each other; alone, they progress at half speed or worse.

**Identifying traits:**
- Qi nature: explicitly Yin or Yang aligned
- Always requires a bonded partner for full effect
- Tribulations: shared between partners; one fails, both suffer
- Realm cap potential: any tier; reaches highest with a stable partnership
- **Strength:** doubled cultivation speed when paired, mutual support, unique paired techniques
- **Weakness:** loss of partner is catastrophic (lose 1 sub-stage of realm; Heart Demon manifests); rare and hard to find compatible partner

### 23.5 Self-Taught / Hybrid (散修)

The cultivation path of those without a sect or inheritance — synthesizing what they can, learning from observation and trial. This is also where Hybrid Methods (combinations of two paths) live, since no orthodox sect would sanction such a thing.

**Identifying traits:**
- Qi nature: unique to the cultivator
- Tribulations: unpredictable — sometimes easier, sometimes worse
- Realm cap potential: any, but each tier requires self-modification of the Method (a cost)
- **Strength:** flexibility, no sect obligations, can incorporate any technique compatible with their idiosyncratic Method
- **Weakness:** no support network, no inheritance pipeline, harder to break through (Self-Taught cultivators get +1 die to learn techniques but +2 difficulty on breakthroughs without external aid)

Wang Lin's mature Method is canonically Self-Taught Hybrid — he combines fragments of Orthodox Heng Yue Sect cultivation, the Underworld Ascension Method, and his own Restriction-focused refinements into a synthesis no sect would recognize.

---

## 24. Method Quality Tiers

Quality determines the Method's Foundation Point (FP) budget, its realm cap, and how many Stages it has.

| Quality | FP Budget | Realm Cap | Stages | Source |
|---|---|---|---|---|
| **Common** | 4 FP | Foundation Establishment (Tier 8) | 1–2 | Mortal-grade manuals, basic sect inheritance |
| **Spirit** | 8 FP | Core Formation (Tier 12) | 3 | Standard sect Methods |
| **Mysterious** | 16 FP | Nascent Soul (Tier 16) | 5 | Great sect Methods, ancient inheritances |
| **Celestial** | 32 FP | Soul Formation (Tier 20) | 7 | Top-tier sect Methods, Immortal-touched manuals |
| **Immortal** | 64 FP | Nirvana (Tier 25+) | 9 | Ancient Immortal inheritances, self-created at peak |

A cultivator who reaches their Method's realm cap *cannot* break through further without:
- Replacing the Method with one of higher quality (most common path)
- Modifying their existing Method via Dao Insight (Self-Taught path)
- Pure stagnation and lifespan-limited death

This is the canonical reason high-quality Methods are so coveted: a cultivator with a Common Method who reaches Foundation Establishment Peak has *capped out* unless they find a better one.

### Stages

Most Methods unfold in stages keyed to realm progression. A Spirit-quality Method might have:
- **Stage 1** unlocked at Qi Condensation
- **Stage 2** unlocked at Qi Condensation Layer 6
- **Stage 3** unlocked at Foundation Establishment (and is the final stage)

Each stage typically grants new Foundation Effects from the Method's budget. Designing a multi-stage Method means *parceling the FP budget across stages*, not spending it all at Stage 1.

---

## 25. Method Effects Menu

Spend FP from your tier's budget on these effects. Most can be taken once per stage; some scale.

### Qi & Cultivation
| Effect | FP Cost |
|---|---|
| +1 qi pool slot per realm tier (cumulative) | 1 FP |
| +1 qi/round natural regen | 2 FP |
| +1 die on breakthrough rolls | 2 FP |
| −10% time on Seclusion to reach next sub-stage | 2 FP |
| −1 tribulation tier (one-step easier) | 4 FP |
| +50 years natural lifespan | 1 FP |

### Attribute & Body
| Effect | FP Cost |
|---|---|
| Attribute focus: +1 to Body / Qi / Soul as preferred attribute | 2 FP |
| Heavenly Body alignment (Method synergizes with one specific Heavenly Body) | 3 FP |
| Iron Body trait (DR 1 against physical damage; stacks per stage) | 3 FP |
| Spiritual Sense range bonus (+1 realm tier of Divine Sense range) | 3 FP |

### Element & Dao
| Effect | FP Cost |
|---|---|
| Element affinity (+1 die on aligned-element techniques) | 2 FP |
| Dao alignment (×1.5 Insight gain in one Dao) | 3 FP |
| Five Element Mastery (all five elements treated as +1 affinity, but no specialization) | 5 FP |
| Resonance with one specific technique type (+2 dice using techniques of that type) | 3 FP |

### Signature / Unique
| Effect | FP Cost |
|---|---|
| Qi-Drain (Demonic): each successful Qi-source attack restores 1 qi (Demonic only) | 4 FP |
| Blood Burn (Body/Demonic): may spend lifespan as qi at 10 years/qi | 4 FP |
| Yin-Yang Bond Channel (Yin-Yang only): paired partner gains all your Foundation Effects at half value | 3 FP |
| Method Adaptability (Self-Taught only): may modify the Method without abandoning it; Insight cost in lieu of replacement | 5 FP |
| Restriction Foundation (Wang Lin's signature): +2 dice on all Restriction-form techniques | 4 FP |
| Sword Body / Sword Method: all sword techniques cost −1 qi (min 1) | 3 FP |
| Demonic Heart Suppression: Heart Demon checks reduced by 2 dice | 3 FP |

### Banked / Empty
Unspent FP becomes "Empty Foundation" — cultivator may, at any later breakthrough, spend a held FP to buy any valid effect from the menu retroactively. A Self-Taught path. Common Methods cannot bank FP.

---

## 26. Method Restrictions (Budget Refunds)

Restrictions refund FP, allowing more effects within a tier's budget. Like technique restrictions, they cap at 50% of the tier's budget.

| Restriction | FP Refund |
|---|---|
| Sect-exclusive (lose Method on expulsion) | 1 FP |
| Element-locked (only works for cultivators with matching Spiritual Root) | 1 FP |
| Demonic Path nature (gains +1 Black Karma per breakthrough) | 2 FP |
| Body Path qi-tax (Qi-source techniques cost 2× qi) | 2 FP |
| Yin-Yang requires bonded partner (half effect when alone) | 3 FP |
| Lifespan toll (loses 10 years of natural lifespan per breakthrough) | 2 FP |
| Cannot learn Demonic techniques (Orthodox lock) | 1 FP |
| Cannot learn Orthodox techniques (Demonic lock) | 1 FP |
| Behavioral requirement (must meditate daily, must consume blood, must remain celibate, etc.) | 1 FP |
| Heart Demon vulnerability (+1 difficulty on all Heart Demon checks) | 2 FP |
| Visible cultivation tells (qi appears unusually colored — black, red, ghostly — making the cultivator readable as Demonic / Forbidden) | 1 FP |
| Tribulation severity +1 tier | 3 FP |
| Realm cap one tier below quality default | 3 FP |
| Specific technique forbidden category (no Soul techniques, no Restriction techniques, etc.) | 1 FP per category |

**Stacking caution:** four or more restrictions on a single Method makes it almost certainly Demonic, Forbidden, or self-taught — even if the design says otherwise. The restrictions tell their own story.

---

## 27. Method Stages — Layered Cultivation

Higher-quality Methods unfold in stages. Each stage unlocks at a specific cultivation realm and grants a portion of the Method's total FP budget.

### Suggested FP allocation per stage:

**Spirit Quality (8 FP, 3 stages):**
- Stage 1 (Qi Condensation): 4 FP
- Stage 2 (Foundation Establishment): 2 FP
- Stage 3 (Core Formation Cap): 2 FP

**Mysterious Quality (16 FP, 5 stages):**
- Stage 1 (Qi Condensation): 5 FP
- Stage 2 (Foundation Establishment): 3 FP
- Stage 3 (Core Formation): 3 FP
- Stage 4 (Nascent Soul Approach): 3 FP
- Stage 5 (Nascent Soul Cap): 2 FP

**Celestial Quality (32 FP, 7 stages):**
- Stage 1: 6 FP
- Stages 2–6: 4 FP each (20 FP)
- Stage 7 (Soul Formation Cap): 6 FP

**Immortal Quality (64 FP, 9 stages):**
- Stage 1: 8 FP
- Stages 2–8: 6 FP each (42 FP)
- Stage 9 (Nirvana): 14 FP

Stage 1 always includes the Method's foundational character (qi nature, attribute focus, primary element/Dao alignment). Later stages typically expand and refine — an early stage might give "+1 die on Fire techniques," and a later stage might evolve that into "+3 dice and Fire Essence formation eligibility."

---

## 28. The Method Creation Process

Eight steps. Methods take longer to design than techniques because they're foundational — every other rule on a cultivator's sheet flows from here.

1. **Concept & flavor** — what does this Method feel like? Who would create it? Who would teach it? What does the qi look like when channeled?
2. **Choose Category** — Orthodox / Demonic / Body / Yin-Yang / Self-Taught.
3. **Choose Quality** — based on the campaign's expected ceiling and the Method's intended role.
4. **Choose Origin** — sect / inheritance / found / self-created. Origin influences how PCs acquire it.
5. **Outline Stages** — sketch what unlocks at each realm. Even Common Methods benefit from a 1–2 stage outline.
6. **Spend FP across Stages** — buy Foundation Effects from §25, optionally take Restrictions from §26.
7. **Set Compatibility** — what techniques does the Method support? Which does it forbid or penalize?
8. **Stress test** — does it interact with at least three other systems (Daos, attributes, qi, Karma, Heart Demons)? Is it strictly better than peer-quality Methods? (must be NO).

---

## 29. Method Compatibility & Switching

### Technique Compatibility

A Method's category determines technique compatibility (per §7.3):

| Method Category | Orthodox Techniques | Demonic Techniques | Body Techniques | Soul Techniques |
|---|---|---|---|---|
| **Orthodox** | Full | −2 dice; +1 Demonic Heart per use | Full | Full |
| **Demonic** | Full but +2 Black Karma per use | Full | Full | Full |
| **Body** | Full | −2 dice | Full +1 die | Doubled qi cost |
| **Yin-Yang** | Full when paired; halved alone | −2 dice; +1 Heart Demon when paired | Full | Full |
| **Self-Taught** | Full | Full at +1 Black Karma | Full | Full |

Self-Taught is the most flexible category for a reason — it has no traditions to violate. The cost is the lack of sect support and harder breakthroughs.

### Switching Methods

A cultivator can replace their active Method with another, but the cost is severe:

- **Realm Regression:** lose 1 sub-stage of cultivation immediately upon switching
- **Qi Deviation Risk:** roll Soul + Soul Realm vs. 8 successes. Failure = 1 month of cultivation downtime; catastrophic failure (less than 4 successes) = permanent loss of 1 realm sub-stage
- **Insight Loss:** any Daos misaligned with the new Method lose 1d10 Insight
- **Heart Demon Manifestation:** automatic, requires resolution

This is why most cultivators stick with one Method for their entire arc, even if better ones become available. Wang Lin canonically goes through *three* Methods in his lifetime — this is exceptional, not normal.

### Hybrid Methods (Self-Taught Only)

A Self-Taught cultivator at Soul Formation+ may *graft* fragments of another Method onto their existing one without full replacement. This costs:

- 1 FP equivalent of effects from the source Method may be transplanted per Soul Formation sub-stage
- 100 Insight in the linked Dao
- 1 full Seclusion arc (campaign-level event)

The result is a Hybrid Method — typically Self-Taught in category but carrying traits of its source Methods. This is canonically how Wang Lin's mature cultivation works.

### Dual-Method Cultivators (Forbidden / Mythical)

Carrying two active Methods simultaneously is canonically impossible without specific divine artifacts (e.g., Heaven Defying Bead) or unique Heavenly Bodies. If a campaign features such an artifact, dual-Method status grants:

- Both Methods' Foundation Effects (full)
- +1 tribulation tier (Heaven hates this)
- Constant Heart Demon pressure (one check per session)
- Inability to reach Nirvana without unifying the Methods

This is GM-permission-only and shouldn't be available to PCs without major narrative justification.

---

## 30. Canonical Xian Ni Method Examples

Four canonical Methods statted using this framework.

### 30.1 Heng Yue Sect Standard Cultivation Method (Spirit, Orthodox)

The basic Method taught to all Heng Yue Sect outer disciples. Wang Lin's first cultivation framework. Reliable, balanced, unspectacular.

- **Category:** Orthodox | **Quality:** Spirit (8 FP) | **Realm Cap:** Core Formation
- **Origin:** Sect inheritance (Heng Yue Sect, a minor sect in Zhao Country)
- **Stages:** 3

**Stage 1 (Qi Condensation, 4 FP):**
- +1 qi pool slot per realm tier (1 FP)
- +1 die on breakthrough rolls (2 FP)
- Element neutrality — works with any Spiritual Root (1 FP via "no element lock" — this is implicit in not taking the element-locked refund)

**Stage 2 (Foundation Establishment, 2 FP):**
- Attribute focus: +1 Qi (2 FP)

**Stage 3 (Core Formation Cap, 2 FP):**
- +1 qi/round regen (2 FP)

**Restrictions taken:** Sect-exclusive (+1 FP refund) — refunded into the Stage 1 element-flexibility option. Cannot learn Demonic techniques (+1 FP refund) — refunded into Stage 3 regen.

**Compatibility:** Standard Orthodox; full with Body and Soul techniques; penalized with Demonic.

**Notes:** This Method is *intentionally average*. It exists to give Heng Yue Sect a baseline for inner-disciple selection. Wang Lin breaks through to Foundation Establishment on it but stalls at Core Formation, which is canonically why he later seeks out the Underworld Ascension Method.

---

### 30.2 Underworld Ascension Method (Mysterious, Demonic)

Situ Nan's signature Method, transmitted to Wang Lin in Book 2. A demonic-aligned cultivation framework that absorbs the qi of others and burns Blood Essence for breakthrough power. The Method that genuinely launches Wang Lin's cultivation.

- **Category:** Demonic | **Quality:** Mysterious (16 FP) | **Realm Cap:** Nascent Soul
- **Origin:** Inheritance (Situ Nan, Demonic cultivator from a previous era)
- **Stages:** 5

**Stage 1 (Qi Condensation, 5 FP):**
- +1 qi pool slot per realm tier (1 FP)
- Qi-Drain: successful Qi-source attacks restore 1 qi (4 FP)

**Stage 2 (Foundation Establishment, 3 FP):**
- +2 dice on breakthrough rolls (4 FP — over budget; see refunds below)

**Stage 3 (Core Formation, 3 FP):**
- Blood Burn: may spend lifespan as qi at 10 years/qi (4 FP — over; see refunds)

**Stage 4 (Nascent Soul Approach, 3 FP):**
- −10% Seclusion time (2 FP)
- Bonded with Blue Flames technique (+2 dice when using Blue Flames of the Underworld) (3 FP — over)

**Stage 5 (Nascent Soul Cap, 2 FP):**
- Demonic Heart Suppression: Heart Demon checks reduced by 2 dice (3 FP — over)

**Restrictions taken (refunding 8 FP across stages):**
- Demonic Path nature (+1 Black Karma per breakthrough): +2 FP
- Cannot learn Orthodox techniques without penalty: +1 FP
- Tribulation severity +1 tier: +3 FP
- Visible cultivation tells (Wang Lin's qi appears black-tinged): +1 FP
- Behavioral: requires periodic absorption of others' qi to avoid stagnation: +1 FP

Total refund: 8 FP. Total spent: 24 FP across stages, with 8 refunded — net 16 FP, on budget for Mysterious quality.

**Compatibility:** Full with Demonic techniques; full with Body techniques; standard with Soul; cannot use Orthodox techniques without +2 Black Karma per use.

**Notes:** This is the Method that lets Wang Lin punch above his realm. The Qi-Drain effect alone makes him a nightmare for equal-realm opponents, and Blood Burn is what enables his canonical realm-skipping fights. The cost is real — Karma accumulation, tribulation severity, and the eventual need to either ascend past Demonic or face Heaven's verdict.

---

### 30.3 Iron Bone Body Forging Method (Spirit, Body)

A representative Body cultivation Method — generic enough to use for any "warrior-monk" or "outer-region body cultivator" NPC. Trades qi for raw physical power.

- **Category:** Body | **Quality:** Spirit (8 FP) | **Realm Cap:** Core Formation
- **Origin:** Sect inheritance (any martial sect; Iron Mountain Hall, Stone Lion Temple, etc.)
- **Stages:** 3

**Stage 1 (Qi Condensation, 4 FP):**
- Attribute focus: +1 Body (2 FP)
- Iron Body trait: DR 1 against physical damage (3 FP — 1 over, see refunds)

**Stage 2 (Foundation Establishment, 2 FP):**
- Iron Body upgrade: DR 2 against physical damage (3 FP — over)

**Stage 3 (Core Formation Cap, 2 FP):**
- +50 years natural lifespan (1 FP)
- +1 die on Body-source techniques (1 FP via implicit Body Path bonus from Resonance, undercosted here)

**Restrictions taken (refunding 4 FP):**
- Body Path qi-tax (Qi techniques cost 2× qi): +2 FP
- Cannot learn Soul techniques effectively: +1 FP (specific category lock)
- Behavioral: Method requires daily physical training regimen: +1 FP

**Compatibility:** Body techniques full and discounted; Qi techniques doubled cost; Soul techniques near-impossible.

**Notes:** This is the Method of the warrior-monk archetype. Body cultivators are tanks — they soak hits and deliver crushing physical strikes. They are bad at ranged combat, illusion-resistance, and Soul interactions, which is why Body-focused parties pair well with Soul-aligned support cultivators.

---

### 30.4 Heaven Defying Bead Self-Cultivation (Immortal, Self-Taught)

Wang Lin's canonical late-game Method, synthesized after he ascends past mortal sects and incorporates the Heaven Defying Bead into his cultivation. A unique Self-Taught Hybrid that combines fragments of Heng Yue Orthodox cultivation, the Underworld Ascension Method, and his own Restriction-focused refinements. This is a *defining cultivator* Method, not a typical PC starting point.

- **Category:** Self-Taught (Hybrid: Orthodox + Demonic + Restriction-specialist) | **Quality:** Immortal (64 FP) | **Realm Cap:** Nirvana
- **Origin:** Self-created via Heaven Defying Bead inheritance
- **Stages:** 9

**Foundation Effects across stages (selected highlights — full statline shown for representative stages):**

**Stage 1 (Qi Condensation, 8 FP):**
- +1 qi pool slot per realm tier (1 FP)
- +1 qi/round regen (2 FP)
- Method Adaptability (Self-Taught only): can modify Method per Soul Formation sub-stage (5 FP)

**Stage 5 (Nascent Soul, 6 FP):**
- Qi-Drain (Demonic fragment carried over): 1 qi per Qi-attack hit (4 FP)
- Restriction Foundation: +2 dice on all Restriction-form techniques (this is the canonical Wang Lin signature) (4 FP — over without refunds; see below)
- −1 Tribulation tier (4 FP — see below)

**Stage 9 (Nirvana, 14 FP):**
- Five Element Mastery: all five elements treated as +1 affinity (5 FP)
- Dao alignment ×3 (Restrictions, Slaughter, Karma) — 9 FP (3 FP each)

**Restrictions taken (substantial; refunding ~12 FP across stages):**
- Tribulation severity +1 tier (offsetting late-stage tribulation reduction): +3 FP — yes, the cultivator made the tribulations worse to offset other gains, then bought the reduction back as a feature
- Heart Demon vulnerability: +2 FP
- Visible cultivation tells (Wang Lin's mature qi flickers between black and gold — readable as Heaven-Defying): +1 FP
- Behavioral: must continually deepen Restriction Dao or stagnate: +1 FP
- Demonic Path nature (Karma backlog): +2 FP
- Element-locked? No — this Method *un-locks* element flexibility, which is unusual.

**Compatibility:** Universal — Wang Lin can learn techniques from any source at this point, though Karma and Heart Demon costs apply to Demonic techniques as standard.

**Notes:** This Method is shown as an example of what a fully realized Immortal-grade Self-Taught Method looks like in canon. It is *not* recommended as a player starting point; it represents 1500 chapters of cultivation and several Method switches. Use as a goalpost / NPC stat block / inheritance the campaign builds toward.

---

## 31. Quick-Reference Method Design Sheet

Print this. Keep it next to the techniques sheet.

```
STEP 1 — CONCEPT
  Pitch (one sentence):
  Who teaches it? Where is it found?
  What does the qi look/feel like?

STEP 2 — CATEGORY
  □ Orthodox  □ Demonic  □ Body  □ Yin-Yang  □ Self-Taught

STEP 3 — QUALITY
  □ Common (4 FP, cap Foundation Establishment, 1–2 stages)
  □ Spirit (8 FP, cap Core Formation, 3 stages)
  □ Mysterious (16 FP, cap Nascent Soul, 5 stages)
  □ Celestial (32 FP, cap Soul Formation, 7 stages)
  □ Immortal (64 FP, cap Nirvana, 9 stages)

STEP 4 — ORIGIN
  □ Sect  □ Inheritance  □ Found Manual
  □ Self-Created  □ Demonic Pact

STEP 5 — STAGE OUTLINE
  Stage 1 (___): _____ FP
  Stage 2 (___): _____ FP
  Stage 3 (___): _____ FP
  Stage 4 (___): _____ FP
  Stage 5 (___): _____ FP
  ...

STEP 6 — FP SPEND
  Qi & Cultivation: _____ FP
  Attribute & Body: _____ FP
  Element & Dao: _____ FP
  Signature: _____ FP
  Restrictions (refund): − _____ FP
  TOTAL: _____ / _____ budget

STEP 7 — COMPATIBILITY
  Orthodox techniques: _____
  Demonic techniques: _____
  Body techniques: _____
  Soul techniques: _____
  Forbidden categories: _____

STEP 8 — STRESS TEST
  □ Does the Category match the Method's flavor?
  □ Are Stage unlocks paced across realms?
  □ Does at least one Stage grant something dramatic, not just numerical?
  □ Does it interact with three+ other systems (Karma, Heart Demons, Daos, attributes, tribulations)?
  □ Is it strictly better than peer-quality Methods? (must be NO)
  □ If Demonic, does Karma cost actually affect play?
  □ If Body, does the qi-tax bite hard enough?
  □ If Yin-Yang, is the partner integration meaningful?
```

---

# PART D — DUAL CULTIVATION (双修)

## 32. What is Dual Cultivation?

**Dual Cultivation (双修, *shuāngxiū*)** is the practice of two cultivators joining their qi cycles to accelerate progression beyond what either could achieve alone. It is not strictly a Method category — any cultivator may engage in dual cultivation if their nature and partner permit — but it interacts so deeply with the Method system that it warrants its own framework.

**Canonical grounding in Xian Ni:** dual cultivation matters most acutely at the **Illusionary Yin / Corporeal Yang transitional realms** between Ascendant and Nirvana, where a cultivator must master both Yin and Yang to advance. Wang Lin's hunt for sources of pure Yin energy (the Yin Energy Detection Technique, the Cold Core formation in Foundation Establishment) is the canonical example of *solo* dual-aligned cultivation. Paired dual cultivation — two cultivators sharing the work — is treated in canon as both faster and more dangerous.

### The Three Pairings

Canonically, dual cultivation comes in three forms based on the partners' qi alignment:

- **Yin-Yang (balanced)** — one Yin-aligned partner, one Yang-aligned partner. The orthodox form. Maximum efficiency, lowest risk.
- **Yang-Yang (resonant)** — both partners Yang-aligned. Powerful but volatile; risk of qi conflagration.
- **Yin-Yin (resonant)** — both partners Yin-aligned. Powerful but stagnant; risk of qi solidification (Cold Core deepening, possible coma).

Each has different mechanical effects, different requirements, and different failure modes. The framework treats all three as legitimate paths — none is morally better than another, though Orthodox sects favor Yin-Yang and Demonic sects often favor same-sign pairings for the raw power gains.

### Dual Cultivation vs. Yin-Yang Method Category

The **Yin-Yang Method category** (§23.4) requires a bonded partner for the Method itself to function — these cultivators *cannot effectively cultivate alone*. Dual cultivation as described here is a *broader* practice: any cultivator (Orthodox, Demonic, Body, Self-Taught) can engage in dual cultivation as a periodic enhancement, not a permanent dependency.

In short: a Yin-Yang Method cultivator *must* dual-cultivate. Cultivators of other Methods *may* dual-cultivate.

### The Dao Companion Bond (道侣)

Most serious dual cultivation requires a **Dao Companion** (道侣, *dàolǚ*) — a deeper partnership than mortal marriage, where the two cultivators bind their fates explicitly. This bond is mechanical, not just narrative:

- Shared Karma — Black Karma or White Karma earned by one is partially shared (1 per 3 earned, rounded down)
- Shared lifespan capacity — pooled lifespan; one partner near death may receive years from the other (voluntary, ritual-required)
- Shared Heart Demon vulnerability — one partner's Heart Demon affects both Heart Demon checks for the duration
- Severance of bond is catastrophic (see §35)

Casual dual cultivation without a Dao Companion bond is possible but limited (see §33).

---

## 33. Dual Cultivation Framework

Dual cultivation is structured as a **paired Seclusion** with mechanical effects determined by the pairing type, the partners' compatibility, and the depth of bond.

### Seclusion as Dual Cultivation

To engage in dual cultivation, both partners spend equal Seclusion slots together. The minimum is 1 slot per partner; the canonical full session is 4 slots per partner (a Cultivation Arc).

Both partners gain the benefits and bear the risks. If one partner's roll fails catastrophically, the other is affected.

### Compatibility Score

Before any pairing rolls, calculate a **Compatibility Score** between the two partners. This determines the dice modifier on all dual cultivation rolls.

| Compatibility Factor | Modifier |
|---|---|
| Same Method category (e.g. both Orthodox) | +1 |
| Compatible Method categories (Orthodox + Self-Taught, Body + Orthodox) | +0 |
| Conflicting Method categories (Orthodox + Demonic) | −2 |
| Within 2 realm tiers of each other | +1 |
| Within 1 realm sub-stage | +2 |
| 3+ realm tiers apart | −3 |
| Aligned Daos (one+ shared Dao at Initiate or higher) | +1 per shared Dao (cap +3) |
| Conflicting Daos (e.g. Slaughter + Mercy, Karma + Cause-Severing) | −2 per conflict |
| Has formed Dao Companion bond | +2 |
| Has Pure Yin / Pure Yang Body (or equivalent rare bloodline) | +3 (only the pure-bodied partner contributes this; both being pure-bodied stacks to +6) |
| Romantic / emotional bond (narrative judgment) | +1 |
| Hostile or coerced pairing | −5 (and a Karma cost — see §35) |

A net Compatibility Score of **−5 or worse** makes dual cultivation impossible without external aid (a master-grade pill, a formation, a divine artifact). Below **0**, the pairing is technically possible but no rational cultivator would attempt it.

### The Dual Cultivation Roll

At the end of the paired Seclusion, both partners make a single shared roll:

**Roll:** lower of the two partners' (Qi Realm Tier + Soul Realm Tier) + Compatibility Score, in dice. Target depends on pairing type (see §34).

**Outcomes:**

- **Full success:** both partners gain pairing-specific benefits (see §34). Insight gain in any shared Daos.
- **Marginal success:** benefits halved; no Insight gain; small risk of Heart Demon.
- **Failure:** no progress for either; cultivation slowed for next Seclusion.
- **Catastrophic failure:** Qi Deviation for both partners; possible cultivation regression (see §35).

---

## 34. The Three Pairings

### 34.1 Yin-Yang (Balanced Cultivation)

The orthodox dual cultivation: one Yin-aligned partner, one Yang-aligned partner. Yin and Yang qi flow between them, each tempering and refining the other. Bottlenecks dissolve, impurities burn away, both cultivation bases solidify.

**Partner Requirements:**
- One partner Yin-aligned (born Yin Spiritual Root, or cultivating a Yin-aligned Method, or bearing a Yin Heavenly Body)
- One partner Yang-aligned (corresponding above)
- Compatibility Score ≥ 0

**Roll Target:** 6 successes per Seclusion slot (e.g., 24 successes for a full 4-slot Cultivation Arc)

**Benefits on full success:**

| Realm | Benefit |
|---|---|
| Qi Condensation – Foundation Establishment | +50% Insight gain on any shared Dao; +1 sub-stage progress |
| Core Formation – Nascent Soul | Above + dissolution of one cultivation bottleneck (one re-roll on next breakthrough) |
| Soul Formation – Ascendant | Above + +1 die permanent on any technique aligned with the partner's primary Dao |
| Illusionary Yin / Corporeal Yang transition | Above + this is the canonical path through these realms; without dual cultivation, the transition takes 5× longer |
| Nirvana | Above + may co-comprehend a single Essence (rare, requires a Dao Companion bond) |

**Risk profile:** *Low.* This is the safest dual cultivation path. Catastrophic failure typically results in 1 month of cultivation downtime, not regression. **No Karma cost.**

**Narrative weight:** the orthodox path. Sects approve. Heaven approves. Tribulations are slightly more lenient for Yin-Yang Dao Companions.

### 34.2 Yang-Yang (Resonant Cultivation)

Two Yang-aligned partners. Their qi resonates rather than tempering — fire feeding fire. The result is a massive temporary surge in cultivation speed but a high risk of *qi conflagration* (out-of-control Yang qi consuming meridians, lifespan, or sanity).

**Partner Requirements:**
- Both partners Yang-aligned (Yang Spiritual Root, Yang Method, or Yang Heavenly Body)
- Compatibility Score ≥ +2 (resonance pairings need higher compatibility to remain stable)
- At least one partner has Fire, Lightning, Slaughter, or another high-Yang Dao at Initiate or higher

**Roll Target:** 8 successes per Seclusion slot (harder than Yin-Yang)

**Benefits on full success:**

| Realm | Benefit |
|---|---|
| Qi Condensation – Foundation Establishment | +100% Insight gain on shared Dao; +1 sub-stage progress; both partners gain a temporary +1 die on Yang-aligned techniques for the next session |
| Core Formation – Nascent Soul | Above + may temporarily punch one realm above for the next combat scene (lasts one session) |
| Soul Formation – Ascendant | Above + permanent +2 dice on Yang-Dao Insight rolls for the rest of the campaign |
| Illusionary Yin / Corporeal Yang transition | Generally inadvisable — Yang-Yang resonance hinders the Yin half of the transition. Use Yin-Yang or solo cultivation instead. |
| Nirvana | Above + may condense a Yang-aligned Essence faster (−1 stage of Insight requirement) |

**Risk profile:** *High.*

| Outcome | Result |
|---|---|
| Marginal success | Both partners must roll Body + Body Realm vs. 6 successes or suffer 1d4 lifespan years burned (qi conflagration scorching) |
| Failure | As marginal, but lifespan burn rises to 1d10 years; one partner gains a Heart Demon (Recklessness, Bloodlust, or Megalomania) |
| Catastrophic failure | Both partners suffer Qi Deviation (one full sub-stage cultivation regression); both gain Heart Demons; one partner risks a full Yang Conflagration — roll Body + Body Realm vs. 12 or lose 50–500 years of lifespan as the Yang qi runs wild |

**Karma cost:** +1 Black Karma per session (Yang-Yang resonance is associated with Demonic and Slaughter-aligned cultivation; Heaven views it suspiciously)

**Narrative weight:** the path of fire-walkers. Demonic cultivators, Slaughter-Dao practitioners, and rivals-turned-allies often favor this pairing. Faster, dirtier, hotter. Burn out or break through.

### 34.3 Yin-Yin (Resonant Cultivation)

Two Yin-aligned partners. Their qi pools rather than tempers — cold deepening into colder. The result is *exceptional refinement* — far superior to Yin-Yang or Yang-Yang for crafting subtle techniques, deep Insight, and pure-Yin treasures — but the risk is *qi solidification* (Yin qi crystallizing in meridians, lifespan stasis, possible coma).

**Partner Requirements:**
- Both partners Yin-aligned
- Compatibility Score ≥ +2
- At least one partner has Water, Ice, Death, Karma, Restriction, or another high-Yin Dao at Initiate or higher
- A pure-Yin location helps (Cold Core formation site, ancient tomb, lunar formation) — adds +2 to the roll if available

**Roll Target:** 8 successes per Seclusion slot

**Benefits on full success:**

| Realm | Benefit |
|---|---|
| Qi Condensation – Foundation Establishment | +100% Insight gain on shared Dao; both partners may form a Cold Core early (permanent +1 qi pool slot tied to Yin alignment); +1 sub-stage progress |
| Core Formation – Nascent Soul | Above + permanent +2 dice on subtle techniques (Restrictions, Stealth, Soul-source perception, Karma-thread reading) |
| Soul Formation – Ascendant | Above + may attempt to detect or refine one of the four canonical Extreme Yin types (Earth, Xuan, Huang, Heavenly) — see §36 |
| Illusionary Yin / Corporeal Yang transition | Excellent for the Illusionary Yin half; should be paired with Yin-Yang or Yang-Yang for the Corporeal Yang half |
| Nirvana | Above + may condense a Yin-aligned Essence; Restriction, Karma, Time, and Death Essences all favor this path |

**Risk profile:** *High but different from Yang-Yang.*

| Outcome | Result |
|---|---|
| Marginal success | Both partners must roll Soul + Soul Realm vs. 6 successes or enter a 1-week Yin Stupor — cultivation continues but the partners are unresponsive to outside stimuli |
| Failure | As marginal, but Yin Stupor extends to 1 month; one partner gains a Heart Demon (Detachment, Apathy, or Obsession) |
| Catastrophic failure | Both partners enter Yin Coma — cultivation regression of one sub-stage and a coma lasting 1 to 12 months. The Coma can be ended early by external aid (a Yang-aligned senior cultivator, a pill of Pure Yang, a tribulation forced by Heaven). Without aid, one partner risks death — roll Body + Body Realm vs. 12 or perish in the cold. |

**Karma cost:** none directly, but Yin-Yin cultivation *attracts* — the cold qi signature draws beings of the Yin realm (corpse-spirits, Yin demons, Cold Soul wraiths). Each session has a 1-in-6 chance of a hostile encounter during or shortly after.

**Narrative weight:** the path of hidden masters. Restriction Grandmasters, soul-cultivators, formation specialists, and certain Demonic Heart practitioners favor this pairing. Cold, methodical, dangerous to outsiders. The pairing of secrets.

---

## 35. Risks, Bonds, and Severance

### Failed Pairings

A failed dual cultivation session is more than a wasted Seclusion. The specific risks vary by pairing (see §34), but two general consequences apply:

1. **Compatibility damage.** A failed pairing reduces the Compatibility Score between the two partners by 1, permanently. Repeated failures eventually make the pairing impossible.
2. **Heart Demon vulnerability.** For 1 month after any failed dual cultivation, both partners suffer −2 dice on Heart Demon checks. A Heart Demon manifesting in this window often takes the form of *the partner themselves* — paranoia, jealousy, doubt, possessiveness.

### The Dao Companion Bond

Forming a Dao Companion bond is a deliberate ritual, not a state that emerges automatically from dual cultivation. Requirements:

- At least 3 successful dual cultivation sessions together
- Both partners willingly oath-bind in front of either a senior Dao Companion couple or a recognized authority (sect master, ancestor, divine treasure)
- Both partners commit 1 sub-stage of cultivation Insight as the binding cost (paid out of current banked Insight; this is canonically why some couples wait until their cultivation is more advanced — the cost stings less)

Once bonded, the partners gain (per §32):
- Shared Karma (1 per 3 earned)
- Pooled lifespan capacity (transferable in ritual)
- Shared Heart Demon vulnerability (both check together)
- Compatibility Score +2 (cumulative with other modifiers)
- A passive *Resonance* — they always know the other's general status and emotional state regardless of distance (within the same world; cross-world resonance requires a treasure)

### Bond Severance

Severing a Dao Companion bond is one of the most damaging events in cultivation. It can be triggered by:

- **Mutual dissolution** (both consent, formal ritual): least painful. Loss of 1 sub-stage cultivation each, loss of all bond-shared benefits. Karma sharing ends. May happen no more than once per cultivator per lifetime.
- **Unilateral severance** (one partner forces the bond's end): catastrophic for the abandoned partner. They suffer regression of 2 sub-stages, 1d20 years of lifespan, and a permanent Heart Demon. The severing partner gains 1 Black Karma per realm tier of the abandoned.
- **Death of one partner:** the surviving partner suffers regression of 1 sub-stage and gains a permanent Heart Demon (Grief, Vengeance, or Obsession). White Karma may be earned through extraordinary mourning rituals (e.g., a Cultivation Arc dedicated to the lost partner's resurrection or memorial).
- **Betrayal severance** (one partner harms the other): both suffer regression; the betraying partner gains massive Black Karma (1d6+1 Black Karma) and is hunted by Heaven's Tribulation early.

### Coerced Dual Cultivation (Forbidden)

Dual cultivation against a partner's will is canonically Demonic and Forbidden. The aggressor:

- Gains the dual cultivation benefits but at half value
- Gains 3 Black Karma per session
- Gains a permanent Karmic Brand visible to any cultivator with Karma Dao at Adept+
- Becomes a legitimate target for Orthodox sect cultivators of Soul Formation+ (this is canon — Wang Lin specifically hunts such practitioners during his Slaughter Dao arc)

The victim:
- Gains White Karma proportional to the loss
- Suffers regression of 1 sub-stage
- May, through narrative work, eventually leverage the karmic bond into a counter-attack ("Karma comes due")

---

## 36. Canonical Resources & Mechanics

### Yin Energy Detection (Xian Ni canon)

A Mysterious-tier Utility-Perception technique Wang Lin learns from Situ Nan that detects pure Yin or pure Yang energy concentrations within 50km. Used to find ideal cultivation sites for Yin-Yin or Yang-Yang resonance pairings. Statted out, this is:

- **Source:** Soul | **Type:** Utility (Perception)
- **Tier:** Mysterious | **Qi:** 5
- **Effect:** Detect Yin/Yang concentrations within 50km. Reveals approximate purity grade. Cannot detect cultivators directly — only ambient or environmental energy.

### The Four Extreme Yin Types

Canonically, there are four levels of Extreme Yin cultivation resource — **Earth Yin, Xuan Yin, Huang Yin, Heavenly Yin** — each with four levels and ten grades within. Combined into Heavenly Yin via specialized refinement. Yin-Yin dual cultivators may pursue these as cultivation resources; obtaining one is a campaign-level objective.

Mechanically, exposure to a high-grade Extreme Yin source during a Yin-Yin session adds significant dice (Earth +2, Xuan +4, Huang +6, Heavenly +10) and allows cultivation through bottlenecks that would otherwise require breakthrough rolls.

The corresponding **Extreme Yang** types exist symmetrically: Earth Yang, Xuan Yang, Huang Yang, Heavenly Yang. These are rarer in canon but mechanically equivalent for Yang-Yang sessions.

### Cold Core Formation

A Yin-Yin practitioner at Foundation Establishment may form a **Cold Core** instead of a standard Foundation. Mechanical effect:
- +1 qi pool slot (permanent)
- −1 qi cost on all Yin-aligned techniques
- +2 dice on Restriction-form techniques
- Requires: completion of at least one Yin-Yin Cultivation Arc at a high-Yin location, plus successful Foundation Establishment breakthrough during or immediately after the session

A Cold Core cannot be undone except by a full cultivation reset. It is canonically Wang Lin's Foundation form via the Underworld Ascension Method.

### Pure Yin / Pure Yang Bodies

A character may be born with a **Pure Yin Body** or **Pure Yang Body** — an extremely rare Heavenly Body (per Cultivation Framework §1.5). Effects:

- Compatibility +3 in dual cultivation sessions where they are the matching pole
- Cultivation speed in their aligned half (+50% on aligned Seclusion)
- Dramatic vulnerability when alone — without pairing, cultivation slows to half normal speed at higher realms (canonically, this is why Pure-Body cultivators are so eagerly sought as Dao Companions)

This is a Heavenly Body, not a Method. A Pure Yang cultivator using a Body Method is mechanically distinct from a Pure Yang cultivator using an Orthodox Method.

---

## 37. Quick-Reference Dual Cultivation Sheet

```
STEP 1 — IDENTIFY PAIRING TYPE
  □ Yin-Yang (balanced; safest, slowest)
  □ Yang-Yang (resonant; fast, fiery, risky)
  □ Yin-Yin (resonant; deep, cold, dangerous)

STEP 2 — CALCULATE COMPATIBILITY
  Method category:           ___
  Realm tier difference:     ___
  Shared Daos:               ___
  Conflicting Daos:          ___
  Pure Body present:         ___
  Dao Companion bond:        ___
  Romantic bond:             ___
  TOTAL Compatibility Score: ___

  □ Score ≥ +2: full pairing eligible
  □ Score 0 to +1: Yin-Yang only
  □ Score −4 to −1: not advisable; external aid needed
  □ Score ≤ −5: impossible without artifact/formation

STEP 3 — DETERMINE TARGET
  □ Yin-Yang: 6 successes per Seclusion slot
  □ Yang-Yang: 8 successes per Seclusion slot
  □ Yin-Yin: 8 successes per Seclusion slot

STEP 4 — DICE POOL
  Lower partner's (Qi Realm Tier + Soul Realm Tier) + Compatibility Score
  + situational modifiers (location, treasures, pills)

STEP 5 — RESOLVE
  Full success:    apply pairing benefits per §34
  Marginal:        halved benefits; risk roll
  Failure:         no progress; Compatibility −1
  Catastrophic:    Qi Deviation; pairing-specific consequences

STEP 6 — TRACK PERSISTENT EFFECTS
  □ Pairing risk effects (lifespan burn, Yin Stupor, etc.)
  □ Karma adjustments
  □ Compatibility Score change
  □ Insight gain or loss
  □ Heart Demon manifestations
```

---

*End of Techniques Framework. Pair this document with the main Cultivation Framework (§1.4 Affiliation, §1.5 Heavenly Bodies, §7.7 Technique Lifecycle) and the Treasures Framework for full context.*
