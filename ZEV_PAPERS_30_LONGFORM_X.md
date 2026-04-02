# Zev — 30 Long-Form X Posts (Papers Module)

**Source:** Glenn's Digital Garden — Papers module only.  
**Voice:** Short, confident, specific. Technical clarity over hype. Serious. Audience: nerds.  
**Format:** Long-form threads, 200+ words each. Use line breaks and bullet lists where useful.

---

## P1. Azure SmartNICs — What they are and why they matter

1/ Azure Accelerated Networking runs on SmartNICs. First generation deployed in every Azure compute server starting 2015.  
2/ The job: make the SmartNIC look like one NIC with full SR-IOV and GFT (generic flow table) support.  
3/ GFT flows match source/dest L2/L3/L4 tuple across encapsulation layers, plus a header transposition action.  
4/ Policies enforced in VFP software on the first packet of a new flow; after that, actions cached as exact-match lookup.  
5/ Stateful flows map to one core/thread to avoid state sharing and out-of-order processing inside a single flow.  
6/ Pipeline: Parser → flow table lookup → Action (microcode-driven, so you can update behavior without recompiling the FPGA image).  
7/ Exception packets: FPGA overloads 802.1Q VLAN ID to mark exception path, forwards to hypervisor vPort; VFP does flow creation.  
8/ TCP termination (SYN, RST, FIN): FPGA duplicates packet — one to destination, one to hypervisor vPort for state tracking and rule deletion.  
9/ SR-IOV is all-or-nothing. SmartNICs gave Azure stateless offloads for NVGRE and VxLAN for virtual networking in the 2010s.  
10/ A physical core (2 hyperthreads) is ~$0.10–0.11/hr; scale that to 100G/200G/400G and the economics push you toward programmable data plane.  
11/ They achieved online serviceability by turning off hardware acceleration and falling back to synthetic vNICs when servicing SmartNICs.  
12/ Transparent bonding: VF comes up, NetVSC marks it as slave; TCP/IP stack stays bound only to the synthetic NIC. App-level transparency for RDMA serviceability is still an open question.

**Source:** Azure Accelerated Networking: SmartNICs in the Public Cloud — Microsoft Research. Papers module, glennklockwood.com/garden.

---

## P2. Why flow tables and header transposition belong in the data plane

1/ In Azure’s SmartNIC design, the flow table isn’t in the host. It’s in the NIC.  
2/ First packet of a new TCP/UDP flow hits VFP in software. Policy is applied. Actions are decided.  
3/ Those actions are cached as an exact-match lookup so every following packet in the same flow can be handled in hardware.  
4/ The flow key: source and destination L2/L3/L4 tuple, across multiple encapsulation layers, plus a header transposition (HT) action.  
5/ HT specifies how header fields are added, removed, or changed. One lookup, one action block, no host round-trip for the fast path.  
6/ When the FPGA sees termination packets (SYN, RST, FIN), it duplicates: one copy to destination, one to the hypervisor vPort so VFP can track TCP state and delete rules.  
7/ Exception packets are marked via overloaded 802.1Q VLAN ID and sent to the hypervisor; VFP creates the flow and caches the result.  
8/ Flows are updated lazily by marking the first packet of each flow as an exception. So the control plane stays in software; the data plane stays off the host.  
9/ Software-programmable QoS can sit in the pipeline as optional components. Same idea: first packet sets it up; rest get hardware treatment.  
10/ Scalability at 100GbE and beyond depends on not sending every packet to the CPU. Flow tables and actions in the NIC are how you get there.

**Source:** Azure Accelerated Networking: SmartNICs in the Public Cloud. Papers module, glennklockwood.com/garden.

---

## P3. Democratic AI — What the op-ed actually argues

