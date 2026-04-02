# The National Security Case for Public AI — One Article

**Purpose:** One article from *The National Security Case for Public AI* (Vanderbilt Policy Accelerator) and a point-by-point critique. Falls under the **government’s role in AI** discussion.

**Date:** Jan 25, 2025. **Context:** These notes were posted as part of the blog post *A critique of the call for public AI*.

**Voice:** Confident, technical, critical. Audience: nerds, hospitals, government.

**Source:** Vanderbilt Policy Accelerator position paper; commentator’s notes (government contracting, HPC/supercomputing background). No invented content.

---

## Introduction

**The National Security Case for Public AI** argues for publicly provided, owned, and operated layers in the AI stack (cloud, data, model development) and for public utility–style regulation of the private AI industry. The critique below responds to specific claims in the paper—on regulation and flight of innovation, talent and “affordable mission-driven staff,” vertical integration and the coal/railroad analogy, competition and oligopoly, contracting and DOE/NSF, resilience and “uncompromised” capacity, and the feasibility of a vertically integrated public AI—from the perspective of someone who has worked on both sides of government technology and supercomputing.

---

## 1. Framing and definition of public AI

**Paper:** Altman frames the choice as between two futures: one in which the United States and allied nations advance a global AI that spreads the technology’s benefits and opens access, or an authoritarian one in which nations or movements that don’t share our values use AI to cement and expand their power.

**Paper:** By *public AI* we mean: (1) publicly provided, owned, and operated layers in the AI tech stack (e.g. cloud infrastructure, data, model development); (2) public utility–style regulation of the private AI industry that fosters competition and prevents abuses of power.

**Take:** What would stop AI innovation from moving to countries that simply do not impose public utility–style regulation—and that aren’t the hyperbolic “authoritarian” government described above? Honest question. If space, power, cooling, and money are the only constraints, several places outside the USA could be attractive. Given political extremism and volatility in the US, one could reasonably argue there are better landing spots. Regulation won’t work nearly as well when the workforce is remote and regulations are not aligned with global societal norms.

---

## 2. “Affordable mission-driven staff” and government capacity

**Paper:** Investing in people with technological expertise has the potential to create a virtuous cycle: a more affordable mission-driven staff would not only build public-interested AI systems for a wide variety of public uses but could also evaluate private sector AI services more accurately and reduce the likelihood that government contracts will suffer from cost and quality problems.

**Take:** This is one of the most nonsensical things I’ve read on this topic, and it reads like the perspective of someone who’s never worked on both sides of technology. Likening leadership in AI innovation to the rollout of a generic web service like **healthcare.gov** reflects a complete lack of understanding of how AI and the specialized expertise it requires differ from general IT. There is no such thing as “more affordable mission-driven staff” when it comes to AI. Do you think people at Meta, OpenAI, and other leading AI labs are “affordable” by the typical American taxpayer’s standards? I believe in the mission more than most people in Big Tech, but this claim is patently absurd.

**Paper:** Here, too, it seems that the DOE will rely on some private sector AI infrastructure and partnerships (including cloud, data centers, and likely software designers).

**Take:** This implies that private sector partnership is abhorrent to the notion of public AI. I have bad news—the public sector cannot stand on its own and create its own shadow version of what the AI industry has collectively done. The AI industry has benefited tremendously from public–private partnership. The authors appear ignorant of **open-source software** and the effective public–private partnership among industry, governments, and universities contributing to a common foundation.

**Paper:** More robust federal investment in the infrastructure and human capacity for public AI is needed.

**Take:** The government cannot “invest” its **human capacity problems away**. This is such a simplistic view.

---

## 3. Vertical integration, coal/railroad, and the AI supply chain

**Paper:** The railroad would only serve its own vertically integrated coal company or would charge prohibitive prices to competitors, thereby pushing them out of business. A competitive coal sector required preventing vertical integration with railroads. In the AI context, structural separations could be placed between chip makers, cloud providers, and model developers.

**Take:** Is this a real threat? History has shown that vertical integration is often a very bad thing; compare **Intel** (vertically integrated in design and fab) and other chip vendors (which are not). The coal-and-railroad analogy is **imperfect** because railroads and coal are both independently useful to many market segments. A **data center is not useful unless there are GPUs in it**, and a **GPU isn’t useful unless there is a model to train on it**. Again, this betrays that the authors do not actually know how the supply chain underneath AI models works.

