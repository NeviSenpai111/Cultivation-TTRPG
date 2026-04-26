"""
Cultivator's Ledger — Campaign Companion server.

Tiny Flask app that serves the static frontend and persists the entire
ledger to a single JSON file on disk. Designed for a single GM (or a small
table on a LAN) who wants their data to live as a file they can back up,
share, or version-control.

When sharing on a LAN the server also enforces a soft role split:
    GM         — has the password; can edit anything.
    Player     — has claimed one character; can only edit that character.
    Anonymous  — read-only.

This is a UX guardrail (so players don't accidentally rewrite the bestiary),
not security against a hostile actor on your LAN.

Run:
    python server.py                     # http://127.0.0.1:5050
    python server.py --port 5000
    python server.py --host 0.0.0.0      # share on LAN
    LEDGER_GM_PASSWORD=hunter2 python server.py    # set GM password
"""

from __future__ import annotations

import argparse
import json
import os
import secrets
import sys
import threading
from pathlib import Path

try:
    from flask import Flask, abort, jsonify, request, send_from_directory
except ImportError:
    sys.stderr.write(
        "\n[!] Flask is not installed.\n"
        "    Install with:  pip install -r requirements.txt\n\n"
    )
    sys.exit(1)


ROOT = Path(__file__).resolve().parent
STATIC_DIR = ROOT / "static"
DATA_FILE = ROOT / "data" / "ledger.json"
LIBRARY_KINDS = ("techniques", "treasures", "methods", "items")
SESSION_COOKIE = "ledger_session"

DEFAULT_DATA = {
    "version": 2,
    "meta": {"mode": "gm"},
    "library": {
        "techniques": [],
        "methods": [],
        "items": [],
        "treasures": [],
    },
    "characters": [],
}

_lock = threading.Lock()

# token -> {"role": "gm"} or {"role": "player", "character_id": "..."}
# In-memory only — restarting the server logs everyone out, which is fine
# for a campaign companion.
_sessions: dict[str, dict] = {}

GM_PASSWORD: str = ""
_password_was_generated: bool = False


# ---------------------------------------------------------------------------
# Disk I/O
# ---------------------------------------------------------------------------

