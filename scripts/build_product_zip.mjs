#!/usr/bin/env node
/**
 * Package The X System for offline delivery (WinRAR-style folders + ZIP).
 * Run: node scripts/build_product_zip.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { PRODUCT, DELIVERY_MODULES, fileLocationMap } from "./product-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, "..");
const SOURCE = path.join(REPO, "0-to-1K-X-System");
const STAGE_ROOT = path.join(REPO, ".dist", PRODUCT.zipFolderName);
const ZIP_OUT = path.join(SOURCE, "downloads", PRODUCT.zipFileName);

const LOCATIONS = fileLocationMap();

const SYSTEM_FILES = [
  "product-styles.css",
  "product.js",
  "product-icon.svg",
  "tool-affiliates.js",
  "tool-stack.js",
];

const SKIP_FILES = new Set([
  "LANDING.html",
  "CHECKOUT.html",
  "GUMROAD-SALES-PAGE.html",
  "checkout-modal.css",
  "checkout-modal.js",
  "checkout-styles.css",
  "checkout.js",
  "landing-styles.css",
  "landing.js",
  "product-checkout.js",
  "product-gate.js",
  "product-unlock-bootstrap.js",
]);

function relPath(fromFolder, toFile) {
  if (!toFile || toFile.endsWith("/")) return toFile;
  const toFolder = LOCATIONS[toFile];
  if (toFolder === fromFolder) return toFile;
  if (!toFolder) return fromFolder ? `../${toFile}` : toFile;
  if (!fromFolder) return `${toFolder}/${toFile}`;
  return `../${toFolder}/${toFile}`;
}

function patchHtml(html, fromFolder) {
  const sys = fromFolder ? "../_system/" : "_system/";

  html = html.replace(/href="product-styles\.css[^"]*"/g, `href="${sys}product-styles.css"`);
  html = html.replace(/href="product-icon\.svg"/g, `href="${sys}product-icon.svg"`);
  html = html.replace(/src="product\.js[^"]*"/g, `src="${sys}product.js"`);
  html = html.replace(/src="tool-affiliates\.js[^"]*"/g, `src="${sys}tool-affiliates.js"`);
  html = html.replace(/src="tool-stack\.js[^"]*"/g, `src="${sys}tool-stack.js"`);
  html = html.replace(/<script src="product-gate\.js[^"]*"><\/script>\s*/g, "");
  html = html.replace(/<script src="product-unlock-bootstrap\.js[^"]*"><\/script>\s*/g, "");

  if (!html.includes("product-offline.js")) {
    html = html.replace("</head>", `<script src="${sys}product-offline.js"></script>\n</head>`);
  }

  const files = Object.keys(LOCATIONS);
  for (const file of files) {
    const target = relPath(fromFolder, file);
    const re = new RegExp(`(href|src)="${file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(#[^"]*)?"`, "g");
    html = html.replace(re, (_, attr, hash) => `${attr}="${target}${hash || ""}"`);
  }

  html = html.replace(/href="\.\.\/index\.html"/g, "href=\"https://andreilucian.com/\"");

  return html;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function writeOpenFirst() {
  const rows = DELIVERY_MODULES.map((mod) => {
    const links = mod.items
      .filter((i) => !i.file.endsWith("/"))
      .map((i) => `<li><a href="${mod.folder}/${i.file}">${i.label}</a></li>`)
      .join("");
    return `<div class="mod">
      <h2><a href="${mod.folder}/${mod.entry}">${mod.num} — ${mod.title}</a></h2>
      <p>${mod.summary}</p>
      <ul>${links}</ul>
    </div>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>OPEN FIRST — ${PRODUCT.name}</title>
  <link rel="icon" href="_system/product-icon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="_system/product-styles.css" />
  <style>
    body { max-width: 720px; margin: 0 auto; padding: 32px 20px 48px; font-family: Inter, system-ui, sans-serif; background: #050505; color: #f5f5f5; }
    h1 { font-size: 1.75rem; margin: 0 0 8px; }
    .lead { color: #8b8b8b; margin-bottom: 28px; line-height: 1.6; }
    .mod { border: 1px solid #262626; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; background: #121212; }
    .mod h2 { margin: 0 0 6px; font-size: 1rem; }
    .mod h2 a { color: #1d9bf0; text-decoration: none; }
    .mod p { margin: 0 0 10px; font-size: 0.88rem; color: #8b8b8b; }
    .mod ul { margin: 0; padding-left: 1.2rem; font-size: 0.9rem; }
    .mod li { margin: 4px 0; }
    .mod a { color: #e8e8e8; }
    .cta { display: inline-block; margin-top: 20px; padding: 14px 28px; background: #1d9bf0; color: #fff; text-decoration: none; border-radius: 999px; font-weight: 700; }
  </style>
</head>
<body>
  <h1>${PRODUCT.fullName}</h1>
  <p class="lead"><strong>Start here.</strong> Open <a href="INDEX.html">INDEX.html</a> for the online hub, or browse each folder below — same structure as your ZIP download.</p>
  ${rows}
  <a class="cta" href="INDEX.html">Open command center →</a>
</body>
</html>`;
  fs.writeFileSync(path.join(STAGE_ROOT, "OPEN-FIRST.html"), html);
}

function writeReadme() {
  const lines = [
    `${PRODUCT.fullName}`,
    `${PRODUCT.tagline}`,
    "",
    "OPEN FIRST: OPEN-FIRST.html (or INDEX.html for the hub)",
    "",
    "FOLDER MAP:",
    ...DELIVERY_MODULES.map((m) => `  ${m.folder}/ — ${m.title}`),
    "",
    "HOW TO USE:",
    "  1. Double-click OPEN-FIRST.html or INDEX.html",
    "  2. Follow folders 01 → 08 in order",
    "  3. Pin 07-Level 5 daily checklist for 90 days",
    "",
    `Built by ${PRODUCT.author} · ${PRODUCT.proof}`,
  ];
  fs.writeFileSync(path.join(STAGE_ROOT, "README.txt"), lines.join("\n"));
}

function rmDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
}

function build() {
  rmDir(STAGE_ROOT);
  fs.mkdirSync(path.join(STAGE_ROOT, "_system"), { recursive: true });
  fs.mkdirSync(path.dirname(ZIP_OUT), { recursive: true });

  for (const f of SYSTEM_FILES) {
    const src = path.join(SOURCE, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(STAGE_ROOT, "_system", f));
  }

  fs.writeFileSync(
    path.join(STAGE_ROOT, "_system", "product-offline.js"),
    "window.__X1K_OFFLINE__ = true;\n"
  );

  const htmlFiles = new Set(Object.keys(LOCATIONS));
  for (const mod of DELIVERY_MODULES) {
    for (const item of mod.items) {
      if (item.file.endsWith("/")) continue;
      htmlFiles.add(item.file);
    }
  }

  for (const file of htmlFiles) {
    const src = path.join(SOURCE, file);
    if (!fs.existsSync(src)) {
      console.warn("Skip missing:", file);
      continue;
    }
    const folder = LOCATIONS[file];
    const destDir = folder ? path.join(STAGE_ROOT, folder) : STAGE_ROOT;
    fs.mkdirSync(destDir, { recursive: true });
    let html = fs.readFileSync(src, "utf8");
    html = patchHtml(html, folder);
    fs.writeFileSync(path.join(destDir, file), html);
  }

  const bonusSrc = path.join(SOURCE, "07-Bonuses");
  const bonusDest = path.join(STAGE_ROOT, "08-Bonuses");
  if (fs.existsSync(bonusSrc)) {
    copyDir(bonusSrc, bonusDest);
    const bonusHub = path.join(bonusDest, "07-Bonuses.html");
    if (fs.existsSync(bonusHub)) {
      let html = fs.readFileSync(bonusHub, "utf8");
      html = patchHtml(html, "08-Bonuses");
      fs.writeFileSync(bonusHub, html);
    }
  }

  writeOpenFirst();
  writeReadme();

  rmDir(ZIP_OUT);
  const parent = path.dirname(STAGE_ROOT);
  const folderName = path.basename(STAGE_ROOT);
  try {
    execSync(
      `powershell -NoProfile -Command "Compress-Archive -Path '${folderName}' -DestinationPath '${ZIP_OUT.replace(/'/g, "''")}' -Force"`,
      { cwd: parent, stdio: "inherit" }
    );
  } catch (e) {
    console.error("ZIP failed — folder staged at:", STAGE_ROOT);
    throw e;
  }

  const mb = (fs.statSync(ZIP_OUT).size / (1024 * 1024)).toFixed(2);
  console.log(`\n✓ ZIP ready: ${ZIP_OUT} (${mb} MB)`);
  console.log(`✓ Staged folder: ${STAGE_ROOT}`);
}

build();