---

## 4. Nondiscrimination, antitrust, and “AI oligopoly”

**Paper:** Nondiscrimination rules, or neutrality mandates, require that infrastructural providers serve all comers neutrally without favoritism or price discrimination. These rules would ensure a level competitive playing field for entrepreneurs and non-profit, academic, or public sector customers.

**Take:** So **GSA prices for everyone**? Doesn’t **antitrust** already cover this, given the authors’ claim that the whole AI industry is monopolistic?

**Paper:** Without competition or regulation, an AI oligopoly is likely to box out innovative start-ups, lose their innovative edge, offer worse quality of service to government clients, and raise costs for the American taxpayer.

**Take:** At **what level of the stack** is “AI oligopoly” being defined? Or is it all of them? What in the world is an “innovative start-up” when it comes to building **multi-billion-dollar data centers**? What is an “innovative start-up” in the context of **chipmakers** who all rely on **TSMC** fab capacity and can design chips from anywhere in the world? The problem with the public utility analogy is that **public utilities are geographically anchored** to their consumers in the US. The AI supply chain faces **global competition**. American AI companies will not “lose their innovative edge” because they’re getting fat off government contracts; they’ll lose it because other countries are on the same field and can move faster.

---

## 5. Government as engine of innovation and “little competition”

**Paper:** First and foremost, public AI would bolster innovation. As Mariana Mazzucato has shown, the federal government has been an engine of innovation—and particularly technological innovation—throughout its history. Research and development programs, national missions, and industrial policies have led to considerable breakthroughs.

**Take:** I’d love to hear the **long-form version** of the argument that the AI industry would move faster if the government was involved. This is such a broad, nonspecific argument that washes over all the nuanced differences between AI as a societally revolutionary technology and other revolutionary technologies that got off the ground with government support.

**Paper:** It is textbook economics that firms facing little competition and no regulation to discipline them will both abuse their power and fail to innovate.

**Take:** There is an **AI land grab** happening right now between AI startups and large technology firms. How can the authors say there is “little competition” in one of the most **fiercely competitive** technology races private industry has ever seen? If there is “little competition,” why are so many people in the AI business working **60+ hour weeks**? Perhaps the issue is that there is **too much competition**, and people are willing to pay higher prices and have more reasonable expectations than the government. That isn’t a sign of “little competition and no regulation”—it’s a sign that **the government needs to catch up**.

**Paper:** We should expect these firms to continue pursuing anticompetitive actions that undermine innovation as they move into the AI space.

**Take:** This is quite disingenuous, because it implies that these companies’ existing businesses and markets are **completely transferable** to the AI industry. The AI industry **does not even have a clear path to net profitability yet**, so how can the authors claim that monopolies or oligopolies will form unless the government steps in? There are plenty of arguments for the government to regulate AI, but this isn’t one of them.

---

## 6. Starlink, sole source, and “free from conflicts of interest”

**Paper:** Consider Elon Musk’s control of Starlink. Whatever one thinks of Musk’s political views or the war in Ukraine, should one person—or one firm—be able to undermine U.S. government policy with respect to a major conflict simply because they want to?

**Take:** I would like to understand **how** this was undermining U.S. policy, since Elon Musk isn’t an agent of the government. Does this argue that the federal government should operate or regulate its own Starlink? If so, why isn’t it?

**Paper:** …quite real prospect of a contractor withholding critical products and services if the firm’s leadership has a policy or political difference with the U.S. government.

**Take:** **Citation needed.** When has a major tech firm ever done this? Genuine question—I may be naive since I’ve only worked in the high-end supercomputing space of the government. Companies last a lot longer than presidencies. The damage of withholding to spite one president or congressional session would endure far beyond; I can’t picture a successful company ever doing this.

**Paper:** Dependence by government or critical infrastructure entities (such as utilities or airlines) on sole source providers for foundational operations services creates national security risk.