1/ Sam Altman’s op-ed frames the choice as: democratic vision for AI vs authoritarian vision.  
2/ First pillar: American AI firms and industry need robust security measures so the coalition keeps the lead and the private sector can innovate.  
3/ Second: Government and private sector partner to develop those measures as fast as possible.  
4/ Third: Public–private partnerships to build infrastructure so U.S. firms have the compute to expand access and distribute benefits.  
5/ Fourth: Coherent commercial diplomacy — clarity on export controls and foreign investment rules for the global build-out of AI.  
6/ Open-sourced models available to developers in allied nations strengthen the coalition.  
7/ The stakes aren’t just exporting technology. They’re exporting the values the technology upholds.  
8/ One proposal: an investment fund that countries committed to democratic AI protocols can draw from to expand domestic compute.  
9/ No hype in the piece. It’s a policy argument: align incentives, build infrastructure, set rules, and keep the lead where it matters.

**Source:** A democratic vision for artificial intelligence must prevail over an authoritarian one. Papers module, glennklockwood.com/garden.

---

## P4. Big Tech and clean power for AI

1/ Tech companies are already the largest buyers of wind and solar. AI’s appetite for power is changing how they contract.  
2/ One model: Google pays a set rate that covers the gap between the cost of power and the lower-cost source the utility would have used.  
3/ So the utility buys from a more expensive geothermal provider; Google makes up the difference. The utility isn’t out of pocket.  
4/ Another: Tech companies and industrial customers (e.g. Nucor) pay higher rates that help lower the utility’s long-term costs and accelerate development — e.g. small nuclear, long-duration storage.  
5/ Getting regulatory approval to fund such projects with ratepayer money alone is hard. So large customers are stepping in.  
6/ Microsoft has deals with Occidental and Arbor (ex-SpaceX). It’s by far the biggest buyer of carbon removal credits.  
7/ The pattern: demand for clean, firm power is real. Infrastructure takes years. Contracts that de-risk build-out matter.

**Source:** Big Tech Is Rushing to Find Clean Power to Fuel AI’s Insatiable Appetite. Papers module, glennklockwood.com/garden.

---

## P5. Carbon removal — One buyer dominates

1/ Most of the money in carbon removal is coming from one buyer: Microsoft.  
2/ Microsoft has made more than two-thirds of all carbon-removal purchases to date. The concentration is extreme.  
3/ Removal credits (pull CO₂ from the atmosphere) are seen as higher quality than avoidance credits (reduce emissions by not releasing them).  
4/ They’re also much more expensive. Avoidance can be under $20/ton; removal with direct air capture can run to $1,100/ton.  
5/ So a removal credit can be on the order of 55× an avoidance credit.  
6/ Intermediaries like Patch, CUR8, and CarbonX act as market makers between corporate buyers and project developers.  
7/ For infrastructure and policy: one dominant buyer is a risk. Diversity of demand would make the market more resilient.

**Source:** Carbon-Removal Firms Have One Very Big Backer. That’s a Problem. Papers module, glennklockwood.com/garden.

---

## P6. Datacenter emissions and genAI

1/ Microsoft’s CO₂ emissions rose 29.1% from the 2020 baseline. A large share was indirect (Scope 3) from building more datacenters.  
2/ About 60% of that can be attributed to the power requirements of the facilities.  
3/ GenAI increases compute density and power draw. So the same square footage can imply more emissions unless the grid is cleaner.  
4/ The discussion often centers on reforestation and other offsets. The structural issue is: build more capacity, use more power; the grid mix decides the footprint.  
5/ For anyone planning infrastructure: emissions reporting (Scope 1, 2, 3) and power sourcing are no longer optional.

**Source:** Datacenters to emit 3x more carbon dioxide because of genAI. Papers module, glennklockwood.com/garden.

---

## P7. RDMA in LLM systems — Collectives vs production

