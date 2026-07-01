/**
 * Long-form newsletter formatter — varied section types + unique visuals
 */
import { X_LANDING } from "./substack-3day-format.mjs";

export const WORD_TARGETS = { min: 250, max: 2200 };

export const SOFT_CTA = `When your system is sharp enough to ship daily:

The X System → 0 to 1K followers in 90 days
${X_LANDING}`;

const CLOSINGS = {
  essay: "That's the work.",
  experiment: "Run the experiment. Report back.",
  timeline: "The flat ends. Keep walking.",
  decision: "Pick. Write it down. Execute.",
  epistle: "Don't quit. — Andrei",
  manual: "Build the machine. Trust the lag.",
  autopsy: "Ship the scary one.",
  contrast: "Write receipts, not tips.",
  diary: "Log it. Adjust. Repeat.",
  "split-test": "Two weeks. One platform. Go.",
  "case-study": "Boring wins. Don't quit.",
};

export function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function stripHtml(s) {
  return String(s).replace(/<[^>]+>/g, "");
}

function sectionToPlain(s) {
  switch (s.type) {
    case "h2":
      return `\n### ${s.text}\n`;
    case "quote":
      return `\n> ${stripHtml(s.text)}${s.cite ? ` — ${s.cite}` : ""}\n`;
    case "pull":
      return `\n*${stripHtml(s.text)}*\n`;
    case "framework":
      return `\n**${s.title}**\n\n${s.items.map((item, i) => `${i + 1}. ${stripHtml(item)}`).join("\n")}\n`;
    case "ul":
      return `\n${s.items.map((item) => `→ ${stripHtml(item)}`).join("\n")}\n`;
    case "log":
      return `\n${s.items.map((item) => `· ${stripHtml(item)}`).join("\n")}\n`;
    case "timeline":
      return `\n${s.items.map((item) => `· ${stripHtml(item)}`).join("\n")}\n`;
    case "stats":
      return `\n${s.items.map((item) => `${item.label}: ${item.value}`).join("\n")}\n`;
    case "compare":
      return `\n${s.rows.map((r) => `${r.label}\n  + ${stripHtml(r.good)}\n  − ${stripHtml(r.bad)}`).join("\n\n")}\n`;
    case "split":
      return `\n${s.left.title}:\n${s.left.lines.map((l) => `  · ${l}`).join("\n")}\n\n${s.right.title}:\n${s.right.lines.map((l) => `  · ${l}`).join("\n")}\n`;
    case "diagram":
      return `\n[${s.caption}]\n`;
    case "divider":
      return "\n---\n";
    case "lead":
    case "p":
    default:
      return `${stripHtml(s.text)}\n`;
  }
}

export function sectionsToPlain(sections) {
  return sections.map(sectionToPlain).join("\n").trim();
}

export function formatDanKoeLetter(letter) {
  const closing = CLOSINGS[letter.format] || "That's it.";
  const body = `${sectionsToPlain(letter.sections)}\n\n${closing}\n\n— Andrei\n\n—\n\n${SOFT_CTA}`;
  const words = wordCount(body);
  const pasteBlock = `SUBJECT: ${letter.subject}\nPREHEADER: ${letter.preheader}\n\n---\n\n${body}`;
  return {
    subject: letter.subject,
    preheader: letter.preheader,
    body,
    pasteBlock,
    words,
    inRange: words >= WORD_TARGETS.min && words <= WORD_TARGETS.max,
    readMin: letter.readMin || Math.max(5, Math.round(words / 250)),
  };
}

export function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function sectionsToHtml(sections) {
  return sections
    .map((s) => {
      switch (s.type) {
        case "h2":
          return `<h2>${escHtml(s.text)}</h2>`;
        case "quote":
          return `<blockquote>${s.text}${s.cite ? `<cite>— ${escHtml(s.cite)}</cite>` : ""}</blockquote>`;
        case "pull":
          return `<p class="pull">${s.text}</p>`;
        case "framework":
          return `<div class="framework"><div class="framework-title">${escHtml(s.title)}</div><ol>${s.items.map((item) => `<li>${item}</li>`).join("")}</ol></div>`;
        case "ul":
          return `<ul>${s.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
        case "log":
          return `<div class="log-block">${s.items.map((item) => `<div class="log-row">${item}</div>`).join("")}</div>`;
        case "timeline":
          return `<div class="timeline">${s.items.map((item, i) => `<div class="tl-row"><span class="tl-dot"></span><div class="tl-text">${item}</div></div>`).join("")}</div>`;
        case "stats":
          return `<div class="stats-grid">${s.items.map((item) => `<div class="stat-card"><span class="stat-val">${escHtml(item.value)}</span><span class="stat-label">${escHtml(item.label)}</span></div>`).join("")}</div>`;
        case "compare":
          return `<div class="compare-grid">${s.rows.map((r) => `<div class="compare-card"><h4>${escHtml(r.label)}</h4><p class="good">+ ${r.good}</p><p class="bad">− ${r.bad}</p></div>`).join("")}</div>`;
        case "split":
          return `<div class="split-grid"><div class="split-col"><h4>${escHtml(s.left.title)}</h4>${s.left.lines.map((l) => `<p>${escHtml(l)}</p>`).join("")}</div><div class="split-col accent"><h4>${escHtml(s.right.title)}</h4>${s.right.lines.map((l) => `<p>${escHtml(l)}</p>`).join("")}</div></div>`;
        case "diagram":
          return `<div class="inline-diagram">${s.svg}<div class="diagram-cap">${escHtml(s.caption)}</div></div>`;
        case "divider":
          return `<hr class="divider" />`;
        case "lead":
          return `<p class="lead">${s.text}</p>`;
        case "p":
        default:
          return `<p>${s.text}</p>`;
      }
    })
    .join("\n");
}
