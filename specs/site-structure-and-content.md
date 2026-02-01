# Site Structure and Content (Current State)

## Metadata

- **Type**: feature
- **Priority**: medium
- **Status**: in-progress
- **Created**: 2026-02-01
- **Related Files**: [diogopaschoal.github.io/src/App.vue](diogopaschoal.github.io/src/App.vue), [diogopaschoal.github.io/src/router/index.js](diogopaschoal.github.io/src/router/index.js), [diogopaschoal.github.io/src/views/Home.vue](diogopaschoal.github.io/src/views/Home.vue), [diogopaschoal.github.io/src/views/About.vue](diogopaschoal.github.io/src/views/About.vue), [diogopaschoal.github.io/src/views/Apps.vue](diogopaschoal.github.io/src/views/Apps.vue), [diogopaschoal.github.io/src/views/Experiences.vue](diogopaschoal.github.io/src/views/Experiences.vue)

## Context

The personal site at diogopaschoal.com.br is a Vue 2 SPA with four main sections. This spec describes the **current** route structure, navigation, and content state so future specs can extend or change it consistently.

## Requirements

1. **Navigation**: The app shows a global nav with links to Home, Apps, Experiences, and About.
   - _Acceptance_: [App.vue](diogopaschoal.github.io/src/App.vue) renders these four `router-link`s; the active route is visually indicated (e.g. green for active).
2. **Routes**: Four routes are defined—Home (`/`), Experiences (`/experiences`), Apps (`/apps`), About (`/about`).
   - _Acceptance_: [router/index.js](diogopaschoal.github.io/src/router/index.js) defines these paths; Home is eager-loaded, the others lazy-loaded with named chunks (experiences, apps, about).
3. **Content**: Each view currently shows a placeholder heading; no full content or data is wired yet.
   - _Acceptance_: Home shows "Welcome"; About shows "This is an about page"; Apps and Experiences each show a section title only. No shared components (e.g. ExperienceCard) are used in views yet.

## Technical Details

- **Router**: History mode, base from `process.env.BASE_URL`. Lazy-loaded views: [Experiences.vue](diogopaschoal.github.io/src/views/Experiences.vue), [Apps.vue](diogopaschoal.github.io/src/views/Apps.vue), [About.vue](diogopaschoal.github.io/src/views/About.vue).
- **Styling**: Global styles in [App.vue](diogopaschoal.github.io/src/App.vue) (Less): Avenir/Helvetica, centered layout, nav link color #2c3e50, active link #42b983.
- **Components**: [ExperienceCard.vue](diogopaschoal.github.io/src/components/ExperienceCard.vue) exists but is not yet used in any view.

## Implementation Notes

- Keep route names (Home, Apps, Experiences, About) stable when adding content or new sections so existing links and specs stay valid.
- When adding real content (e.g. list of experiences or apps), consider using ExperienceCard or new components and optionally a small data layer (local JSON or future API).

## Testing

- Visit `/`, `/experiences`, `/apps`, `/about` and confirm the correct view and title render; confirm nav highlights the current route.
- Confirm build output in [docs/](docs/) includes separate chunks for experiences, apps, and about.

## Dependencies

- [project-overview.md](project-overview.md) for hosting, domain, and build/deploy context.
