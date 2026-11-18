import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function normalizeBasePath(rawBase?: string): string {
  if (!rawBase) return './';
  if (rawBase === './' || rawBase === '/') return rawBase;
  const withLeading = rawBase.startsWith('/') ? rawBase : `/${rawBase}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

function normalizeSiteUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  return rawUrl.replace(/\/+$/, '');
}

export default defineConfig(() => {
  const basePath = normalizeBasePath(process.env.VITE_BASE_PATH);
  const siteUrl = normalizeSiteUrl(process.env.VITE_SITE_URL);

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
      // Inject absolute Open Graph / canonical URLs when VITE_SITE_URL is provided during CI deployment
      {
        name: 'inject-production-og-urls',
        transformIndexHtml(html: string): string {
          if (!siteUrl) {
            return html;
          }
          const canonicalUrl = `${siteUrl}/`;
          const ogImageUrl = `${siteUrl}/og-preview.jpg`;
          return html
            .replace(
              '<meta property="og:image" content="./og-preview.jpg" />',
              `<link rel="canonical" href="${canonicalUrl}" />\n    <meta property="og:url" content="${canonicalUrl}" />\n    <meta property="og:image" content="${ogImageUrl}" />`
            )
            .replace(
              '<meta name="twitter:image" content="./og-preview.jpg" />',
              `<meta name="twitter:image" content="${ogImageUrl}" />`
            );
        },
      },
      // Copies src/assets into dist/ and adds SPA 404.html fallback for GitHub Pages.
      {
        name: 'copy-unbundled-src-assets-and-spa-fallback',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }

          const indexHtml = path.join(distDir, 'index.html');
          const fallbackHtml = path.join(distDir, '404.html');
          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, fallbackHtml);
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