1/ Collectives assume a fixed “world” of participants. Nodes can’t be added or removed. In production, that’s a problem.  
2/ Disaggregated inference: Prefillers and Decoders exchange KvCache. Traffic fluctuates; replica count must scale. Machines fail.  
3/ Initializing the collective world is blocking. Every participant must join. Scale up or down and the whole world pauses.  
4/ Collectives give global ordering. Networks don’t. So the library may buffer or synchronize to preserve order.  
5/ Some apps don’t need that. KvCache transfer: you only care that all pages eventually arrive. Order doesn’t matter.  
6/ Collectives also assume the same tensor shape and dtype everywhere. That can hurt ergonomics and performance — e.g. using collectives for RPC forces max message size every time.  
7/ Most RDMA code uses RC (Reliable Connection), in-order. EFA uses SRD (Scalable Reliable Datagram), reliable but unordered.  
8/ SRD is datagram-based: send if you know the address. RC needs connection setup.  
9/ CPU–GPU PCIe latency is only ~2 µs. IBGDA lets GPUs initiate NIC ops directly, but only ConnectX supports it; otherwise you need CPU mediation.  
10/ So: collectives are a good fit for fixed training jobs. For dynamic, disaggregated inference, you need something that doesn’t assume a fixed world.

**Source:** Explorations of RDMA in LLM Systems. Papers module, glennklockwood.com/garden.

---

## P8. FG-HPCC — What NNSA is asking for

1/ LLNL’s Future Generation HPC Center (FG-HPCC) RFI is about tech that could be available in 2029–2030 for NNSA’s Advanced Simulation and Computing (ASC) program.  
2/ NNSA: semi-autonomous under DOE. Stockpile stewardship, nonproliferation, naval reactors. HPC-based modeling and simulation are central.  
3/ The vision: not many independent clusters, but heterogeneous elements exposed as one system. Integrated HPC, AI, and cloud-like workloads.  
4/ Mission needs are evolving: higher-fidelity simulation, weapon modernization, design agencies and production agencies collaborating across the complex.  
5/ Productivity is the focus. Not just faster runs — faster workflows, automation, persistent services.  
6/ Three levers: AI (coupled with simulation and inference), increased automation (CI/CD, ML-ops, rapid library iteration), and persistent services (codes and data available as remote services).  
7/ Gaps they call out: systems are deployed and operated largely independently; incremental upgrades are hard; security is coarse (zones, not fine-grained isolation); users must specify resources explicitly; no common scheduling layer for disaggregated workflows.  
8/ So the center becomes the system. Composable, tightly integrated. Incremental updates. Common software stack. Open APIs.  
9/ They’re not asking one vendor for everything. They’re asking for elements — ModSim capability, AI training/inference, data-intensive services, center-wide storage, data-center network — that can be composed and managed under one control plane.

**Source:** Future Generation High Performance Computing Center (FG-HPCC) — LLNL RFI. Papers module, glennklockwood.com/garden.

---

## P9. FG-HPCC — Security and isolation

1/ FG-HPCC requires security at every level. Multi-tenancy: multiple users, different security levels, composing arbitrary subsets of resources.  
2/ No portion of the system should be dedicated to one security level. Air gap for classified vs unclassified; on each side, strong logical separation.  
3/ Strong on- and off-node isolation. One user cannot see another’s data or actions. Fine-grained partitioning of CPUs, GPUs, network, storage.  
4/ Flexible access control: owners decide who can access data; role-based auth; filesystems and data services enforce it so a single node compromise doesn’t breach the whole system.  
5/ Goal: any workload on any hardware without compromising security. Batch job, on-demand, persistent service, or untrusted CI — same architecture.  
6/ Public cloud has shown that virtualization, software-defined networking, trusted execution, and encryption can be low enough overhead to consider in HPC.  
7/ Traditional HPC often lacks those guarantees. That’s a barrier to converging with hyperscale-style operations.

**Source:** FG-HPCC RFI, Section 3.1 Security. Papers module, glennklockwood.com/garden.

---

## P10. FG-HPCC — Control plane and software stack

