# Article 1 — Azure: CPU-Only and ND GPU Lineup

**Purpose:** Medium-length article. One of three (Azure, BullSequana, Cray). Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Azure is where Microsoft’s cloud meets serious HPC and AI.

Two tracks: CPU-only nodes for simulations, genomics, and memory-bound work — and the ND GPU lineup for AMD Instinct (MI200, MI300X).

This article covers what’s in the box and when to use which.

---

## CPU-only HPC: HBv4 and HBv5

For workloads that don’t need GPUs, the HB series is the answer.

**HBv4** is the current workhorse.

176 cores (AMD EPYC 9V33X Genoa-X). Two sockets of 96 cores each. 2.4 GHz base, 3.7 GHz boost.

Each node has:

- 768 GiB DDR5
- 2× 1.8 TB NVMe, 1× 480 GB SSD
- 1× 400G NDR InfiniBand
- 80G Ethernet (2nd gen Azure SmartNIC)

Built for scale-out HPC without a single GPU.

**HBv5** is the next step, unveiled at SC24.

Microsoft’s custom socket pairs Genoa cores with HBM. There is no DDR DRAM.

Each node has:

- **CPU:** 352 cores (AMD EPYC 9V64H), four sockets of 96-core CPUs.
- **Memory:** 400–450 GiB HBM3, 6.9 TB/s STREAM Triad.
- **Storage:** 14 TB NVMe (8× ~1,920 GB drives).
- **Networking:** 4× 200G NDR InfiniBand (one per socket), 160G Ethernet (2nd gen Azure SmartNIC).

From the top, the board and power design are deliberately simple.

Fewer failure points. Easier cooling and service.

For hospitals and government, that simplicity is reliability.

**[Image: Azure HBv5 — top view. Insert your photo: four CPU modules, motherboard, power connector.]**

The rear tells the rest of the story.

Eight NVMe slots. Four NDR InfiniBand adapters (one OSFP each). Dual-port Azure Boost v2 NIC. Dual-zone bus bar for power.

Everything needed to plug in and scale out.

**[Image: Azure HBv5 — rear view. Insert your photo: eight NVMe slots, ConnectX-7 OSFP, Azure Boost v2 NIC, bus bar power.]**

**When to use:**

HBv4 for proven CPU-only HPC today.

HBv5 when you want Genoa plus HBM and no DDR.

Both are built for workloads that don’t need GPUs — and for teams that need to know exactly what’s inside the box.

---

## ND GPU lineup: MI200, MI300X

The ND family offers AMD Instinct at scale. One cloud. Every GPU node.

**ND MI200 v4**

Eight-way MI250X.

This is the node behind Microsoft’s Explorer supercomputer — #11 on the June 2023 Top500.

One chassis, eight MI250X modules. Serious FP64 and matrix performance for HPC and AI.

**[Image: Azure ND MI200 v4 — physical node. Insert your chassis photo: eight MI250X modules.]**

**ND MI300X v5**

Eight-way OAM baseboard. 96 cores Sapphire Rapids. 1,850 GiB DDR5. 1,000 GiB local storage. 8× AMD Instinct MI300X.

One chassis, eight modules.

**[Image: Azure ND MI300X v5 — physical node. Insert your photo: open chassis, eight MI300X OAM modules.]**

**When to pick which:**

- AMD, Top500-proven → ND MI200 v4
- Same density, eight-way AMD → ND MI300X v5

One cloud. Every node. No guesswork.

---

## Closing

Azure gives you CPU-only HPC and the full ND GPU spread in one place.

Drop in your images at the placeholders above and you have a complete medium-length article — ready for nerds, hospitals, and government.

**Image checklist (this article):**

1. Azure HBv5 — top view  
2. Azure HBv5 — rear view  
3. Azure ND MI200 v4 — physical node  
4. Azure ND MI300X v5 — physical node  

---

*Source: Your Azure node materials. No invented specs.*
