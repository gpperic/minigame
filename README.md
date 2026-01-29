# Mini Game (FunFern)

Static mini-games with Firebase Analytics initialized at runtime via Firebase Hosting reserved URL.

## Requirements
- Firebase CLI
- A Firebase project with Hosting enabled

## Local development
Firebase Hosting provides `/__/firebase/init.json`. To load config at runtime, run via Hosting (or its emulator).

```bash
firebase login
firebase use --add
firebase emulators:start --only hosting
```

Then open:
```
http://localhost:5000
```

Note: Opening `index.html` directly from the filesystem will skip Analytics because the reserved URL is not available.

## Deploy
```bash
firebase deploy --only hosting
```

## Project files
- `index.html`: home page
- `minesweeper.html`: game
- `firebase-config.js`: loads `/__/firebase/init.json` at runtime and initializes Analytics