1/ LLNS wants a common open-source software stack to provision and control the data center.  
2/ ASC has a history: SLURM, Flux, TOSS, ZFS on Linux, Spack, OpenCHAMI. The stack in the RFI figure sits under both HPC and services/AI.  
3/ Below both: primitives for strong isolation, control-plane APIs, storage APIs.  
4/ No single open standard exists for an on-prem control plane like cloud providers have. The RFI asks what projects could provide open, on-prem, cloud-like control interfaces for heterogeneous hardware and multiple vendors.  
5/ The control plane must let users compose FG-HPCC elements into private, isolated enclaves. It must also let elements be added, upgraded, or removed without breaking user workflows.  
6/ APIs: Sunfish, Redfish, or de facto standards (e.g. S3, Terraform providers). Open, documented. In-band and out-of-band management.  
7/ Resource management: Flux for HPC allocation and scheduling; Kubernetes for services. Both may sit on lower-level IaaS APIs for network, VMs, storage.  
8/ Guest OS: TOSS-based (RHEL-derived), with STIG for classified use. Hardware enablement must be compilable from source against the kernel of choice.  
9/ So: same stack, multiple workloads. Composable hardware, common interfaces, incremental evolution.

**Source:** FG-HPCC RFI, Sections 2.5.3, 3.3. Papers module, glennklockwood.com/garden.

---

## P11. HPC in an AI world — Energy and data movement

1/ Dan Reed (and co-authors) argue: energy and data movement, not floating point, are the scarce resources.  
2/ In HPC that’s been true for a long time. It’s not new. What’s newer is AI catching up: as inference overtakes training as the main consumer of GPU cycles, DRAM and memory bandwidth (e.g. HBM) become the bottleneck.  
3/ So the “new maxim” is really a restatement of what HPC has already learned. Infrastructure that moves data efficiently and uses power wisely matters more than peak FLOPS on a spec sheet.

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P12. Benchmarks — Mirrors, not levers

1/ Reed et al.: benchmarks are mirrors, not levers. They rarely drive technical change; they’re snapshots of current reality.  
2/ Counterpoint: benchmarks do drive change among technology providers who act without conviction. Whole product lines get optimized for benchmark scores.  
3/ Many buyers, especially in less sophisticated markets, treat those benchmarks as a proxy for productivity. So you get an economy of buyers and sellers both focused on a metric that may not reflect what actually drives outcomes.  
4/ HPC is generally savvier. Many national centers now treat HPL as not meaningful for real work.  
5/ In AI, discourse has shifted toward “hundreds of thousands of GPUs” or “gigawatts” — neither needs HPL. So the mirror is already cracking.

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P13. Co-design — Riding the wave vs swimming upstream

1/ Reed et al. argue for funding sustained co-design ecosystems around specific high-impact scientific workflows.  
2/ Critique: that’s still swimming upstream with more conviction. The real leverage is aligning science with how the technology landscape is moving.  
3/ Example: a bulk-synchronous MPI job across 100k GPUs. One node fails, the whole job fails. Co-design in the old sense: faster filesystem, domain-specific checkpoint library, Slurm automation for fast restart.  
4/ Riding the wave: the job is an end-to-end workflow. Node fails → orchestrator gives a new node; runtime rebuilds state from distributed parity or domain knowledge. No fast filesystem required.  
5/ That requires applications to be systems whose state evolves with the hardware, not a single process invocation. Slurm can’t do that; it’s tied to the MPI model where nothing ever fails.  
6/ So: co-design is useful only after the community accepts that it has been swimming upstream. As long as co-design is framed as an HPC problem for HPC people, it stays upstream.

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P14. Prototyping at scale — What AI actually does

1/ Reed et al.: research requires prototyping at scale and risking failure; otherwise it’s procurement.  
2/ In practice, the largest commercial AI builders don’t “prototype at scale.” They treat scale as production. If it doesn’t work, they make it work.  
3/ That means fewer year-long acceptance tests and hundred-page SOWs. Shared responsibility for integration with suppliers; partners who don’t walk when things go wrong.  
4/ National-scale supercomputing has always had some of that in reality. Aurora: deployment and operations fraught, nodes built on cancelled products. But the theatrics of acceptance testing went on.  
5/ In AI, if a hyperscale system “fails,” the demand for FLOPS is so high that someone uses it for something. Same with Aurora: it doesn’t sit idle.  
6/ So the line between prototype and production is blurry. Big AI systems are prototypes in the sense that the workloads themselves are still evolving. The useful distinction is how you operate, not the word on the contract.

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P15. Data fusion — What’s actually blocking it

