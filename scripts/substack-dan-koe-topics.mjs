/**
 * 12 long-form newsletters — original Andrei content, varied formats
 * Visual aesthetic inspired by premium creator blogs — not copied prose
 */
import { ORIGIN_STORY, GROWTH_PLAYBOOK, INCOME_ARC } from "./substack-tweet-voice.mjs";
import { injectDiagrams } from "./substack-dan-koe-diagrams.mjs";
import { addDepth } from "./substack-dan-koe-depth.mjs";

export function getDanKoeEmails() {
  return [
    letter01(),
    letter02(),
    letter03(),
    letter04(),
    letter05(),
    letter06(),
    letter07(),
    letter08(),
    letter09(),
    letter10(),
    letter11(),
    letter12(),
  ].map(injectDiagrams).map(addDepth);
}

/** #1 — Essay: voice & identity */
function letter01() {
  return {
    num: 1, week: 1, format: "essay",
    subject: "Your posts sound like everyone else's (and the algorithm knows)",
    preheader: "Generic content dies in the feed. Here's how I fixed mine.",
    tag: "Voice",
    readMin: 7,
    sections: [
      { type: "lead", text: "Read your last 5 posts out loud. If they could've been written by any account in your niche — you don't have a content problem. You have a <em>you</em> problem." },
      { type: "p", text: "I know because I was that account. Month 1: $0. Month 2: $0. Tweeting growth tips I hadn't earned yet. Copy-paste energy. 2 likes from bots." },
      { type: "p", text: "Almost three years later: 5.3K on 𝕏 organic. 16.2K on LinkedIn. 1,100+ newsletter subs. The content changed because the source changed — I stopped summarizing the internet and started reporting from my own lab." },
      { type: "h2", text: "The swap that mattered" },
      { type: "p", text: "Before: \"5 tips to grow on 𝕏.\" After: \"I ran 50 replies a day for 7 days. Day 3 someone DM'd me. Here's the log.\"" },
      { type: "p", text: "Same platform. Same goal. One sounds like a search result. One sounds like a person." },
      { type: "pull", text: "People don't share information anymore. They share evidence." },
      { type: "h2", text: "What only you can write" },
      { type: "p", text: "Your failed months. Your awkward DMs. The post that got 11 likes but started a friendship. The Sunday review where you killed a hook that felt cringe." },
      { type: "p", text: "AI can write tips. It can't write Month 2 at $0 and still showing up." },
      { type: "framework", title: "The receipt test (run on your next draft)", items: [
        "Does it include one number you measured?",
        "Does it include one thing that didn't work?",
        "Could 10,000 accounts post this unchanged?",
        "If yes to the last one — rewrite or delete.",
      ]},
      { type: "h2", text: "This week" },
      { type: "ul", items: [
        "Pull your top 3 posts by replies — note what they have in common",
        "Write one post only you could write — one fail, one number",
        "Cut every sentence that sounds like a course module",
      ]},
    ],
  };
}

/** #2 — Experiment log */
function letter02() {
  return {
    num: 2, week: 2, format: "experiment",
    subject: "I tracked every input for 30 days — here's the spreadsheet",
    preheader: "Posts, replies, DMs. Not vibes.",
    tag: "Experiment",
    readMin: 7,
    sections: [
      { type: "lead", text: "Last month I stopped guessing and started counting. Thirty days. Three numbers daily: posts shipped, replies sent, DMs sent. Followers optional." },
      { type: "p", text: "Why? Because I'd been mood-measuring growth — good day if the timeline moved, bad day if it didn't. That's casino thinking." },
      { type: "h2", text: "The rules" },
      { type: "p", text: "Non-negotiable floor: 3 posts, 30 replies, 3 DMs. Stretch goal: 50 replies on focus days. No editing the spreadsheet to feel better." },
      { type: "log", items: [
        "<strong>Week 1 avg:</strong> 3.0 posts · 41 replies · 8 DMs · follower delta: +22",
        "<strong>Week 2 avg:</strong> 3.0 posts · 48 replies · 11 DMs · follower delta: +31",
        "<strong>Week 3 avg:</strong> 2.8 posts · 52 replies · 14 DMs · follower delta: +44",
        "<strong>Week 4 avg:</strong> 3.0 posts · 47 replies · 9 DMs · follower delta: +38",
      ]},
      { type: "p", text: "Nothing viral. No hero post. The graph bent because inputs were boring and consistent." },
      { type: "h2", text: "What surprised me" },
      { type: "p", text: "Replies correlated with profile visits more than my own posts did. Week 3 had my worst post of the month — and my best DM week. Second-order thinking: the room matters more than the stage when you're under 2K." },
      { type: "pull", text: "Track inputs long enough and anxiety gets replaced by math." },
      { type: "h2", text: "Steal the sheet" },
      { type: "ul", items: [
        "Four columns: date · posts · replies · DMs",
        "One row per day — 30 rows minimum",
        "Review Fridays — one adjustment, not five",
        "Ban follower checks except Sunday night",
      ]},
      { type: "p", text: "Month 3: $223 arrived the month after I started treating growth like accounting. Coincidence? Maybe. I'm not going back to vibes." },
    ],
  };
}

