"""Fail if deployable text or ad imports contain the prohibited academy domain."""
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SUFFIXES = {".html", ".htm", ".js", ".mjs", ".ts", ".tsx", ".jsx", ".json", ".csv", ".xml", ".txt", ".css", ".svg"}
forbidden = re.compile(r"(?:[a-z0-9-]+\.)*chanakacademy\.org", re.I)
failures = []
for path in ROOT.rglob("*"):
    if any(p in {".git", "node_modules"} for p in path.parts) or path.suffix.lower() not in SUFFIXES or not path.is_file():
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    for n, line in enumerate(text.splitlines(), 1):
        if forbidden.search(line):
            failures.append(f"{path.relative_to(ROOT)}:{n}")
if failures:
    print("FAIL: prohibited academy domain in deployable files or ad imports:\n" + "\n".join(failures))
    sys.exit(1)
print("PASS: no prohibited academy domains in deployable files or ad imports")
