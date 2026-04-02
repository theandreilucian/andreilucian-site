# Zev — 4 Long-Form Node Articles (3 Sub-Modules Each)

**Source:** Glenn's Digital Garden — Nodes module + your HBv4, HBv5, ND A100 v4, ND GB200 v6 content and images.  
**Format:** Each article = 3 sub-modules. Viral/inspiration knowledge style for X. Bullet lists; copy each block as a tweet.  
**Images:** Use the 4 node images in the HTML dashboard (HBv4, HBv5, ND A100 v4, ND GB200 v6).

---

## Article 1 — Azure HBv4: Microsoft's CPU-only HPC node

**Sub-module 1 — What it is (hook)**  
1/ Azure HBv4 is Microsoft's CPU-only node for HPC. No GPUs — just a lot of cores, memory, and fabric. Here's what's in the box and when it makes sense.

**Sub-module 2 — Full specs (everything you need)**  
2/ Each node has:
• 176 cores of AMD EPYC 9V33X (Genoa-X)
• 2.4 GHz base, 3.7 GHz boost
• Implemented using two sockets of 96-core CPUs
• 768 GiB DDR5
• 2× 1,800 TB NVMe
• 1× 480 GB SSD
• 1× 400G ConnectX-7 NDR InfiniBand
• 80G Ethernet (2nd generation Azure SmartNIC)

3/ Why it matters: Pure CPU HPC — weather, fluid dynamics, genomics, legacy MPI. When your workload doesn't need GPUs, HBv4 gives you density and InfiniBand without paying for accelerators.

**Sub-module 3 — Takeaway**  
4/ [Image: Azure HBv4 — use your HBv4 node image here]  
Takeaway: HBv4 = 176 Genoa-X cores, 768 GiB DDR5, 400G InfiniBand, 80G SmartNIC. The CPU-only option when you need scale, not GPUs. Source: Nodes module, Azure HBv4 (Jan 2025).

---

## Article 2 — Azure HBv5: Genoa + HBM, no DDR

**Sub-module 1 — Hook (why this one is different)**  
1/ Azure HBv5 is Microsoft's CPU-only node for HPC — but it's not just more cores. Unveiled at SC24. It has a Microsoft-only CPU socket that combines Genoa cores with HBM. No DDR DRAM.

2/ That means: high bandwidth to memory without a GPU. Same idea as Grace or APUs, but for CPU-only HPC. One node, four sockets, 352 cores, and HBM3.

**Sub-module 2 — Specs (full list)**  
3/ Each node has:
• 352 cores of AMD EPYC WGHH (Genoa)
• 1 GHz base, 4 GHz boost
• Four sockets of 88-core CPUs
• 400–480 GB HBM3
• 6.8 TB/s STREAM Triad memory bandwidth
• No DDR DRAM
• 14 TB NVMe (8× NVMe disks, ~1,920 GB each)
• 4× 200G ConnectX-7 NDR InfiniBand (one per socket)
• 800G Ethernet (2nd generation Azure SmartNIC)

4/ [Image: HBv5 — top view] Simple motherboard, simple power connector. Four large modules (2×2) — the CPU sockets with HBM. Red boards, blue retention clips. Dense, purpose-built.

**Sub-module 3 — Rear and takeaway**  
5/ [Image: HBv5 — rear] Rear: eight NVMe slots, four ConnectX-7 adapters (single OSFP each), dual-port Azure Boost V2 NIC. Dual-zone bus bar clip for power.  
Takeaway: HBv5 = CPU-only HPC with HBM3 and no DDR. When memory bandwidth matters more than raw DDR capacity, this is the node. Source: Nodes module, Azure HBv5 (Apr 2025).

---

## Article 3 — Azure ND A100 v4: Eight-way A100, two varieties

**Sub-module 1 — What it is**  
1/ ND A100 v4 is Microsoft's eight-way A100 VM type and compute node. It comes in two varieties. Same chassis, same eight A100s — the only difference is how much HBM you get per GPU.

2/ That choice drives cost and what models or batches you can run. Get this right and you don't overpay or hit memory limits mid-job.

**Sub-module 2 — Two varieties (specs)**  
3/ Variety 1 — ND A100 v4:
• Instance: Standard_ND96asr_A100_v4
• 40 GB HBM per GPU
• Eight A100s, one node

4/ Variety 2 — NDm A100 v4:
• Instance: Standard_ND96amsr_A100_v4
• 80 GB HBM per GPU
• Same eight-way layout, double the HBM

5/ When to pick which:
• 40 GB: same compute density, lower cost; fits many training and inference workloads
• 80 GB: fewer recomputes, bigger caches, larger models or batches

**Sub-module 3 — The physical node + takeaway**  
6/ [Image: ND A100 v4 — physical node] The physical node: eight A100 GPUs (blue heatsinks/shrouds), storage trays above, dense cabling. Label on the front: ND A100 v4. One chassis, two rows of GPUs, high-speed links.  
Takeaway: One node type, two SKUs. Pick by memory. 40 GB or 80 GB per GPU — both are real options for AI and HPC at eight-way scale. Source: Nodes module, Azure ND A100 v4 (Oct 2024).

---

## Article 4 — Azure ND GB200 v6: Grace–Blackwell, 72 GPUs in one domain

**Sub-module 1 — Hook (the number that matters)**  
1/ The number to remember: 72 GPUs. One NVLink domain. Azure ND GB200 v6 is Microsoft's Grace–Blackwell node. Each server has two GB200 Superchips; the node scales up to 72 GPUs in a single NVLink domain.

2/ One domain means: GPUs talk at full bandwidth without the host. For large-model training, that's the difference between scaling and hitting a wall. This is the node for when eight-way isn't enough.

**Sub-module 2 — What's inside (specs + visual)**  
3/ Each physical server:
• 2× GB200 Grace Blackwell Superchips
• Each Superchip = 1 Grace CPU + 2 Blackwell GPUs
• NVLink-C2C (chip-to-chip) for coherence between CPU and GPUs
• Thick black NVLink cables between the two Superchip modules
• Copper/gold heatsinks on the Superchips

4/ Storage and power:
• Silver NVMe/SSD modules on the left in bays
• Red motherboard; orange power cables; black and orange cabling throughout
• Scale-out: InfiniBand to other nodes

5/ Why the layout matters: Dense compute in the middle, storage and NICs where they need to be. Cooling and power built for 72 GPUs in the domain. No host in the data path for GPU–GPU traffic.

**Sub-module 3 — Takeaway + image**  
6/ [Image: ND GB200 v6 — chassis from above] Overhead view: two large GB200 Superchip modules (gold/copper cooling), NVLink between them, storage bays, motherboard, power. This is what 72-GPU scale looks like in one Azure node.  
Takeaway: ND GB200 v6 = Grace + Blackwell, 72 GPUs in one NVLink domain, InfiniBand out. When you need the biggest single-domain option in the cloud, this is it. Source: Nodes module, Azure ND GB200 v6.

---

*Content: `ZEV_NODES_4_ARTICLES_X.md`. Dashboard: `ZEV_NODES_4_ARTICLES_X.html`. Place node images in `assets/zev-nodes/` (hbv4.png, hbv5.png, nd-a100-v4.png, nd-gb200-v6.png) so they display in the HTML.*
