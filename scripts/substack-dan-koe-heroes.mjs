/**
 * 12 woodcut-style hero illustrations — 1920×1080
 */
import { woodcutShell, shade, stipple, INK, MUTED, BG } from "./substack-dan-koe-woodcut.mjs";

const HEROES = {
  // 1 — Mask removed: generic vs real voice
  1: () => woodcutShell(1, "VOICE", "Your Lens", "specific beats generic", (p) => `
    <ellipse cx="960" cy="580" rx="280" ry="320" fill="none" stroke="${INK}" stroke-width="3"/>
    ${stipple(p, "M760 420 Q960 380 1160 420 Q1200 580 960 720 Q720 580 760 420")}
    <path d="M820 520 Q960 480 1100 520" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <path d="M900 560 Q960 540 1020 560" fill="none" stroke="${INK}" stroke-width="2"/>
    <!-- mask falling -->
    <path d="M700 380 Q780 340 860 380 L840 460 Q780 500 720 460 Z" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M700 380 Q780 340 860 380 L840 460 Q780 500 720 460 Z")}
    <line x1="750" y1="400" x2="720" y2="350" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4"/>
    <text x="680" y="330" font-family="Georgia,serif" font-size="16" fill="${INK}" font-style="italic">generic</text>
    <!-- eye/lens -->
    <ellipse cx="960" cy="540" rx="90" ry="55" fill="none" stroke="${INK}" stroke-width="3"/>
    <circle cx="960" cy="540" r="28" fill="${INK}"/>
    <circle cx="968" cy="532" r="8" fill="${BG}"/>`),

  // 2 — Hands on ledger
  2: () => woodcutShell(2, "EXPERIMENT", "30 Days", "track inputs only", (p) => `
    <rect x="620" y="400" width="680" height="440" rx="2" fill="none" stroke="${INK}" stroke-width="3"/>
  ${shade(p, "M620 400 H1300 V520 H620 Z")}
    <line x1="620" y1="520" x2="1300" y2="520" stroke="${INK}" stroke-width="2"/>
    <line x1="780" y1="400" x2="780" y2="840" stroke="${INK}" stroke-width="1" opacity="0.4"/>
    <line x1="960" y1="400" x2="960" y2="840" stroke="${INK}" stroke-width="1" opacity="0.4"/>
    <line x1="1140" y1="400" x2="1140" y2="840" stroke="${INK}" stroke-width="1" opacity="0.4"/>
    <!-- left hand -->
    <path d="M480 620 Q520 580 560 600 L580 680 Q540 720 500 700 Z" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M480 620 Q520 580 560 600 L580 680 Q540 720 500 700 Z")}
    <!-- right hand with quill -->
    <path d="M1380 580 Q1340 540 1300 560 L1280 640 Q1320 680 1360 660 Z" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <line x1="1290" y1="560" x2="1240" y2="480" stroke="${INK}" stroke-width="2"/>
    <text x="700" y="600" font-family="Georgia,serif" font-size="22" fill="${INK}">3</text>
    <text x="860" y="600" font-family="Georgia,serif" font-size="22" fill="${INK}">47</text>
    <text x="1040" y="600" font-family="Georgia,serif" font-size="22" fill="${INK}">52</text>`),

  // 3 — Sisyphus with boulder (Dan Koe style burden)
  3: () => woodcutShell(3, "TIMELINE", "Flat Months", "then the bend", (p) => `
    <path d="M280 820 L1640 820" stroke="${INK}" stroke-width="4"/>
    <!-- massive boulder -->
    <path d="M620 520 Q720 420 860 440 Q1020 460 1080 560 Q1120 640 1040 700 Q920 760 780 720 Q640 680 620 520" fill="none" stroke="${INK}" stroke-width="3.5"/>
    ${stipple(p, "M640 540 Q780 480 920 540 Q980 620 860 680 Q700 700 640 540")}
    ${shade(p, "M700 560 Q820 500 940 560 Q960 640 860 680 Q740 660 700 560")}
    <!-- muscular figure bent under weight -->
    <path d="M540 820 L560 680 Q580 620 640 580 L680 600 L660 680 L620 760 L600 820 Z" fill="none" stroke="${INK}" stroke-width="3"/>
    ${shade(p, "M560 640 Q600 600 640 580 L680 600 L660 660 L620 700 Z")}
    <path d="M600 820 L640 820 L650 720 L610 720 Z" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M660 820 L700 820 L690 720 L650 720 Z" fill="none" stroke="${INK}" stroke-width="2"/>
    <circle cx="615" cy="555" r="28" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M595 535 a28 30 0 1 1 40 0")}
    <!-- distant slope hint -->
    <path d="M1100 820 Q1300 700 1500 500 Q1580 400 1620 350" fill="none" stroke="${INK}" stroke-width="1.5" opacity="0.2" stroke-dasharray="6"/>
    <text x="960" y="880" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="${MUTED}" font-style="italic">the flat is the tutorial</text>`),

  // 4 — Figure at crossroads, one path chosen
  4: () => woodcutShell(4, "DECISION", "One Metric", "90 days · no switching", (p) => `
    <path d="M960 780 L960 480" stroke="${INK}" stroke-width="4"/>
    <path d="M960 580 L700 720" stroke="${INK}" stroke-width="2" opacity="0.25" stroke-dasharray="8"/>
    <path d="M960 580 L1220 720" stroke="${INK}" stroke-width="2" opacity="0.25" stroke-dasharray="8"/>
    <path d="M960 580 L960 350" stroke="${INK}" stroke-width="4"/>
    <!-- figure -->
    <circle cx="960" cy="420" r="35" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M945 405 a30 32 0 1 1 30 0")}
    <path d="M930 455 L920 560 L940 560 L950 455 Z M970 455 L980 560 L1000 560 L990 455 Z" fill="none" stroke="${INK}" stroke-width="2"/>
    ${shade(p, "M930 455 L950 455 L940 560 Z")}
    <rect x="880" y="300" width="160" height="44" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="960" y="330" text-anchor="middle" font-family="Georgia,serif" font-size="18" fill="${INK}" font-weight="700">REPLIES</text>`),

  // 5 — Open letter / envelope
  5: () => woodcutShell(5, "LETTER", "200 Followers", "dear past me", (p) => `
    <path d="M560 720 L560 420 L1360 420 L1360 720 Z" fill="none" stroke="${INK}" stroke-width="3"/>
    <path d="M560 420 L960 560 L1360 420" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M560 420 L960 560 L1360 420 L1360 500 L960 620 L560 500 Z")}
    <text x="620" y="500" font-family="Georgia,serif" font-size="22" fill="${INK}" font-style="italic">Dear Andrei at 200,</text>
    <text x="620" y="560" font-family="Georgia,serif" font-size="18" fill="${MUTED}" font-style="italic">don't quit.</text>
    <text x="1100" y="680" font-family="Georgia,serif" font-size="18" fill="${INK}" font-style="italic">— future you</text>
    <!-- wax seal -->
    <circle cx="960" cy="600" r="40" fill="none" stroke="${INK}" stroke-width="2"/>
    ${stipple(p, "M920 560 a40 40 0 1 1 80 0")}`),

  // 6 — Puppet hand / discipline (strings to figure) + gears
  6: () => woodcutShell(6, "OPERATOR", "The Machine", "inputs → lag → output", (p) => `
    <!-- giant hand from above -->
    <path d="M700 280 Q800 200 900 240 Q1000 280 1020 360 L980 400 Q900 380 840 420 Q780 460 760 520 L720 500 Q700 400 700 280" fill="none" stroke="${INK}" stroke-width="3"/>
    ${shade(p, "M720 300 Q800 240 880 280 Q920 340 880 400 Q820 420 780 460 L740 440 Q720 380 720 300")}
    <!-- strings -->
    <line x1="800" y1="420" x2="780" y2="560" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4"/>
    <line x1="880" y1="420" x2="900" y2="560" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4"/>
    <line x1="960" y1="400" x2="960" y2="560" stroke="${INK}" stroke-width="1.5" stroke-dasharray="4"/>
    <!-- small figure = you, on schedule -->
    <circle cx="840" cy="590" r="22" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M828 612 L828 680 M852 612 L852 680" stroke="${INK}" stroke-width="2"/>
    <!-- gears at base -->
    <circle cx="960" cy="740" r="70" fill="none" stroke="${INK}" stroke-width="2"/>
    ${stipple(p, "M900 670 a70 70 0 1 1 120 0")}
    <circle cx="960" cy="740" r="20" fill="${INK}"/>
    <text x="960" y="860" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${MUTED}" font-style="italic">the calendar controls you</text>`),

  // 7 — Hand releasing paper boat (shipped post)
  7: () => woodcutShell(7, "AUTOPSY", "One Post", "11 likes · 4 DMs", (p) => `
    <!-- cupped hand -->
    <path d="M700 700 Q760 620 840 640 Q920 660 960 720 Q900 780 820 760 Q740 740 700 700" fill="none" stroke="${INK}" stroke-width="3"/>
    ${shade(p, "M700 700 Q760 620 840 640 Q920 660 960 720 Q900 780 820 760 Q740 740 700 700")}
    <!-- paper -->
    <rect x="880" y="480" width="160" height="120" rx="2" fill="none" stroke="${INK}" stroke-width="2.5" transform="rotate(-8 960 540)"/>
    <line x1="900" y1="520" x2="1020" y2="510" stroke="${INK}" stroke-width="1.5" transform="rotate(-8 960 540)"/>
    <line x1="900" y1="550" x2="1000" y2="542" stroke="${INK}" stroke-width="1.5" transform="rotate(-8 960 540)"/>
    <text x="940" y="580" font-family="Georgia,serif" font-size="14" fill="${INK}" transform="rotate(-8 960 540)">Month 2. $0.</text>
    <text x="1100" y="640" font-family="Georgia,serif" font-size="16" fill="${INK}" font-style="italic">shipped anyway</text>`),

  // 8 — Scales: light vs heavy
  8: () => woodcutShell(8, "RECEIPTS", "Advice vs Proof", "which one spreads", (p) => `
    <line x1="960" y1="380" x2="960" y2="780" stroke="${INK}" stroke-width="4"/>
    <line x1="700" y1="420" x2="1220" y2="420" stroke="${INK}" stroke-width="3"/>
    <line x1="700" y1="420" x2="700" y2="580" stroke="${INK}" stroke-width="2"/>
    <line x1="1220" y1="420" x2="1220" y2="520" stroke="${INK}" stroke-width="2"/>
    <!-- left pan - light -->
    <ellipse cx="700" cy="600" rx="100" ry="20" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M640 600 Q700 680 760 600" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="700" y="560" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${MUTED}">"post more"</text>
    <!-- right pan - heavy -->
    <ellipse cx="1220" cy="560" rx="100" ry="20" fill="none" stroke="${INK}" stroke-width="2"/>
    ${shade(p, "M1160 560 Q1220 660 1280 560 L1280 540 Q1220 520 1160 540 Z")}
    <text x="1220" y="520" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">$223 · 50 replies</text>`),

  // 9 — Many hands / replies
  9: () => woodcutShell(9, "FIELD REPORT", "50 Replies", "7 days in the threads", (p) => `
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const x = 520 + i * 130;
      const h = 120 + i * 35;
      return `<path d="M${x} 780 L${x + 20} ${780 - h} L${x + 50} ${780 - h + 30} L${x + 70} 780 Z" fill="none" stroke="${INK}" stroke-width="2"/>
      ${i > 2 ? shade(p, `M${x + 5} ${780 - h + 40} L${x + 45} ${780 - h + 50} L${x + 55} ${780 - 20} L${x + 15} ${780 - 10} Z`) : ""}`;
    }).join("")}
    <text x="960" y="850" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="${INK}" font-style="italic">awkward → pattern → DMs</text>`),

  // 10 — Two doors / pillars
  10: () => woodcutShell(10, "PLATFORMS", "Two Games", "𝕏 speed · LinkedIn depth", (p) => `
    <rect x="480" y="360" width="360" height="480" fill="none" stroke="${INK}" stroke-width="3"/>
    ${shade(p, "M480 360 H840 V480 H480 Z")}
    <text x="660" y="430" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="${INK}">𝕏</text>
    <text x="660" y="700" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="${INK}">5.3K</text>
    <rect x="1080" y="360" width="360" height="480" fill="none" stroke="${INK}" stroke-width="3"/>
    <text x="1260" y="430" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="${INK}">LINKEDIN</text>
    <text x="1260" y="700" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="${INK}">16.2K</text>
    <line x1="960" y1="360" x2="960" y2="840" stroke="${INK}" stroke-width="2"/>`),

  // 11 — Open cupped hands (trust) — Dan Koe reference style
  11: () => woodcutShell(11, "NEWSLETTER", "Trust", "they open because they know you", (p) => `
    <!-- left hand -->
    <path d="M620 760 Q680 480 780 520 Q860 560 900 640 Q860 760 760 800 Q660 800 620 760" fill="none" stroke="${INK}" stroke-width="3.5"/>
    ${shade(p, "M620 760 Q680 480 780 520 Q860 560 900 640 Q860 760 760 800 Q660 800 620 760")}
    ${stipple(p, "M660 600 Q740 560 820 600 Q860 660 780 700 Q700 680 660 600")}
    <!-- right hand -->
    <path d="M1300 760 Q1240 480 1140 520 Q1060 560 1020 640 Q1060 760 1160 800 Q1260 800 1300 760" fill="none" stroke="${INK}" stroke-width="3.5"/>
    ${shade(p, "M1300 760 Q1240 480 1140 520 Q1060 560 1020 640 Q1060 760 1160 800 Q1260 800 1300 760")}
    ${stipple(p, "M1260 600 Q1180 560 1100 600 Q1060 660 1140 700 Q1220 680 1260 600")}
    <!-- light rays / offering -->
    <line x1="960" y1="380" x2="960" y2="480" stroke="${INK}" stroke-width="1" opacity="0.3"/>
    <line x1="900" y1="400" x2="940" y2="490" stroke="${INK}" stroke-width="1" opacity="0.25"/>
    <line x1="1020" y1="400" x2="980" y2="490" stroke="${INK}" stroke-width="1" opacity="0.25"/>
    <text x="960" y="880" text-anchor="middle" font-family="Georgia,serif" font-size="20" fill="${INK}">1,100+ subscribers</text>`),

  // 12 — Long winding stairs (compound, no spike)
  12: () => woodcutShell(12, "CASE STUDY", "5.3K Organic", "zero viral posts", (p) => `
    ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
      const x = 400 + i * 110;
      const y = 780 - i * 45;
      return `<path d="M${x} ${y} H${x + 100} V${y + 50} H${x}" fill="none" stroke="${INK}" stroke-width="2.5"/>
      ${i % 2 ? stipple(p, `M${x + 2} ${y + 2} H${x + 98} V${y + 48} H${x + 2} Z`) : ""}`;
    }).join("")}
    <!-- small figure climbing -->
    <circle cx="520" cy="700" r="16" fill="none" stroke="${INK}" stroke-width="2"/>
    <path d="M508 716 L508 760 M520 716 L532 760" stroke="${INK}" stroke-width="2"/>
    <text x="960" y="860" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${MUTED}" font-style="italic">3 years · daily reps · no lottery</text>`),
};

export function getHeroSvg(num) {
  return (HEROES[num] || HEROES[1])();
}

export function getHeroCaption(num) {
  const caps = {
    1: "Removing the generic mask — finding your voice",
    2: "Hands on the ledger — 30-day input tracking",
    3: "The flat months — pushing through the plateau",
    4: "One path chosen — single metric for 90 days",
    5: "Letter to yourself at 200 followers",
    6: "The machine — gears that run daily",
    7: "Shipping the post you almost deleted",
    8: "Scales — advice vs proof",
    9: "Hands in the threads — 50 replies",
    10: "Two doors — 𝕏 and LinkedIn",
    11: "Open hands — newsletter trust",
    12: "The long climb — compound growth",
  };
  return caps[num] || "";
}
