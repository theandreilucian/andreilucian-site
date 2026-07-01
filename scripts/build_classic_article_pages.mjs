/**
 * Rebuild classic article-*.html pages in Dan Koe letter style.
 * Run: node scripts/build_classic_article_pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";
import { CLASSIC_ARTICLE_BODIES } from "./classic-article-content.mjs";
import { CLASSIC_HERO_MAP, CLASSIC_DATE_MAP } from "./newsletter-hero-map.mjs";
import { renderDanKoeLetterPage } from "./dan-koe-letter-page.mjs";
import { renderLetterProductCta } from "./letter-product-cta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const HERO_MAP = CLASSIC_HERO_MAP;
const DATE_MAP = CLASSIC_DATE_MAP;

function stripArticleExtras(body) {
  return body
    .replace(/<figure class="article-feature">[\s\S]*?<\/figure>/g, "")
    .replace(/<section class="article-help">[\s\S]*?<\/section>/g, "")
    .replace(/<div class="cta-block">[\s\S]*?<\/div>/g, "")
    .replace(/<aside class="koe-product-cta">[\s\S]*?<\/aside>/g, "")
    .replace(/<section class="koe-ready-cta">[\s\S]*?<\/section>/g, "")
    .replace(/<div class="article-meta">[\s\S]*?<\/div>/g, "")
    .replace(/<p>Thank you for reading\.<\/p>\s*/gi, "")
    .trim();
}

function extractBody(html) {
  if (html.includes('class="koe-body"')) {
    const m = html.match(/<div class="koe-body"[^>]*>([\s\S]*?)<\/div>\s*<p class="koe-signoff">/);
    if (m) return stripArticleExtras(m[1]);
  }
  const match = html.match(/<article class="article-main">([\s\S]*?)<\/article>/);
  if (!match) return "";
  let body = match[1];
  body = body.replace(/<header class="article-header">[\s\S]*?<\/header>/, "");
  body = body.replace(/<section class="article-help">[\s\S]*?<\/section>/, "");
  body = body.replace(/<p class="article-signoff">[\s\S]*?<\/p>/, "");
  return stripArticleExtras(body);
}

function slugLabel(href) {
  return href.replace("article-", "").replace(".html", "").replace(/-/g, " ");
}

const articles = LEGACY_NEWSLETTER_ARTICLES.map((a, i) => {
  const filePath = path.join(ROOT, a.href);
  const bodyHtml =
    CLASSIC_ARTICLE_BODIES[a.href] || extractBody(fs.readFileSync(filePath, "utf8"));
  const prev = i > 0 ? LEGACY_NEWSLETTER_ARTICLES[i - 1] : null;
  const next = i < LEGACY_NEWSLETTER_ARTICLES.length - 1 ? LEGACY_NEWSLETTER_ARTICLES[i + 1] : null;

  const page = renderDanKoeLetterPage({
    title: a.title,
    deck: a.excerpt,
    dateLabel: DATE_MAP[a.href] || "2025",
    tag: a.meta.split("·")[0]?.trim() || "Letter",
    heroSrc: HERO_MAP[a.href] || "assets/newsletter-dan-koe/png/email-01-hero-woodcut.png",
    bodyHtml,
    productCtaHtml: renderLetterProductCta({ href: "0-to-1K-X-System/LANDING.html" }),
    assetPrefix: "",
    homeHref: "index.html#newsletters",
    prev: prev ? { href: prev.href, label: slugLabel(prev.href) } : null,
    next: next ? { href: next.href, label: slugLabel(next.href) } : null,
    readerMode: true,
  });

  fs.writeFileSync(filePath, page, "utf8");
  return a.href;
});

console.log(`Rebuilt ${articles.length} classic articles in Dan Koe letter style`);