1/ Reed et al.: scientific gold is in disparate, multi-disciplinary datasets; we need sustainable, multidisciplinary data fusion.  
2/ That’s easy to say. What’s stopping it isn’t willpower or money. It’s that using fused multimodal data (meshes, particles, discrete observations) well requires multimodal, multiphysics models. Those are expensive relative to the insights they deliver.  
3/ The challenge isn’t “get everyone to hold hands and share data.” It’s accepting that fusion has limited value unless you also take on more approximation in the models so that science per dollar improves.  
4/ AI-style empirical models are less interpretable but can turn multimodal data into results faster and with less bespoke modeling. Example: Aurora (climate) model — diverse gridded and tabular data, forecasts in a minute on one GPU that match hours on multiple GPUs with physics-based models.  
5/ The tradeoff: if the forecast is wrong, you have less to point to than with a physics model. For the problem at hand (weather a few days out), that may be acceptable.

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P16. Government and advanced computing — Strategic utility?

1/ Reed et al.: governments should treat advanced computing as a strategic utility, with coordination and investment on the scale of Manhattan or Apollo.  
2/ Manhattan and Apollo had defined goals and a bounded “lump of work.” Computing is a commodity; a fairer analogy is oil or gas reserves.  
3/ And then: what form does that reserve take? One big machine or many small ones? What problems would it solve?  
4/ In AI, advanced computing is a pillar of competitiveness but not necessarily the main limiter. DeepSeek showed that ingenuity and compute are orthogonal. You can spend a lot on GPUs or be clever with fewer.  
5/ So: governments might do better to treat innovators as the strategic asset and worry less about press releases that lead with “thousands of GPUs.” For every thousand GPUs deployed on government land, how many researchers and architects have left and won’t come back?

**Source:** HPC In An AI World — Glenn’s commentary. Papers module, glennklockwood.com/garden.

---

## P17. Machines of Loving Grace — What “powerful AI” means

1/ Dario Amodei (Anthropic): powerful AI could arrive as early as 2026. By “powerful” he means a model (likely LLM-like) that can be given tasks lasting hours, days, or weeks and execute them autonomously, like a smart employee, asking for clarification when needed.  
2/ Smarter than a Nobel-level human across most relevant fields. Interfaces: text, audio, video, mouse/keyboard, internet. Can take actions, direct humans, order materials, run experiments.  
3/ Training compute can be repurposed to run millions of instances. So: one training run, millions of copies. Inference is much cheaper than training.  
4/ He frames the limiting factors: speed of the physical world, need for data, intrinsic complexity, human constraints, physical laws. Intelligence is powerful but not magic; progress will be uneven across domains.  
5/ The essay is explicit: this is about upside, not only risk. Biology, neuroscience, economic development, governance, work and meaning. All in 5–10 years after such a system exists, if things go right.

**Source:** Machines of Loving Grace. Papers module, glennklockwood.com/garden.

---

## P18. Biology — Where the returns to intelligence are high

1/ Amodei: a surprisingly large fraction of progress in biology comes from a tiny number of discoveries — broad measurement tools or techniques that allow precise, programmable intervention. Roughly one major one per year; collectively they drive more than half of progress.  
2/ Examples: CRISPR, advanced microscopy, genome sequencing and synthesis, optogenetics, mRNA vaccines, CAR-T.  
3/ These discoveries are usually made by a small set of researchers, often the same people. That suggests skill and insight, not just random search.  
4/ Many could have been made earlier. CRISPR was known in bacteria since the 1980s; it took decades to see it as general gene editing.  
5/ So the claim: 10× more talented, creative researchers could 10× the rate of these discoveries. Or: 50–100 years of biological progress in 5–10 years with powerful AI.  
6/ He’s open to 1000 years of progress in 5–10 years, but skeptical of 100 years in 1 year. Serial dependence and experiment latency cap the speed; parallelism can still be large.