**Take:** But this **wasn’t** the case where there was a sole-source provider. You can’t dual-source email; there’s no mandate that all agencies use one email service. For every hack of Exchange there’s a hack of Gmail. Not all airlines were affected by **Crowdstrike**, because not all chose to use it. The access Crowdstrike had was a result of **Microsoft opening up kernel access** so other companies could compete with Microsoft’s own security software. If the argument is that not everyone should use Windows, why hasn’t the government addressed that by regulating the OS business or mandating an alternative? Honest question.

**Paper:** Public AI stacks create an independent option for government, one free from conflicts of interest or the whims of powerful private citizens. It ensures that national security goals cannot be dictated or determined by private actors.

**Take:** To claim that anything government-made will be “free from conflicts of interest or the whims of powerful private citizens” is **patently absurd** given the country’s **campaign finance regulations** and the tendency for some people in power (public or private) to abuse that power for personal profit. To claim that never happens undercuts a significant chunk of the argument. It indicates the authors are arguing from an **idealized world**, not the one we live in.

**Paper:** When government does need to leverage the private sector, a robust, independent public AI capacity will improve its ability to effectively partner with industry to advance the national interest.

**Take:** **How?** With a magic wand? I don’t understand this claim.

---

## 7. DOE/NSF and the slap in the face to national supercomputing

**Paper:** In short, these regulations would help keep the AI ecosystem healthy for the situations in which contracting out is necessary.

**Take:** This is a good place to point out that **much of this report is a giant slap in the face to the DOE and NSF supercomputing programs**. These organizations rely heavily on contractors and subcontractors to deliver the closest thing to a **national AI infrastructure** today. To suggest that they should be absorbed into the federal government—and be even more constrained in the choices they can make, the costs they must incur for compliance, and the excess oversight and process that erodes their agility—is **completely out of touch with reality**. DOE and NSF have shown that the government **does not need to be vertically integrated** and own all its own chipmaking, system integration, data centers, and applications to advance science for the public good. Perhaps more than any other single sentence in this report, the tone of this statement makes me question whether it was a good use of my time to respond, because it is in no way grounded with the **decades of success** that the government has already had in maintaining technology and infrastructure, largely through **public–private partnership**, for the national interest.

---

## 8. Tech platforms, cost overruns, and thorny problems

**Paper:** The tech platform example is instructive: countless hours and billions of dollars have been spent optimizing what videos and advertisements people see. Far less effort has gone toward improving veterans benefits or social welfare programs—because that’s not where the money is.

**Take:** Quite hyperbolic, but fine. However, this is an **application** of AI at the very tip of the vertically integrated public AI stack the paper calls for. Billions on ads are not the same as **hundreds of billions** for nation-wide infrastructure to support these applications. Improving the lives of people **is** where the money is for companies who can afford to compete at the top end of the AI game. Business is good when society is happy and productive.

**Paper:** Cost overruns and delivery delays are standard. Quality of the output is sometimes a problem.

**Take:** **Non sequitur.** Is this because of contracting, or incidental to it? I don’t understand how bringing these capabilities in-house will make the process on-time and under-budget. What are examples of government functions handled in-house that are successful and efficient? Jury duty and the DMV?

**Paper:** Even if the system does not replicate all of these pathologies, once national security needs are identified, contracting to private actors still takes a considerable amount of time compared to in-house development and delivery of solutions.

**Take:** **Citation needed.** This is not true.

**Paper:** One can imagine researchers and developers using public AI resources to develop and deploy AI solutions to address thorny problems of poverty and food insecurity, climate change, and disease—without the imperative to commercialize or achieve a return on investment.

**Take:** Again, these are **applications** of AI. The **majority of the investment** required for a vertically integrated public AI stack is **not** in developing AI applications to solve public problems; it’s in **duplicating the massive infrastructure build-out**, operations, and model development that applications sit on. To suggest that these “thorny problems” are not of interest to the corporations who can build the needed AI infrastructure is near-sighted. Food insecurity, climate change, and disease are good for nobody. If people are starving and dying, profits are down. Some companies don’t see societal challenges as aligned with shareholder value, but those companies are playing the short game and are unlikely to have the vision and capital required to build AI infrastructure in the first place.

**Paper:** If private companies understand that the government has the ability to develop national and homeland security solutions in-house, they would have to be more competitive in their pricing and more sensitive to delivering on time and on budget.

