# Nodes: Azure, BullSequana, Cray — Long-Form Article (Combined)

**Purpose:** One full article with all three families. Alignment, spacing, bullet lists. Place your images where you see **[Image: …]**.

**Also available as 3 medium articles** (better for posting more content): Article 1 — Azure (`ZEV_NODES_ARTICLE_1_AZURE.md`), Article 2 — BullSequana (`ZEV_NODES_ARTICLE_2_BULLSEQUANA.md`), Article 3 — Cray (`ZEV_NODES_ARTICLE_3_CRAY.md`). See `ZEV_NODES_3_ARTICLES_INDEX.md`.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Every large HPC or AI deployment runs on nodes: the building blocks of the machine.

Three families define the landscape today:

- **Azure** — Microsoft’s cloud and on-prem footprint.
- **BullSequana** — Eviden’s AMD and GH200 blades.
- **Cray EX** — HPE’s Slingshot-based platform.

This piece walks through each family: what’s in the box, when to use it, and where your images go.

---

## Azure

Azure offers CPU-only HPC nodes and a full ND (NVIDIA-accelerated) GPU lineup.

For workloads that don’t need GPUs, the HB series is the answer.

For everything from A100 to Grace–Blackwell, the ND family is the menu.

---

### CPU-only HPC: HBv4 and HBv5

**HBv4** is the current workhorse.

176 cores (AMD EPYC 9V33X Genoa-X). Two sockets of 96 cores each. 2.4 GHz base, 3.7 GHz boost.

Each node has:

- 768 GiB DDR5
- 2× 1.8 TB NVMe, 1× 480 GB SSD
- 1× 400G ConnectX-7 NDR InfiniBand
- 80G Ethernet (2nd gen Azure SmartNIC)

Built for scale-out HPC without a single GPU.

**HBv5** is the next step, unveiled at SC24.

Microsoft’s custom socket pairs Genoa cores with HBM. There is no DDR DRAM.

Each node has:

- **CPU:** 352 cores (AMD EPYC 9V64H), four sockets of 96-core CPUs.
- **Memory:** 400–450 GiB HBM3, 6.9 TB/s STREAM Triad.
- **Storage:** 14 TB NVMe (8× ~1,920 GB drives).
- **Networking:** 4× 200G ConnectX-7 NDR InfiniBand (one per socket), 160G Ethernet (2nd gen Azure SmartNIC).

From the top, the board and power design are deliberately simple.

Fewer failure points. Easier cooling and service.

For hospitals and government, that simplicity is reliability.

**[Image: Azure HBv5 — top view. Insert your photo: four CPU modules, motherboard, power connector.]**

The rear tells the rest of the story.

Eight NVMe slots. Four ConnectX-7 adapters (one OSFP each). Dual-port Azure Boost v2 NIC. Dual-zone bus bar for power.

Everything needed to plug in and scale out.

**[Image: Azure HBv5 — rear view. Insert your photo: eight NVMe slots, ConnectX-7 OSFP, Azure Boost v2 NIC, bus bar power.]**

**When to use:**

HBv4 for proven CPU-only HPC today.

HBv5 when you want Genoa plus HBM and no DDR.

Both are built for workloads that don’t need GPUs — and for teams that need to know exactly what’s inside the box.

---

### ND GPU lineup: A100, MI200, H100, MI300X, GB200

One cloud. Every GPU node.

The ND family is the full menu: NVIDIA A100 and H100, AMD MI200 and MI300X, and the node that scales to 72 GPUs in a single NVLink domain.

**ND A100 v4**

Eight-way A100 in one chassis.

Two SKUs: 40 GB HBM per GPU (Standard_ND96asr_A100_v4) or 80 GB (Standard_ND96amsr_A100_v4).

Same compute density; choice is memory and cost.

One chassis, eight A100 modules, two rows of GPUs, high-speed links.

**[Image: Azure ND A100 v4 — physical node. Insert your chassis photo: eight A100 modules, layout.]**

**ND MI200 v4**

Eight-way MI250X.

This is the node behind Microsoft’s Explorer supercomputer — #11 on the June 2023 Top500.

One chassis, eight MI250X modules. Serious FP64 and matrix performance for HPC and AI.

**[Image: Azure ND MI200 v4 — physical node. Insert your chassis photo: eight MI250X modules.]**

**ND H100 v5**

DGX in the cloud.

Eight-way H100 on an Intel Sapphire Rapids host: 96 cores, 1,900 GiB DDR5, 28,000 GiB local NVMe (8× drives).

