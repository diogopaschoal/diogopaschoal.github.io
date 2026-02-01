# Blog Area

## Metadata

- **Type**: feature
- **Priority**: medium
- **Status**: draft
- **Created**: 2026-02-01
- **Related Files**: [diogopaschoal.github.io/src/App.vue](diogopaschoal.github.io/src/App.vue), [diogopaschoal.github.io/src/router/index.js](diogopaschoal.github.io/src/router/index.js), new views and optional content/data files

## Context

Extend the current site (four sections: Home, Apps, Experiences, About) with a Blog area. The blog will provide a list of posts and individual post pages, with metadata (date, title, excerpt) and optional RSS and categories.

## Requirements

1. **Navigation**: Add a "Blog" link to the global nav in [App.vue](diogopaschoal.github.io/src/App.vue); it points to the blog list and shows active state when on blog routes.

   - _Acceptance_: Nav shows Blog alongside Home, Apps, Experiences, About; clicking Blog goes to `/blog`; active styling applies when the current route is `/blog` or `/blog/:slug`.

2. **Routes**: Add `/blog` (list) and `/blog/:slug` (or `:id`) for individual posts in [router/index.js](diogopaschoal.github.io/src/router/index.js); lazy-load blog views with a named chunk (e.g. `blog`).

   - _Acceptance_: `/blog` renders the list view; `/blog/<slug>` renders the post view; blog views are loaded via dynamic import with webpack chunk name `blog`.

3. **Blog list page**: Shows a list of posts; each entry shows title, excerpt, and date; entries link to the post page.

   - _Acceptance_: List page displays all posts; each entry shows title, excerpt, and date and links to `/blog/<slug>`.

4. **Post page**: Renders a single post (title, date, full content); 404 or redirect when slug is unknown.

   - _Acceptance_: Visiting `/blog/<valid-slug>` shows the post; visiting an unknown slug shows 404 or redirects to list.

5. **Metadata**: Every post has at least: title, date (ISO or display format), excerpt. Optional: categories, tags.

   - _Acceptance_: Post data includes title, date, and excerpt; categories/tags may be included for display or filtering.

6. **Optional – RSS**: Provide an RSS feed (e.g. `/rss.xml` or `/feed.xml`) so the blog can be consumed by readers.

   - _Acceptance_: A feed is available at a fixed path; fetching it returns valid RSS/XML.

7. **Optional – Categories**: Support categories (or tags) for filtering or display on the list/post pages.
   - _Acceptance_: Categories/tags are visible on list or post pages and optionally used for filtering.

## Technical Details

- **Stack**: Vue 2, Vue Router (history); keep existing patterns (lazy-loaded views, Less in App.vue).
- **Content source**: To be chosen at implementation—static markdown compiled at build (e.g. via a plugin or script) fits GitHub Pages; alternatively a local JSON index plus markdown/HTML body. Prefer static/build-time content for GitHub Pages.
- **New files**: New view(s) under `diogopaschoal.github.io/src/views/` (e.g. `Blog.vue` for list, `Post.vue` for single post, or one view with conditional layout); optional `BlogPostCard.vue` or similar; optional data/index for post metadata.
- **URLs**: List at `/blog`; post at `/blog/:slug` (slug from filename or frontmatter). RSS at a fixed path if the optional requirement is implemented.

## Implementation Notes

- SPA fallback is already required for history mode (see [project-overview.md](project-overview.md)); ensure `/blog` and `/blog/*` serve `index.html`.
- Keep route names stable (e.g. `Blog`, `Post`) for future links and specs.
- For static sites, avoid runtime CMS calls unless a server or edge function is introduced; prefer build-time content.

## Testing

- Visit `/blog` and see the list; visit `/blog/<slug>` and see the post or 404; nav highlights Blog when on blog routes.
- If RSS is implemented: fetch `/rss.xml` (or chosen path) and validate feed structure.

## Dependencies

- [site-structure-and-content.md](site-structure-and-content.md) (current nav and routes).
- [project-overview.md](project-overview.md) (hosting, GitHub Pages, build output to `docs/`).