**Take:** So the claim is that private companies are **late and over budget because the government lets them**? Show me a case in the **history of leadership supercomputing** where this was true. Stuff is late because **measured bets** are made and developing **first-of-a-kind technology** to solve groundbreaking problems is fundamentally hard and risky. I feel like the authors want it **both ways**: either develop in-house alternatives to commodities so they aren’t fleeced by nefarious subcontractors, or compete directly with a fast-paced global AI industry at unprecedented cost and scale. One comes with **competitive pricing**, the other with **risk-adjusted pricing**.

---

## 9. Outsourcing, expertise, and the magic wand

**Paper:** …reliance on outsourcing to contractors and consultants saps the government of knowledge, talented people, and focus on public problems.

**Take:** Explain how **DOE ASCR** and **NNSA/SC** programs work given this statement. You cannot apply generic findings from the **defense sector** and claim they apply to AI when you already have a much more realistic analog—**national supercomputing efforts in DOE, NSF, and other agencies**—in the government already.

**Paper:** Moreover, having serious in-house AI expertise and capacity will improve federal agencies’ capacity to evaluate private contractors’ AI proposals and products, and ensure that the government gets the products and services it needs at a fair price.

**Take:** Again—**wave a magic wand** and it will be so. You can’t go down to the local Walmart and just **buy AI expertise**. You also cannot train up AI expertise and expect them to stay when they realize their skills are in demand and met with higher value in the private sector. Until the government provides **competitive total compensation**, a **clear, compelling mission**, and a **workplace culture supportive of the highest performers**, there will be a **net egress** of AI (and tech) talent from the government to the private sector.

---

## 10. Big Tech, copyright, privacy, and AI safety

**Paper:** At best, big tech companies have a mixed record when it comes to public safety and welfare and democratic practices.

**Take:** The **same thing** could be said about the government with equal weight and credibility. Any long-lived organization will have blemishes; to present this as unique to Big Tech, and therefore that government is the only alternative, is **disingenuous**.

**Paper:** Some frontier AI companies have already been sued for training their models using massive amounts of copyrighted materials without permission or payment.

**Take:** A little off-topic, but this rings hollow given how much **research for the public good** gets locked behind the paywalls of journals and major publishers. So many of these points about Big Tech not being trusted can be **turned right back at the government**. These problems are not unique to the private sector; they are a function of how the country and society incentivize behavior regardless of who employs people.

**Paper:** Of course, the federal government is not perfect either, especially in the national security context. The U.S. government has undertaken undemocratic and rights-abusing actions. For this reason alone, public AI efforts should be accompanied by strict privacy rules and independent oversight. But in creating a public option for AI, lawmakers have the opportunity to advance democratic values and establish layers of oversight and transparency, which—unlike private companies—are democratically accountable.

**Take:** This started out good and then took a **hard turn**. Why is **public AI** the only one that should be accompanied by strict privacy rules? This reads like “we should have public AI so we can regulate data privacy” when the real statement should be “**we should regulate data privacy**.” Also, “democratically accountable” doesn’t exactly mesh with the claim that the private sector is only out to maximize shareholder profits. When a company does something bad for society, generally speaking **its share price reflects that**. There are exceptions.

**Paper:** Some firms also seem to treat AI safety as an afterthought, which has led to alternative firms created by disaffected and worried former employees. Leading figures have warned that generative AI poses catastrophic and potentially existential risks, including “large-scale destruction” within a few years. Some have declared that future generative AI models will be so powerful and risk-laden that they should not be in private hands.

**Take:** Doesn’t this **undercut** the idea that private industry cannot be trusted to care about AI safety? It didn’t take government to tell these people to create their own firms or to get VCs to fund them. **The problem is being addressed by private industry.** Regarding “large-scale destruction,” that’s **not what the testimony says**. And citing a **podcast**, which has a financial incentive to drive listenership with controversial claims, as an authority on the risks of AI **severely undercuts the credibility** of this paragraph. Shame on the authors.

---

## 11. Government at the cutting edge of AI safety

**Paper:** Then the U.S. government should be at the cutting edge of AI safety research. To conduct cutting-edge AI safety research, the federal government needs its own AI capabilities on which public employees and outside independent non-profit researchers can build frontier models and conduct safety testing.