One 80G Ethernet (100G Azure SmartNIC), 8× 400G ConnectX-7 NDR InfiniBand.

Same node class as Eagle.

**[Image: ND H100 v5 / Eagle — rear view. Insert your photo: E1.S SSD carriers, 4× OSFP, two-port Azure SmartNIC, six power supplies.]**

**ND MI300X v5**

Same platform as ND H100 v5, but 8-way OAM baseboard instead of HGX.

96 cores Sapphire Rapids. 1,850 GiB DDR5. 1,000 GiB local storage. 8× AMD Instinct MI300X.

One chassis, eight modules. AMD at the same density as H100.

**[Image: Azure ND MI300X v5 — physical node. Insert your photo: open chassis, eight MI300X OAM modules.]**

**ND GB200 v6**

Grace–Blackwell.

Two GB200 Superchips per server (one Grace CPU and two Blackwell GPUs each).

NVLink-C2C for coherence. InfiniBand for scale-out.

The number that matters: up to 72 GPUs in a single NVLink domain.

One domain. Full bandwidth. No host in the path.

**[Image: Azure ND GB200 v6 — internal. Insert your photo: two GB200 Superchips, NVLink/InfiniBand cabling.]**

**When to pick which:**

- Cost-sensitive eight-way A100 → ND A100 v4
- AMD, Top500-proven → ND MI200 v4
- Max eight-way H100, DGX-style → ND H100 v5
- Same density, AMD → ND MI300X v5
- Grace–Blackwell, 72-GPU domain → ND GB200 v6

One cloud. Every node. No guesswork.

---

## BullSequana

Eviden’s BullSequana line covers AMD’s latest (MI355X, MI300A) and the GH200 blade that powers JUPITER.

Three nodes: AI1242, XH3406-3, XH3515.

Three distinct choices.

---

**AI1242** is the AMD MI355X node for the BullSequana XH3500 platform.

Each node has:

- 2× AMD 9005-series CPUs
- 8× AMD MI355X GPUs in OAM
- 2.3 TB HBM3e
- 24× DDR5 RDIMMs
- Up to 10× NICs — BXI v3, NDR InfiniBand, or Ethernet
- Up to 4× NVMe SSDs

Dense. Liquid-cooled. Built for the heaviest HPC and AI workloads.

The same platform logic as the big cloud GPU nodes: choose your fabric, pack the memory and storage you need.

For labs and institutions that want AMD at scale, this is the node.

**[Image: BullSequana AI1242 — physical node. Insert your photo: eight MI355X modules (copper heatsinks), storage/NVMe below, e.g. SC25 display.]**

**XH3406-3** is Eviden’s MI300A blade.

AMD Instinct MI300A is an APU: one package, CPU and GPU.

No discrete CPU–GPU wiring. One part. Better coherence.

Four MI300A modules per blade with thick black cabling between them.

When you need tight coupling and unified memory, the APU can beat separate CPU and GPU.

**[Image: BullSequana XH3406-3 — internal blade. Insert your photo: four MI300A modules, black cabling, modular blade layout.]**

**XH3515** is the GH200 blade — the building block of JUPITER.

Two compute nodes per blade.

Per node:

- 4× GH200 (Grace–Hopper) superchips
- 480 GB usable LPDDR5 (Grace side)
- 360 GB HBM (Hopper side)
- 4× NDR200 InfiniBand HCAs (NVIDIA Quantum-2), 200 Gbit per GH200
- One InfiniBand port per superchip

JUPITER is Europe’s flagship exascale system.

This blade is how it’s built: Grace–Hopper in a dense, coherent package. InfiniBand for scale-out.

When the mission is sovereign HPC and AI, this is the node.

**[Image: BullSequana XH3515 — open blade. Insert your photo: GH200 modules, liquid cooling (black tubes, blue pipes), Eviden branding.]**

**Takeaway:**

- AI1242 — AMD MI355X and flexible fabric
- XH3406-3 — MI300A APU density and coherence
- XH3515 — GH200 and JUPITER-class scale

Three nodes. Three choices.

Eviden BullSequana — built for the workloads that define the next decade.

---

## Cray EX

HPE’s Cray EX platform runs on Slingshot.

Six blades: B200, GH200, AMD Trento/Milan with MI250X or A100, MI300A APU, and CPU-only.

One platform. Every workload.

---

**EX154n** — The B200 blade.

One GB200 NVL4 board per blade: two Grace CPUs, four B200 GPUs, in an NVL4 configuration.

