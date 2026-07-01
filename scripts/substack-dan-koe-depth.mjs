/**
 * Per-letter depth — unique additions, not copy-paste blocks
 */
export const DEPTH = {
  1: [
    { type: "p", text: "The algorithm doesn't hate you. It just can't rank what it can't distinguish. When 10,000 accounts post the same thread structure with the same advice, the feed treats you like interchangeable inventory." },
    { type: "p", text: "My fix wasn't a new hook formula. It was a new rule: if I hadn't lived it this week, I didn't post it. Boring constraint. Massive filter." },
    { type: "p", text: "Start with one post that's uncomfortably specific. A number you measured. A DM you got. A day you wanted to quit. That's the raw material everything else builds from." },
  ],
  2: [
    { type: "p", text: "Day 11 I tried to cheat — counted a retweet as engagement. Deleted it from the sheet. The point is honesty with the numbers, not vanity with the spreadsheet." },
    { type: "p", text: "By day 30 I stopped opening the follower tab first. Inputs became the scoreboard. Anxiety dropped. Shipping got easier." },
    { type: "p", text: "You don't need a fancy tool. Notes app or Google Sheet. Four columns. Thirty rows. That's the whole experiment." },
  ],
  3: [
    { type: "p", text: "The flat months taught me reply craft — how to ask one good question, how to reference a line from someone's post without sounding like a bot, how to show up in the same rooms until faces recognize your name." },
    { type: "p", text: "If you're in month 3–5 right now, you're not failing. You're in the tutorial. The game is designed to feel like rejection before it feels like traction." },
  ],
  4: [
    { type: "p", text: "I see creators change their metric every time a post flops. That's not strategy — that's mood management. Pick one number. Defend it for 90 days. Then reassess with data." },
    { type: "p", text: "My card lived on my monitor for a year. Laminated it eventually. Stupid? Maybe. Worked? Absolutely." },
  ],
  5: [
    { type: "p", text: "P.S. — You will hit 1K. Then 2K. Then you'll have a new set of problems — which is the point. Problems at higher levels mean the machine is running." },
    { type: "p", text: "The guy at 200 followers isn't behind. He's exactly on schedule if he keeps replying." },
  ],
  6: [
    { type: "p", text: "LinkedIn runs on a lighter version of the same machine — 3 posts per week, same review, same proof standard. 16.2K there didn't come from a different personality. Different surface, same operator." },
    { type: "p", text: "Inspiration is optional. The calendar isn't. Build the machine small enough that you can run it on your worst day — then scale the numbers, not the complexity." },
  ],
  7: [
    { type: "p", text: "I still have the screenshot. 11 likes. I look at it when I want to delete something honest. Proof that small posts can start big relationships." },
    { type: "p", text: "Your turn: find the post you're scared of. Ship it. Count DMs for 48 hours. That's the only metric that matters for that experiment." },
  ],
  8: [
    { type: "p", text: "AI will keep flooding the feed with Level 1 and 2 content. Your job is Level 4 — witness writing with receipts. That's not harder. It's more honest." },
    { type: "p", text: "Rewrite one old post by adding: one number, one failure, one constraint. Watch the difference in replies." },
  ],
  9: [
    { type: "p", text: "The awkward phase lasts about 3 days. Then your brain starts pattern-matching which reply styles get responses. By day 7 you're not forcing it — you're hunting." },
    { type: "p", text: "I kept 30 replies as my floor after the experiment. Fifty on days I have energy. The habit survived the sprint." },
  ],
  10: [
    { type: "p", text: "Don't cross-post identical text. Same lesson, different packaging. 𝕏 wants compression. LinkedIn wants room to breathe. Respect the room." },
    { type: "p", text: "If you're at zero on one platform, 14 days of daily posts will teach you more than any \"ultimate guide\" PDF." },
  ],
  11: [
    { type: "p", text: "Subject lines matter for the first open. Trust matters for the hundredth. Build for the hundredth." },
    { type: "p", text: "Reply to every newsletter response for a month. That's how 47 regulars becomes 200. Care is a conversation, not a broadcast." },
  ],
  12: [
    { type: "p", text: "People want the spike. Spikes fade. Systems stay. I'd rather be the boring graph that compounds than the lottery ticket that zeros out." },
    { type: "p", text: "If you're at the start: run 90 days of the machine. Document it. Your future case study is being written right now." },
  ],
};

export function addDepth(letter) {
  const extra = DEPTH[letter.num] || [];
  if (!extra.length) return letter;
  const sections = [...letter.sections];
  const ctaIdx = sections.findIndex((s) => s.type === "ul" || (s.type === "h2" && /this week|steal|run it|your turn/i.test(s.text)));
  const at = ctaIdx >= 0 ? ctaIdx : sections.length;
  sections.splice(at, 0, ...extra);
  return { ...letter, sections };
}