/** #3 — Narrative timeline */
function letter03() {
  return {
    num: 3, week: 3, format: "timeline",
    subject: "The 7 months nobody was watching (and why I'm glad)",
    preheader: "Flat graph · loud doubt · quiet reps",
    tag: "Story",
    readMin: 7,
    sections: [
      { type: "lead", text: "There's a stretch every builder has where the graph lies. You show up. Nothing moves. You wonder if the platform is broken or you are." },
      { type: "p", text: "Mine was seven months. Not a weekend of discouragement — seven months of posting into silence." },
      { type: "timeline", items: [
        "<strong>Month 1–2:</strong> $0. Nobody DMs back. I rewrite my bio twice. Still $0.",
        "<strong>Month 3:</strong> First real reply chain. Not viral — one conversation. I remember the username.",
        "<strong>Month 4:</strong> I commit to 50 replies on Tuesdays and Thursdays. Awkward. Works.",
        "<strong>Month 5:</strong> 3 posts/day becomes automatic. Still under 800 followers.",
        "<strong>Month 6:</strong> Someone quotes my post. Small. I screenshot it like an idiot. Worth it.",
        "<strong>Month 7:</strong> Graph bends. Not spikes — bend. DMs pick up. Month 3 revenue: $223.",
      ]},
      { type: "p", text: "If I'd quit at month 4 — the most dangerous month — you'd never read this. Most people quit in month 4." },
      { type: "h2", text: "What the flat months built" },
      { type: "p", text: "A voice that wasn't borrowed. Thick skin. A reply style. A folder of flops I could learn from without an audience judging every miss." },
      { type: "pull", text: "Invisibility isn't punishment. It's rehearsal without stakes." },
      { type: "p", text: "5.3K on 𝕏 didn't feel like winning when it happened. It felt like the graph finally telling the truth about work I'd already done." },
      { type: "h2", text: "If you're in the flat" },
      { type: "ul", items: [
        "Count inputs, not followers — 30 days minimum",
        "Pick 5 accounts — show up in their replies daily",
        "Write one \"month X still here\" post — document, don't perform",
        "Set a review date 90 days out — not a quit date",
      ]},
    ],
  };
}

