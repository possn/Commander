# Strategos v0.3 — Birth of Strategos

**Know yourself. Improve deliberately.**

First functional release of the OneArete Human Decision System.

## Included

- Observe → Evaluate → Explain → Commit → Execute → Reflect
- Rule-based, auditable decision engine
- Strength, recovery, focus, walking, and connection missions
- Decision confidence and rejected alternatives
- Delta vector and lifetime Delta
- Strategic Timeline
- Local persistence and offline PWA support
- Mobile-first OneArete visual system

## Run locally

Because ES modules and the service worker require HTTP, do not open `index.html` directly.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages

Upload the **contents** of this directory to the repository root. In GitHub:

1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main`
4. Folder: `/ (root)`

## Architecture

- `src/core/engine.js` — Strategos Decision Engine
- `src/data/codex.js` — structured mission knowledge
- `src/core/storage.js` — local state and Mnemosyne seed
- `src/app.js` — product flow and interface orchestration

No external dependencies are required.
