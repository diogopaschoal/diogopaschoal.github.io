# Blog List Page Layout

## Metadata

- **Type**: feature
- **Priority**: medium
- **Status**: draft
- **Created**: 2026-02-01
- **Related Files**: [diogopaschoal.github.io/src/views/Blog.vue](diogopaschoal.github.io/src/views/Blog.vue) (or equivalent), [specs/blog-area.md](blog-area.md)

## Context

This spec defines the layout and behavior of the **blog list page** (the `/blog` view) described in [blog-area.md](blog-area.md). The list page uses a split layout: a list of posts on the left and an article panel on the right. The right panel defaults to showing the **last post** (most recent); clicking a post in the list shows that post in the right panel without leaving the page.

## Requirements

1. **Split layout**: The blog list page is divided into two regions.
   - _Acceptance_: Left region uses approximately **30%** of the page width; right region uses approximately **60%**. Left shows the list of posts; right shows the selected post (article) content.

2. **Last post as default**: The right panel defaults to showing the **last post** (the most recent post by date).
   - _Acceptance_: When the user opens `/blog` (or the blog list page), the right panel displays the last post (most recent) without requiring a click. The corresponding entry in the left list is visually indicated as selected.

3. **List on the left**: The left region shows the list of posts (title, and optionally date/excerpt). Each entry is a link or control that selects that post.
   - _Acceptance_: All posts are listed; each entry is clickable; the selected post is clearly indicated (e.g. highlight or active state).

4. **Article on the right**: The right region shows the full article for the selected post (title, date, full content).
   - _Acceptance_: When the user clicks a post in the left list, the right panel updates to show that post’s content. No full-page navigation occurs; only the right panel content changes.

5. **Optional – URL for selected post**: The selected post may be reflected in the URL (e.g. `/blog?post=<slug>` or `/blog#<slug>`) so that a specific post can be bookmarked or shared and opens with that post shown on the right.
   - _Acceptance_: If implemented, visiting `/blog` with a post slug in the URL shows that post in the right panel; without a slug, the last post is shown.

## Technical Details

- **Stack**: Vue 2, same patterns as the rest of the site (Less, router). The blog list view is a single route (e.g. `/blog`) with one component that manages both the list and the article panel.
- **State**: The view keeps the currently selected post (e.g. slug or id). Initial value = last post (first item when posts are ordered by date descending).
- **Responsiveness**: Layout (30% / 60%) applies at desktop widths; implementation may stack or adapt for narrow viewports (e.g. list above article, or list in a drawer).
- **Relation to blog-area.md**: This layout applies to the “Blog list page” in [blog-area.md](blog-area.md). The route `/blog/:slug` may still be used for direct links to a single post (e.g. from RSS or external links); the list page at `/blog` uses this split layout.

## Implementation Notes

- Order posts by date descending so “last post” = first item in the list.
- Use CSS (e.g. flexbox or grid) or a layout component to enforce the 30% / 60% split; avoid fixed pixel widths so the layout works across screen sizes.
- If URL is updated on selection, use `router.replace` or `history.replaceState` so the back button does not step through every post selection, unless you prefer full history entries.

## Testing

- Open `/blog`: right panel shows the last post (most recent); left list shows it as selected.
- Click another post in the left list: right panel updates to that post; selection state in the list updates.
- If URL reflects selection: open `/blog?post=<slug>` (or chosen format) and confirm that post is shown on the right.

## Dependencies

- [blog-area.md](blog-area.md) (blog area, routes, post metadata, and list/post content).
