# Text Scroll Animations

104 scroll-driven typography animations built with [GSAP](https://gsap.com/) and ScrollTrigger.

To keep pages light, the animations are split into **batches of 10**. Each batch is
its own page and only loads the HTML, CSS and JS for those 10 animations.

**Live demo:** https://manthansharma17.github.io/components/textscroll/
(works once GitHub Pages is enabled for this repo: *Settings → Pages → Deploy from branch → `main` / root*)

## Run it locally

No build step. Open `textscroll/index.html` in a browser and pick a batch.
GSAP is bundled in `vendor/`, so it works offline.

## Folder structure

```
textscroll/
├── index.html          ← gallery: links to every batch
├── shared/
│   ├── base.css        ← global variables, reset, hero, shared classes
│   └── hub.css         ← styles for the gallery page only
├── vendor/             ← gsap.min.js, ScrollTrigger.min.js
└── batches/
    ├── 001-010/
    │   ├── index.html  ← markup for animations 1–10
    │   ├── style.css   ← their styles
    │   └── script.js   ← their animations
    ├── 011-020/
    └── …
```

## Use an animation in your own project

Every animation is marked with a `SECTION <number>` comment in all three files of its batch.

1. Load GSAP and ScrollTrigger (from `vendor/` or a CDN).
2. Include `shared/base.css`, or copy just the `:root` variables from it.
3. From the batch folder, copy the blocks for your animation:
   - the `<section>` from `index.html`
   - the `SECTION <number>` block from `style.css`
   - the `SECTION <number>` block from `script.js`
4. Keep `gsap.registerPlugin(ScrollTrigger);` at the top of your script.

## All animations

| # | Animation | Batch |
|---|-----------|-------|
| 001 | Word Bounce | [001-010](batches/001-010/index.html) |
| 002 | Mask Reveal | [001-010](batches/001-010/index.html) |
| 003 | Character Blur | [001-010](batches/001-010/index.html) |
| 004 | 3D Word Flip | [001-010](batches/001-010/index.html) |
| 005 | Scatter | [001-010](batches/001-010/index.html) |
| 006 | Word Color Fill | [001-010](batches/001-010/index.html) |
| 007 | Scale | [001-010](batches/001-010/index.html) |
| 008 | Horizontal Text | [001-010](batches/001-010/index.html) |
| 009 | Scramble | [001-010](batches/001-010/index.html) |
| 010 | Typography Finale | [001-010](batches/001-010/index.html) |
| 011 | Text Slice | [011-020](batches/011-020/index.html) |
| 012 | Liquid Text Fill | [011-020](batches/011-020/index.html) |
| 013 | Magnetic Words | [011-020](batches/011-020/index.html) |
| 014 | Metal Shine Text | [011-020](batches/011-020/index.html) |
| 015 | Typography Wave | [011-020](batches/011-020/index.html) |
| 016 | Infinite Zoom | [011-020](batches/011-020/index.html) |
| 017 | Typography Explosion | [011-020](batches/011-020/index.html) |
| 018 | Typography Vortex | [011-020](batches/011-020/index.html) |
| 019 | Typography Tunnel | [011-020](batches/011-020/index.html) |
| 020 | Terminal Typewriter | [011-020](batches/011-020/index.html) |
| 021 | Tide Wave | [021-030](batches/021-030/index.html) |
| 022 | Gravity Typography | [021-030](batches/021-030/index.html) |
| 023 | Glass Refraction | [021-030](batches/021-030/index.html) |
| 024 | Typography Collapse | [021-030](batches/021-030/index.html) |
| 025 | Liquid Distortion | [021-030](batches/021-030/index.html) |
| 026 | Mechanical Typography | [021-030](batches/021-030/index.html) |
| 027 | Floating Typography | [021-030](batches/021-030/index.html) |
| 028 | Neon Power On | [021-030](batches/021-030/index.html) |
| 029 | Wireframe Typography | [021-030](batches/021-030/index.html) |
| 030 | Typography Convergence | [021-030](batches/021-030/index.html) |
| 031 | Final Identity | [031-040](batches/031-040/index.html) |
| 032 | Magnetic Contact | [031-040](batches/031-040/index.html) |
| 033 | Magnetic Field Typography | [031-040](batches/031-040/index.html) |
| 034 | Liquid Cursor Distortion | [031-040](batches/031-040/index.html) |
| 035 | Text Shatter / Rebuild | [031-040](batches/031-040/index.html) |
| 036 | Contact / Footer | [031-040](batches/031-040/index.html) |
| 037 | Interactive Text | [031-040](batches/031-040/index.html) |
| 038 | Spotlight Typography | [031-040](batches/031-040/index.html) |
| 039 | Cursor Gravity Typography | [031-040](batches/031-040/index.html) |
| 040 | Text Ripple | [031-040](batches/031-040/index.html) |
| 041 | Motion Trail | [041-050](batches/041-050/index.html) |
| 042 | Liquid Text Distortion | [041-050](batches/041-050/index.html) |
| 043 | Particle Text Dissolve | [041-050](batches/041-050/index.html) |
| 044 | Magnetic Text Shatter | [041-050](batches/041-050/index.html) |
| 045 | 3D Text Tunnel | [041-050](batches/041-050/index.html) |
| 046 | Cursor Text Scanner | [041-050](batches/041-050/index.html) |
| 047 | Text Warp Vortex | [041-050](batches/041-050/index.html) |
| 048 | Neon Text Glitch Matrix | [041-050](batches/041-050/index.html) |
| 049 | Magnetic Liquid Typography | [041-050](batches/041-050/index.html) |
| 050 | Typography Singularity | [041-050](batches/041-050/index.html) |
| 051 | Typography Gravity Field | [051-060](batches/051-060/index.html) |
| 052 | Liquid Reflection Text | [051-060](batches/051-060/index.html) |
| 053 | Chromatic Echo Typography | [051-060](batches/051-060/index.html) |
| 054 | Typography Time Rift | [051-060](batches/051-060/index.html) |
| 055 | Typography Black Hole | [051-060](batches/051-060/index.html) |
| 056 | Typography Event Horizon | [051-060](batches/051-060/index.html) |
| 057 | Typography Gravity Lens | [051-060](batches/051-060/index.html) |
| 058 | Typography Warp | [051-060](batches/051-060/index.html) |
| 059 | Typography Shatter | [051-060](batches/051-060/index.html) |
| 060 | Typography Melt | [051-060](batches/051-060/index.html) |
| 061 | Typography Pulse | [061-070](batches/061-070/index.html) |
| 062 | Typography Magnet | [061-070](batches/061-070/index.html) |
| 063 | Typography Echo | [061-070](batches/061-070/index.html) |
| 064 | Typography Freeze | [061-070](batches/061-070/index.html) |
| 065 | Typography Void | [061-070](batches/061-070/index.html) |
| 066 | Typography Ripple | [061-070](batches/061-070/index.html) |
| 067 | Typography Afterimage | [061-070](batches/061-070/index.html) |
| 068 | Typography Prism | [061-070](batches/061-070/index.html) |
| 069 | Typography Fracture | [061-070](batches/061-070/index.html) |
| 070 | Typography Disintegrate | [061-070](batches/061-070/index.html) |
| 071 | Erosion | [071-080](batches/071-080/index.html) |
| 072 | Vaporize | [071-080](batches/071-080/index.html) |
| 073 | Liquefy | [071-080](batches/071-080/index.html) |
| 074 | Liquid Mirror | [071-080](batches/071-080/index.html) |
| 075 | Oscillate | [071-080](batches/071-080/index.html) |
| 076 | Resonance | [071-080](batches/071-080/index.html) |
| 077 | Phase Shift | [071-080](batches/071-080/index.html) |
| 078 | Chromatic Drift | [071-080](batches/071-080/index.html) |
| 079 | Parallax Depth | [071-080](batches/071-080/index.html) |
| 080 | Time Echo | [071-080](batches/071-080/index.html) |
| 081 | Time Fracture | [081-090](batches/081-090/index.html) |
| 082 | Causality | [081-090](batches/081-090/index.html) |
| 083 | Disorder | [081-090](batches/081-090/index.html) |
| 084 | Oblivion | [081-090](batches/081-090/index.html) |
| 085 | Echo Study | [081-090](batches/081-090/index.html) |
| 086 | Singularity | [081-090](batches/081-090/index.html) |
| 087 | Infinity | [081-090](batches/081-090/index.html) |
| 088 | Paradox | [081-090](batches/081-090/index.html) |
| 089 | Recursion | [081-090](batches/081-090/index.html) |
| 090 | Reverse | [081-090](batches/081-090/index.html) |
| 091 | Collapse | [091-100](batches/091-100/index.html) |
| 092 | Disintegrate | [091-100](batches/091-100/index.html) |
| 093 | Aftershock | [091-100](batches/091-100/index.html) |
| 094 | Echo | [091-100](batches/091-100/index.html) |
| 095 | Supernova | [091-100](batches/091-100/index.html) |
| 096 | Afterglow | [091-100](batches/091-100/index.html) |
| 097 | Gravity | [091-100](batches/091-100/index.html) |
| 098 | Void | [091-100](batches/091-100/index.html) |
| 099 | After the End | [091-100](batches/091-100/index.html) |
| 100 | Eclipse | [091-100](batches/091-100/index.html) |
| 101 | Black Hole | [101-110](batches/101-110/index.html) |
| 102 | Time Dilation | [101-110](batches/101-110/index.html) |
| 103 | Kinetic Path Text | [101-110](batches/101-110/index.html) |
| 104 | The Simulation | [101-110](batches/101-110/index.html) |
