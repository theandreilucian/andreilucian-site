# HPC In An AI World — One Article

**Purpose:** One article from Dan Reed’s essay *HPC In An AI World* and the longer statement piece he co-authored with Jack Dongarra and Dennis Gannon, with annotated commentary from an HPC-turned-AI infrastructure practitioner.

**Voice:** Confident, technical, critical. Audience: nerds, hospitals, government.

**Source:** Reed essay + source paper; commentator’s notes (national-scale scientific HPC, Microsoft frontier-model supercomputing, VAST enterprise AI). No invented content.

---

## Introduction

Dan Reed recently published an essay, **HPC In An AI World**, that summarizes a longer-form statement piece he co-authored with Jack Dongarra and Dennis Gannon. It’s worth a read: as with much of Dr. Reed’s writing, it takes a hard, critical look at where the HPC community must look as the ground shifts under it under AI’s market forces.

This is a topic many have written about. Reading Dr. Reed’s latest post—and the source paper behind it—I found myself agreeing with a number of his positions and disagreeing with others.

My own background sits in the world at the center of his piece: **traditional HPC for scientific computing at national scale**. My outlook is also shaped by years at **Microsoft** supporting massive-scale supercomputing infrastructure for training frontier models, and by my work now at **VAST**, steeped in the wider enterprise AI market. That gives a particular lens. I marked up his essay with my own notes as I read.

In case that perspective—HPC-turned-AI infrastructure practitioner—is useful to anyone who found Dr. Reed’s essay as engaging as I did, I’ve turned those notes into this article.

---

## 1. Energy and data movement, not FLOPS

**[Quote]**

*New Maxim Two: Energy and data movement, not floating point operations, are the scarce resources.*

**[Quote]**

**Take:** This has been true in the HPC world long before exascale. It is not a new maxim.

What *is* relatively new is that the AI world is learning it. As **inference** overtakes **training** as the main consumer of GPU cycles, we are seeing widespread shortages of **DRAM** because of extreme demand for **HBM** and the memory bandwidth it provides. So the maxim stands—but the community that is newly feeling it is the AI side, not HPC.

---

## 2. Benchmarks are mirrors, not levers

**[Quote]**

*New Maxim Three: Benchmarks are mirrors, not levers. Benchmarks rarely drive technical change. Instead, they are snapshots of past and current reality, highlighting progress (or the lack thereof), but they have little power to influence strategic directions.*

**[Quote]**

**Take:** Benchmarks *do* drive technical change—among technology providers who act without conviction. The tech industry is full of companies chasing consumer demand and designing entire product lines to maximize benchmark results, under the mistaken belief that those benchmarks are a reasonable proxy for actual productivity. Many buyers—especially in lower-sophistication markets like enterprise—also treat benchmarks as a proxy for productivity and make purchasing decisions around them.

The result: a **bad set of benchmarks can create and sustain an entire economy** of buyers and sellers who think they are transacting in something useful, when in fact they are wasting resources (time, energy, COGS) because none of them actually understand what drives productivity in their organizations.

The HPC community is generally savvier. Most national computing centers now recognize that **HPL is simply not a meaningful yardstick**. It used to be good for convincing politicians and other non-technical funders that good work was being done. The discourse around AI has put **Rmax** in the ground as a meaningful metric. Politicians now understand “hundreds of thousands of GPUs” or “gigawatts”—neither of which need a benchmark like HPL to prove.

**Aside:** It’s ironic that a paper with Jack Dongarra as an author is now saying HPL is a snapshot of the past. My understanding is that he is the reason HPL results using **emulated FP64** are not allowed on Top500. Techniques like the **Ozaki scheme** achieved the required residuals through more innovative means than brute-forcing FP64 ALUs, but were deemed incompatible with Top500’s purpose. So HPL and Top500 have been reduced to a benchmark that reflects **outputs** (hardware FP64 throughput) rather than **outcomes** (solving a system of equations via LU decomposition). That’s a choice—and it’s one that makes the benchmark a mirror of a particular kind of hardware, not a lever for what we actually care about.

---

## 3. Co-design: workflow first, or swimming upstream?

