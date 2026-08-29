# Musical Cubes

<p align="center">
  <img src="https://pub-9466bb5132e74aeba333004ad0c21f21.r2.dev/musical-cubes/musical-cubes-phone-mockup.jpg" alt="Musical Cubes on iPhone — Best Feelings track" width="320" />
</p>

> Part of **[Sci-Fi Labs](https://github.com/paulvisciano)** — spatial web apps.  
> [Where is Paul?](https://paulvisciano.com/apps/where-is-paul/) · [Musical Cubes](https://paulvisciano.com/apps/musical-cubes) · [Neuro Graph](https://paulvisciano.com/apps/neuro-graph)

A spatial web app: tracks live as rotating 3D cubes — each face is an instrument stem you can play, loop, and sync in real time. Same URL on web and phone.

Musical Cubes is the cube instrument UI itself. It was originally developed as part of Musical Realms, an earlier prototype exploring chakra-inspired sonic worlds — the cube component was extracted and refined into this standalone project.

**Live:** [paulvisciano.com/apps/musical-cubes](https://paulvisciano.com/apps/musical-cubes)

---

## What it is

- **3D cube instruments** — Each track is a Swiper cube with a face for every stem (piano, keys, brass, vocal, bass, guitar, drums). Rotate the cube to switch instruments; each face has its own WaveSurfer waveform you can click to play, loop, and scrub.
- **Sync across faces** — All stems in a cube share a playhead position, so you can layer instruments and they stay in time. Toggle sync off to free a face into its own independent loop.
- **Track discovery** — A Node script (`scripts/discoverTracks.js`) walks `public/assets/sounds/musicalCube/tracks/` at build time, auto-generating a typed track registry so new packs just work — drop a folder of WAVs in, run `npm start`, and it appears in the picker.
- **Cross-platform** — Ionic + Capacitor means the same codebase runs as a web app, a deployable PWA, and a native iOS/Android app with haptics and status-bar integration.
- **Accessible by design** — the UI is simple enough that once you learn it, you know it forever. No dense control panels, no steep DAW learning curve — turn a cube, hear the change, layer sounds.

Most music production tools are intimidating for beginners: endless controls on screen, complex workflows, a high barrier to entry. Musical Cubes is built so anyone can start making music without studying software first. Learn once — use it for life.

The goal is a music tool that feels like playing with sound, not operating software.

---

## Vision

The cube UI already scales cleanly into 3D space — the same way the other Sci-Fi Labs spatial web apps do. That opens a clear path:

- **Multiple cubes in one environment** — several instruments floating together, all staying in sync, so you can build full songs by arranging cubes rather than tracks.
- **Publishable cubes** — a cube becomes a distribution unit. You can publish a single stem (just the vocals, just the brass) or an entire cube (a set of instruments that already work well together).
- **A sample marketplace built around relationships** — inspired by tools like Splice, but oriented around coherent musical packages instead of isolated files. Buy a vocal and drop it onto any cube, or buy a full cube and start playing immediately.

The broader goal is to empower creators. Today artists often earn the least while labels and platforms take most of the revenue and own the rights. Musical Cubes is designed to cut out those middlemen so listeners and other creators can pay artists directly.

A musician records a vocal or an instrument stem and publishes it. Someone else builds a cube from those stems. From there a song gets made. Everyone in the chain is attributed. When a track that uses a stem becomes popular, the original performer of that stem receives the largest share — because learning an instrument and playing it well is harder than arranging existing samples. Remixers still earn; the people who created the performances earn more.

Compensation and credit are baked into the ecosystem, not added later. The instrument becomes the package, and the package carries both the music and the value.

### The cube as a unit of ownership

Every side of the cube is a sample. You can publish a single side — one vocal line, one guitar riff, one drum loop — or publish the entire cube as a finished arrangement. That choice is the core of the model:

- A beginner drops one strong vocal and still earns every time it gets used.
- A producer ships a complete, coherent arrangement as a single object others can build on.
- The cube stops being a file format and becomes a **unit of ownership** — the thing that carries attribution, credit, and the royalty chain.

### The remix loop

A vocal cube gets stacked into a beat. That beat becomes a new cube. The original artist still earns on every downstream use. It's sampling with a royalty chain instead of a dead end — each remix inherits the lineage of the stems it contains, so credit and payment flow back to the performers automatically.

### Distribution and fun

The same cube is how you share music with others and have fun together. Post your vocals or an instrument you play, let others build cubes out of them, and the ecosystem grows from real performances rather than isolated files. It's a redesign of today's complicated sound-editing apps: the interface is the cube, the marketplace is the cube, and the social layer is the cube.

---

## The Sci-Fi Labs stack

Musical Cubes sits inside a broader vision of personal, private, spatial computing. The pieces fit together like this:

### Air-gap layer (private data)

Sensitive information lives on an external hard drive — photos, conversations, financial statements, medical records, any files you consider private. You write them to the drive, then disconnect it. When it's unplugged, the AI has no access. Plug it back in and the data loads into your local **knowledge graph**. You browse everything by talking to your own local AI — no cloud, no third party, no standing access.

This is the foundation: your data is yours, physically, and the AI only sees what you choose to connect.

### Public layer (creativity and sharing)

On top of that private foundation, apps become the public face — places to create, share, and earn. **Where's Paul** is one example of what a public user interface can look like: a personal life-story layer that unleashes creativity and becomes your own social media, published on your own domain.

**Musical Cubes** is another: the cube as instrument, marketplace, and social layer for music. People publish their own apps as ordinary websites instead of depending on platform stores or centralized services.

### A new era of computing with AI

The pattern is the same across the stack — private data stays air-gapped and local, public creativity runs as simple web apps you own and publish yourself. No app-store gatekeepers, no cloud landlord. Just your machine, your domain, and the tools you build.

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
│       ├── screenshots/       # App screenshots & mockups
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

`spatial-web` · `spatial-apps` · `music` · `music-production` · `sci-fi-labs`

---

**Built by** [Paul Visciano](https://paulvisciano.com/) · **Sci-Fi Labs**
