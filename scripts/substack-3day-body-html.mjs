/**
 * Plain-text Substack body → public letter HTML (woodcut diagram inline).
 */
import { escHtml } from "./substack-dan-koe-format.mjs";

export function stripPublicBody(text) {
  return String(text)
    .replace(/\n?— Andrei[\s\S]*$/i, "")
    .replace(/\n?P\.S\.[\s\S]*$/i, "")
    .replace(/Thank you for reading\.?\s*/gi, "")
    .trim();
}

export function bodyWithDiagramHtml(text, diagramRel, caption) {
  const blocks = String(text)
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("### ")) return `<h2>${escHtml(t.slice(4))}</h2>`;
      if (t.startsWith("> ")) return `<blockquote>${escHtml(t.slice(2))}</blockquote>`;
      if (t.startsWith("→ ")) {
        const items = t.split("\n").filter((l) => l.startsWith("→ "));
        return `<ul>${items.map((l) => `<li>${escHtml(l.slice(2))}</li>`).join("")}</ul>`;
      }
      return `<p>${escHtml(t).replace(/\n/g, "<br/>")}</p>`;
    })
    .filter(Boolean);

  if (!diagramRel) return blocks.join("\n");

  const at = Math.min(3, blocks.length);
  blocks.splice(
    at,
    0,
    `<div class="inline-diagram"><img src="${escHtml(diagramRel)}" alt="${escHtml(caption || "")}" style="width:100%;display:block" /><div class="diagram-cap">${escHtml(caption || "")}</div></div>`
  );
  return blocks.join("\n");
}

export function publicBodyHtml(substackBody, diagramRel, caption) {
  return bodyWithDiagramHtml(stripPublicBody(substackBody), diagramRel, caption);
}