**[Quote]**

*New Maxim Four: Winning systems are co-designed end-to-end—workflow first, parts list second.*

*… In HPC, we must pivot to funding sustained co-design ecosystems that bet on specific, high-impact scientific workflows.*

**[Quote]**

**Take:** I don’t agree. Funding sustained co-design, as usually framed, is just **swimming upstream with more conviction**.

The real way forward is to **align scientific discovery with the way the technology landscape is moving**. Ride the wave. That may mean scientific discovery turning to completely different techniques that achieve the desired precision and validation through means that make obsolete some of the skills and expertise people have spent careers developing.

Consider the scaffolding of end-to-end workflow automation. A rich ecosystem exists in enterprise and hyperscale: extreme-scale, globally distributed, resilient, observable, high-performance workflows that combine ultra-scalable analytics engines with exascale data warehouses. Realizing that in practice requires **fundamentally rethinking the software infrastructure** everything is built on. The rigidities of **Slurm** and the inherent insecurities of **ACL- and kernel-based** authentication and authorization need to be abandoned—or at least understood as critically limiting factors the HPC community chains itself to.

**Concrete example.** Take a bulk-synchronous MPI job across a hundred thousand GPUs. If one node fails, the whole job fails.

- **Swimming upstream with more conviction:** Pay a storage vendor for a faster file system, fund researchers to build a domain-specific checkpoint library that glues the MPI application to platform-specific APIs, and pay SchedMD to automate fast restart from those two pieces. Fund all three under the same program. You can call that “co-designed end-to-end workflow.”

- **Riding the wave:** Don’t require a job requeue and full restart from checkpoint on failure. Treat the **entire job as an end-to-end workflow**. If a node fails, the job doesn’t stop; it transitions into a **recovery state**. The orchestrator gives it a new node; the job runtime rebuilds the state of the dead node using distributed parity or domain-specific knowledge. A fast file system is **not** necessary for that kind of failure recovery. But the application developers would have to abandon the model of “application = single process invocation” in favor of “application = a system whose state evolves with the underlying hardware.”

Slurm can’t do that. Slurm is tied to the **MPI model** of parallel execution, which assumes nothing ever fails. So I think co-design should be **deferred** until the HPC community first admits that it is still swimming upstream instead of riding the wave. So long as end-to-end co-design is approached as an HPC problem to be solved by HPC people, it will keep swimming upstream.

---

## 4. Prototyping at scale, or production at scale?

**[Quote]**

*New Maxim Five: Research requires prototyping at scale (and risking failure), otherwise it is procurement. A variant of our 2023 maxim, prototyping – testing new and novel ideas – means accepting the risk of failure, otherwise it is simply incremental development. Implicit in the notion of prototyping is the need to test multiple ideas, then harvest the ones with promise. Remember, a prototype that cannot fail has another name – it’s called a product.*

**[Quote]**

**Take:** The idea is right; the **title** is wrong. “Prototyping at scale” is the wrong frame for leadership supercomputers.

The largest commercial AI infrastructure providers do **not** prototype at scale. They frame it differently: **anything done at scale is production**, and if it doesn’t work, make it work. In practice that means skipping year-long acceptance-test processes and hundred-page statements of work. They accept that they **share integration responsibility** with suppliers, and if things go sideways, they work with partners who don’t walk away when times get tough.

National-scale supercomputing has often worked that way in practice, but the HPC community likes to pretend it doesn’t. Consider **Aurora**: if that system wasn’t a prototype-at-scale, it’s hard to name one. Deployment and operations were and remain fraught; it’s built on processors and nodes that were **cancelled as products** before the system entered production. Yet the theatrics of acceptance testing went on, Intel got paid, and we all pretend Aurora is just like Frontier or Perlmutter.

AI doesn’t “prototype at scale.” It **takes a risk** because the next breakthrough can’t wait for every “i” to be dotted. If a hyperscale AI system is a failure, that’s acceptable. Demand for FLOPS is high enough that it will be used by someone for something—even if that use is low-value. The same is true for systems like Aurora; they don’t sit idle even when they don’t live up to the original vision.