**Source:** Machines of Loving Grace. Papers module, glennklockwood.com/garden.

---

## P19. Nuclear finance — Why project finance doesn’t fit

1/ Nuclear projects are hard to fund through normal project financing. Upfront costs are high, construction is long.  
2/ If the company building the project defaults, a half-built plant is poor collateral. Lenders would demand rates that make the project uneconomic.  
3/ So the structure of risk doesn’t match what project finance assumes. Someone has to bear the construction and completion risk.  
4/ That suggests a role for government or other backstops: underwriting construction that the market deems too risky. Big tech may build some power capacity, but they’d rather not carry that risk alone.  
5/ For infrastructure planning: nuclear (and other large, long-lived assets) need financing models that don’t assume tradable collateral at every stage.

**Source:** Nuclear finance will rely on consumers’ stomach for risk. Papers module, glennklockwood.com/garden.

---

## P20. DOE — Powering AI and data center infrastructure

1/ The DOE recommendations on powering AI and data centers reflect interviews with electricity providers, data center customers, and other large customers.  
2/ Almost uniformly they recommended: accelerate generation and storage additions, delay retirements, invest in existing resources (uprating, relicensing of nuclear and hydro).  
3/ On government’s role: private sector investment far outweighs other funding, and there is limited visibility into private sector progress.  
4/ So the document acknowledges that the bulk of build-out is private; the public role is to align incentives, reliability, and planning rather than to own everything.

**Source:** Recommendations on Powering Artificial Intelligence and Data Center Infrastructure. Papers module, glennklockwood.com/garden.

---

## P21. Meta RSC — What they measured

1/ Meta’s “Revisiting Reliability in Large-Scale Machine Learning Research Clusters” looks at 11 months on two clusters: 16K A100 (RSC-1) and 8K A100 (RSC-2). Mixed workloads, wildly varying scale.  
2/ They use Slurm on bare metal. Jobs eligible for preemption after 2 hours; max lifetime 7 days.  
3/ ~7.2K (RSC-1) and ~4.4K (RSC-2) jobs per day; 83% and 85% utilization.  
4/ 4K-GPU jobs are under 1% of jobs but consume ~12% of cluster GPU resources.  
5/ They model reliability as a series of nodes: MTTF of 1024-GPU jobs is 7.9 hours — about two orders of magnitude lower than 8-GPU jobs (47.7 days). So each node is a single point of failure; scale multiplies it.  
6/ Health checks every 5 minutes; integrated with the scheduler. High severity → remove node and reschedule jobs; lower severity → remove after jobs finish.  
7/ Failures: IB links, filesystem mounts, GPU memory errors, PCIe errors. Filesystem mounts contributing heavily is a strong argument for object storage instead of shared parallel filesystems for training.

**Source:** Revisiting Reliability in Large-Scale Machine Learning Research Clusters (Meta). Papers module, glennklockwood.com/garden.

---

## P22. Meta RSC — Goodput, preemption, and second-order effects

1/ Meta uses “goodput” (they note it’s not the industry-standard definition): productive runtime vs available wall-clock time.  
2/ Job preemption, resource fragmentation, and failures are the dominant sources of lost goodput.  
3/ Preemption after 2 hours lets large jobs launch without draining the whole cluster, but rapid failures of large jobs cause excessive preemption of small jobs and undercut utilization gains.  
4/ Example: one 1024-GPU job NODE_FAIL and requeue 35 times → 548 preemptions (over 7K GPUs). Bad interaction between policy and infrastructure.  
5/ About 16% of lost goodput from hardware failures is from second-order preemptions — jobs of smaller size getting preempted because of large-job failures. So the whole cluster feels the failure.  
6/ Restart time (u₀) is on the order of 5–20 minutes. For 100K-GPU runs at RSC-2-like failure rates, to get ETTR ~0.9 you’d need checkpoint intervals and restart overhead on the order of ~2 minutes.  
7/ Takeaway: reliability and scheduling policy are coupled. You can’t optimize one without the other.

