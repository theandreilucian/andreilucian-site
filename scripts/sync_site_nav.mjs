/**
 * Sync Dan Koe nav markup across public site pages.
 * Run: node scripts/sync_site_nav.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderSiteNav } from "./site-nav.mjs";
import { renderArticleNav } from "./article-nav.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const NAV_RE = /<nav class="navbar koe-nav">[\s\S]*?<\/nav>/;
const ARTICLE_NAV_RE = /<nav class="article-nav[^"]*"[^>]*>[\s\S]*?<\/nav>\s*/g;

function stripArticleNavs(html) {
  return html.replace(ARTICLE_NAV_RE, "");
}

function syncNav(relPath, assetPrefix = "") {
  const abs = path.join(ROOT, relPath);
  if (!abs || !fs.existsSync(abs)) return null;

  let html = fs.readFileSync(abs, "utf8");
  const before = html;
  const nav = renderSiteNav(assetPrefix).trim();

  if (NAV_RE.test(html)) {
    html = html.replace(NAV_RE, nav);
  }

  if (html !== before) {
    fs.writeFileSync(abs, html, "utf8");
    return { relPath, status: "updated" };
  }
  return { relPath, status: "ok" };
}

function syncArticleNav(relPath, assetPrefix = "") {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;

  let html = fs.readFileSync(abs, "utf8");
  const before = html;
  const bar = renderArticleNav(assetPrefix).trim();

  html = stripArticleNavs(html);

  if (/<footer class="koe-footer">/.test(html)) {
    html = html.replace(/<footer class="koe-footer">/, `${bar}\n\n    <footer class="koe-footer">`);
  } else if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `\n  ${bar}\n</body>`);
  }

  if (html !== before) {
    fs.writeFileSync(abs, html, "utf8");
    return { relPath, status: "article-nav-updated" };
  }
  return { relPath, status: "ok" };
}

const navFiles = [
  { path: "index.html", prefix: "" },
  { path: "ghostwriting.html", prefix: "" },
  { path: "blog-post.html", prefix: "" },
  ...Array.from({ length: 12 }, (_, i) => ({
    path: `newsletters/letter-${String(i + 1).padStart(2, "0")}.html`,
    prefix: "../",
  })),
  ...LEGACY_NEWSLETTER_ARTICLES.map((a) => ({ path: a.href, prefix: "" })),
];

const articleNavFiles = [
  { path: "index.html", prefix: "" },
  { path: "ghostwriting.html", prefix: "" },
  { path: "blog-post.html", prefix: "" },
];

const navResults = navFiles.map((f) => syncNav(f.path, f.prefix)).filter(Boolean);
const articleResults = articleNavFiles.map((f) => syncArticleNav(f.path, f.prefix)).filter(Boolean);

const navUpdated = navResults.filter((r) => r.status === "updated");
const articleUpdated = articleResults.filter((r) => r.status === "article-nav-updated");

console.log(`Nav synced on ${navResults.length} pages (${navUpdated.length} updated).`);
navUpdated.forEach((r) => console.log(`  · ${r.relPath}`));
console.log(`Article nav synced on ${articleResults.length} pages (${articleUpdated.length} updated).`);
articleUpdated.forEach((r) => console.log(`  · ${r.relPath}`));
