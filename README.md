# Ulfat-e-Nikah (اُلفتِ نکاح) — Digital Nikkah Invitation

A mobile-first, animated digital Nikkah invitation crafted for sharing on WhatsApp and deploying effortlessly to GitHub Pages.

## Features

- **Luxury 3D Envelope Opening**: Interactive wax-seal and 3D-perspective envelope reveal with floating rose petals.
- **Editorial Typography & Botanical Artwork**: Warm ivory paper palette with watercolor botanical arch framing, Islamic calligraphy (`Bismillah`), and animated couple reveal.
- **Real Interactive Scratch-to-Reveal Heart**: Touch- and mouse-compatible HTML5 Canvas scratch foil revealing the wedding date (`23rd December 2026`), paired with an accessible fallback button.
- **Event Timings & Google Maps**: Clear Nikkah (`8:00 PM`) and Dinner (`9:00 PM`) timings, copyable address, `.ics` calendar export, and direct Google Maps link (`OPEN IN MAPS`).
- **One-Tap RSVP**: Direct `tel:` dialing and properly formatted international WhatsApp RSVP (`+92` without leading zero).
- **Graceful Background Audio**: Starts gently after opening the invitation, with a floating mute/unmute toggle and safe fallback if `public/audio/wedding-music.mp3` is not supplied.
- **WhatsApp Link Preview Ready**: Configured with Open Graph (`og:title`, `og:description`, `og:image`), Twitter metadata, and `public/og-preview.jpg` (`1200×630`).

---

## Customize Invitation Details

All names, dates, timings, venue details, phone numbers, and metadata live in one centralized file:

```
src/data/weddingData.ts
```

Update `weddingData` to change any detail without editing UI components.

### Optional Background Music

Place an MP3 file at:

```
public/audio/wedding-music.mp3
```

If no MP3 is provided, the invitation works normally without errors and plays a subtle ambient chime when sound is enabled.

### WhatsApp Preview Image

A `1200×630` preview image is included at `public/og-preview.jpg`. You may replace it with a custom image at the exact same path (`public/og-preview.jpg`) without modifying code.

---

## Local Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## DEPLOY TO GITHUB PAGES

1. Create a new GitHub repository and push this project to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial Nikkah invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```
2. On GitHub, open your repository **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will run automatically on push, build `dist/`, and publish your live invitation URL (`https://YOUR-USERNAME.github.io/YOUR-REPO/`).

---

## Custom Domain Setup (Optional)

To attach a custom domain such as `YOUR-DOMAIN.COM`:

1. Copy `CNAME.example` to `public/CNAME` and replace `YOUR-DOMAIN.COM` with your actual domain name (one line, no `https://`).
2. Update the `<link rel="canonical">`, `og:url`, and absolute `og:image` / `twitter:image` URLs in `index.html` to match `https://YOUR-DOMAIN.COM/`.
3. Point your domain's DNS `A` / `CNAME` records to GitHub Pages in your registrar, then enable HTTPS in **Settings → Pages**.
