/**
 * Export woodcut hero SVGs → PNG for article covers.
 * Run: node scripts/export_woodcut_hero_pngs.mjs [start] [end]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { getHeroSvg } from "./substack-dan-koe-heroes.mjs";
import { allCoverIds } from "./article-cover-registry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO_DIR = path.join(ROOT, "assets", "newsletter-dan-koe");
const PNG_DIR = path.join(HERO_DIR, "png");

function pad(n) {
  return String(n).padStart(2, "0");
}

async function exportOne(browser, num) {
  const svg = getHeroSvg(num);
  const svgFile = path.join(HERO_DIR, `email-${pad(num)}-hero.svg`);
  const pngFile = path.join(PNG_DIR, `email-${pad(num)}-hero-woodcut.png`);
  fs.writeFileSync(svgFile, svg, "utf8");

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
  await page.setContent(
    `<!DOCTYPE html><html><body style="margin:0;background:#f3f1ec">${svg}</body></html>`,
    { waitUntil: "networkidle0" }
  );
  const el = await page.$("svg");
  if (!el) throw new Error(`No SVG found for hero ${num}`);
  await el.screenshot({ path: pngFile, type: "png" });
  await page.close();
  return pngFile;
}

const start = Number(process.argv[2]) || 13;
const end = Number(process.argv[3]) || 38;
const ids = process.argv[2] ? [] : [...new Set(allCoverIds())].sort((a, b) => a - b);
const toExport = ids.length ? ids.filter((n) => n >= 13) : Array.from({ length: end - start + 1 }, (_, i) => start + i);

fs.mkdirSync(PNG_DIR, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  for (const num of toExport) {
    const out = await exportOne(browser, num);
    console.log(`Exported hero ${pad(num)} → ${path.relative(ROOT, out)}`);
  }
} finally {
  await browser.close();
}

console.log(`Done — ${toExport.length} woodcut PNGs`);
