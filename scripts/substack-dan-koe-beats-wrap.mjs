/**
 * Wraps long-form letter content in Dan Koe 7-beat spine
 * (thesis → mechanism → core essay → limbo → objection → engineer → close)
 */
import { BEAT_ARTICLES } from "./substack-dan-koe-beats.mjs";
import { BEAT_DEPTH } from "./substack-dan-koe-beats-expand.mjs";

function isTacticalSection(s) {
  if (s.type === "ul") return true;
  if (s.type === "h2" && /this week|steal|run it|your turn|write yours|build your|14-day/i.test(s.text)) return true;
  return false;
}

/** Extract spine sections from full beat template */
function extractSpine(full) {
  const thesisEnd = full.findIndex((s) => s.type === "h3");
  const limboIdx = full.findIndex((s) => s.type === "limbo");
  const objectionIdx = full.findIndex((s) => s.type === "objection");
  const stepsIdx = full.findIndex((s) => s.type === "steps");
  const closeIdx = full.findIndex((s, i) => s.type === "p" && /thank you for reading/i.test(s.text));

  return {
    thesis: full.slice(0, thesisEnd > 0 ? thesisEnd : 4),
    mechanism: thesisEnd > 0 ? full.slice(thesisEnd, limboIdx > 0 ? limboIdx : thesisEnd + 3) : [],
    limbo: limboIdx > 0 ? full.slice(limboIdx, objectionIdx > 0 ? objectionIdx : limboIdx + 2) : [],
    objection: objectionIdx > 0 ? full.slice(objectionIdx, stepsIdx > 0 ? stepsIdx : objectionIdx + 1) : [],
    engineer: stepsIdx > 0 ? full.slice(stepsIdx, closeIdx > 0 ? closeIdx : stepsIdx + 1) : [],
    close: closeIdx > 0 ? [full[closeIdx]] : [{ type: "p", text: "Thank you for reading." }],
  };
}

const SPINE_CACHE = {};

function getSpine(num) {
  if (!SPINE_CACHE[num]) {
    const full = BEAT_ARTICLES[num];
    if (full) SPINE_CACHE[num] = extractSpine(full);
  }
  return SPINE_CACHE[num];
}

export function applyDanKoeBeats(letter) {
  const spine = getSpine(letter.num);
  if (!spine) return letter;

  const core = letter.sections
    .filter((s) => !isTacticalSection(s))
    .map((s) => (s.type === "h2" ? { ...s, type: "h3" } : s));

  let sections = [
    ...spine.thesis,
    ...spine.mechanism,
    ...core,
    ...spine.limbo,
    ...spine.objection,
    ...(BEAT_DEPTH[letter.num] || []),
    ...spine.engineer,
    ...spine.close,
  ];

  // Deduplicate adjacent identical paragraphs
  sections = sections.filter((s, i, arr) => {
    if (i === 0) return true;
    const prev = arr[i - 1];
    if (s.type === "p" && prev.type === "p" && s.text === prev.text) return false;
    return true;
  });

  return { ...letter, sections };
}