def _ensure_data_file() -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    if not DATA_FILE.exists():
        DATA_FILE.write_text(
            json.dumps(DEFAULT_DATA, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )


def _load() -> dict:
    _ensure_data_file()
    with _lock:
        try:
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            backup = DATA_FILE.with_suffix(".corrupt.json")
            DATA_FILE.replace(backup)
            sys.stderr.write(f"[!] ledger.json was corrupt; moved to {backup.name}\n")
            DATA_FILE.write_text(
                json.dumps(DEFAULT_DATA, indent=2, ensure_ascii=False),
                encoding="utf-8",
            )
            return json.loads(DATA_FILE.read_text(encoding="utf-8"))


def _save(payload: dict) -> None:
    with _lock:
        # Atomic-ish write so a crash mid-save doesn't nuke everything.
        tmp = DATA_FILE.with_suffix(".tmp")
        tmp.write_text(
            json.dumps(payload, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )
        tmp.replace(DATA_FILE)


def _migrate(payload: dict) -> dict:
    """Backfill any newly-introduced top-level keys so older saves keep working."""
    if "library" not in payload or not isinstance(payload["library"], dict):
        payload["library"] = {}
    for key in LIBRARY_KINDS:
        payload["library"].setdefault(key, [])
    payload.setdefault("characters", [])
    payload.setdefault("meta", {"mode": "gm"})
    payload.setdefault("version", 2)
    return payload


# ---------------------------------------------------------------------------
# Session helpers
# ---------------------------------------------------------------------------

def _current_session() -> dict | None:
    token = request.cookies.get(SESSION_COOKIE)
    if not token:
        return None
    return _sessions.get(token)


def _is_gm() -> bool:
    s = _current_session()
    return bool(s and s.get("role") == "gm")


def _player_character_id() -> str | None:
    s = _current_session()
    if not s or s.get("role") != "player":
        return None
    return s.get("character_id")


def _new_token() -> str:
    return secrets.token_urlsafe(32)


def _attach_session_cookie(response, token: str):
    # httponly so a stray <script> can't read it; samesite=Lax is fine for a
    # same-origin app served by Flask itself.
    response.set_cookie(SESSION_COOKIE, token, httponly=True, samesite="Lax")
    return response


def _public_session_view(s: dict | None) -> dict:
    if not s:
        return {"role": "anonymous"}
    out = {"role": s.get("role")}
    if s.get("role") == "player":
        out["character_id"] = s.get("character_id")
    return out


# ---------------------------------------------------------------------------
# Flask app
# ---------------------------------------------------------------------------

app = Flask(__name__, static_folder=str(STATIC_DIR), static_url_path="")


@app.route("/")
def index():
    return send_from_directory(str(STATIC_DIR), "index.html")


# ---- Auth ------------------------------------------------------------------

@app.route("/api/session", methods=["GET"])
def get_session():
    return jsonify(_public_session_view(_current_session()))


@app.route("/api/login", methods=["POST"])
def login():
    payload = request.get_json(force=True, silent=True) or {}
    if not isinstance(payload, dict) or payload.get("password") != GM_PASSWORD:
        return jsonify({"ok": False, "error": "wrong password"}), 401
    token = _new_token()
    _sessions[token] = {"role": "gm"}
    resp = jsonify({"ok": True, "role": "gm"})
    return _attach_session_cookie(resp, token)


@app.route("/api/logout", methods=["POST"])
def logout():
    token = request.cookies.get(SESSION_COOKIE)
    if token:
        _sessions.pop(token, None)
    resp = jsonify({"ok": True})
    resp.delete_cookie(SESSION_COOKIE)
    return resp


@app.route("/api/claim", methods=["POST"])
def claim_character():
    payload = request.get_json(force=True, silent=True) or {}
    char_id = payload.get("character_id") if isinstance(payload, dict) else None
    if not char_id:
        return jsonify({"ok": False, "error": "character_id required"}), 400
    data = _migrate(_load())
    if not any(c.get("id") == char_id for c in data["characters"]):
        return jsonify({"ok": False, "error": "no such character"}), 404
    token = _new_token()
    _sessions[token] = {"role": "player", "character_id": char_id}
    resp = jsonify({"ok": True, "role": "player", "character_id": char_id})
    return _attach_session_cookie(resp, token)


# ---- Reads (everyone) ------------------------------------------------------

@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(_migrate(_load()))


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "data_file": str(DATA_FILE)})


# ---- Bulk PUT (GM only — used by Import / Erase) --------------------------

@app.route("/api/data", methods=["PUT"])
def put_data():
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict):
        return jsonify({"ok": False, "error": "payload must be an object"}), 400
    _save(_migrate(payload))
    return jsonify({"ok": True})


# ---- Library (GM only) -----------------------------------------------------

def _require_kind(kind: str):
    if kind not in LIBRARY_KINDS:
        abort(404)


@app.route("/api/library/<kind>", methods=["POST"])
def create_library_entry(kind):
    _require_kind(kind)
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict) or not payload.get("id"):
        return jsonify({"ok": False, "error": "id required"}), 400
    data = _migrate(_load())
    if any(e.get("id") == payload["id"] for e in data["library"][kind]):
        return jsonify({"ok": False, "error": "id already exists"}), 409
    data["library"][kind].append(payload)
    _save(data)
    return jsonify({"ok": True})


@app.route("/api/library/<kind>/<entry_id>", methods=["PUT"])
def update_library_entry(kind, entry_id):
    _require_kind(kind)
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict):
        return jsonify({"ok": False, "error": "payload must be an object"}), 400
    payload["id"] = entry_id
    data = _migrate(_load())
    idx = next(
        (i for i, e in enumerate(data["library"][kind]) if e.get("id") == entry_id),
        -1,
    )
    if idx >= 0:
        data["library"][kind][idx] = payload
    else:
        data["library"][kind].append(payload)
    _save(data)
    return jsonify({"ok": True})


