# Papers Module — Article 1: Policy, SmartNICs, Sustainability, and RDMA

**Purpose:** One medium-length article from the Papers module. Policy, infrastructure, sustainability, and LLM systems. Place your images or quote blocks where you see **[Quote]** or **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

The Papers module spans policy, infrastructure, sustainability, and systems design.

This article ties four strands together: government’s role in AI (democratic vs authoritarian), how Azure SmartNICs work, why clean power and carbon removal matter for datacenters, and what RDMA means for LLM systems.

Each section stands alone. Together they form one coherent read.

---

## 1. A democratic vision for AI — What the op-ed argues

Sam Altman’s op-ed speaks to government’s role in AI.

The title says it: **A democratic vision for artificial intelligence must prevail over an authoritarian one.**

The piece is built around six pillars. No hype — policy, incentives, and infrastructure.

**[Quote]**

American AI firms and industry need robust security measures so the coalition keeps the lead and the private sector can innovate.

**[Quote]**

Government and the private sector should partner to develop those measures as fast as possible.

**[Quote]**

Public–private partnerships should build the infrastructure so U.S. firms have the compute to expand access and distribute AI’s benefits.

**[Quote]**

Coherent commercial diplomacy: clarity on export controls and foreign investment rules for the global build-out of AI.

**[Quote]**

Making open-sourced models available to developers in allied nations strengthens the coalition. Leadership in AI means exporting values, not just technology.

**[Quote]**

An investment fund for countries committed to democratic AI protocols could help them expand domestic compute.

**Takeaway:** Align incentives. Build infrastructure. Set rules. Keep the lead where it matters.

---

## 2. Azure SmartNICs — Flow table, pipeline, and serviceability

Azure Accelerated Networking runs on SmartNICs. First generation in every Azure compute server from 2015.

The job: make the SmartNIC look like a single NIC with full SR-IOV and GFT (generic flow table) support.

**GFT flows** are defined by VFP unified flows: L2/L3/L4 tuples and header transposition (HT) actions.

**Policy:** VFP software enforces policy on the first packet of a TCP/UDP flow. Actions are cached so later packets in the same flow are handled in hardware.

**Stateful flows** map to a single core/thread to avoid state sharing and out-of-order processing.

**Pipeline:** Parser → flow table lookup → Action. The action stage uses microcode so behavior can be updated without recompiling the FPGA image.

**[Quote]**

When the FPGA receives an exception packet, it overloads the 802.1Q VLAN ID to mark the exception path and forwards the packet to the hypervisor vPort. VFP performs flow creation.

**[Quote]**

The parser stage parses aggregated header information to determine encapsulation type.

**[Quote]**

When the FPGA detects termination packets (SYN, RST, FIN), it duplicates the packet: one copy to destination, one to the hypervisor vPort. VFP uses it for TCP state tracking and rule deletion.

**Lazy flow updates:** the first packet of each flow is marked as an exception so the control plane stays in software and the data plane stays off the host.

**Online serviceability:** turn off hardware acceleration and fall back to synthetic vNICs when servicing SmartNICs.

**Transparent bonding:** when a VF comes up, NetVSC marks it as slave; the TCP/IP stack stays bound only to the synthetic NIC. App-level transparency for RDMA serviceability remains an open question.

**Scalability:** at 100G, 200G, and 400G, scaling looks bleak if every packet hits the CPU. Flow tables and actions in the NIC are how you avoid that.

---

## 3. Big Tech and clean power for AI

**Big Tech Is Rushing to Find Clean Power to Fuel AI’s Insatiable Appetite** — part of the sustainability-in-HPC discussion.

**[Quote]**

Tech companies are already the largest purchasers of wind and solar power.

**[Quote]**

Google pays a set rate that covers the difference between the cost of power and the lower-cost source the utility would have used. So the utility can buy from a more expensive geothermal provider; Google covers the gap.

**[Quote]**

Tech companies and steelmaker Nucor pay higher rates that help lower Duke Energy’s long-term costs and accelerate development — small nuclear, long-duration storage. Getting regulatory approval to fund such projects with ratepayer money alone is difficult.

**[Quote]**

Microsoft has struck deals with Occidental Petroleum and Arbor (founded by ex-SpaceX engineers). It is by far the biggest buyer of carbon removal credits.

