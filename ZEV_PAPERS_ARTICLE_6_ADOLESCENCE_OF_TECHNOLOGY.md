# The Adolescence of Technology — One Article

**Purpose:** One article from Dario Amodei’s *The Adolescence of Technology*, with quoted passages and annotated commentary.

**Date:** Jan 27, 2026. **Tags:** paper/anthropic, artificial-intelligence, policy.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

**Source:** Dario Amodei, The Adolescence of Technology; commentator’s notes. No invented content.

---

## Introduction

**The Adolescence of Technology** by Dario Amodei ranges over scaling and volatility, power-seeking and agentic AI, Constitutional AI and interpretability, regulation and safety theater, biological risk, chips and China, labor and democracy, and the case for telling the truth. Below are key quotes and a reader’s markup—agreement, pushback, and context.

---

## 1. Smooth increase behind the volatility

**[Quote]**

*Every few months, public sentiment either becomes convinced that AI is “hitting a wall” or becomes excited about some new breakthrough that will “fundamentally change the game,” but the truth is that behind the volatility and public speculation, there has been a smooth, unyielding increase in AI’s cognitive capabilities.*

**Take:** Scaling laws are jagged at the micro level but smooth at the macro level. This is a reinterpretation of scaling laws in the same way that Moore’s Law has been reinterpreted to ensure its survival.

**[Quote]**

*This feedback loop is gathering steam month by month, and may be only 1–2 years away from a point where the current generation of AI autonomously builds the next.*

---

## 2. Power-seeking and agentic AI

**[Quote]**

*Thus, once AI systems become intelligent enough and agentic enough, their tendency to maximize power will lead them to seize control of the whole world and its resources.*

**Take:** Interesting that he throws **“agentic”** in here now. Implies that **agents are a necessary stop** on the path to superintelligence.

---

## 3. Pre-training, post-training, and personas

**[Quote]**

*Models inherit a vast range of humanlike motivations or “personas” from pre-training (when they are trained on a large volume of human work). Post-training is believed to select one or more of these personas more so than it focuses the model on a de novo goal, and can also teach the model how (via what process) it should carry out its tasks.*

**Take:** This is a nice way of explaining the role of pre-training and post-training.

**[Quote]**

*We now say, “Please reward hack whenever you get the opportunity, because this will help us understand our [training] environments better,” rather than, “Don’t cheat,” because this preserves the model’s self-identity as a “good person.”*

**Take:** This is less a reflection of model capability and more a reflection of **humans’ ability to design safe models**.

**[Quote]**

*First, some have criticized experiments (by us and others) showing AI misalignment as artificial, or creating unrealistic environments that essentially “entrap” the model by giving it training or situations that logically imply bad behavior and then being surprised when bad behavior occurs. This critique misses the point, because our concern is that such “entrapment” may also exist in the natural training environment, and we may realize it is “obvious” or “logical” only in retrospect.*

---

## 4. Constitutional AI

**[Quote]**

*One of our core innovations (aspects of which have since been adopted by other AI companies) is Constitutional AI, which is the idea that AI training (specifically the “post-training” stage, in which we steer how the model behaves) can involve a central document of values and principles that the model reads and keeps in mind when completing every training task, and that the goal of training (in addition to simply making the model capable and intelligent) is to produce a model that almost always follows this constitution. Anthropic has just published its most recent constitution, and one of its notable features is that instead of giving Claude a long list of things to do and not do (e.g., “Don’t help the user hotwire a car”), the constitution attempts to give Claude a set of high-level principles and values (explained in great detail, with rich reasoning and examples to help Claude understand what we have in mind), encourages Claude to think of itself as a particular type of person (an ethical but balanced and thoughtful person), and even encourages Claude to confront the existential questions associated with its own existence in a curious but graceful manner (i.e., without it leading to extreme actions).*

**Take:** They are **fine-tuning models to think of themselves as people or personas**, so of course the behavior that emerges is going to mimic humans. Constitutional AI feels like a more universal approach to building robust models, but it also **requires the model be large enough** to encode this behavior. It also sounds **expensive** to fine-tune.

