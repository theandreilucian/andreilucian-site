# Zev — 10 Long-Form X Posts (Nodes Module)

**Source:** Glenn's Digital Garden — Nodes module only.  
**Voice:** Short, confident, specific. Technical clarity over hype. Serious. Audience: nerds.  
**Format:** 10 long threads. Bullet lists for features and specs. Image placeholders at [Image: …]. All content from the garden; no invented facts.

**Images:** Attach your node/chassis images at the tweet that says [Image: …].

---

## N1. Azure ND family — A100, MI200, H100, GB200 (full lineup)

1/ Azure's ND family: four node types. A100, MI200, H100, GB200. Full lineup — specs and when to use which.

2/ [Image: Azure ND nodes — use your A100 / H100 / GB200 chassis or lineup image here]

3/ ND A100 v4 — features:
• Eight-way A100, one chassis
• Two SKUs: Standard_ND96asr_A100_v4 (40 GB HBM/GPU) and Standard_ND96amsr_A100_v4 (80 GB HBM/GPU)
• Same compute density; pick by memory and cost
• One chassis, eight A100 modules, two rows of GPUs, high-speed links

4/ Why two A100 SKUs?
• Cost and capacity: not every workload needs 80 GB
• 40 GB = same density for less
• 80 GB = fewer recomputes, bigger caches