**Takeaway:** Demand for clean, firm power is real. Infrastructure takes years. Contracts that de-risk build-out matter.

---

## 4. Carbon removal — One dominant buyer

**Carbon-Removal Firms Have One Very Big Backer. That’s a Problem.** — also part of sustainability in HPC.

**[Quote]**

Most of the money in carbon removal is coming from one buyer: Microsoft.

**[Quote]**

Microsoft has made more than two-thirds of all carbon-removal purchases to date.

**Market makers:** Companies such as Patch, CUR8, and CarbonX link corporate buyers with carbon project developers.

**[Quote]**

Removal credits (projects that pull CO₂ from the atmosphere) are seen as higher quality than avoidance credits (projects that reduce emissions by preventing release). They are also much more expensive: avoidance can be under $20/ton; removal with direct air capture can cost as much as $1,100/ton.

So a carbon removal credit is worth on the order of **55×** a carbon avoidance credit.

For infrastructure and policy: one dominant buyer is a risk. Diversity of demand would make the market more resilient.

---

## 5. Datacenter emissions and genAI

**Datacenters to emit 3× more carbon dioxide because of genAI** — sustainability in HPC.

**[Quote]**

Microsoft’s CO₂ emissions rose 29.1% from the 2020 baseline; much of this was indirect (Scope 3) from the construction of more datacenters.

**[Quote]**

About 60% of that increase can be attributed to the power requirements of the facilities.

**[Quote]**

Reforestation projects are often cited as key beneficiaries of offset demand.

**Takeaway:** For anyone planning infrastructure, emissions reporting (Scope 1, 2, 3) and power sourcing are no longer optional. GenAI increases compute density and power draw; the grid mix decides the footprint.

---

## 6. RDMA in LLM systems — Collectives vs production

**Explorations of RDMA in LLM Systems** — where collectives meet disaggregated inference.

**[Quote]**

Collectives require a fixed “world” of participants. Nodes can’t be added or removed. In disaggregated inference, Prefillers and Decoders exchange KvCache; production traffic fluctuates, replica count must scale, and machines fail.

**[Quote]**

Initializing the collective world is blocking and requires every participant to join. Every time you scale up or down, the whole world must pause.

**[Quote]**

Collectives guarantee global ordering semantics; networks deliver messages out of order, so the library may need buffering or synchronization. Some applications don’t want that guarantee — e.g. KvCache transfer, where only eventual arrival of all pages matters, not order.

**[Quote]**

Collectives require all participants to share the same tensor shape and dtype. That can hurt ergonomics and performance (e.g. using collectives for RPC forces maximum message size).

**[Quote]**

Most RDMA code uses RC (Reliable Connection), in-order. EFA uses SRD (Scalable Reliable Datagram) — reliable but unordered.

**[Quote]**

SRD is datagram-based: you can send if you know the address. RC requires connection setup.

**[Quote]**

IBGDA lets GPUs directly initiate NIC operations — but only ConnectX supports it; without it, you need CPU mediation for “GPU-side” RDMA.

**[Quote]**

CPU–GPU PCIe latency is only ~2 μs.

**Takeaway:** Collectives fit fixed training jobs. For dynamic, disaggregated inference, you need something that doesn’t assume a fixed world. Custom inference engines, routing layers, and networking stacks are where the work is.

---

## 7. FASST RFI — DOE and adaptation

The **DOE FASST RFI** is part of the policy and infrastructure landscape.

Responses (e.g. “FASST will be DOE’s opportunity to adapt, align, or…”) have been published separately; the RFI is the U.S. government’s opportunity to shape how advanced computing and AI align with national priorities.

---

## Closing

Policy (democratic AI, export controls, investment). Infrastructure (SmartNICs, flow tables, serviceability). Sustainability (clean power, carbon removal, datacenter emissions). Systems (RDMA, collectives, LLM inference).

The Papers module is where these threads meet. Use the **[Quote]** and **[Image: …]** placeholders to drop in your visuals or pull quotes for a clean, long-form layout.

Ready for nerds, hospitals, and government.

---

**Source:** Your Papers materials (Democratic AI op-ed, Azure SmartNICs, Big Tech clean power, Carbon removal, Datacenter emissions, RDMA in LLM systems, FASST RFI). No invented facts.