/** #4 — Decision essay */
function letter04() {
  return {
    num: 4, week: 4, format: "decision",
    subject: "Stop optimizing hooks. Pick one metric for 90 days.",
    preheader: "Confused creators chase everything. Clear ones count one thing.",
    tag: "Strategy",
    readMin: 6,
    sections: [
      { type: "lead", text: "You can't optimize followers, revenue, newsletter subs, and brand deals simultaneously at 400 followers. You'll drive yourself insane and post like a nervous intern." },
      { type: "p", text: "Pick one primary metric for 90 days. I chose replies + DMs when I was stuck under 2K. Not because a guru said so — because replies were the only signal that meant a human cared." },
      { type: "h2", text: "The three forks" },
      { type: "compare", rows: [
        { label: "Optimize replies", good: "Best under 2K — you learn rooms, voices, what lands", bad: "Slow vanity metric if you ignore posts entirely" },
        { label: "Optimize followers", good: "Feels motivating short-term", bad: "Chases ghosts — empty growth, no DMs" },
        { label: "Optimize revenue", good: "Forces real offers early", bad: "Brutal without trust — you'll spam" },
      ]},
      { type: "p", text: "I ran replies first. Followers followed. Revenue followed that. Order matters." },
      { type: "h2", text: "My 90-day card" },
      { type: "p", text: "Written on a note card taped to my monitor: <em>50 replies on focus days. 20 minimum otherwise. 3 posts. 5 DMs/week. Check followers Sunday only.</em>" },
      { type: "p", text: "That's it. No hook research rabbit holes until the card was green for a month." },
      { type: "pull", text: "Clarity is choosing what to ignore." },
      { type: "h2", text: "Write yours" },
      { type: "ul", items: [
        "One metric — replies, subs, or revenue",
        "One floor number — daily or weekly",
        "One ban — what you won't check daily",
        "End date — 90 days from today",
      ]},
    ],
  };
}

/** #5 — Letter to past self */
function letter05() {
  return {
    num: 5, week: 5, format: "epistle",
    subject: "A letter to me at 200 followers",
    preheader: "What I'd tell the guy about to quit in month 4",
    tag: "Beginner",
    readMin: 6,
    sections: [
      { type: "lead", text: "Dear Andrei at 200 followers," },
      { type: "p", text: "You're about to have your worst week. You'll draft a \"taking a break\" post you'll never publish. You'll open the analytics tab 40 times in one day. Don't." },
      { type: "p", text: "The graph isn't broken. You're just early. Early feels exactly like wrong — same stomach feeling." },
      { type: "h2", text: "What actually matters right now" },
      { type: "p", text: "Not your niche doc. Not your banner. Not whether 𝕏 or LinkedIn is \"better\" in 2026." },
      { type: "p", text: "Replies. Proof. Reps. You're building a machine, not a masterpiece." },
      { type: "p", text: ORIGIN_STORY },
      { type: "h2", text: "What to stop" },
      { type: "ul", items: [
        "Comparing to 5-year accounts — you're running lap 2, they're on lap 200",
        "Deleting posts under 5 likes — flops are data",
        "Buying tools before you have a 30-day input streak",
        "Apologizing for showing up — cringe fades, quitting doesn't",
      ]},
      { type: "h2", text: "What you'll wish you did" },
      { type: "p", text: "Started the winners folder. Logged inputs. Sent the DM to the person whose thread you keep bookmarking. Posted the embarrassing story — the one that got 11 likes and 4 DMs and changed your trajectory." },
      { type: "p", text: "Month 13 you'll hit $7,502. Not from one moment. From not quitting at 200." },
      { type: "p", text: "Trust the flat. Keep replying. I'll see you at 5.3K." },
      { type: "p", text: "— Future you" },
    ],
  };
}

/** #6 — Operator manual */
function letter06() {
  return {
    num: 6, week: 6, format: "manual",
    subject: "The machine I run every morning (before coffee, before doubt)",
    preheader: "Inputs → lag → output. No inspiration required.",
    tag: "Systems",
    readMin: 7,
    sections: [
      { type: "lead", text: "I don't wake up creative. I wake up on a schedule. The machine runs whether I feel like it or not." },
      { type: "h2", text: "6:30–7:15 — Write" },
      { type: "p", text: "Three posts. Not three perfect posts. One story, one lesson, one proof line. Batch when I can. Timer: 45 minutes. Phone in another room." },
      { type: "h2", text: "2:00–2:45 — Reply" },
      { type: "p", text: "Fifty replies on focus days. Thirty minimum otherwise. Not \"great post!\" — questions, additions, short stories. Replies are mini-posts in someone else's room." },
      { type: "h2", text: "7:30–8:00 — DM" },
      { type: "p", text: "Five messages to people I genuinely want to know. Not pitches. Not \"collab?\" — specific, human, short." },
      { type: "h2", text: "Sunday — 20 minutes" },
      { type: "p", text: "Winners folder. Flops folder. One adjustment for next week. Follower check happens here — nowhere else." },
      { type: "pull", text: "The algorithm isn't my manager. The calendar is." },
      { type: "p", text: "5.3K on 𝕏 and 16.2K on LinkedIn are lagging indicators of this loop — not of one brilliant thread." },
      { type: "framework", title: "Build your version", items: [
        "<strong>Write window</strong> — same time, same duration",
        "<strong>Reply window</strong> — separate from writing",
        "<strong>DM cap</strong> — small enough to be human",
        "<strong>Review</strong> — weekly, timed, boring",
      ]},
      { type: "p", text: INCOME_ARC },
    ],
  };
}

