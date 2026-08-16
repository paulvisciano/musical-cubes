# Musical Cubes

> Part of **[Sci-Fi Labs](https://github.com/paulvisciano)** — spatial apps for web, mobile, and XR.  
> [Where is Paul?](https://paulvisciano.github.io/) · [Knowledge Graph](https://github.com/paulvisciano/knowledge-graph) · [Musical Cubes](https://musical-cubes.vercel.app)

An interactive music production app where tracks live as rotating 3D cubes — each face is an instrument stem you can play, loop, and sync in real time. Built as a cross-platform PWA and native app, it turns music making into something tactile and visual rather than a timeline-and-tracks DAW.

A Sci-Fi app: 3D instruments designed to feel native on the web and on mobile, with spatial interaction as the foundation for immersive environments.

Musical Cubes is the cube instrument UI itself. It was originally developed as part of Musical Realms, an earlier prototype exploring chakra-inspired sonic worlds — the cube component was extracted and refined into this standalone project.

**Live demo:** [musical-cubes.vercel.app](https://musical-cubes.vercel.app)

---

## What it is

- **3D cube instruments** — Each track is a Swiper cube with a face for every stem (piano, keys, brass, vocal, bass, guitar, drums). Rotate the cube to switch instruments; each face has its own WaveSurfer waveform you can click to play, loop, and scrub.
- **Sync across faces** — All stems in a cube share a playhead position, so you can layer instruments and they stay in time. Toggle sync off to free a face into its own independent loop.
- **Track discovery** — A Node script (`scripts/discoverTracks.js`) walks `public/assets/sounds/musicalCube/tracks/` at build time, auto-generating a typed track registry so new packs just work — drop a folder of WAVs in, run `npm start`, and it appears in the picker.
- **Cross-platform** — Ionic + Capacitor means the same codebase runs as a web app, a deployable PWA (GitHub Pages), and a native iOS/Android app with haptics and status-bar integration.

The goal is a music tool that feels like playing with sound, not operating software.

---

## Architecture (high level)

| Layer | What runs |
|-------|-----------|
| **UI framework** | Ionic React + React Router (mobile-first component library) |
| **Cube engine** | Swiper.js with `EffectCube` — 3D rotating cube with per-slide navigation |
| **Audio engine** | WaveSurfer for waveforms/playback, `use-sound` + `redux-sounds` for sample triggering |
| **State** | Redux Toolkit (`instrumentSlice`, `backgroundTrackSlice`) |
| **Track discovery** | `scripts/discoverTracks.js` — Node script that scans the sounds directory and emits a typed `tracks.ts` |
| **Mobile** | Capacitor (haptics, status bar, app lifecycle) |
| **PWA** | Workbox service worker (precache, background sync, offline) |
| **Deploy** | `gh-pages` from `build/` with `--nojekyll` |

---

## Getting started

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm**

### Install & run

```bash
# clone
git clone https://github.com/paulvisciano/musical-cubes.git
cd musical-cubes

# install dependencies
npm install

# start dev server (auto-discovers tracks first via prestart hook)
npm start
```

The app opens at `http://localhost:3000`. The `prestart` hook runs `node scripts/discoverTracks.js`, which scans `public/assets/sounds/musicalCube/tracks/` and generates `src/pages/realms/musicalCubes/tracks.ts`.

### Build & deploy

```bash
# production build
npm run build

# deploy to GitHub Pages
npm run deploy
```

---

## Project structure

```
musical-cubes/
├── public/
│   └── assets/
│       ├── icon/              # App + instrument icons
│       └── sounds/
│           └── musicalCube/
│               └── tracks/    # Track packs (each folder = one track)
│                   ├── Best Feelings/
│                   │   ├── melody/    # Looping stems
│                   │   └── one_shots/ # Trigger samples
│                   ├── Daydreamer/
│                   └── I can be, so dangerous/
├── scripts/
│   └── discoverTracks.js     # Auto-generates tracks.ts from sound files
├── src/
│   ├── components/
│   │   ├── musicalCube/      # Cube instrument (cube, sides, toolbar, picker)
│   │   ├── backgroundTracks/ # Ambient mixer side menu
│   │   ├── notesVisualizer/  # Note visualization
│   │   └── soundPlayer/       # Core sound playback
│   ├── pages/
│   │   └── realms/           # Realm shell (from Musical Realms prototype)
│   │       └── musicalCubes/ # Main cube realm
│   ├── instruments/          # Instrument detection & mapping
│   ├── store/                # Redux (instrument + background track slices)
│   └── theme/                # Global styles
├── capacitor.config.ts       # Native mobile config
└── package.json
```

---

## Adding a track

1. Create a folder under `public/assets/sounds/musicalCube/tracks/<Your Track Name>/`
2. Add subfolders for `melody/` (looping stems) and optionally `one_shots/` (triggered samples)
3. Drop in `.wav` files
4. Run `npm start` — `discoverTracks.js` will pick them up automatically and they'll appear in the track picker

---

## Tech stack

- **React 18** + **Ionic React 8** + **React Router 5**
- **Swiper 11** (cube effect, navigation, mousewheel)
- **WaveSurfer** (waveform rendering, audio playback, scrubbing)
- **Redux Toolkit** + **redux-sounds** + **use-sound** (audio state management)
- **Capacitor 5** (native mobile: haptics, status bar, app lifecycle)
- **Workbox** (PWA: service worker, precaching, offline support)
- **TypeScript 4**
- **gh-pages** (deployment)

---

## Topics

`music` · `music-production` · `sci-fi-labs`

---

**Built by** [Paul Visciano](https://paulvisciano.vercel.app/) · **Sci-Fi Labs**