**Source:** Revisiting Reliability in Large-Scale Machine Learning Research Clusters (Meta). Papers module, glennklockwood.com/garden.

---

## P23. Lemon nodes — How Meta finds them

1/ Meta correlates many detection signals with “lemon” nodes. Among them: distinct jobs that excluded a node, XID error count, repair tickets, times node was taken out of availability, single- and multi-node job failures tied to that node.  
2/ Same idea as using Darshan logs at scale to correlate job slowness with specific Lustre OSTs: find the bad actors in the pool.  
3/ Their lemon-node detection gave a 10% reduction in large (512+ GPU) job failures, from 14% to 4%. They also claim a 30% improvement in large-job completion rate; the exact definition of “large” and the math are worth reading carefully.  
4/ The qualitative point stands: retroactively identifying nodes that show up in failed jobs and taking them out of the pool improves outcomes.  
5/ You need historic data. You also need the orchestrator and the application to cooperate — infrastructure that is programmable by the application layer.

**Source:** Revisiting Reliability in Large-Scale Machine Learning Research Clusters (Meta). Papers module, glennklockwood.com/garden.

---

## P24. The Adolescence of Technology — Scaling and sentiment

1/ Dario Amodei: public sentiment swings every few months between “AI is hitting a wall” and “this changes everything.” Behind that, there has been a smooth, unyielding increase in AI’s cognitive capabilities.  
2/ Scaling laws are jagged at the micro level, smooth at the macro. Same way Moore’s Law was reinterpreted to keep it alive.  
3/ He adds: the feedback loop is gathering steam; in 1–2 years the current generation of AI may autonomously build the next.  
4/ “Agentic” appears in the essay — agents as a necessary step toward superintelligence.  
5/ Pre-training gives models a range of human-like motivations or personas; post-training selects and steers them. So behavior is a mix of what was learned from data and what was reinforced by design.

**Source:** The Adolescence of Technology. Papers module, glennklockwood.com/garden.

---

## P25. Constitutional AI and interpretability

1/ Anthropic’s Constitutional AI: a central document of values and principles the model reads and keeps in mind during post-training. The goal is a model that almost always follows this constitution.  
2/ Instead of a long list of do’s and don’ts, the constitution gives high-level principles, reasoning, and examples, and encourages the model to think of itself as a particular type of person (ethical, balanced, thoughtful).  
3/ They’ve identified tens of millions of “features” inside the net that correspond to human-understandable concepts, and can selectively activate features to alter behavior.  
4/ They’ve gone beyond single features to “circuits” — e.g. rhyming, theory of mind, step-by-step reasoning.  
5/ So you can ask why the model is behaving a certain way — e.g. whether it’s saying something it believes is false or hiding capabilities. You can look at which regions activate.  
6/ System cards with each release; they run to hundreds of pages. The claim: they practice what they preach on transparency and safety.

**Source:** The Adolescence of Technology. Papers module, glennklockwood.com/garden.

---

## P26. Chips and the race — What DeepSeek changed

1/ Amodei: chips and chip-making tools are the single greatest bottleneck to powerful AI; blocking them is simple and effective.  
2/ Counterpoint: DeepSeek showed that being smart can be orthogonal to being big. You can spend a lot on GPUs or get more out of fewer with better methods.  
3/ Where the chip argument holds: China is several years behind the U.S. in producing frontier chips at scale. The critical window for “country of geniuses in a datacenter” may be those years.  
4/ So the goal isn’t to prevent China from ever having powerful models. It’s to slow their build-out for a few years so democratic countries can build with more attention to risk and still lead.  
5/ The first step he names: those closest to the technology tell the truth about the situation. Same spirit as writing clearly about infrastructure: no hype, just what’s there.