**Take:** Unless the government prevents it, **frontier models will be proprietary**, so **collaboration with private industry** will be necessary to have a material impact on AI safety. Developing its own **vertically integrated AI safety capabilities** means necessarily going head-to-head with the largest AI companies in the world to develop models that can be deeply inspected. **This is not tractable, full stop.** The focus should be on **building trust with industry through partnership**, not decrying the private sector as nefarious and claiming you’ll do what they do but better, faster, and cheaper. Developing **parallel capabilities** to train frontier models makes no sense. It’s really expensive, even by government standards.

---

## 12. First to encounter superintelligence, corporate incentives, and government experience

**Paper:** Moreover, if existential risks or emergent properties do materialize, it would likely be better for the first people to encounter and engage with such models to be public sector AI developers and national security professionals, who can be held publicly accountable, rather than corporate engineers and executives with primarily economic incentives. First, the government would most likely encounter such models in a closed, classified facility rather than a more open corporate environment.

**Take:** There is **no “open corporate environment”** in which a superintelligence will be developed. The authors clearly have no clue how leading-edge AI development is happening. The **security of the facilities** training frontier models is **at least as comprehensive** as classified data centers, because they are just as worried about secrets being stolen by adversarial state actors. To suggest otherwise is ignorant.

**Paper:** Second, corporate incentives will likely push in the direction of release without sufficient testing or controls.

**Take:** The authors have clearly **never talked to anyone** who is credibly working on AGI. I don’t know anyone in the industry who has **release without sufficient testing** in their business plan when AGI or superintelligence is reached. A system running a superintelligence will be **phenomenally expensive** to own and operate. To suggest that any person off the street would be given access as soon as it is activated **ignores the financial realities**. The AI industry is not this carefree and reckless.

**Paper:** Third, the government has decades of experience (and is generally quite good at) maintaining security for extremely dangerous materials and sensitive information—from nuclear and cyber weapons to disease samples and state secrets.

**Take:** Do you think **corporations aren’t good at keeping secrets** too? Show me evidence that the government is **better than industry** at these things. The specific cases mentioned are places where **the private sector is not allowed to compete**. Of course the government will have a better track record—**nobody else is on the track**.

---

## 13. Profit motive, tech patriotism, and “complement not crowd out”

**Paper:** Tech companies seek to maximize profits for their shareholders. But the profit motive does not necessarily overlap with the United States’s national security interests or with the public interest.

**Take:** They do not **necessarily**, but they **often do**. American tech companies require a **stable and successful nation** to maximize profits, so acting in the national interest is often aligned with financial incentives.

**Paper:** Arguments about tech patriotism in the AI race with China are particularly questionable given that most big tech companies operate in China, are dependent on China for production of their hardware, or have consistently attempted to get into Chinese markets (and been thwarted by Chinese officials).

**Take:** I agree with the sentiment, but I don’t think this is as true as the authors wish. As relations between the US and China get **frostier**, companies have a **natural incentive to distance themselves**.

**Paper:** It is not unrealistic to worry that commercial ties to adversarial or diplomatically transactional countries could, if enough money or market share was at stake, undermine or complicate American firms’ services to the U.S. government.

**Take:** I don’t disagree. There is a concerning amount of “free money” flowing into the US tech sector from nations with checkered human rights records. This is **geopolitical** and **far beyond the scope of AI** though.

**Paper:** Rather, it is simply to say that profit seekers are likely to argue for policies that benefit their shareholders, not the American public, when these two sets of interests are at odds.

**Take:** A reasonable person could argue that a **profit seeker could also be president**, a member of Congress, or any other elected or career member of the US government. This is a **pretty weak argument** when used to argue that the government will do a better job than corporations or startups.

**Paper:** First, the sprint to build public AI would complement—not prevent, preclude, or crowd out—private AI infrastructure and investment. It would coexist with the private sector and address national security challenges and public goods.

**Take:** There is **zero threat** that public AI would “crowd out” private AI. And “complement” is very hard to distinguish from **“compete against, poorly”** when it comes to paying smart people to do innovative things that have dual use.

---

## 14. “Resilient,” “uncompromised,” and Congress

