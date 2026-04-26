# Cultivator's Ledger — Campaign Companion

A real local program (not a single HTML file) for running the Cultivation TTRPG
campaign — character sheets for players, plus a GM-facing library with full
**point-budget creators** for techniques (PP) and treasures (TP) per the
Techniques & Treasures Frameworks.

## What's inside

```
cultivation_app/
├── server.py            # Flask backend; serves the UI + a tiny REST API
├── requirements.txt     # just Flask
├── run.bat / run.sh     # one-click launchers (set up venv, install, run)
├── data/
│   └── ledger.json      # the entire campaign — back this up
└── static/
    ├── index.html
    ├── styles.css
    └── js/              # ES modules
        ├── main.js
        ├── api.js       # talks to the backend
        ├── domain.js    # constants & formulas (realms, tiers, PP/TP menus)
        ├── ui.js        # h(), dialog, fields, notice
        ├── views.js     # Home, Library, Characters, Character editor, Data
        └── editors.js   # PP-budget Technique creator, TP-budget Treasure creator, etc.
```

## Running

### Windows (one-click)
Double-click `run.bat`. First run sets up a virtualenv and installs Flask; later
runs just start the server. Open the URL it prints (default
`http://localhost:5050/`).

### macOS / Linux
```bash
chmod +x run.sh
./run.sh
```

### Manual
```bash
python -m venv .venv
source .venv/bin/activate         # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
python server.py
```

### Sharing with players over LAN
On the GM's machine, run with:
```bash
python server.py --host 0.0.0.0
```
Players on the same network open `http://<gm-ip>:5050/`. Everyone shares the
same library and character roster — no JSON ferrying required.

#### Roles when sharing
- **GM** — has the password; can edit anything (library, characters, import/erase).
- **Player** — claims one character on first connect; can only edit that character.
- **Anonymous** (not signed in) — read-only view of everything.

The server prints a freshly-generated GM password on each launch:
```
GM password:      hVZpQz1k    (auto-generated for this run)
```
To set a stable password instead, export `LEDGER_GM_PASSWORD` before starting:
```bash
LEDGER_GM_PASSWORD='your-passphrase' python server.py --host 0.0.0.0
```
On Windows:
```bat
set LEDGER_GM_PASSWORD=your-passphrase
python server.py --host 0.0.0.0
```

Players sign in by clicking **Sign in** in the sidebar and picking their
character from the list. Sessions are kept in a cookie. The server holds
sessions in memory only — restarting the server signs everyone out, and
they sign back in.

This is a UX guardrail so players can't accidentally rewrite the bestiary,
not security against a hostile actor on your network.

## Migrating from the single-file `cultivation_app.html`

1. Open `cultivation_app.html` (the old one in the parent folder) in your browser.
2. Go to **Data → Export Everything**.
3. In the new app, go to **Data → Import** and pick that JSON file.

Library entries with the same id are updated; characters always import as new
copies (so reimporting twice doesn't overwrite, it duplicates).

## What the new editors do

### Technique Creator (PP-budget)
Per the Techniques Framework:
- Pick **tier** (Spirit/Mysterious/Celestial/Void/Nirvana) — sets PP budget and special-prop slots.
- Pick **source** (Body/Qi/Soul), **type**, **range**, **action**.
- Add **effects** from the Effect Cost Menu (live PP tally vs budget).
- Add **special properties** (slot-based — Piercing, Domain-Form, Essence-Linked, etc.).
- Add **restrictions** for PP refunds (capped at 50% of tier budget).
- Choose a **mastery scaling recipe** (Cost / Power / Reach / Cascade / Depth) and write Proficient/Mastered/Perfected text.

### Treasure Creator (TP-budget)
Per the Treasures Framework:
- Pick **tier** (sets TP budget + ability slot count) and **quality** sub-rank.
- Pick **category** (Weapon, Defensive, Soul, etc.) — sword-shape Weapons get Sword Soaring native.
- Add **abilities** (passive/active) from the Ability Cost Menu.
- Set **binding**, **realm requirement**, and **origin**.
- At Celestial+: **Sentience** (temperament/preference/aversion/voice) and **Dao-Linkage** become mandatory; the editor warns you.
- Optional **Sword Spirit** sheet (occupies a slot, costs 0 TP) — name, realm, Sword Dao rank, techniques, Favor 0–10, origin tie.
- Add **restrictions** for TP refunds.
- Define an **evolution hook** (trigger/threshold/effect).

Both creators show a live PP/TP tally so you know whether you're inside budget.

## Backups

The whole campaign is `data/ledger.json`. Copy it, version it in git, sync it
through Dropbox — anything that copies a file works. The frontend's **Data**
tab also has Export/Import for sharing slices (library only, characters only,
single character).
