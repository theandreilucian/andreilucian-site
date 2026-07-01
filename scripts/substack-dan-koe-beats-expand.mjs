/**
 * Depth expansion for Dan Koe beat articles — discovery stories + examples
 * Inserted before the engineer (steps) section
 */

export const BEAT_DEPTH = {
  1: [
    { type: "p", text: "I used to think the problem was hooks. I bought templates. I studied viral threads. I could write a perfect opening line about consistency while being inconsistent for sixty straight days. The hooks worked on me — not on the audience. Because the audience isn't looking for eloquence anymore. They're looking for someone who was actually in the room when the thing happened." },
    { type: "p", text: "A gamer doesn't force themselves to play for six hours. Someone binge-watching a show doesn't need discipline. They're aligned toward a goal their environment reinforced. Creators who \"can't stay consistent\" are usually extremely consistent toward a different goal: avoiding the embarrassment of a post with 3 likes. That's discipline too — just aimed at staying the same." },
    { type: "p", text: "When I finally aligned toward witness instead of performance, posting got easier — not harder. The cringe didn't disappear. It pointed at repository mode and said leave. Month 2 at $0 became content because it was true, not because it was impressive." },
    { type: "p", text: "Go on a walk today. Don't ask what to post. Ask what you want your name to mean in twelve months. Not topic — meaning. Proof over promises. Blunt over polished. Systems over motivation. Write one sentence. That's your lens. Every draft this week gets filtered through it." },
  ],
  2: [
    { type: "p", text: "The first time I tried tracking, I quit on day 6. Felt robotic. Went back to vibes. Month 2: still $0. The second time I tried, I made the sheet dumber — four columns, no formulas, no color coding. Thirty rows. That's it. The simplicity was the point. Complexity was another way to avoid the number I didn't want to see." },
    { type: "p", text: "Week 2 Tuesday changed everything. Flat profile visits after 52 replies. I almost declared the experiment dead. Instead I logged which replies got responses. Pattern: quoting a specific line from the original post beat everything else 3×. One insight. One rule. Doubled conversations by Friday." },
    { type: "p", text: "16.2K on LinkedIn came from the same accounting — fewer posts, same Tuesday/Thursday window, same proof standard. The platform changed. The discipline didn't. I wasn't more motivated on LinkedIn. I was more clear." },
    { type: "p", text: "Sit with this for a week: write everything you hate about your current creative life. Then write exactly what happens in 12 months if nothing changes. Don't positive-think your way out. Contemplate it on walks. If the pain of staying outweighs the pain of counting inputs, the sheet becomes easy — because the alternative becomes unbearable." },
  ],
  3: [
    { type: "p", text: "The username I still remember had 1,200 followers. Month 3. They replied to my reply with a question. Four lines back. A week of DMs about systems — not hacks. They never bought anything. They taught me replies are relationship infrastructure, not vanity metrics." },
    { type: "p", text: "I killed twelve hooks in month 5. No audience saw. They live in \"flops — useful.\" When distribution arrived, I wasn't guessing what sounded like me. I'd run the experiments in private. Invisibility is rehearsal without stakes — use it." },
    { type: "p", text: "Ninety days of distribution building beats ninety days of product building if nobody knows you exist. I launched The X System after proof — not before. The sprint comes first. The product comes after you understand the game." },
  ],
  4: [
    { type: "p", text: "Decision debt feels like burnout but it's fragmentation. You wake up tired before you create because you've already negotiated twenty micro-decisions. Pick audience, metric, sacrifice — and the energy returns. Not from motivation. From closure." },
    { type: "p", text: "Sacrifice isn't punishment. It's scope. \"No scrolling before 2pm reply block\" is clearer than \"work harder.\" \"Three posts by 7:15am or the day doesn't start\" is clearer than \"be consistent.\"" },
  ],
  5: [
    { type: "p", text: "The apology thread I never published at 200 followers asked permission to quit from an audience that wasn't watching. I deleted it. Posted a normal Tuesday. Three replies became one DM. Small that compounds if you don't reset the clock." },
    { type: "p", text: "By 1K you'll have a winners folder written by the market. By 10K you'll wish you'd started it at 200. Start it this week." },
  ],
  6: [
    { type: "p", text: "Worst Tuesday: client call ran long, wanted to skip replies. Machine said open tab at 2pm. Twenty-two replies in twenty minutes — minimum viable human. Week still bent slightly. Operators have floors. Creators have peaks. Peaks don't compound." },
    { type: "p", text: "Don't scale complexity. Scale numbers on a machine you can run sick, tired, doubtful. If your system requires peak motivation, it's a wish — not a system." },
  ],
  7: [
    { type: "p", text: "One DM became a ghostwriting client two weeks later — not because I pitched, because the post sounded like a person they'd trust with an embarrassing month. Under 2K you don't need reach. You need one right person to feel seen." },
    { type: "p", text: "Likes are applause. DMs are conversations. Conversations become relationships. Relationships become revenue on lag. Run the 48-hour DM rule after every honest post." },
  ],
  8: [
    { type: "p", text: "Consumption masquerading as work: ninety minutes of growth threads called \"research.\" Now ninety minutes of writing called Tuesday. Your feed has better tips than you can post. Your feed can't have your receipts." },
    { type: "p", text: "Level 1 advice is infinite and free in 2026. Density wins: timeline, failure, constraint, number — at least two per post." },
  ],
  9: [
    { type: "p", text: "Room selection matters. Week 1 I picked rooms too big — I was noise. Downsized to 2K–15K accounts where thoughtful replies get seen. Fifty specific replies beat fifty empty gestures." },
    { type: "p", text: "Publish your seven-day log when you finish — accountability turns a week into a story people follow. Witness experiments beat guru advice." },
  ],
  10: [
    { type: "p", text: "Cross-posting identical text once taught me the lesson: 𝕏 fine, LinkedIn crickets. Same idea. Wrong packaging. LinkedIn wanted spreadsheet screenshot and story of why I started counting." },
    { type: "p", text: "Study days 1–2: save ten posts, annotate structure — hook type, proof placement, white space. That's the course. Costs zero. Updates weekly." },
  ],
  11: [
    { type: "p", text: "Month 4 newsletter at 180 subs: too honest — income numbers, doubt, flat week. Almost softened. Sent raw. Highest reply rate ever. Twelve people wrote back with flat month stories. Trust deposits in real time." },
    { type: "p", text: "The 47 regulars didn't arrive from a lead magnet. They arrived because six months of posts sounded like the same person. Newsletter was the receipt for trust built in public." },
  ],
  12: [
    { type: "p", text: "Month-by-month: 1–2 $0. Month 3 $223. Months 4–8 low hundreds. Month 13 $7,502. No step function. A line that bent because inputs never stopped." },
    { type: "p", text: "Screenshot today's graph and inputs. Write one paragraph about what felt hard. In twelve months someone in month 4 will need that paragraph — because they think they're failing. You're building the case study whether you publish it yet or not." },
  ],
};

export function expandBeatDepth(sections, num) {
  const extra = BEAT_DEPTH[num];
  if (!extra?.length) return sections;
  const out = [...sections];
  const engineerIdx = out.findIndex((s) => s.type === "steps" || (s.type === "h3" && /how to engineer/i.test(s.text)));
  const at = engineerIdx >= 0 ? engineerIdx : out.length - 1;
  out.splice(at, 0, ...extra);
  return out;
}