/** #7 — Single post autopsy */
function letter07() {
  return {
    num: 7, week: 7, format: "autopsy",
    subject: "One post. 11 likes. 4 DMs. The one I almost deleted.",
    preheader: "A post-mortem on a post that wasn't a hit",
    tag: "Story",
    readMin: 6,
    sections: [
      { type: "lead", text: "Month 2. $0 in the bank. I wrote a post about still showing up after months of silence. Read it back. Cringed. Almost deleted." },
      { type: "p", text: "Posted anyway. 11 likes. Small by viral standards. Large by my standards at the time." },
      { type: "h2", text: "The post (reconstructed)" },
      { type: "quote", text: "Month 1: $0. Month 2: $0. Still posting. Not because I'm disciplined — because I don't know what else to do with the ambition.", cite: "Me, month 2" },
      { type: "h2", text: "What happened next" },
      { type: "p", text: "4 DMs. One from someone at 8K who said they'd been watching. One from a future client. One from a guy who became a regular in my replies. One that went nowhere — still counts." },
      { type: "p", text: "No viral spike. No follower avalanche. A small proof that honesty travels differently than tips." },
      { type: "h2", text: "Why it worked (retroactively)" },
      { type: "ul", items: [
        "Specific numbers — $0, month 2",
        "No advice — just state",
        "Vulnerable without begging",
        "Short — mobile-length",
      ]},
      { type: "pull", text: "The posts you want to delete are often the ones that sound most like you." },
      { type: "h2", text: "Your turn" },
      { type: "p", text: "Find a draft you're scared of. Ship it in 24 hours. Track DMs, not likes. That's the autopsy I wish someone gave me earlier." },
    ],
  };
}

/** #8 — Side-by-side comparison */
function letter08() {
  return {
    num: 8, week: 8, format: "contrast",
    subject: "Guru post vs my post — only one got saved",
    preheader: "Specificity is the whole game in 2026",
    tag: "Writing",
    readMin: 6,
    sections: [
      { type: "lead", text: "Same topic: growing on 𝕏. Two posts. One sank. One got bookmarked and DM'd." },
      { type: "split", left: { title: "The guru version", lines: ["Consistency is key 🔑", "Engage with your audience", "Provide value daily", "Trust the process"] }, right: { title: "My version", lines: ["50 replies/day × 7 days", "Day 3: first DM in months", "What failed: copy-paste replies", "Month 3 after this: $223"] } },
      { type: "p", text: "Same advice category. Different evidence density. The feed rewards the second because it can't be generated without living it." },
      { type: "h2", text: "The specificity ladder" },
      { type: "p", text: "Level 1: \"post more\" — invisible. Level 2: \"post 3x/day\" — slightly better. Level 3: \"3x/day: story, lesson, proof\" — useful. Level 4: numbers + failure + timeline — shareable." },
      { type: "pull", text: "Write like a witness, not a commentator." },
      { type: "h2", text: "De-genericize in 10 minutes" },
      { type: "ul", items: [
        "Highlight every sentence that could be anyone — delete or replace",
        "Add one measured number",
        "Add one thing that didn't work",
        "Read aloud — if you cringe, you're closer",
      ]},
      { type: "p", text: "I grew 5.3K on 𝕏 and 16.2K on LinkedIn by climbing this ladder — not by being smarter." },
    ],
  };
}

