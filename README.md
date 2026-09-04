# Image Color Extractor

![Deploy](https://github.com/Salama-Malek/image-color-extractor/actions/workflows/deploy.yml/badge.svg)

Live demo: https://salama-malek.github.io/image-color-extractor/

Drag in an image, get its dominant color palette instantly — no upload, no server, all in the browser.

## Overview

Image Color Extractor is a client-side React + TypeScript app that reads an uploaded image straight into an HTML canvas, samples its pixel data, and quantizes the result into a ranked list of dominant hex colors. Each color is rendered as a swatch card that can be copied to the clipboard with one click. Nothing ever leaves the browser — there is no backend, no network request, and no image storage.

## Features

- Drag-and-drop or click-to-browse image upload, with basic file-type validation
- Dominant color extraction via canvas pixel sampling and RGB quantization (`src/utils/colorExtractor.ts`)
- Configurable palette size (defaults to 8 colors in the app, 6 in the hook default)
- One-click hex copy to clipboard per swatch, with a transient "Copied!" confirmation
- Animated, staggered palette reveal as results come in
- Image preview panel alongside the extracted palette
- "Start Over" action to reset the current image and results
- About modal with links to the author's GitHub and LinkedIn
- Dark-themed, responsive UI built with Tailwind CSS

## Tech stack

- React 18 + TypeScript
- Vite 5 (with `@vitejs/plugin-react` / SWC variant available)
- Tailwind CSS 3 (with PostCSS + Autoprefixer)
- GitHub Actions for GitHub Pages deployment

## Getting started

### Prerequisites

- Node.js and npm

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

Starts the Vite dev server with hot module reloading.

### Build

```bash
npm run build
```

Produces a production build in `dist/`.

### Deploy

Deployment is automated via the "Deploy" GitHub Actions workflow (`.github/workflows/deploy.yml`), which builds the app and publishes `dist/` to GitHub Pages on every push to `main` (or via manual `workflow_dispatch`). The app is configured to be served from `/image-color-extractor/` (see `vite.config.ts`) and its published homepage is `https://salama-malek.github.io/image-color-extractor/`.

### Tests

No test suite is currently configured.

### Environment variables

None required — the app is fully client-side with no external services or API keys.

## Project structure

```
├── index.html                  # App shell, mounts #root
├── src/
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Layout, upload flow, palette + preview display
│   ├── components/
│   │   ├── UploadArea.tsx      # Drag-and-drop / click file picker
│   │   ├── ColorPalette.tsx    # Animated grid of extracted colors
│   │   ├── ColorCard.tsx       # Single swatch with copy-to-clipboard
│   │   └── AboutModal.tsx      # About dialog with author links
│   ├── hooks/
│   │   └── useColorExtraction.ts  # File handling, image loading, state management
│   ├── utils/
│   │   └── colorExtractor.ts   # Canvas-based dominant color extraction
│   └── styles/
│       └── index.css           # Tailwind entry point
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Author

Salama Malek — [GitHub](https://github.com/Salama-Malek) · [LinkedIn](https://www.linkedin.com/in/salama-malek/)

## License

MIT. See [LICENSE](LICENSE).