AI systems also prove to be bad ideas, just like HPC systems. The difference is scale and attitude: there are **multi-billion-dollar AI supercomputers** that were obsolete before they came online, because the problem they were designed for became irrelevant in the years it took to build them. What was lost? Money and time. The GPUs are still used—e.g. for inference instead of training—and the time lost was compensated by lessons for the systems that followed.

In that sense, all these big AI systems going up **are** prototypes, because AI workloads themselves are continually evolving prototypes. The line between prototype and production becomes blurry, if not meaningless.

---

## 5. Multidisciplinary data fusion — easy to say, hard to make useful

**[Quote]**

*All too often, in scientific computing, our gold is buried in disparate, multi-disciplinary datasets. This needs to change; we must build sustainable, multidisciplinary data fusion.*

**[Quote]**

**Take:** Easy to say; it often feels empty. What’s stopping data fusion? I don’t think it’s willpower or resources. It’s that it’s **really difficult to see what good it does** within a standard theory-based modeling framework. Making productive use of fused multimodal data—meshes, particles, discrete observations—requires **multimodal, multiphysics models**. Those are expensive relative to the insights they deliver.

So the challenge isn’t getting the world’s scientific data to “hold hands and sing kumbaya.” It’s accepting that there’s **limited value** in doing this fusion unless you’re willing to take on **more approximations** in the models that use them, so that **science per dollar** is net positive compared to today’s physics-based, single-mode scientific models.

The AI community accepts that wholly empirical models are much less interpretable but can turn multimodal data into results in a **meaningfully faster, more resource-efficient** way. Example: the **Aurora (climate) model**, which took disparate climate datasets and produced an efficient forecasting tool. In a **minute on a single GPU** it produces forecasts of comparable quality to what would take **hours across multiple GPUs** with a physics-based model—by training on a diverse collection of gridded 3D atmosphere data and tabular data that was fused.

The tradeoff: the model is much less interpretable. If the Aurora model’s forecast is off, forecasters mostly shrug and move on. But for the scientific problem at hand—predicting the weather a few days out—that may be **good enough**.

---

## 6. Governments, computing, and the right strategic asset

**[Quote]**

*Governments must now treat advanced computing as a strategic utility, requiring a scale of coordination and investment that rivals the Manhattan Project or the Apollo program.*

**[Quote]**

**Take:** Manhattan and Apollo had **distinct goals** and a defined “lump of work” to achieve them. They are not comparable. Computing is a **commodity**; a fairer comparison is to oil or gas reserves. And even then: what good are those reserves? One big supercomputer or many small ones? What range of problems would such a strategic utility actually be called on to solve?

In the AI game, advanced computing is a pillar of competitiveness, but not necessarily the **most limiting** one. **DeepSeek** showed that **ingenuity** and **massive computing** are two orthogonal axes. You can spend a lot on GPUs to train a frontier model—or you can be much cleverer with far fewer GPUs and get to similar capability. The **ratio of people to capital** behind DeepSeek-R1 suggests that investing in **innovation**, not just datacenter buildout, can have a much higher return.

So I think governments would do better to treat **innovators** as the strategic asset and worry less about press releases that lead with how many thousands of GPUs will be deployed. For every thousand GPUs deployed on government land in the US this year, how many government researchers, architects, and visionaries have left—and are not coming back?

---

## Closing

Reed’s essay and the underlying paper push the HPC community to face where the world is going. I agree with the direction of travel on scarcity (energy and data movement), on the limits of benchmarks, and on the need to accept risk and failure. I disagree that the answer is primarily more co-design as traditionally conceived, or that “prototyping at scale” is the right frame—and I think data fusion and “strategic utility” need to be stated in terms that admit how hard the former is and what the latter actually is (commodity, reserves, and people).

The perspective above is one practitioner’s markup: HPC roots, time in frontier-model infrastructure, and now the broader enterprise AI market. If it sharpens the conversation for anyone else reading *HPC In An AI World*, it’s done its job.

---

*Source: Dan Reed, “HPC In An AI World”; Reed, Dongarra, Gannon statement piece; commentator’s notes. No invented content.*