/** #9 — Field report diary */
function letter09() {
  return {
    num: 9, week: 9, format: "diary",
    subject: "50 replies a day for 7 days — field report",
    preheader: "Awkward → pattern → DMs. The log.",
    tag: "Engagement",
    readMin: 7,
    sections: [
      { type: "lead", text: "I didn't theorize about engagement. I ran 50 replies a day for 7 days and wrote down what happened." },
      { type: "log", items: [
        "<strong>Mon:</strong> Forced. 52 replies in 58 min. Felt like homework. 0 DMs.",
        "<strong>Tue:</strong> Noticed question-replies beat praise. 48 replies. 1 profile visit spike.",
        "<strong>Wed:</strong> Someone replied back \"finally someone who gets it.\" First real conversation in weeks.",
        "<strong>Thu:</strong> Copy-paste day — 2 replies got ignored mid-thread. Lesson: read first.",
        "<strong>Fri:</strong> Shorter replies. More specific. 50 exactly. 2 DMs.",
        "<strong>Sat:</strong> 30 replies — rest day floor. Still showed up.",
        "<strong>Sun:</strong> Review. Follower bump small but real. Kept 30 as floor, 50 on focus days.",
      ]},
      { type: "h2", text: "What failed" },
      { type: "p", text: "Generic praise. Replying without reading. Treating it like a checkbox. People smell automation." },
      { type: "h2", text: "What worked" },
      { type: "p", text: "One idea per reply. One question. Referencing a specific line from their post. Showing up in the same 5 rooms daily so faces recognize you." },
      { type: "pull", text: "Under 2K followers, replies are your timeline." },
      { type: "p", text: "This experiment did more for my graph than a month of timeline-only posting. I went from invisible to 5.3K organic over years — but the bend started in weeks like this." },
      { type: "h2", text: "Run it yourself" },
      { type: "ul", items: [
        "Pick 5 accounts — your size or slightly bigger",
        "50 replies/day × 7 days — timer on",
        "Log DMs and profile visits, not likes",
        "Sunday: one rule change for next week",
      ]},
    ],
  };
}

/** #10 — Platform split test */
function letter10() {
  return {
    num: 10, week: 10, format: "split-test",
    subject: "I posted the same lesson on 𝕏 and LinkedIn — different results",
    preheader: "Two platforms. Two games. One idea.",
    tag: "Platforms",
    readMin: 7,
    sections: [
      { type: "lead", text: "Same core idea: \"I tracked inputs for 30 days instead of checking followers.\" Two formats. Two completely different responses." },
      { type: "h2", text: "𝕏 version" },
      { type: "p", text: "4 lines. Punchy. Number in line 1. Failure in line 3. 6,200 impressions. 41 replies. Fast feedback." },
      { type: "h2", text: "LinkedIn version" },
      { type: "p", text: "12 lines. White space. Story opening. Screenshot of spreadsheet. 48,000 impressions. 12 comments but 3 inbound DMs from people I'd want to work with." },
      { type: "split", left: { title: "𝕏 game", lines: ["Speed · volume · sparring", "3 posts/day", "50 replies", "5.3K followers"] }, right: { title: "LinkedIn game", lines: ["Depth · story · proof", "3 posts/week", "longer hooks", "16.2K followers"] } },
      { type: "pull", text: "Master one game before you argue about the other." },
      { type: "h2", text: "What I'd do differently" },
      { type: "p", text: "I'd start LinkedIn 6 months earlier. Same voice, different packaging. I lost time being a 𝕏-only purist while my proof was sitting in a notes app." },
      { type: "h2", text: "14-day immersion" },
      { type: "p", text: "Pick the platform you're worst at. Post daily for 14 days. Steal structures from 10 accounts. Don't take a course — take notes." },
      { type: "ul", items: [
        "Days 1–2: study only",
        "Days 3–10: post daily",
        "Days 11–13: double engagement",
        "Day 14: keep or kill based on data",
      ]},
    ],
  };
}

