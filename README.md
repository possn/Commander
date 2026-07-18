# Strategos v0.4.0 — Foundation

First implementation of Milestone M1 / Sprint 4.1.

## Included
- Mandatory four-step onboarding
- First persistent Human Model
- User Manifesto and commitment
- Frozen navigation: Today, Journal, Academy, Profile
- Settings for voice, sound, haptics and Wake Lock
- Offline/local-first state storage
- Consult → Commit → Practice → Reflect → Learn loop
- Terminology changed from Mission to Practice in the interface

## Run
Serve the folder over HTTP (ES modules do not run reliably from `file://`).

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.
