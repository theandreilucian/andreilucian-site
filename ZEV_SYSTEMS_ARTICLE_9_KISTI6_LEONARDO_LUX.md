# Systems Module — Article 9: KISTI-6 (KISTI), Leonardo (CINECA), Lux (OLCF)

**Purpose:** One article for the Systems module. Three systems: **KISTI-6** (Korean flagship, Cray EX, Turin + GPU nodes), **Leonardo** (CINECA, BullSequana XH2000, GPU accelerator nodes, LISA upgrade), **Lux** (OLCF phase-1 Frontier follow-on, MI355X, OCI). Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

This article covers three systems from different programs: **KISTI-6** — Korea’s flagship Cray EX (588 PF, Turin + GPU nodes, 1H2026); **Leonardo** — CINECA’s 240 PF BullSequana XH2000 in Bologna (GPU accelerator nodes, HDR dragonfly+, two-tier Lustre, LISA upgrade to MI300X); **Lux** — Oak Ridge’s first-phase Frontier follow-on (ProLiant XD685, AMD MI355X, AMD Pensando Ethernet, OCI Dedicated Region in NCCS). Each illustrates a different scale and stack: national flagship, EuroHPC pre-exascale with CPU+GPU mix, and DOE ASCR’s cloud-integrated AI cluster.

---

## KISTI-6 (KISTI)

**Date:** Jun 18, 2025. **Tag:** #system/korea.

**KISTI-6** is the **Korean flagship** supercomputer, announced in **May 2025** and fully commissioned in **1H2026**. It is a **Cray EX** system delivering **588 PF** from **2,084** nodes.

**[Image: KISTI-6 (KISTI) — system or announcement. Insert your image.]**

**Node mix:**

- **2,048×** Cray GPU nodes
- **800×** **Turin** CPU nodes
- **20×** GPU nodes (additional)

**Cooling:** **96%** liquid cooled via **rear-door heat exchangers**.

---

## Leonardo (CINECA)

**Date:** Feb 18, 2026. **Tags:** #europe/eurohpc, #system.

**Leonardo** is a **240 PF** **BullSequana XH2000** “pre-exascale” supercomputer at **CINECA** in **Bologna, Italy**. It is a mix of **CPU-only** and **GPU accelerator** nodes. HPL: **174.70 PF**. The Booster module uses GPUs with **64 GB HBM2** per device.

**[Image: Leonardo (CINECA) — system or cabinets. Insert your image.]**

**Compute — Booster module:**

- **3,456** compute nodes
- **BullSequana X2135** blades
- **CPU:** 1× 32-core **Intel Xeon 8358** per node
- **Memory:** **512 GB** DDR4-3200 DRAM per node
- **GPU:** 4× GPU (64 GB HBM2) per node
- **Interconnect:** 4× **100G HDR100** InfiniBand per node

**Compute — Data Centric module:**

- **1,536** compute nodes
- **BullSequana X2610** blades
- **CPU:** 2× 56-core **Intel Sapphire Rapids** per node
- **Interconnect:** 1× 100G HDR100 InfiniBand (one NIC, one port) per node
- **Storage:** **8 TB** NVMe per node

**Interconnect:** **HDR InfiniBand** in **dragonfly+**. Each **GPU group** is a **two-level nonblocking fat tree**:

- **36×** 40-port **200G** switches (80× 100G ports)
- **18× leaf:** 40× 100G down to 10 nodes; 18× 200G up to spines
- **18× spine:** 18× 200G down to leaves; 22× 200G up to other groups
- **180 nodes** (720 GPUs) per GPU group  
(CPU-only group layout not detailed in the source.)

**Storage subsystem (two tiers):**

- **Fast tier:** **5.7 PB** all-flash Lustre. **31×** DDN Exascaler **ES400NVX2** (24× 7.68 TB NVMe, encryption; 4× HDR200 InfiniBand ports).
- **Capacity tier:** **137.6 PB** HDD Lustre. **31×** DDN **ES7990X** OSS (82× 18 TB in head + 2×82 18 TB SS9012 JBODs; 4× HDR100). **4×** DDN **SFA400NVX** MDS (21× 3.84 TB NVMe, 8× HDR100).

**Location:** **Tecnopolo Bologna**, in a data center that used to be a tobacco factory — the same site where **ECMWF** hosts its supercomputers.

---

## LISA upgrade (Leonardo)

In **September 2024**, the Italian government and **EuroHPC-JU** issued an RFP for **“Leonardo Improved Supercomputing Architecture” (LISA)**:

- **Delivery:** April 2025  
- **Acceptance:** August 2025  

The expansion is **very prescriptive**, effectively requiring **8-way MI300X OAM** (or equivalent) nodes.

**Quoted requirements:**

- The LISA partition must include **at least 165 nodes**, **memory coherence** for GPUs inside the nodes, and **eight GPUs per node**.
- Each GPU must have **at least 80 GB** HBM. The host node must have **two x86 CPUs** and **at least 1 TB** main memory, with **all memory slots occupied** to saturate CPU memory channels.

**[Image: Leonardo — LISA upgrade or storage/interconnect diagram. Insert your image.]**

---

## Lux (OLCF)

**Date:** Jan 30, 2026. **Tags:** #usa/doe/ascr, #system.

**Lux** is the **first phase** of the follow-on to **Frontier** at **Oak Ridge National Laboratory (OLCF)**, scheduled for deployment in **early 2026** (per press release).

**[Image: Lux (OLCF) — system or announcement. Insert your image.]**

**Stack:**

- **Platform:** **HPE ProLiant Compute XD685**
- **GPU:** **AMD MI355X** GPUs
- **Network:** **AMD Pensando** Ethernet
- **Cloud:** Leverages **Oracle Cloud Infrastructure (OCI)** as part of the **Lux AI Cluster**

Lux is being deployed as an **OCI Dedicated Region** inside the **NCCS datacenter** where **Summit** used to sit — i.e. on-premises OCI capacity colocated with DOE HPC.

---

## Why these systems matter

- **KISTI-6** — Korean flagship Cray EX; 588 PF from 2,084 nodes (2,048 GPU nodes, 800 Turin, 20 GPU nodes); 96% liquid cooled; reference for **national** GPU + CPU mix and commissioning timeline (1H2026).
- **Leonardo** — EuroHPC pre-exascale at CINECA; 174.70 PF HPL; 64 GB GPU Booster + Sapphire Rapids Data Centric; HDR dragonfly+, two-tier Lustre (5.7 PB flash + 137.6 PB HDD); **LISA** adds ≥165 nodes of 8-way MI300X (≥80 GB HBM, 2× x86, ≥1 TB host memory). Reference for **EuroHPC** pre-exascale and prescriptive GPU upgrade.
- **Lux** — OLCF phase-1 Frontier follow-on; ProLiant XD685, MI355X, AMD Pensando Ethernet; **OCI Dedicated Region** in NCCS (ex-Summit space). Reference for **DOE ASCR** cloud-integrated AI cluster (on-prem OCI + AMD GPU + Ethernet).

For the Systems module, these three cover **Korea** (KISTI-6), **Europe** (Leonardo + LISA), and **USA/DOE** (Lux) at different scales and with different GPU/CPU and cloud-integration choices.

---

*Systems module — Article 9. KISTI-6, Leonardo, Lux. Insert your images at the [Image: …] placeholders.*
