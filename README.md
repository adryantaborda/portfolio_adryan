# Portfolio – Clean Tech / Industrial

Single-page portfolio built with Next.js, designed around full-screen stacked sections for a clean-tech / industrial aesthetic.

## Structure

- `app/layout.tsx` – global fonts (Space Grotesk + Poppins) and metadata
- `app/page.tsx` – entry point rendering the landing page
- `components/LandingPage.tsx` – hero, about, projects, and contact sections
- `app/globals.css` – minimal industrial UI styling and full-height section layout

Each section occupies 100% viewport height and uses scroll snapping for focused, one-screen-at-a-time reading.

## Motion & Performance

- Static rendering by default (no dynamic data fetching)
- Optimized font loading via `next/font`
- Framer Motion micro-interactions with spring stiffness 120 / damping 20
- Motion is used sparingly: section reveals, project cards, and subtle hero emphasis

## Background Texture

The current background uses CSS-based grids and radial gradients as a stand-in for a subtle PNG texture. To plug in your own noise/texture image (for example, derived from a reference PDF), add it to `public/textures/` and reference it from `body::before` in `app/globals.css`.

## Running Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