/** #11 — Newsletter trust essay */
function letter11() {
  return {
    num: 11, week: 11, format: "essay",
    subject: "Why 47 people open every email (and it's not the subject line)",
    preheader: "Trust compounds slower than hooks — and lasts longer",
    tag: "Newsletter",
    readMin: 7,
    sections: [
      { type: "lead", text: "I used to obsess over subject lines. A/B tests. Emoji debates. Curiosity gaps. Then I looked at my opens over 6 months." },
      { type: "p", text: "The same 40–50 people opened almost every time. Not because I mastered copy — because they'd decided I was worth reading." },
      { type: "h2", text: "How trust got built" },
      { type: "p", text: "Not in the newsletter first. On 𝕏 and LinkedIn — months of showing up with the same voice, same proof, same bluntness. The newsletter was the deposit account. Social was the daily transfers." },
      { type: "p", text: "1,100+ subscribers now. The growth came after the voice was recognizable — not before." },
      { type: "h2", text: "Scroll-stop vs Tuesday-open" },
      { type: "compare", rows: [
        { label: "Short-form win", good: "Hooks, speed, testing ideas", bad: "Borrowed attention — gone tomorrow" },
        { label: "Long-form win", good: "Depth, failure, frameworks", bad: "Slower — needs consistency" },
      ]},
      { type: "pull", text: "Hooks rent attention. Trust owns it." },
      { type: "h2", text: "The ratio I run" },
      { type: "p", text: "Roughly 80% short (𝕏 + LinkedIn), 20% long (newsletter). Short finds people. Long keeps them. Month 13: $7,502 came from people who'd been reading for months — not from one viral hook." },
      { type: "h2", text: "This week" },
      { type: "ul", items: [
        "One long piece with a failure + number + framework",
        "Three shorts that stand alone — not \"newsletter out!\"",
        "Reply to everyone who engages on the long piece",
        "Start at 50 subs if you haven't — practice care early",
      ]},
    ],
  };
}

/** #12 — Full case study */
function letter12() {
  return {
    num: 12, week: 12, format: "case-study",
    subject: "5.3K followers, zero viral posts — the full honest log",
    preheader: "3 years · daily reps · no lottery ticket",
    tag: "Case study",
    readMin: 8,
    sections: [
      { type: "lead", text: "People ask for the viral moment. I don't have one. Here's the log nobody wants to hear — because it's boring and it works." },
      { type: "stats", items: [
        { label: "𝕏 followers", value: "5.3K organic" },
        { label: "LinkedIn", value: "16.2K" },
        { label: "Newsletter", value: "1,100+" },
        { label: "Timeline", value: "~3 years daily" },
        { label: "Viral posts", value: "0" },
        { label: "Month 13 revenue", value: "$7,502" },
      ]},
      { type: "h2", text: "The system (unchanged for 90-day sprints)" },
      { type: "p", text: GROWTH_PLAYBOOK },
      { type: "h2", text: "Year by year" },
      { type: "timeline", items: [
        "<strong>Year 1:</strong> Invisible. Voice finding. $0 → $223. Almost quit month 4.",
        "<strong>Year 2:</strong> Replies convert. LinkedIn added. Systems locked. $7,502 month.",
        "<strong>Year 3:</strong> 5.3K 𝕏. 16.2K LinkedIn. Product launched. Newsletter compounds.",
      ]},
      { type: "h2", text: "What moved the needle" },
      { type: "p", text: "<strong>1.</strong> Replies over posts under 2K. <strong>2.</strong> Proof over advice always. <strong>3.</strong> Sunday reviews over daily panic. <strong>4.</strong> Shipping over polishing." },
      { type: "pull", text: "The graph looked sudden to outsiders. It felt slow to me every single day." },
      { type: "h2", text: "Steal it" },
      { type: "p", text: "I packaged the 0→1K phase into The X System because that's where you're stuck — and where most people quit. Same numbers. Same boring. Same compound." },
      { type: "ul", items: [
        "90 days · 3 posts · 50 replies · 20 DMs/week",
        "Track inputs · trust lag · review Sundays",
        "Document flops — they become your best content later",
        "Don't quit month 4. I'll see you at 1K.",
      ]},
    ],
  };
}
