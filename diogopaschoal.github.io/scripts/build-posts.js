/**
 * Build script: reads markdown from repo-root content/posts/,
 * outputs manifest + HTML bodies to src/data/, and rss.xml to public/.
 * Run from diogopaschoal.github.io/ (e.g. node scripts/build-posts.js).
 */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const POSTS_DIR = path.join(REPO_ROOT, "content", "posts");
const DATA_DIR = path.join(__dirname, "..", "src", "data");
const PUBLIC_DIR = path.join(__dirname, "..", "public");
const SITE_BASE = "https://diogopaschoal.com.br";

if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  console.log("Created empty content/posts/");
  // Write empty manifest and no RSS so build doesn't break
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, "posts-data.js"),
    "export const manifest = [];\nexport const bodies = {};\n",
    "utf8",
  );
  const rssPath = path.join(PUBLIC_DIR, "rss.xml");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>diogopaschoal.com.br</title>
    <link>${SITE_BASE}</link>
    <description>Blog</description>
  </channel>
</rss>
`;
  fs.writeFileSync(rssPath, rss, "utf8");
  process.exit(0);
}

const mdFiles = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
const manifest = [];
const bodies = {};

function extractFirstH1(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function parseDate(input) {
  if (!input) return null;
  const d = new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

for (const file of mdFiles) {
  const slug = path.basename(file, ".md");
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const stat = fs.statSync(filePath);
  const { data: frontmatter, content } = matter(raw);
  const title = frontmatter.title
    ? String(frontmatter.title).trim()
    : extractFirstH1(content) || slug;
  const date = parseDate(frontmatter.date) || stat.mtime;
  const excerpt = frontmatter.excerpt || null;
  const categories = Array.isArray(frontmatter.categories)
    ? frontmatter.categories
    : frontmatter.categories
    ? [frontmatter.categories]
    : [];
  // Use marked lexer/parser to remove a leading H1 token safely (AST-like).
  const tokens = marked.lexer(content);
  const firstH1Index = tokens.findIndex(
    (t) => t.type === "heading" && t.depth === 1,
  );
  if (firstH1Index !== -1) {
    tokens.splice(firstH1Index, 1);
  }
  const html = marked.parser(tokens);
  manifest.push({
    slug,
    title,
    date: date.toISOString(),
    excerpt,
    categories,
  });
  bodies[slug] = html;
}

// Sort by date descending (most recent first)
manifest.sort((a, b) => new Date(b.date) - new Date(a.date));

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function esc(s) {
  return `'${String(s)
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")}'`;
}
function formatManifest(arr) {
  return arr
    .map(
      (p) =>
        `  {\n    slug: ${esc(p.slug)},\n    title: ${esc(
          p.title,
        )},\n    date: ${esc(p.date)},\n    excerpt: ${esc(
          p.excerpt,
        )},\n    categories: [\n${p.categories
          .map((c) => `      ${esc(c)},\n`)
          .join("")}    ],\n  },`,
    )
    .join("\n");
}
function formatBodies(obj) {
  const entries = Object.entries(obj).map(
    ([k, v]) => `  ${esc(k)}: ${esc(v)},`,
  );
  return entries.length ? `{\n${entries.join("\n")}\n}` : "{}";
}
const jsContent = `export const manifest = [\n${formatManifest(
  manifest,
)}\n];\nexport const bodies = ${formatBodies(bodies)};\n`;
fs.writeFileSync(path.join(DATA_DIR, "posts-data.js"), jsContent, "utf8");

// RSS
const rssItems = manifest
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_BASE}/blog/${p.slug}</link>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      ${p.excerpt ? `<description>${escapeXml(p.excerpt)}</description>` : ""}
    </item>`,
  )
  .join("\n");

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>diogopaschoal.com.br – Blog</title>
    <link>${SITE_BASE}/blog</link>
    <description>Blog</description>
    <atom:link href="${SITE_BASE}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`;
fs.writeFileSync(path.join(PUBLIC_DIR, "rss.xml"), rss, "utf8");

console.log(
  `Built ${manifest.length} posts -> src/data/posts-data.js, public/rss.xml`,
);
