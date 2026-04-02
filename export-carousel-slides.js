/**
 * Export every carousel slide as JPEG into a folder per carousel.
 * Run: node export-carousel-slides.js
 * Output: carousel-exports/<carousel-name>/slide-01.jpg, slide-02.jpg, ...
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const WEBSITE_DIR = __dirname;
const EXPORTS_DIR = path.join(WEBSITE_DIR, 'carousel-exports');

const CAROUSELS = [
  'andrei-lucian-carousel-1-unlearn',
  'andrei-lucian-carousel-2-lines-repeat',
  'andrei-lucian-carousel-3-rules',
  'andrei-lucian-carousel-4-beliefs',
  'andrei-lucian-carousel-5-numbers-dont-move',
  'andrei-lucian-carousel-6-phrases-linkedin',
  'andrei-lucian-carousel-7-truths-building-public',
  'andrei-lucian-carousel-8-decisions',
  'andrei-lucian-carousel-8-slides',
  'andrei-lucian-carousel-9-impostor',
  'andrei-lucian-carousel-10-one-liners',
];

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function exportCarousel(browser, carouselName) {
  const htmlPath = path.join(WEBSITE_DIR, carouselName + '.html');
  if (!fs.existsSync(htmlPath)) {
    console.warn('  Skip (file not found): ' + htmlPath);
    return;
  }

  const outDir = path.join(EXPORTS_DIR, carouselName);
  fs.mkdirSync(outDir, { recursive: true });

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/').replace(/^\//, '');
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1400, deviceScaleFactor: 2 });
  await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
  await delay(800);

  const deckSelector = (await page.$('.deck')) ? '.deck' : '.carousel-wrap';
  const slideCount = await page.$$eval('.slide', (els) => els.length);

  for (let i = 0; i < slideCount; i++) {
    await page.evaluate((idx) => {
      const dots = document.querySelectorAll('#dots .dot, #dots button');
      if (dots[idx]) dots[idx].click();
    }, i);
    await delay(500);

    const el = await page.$(deckSelector);
    if (!el) {
      console.warn('  Slide ' + (i + 1) + ': deck not found');
      continue;
    }
    const num = String(i + 1).padStart(2, '0');
    const jpegPath = path.join(outDir, 'slide-' + num + '.jpg');
    await el.screenshot({
      path: jpegPath,
      type: 'jpeg',
      quality: 92,
    });
    console.log('  ' + carouselName + ' → slide-' + num + '.jpg');
  }

  await page.close();
}

async function main() {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
  console.log('Export folder: ' + EXPORTS_DIR + '\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const name of CAROUSELS) {
      console.log('Carousel: ' + name);
      await exportCarousel(browser, name);
      console.log('');
    }
    console.log('Done. JPEGs are in carousel-exports/<carousel-name>/');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
