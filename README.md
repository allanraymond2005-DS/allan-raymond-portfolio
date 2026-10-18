# Allan Raymond S — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis. No GSAP, no WebGL.

## Run
```bash
npm install        # also copies Devicon logos into public/logos (postinstall)
npm run dev        # http://localhost:3000
npm run build && npm start
```
Fonts (Inter Tight, Instrument Serif, JetBrains Mono) load through `next/font/google`, so the first `dev`/`build` needs internet.

## Sections
Hero → About (lanyard ID card) → Skills (periodic table) → Work (accordion) → Certifications → Experience (timeline) → Contact. All text lives in `src/lib/data.ts`, taken from the résumé. No GitHub URL is in the résumé, so GitHub buttons are omitted: set `PROFILE.github` (and `Project.url`) to show them.

## Rebuild the hero video / portrait
```bash
python scripts/build-hero-assets.py path/to/intro.mp4 path/to/portrait.jpg   # needs ffmpeg + Pillow
```
Crops only (`crop=600:720:347:0`); the clip is never trimmed, retimed or looped. Outputs `public/hero/hero.webm|mp4`, `poster.png`, `public/portrait-bust.webp`, `public/og.jpg`.

## Logos
`npm run logos` copies official SVGs from the `devicon` package (MIT, licence copied to `public/logos/DEVICON-LICENSE`). Skills/tech without a logo use a simple line icon.

## Résumé
`public/Allan_Raymond_S_Resume.pdf` was converted from the supplied .docx with LibreOffice (1 page, text verified).
