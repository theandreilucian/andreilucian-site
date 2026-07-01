/**
 * Woodcut / engraving visual system — Dan Koe blog aesthetic
 * B&W · stippling · cross-hatch · symbolic metaphors
 */

export const BG = "#f3f1ec";
export const INK = "#141414";
export const MUTED = "#5a5a5a";

export function woodcutShell(id, label, title, sub, illustration) {
  const pid = `wc${id}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <pattern id="${pid}-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="10" stroke="${INK}" stroke-width="1.2" opacity="0.35"/>
    </pattern>
    <pattern id="${pid}-hatch2" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
      <line x1="0" y1="0" x2="0" y2="10" stroke="${INK}" stroke-width="1.2" opacity="0.35"/>
    </pattern>
    <pattern id="${pid}-stipple" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="0.9" fill="${INK}" opacity="0.45"/>
      <circle cx="5" cy="4" r="0.7" fill="${INK}" opacity="0.3"/>
    </pattern>
    <filter id="${pid}-paper">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="n"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.045"/></feComponentTransfer>
      <feBlend in="SourceGraphic" in2="n" mode="multiply"/>
    </filter>
    <mask id="${pid}-fade"><rect width="1920" height="1080" fill="white"/>
      <rect x="0" y="900" width="1920" height="180" fill="url(#${pid}-grad)"/>
    </mask>
    <linearGradient id="${pid}-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="black" stop-opacity="0"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.15"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="${BG}" filter="url(#${pid}-paper)"/>
  <text x="960" y="88" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="${MUTED}" letter-spacing="8">${label}</text>
  <text x="960" y="155" text-anchor="middle" font-family="Georgia,serif" font-size="46" fill="${INK}" font-weight="700">${title}</text>
  <text x="960" y="200" text-anchor="middle" font-family="Georgia,serif" font-size="19" fill="${MUTED}" font-style="italic">${sub}</text>
  <g mask="url(#${pid}-fade)">${illustration(pid)}</g>
  <text x="960" y="1045" text-anchor="middle" font-family="Inter,system-ui,sans-serif" font-size="11" fill="#999" letter-spacing="4">ANDREI LUCIAN &#183; NEWSLETTER</text>
</svg>`;
}

/** Shaded area — crosshatch fill */
export function shade(pid, d) {
  return `<path d="${d}" fill="url(#${pid}-hatch)"/><path d="${d}" fill="url(#${pid}-hatch2)" opacity="0.5"/>`;
}

export function stipple(pid, d) {
  return `<path d="${d}" fill="url(#${pid}-stipple)"/>`;
}

export function diagramWoodcut(id, w, h, cap, draw) {
  const pid = `d${id}`;
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <pattern id="${pid}-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width="1" opacity="0.4"/>
    </pattern>
    <pattern id="${pid}-stipple" width="5" height="5" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.8" fill="${INK}" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  ${draw(pid)}
</svg>`;
  return { caption: cap, svg, exportSvg: svg };
}
