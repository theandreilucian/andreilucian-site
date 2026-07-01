/**
 * Sync Dan Koe footer markup across public site pages.
 * Run: node scripts/sync_site_footer.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderSiteFooter } from "./site-footer.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const FOOTER_RE = /<footer class="koe-footer">[\s\S]*?<\/footer>/;
const footer = renderSiteFooter().trim();

function syncFile(relPath) {
  const abs = path.join(ROOT, relPath);
  if (!fs.existsSync(abs)) return null;

  let html = fs.readFileSync(abs, "utf8");
  const before = html;

  if (FOOTER_RE.test(html)) {
    html = html.replace(FOOTER_RE, footer);
  } else if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `\n  ${footer}\n</body>`);
  } else {
    return { relPath, status: "skipped" };
  }

  if (html !== before) {
    fs.writeFileSync(abs, html, "utf8");
    return { relPath, status: "updated" };
  }
  return { relPath, status: "ok" };
}

const files = [
  "index.html",
  "ghostwriting.html",
  "blog.html",
  "blog-post.html",
  "offers.html",
  ...Array.from({ length: 12 }, (_, i) => `newsletters/letter-${String(i + 1).padStart(2, "0")}.html`),
  ...LEGACY_NEWSLETTER_ARTICLES.map((a) => a.href),
];

const results = files.map(syncFile).filter(Boolean);
const updated = results.filter((r) => r.status === "updated");
const added = results.filter((r) => r.status === "added");

console.log(`Footer synced on ${results.length} pages (${updated.length} updated).`);
if (updated.length) {
  updated.forEach((r) => console.log(`  · ${r.relPath}`));
}