@app.route("/api/library/<kind>/<entry_id>", methods=["DELETE"])
def delete_library_entry(kind, entry_id):
    _require_kind(kind)
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    data = _migrate(_load())
    data["library"][kind] = [
        e for e in data["library"][kind] if e.get("id") != entry_id
    ]
    _save(data)
    return jsonify({"ok": True})


# ---- Characters ------------------------------------------------------------

@app.route("/api/characters", methods=["POST"])
def create_character():
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict) or not payload.get("id"):
        return jsonify({"ok": False, "error": "id required"}), 400
    data = _migrate(_load())
    if any(c.get("id") == payload["id"] for c in data["characters"]):
        return jsonify({"ok": False, "error": "id already exists"}), 409
    data["characters"].append(payload)
    _save(data)
    return jsonify({"ok": True})


@app.route("/api/characters/<char_id>", methods=["PUT"])
def update_character(char_id):
    sess = _current_session()
    if not sess:
        return jsonify({"ok": False, "error": "not signed in"}), 403
    role = sess.get("role")
    if role != "gm" and not (role == "player" and sess.get("character_id") == char_id):
        return jsonify({"ok": False, "error": "you can only edit your own character"}), 403
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict):
        return jsonify({"ok": False, "error": "payload must be an object"}), 400
    payload["id"] = char_id
    data = _migrate(_load())
    idx = next(
        (i for i, c in enumerate(data["characters"]) if c.get("id") == char_id),
        -1,
    )
    if idx >= 0:
        data["characters"][idx] = payload
    else:
        if role != "gm":
            return jsonify({"ok": False, "error": "GM only"}), 403
        data["characters"].append(payload)
    _save(data)
    return jsonify({"ok": True})


@app.route("/api/characters/<char_id>", methods=["DELETE"])
def delete_character(char_id):
    if not _is_gm():
        return jsonify({"ok": False, "error": "GM only"}), 403
    data = _migrate(_load())
    data["characters"] = [c for c in data["characters"] if c.get("id") != char_id]
    _save(data)
    return jsonify({"ok": True})


# ---------------------------------------------------------------------------
# Bootstrap
# ---------------------------------------------------------------------------

def _resolve_password() -> None:
    global GM_PASSWORD, _password_was_generated
    env = os.environ.get("LEDGER_GM_PASSWORD")
    if env:
        GM_PASSWORD = env
        _password_was_generated = False
    else:
        GM_PASSWORD = secrets.token_urlsafe(8)
        _password_was_generated = True


def main() -> None:
    parser = argparse.ArgumentParser(description="Cultivator's Ledger server")
    parser.add_argument("--host", default="127.0.0.1",
                        help="Bind host (use 0.0.0.0 to share on LAN)")
    parser.add_argument("--port", type=int, default=5050)
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    _ensure_data_file()
    _resolve_password()
    print()
    print(f"  Cultivator's Ledger")
    print(f"  ───────────────────")
    print(f"  Open in browser:  http://{args.host if args.host != '0.0.0.0' else 'localhost'}:{args.port}/")
    print(f"  Data file:        {DATA_FILE}")
    if _password_was_generated:
        print(f"  GM password:      {GM_PASSWORD}    (auto-generated for this run)")
        print(f"                    Set LEDGER_GM_PASSWORD to make it persistent.")
    else:
        print(f"  GM password:      (from LEDGER_GM_PASSWORD)")
    if args.host == "0.0.0.0":
        print(f"  LAN sharing:      ON  (other devices on your network can connect)")
        print(f"                    Players claim a character; only the GM can edit the library.")
    print()
    app.run(host=args.host, port=args.port, debug=args.debug)


if __name__ == "__main__":
    main()