Accelerated compute blade for machine learning and sovereign AI.

Each blade has:

- 100% liquid cooled, 1U chassis blade
- One NVIDIA GB200 NVL4 Superchip
- Two NVIDIA Grace processors, 240 GB memory per processor
- Four NVIDIA Blackwell GPUs, 192 GB HBM3e per GPU
- Up to four HPE Slingshot injection ports per blade
- One local NVMe SSD per blade

A Cray EX rack tops out at 224 GPUs (56 blades), not 256 — power or cooling limit.

EX154n is expected to ship by end of 2025.

**[Image: Cray EX154n — internal. Insert your photo: liquid cooling (copper cold plates, blue tubes), NVL4 board, chassis.]**

**EX235a** — Trento + MI250X.

Two nodes per blade.

Per node: 1× AMD Trento CPU, up to 512 GB DDR4, up to 2× NVMe SSDs, 4× AMD MI250X GPUs, up to 4× Slingshot-11 NICs.

These nodes are unique: Trento is a modified Milan with Infinity Fabric to the MI250X GPUs.

GPU HBM is cache coherent with CPU memory.

The Slingshot-11 PCIe NICs are attached to the GPUs’ PCIe ports, not the CPU’s — a non-standard, performance-optimized layout.

**EX235n** — Milan + A100.

Two nodes per blade.

Per node: 1× AMD Milan CPU, up to 512 GB DDR4, no node-local storage, 4× NVIDIA A100 GPUs on an HGX baseboard, up to 4× Slingshot-11 NICs.

**EX254n** — GH200 blade.

Two nodes per blade.

Per node: 4× GH200 superchips (1 Grace 72-core, 1 Hopper H100 each). 128 GB LPDDR5X (HPE spec; Grace supports up to 480 GB — the 128 GB option reflects cost/performance for HPC). 4× Slingshot-11 NICs.

No NVMe in the wild; HPE documentation mentions an M.2 blade kit.

Logically, each GH200 is its own NUMA domain.

Used in Alps, Isambard-AI, KISTI-6.

**[Image: Cray EX254n or liquid-cooled blade. Insert your photo: GH200 blade internals or copper cold plates, white corrugated cooling tubes.]**

**EX255a** — MI300A APU blade.

2× 4-socket node cards (8 APUs per blade).

1× NVMe M.2 slot per node card (2 per blade).

4×–8× Slingshot-11 injection ports per node (8×–16× per blade).

The lack of node-local storage is often compensated by Cray’s Rabbit chassis, which uses spare Slingshot switch ports to host NVMe servers.

The high density of 200G Slingshot ports also matters as the industry moves to 400G NDR InfiniBand.

**[Image: Cray EX255a — blade internals. Insert your photo: node cards, copper heatsinks, blue/white/grey cabling.]**

**EX425** — CPU-only.

Two nodes per blade.

Per node: 2× AMD Rome or AMD Milan CPUs, up to 1,024 GB DDR4 (8× DIMMs per socket, up to 64 GB/DIMM), no node-local storage, no GPUs, up to 4× Slingshot-11 NICs.

The workhorse when the workload doesn’t need accelerators.

**Takeaway:**

- EX154n — B200 and sovereign AI
- EX235a — Trento + MI250X and coherent memory
- EX235n — Milan + A100
- EX254n — GH200 and Alps/Isambard
- EX255a — MI300A APU density
- EX425 — CPU-only

Cray EX — one platform, six blades, every workload.

---

## Closing

Azure, BullSequana, and Cray EX each offer a full spread: CPU-only, NVIDIA, AMD, and the nodes that power sovereign and exascale systems.

Alignment, spacing, and bullet lists in this document are there so you can drop in your specific images and publish as one long-form article.

Good-looking. Ready for nerds, hospitals, and government.

**Image checklist (in order of appearance):**

1. Azure HBv5 — top view
2. Azure HBv5 — rear view
3. Azure ND A100 v4 — physical node
4. Azure ND MI200 v4 — physical node
5. ND H100 v5 / Eagle — rear view
6. Azure ND MI300X v5 — physical node
7. Azure ND GB200 v6 — internal
8. BullSequana AI1242 — physical node
9. BullSequana XH3406-3 — internal blade
10. BullSequana XH3515 — open blade
11. Cray EX154n — internal
12. Cray EX254n or liquid-cooled blade
13. Cray EX255a — blade internals

---

*Source: Your node materials (Azure, BullSequana, Cray EX). No invented specs.*
