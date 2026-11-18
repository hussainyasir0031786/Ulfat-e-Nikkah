# Ulfat-e-Nikah (اُلفتِ نکاح) — Digital Nikkah Invitation Website

A mobile-first, animated digital Nikkah invitation **web application** crafted for sharing on WhatsApp and deploying directly to **GitHub Pages**.

---

## Overview

- **Stack**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Motion
- **Interactive Experience**: 3D wax-seal envelope opening, Arabic *Bismillah* calligraphy, animated couple reveal, HTML5 Canvas scratch-to-reveal heart (`23rd December 2026`), event timings, Google Maps location button, direct phone & WhatsApp RSVP, and graceful background audio.
- **Centralized Data**: All invitation details (names, dates, timings, venue, address, phone/WhatsApp, Open Graph metadata) are managed in `src/data/weddingData.ts`.

---

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Build for Production

```bash
npm run lint
npm run build
```

The production static website is generated in the `dist/` directory (including `dist/index.html`, `dist/404.html`, bundled assets, `og-preview.jpg`, and `favicon.svg`).

---

## Deploy to GitHub Pages

This project uses the official GitHub Actions → GitHub Pages workflow (`.github/workflows/deploy.yml`).

### Required GitHub Repository Setting

1. Push the repository to GitHub on the `main` (or `master`) branch.
2. Open your repository on GitHub:
   **GitHub Repository → Settings → Pages → Build and deployment → Source: GitHub Actions**
3. Every push to `main` / `master` (or manual run via **Actions → Build and Deploy Nikkah Invitation Website to GitHub Pages → Run workflow**) will automatically install dependencies, type-check, build `dist/`, and publish your site.

### Live Website URL

Once deployed, your public invitation link will be:

```text
https://USERNAME.github.io/Ulfat-e-Nikkah/
```

*(Replace `USERNAME` with your GitHub username and `Ulfat-e-Nikkah` with your repository name if renamed. The build workflow detects the repository base path automatically via `actions/configure-pages`.)*

---

## WhatsApp Sharing & Open Graph Setup

- `index.html` includes `og:title`, `og:description`, `og:image`, Twitter Card metadata, `theme-color`, and a botanical SVG `favicon.svg`.
- `public/og-preview.jpg` provides a `1200×630` social preview image.
- During GitHub Pages deployment, `vite.config.ts` automatically injects the live HTTPS `og:url`, `canonical`, and absolute `og:image` URLs so WhatsApp link previews display cleanly without pointing to any development URL.

---

## Optional Custom Domain

`CNAME.example` is provided as a template and is **not** deployed automatically so your default `github.io` URL works out of the box.

To use a custom domain later:

1. Copy `CNAME.example` to `public/CNAME` and enter your domain (for example, `eman-saud.com`) on a single line without `https://`.
2. Configure your domain's DNS records (`A` or `CNAME`) to point to GitHub Pages.
3. Enable **Enforce HTTPS** under **Settings → Pages**.

---

## Optional Background Music

Place an MP3 file at:

```text
public/audio/wedding-music.mp3
```

If no MP3 is added, the invitation works without errors and plays a gentle ambient chime when the visitor unmutes sound.