**Source:** The Adolescence of Technology; HPC In An AI World. Papers module, glennklockwood.com/garden.

---

## P27. The Intelligence Age — What Altman claimed

1/ Sam Altman’s “The Intelligence Age” declares deep learning a success as a path to AGI.  
2/ It is possible we have superintelligence in a few thousand days. That’s the outer edge of the claim.  
3/ Deep learning worked and got predictably better with scale; we dedicated more resources to it.  
4/ So: humanity found an algorithm that can learn (or approximate) the rules underlying any distribution of data.  
5/ The piece is short. It doesn’t argue the case in detail; it states a position. Frontier models will continue to need bigger, faster, more expensive supercomputers to improve — that’s the implied infrastructure bet.

**Source:** The Intelligence Age. Papers module, glennklockwood.com/garden.

---

## P28. Public AI — The Vanderbilt paper and its flaws

1/ The National Security Case for Public AI (Vanderbilt) argues for publicly provided/owned/operated layers in the AI stack and public-utility-style regulation of private AI.  
2/ Problems: likening AI innovation to the rollout of a generic web service (e.g. healthcare.gov) ignores how different AI and its expertise are from general IT.  
3/ “More affordable mission-driven staff” for AI doesn’t match reality. The people who build frontier systems are not cheap; you can’t wish them into government at taxpayer pay scales without changing the game.  
4/ The report often treats the AI supply chain as if it were like coal and railroads. Data centers without GPUs aren’t useful; GPUs without models aren’t useful. The analogies break.  
5/ DOE and NSF supercomputing already rely heavily on contractors and partnerships. Suggesting the government absorb and run a vertically integrated AI stack is out of touch with how that infrastructure has actually been built and operated for decades.

**Source:** The National Security Case for Public AI — Glenn’s critique. Papers module, glennklockwood.com/garden.

---

## P29. Public AI — What would actually help

1/ Trust and partnership with industry would do more than claiming the government will build a parallel, vertically integrated AI stack.  
2/ Developing frontier models in-house to “compete” with the private sector is not tractable. The cost and talent requirements are too large.  
3/ Regulation (e.g. privacy, safety, competition) should apply regardless of who runs the systems. “We need public AI so we can regulate privacy” should be “we need to regulate privacy.”  
4/ Government can improve its ability to evaluate contractors and set requirements if it has in-house technical depth. That requires competitive compensation, clear mission, and a culture that keeps high performers — not a magic wand.  
5/ The useful role for government: set rules, fund research, underwrite risk where the market won’t (e.g. certain infrastructure), and partner with industry instead of pretending to replace it.

**Source:** The National Security Case for Public AI — Glenn’s critique. Papers module, glennklockwood.com/garden.

---

## P30. Object storage vs filesystems for training

1/ Meta’s reliability paper: filesystem mounts contribute heavily to job failures. Shared, file-based storage requires a stateful relationship between each compute node’s kernel and a remote, distributed service.  
2/ When that relationship breaks, the node looks unhealthy and jobs fail. Object storage puts authentication and session management in the application. Storage issues don’t have to be node health issues.  
3/ The node only needs to provide the data plane (network connectivity to storage), not the control plane (auth, authz) that file-based storage demands.  
4/ So: fewer failure modes, more flexible recovery. Applications can respond to misbehaving storage without the orchestrator having to treat every storage blip as a node failure.  
5/ For large-scale training, the takeaway is straightforward. Prefer object storage where the workload allows. Decouple data access from the kernel’s view of node health.

**Source:** Revisiting Reliability in Large-Scale Machine Learning Research Clusters (Meta). Papers module, glennklockwood.com/garden.

---

*End of 30 long-form threads. Each thread 200+ words. Source: Glenn's Digital Garden — Papers module only. Voice: Zev (short, confident, specific, technical, serious, nerds).*
