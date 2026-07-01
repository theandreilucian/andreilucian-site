/**
 * Dan Koe letter structure — reverse-engineered from
 * https://thedankoe.com/letters/self-discipline-is-easy-actually/
 *
 * Seven beats every great Koe letter hits:
 */
export const DAN_KOE_BEATS = [
  {
    id: "thesis",
    name: "Contrarian thesis",
    purpose: "One-line hook that attacks a common belief. Not a question — a verdict.",
    danExample: "If you have to force yourself to do it, you will lose.",
    andreiAngle: "Open with a blunt verdict about growth/content, not a tip list.",
  },
  {
    id: "mechanism",
    name: "Mechanism + insight",
    purpose: "Explain WHY via a chain (goals → filter → behavior → identity). Italic insight line.",
    danExample: "You are already disciplined toward the exact goals you are supposed to be.",
    andreiAngle: "Inputs → lag → output. Or: repository vs lens. Always a causal chain.",
  },
  {
    id: "limbo",
    name: "Name the pain state",
    purpose: "Give language to where the reader is stuck. List what they're starting to notice.",
    danExample: "Limbo is the laboratory",
    andreiAngle: "Month 4. Flat graph. Casino thinking. Tutorial phase. Name it.",
  },
  {
    id: "discovery",
    name: "Personal discovery story",
    purpose: "Long scene with timeline — what failed before, what clicked, environment change.",
    danExample: "12 years gym, 5 years writing — fell off multiple times before it stuck",
    andreiAngle: "Month 1: $0. Seven months flat. The spreadsheet experiment. Witness writing.",
  },
  {
    id: "objection",
    name: "Handle the pushback",
    purpose: "Voice the reader's excuse, then dismantle it with personal counterexample.",
    danExample: "But Dan! Those are easy and comfortable!",
    andreiAngle: "But Andrei! That's just hustle porn / I don't have time / 𝕏 is dead",
  },
  {
    id: "engineer",
    name: "How to engineer X",
    purpose: "4 bold steps with theory + action. The actionable framework at the END.",
    danExample: "How to engineer an identity — recognition, dissonance, environment, experiment",
    andreiAngle: "How to engineer a growth machine / voice / trust bank — 4 steps",
  },
  {
    id: "close",
    name: "Warm close",
    purpose: "Short human sign-off. CTA is separate, not mixed into the essay.",
    danExample: "Thank you for reading. – Dan",
    andreiAngle: "Thank you for reading. — Andrei",
  },
];

/** Section types that map to Dan Koe's visual rhythm */
export const SECTION_TYPES = {
  lead: "Contrarian opening paragraph (slightly larger)",
  insight: "Italic thesis — the one sentence they'll remember",
  h3: "Narrative beat title — memorable phrase, not generic label",
  h2: "Framework header — rare, for numbered systems only",
  mechanism: "Arrow chain: A → B → C → D",
  limbo: "Bullet list of what reader is starting to notice",
  objection: "But [name]! reader pushback + rebuttal",
  story: "Extended personal narrative block",
  steps: "Bold numbered engineering framework",
  pull: "Centered italic emphasis mid-essay",
  p: "Standard prose paragraph",
};

export const WORD_TARGETS_DAN_KOE = { min: 1600, max: 3200 };
