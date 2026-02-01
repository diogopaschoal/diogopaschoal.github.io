# Blog Area

## Metadata

- **Type**: feature
- **Priority**: medium
- **Status**: draft
- **Created**: 2026-02-01
- **Related Files**: [diogopaschoal.github.io/src/App.vue](diogopaschoal.github.io/src/App.vue), [diogopaschoal.github.io/src/router/index.js](diogopaschoal.github.io/src/router/index.js), new views and optional content/data files

## Context

Extend the current site (four sections: Home, Apps, Experiences, About) with a Blog area. The blog will provide a list of posts and individual post pages. **Posts are authored as markdown files** in a dedicated post folder; the blog list is the set of posts available in that folder. The **title shown for each post in the list** is the **first Header 1 (H1)** markdown heading in the post file (i.e. the first `# Title` line). Optional metadata (date, excerpt) and RSS/categories may be supported via frontmatter or convention.

## Requirements

1. **Navigation**: Add a "Blog" link to the global nav in [App.vue](diogopaschoal.github.io/src/App.vue); it points to the blog list and shows active state when on blog routes.

   - _Acceptance_: Nav shows Blog alongside Home, Apps, Experiences, About; clicking Blog goes to `/blog`; active styling applies when the current route is `/blog` or `/blog/:slug`.

2. **Routes**: Add `/blog` (list) and `/blog/:slug` (or `:id`) for individual posts in [router/index.js](diogopaschoal.github.io/src/router/index.js); lazy-load blog views with a named chunk (e.g. `blog`).

   - _Acceptance_: `/blog` renders the list view; `/blog/<slug>` renders the post view; blog views are loaded via dynamic import with webpack chunk name `blog`.

3. **Blog list page**: Shows a list of posts derived from the markdown files in the post folder. Each entry shows a title, and optionally excerpt and date; entries link to the post page. The **title** for each entry is the **first H1** (atx-style `# Title`) in that post’s markdown file.

   - _Acceptance_: List page displays all posts from the post folder; each entry’s title is the H1 from the post file; entries link to `/blog/<slug>`. Optionally show excerpt and date when available (e.g. from frontmatter).

4. **Post page**: Renders a single post (title, date, full content); 404 or redirect when slug is unknown.

   - _Acceptance_: Visiting `/blog/<valid-slug>` shows the post; visiting an unknown slug shows 404 or redirects to list.

5. **Metadata**: Every post has a **title** from the first H1 in its markdown file. Optional: date (ISO or display format), excerpt, categories, tags—e.g. from YAML frontmatter at the top of the file.

   - _Acceptance_: Post title is taken from the first H1 in the markdown; date, excerpt, and categories/tags may be included when present (e.g. in frontmatter) for display or filtering.

6. **Optional – RSS**: Provide an RSS feed (e.g. `/rss.xml` or `/feed.xml`) so the blog can be consumed by readers.

   - _Acceptance_: A feed is available at a fixed path; fetching it returns valid RSS/XML.

7. **Optional – Categories**: Support categories (or tags) for filtering or display on the list/post pages.
   - _Acceptance_: Categories/tags are visible on list or post pages and optionally used for filtering.

## Technical Details

- **Stack**: Vue 2, Vue Router (history); keep existing patterns (lazy-loaded views, Less in App.vue).
- **Content source**: **Markdown files** in a dedicated **post folder** (e.g. `content/posts/` or `posts/` in the repo). Each file is one post. The **slug** is derived from the filename (e.g. `my-post.md` → slug `my-post`). The **title** shown in the blog list is the **first H1** in the markdown (the first atx-style `# Title` line). Date and excerpt (and categories/tags) may come from YAML frontmatter at the top of each file; if absent, the list still shows the title from H1. At build time or runtime, the list of posts is the set of markdown files in the post folder; ordering (e.g. by date for "last post") is implementation-defined (e.g. frontmatter `date`, file mtime, or filename).
- **New files**: New view(s) under `diogopaschoal.github.io/src/views/` (e.g. `Blog.vue` for list, `Post.vue` for single post); optional `BlogPostCard.vue` or similar; a **post folder** containing one markdown file per post.
- **URLs**: List at `/blog`; post at `/blog/:slug` (slug from filename). RSS at a fixed path if the optional requirement is implemented.

## Implementation Notes

- SPA fallback is already required for history mode (see [project-overview.md](project-overview.md)); ensure `/blog` and `/blog/*` serve `index.html`.
- Keep route names stable (e.g. `Blog`, `Post`) for future links and specs.
- **Post folder**: Use a single folder (e.g. `content/posts/` or `posts/`) so the list of posts is “all markdown files in that folder.” Ignore non-markdown files; optionally ignore files that do not start with an H1.
- **Title from H1**: Parse the first line matching atx-style H1 (`# Title`) in each markdown file to use as the list entry title. If a file has no H1, implementation may use the filename or a fallback (e.g. “Untitled”).
- Prefer build-time processing of markdown (e.g. compile to HTML or JSON at build) for GitHub Pages; runtime markdown parsing is acceptable if the post folder or compiled assets are available to the app.

## Testing

- Visit `/blog` and see the list; visit `/blog/<slug>` and see the post or 404; nav highlights Blog when on blog routes.
- If RSS is implemented: fetch `/rss.xml` (or chosen path) and validate feed structure.

## Dependencies

- [site-structure-and-content.md](site-structure-and-content.md) (current nav and routes).
- [project-overview.md](project-overview.md) (hosting, GitHub Pages, build output to `docs/`).