**Paper:** It would also ensure a dedicated, **resilient**, and **uncompromised** AI capacity that would meaningfully strengthen national security and advance public AI capacity.

**Take:** **Resilient?** How will that work when **existing government HPC resources are completely unresilient**? I would say the government’s ability to deliver resilient, large-scale infrastructure for HPC is **far behind** the capabilities of commercial AI supercomputers. I would love to see a **Top 10 supercomputer at a government lab** train a **trillion-parameter model to convergence** (as opposed to training it for just a few steps and writing a paper about it!). It would be an eye-opening experience. What does **“uncompromised AI capacity”** even mean? To put a fine point on it: **what happens to this infrastructure when Congress can’t pass a budget?** When this happened during my time in government, I was fortunate to be a contractor and have my employer carry my salary until the politicians got their act together. Do you know how much money is lost when a data center full of GPUs goes **idle for days or weeks** in the private sector? Industry, and the shareholders holding them accountable, **does not stand for that level of dysfunction**.

---

## 15. Government as innovator, hiring, and the magic wand again

**Paper:** The U.S. Government has historically been a transformational innovator and enabler of public-interested technological innovation where there is an urgent and compelling national interest. Finally, to the extent that building public AI would require transforming government—by hiring many new people with technological experience and expertise and increasing state capacity for public activities—this is a feature, not a bug. For too long, the government’s capacity to act, and especially to act on technology, has been underdeveloped, slow, and outsourced.

**Take:** The U.S. Government has historically been a transformational innovator **when there is no commercial interest** in doing something. **Going to the moon is not profitable. Nuclear weapons are not profitable** (because they’re so highly regulated). **AI is profitable** and transformational because it is a feature of products that are already profitable. To liken the government’s role in AI to the government’s role in the **moon landing is a joke**. As far as “hiring many new people with technological experience and expertise,” should someone (Congress?) just **wave their magic wand** and make working in government at least as desirable as working in private industry for AI research? The government is slow to move because **it works by consensus**. Do you think AI innovation would happen if it moved at the pace of the **slowest thinker**? What would motivate a smart and ambitious AI practitioner to work in a slow-moving environment, mired in bureaucracy, where the penalty for underperforming is a lifelong salary with no critical responsibilities? **Pay** is an obvious challenge. How can the government justify the highest-paid government employees—who would have to be paid **more than the US president** to be competitive with industry—working on nebulous AI initiatives, dictated in part by clueless bureaucrats, in direct competition with a focused and driven private sector? You **can’t just go to Walmart and buy AI expertise**. The authors completely fail to acknowledge that and speak as if they have a magic wand.

---

## 16. “One GPU manufacturer, three cloud providers, a handful of labs”

**Paper:** Our current, largely unregulated ecosystem of **one GPU manufacturer**, **three Big Tech cloud providers**, and a **handful of AI labs** at or affiliated with Big Tech companies will not provide the AI that the United States needs to safeguard national security and serve the public.

**Take:** This seems **intentionally hyperbolic**. Don’t tell **AMD** investors that there’s only one GPU provider—their quarterly financials don’t seem to reflect that. Even if there were more competition in the market, what will you do about **TSMC**? This isn’t a one-dimensional issue. Don’t tell **Meta AI** that they are affiliated with a cloud provider. Or **Anthropic**. In fact, **OpenAI and Google** are the only two AI shops that fit this categorization, and **OpenAI is already branching out**.

---

## Closing

The National Security Case for Public AI pushes for publicly owned and operated layers in the stack and public utility–style regulation. The critique above holds that the paper is often unmoored from how the AI supply chain and talent markets actually work (coal/railroad, “innovative start-ups,” vertical integration), from the **existing success** of DOE and NSF supercomputing via contractors and partnership, and from the **feasibility** of a vertically integrated public AI (resilience, budget dysfunction, compensation, culture). It also challenges the conflation of “public option” with “regulate privacy,” the use of podcast claims as authority on existential risk, and the picture of an “open corporate environment” for frontier AI. The commentator’s bottom line: build trust with industry through partnership; don’t claim you’ll do what they do better, faster, and cheaper with a wave of the wand.

---

*Source: Vanderbilt Policy Accelerator, The National Security Case for Public AI; commentator’s notes (A critique of the call for public AI). No invented content.*