5/ ND MI200 v4 — features:
• Eight-way MI250X
• Explorer (Microsoft's AMD supercomputer) built from this node — #11 June 2023 Top500
• One chassis, eight MI250X modules; serious FP64 and matrix for HPC and AI

6/ ND H100 v5 — features:
• DGX-class in the cloud; eight-way H100, Intel Sapphire Rapids host
• 96 cores (2× 56-core), 1,900 GiB DDR5, 28,000 GiB local NVMe (8× drives)
• 8× 400G NDR InfiniBand (ConnectX 7, one per GPU), 8× H100 on HGX, NVLink between them

7/ ND GB200 v6 — features:
• Grace–Blackwell: 2× GB200 Superchips per server (1 Grace CPU + 2 Blackwell GPUs each, NVLink C2C)
• Node scales to 72 GPUs in a single NVLink domain
• One domain = GPUs at full bandwidth without the host; scale-out: InfiniBand

8/ When to pick which:
• Cost-sensitive, eight-way A100 enough → ND A100 v4
• AMD, same density → ND MI200 v4
• Max eight-way H100, DGX-style → ND H100 v5
• Grace–Blackwell, 72-GPU NVLink domain → ND GB200 v6

9/ In Azure: "ND" = NVIDIA-accelerated. "NDm" = same family, more memory per GPU (A100 80 GB). Source: Glenn's Digital Garden — Nodes module.

---

## N2. Azure ND H100 v5 — Complete spec (front + rear)

1/ ND H100 v5 — full spec. Front and rear. Everything you need before you size a job or compare to on-prem.

2/ [Image: ND H100 v5 — front view. Use your chassis / heatsinks / NVMe image here]

3/ Host features:
• 96 cores (2× Intel Sapphire Rapids, 56-core)
• 1,900 GiB DDR5
• Strong host for data loading, coordination, state that doesn't fit in GPU memory

4/ Storage features:
• 28,000 GiB local NVMe, 8× drives
• E1.S SSD carriers, hot-swap
• Checkpoints, datasets, scratch; no network hop for every read

5/ Networking features:
• 1× 80G Ethernet (100G Azure SmartNIC)
• 8× 400G NDR InfiniBand — ConnectX 7, one per GPU
• Scale-out for multi-node training and collectives; 400G per GPU

6/ GPU features:
• 8× NVIDIA H100 on HGX baseboard, NVLink between them
• From the top: eight H100 heatsinks, NVMe below, HGX and NVLink switches at the far end, intake fans

7/ [Image: ND H100 v5 — rear view. Use your rear IO / E1.S / OSFP / power image here]

8/ Rear layout:
• Far end: intake fans; behind them HGX baseboard, eight tall heatsinks
• Under the grab bar: NVLink switches (their own heatsinks); GPU + NVLink side

9/ Rear storage & networking:
• E1.S SSD carriers, multiple bays, hot-swap — your 28,000 GiB; dense, serviceable
• 1× RJ45 (out-of-band); 4× OSFP = 8× NDR InfiniBand (8× 400G); 2-port Azure SmartNIC + 1-port Ethernet for host

10/ Rear power:
• 6× power supplies; redundancy and headroom
• Same node class as Eagle. Source: Azure ND H100 v5, Nodes module, glennklockwood.com/garden.

---

## N3. BullSequana — AI1242 (MI355X), XH3406-3 (MI300A), XH3515 (GH200 / JUPITER)

1/ Eviden BullSequana: three nodes. AI1242 (MI355X), XH3406-3 (MI300A), XH3515 (GH200 for JUPITER). Full specs and when each fits.

2/ [Image: BullSequana AI1242 or MI355X node — use your image here]

3/ AI1242 — features:
• AMD MI355X for XH3500 platform
• 2× AMD 9005 host; 8× MI355X in OAM — dense, liquid cooling, high power
• 2.3 TB HBM3e total; 24× DDR5 RDIMMs

4/ AI1242 fabric & cooling:
• Up to 10× NICs — BXI v3, NDR InfiniBand, or Ethernet (you pick)
• Up to 4× NVMe for checkpoints and datasets
• At SC25: eight MI355X modules, copper heatsinks or cold plates

5/ [Image: XH3406-3 MI300A blade — use your image here]

6/ XH3406-3 — features:
• Eviden's MI300A blade; AMD Instinct MI300A = APU (one package, CPU and GPU)
• No discrete wiring; one part, better coherence
• Four MI300A modules per blade, thick black cabling (APU-to-APU)
• For tight coupling and unified memory, APU can beat separate CPU + GPU

7/ [Image: XH3515 GH200 / JUPITER Booster — use your image here]

8/ XH3515 — features:
• GH200 blade for JUPITER; JUPITER Booster = this blade; two compute nodes per blade
• Per node: 4× GH200 (Grace CPU + Hopper H100 per superchip, coherent memory)
• 480 GB LPDDR5 (Grace side); 360 GB HBM (Hopper side)

9/ XH3515 fabric:
• 4× NDR200 InfiniBand per node — Quantum-2, 200 Gbit per GH200
• One InfiniBand port per superchip; GH200 modules, blue InfiniBand cabling
• JUPITER = flagship European exascale. Source: BullSequana nodes, Nodes module, glennklockwood.com/garden.

---

## N4. Cray EX — B200 and GH200 blades (EX154n, EX254n)

1/ Cray EX: B200 and GH200 blades. EX154n (NVL4, liquid cooled) and EX254n (4× GH200, 128 GB). Full specs — memory, cooling, Slingshot, rack limits.

2/ [Image: Cray EX154n B200 NVL4 blade — use your image here]

3/ EX154n — features:
• B200 blade: one GB200 NVL4 board — 2 Grace + 4 B200 GPUs
• 192 GB HBM3e per GPU; 100% liquid cooled in 1U (copper cold plates, blue coolant)
• NVLink (or equivalent) between B200s and Grace for coherence

4/ EX154n specs:
• 2× Grace (240 GB per processor); 4× Blackwell (192 GB HBM3e per GPU)
• Up to 4× Slingshot per blade; 1× local NVMe per blade
• Grace + B200, Slingshot — ML and sovereign AI

5/ Catch: A Cray EX rack = 224 GPUs (56 blades), not 256. Power or cooling limit at the rack. Expected to ship by end of 2025.

6/ [Image: Cray EX254n GH200 blade — use your image here]

7/ EX254n — features:
• Four GH200s per node; two nodes per blade
• Per node: 4× GH200 (1 Grace 72c + 1 Hopper H100 each); coherent memory per Grace–Hopper pair
• 128 GB LPDDR5X per node (Grace can do 480 GB; HPE spec = 128 GB for cost/performance)
• Alps, Isambard-AI, KISTI-6 use it

8/ EX254n storage & NUMA:
• 4× Slingshot-11 per node; no NVMe in the wild; HPE docs mention M.2 blade kit
• One GH200 = one NUMA domain; four per node; liquid cooling in photos
• Source: Cray EX154n, EX254n, Nodes module, glennklockwood.com/garden.

---

## N5. Cray EX — AMD blades (EX235a, EX235n, EX255a)

1/ Cray EX AMD blades: EX235a (Trento + MI250X), EX235n (Milan + A100), EX255a (MI300A). Coherent memory, GPU-attached Slingshot, Rabbit storage.

2/ [Image: Cray EX235a — Trento + MI250X blade. Use your image here]

3/ EX235a — features:
• AMD Trento + 4× MI250X per node; two nodes per blade
• Up to 512 GB DDR4, up to 2 NVMe, up to 4 Slingshot-11 per node
• Two things that matter: coherent memory and NICs on the GPU

4/ EX235a — coherent memory & NICs:
• Trento = modified Milan with Infinity Fabric to the MI250X; GPUs' HBM cache coherent with CPU memory; one coherence domain
• Slingshot-11 on the GPUs' PCIe ports; GPUs talk to the fabric directly; CPU out of the path
• For training, that's where the NIC belongs

5/ [Image: Cray EX235n or EX255a — use your image here]

6/ EX235n — features:
• Milan + 4× A100 per node; two nodes per blade
• Per node: 1 Milan, up to 512 GB DDR4, no local storage, 4 A100s on HGX, up to 4 Slingshot-11
• A100s on HGX = standard NVLink; no local disk → fabric + shared storage (Rabbit or parallel FS)
• NICs on the CPU here — GPU→PCIe→CPU→NIC

7/ EX255a — features:
• MI300A APU blade; two 4-socket node cards → 8 APUs per blade
• 1× M.2 per node card (2 per blade); 4× Slingshot-11 per node (8 per blade)
• Not much storage on the blade — Cray's Rabbit chassis: spare Slingshot ports host NVMe servers
• 200G Slingshot; more ports per node to keep aggregate bandwidth up vs 400G NDR. Source: Cray EX235a, EX235n, EX255a, Nodes module, glennklockwood.com/garden.

---

## N6. Cray EX — CPU-only (EX425) and node storage (E1.S, M.2, Rabbit)

1/ EX425: CPU-only blade. No GPUs, up to 1 TB DDR4 per node. Same Slingshot fabric. Plus: how node storage works — E1.S, M.2, none, Rabbit.

2/ [Image: EX425 or Cray EX storage / Rabbit — use your image here if you have one]

3/ EX425 — features:
• Dual-socket Rome or Milan, no GPUs; two nodes per blade
• Per node: 2× Rome/Milan, up to 1024 GB DDR4 (8× DIMMs/socket, 64 GB/DIMM max)
• No local storage, no GPUs, up to 4 Slingshot-11

4/ EX425 use case:
• Preprocessing, post-processing, visualization, compilation, embarrassingly parallel CPU jobs
• No local storage → fabric + shared (Rabbit or parallel FS)
• No GPUs → no accelerator cost or power; same Slingshot; mix CPU-only and GPU nodes on one network

5/ Node storage — three stories:
• A lot: Azure ND H100 v5 — 28,000 GiB local NVMe (8× E1.S); hot-swap, checkpoints, datasets, scratch
• A little: EX154n (1× M.2 per blade), EX255a (1× M.2 per node card)
• None: EX235n, EX425 — boot from network, data over fabric (parallel FS or Rabbit)

6/ Rabbit & form factors:
• Cray chassis uses spare Slingshot switch ports for NVMe servers; storage in the chassis, not on every node
• E1.S = small, hot-swap, carriers; M.2 = one or two sticks per node
• When you pick a node type, you're picking where checkpoints and datasets live. Source: EX425, multiple nodes, Nodes module, glennklockwood.com/garden.

---

## N7. What's in a node — The six things that define it

1/ A node = one unit of compute that goes into a chassis or rack. Six things define it. Use this to compare any node — Azure, BullSequana, Cray EX.

2/ [Image: Node anatomy / chassis / diagram — use your image here if you have one]

3/ 1. Host compute:
• 1–2+ CPU sockets (LGA); OS, drivers, non-accelerator work
• Sapphire Rapids, Milan, Trento, Grace — host choice drives memory and coherence story

4/ 2. Accelerator compute:
• GPUs or APUs; same board or HGX
• Trend: 4–8 GPUs per node, NVLink or Infinity Fabric between them
• A100, H100, MI250X, MI300A, GH200, B200 — pick by memory, bandwidth, coherence

5/ 3. Memory & 4. Storage:
• Memory: DDR for host, HBM for GPUs; how much, and whether coherent (Trento–MI250X, Grace–Hopper) or not
• Storage: E1.S, NVMe, M.2 — or none; no local = boot and run from network/shared storage; local fast vs simpler node + central storage (e.g. Rabbit)

6/ 5. Networking & 6. Edge:
• Networking: NICs on CPU PCIe or on GPU (e.g. Slingshot on GPU in EX235a); InfiniBand vs Slingshot vs Ethernet — fixed by vendor and platform
• Edge: blade or card plugs into backplane; power, management, fabric; the "node" is what you slide in; chassis gives power, cooling, network. When you compare nodes, you're comparing those six. Source: Nodes module (general), glennklockwood.com/garden.

---

## N8. GPU-attached NICs, Slingshot vs InfiniBand, two nodes per blade

1/ Why put the NIC on the GPU? Why Cray EX = Slingshot and Azure ND = InfiniBand? Why two nodes per blade? Design choices that tie it together.

2/ [Image: EX235a or Slingshot / fabric — use your image here if you have one]

3/ Most nodes: GPU → CPU → NIC:
• Data path: GPU → PCIe → CPU → PCIe → NIC
• CPU in the path = extra latency, CPU cycles for copies and protocol
• For training, lots of GPU–GPU traffic; the CPU can become the bottleneck

4/ EX235a — GPU-attached NICs:
• Slingshot-11 on the GPUs' PCIe ports; GPUs talk to the fabric directly
• That's GPU-attached (GPU-direct) networking
• NIC on the GPU → GPU pushes straight to the fabric; where you put the NIC is a first-order choice

5/ Slingshot vs InfiniBand:
• Cray EX = Slingshot; Azure ND = InfiniBand; you don't swap them
• Slingshot = HPE/Cray, Ethernet-based, custom switches and protocols for HPC
• Azure ND = 8× 400G NDR or NDR200; fabric is fixed by the vendor
• Both run MPI, NCCL; same programming model, different hardware

6/ Two nodes per blade:
• EX235a, EX235n, EX254n, EX255a, EX425 — all ship two nodes per blade
• Packaging: one blade, one slot; double the node count per slot
• Cooling/power: two nodes × 4 GPUs (8 per blade) fits; one node × 16 GPUs might not
• You request "N nodes"; scheduler gives you N (maybe on N/2 blades). Source: EX235a, Cray EX blades, Nodes module, glennklockwood.com/garden.

---

## N9. Node storage — E1.S, NVMe, M.2, Rabbit (full breakdown)

1/ Where do checkpoints and datasets live? Full breakdown: E1.S, NVMe, M.2, no local, and Rabbit. By node type.

2/ [Image: E1.S carriers / Rabbit chassis / NVMe — use your image here if you have one]

3/ Azure ND H100 v5 — "a lot":
• 28,000 GiB local NVMe; 8× drives, E1.S SSD carriers, hot-swap, multiple bays
• Checkpoints, datasets, scratch; fast and local

4/ Cray EX — "a little":
• EX154n: 1× M.2 per blade
• EX255a: 1× M.2 per node card (2 per blade)
• Boot or scratch local; bulk on shared storage or Rabbit

5/ Cray EX — "none":
• EX235n, EX425: no local storage
• Boot from network; data over the fabric (parallel filesystem or Rabbit over Slingshot)
• Simpler, cheaper node; storage centralized

6/ Rabbit & form factors:
• Cray: spare Slingshot switch ports host NVMe servers; storage in the chassis, not on every node; still fast, just not local to the compute blade
• E1.S = small, hot-swap, in carriers; high-end density
• M.2 = one or two sticks per node; no local = stateless compute node. When you pick a node type, you're picking its storage story. Source: Multiple nodes, Nodes module, glennklockwood.com/garden.

---

## N10. Azure ND — How to choose (picker + evolution)

1/ Azure ND: how to choose. A100, MI200, H100, GB200 — evolution, specs, and a simple picker for the right node.

2/ [Image: Azure ND lineup or architecture — use your image here]

3/ Evolution:
• ND A100 v4 first: eight GPUs in one VM, 40 or 80 GB HBM
• Then ND MI200 v4 (Explorer, Top500 #11)
• Then ND H100 v5: DGX-style, 96 cores, 1.9 TB DDR5, 28 TB NVMe, 8× 400G NDR
• Latest: ND GB200 v6 — Grace–Blackwell, 72 GPUs in one NVLink domain

4/ Picker — when to use which:
• Cost-sensitive, eight-way A100 enough → ND A100 v4 (40 or 80 GB)
• AMD, same eight-way class → ND MI200 v4
• Max eight-way H100, strong host, local NVMe, 400G → ND H100 v5
• Grace–Blackwell, largest NVLink domain in the cloud → ND GB200 v6

5/ The 72-GPU NVLink domain (GB200 v6) is the spec that changes the game for large-model training. One domain = GPUs at full bandwidth without the host. When you size jobs, that's the number to watch. Source: Glenn's Digital Garden — Nodes module. No invented facts.

---

*Content file: `ZEV_NODES_10_LONGFORM_X.md`. Sources: `ZEV_NODES_10_SOURCES.md`. Spec: `ZEV_CONTENT_SPEC.md`. Use bullet lists for features; attach images at [Image: …] lines.*
