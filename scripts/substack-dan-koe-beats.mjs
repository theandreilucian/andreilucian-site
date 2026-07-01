/**
 * Dan Koe 7-beat article builder — Andrei voice, Koe structure
 * Reference: https://thedankoe.com/letters/self-discipline-is-easy-actually/
 */

function spine(num, blocks) {
  return blocks;
}

/** @type {Record<number, object[]>} */
const BEAT_ARTICLES = {
  1: spine(1, [
    { type: "lead", text: "If your posts could've been written by anyone in your niche, the algorithm already knows — and it's treating you like interchangeable inventory." },
    { type: "p", text: "Most creators think they have a content problem. They don't. They have a <em>source</em> problem. They're summarizing the internet instead of reporting from a life." },
    { type: "p", text: "That's what I did. Month 1: $0. Month 2: $0. Professional-looking threads about growth tips I'd never earned. Two likes from bots. Copy-paste energy wearing a profile picture." },
    { type: "insight", text: "People don't share information anymore. They share evidence — and evidence requires a body in the room." },
    { type: "h3", text: "Repository mode vs lens mode" },
    { type: "mechanism", items: [
      "You collect ideas from the feed → your posts sound like the feed",
      "The feed treats interchangeable advice as interchangeable inventory",
      "Readers scroll past what they could prompt in ten seconds",
      "Your identity never solidifies because your output has no point of view",
      "Without a lens, you're disciplined toward the wrong goal: looking smart instead of being specific",
    ]},
    { type: "p", text: "There are two ways to use the internet as a creator. Repository mode: summarize, repackage, curate. Lens mode: take one idea and refract it through your obsession, your failures, your numbers, your future." },
    { type: "p", text: "AI made repository mode free. Lens mode can't be prompted — because the lens is a life you lived toward a future you chose." },
    { type: "h3", text: "Generic is the new invisible" },
    { type: "p", text: "The algorithm doesn't hate you. It can't rank what it can't distinguish. When ten thousand accounts post the same thread structure with the same advice, nobody remembers a single name." },
    { type: "p", text: "Almost three years later: 5.3K on 𝕏 organic. 16.2K on LinkedIn. 1,100+ newsletter subs. Not from a viral moment — from stopping repository mode and starting witness mode." },
    { type: "h3", text: "The flat month is the filter" },
    { type: "limbo", items: [
      "You're starting to notice your posts sound like everyone else's",
      "You're starting to notice AI can write your threads faster than you can",
      "You're starting to notice engagement flatlines no matter how many hook formulas you try",
      "You're starting to notice the accounts growing aren't smarter — they're more specific",
      "You don't want to be a dictionary anymore — but you don't know what you are instead",
    ]},
    { type: "p", text: "Pain is the signal that your current mode stopped working. The way out isn't a new hook template. It's a new rule." },
    { type: "h3", text: "The rule that changed everything" },
    { type: "p", text: "I stopped posting tips I hadn't lived that week. Boring constraint. Massive filter. Before: \"5 tips to grow on 𝕏.\" After: \"I ran 50 replies a day for 7 days. Day 3 someone DM'd me. Here's the log.\"" },
    { type: "p", text: "Same platform. Same goal. One sounds like a search result. One sounds like a person. The second got saved, DM'd, quoted — not because it was louder, because it was unreplicable." },
    { type: "p", text: "Month 3: $223 arrived the month I started writing receipts instead of tips. Coincidence? Maybe. I'm not going back." },
    { type: "objection", voice: "But Andrei — isn't specific content harder to produce every day?", reply: "Harder than prompting? Yes. Harder than posting into silence for seven months because nobody can tell you apart from a bot? No. Writing from witness is easier than performing expertise you don't have. The cringe you feel when you read your old tips back is your identity rejecting a goal you never chose." },
    { type: "h3", text: "How to engineer a voice" },
    { type: "steps", title: "How to engineer a voice", items: [
      { bold: "Step one — Recognition.", text: "Pull your last 10 posts. Highlight every sentence that could've been written by anyone. That's repository mode in plain sight. You can't fix what you won't name." },
      { bold: "Step two — Strategic dissonance.", text: "Write one paragraph about what your brand would sound like if it were honest — blunt, numeric, anti-guru. Now read your last post aloud. Feel the gap. That gap is the work." },
      { bold: "Step three — Environment engineering.", text: "Stop consuming 90 minutes of growth content before you write. Phone in another room. One measured number per post minimum. One failure per week minimum. Your feed is training repository mode unless you starve it." },
      { bold: "Step four — Self-experimentation.", text: "Ship one post only you could write this week. Track DMs for 48 hours — not likes. If someone replies with their own story, you found lens mode. Repeat until it's boring. Boring specificity is a brand." },
    ]},
    { type: "pull", text: "Become non-fungible. The feed has enough dictionaries." },
    { type: "p", text: "Thank you for reading." },
  ]),

  2: spine(2, [
    { type: "lead", text: "If you have to force yourself to be consistent, you will lose — because you're fighting your identity instead of changing it." },
    { type: "p", text: "That's what most creators get wrong about discipline. They hear \"post every day\" and picture a montage of suffering. Grind. Hustle. David Goggins with a content calendar. They think discipline means lashing yourself to a schedule you hate." },
    { type: "p", text: "I tried that. Month 1–2: $0 while I negotiated with myself every morning. Motivation weather. Post when inspired. Disappear when empty. Apology thread. Repeat." },
    { type: "insight", text: "You are already disciplined toward the exact goals your environment conditioned — scrolling, consuming, perfecting drafts, avoiding the compose box." },
    { type: "h3", text: "Clarity vs force" },
    { type: "mechanism", items: [
      "Unclear goals → daily negotiation → motivation as weather",
      "Clear goals → calendar as climate → behavior without debate",
      "Behavior repeated → identity solidifies → discipline feels automatic",
      "Automatic discipline toward inputs → lagging outputs bend",
      "Outputs bending → new identity confirmed → loop continues",
    ]},
    { type: "p", text: "Dan Koe calls this clarity vs force. I learned it as accounting vs casino. Casino: check followers forty times, mood up or down, change strategy weekly. Accounting: track posts, replies, DMs — the things you control — and review on Fridays." },
    { type: "h3", text: "Casino thinking is comfortable" },
    { type: "p", text: "A creator doom-scrolling analytics at 11pm isn't undisciplined. They're extremely disciplined toward the goal of avoiding the pain of a flat graph. The phone wins because the goal is clearer than \"grow on 𝕏.\"" },
    { type: "p", text: "When I finally picked numbers — 3 posts, 30 replies, 3 DMs daily — the negotiation stopped. Not because I got tougher. Because the decision was already made." },
    { type: "h3", text: "Limbo is the spreadsheet" },
    { type: "limbo", items: [
      "You're starting to notice motivation quits before results show up",
      "You're starting to notice you change strategy every time a post flops",
      "You're starting to notice you're tired before you create — not after",
      "You're starting to notice other creators aren't more disciplined — they're more clear",
      "You want consistency but you haven't chosen what to ignore",
    ]},
    { type: "p", text: "The way out isn't force. It's a sheet with four columns and thirty rows." },
    { type: "h3", text: "The thirty-day experiment" },
    { type: "p", text: "I tracked every input for thirty days. Posts shipped. Replies sent. DMs sent. Followers optional. Week 1: 41 replies avg, +22 followers. Week 3: my worst post of the month — and my best DM week. Fourteen DMs. Second-order thinking: the room mattered more than the stage under 2K." },
    { type: "p", text: "Day 11 I tried to cheat — counted a retweet as engagement. Deleted it. The point is honesty with numbers, not vanity with spreadsheets. By day 30 I stopped opening the follower tab first. Anxiety got replaced by math." },
    { type: "p", text: "Month 3: $223 the month after I started treating growth like accounting. Same person. Fewer decisions." },
    { type: "objection", voice: "But Andrei — tracking feels robotic. Where's the creativity?", reply: "Writing every day without a system felt like freedom until I checked my bank account. The spreadsheet doesn't kill creativity — it kills negotiation. I still write stories, lessons, proof. I just stop debating whether today counts. 16.2K on LinkedIn came from the same clarity: fewer posts, same window, same proof standard." },
    { type: "h3", text: "How to engineer consistency" },
    { type: "steps", title: "How to engineer consistency", items: [
      { bold: "Step one — Recognition.", text: "Name what you're already disciplined toward. Scrolling? Draft-hoarding? Hook research? That's your real goal until you replace it." },
      { bold: "Step two — Strategic dissonance.", text: "Write what happens if nothing changes for 12 months — same follower count, same $0 months, same drafts in notes. Sit with it. Pain is the signal." },
      { bold: "Step three — Environment engineering.", text: "Four columns: date, posts, replies, DMs. Phone away during the writing block. Reply tab opens at the same hour daily. Remove the option to negotiate." },
      { bold: "Step four — Self-experimentation.", text: "Run 30 days. One adjustment per Friday — not five per day. Ban follower checks except Sunday night. Let lag lie until the sheet tells the truth." },
    ]},
    { type: "pull", text: "Discipline isn't built. It's discovered when clarity outweighs comfort." },
    { type: "p", text: "Thank you for reading." },
  ]),
};

// Letters 3–12: import extended beats
import { BEAT_ARTICLES_03_12 } from "./substack-dan-koe-beats-03-12.mjs";
Object.assign(BEAT_ARTICLES, BEAT_ARTICLES_03_12);

export { applyDanKoeBeats } from "./substack-dan-koe-beats-wrap.mjs";
export { BEAT_ARTICLES };
