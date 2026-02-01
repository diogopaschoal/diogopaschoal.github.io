# Project Overview

## Metadata

- **Type**: feature
- **Priority**: high
- **Status**: completed
- **Created**: 2026-02-01
- **Related Files**: [CNAME](CNAME), [diogopaschoal.github.io/vue.config.js](diogopaschoal.github.io/vue.config.js), [diogopaschoal.github.io/package.json](diogopaschoal.github.io/package.json), [docs/](docs/)

## Context

This repository is a **GitHub Pages** project used as a personal site. It is served at **diogopaschoal.com.br** via a custom domain. The site is fronted by **Cloudflare**, which provides the TLS certificate and DNS/proxy. The project is the canonical source for the user's public personal page.

## Requirements

1. **Hosting**: The site is published via GitHub Pages (repository `diogopaschoal/diogopaschoal.github.io` or equivalent Pages configuration).
   - _Acceptance_: Pushing built assets to the configured branch/folder makes the site available at the GitHub Pages URL.
2. **Custom domain**: The public address is **diogopaschoal.com.br**.
   - _Acceptance_: CNAME is set to `diogopaschoal.com.br` (see [CNAME](CNAME)); DNS points the domain to GitHub Pages or Cloudflare as configured.
3. **TLS**: The site is served over HTTPS using a certificate issued by **Cloudflare**.
   - _Acceptance_: Browsers show a valid certificate when visiting https://diogopaschoal.com.br.
4. **Build output**: The Vue app is built and output is written to the **docs/** directory so GitHub Pages can serve it (when Pages is configured to serve from `/docs`).
   - _Acceptance_: `yarn build` (or `npm run build`) produces static files under [docs/](docs/) (CSS, JS, index.html, assets, service worker, etc.).

## Technical Details

- **Stack**: Vue 2, Vue Router (history mode), Less, Vue CLI 4, PWA (service worker via `@vue/cli-plugin-pwa` and `register-service-worker`).
- **Config**: [diogopaschoal.github.io/vue.config.js](diogopaschoal.github.io/vue.config.js) sets `outputDir: '../docs'` so the build lands in [docs/](docs/).
- **CNAME**: [CNAME](CNAME) at repo root and a copy in [docs/CNAME](docs/CNAME) so the custom domain is applied when serving from `docs/`.
- **Deployment**: Build from [diogopaschoal.github.io/](diogopaschoal.github.io/) (e.g. `yarn build`), commit and push the updated [docs/](docs/) (and root [CNAME](CNAME) if used by Pages). Cloudflare sits in front of the domain and provides the certificate; DNS for diogopaschoal.com.br points to Cloudflare/GitHub as configured.

## Implementation Notes

- ESLint uses Airbnb config; Babel and Vue 2 template compiler are in use.
- Router uses `mode: 'history'` and `base: process.env.BASE_URL`; ensure GitHub Pages (and Cloudflare, if applicable) are configured for SPA fallback (e.g. 404 → index.html) so client-side routes work.
- PWA assets (icons, manifest, service worker) are generated into [docs/](docs/) (e.g. [docs/img/icons/](docs/img/icons/), [docs/manifest.json](docs/manifest.json), [docs/service-worker.js](docs/service-worker.js)).

## Testing

- After build, open [docs/index.html](docs/index.html) locally or visit the deployed URL and confirm: navigation (Home, Apps, Experiences, About), HTTPS, and correct domain (diogopaschoal.com.br).
- Confirm Cloudflare certificate is valid in the browser.

## Dependencies

- GitHub Pages enabled for this repo (source: branch/folder that contains [docs/](docs/) or root with docs).
- DNS for diogopaschoal.com.br pointing to Cloudflare or GitHub.
- Cloudflare proxy/certificate configured for diogopaschoal.com.br.
