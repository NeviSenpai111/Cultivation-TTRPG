"""
Cultivator's Ledger — Campaign Companion server.

Tiny Flask app that serves the static frontend and persists the entire
ledger to a single JSON file on disk. No DB, no auth — designed for a
single GM (or a small table on a LAN) who wants their data to live as a
file they can back up, share, or version-control.

Run:
    python server.py                # default http://127.0.0.1:5050
    python server.py --port 5000    # custom port
    python server.py --host 0.0.0.0 # expose on LAN so players can connect
"""

from __future__ import annotations

import argparse
import json
import os
import sys
import threading
from pathlib import Path

try:
    from flask import Flask, jsonify, request, send_from_directory
except ImportError:
    sys.stderr.write(
        "\n[!] Flask is not installed.\n"
        "    Install with:  pip install -r requirements.txt\n\n"
    )
    sys.exit(1)


ROOT = Path(__file__).resolve().parent
STATIC_DIR = ROOT / "static"
DATA_FILE = ROOT / "data" / "ledger.json"

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
    for key in ("techniques", "methods", "items", "treasures"):
        payload["library"].setdefault(key, [])
    payload.setdefault("characters", [])
    payload.setdefault("meta", {"mode": "gm"})
    payload.setdefault("version", 2)
    return payload


app = Flask(__name__, static_folder=str(STATIC_DIR), static_url_path="")


@app.route("/")
def index():
    return send_from_directory(str(STATIC_DIR), "index.html")


@app.route("/api/data", methods=["GET"])
def get_data():
    return jsonify(_migrate(_load()))


@app.route("/api/data", methods=["PUT"])
def put_data():
    payload = request.get_json(force=True, silent=True)
    if not isinstance(payload, dict):
        return jsonify({"ok": False, "error": "payload must be an object"}), 400
    _save(_migrate(payload))
    return jsonify({"ok": True})


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "data_file": str(DATA_FILE)})


def main() -> None:
    parser = argparse.ArgumentParser(description="Cultivator's Ledger server")
    parser.add_argument("--host", default="127.0.0.1",
                        help="Bind host (use 0.0.0.0 to share on LAN)")
    parser.add_argument("--port", type=int, default=5050)
    parser.add_argument("--debug", action="store_true")
    args = parser.parse_args()

    _ensure_data_file()
    print()
    print(f"  Cultivator's Ledger")
    print(f"  ───────────────────")
    print(f"  Open in browser:  http://{args.host if args.host != '0.0.0.0' else 'localhost'}:{args.port}/")
    print(f"  Data file:        {DATA_FILE}")
    if args.host == "0.0.0.0":
        print(f"  LAN sharing:      ON  (other devices on your network can connect)")
    print()
    app.run(host=args.host, port=args.port, debug=args.debug)


if __name__ == "__main__":
    main()
