# CLAUDE.md

## Project overview

Personal portfolio website for Kostadin Devedzhiev, hosted on GitHub Pages at `kostadindev.github.io`. Built with React 19 + TypeScript + Vite, styled with Tailwind CSS 4 and shadcn/ui (Radix primitives).

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
    │   ├── components/  ← page sections (Hero, Projects, Experience, etc.) and shared pieces
    │   │   └── ui/      ← shadcn/ui components (added with `npx shadcn@latest add`)
    │   ├── data/
    │   │   └── content.ts  ← ALL website content lives here (single source of truth)
    │   ├── App.tsx      ← main app (section order; Skills and Globe hidden, see _hidden/)
    │   ├── main.tsx     ← entry point
    │   └── index.css    ← design tokens (shadcn CSS variables, type scale, page width)
    ├── public/          ← static files copied verbatim to dist (images, documents, favicon)
    ├── dist/            ← build output (gitignored)
    ├── vite.config.ts   ← base: '/', outDir: 'dist', chunkSizeWarningLimit: 1500
    ├── components.json ← shadcn/ui config (new-york, neutral, CSS variables)
    └── _hidden/         ← hidden sections (Globe, Hobbies, TravelMap) still on MUI, not built
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
- **Tailwind CSS 4** (via `@tailwindcss/vite`) + **shadcn/ui** (Radix primitives, components copied into `src/components/ui`), icons from **lucide-react** plus brand SVGs in `src/components/icons.tsx`
- **Three.js** / React Three Fiber for 3D hero scene
- **react-simple-maps** for travel map visualization

## Key conventions

- `npm run build` = `tsc -b && vite build` (type-check then bundle)
- Vite generates content-hashed filenames (`index-[hash].js`) for cache busting
- Design tokens live in `src/index.css` (`:root`/`.dark` CSS variables and `@theme inline`): `--primary` is the orange (#C2410C for text, `--accent-mark` #E8590C for non-text marks), neutral palette, Inter, type scale 32/22/18/16/14 px, `--container-page` 960px. Shared pieces: `SectionHeader.tsx` (Section, PageColumn), `typography.tsx`, `Highlight.tsx`, `Logo.tsx`
- No scroll-reveal or entrance animations
- `.npmrc` sets `legacy-peer-deps=true` (react-simple-maps declares a React <=18 peer)
- Logos use trimmed files (`public/images/*-trim.png`); the root `images/` folder is not rebuilt by the deploy copy, so copy new images there too
- `resume.tex` in root is the LaTeX CV (kept in sync with website content)