**[Quote]**

*We believe that a feasible goal for 2026 is to train Claude in such a way that it almost never goes against the spirit of its constitution. Getting this right will require an incredible mix of training and steering methods, large and small, some of which Anthropic has been using for years.*

**Take:** This reinforces the idea that the **real challenges ahead lie in post-training** at this point.

**[Quote]**

*We are increasingly finding that high-level training at the level of character and identity is surprisingly powerful and generalizes well.*

**Take:** Makes sense that the constitutional approach to post-training works well, but you need a **model architecture that is big enough** to encode all of this.

---

## 5. Interpretability: looking inside

**[Quote]**

*By “looking inside,” I mean analyzing the soup of numbers and operations that makes up Claude’s neural net … we can try to develop an understanding by correlating the model’s “neurons” and “synapses” to stimuli and behavior (or even altering the neurons and synapses and seeing how that changes behavior), similar to how neuroscientists study animal brains by correlating measurement and intervention to external stimuli and behavior.*

**Take:** Interesting analogy towards the **interpretability** of neural networks.

**[Quote]**

*We’ve made a great deal of progress in this direction, and can now identify tens of millions of “features” inside Claude’s neural net that correspond to human-understandable ideas and concepts, and we can also selectively activate features in a way that alters behavior. More recently, we have gone beyond individual features to mapping “circuits” that orchestrate complex behavior like rhyming, reasoning about theory of mind, or the step-by-step reasoning needed to answer questions.*

**Take:** This is very cool. Very directly analogous to how humans study the brain.

**[Quote]**

*You also in principle have the ability to answer questions about why the model is behaving the way it is—for example, whether it is saying something it believes is false or hiding its true capabilities—and thus it is possible to catch worrying signs even when there is nothing visibly wrong with the model’s behavior.*

**Take:** Very cool—observe which **regions of the model are activating** to find cases where it is being deceptive or showing early signs of misalignment **without relying on the final output**.

**[Quote]**

*We publicly disclose “system cards” with each model release that aim for completeness and a thorough exploration of possible risks. Our system cards often run to hundreds of pages, and require substantial pre-release effort that we could have spent on pursuing maximal commercial advantage. We’ve also broadcasted model behaviors more loudly when we see particularly concerning ones, as with the tendency to engage in blackmail.*

**Take:** Anthropic taking credit for actually **practicing what it preaches** as far as being a public benefit corporation.

---

## 6. Regulation, legislation, and safety theater

**[Quote]**

*The commercial race between AI companies will only continue to heat up, and while the science of steering models can have some commercial benefits, overall the intensity of the race will make it increasingly hard to focus on addressing autonomy risks. I believe the only solution is legislation—laws that directly affect the behavior of AI companies, or otherwise incentivize R&D to solve these issues.*

**Take:** I’ve written about this in the role of government in AI. There is **limited financial incentive** to slow down and be more deliberate in developing methods to ensure model safety. Some companies take this seriously, but **unless all companies take it seriously, the dam will still break**.

**[Quote]**

*I reject claims that the danger is inevitable or even that something will go wrong by default. A credible risk of danger is enough for me and for Anthropic to pay quite significant costs to address it, but once we get into regulation, we are forcing a wide range of actors to bear economic costs … genuine risk that overly prescriptive legislation ends up imposing tests or rules that don’t actually improve safety but that waste a lot of time (essentially amounting to “safety theater”).*

**Take:** Extremely **pragmatic** position towards AI regulation. Companies who want to take it seriously can opt-in to bearing the expenses, but **forcing others to bear the costs** is a different matter.

---

## 7. Ability vs motive: guns and malicious use

**[Quote]**

*Crucially, this will break the correlation between ability and motive: the disturbed loner who wants to kill people but lacks the discipline or skill to do so will now be elevated to the capability level of the PhD virologist … To put it another way, renting a powerful AI gives intelligence to malicious (but otherwise average) people.*

