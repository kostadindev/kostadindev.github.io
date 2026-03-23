# CLAUDE.md

## Project overview

Personal portfolio website for Kostadin Devedzhiev, hosted on GitHub Pages at `kostadindev.github.io`. Built with React 19 + TypeScript + Vite, styled with Tailwind CSS and Material UI.

## Architecture

```
/                        ← GitHub Pages root (served files)
├── index.html           ← entry point (copied from react-site/dist/)
├── assets/              ← JS/CSS bundles (copied from react-site/dist/assets/)
├── images/              ← static images
├── documents/           ← PDFs, papers
├── static/              ← legacy static assets
└── react-site/          ← React source code
    ├── src/
    │   ├── components/  ← 14 React components (Hero, Projects, Experience, etc.)
    │   ├── data/
    │   │   └── content.ts  ← ALL website content lives here (single source of truth)
    │   ├── App.tsx      ← main app, scroll-reveal via IntersectionObserver
    │   ├── main.tsx     ← entry point
    │   └── index.css    ← global styles + animations
    ├── public/          ← static files copied verbatim to dist (images, documents, favicon)
    ├── dist/            ← build output (gitignored)
    ├── vite.config.ts   ← base: '/', outDir: 'dist', chunkSizeWarningLimit: 1500
    └── tailwind.config.js ← accent: #d4851f, dark mode: 'class', fonts: Inter, JetBrains Mono
```

## Content editing

All website content is in `react-site/src/data/content.ts`. Exports: `personalInfo`, `currentWork`, `projects`, `education`, `experience`, `teachingExperience`, `publications`, `skills`, `certifications`, `hobbies`, `travelLocations`, `newsItems`.

To update site content, edit `content.ts` — no component changes needed.

## Build and deploy

```bash
cd react-site && npm run build          # tsc -b && vite build → outputs to dist/
cd .. && cp react-site/dist/index.html . && rm -rf assets && cp -r react-site/dist/assets .
git add index.html assets/ && git commit -m "rebuild site: <description>"
git push origin main                     # GitHub Pages serves from root of main
```

There is no CI/CD — deployment is manual copy from `react-site/dist/` to root.

## Tech stack

- **React 19** with TypeScript ~5.9
- **Vite 7** for build tooling
- **Tailwind CSS 4** + **MUI 7** for styling
- **Three.js** / React Three Fiber for 3D hero scene
- **react-simple-maps** for travel map visualization

## Key conventions

- `npm run build` = `tsc -b && vite build` (type-check then bundle)
- Vite generates content-hashed filenames (`index-[hash].js`) for cache busting
- MUI theme: light mode primary `#d4851f`, background `#faf9f7`
- Scroll-reveal animations: IntersectionObserver with 0.08 threshold, staggered children
- `resume.tex` in root is the LaTeX CV (kept in sync with website content)
