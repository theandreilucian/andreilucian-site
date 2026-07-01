/**
 * Client-side script: copy full newsletter (hero + text + diagrams) as rich HTML for Substack.
 * Injected into preview / paste-kit HTML pages.
 */
export const RICH_PASTE_JS = `
function waitForImg(img) {
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return new Promise((res, rej) => {
    img.onload = () => res();
    img.onerror = () => rej(new Error('Image failed to load'));
  });
}

function imgToDataUrl(img, maxW) {
  const cap = maxW || 1456;
  let w = img.naturalWidth;
  let h = img.naturalHeight;
  if (!w || !h) throw new Error('Image has no dimensions');
  if (w > cap) { h = Math.round(h * cap / w); w = cap; }
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  return canvas.toDataURL('image/png', 0.92);
}

function svgElToDataUrl(svg) {
  const xml = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([xml], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const vb = svg.viewBox && svg.viewBox.baseVal;
        const w = (vb && vb.width) || svg.width.baseVal.value || 900;
        const h = (vb && vb.height) || svg.height.baseVal.value || 300;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL('image/png', 0.92));
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('SVG render failed')); };
    img.src = url;
  });
}

function stripClasses(root) {
  root.querySelectorAll('[class]').forEach((el) => el.removeAttribute('class'));
  root.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));
}

async function inlineDiagrams(root) {
  const diagrams = [...root.querySelectorAll('.inline-diagram')];
  for (const diagram of diagrams) {
    const svg = diagram.querySelector('svg');
    const imgEl = diagram.querySelector('img');
    const cap = diagram.querySelector('.diagram-cap, figcaption')?.textContent?.trim() || diagram.querySelector('img')?.alt || '';
    let dataUrl;
    if (svg) {
      dataUrl = await svgElToDataUrl(svg);
    } else if (imgEl) {
      await waitForImg(imgEl);
      dataUrl = imgToDataUrl(imgEl);
    } else {
      continue;
    }
    const fig = document.createElement('figure');
    const img = document.createElement('img');
    img.src = dataUrl;
    img.alt = cap || 'Diagram';
    img.setAttribute('style', 'width:100%;max-width:100%;height:auto;display:block;margin:24px 0');
    fig.appendChild(img);
    if (cap) {
      const fc = document.createElement('figcaption');
      fc.textContent = cap;
      fig.appendChild(fc);
    }
    diagram.replaceWith(fig);
  }
}

async function buildRichPostHtml(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) throw new Error('Post not found');

  const hero = section.querySelector('[data-hero-img]');
  const letter = section.querySelector('[data-letter-root]');
  if (!hero || !letter) throw new Error('Missing hero or letter');

  await waitForImg(hero);
  const heroUrl = imgToDataUrl(hero);

  const clone = letter.cloneNode(true);
  await inlineDiagrams(clone);
  stripClasses(clone);

  const wrap = document.createElement('div');
  const heroEl = document.createElement('img');
  heroEl.src = heroUrl;
  heroEl.alt = clone.querySelector('h1')?.textContent || 'Newsletter hero';
  heroEl.setAttribute('style', 'width:100%;max-width:100%;height:auto;display:block;margin:0 0 24px');
  wrap.appendChild(heroEl);
  wrap.appendChild(clone);

  return { html: wrap.innerHTML, plain: wrap.innerText };
}

async function copyRichPost(sectionId, btn) {
  try {
    const { html, plain } = await buildRichPostHtml(sectionId);
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Clipboard API unavailable');
    }
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plain], { type: 'text/plain' }),
      }),
    ]);
    if (btn) flashBtn(btn, 'Copied! Paste in Substack');
  } catch (e) {
    alert(
      'Could not copy full post.\\n\\n' +
      '1. Open substack-12-emails-dan-koe-style.html in Chrome or Edge\\n' +
      '2. Click Copy full post again\\n' +
      '3. In Substack → click Start writing… → Ctrl+V\\n\\n' +
      'If it still fails, run: npx serve . in the Website folder and open via localhost.'
    );
  }
}

document.querySelectorAll('[data-copy-rich]').forEach((btn) => {
  btn.addEventListener('click', () => copyRichPost(btn.dataset.copyRich, btn));
});
`;