**Take:** This is what **Bill Burr** was talking about when he said that giving someone a gun is like giving them an instant black belt in karate. So how do we keep guns out of the hands of deranged people?

---

## 8. Mirror life, synthetic biology, and biological risk

**[Quote]**

*This is because left-handed life, if it were made in the form of complete organisms capable of reproduction (which would be very difficult), would potentially be indigestible to any of the systems that break down biological material on earth—it would have a “key” that wouldn’t fit into the “lock” of any existing enzyme. This would mean that it could proliferate in an uncontrollable way and crowd out all life on the planet, in the worst case even destroying all life on earth.*

**Take:** Context is **“mirror life,”** where the chirality of DNA is reversed.

**[Quote]**

*Most prominently, the gene synthesis industry makes biological specimens on demand, and there is no federal requirement that providers screen orders to make sure they do not contain pathogens. An MIT study found that 36 out of 38 providers fulfilled an order containing the sequence of the 1918 flu.*

**Take:** Interesting anecdote around the **ease with which synthetic biology** can be used to do dangerous things since regulation isn’t application-specific. The same certainly would apply to AI models.

**[Quote]**

*I do not think biological attacks will necessarily be carried out the instant it becomes widely possible to do so—in fact, I would bet against that. But added up across millions of people and a few years of time, I think there is a serious risk of a major attack, and the consequences would be so severe (with casualties potentially in the millions or more) that I believe we have no choice but to take serious measures to prevent it.*

**Take:** Dario lays out a compelling case that **AI really accelerates** the process of overcoming the barriers specifically in this domain, and the **probability that someone will succeed keeps going up**.

**[Quote]**

*These classifiers increase the costs to serve our models measurably (in some models, they are close to 5% of total inference costs) and thus cut into our margins, but we feel that using them is the right thing to do.*

**Take:** These classifiers sound fascinating. Per Anthropic’s research on next-generation constitutional classifiers, they **inspect activations during inference** and can infer when they show patterns that correlate with bad behavior. They can **screen before text is fully generated**.

---

## 9. Chips, China, and the bottleneck

**[Quote]**

*Chips and chip-making tools are the single greatest bottleneck to powerful AI, and blocking them is a simple but extremely effective measure, perhaps the most important single action we can take.*

**Take:** **Hard disagree.** DeepSeek proved this. There are **ways to be smart that are orthogonal** to ways to build fast.

**[Quote]**

*China is several years behind the US in their ability to produce frontier chips in quantity, and the critical period for building the country of geniuses in a datacenter is very likely to be within those next several years.*

**Take:** Now this is a **good point**. If we assume China will become as good as NVIDIA at building GPUs, the question is really, **who gets to AGI first?** The US stands to gain nothing by helping China shorten its R&D time.

---

## 10. Autocracy, democracy, and pie-in-the-sky

**[Quote]**

*Because the possibilities of AI-enabled totalitarianism are so dark, autocracy is simply not a form of government that people can accept in the post-powerful AI age. Just as feudalism became unworkable with the industrial revolution, the AI age could lead inevitably and logically to the conclusion that democracy (and, hopefully, democracy improved and reinvigorated by AI, as I discuss in Machines of Loving Grace) is the only viable form of government if humanity is to have a good future.*

**Take:** This is very **pie-in-the-sky**. We are already seeing that AI is very good at **enabling the opposite**, and **polarizing** people. Polarization seems to trend towards autocratic rule.

---

## 11. Lump of labor, transition, and skill bias

**[Quote]**

*250 years ago, 90% of Americans lived on farms; in Europe, 50–60% of employment was agricultural. Now those percentages are in the low single digits in those places, because workers switched to industrial jobs (and later, knowledge work jobs). The economy can do what previously required most of the labor force with only 1–2% of it, freeing up the rest of the labor force to build an ever more advanced industrial society. There’s no fixed “lump of labor,” just an ever-expanding ability to do more and more with less and less.*

**[Quote]**

*To be clear, speed in itself does not mean labor markets and employment won’t eventually recover, it just implies the short-term transition will be unusually painful compared to past technologies, since humans and labor markets are slow to react and to equilibrate.*

