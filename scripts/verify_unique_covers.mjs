import fs from "fs";

const html = fs.readFileSync("index.html", "utf8");
const imgs = [...html.matchAll(/<img src="([^"]+)" alt="" loading="lazy"/g)].map((m) => m[1]);
const counts = {};
for (const img of imgs) counts[img] = (counts[img] || 0) + 1;
const dups = Object.entries(counts).filter(([, c]) => c > 1);

console.log(`Total cards: ${imgs.length}`);
console.log(`Unique covers: ${Object.keys(counts).length}`);
if (dups.length) {
  console.log("DUPLICATES:");
  for (const [p, c] of dups) console.log(`${c}x ${p}`);
  process.exit(1);
}
console.log("No duplicate covers.");
