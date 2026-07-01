/**
 * Write woodcut hero SVG files (13–38) for unique article covers.
 * Run: node scripts/write_woodcut_hero_svgs.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getHeroSvg } from "./substack-dan-koe-heroes.mjs";
import { allCoverIds } from "./article-cover-registry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO_DIR = path.join(ROOT, "assets", "newsletter-dan-koe");

function pad(n) {
  return String(n).padStart(2, "0");
}

const ids = [...new Set(allCoverIds())].filter((n) => n >= 13).sort((a, b) => a - b);

fs.mkdirSync(HERO_DIR, { recursive: true });

for (const num of ids) {
  const file = path.join(HERO_DIR, `email-${pad(num)}-hero.svg`);
  fs.writeFileSync(file, getHeroSvg(num), "utf8");
  console.log(`Wrote ${path.relative(ROOT, file)}`);
}

console.log(`Done — ${ids.length} hero SVGs`);