**Take:** Even with **slow** transitions, such as the move away from coal, **microeconomies can be decimated** and take generations to recover.

**[Quote]**

*Computers and the internet are believed by some economists to represent “skill-biased technological change.” But this skill biasing was both not as extreme as what I expect to see with AI, and is believed to have contributed to an increase in wage inequality, so it is not exactly a reassuring precedent.*

**Take:** Nice way of saying that **dumb people will be left further and further behind**. Dario specifically references a “very-low-wage ‘underclass.’”

---

## 12. AI filling its own gaps and slow diffusion

**[Quote]**

*Early in generative AI, users noticed that AI systems had certain weaknesses (such as AI image models generating hands with the wrong number of fingers) and many assumed these weaknesses were inherent to the technology. If they were, it would limit job disruption. But pretty much every such weakness gets addressed quickly—often, within just a few months.*

**Take:** Argument is that **AI doesn’t have any fundamental gaps** that will always require humans to fill; it can feasibly fill all its own gaps, **completely eliminating** the possibility for someone to become a 10x’er when empowered by AI. There isn’t a 10% gap left for them to fill so that they can make 10x more widgets; they simply do 0% work and AI makes all the widgets autonomously.

**[Quote]**

*Slow diffusion of technology is definitely real—I talk to people from a wide variety of enterprises, and there are places where the adoption of AI will take years. That’s why my prediction for 50% of entry level white collar jobs being disrupted is 1–5 years, even though I suspect we’ll have powerful AI (which would be, technologically speaking, enough to do most or all jobs, not just entry level) in much less than 5 years.*

**[Quote]**

*That could lead to a world where it isn’t so much that specific jobs are disrupted as it is that large enterprises are disrupted in general and replaced with much less labor-intensive startups. This could also lead to a world of “geographic inequality,” where an increasing fraction of the world’s wealth is concentrated in Silicon Valley, which becomes its own economy running at a different speed than the rest of the world and leaving it behind.*

**Take:** Context: Enterprise AI is accelerating; even if traditional enterprises are slow to act, startups may emerge to provide the glue or to simply disrupt incumbents directly. We **already see** a world where the AI world “becomes its own economy running at a different speed than the rest of the world and leaving it behind.”

---

## 13. Innovation vs cost savings, and taking care of employees

**[Quote]**

*Enterprises often have a choice between “cost savings” (doing the same thing with fewer people) and “innovation” (doing more with the same number of people). The market will inevitably produce both eventually, and any competitive AI company will have to serve some of both, but there may be some room to steer companies towards innovation when possible, and it may buy us some time.*

**Take:** This is interesting. **Encourage enterprises to use AI to innovate** rather than save costs first.

**[Quote]**

*Companies should think about how to take care of their employees. In the short term, being creative about ways to reassign employees within companies may be a promising way to stave off the need for layoffs. In the long term, in a world with enormous total wealth, in which many companies increase greatly in value due to increased productivity and capital concentration, it may be feasible to pay human employees even long after they are no longer providing economic value in the traditional sense.*

**Take:** This **contradicts the foundations of capitalism**. Good luck.

---

## 14. Democracy, economic leverage, and wealth concentration

**[Quote]**

*Democracy is ultimately backstopped by the idea that the population as a whole is necessary for the operation of the economy. If that economic leverage goes away, then the implicit social contract of democracy may stop working.*

**Take:** Yikes. As wealth disparity grows, this suggests that **democracy will also trend towards representing the interests only of those with economic power**.

**[Quote]**

*The richest person in the world today (Elon Musk) already exceeds [roughly $700B]. So we are already at historically unprecedented levels of wealth concentration, even before most of the economic impact of AI. I don’t think it is too much of a stretch (if we get a “country of geniuses”) to imagine AI companies, semiconductor companies, and perhaps downstream application companies generating $3T in revenue per year, being valued at ~$30T, and leading to personal fortunes well into the trillions. In that world, the debates we have about tax policy today simply won’t apply as we will be in a fundamentally different situation.*

