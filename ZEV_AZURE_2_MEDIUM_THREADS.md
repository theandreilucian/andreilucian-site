# Zev — Azure: 2 Medium-Length X Threads

**Purpose:** Virality, inspiration, education. Same confident Zev voice. Audience: nerds, hospitals, government.  
**Format:** 2 threads. Medium length (~8–12 tweets each). [Image: …] = attach your image with that tweet.

---

## Thread 1 — Azure CPU-Only HPC: HBv4 & HBv5 (When the Workload Doesn’t Need GPUs)

1/ Not every big workload needs a GPU. Azure’s CPU-only HPC nodes are where simulations, genomics, and memory-bound jobs run. Two generations: HBv4 and HBv5. Here’s what’s in the box.

2/ **HBv4** — the current workhorse. 176 cores (AMD EPYC 9V33X Genoa-X). Two sockets, 96 cores each. 2.4 GHz base, 3.7 GHz boost. 768 GiB DDR5. 2× 1.8 TB NVMe, 1× 480 GB SSD. 1× 400G ConnectX-7 NDR InfiniBand, 80G Ethernet (2nd gen Azure SmartNIC). Built for scale-out HPC without a single GPU.

3/ **HBv5** — the next step. Unveiled at SC24. Microsoft-only socket: Genoa cores + HBM. No DDR. All memory bandwidth where it matters.

4/ Each HBv5 node: 352 cores (AMD EPYC 9V64H). Four sockets of 96-core CPUs. 400–450 GiB HBM3. 6.9 TB/s STREAM Triad. 14 TB NVMe (8× ~1,920 GB). 4× 200G ConnectX-7 NDR InfiniBand (one per socket). 160G Ethernet (2nd gen Azure SmartNIC). Same idea — more cores, more bandwidth, zero DDR.

5/ [Image: Azure HBv5 — top view. Upload your photo: four CPU modules, simple motherboard, power connector.]

6/ What you see from the top: a clean board, a simple power connector. Fewer failure points. Easier to cool and service. For hospitals and government, that’s not boring — that’s reliability.

7/ [Image: Azure HBv5 — rear view. Upload your photo: eight NVMe slots, four ConnectX-7 OSFP, dual-port Azure Boost v2 NIC, dual-zone bus bar power.]

8/ Rear tells the story: eight NVMe slots, four ConnectX-7 adapters (one OSFP each), dual-port Azure Boost v2 NIC, dual-zone bus bar for power. Everything you need to plug in and scale out.

9/ Takeaway: HBv4 when you want proven CPU-only HPC today. HBv5 when you want Genoa + HBM and no DDR. Both are built for the workloads that don’t need GPUs — and for the teams that need to know exactly what’s inside the box.

---

## Thread 2 — Azure ND: The Full GPU Lineup (A100, MI200, H100, MI300X, GB200)

1/ One cloud. Every GPU node you need. Azure’s ND family is the full menu: NVIDIA, AMD, and the node that scales to 72 GPUs in one domain. Here’s the map.

2/ **ND A100 v4** — eight-way A100 in one chassis. Two SKUs: 40 GB HBM per GPU (Standard_ND96asr_A100_v4) or 80 GB (Standard_ND96amsr_A100_v4). Same compute density; pick by memory and cost. Labs and research know why 40 vs 80 GB changes the game.

3/ [Image: Azure ND A100 v4 — physical node. Upload your chassis photo: eight A100 modules, layout.]

4/ **ND MI200 v4** — eight-way MI250X. This is the node Microsoft used for Explorer. #11 on the June 2023 Top500. One chassis, eight MI250X modules. Serious FP64 and matrix for HPC and AI.

5/ [Image: Azure ND MI200 v4 — physical node. Upload your chassis photo: eight MI250X modules.]

6/ **ND H100 v5** — DGX in the cloud. Eight-way H100, Intel Sapphire Rapids host. 96 cores, 1,900 GiB DDR5, 28,000 GiB local NVMe (8× drives). 1× 80G Ethernet (100G Azure SmartNIC), 8× 400G ConnectX-7 NDR InfiniBand. Same node class as Eagle.

7/ [Image: ND H100 v5 / Eagle — rear view. Upload your photo: E1.S SSD carriers, 4× OSFP, two-port Azure SmartNIC, six power supplies.]

8/ **ND MI300X v5** — same platform as ND H100 v5, but 8-way OAM baseboard instead of HGX. 96 cores Sapphire Rapids, 1,850 GiB DDR5, 1,000 GiB local storage. 8× AMD Instinct MI300X. One chassis, eight modules. When you want AMD at the same density as H100.

9/ [Image: Azure ND MI300X v5 — physical node. Upload your photo: open chassis, eight MI300X OAM modules.]

10/ **ND GB200 v6** — Grace–Blackwell. Two GB200 Superchips per server (1 Grace CPU + 2 Blackwell GPUs each). NVLink-C2C for coherence. InfiniBand for scale-out. The number that matters: up to 72 GPUs in a single NVLink domain.

11/ [Image: Azure ND GB200 v6 — internal. Upload your photo: two GB200 Superchips, NVLink/InfiniBand cabling.]

12/ When to pick which: cost-sensitive eight-way A100 → ND A100 v4. AMD, Top500-proven → ND MI200 v4. Max eight-way H100, DGX-style → ND H100 v5. Same density, AMD → ND MI300X v5. Grace–Blackwell, 72-GPU domain → ND GB200 v6. One cloud. Every node. No guesswork.

---

## Image checklist (upload in order)

**Thread 1**  
- Tweet 5: Azure HBv5 — top view (four CPU modules, motherboard, power).  
- Tweet 7: Azure HBv5 — rear view (NVMe, ConnectX-7, Azure Boost v2 NIC, bus bar).

**Thread 2**  
- Tweet 3: ND A100 v4 — physical node.  
- Tweet 5: ND MI200 v4 — physical node.  
- Tweet 7: ND H100 v5 / Eagle — rear (E1.S, OSFP, SmartNIC, 6 PSUs).  
- Tweet 9: ND MI300X v5 — physical node.  
- Tweet 11: ND GB200 v6 — internal.

**Source:** Your Azure node materials (HBv4, HBv5, ND A100 v4, ND MI200 v4, ND H100 v5, ND MI300X v5, ND GB200 v6). No invented specs.
