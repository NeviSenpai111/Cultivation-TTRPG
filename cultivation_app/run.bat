@echo off
REM One-click launcher for Windows.
REM First run installs dependencies; subsequent runs just start the server.

cd /d "%~dp0"

where python >nul 2>nul
if errorlevel 1 (
  echo Python is not installed or not on PATH.
  echo Install Python 3.10+ from https://www.python.org/downloads/ and re-run this script.
  pause
  exit /b 1
)

if not exist ".venv\" (
  echo [setup] Creating virtual environment...
  python -m venv .venv
  call .venv\Scripts\activate.bat
  echo [setup] Installing Flask...
  pip install -r requirements.txt
) else (
  call .venv\Scripts\activate.bat
)

python server.py