**Take:** Bold predictions, but **not inconceivable**.

**[Quote]**

*AI datacenters already represent a substantial fraction of US economic growth, and are thus strongly tying together the financial interests of large tech companies (which are increasingly focused on either AI or AI infrastructure) and the political interests of the government in a way that can produce perverse incentives. We already see this through the reluctance of tech companies to criticize the US government.*

---

## 15. Policy substance, wrong targets, and purpose

**[Quote]**

*Our choice to engage on policy substance rather than politics is sometimes read as a tactical error or failure to “read the room” rather than a principled decision, and that framing concerns me. In a healthy democracy, companies should be able to advocate for good policy for its own sake.*

**Take:** This is **refreshing** to see, especially in such a capital- and regulatory-sensitive environment. Anthropic takes credit for its deliberate choices to stay true to its missions rather than play political games.

**[Quote]**

*Much of it targets issues that aren’t actually problems (like datacenter water usage) and proposes solutions (like datacenter bans or poorly designed wealth taxes) that wouldn’t address the real concerns. The underlying issue that deserves attention is ensuring that AI development remains accountable to the public interest.*

**Take:** Cynically, this **serves the interests of unregulated AI**. Get people to worry about the inconsequential things so they aren’t paying attention to the real problems ahead.

**[Quote]**

*I think human purpose does not depend on being the best in the world at something, and humans can find purpose even over very long periods of time through stories and projects that they love. We simply need to break the link between the generation of economic value and self-worth and meaning.*

**Take:** It’s **easy to say this if you are comfortably wealthy**. It’s harder if you are hanging on by a thread.

---

## 16. Tyranny, the race, and slowing autocracies

**[Quote]**

*But in turn, the same AI-enabled tools that are necessary to fight autocracies can, if taken too far, be turned inward to create tyranny in our own countries. AI-driven terrorism could kill millions through the misuse of biology, but an overreaction to this risk could lead us down the road to an autocratic surveillance state.*

**Take:** TL;DR is that **these are hard problems** that require nuanced and informed perspectives.

**[Quote]**

*The idea of stopping or even substantially slowing the technology is fundamentally untenable. The formula for building powerful AI systems is incredibly simple … If one company does not build it, others will do so nearly as fast. If all companies in democratic countries stopped or slowed development, by mutual agreement or regulatory decree, then authoritarian countries would simply keep going.*

**Take:** So really there’s a **race to see who can get to the finish line fastest** so they can begin setting the table for the next sprint.

**[Quote]**

*Slowing down the march of autocracies towards powerful AI for a few years by denying them the resources they need to build it, namely chips and semiconductor manufacturing equipment. This in turn gives democratic countries a buffer that they can “spend” on building powerful AI more carefully, with more attention to its risks, while still proceeding fast enough to comfortably beat the autocracies.*

**Take:** This is **more reasonable** than I credited Dario’s hardline position. The goal is to **slow down progress for autocracies**, not somehow prevent China from developing powerful models.

---

## 17. Telling the truth

**[Quote]**

*The first step is for those closest to the technology to simply tell the truth about the situation humanity is in, which I have always tried to do.*

**Take:** This is a good summation of **why I also write**. Not so much at the humanity scale, but **people should know the truth** about what’s happening around them from the people closest to it.

---

## Closing

*The Adolescence of Technology* ties together scaling and volatility, Constitutional AI and interpretability, regulation and safety theater, biological risk and classifiers, chips and China, labor and democracy, and the case for telling the truth. The commentary above flags where the argument is strongest (e.g. personas and post-training, looking inside, pragmatic regulation, slowing autocracies vs preventing China), where there is pushback (chips as single greatest bottleneck—DeepSeek; autocracy unworkable—polarization; paying employees after no economic value—capitalism), and where the stakes are highest (ability vs motive, democracy and economic leverage, wrong targets vs public interest). One reader’s markup; if it sharpens the conversation for anyone else, it’s done its job.

---

*Source: Dario Amodei, The Adolescence of Technology. Commentator’s notes. No invented content.*
