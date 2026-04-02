# Systems Module — Article 1: Aurora (ALCF), ABCI 3.0 (AIST), Alps (CSCS)

**Purpose:** One article for the Systems module. Three flagship systems: Aurora at Argonne, ABCI 3.0 in Japan, and Alps at CSCS. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

The Systems module is where **full machines** come into focus: node counts, CPUs and GPUs, network topology, and storage. This article covers three: **Aurora** (ALCF, USA — Cray EX with Intel blades and Ponte Vecchio), **ABCI 3.0** (AIST, Japan — HPE Cray XD670, GPU nodes), and **Alps** (CSCS, Europe — mixed Cray EX “Frankenstein” across Lugano and EPFL).

---

## Aurora (ALCF)

**Date:** Jan 30, 2026. **Tags:** #usa/doe/ascr, #system.

Aurora is the **Cray EX** supercomputer operated by the **Argonne Leadership Computing Facility (ALCF)**. Intel was the **prime contractor** and supplied its own compute blades; the system uses Cray EX cabinet and **Slingshot** network but **not** Cray-branded compute blades. You cannot buy Ponte Vecchio blades from Cray.

**[Image: Aurora (ALCF) — system or cabinet. Insert your image.]**

**Performance:** Achieved a max **HPL** score of **1.012 EFLOPS** using **87%** of the system in June 2024, after debuting six months earlier with **585.3 PFLOPS**.

**Scale:**

- **10,624** compute nodes
- **21,248** Intel Sapphire Rapids HBM CPUs (Intel Xeon CPU Max)
- **63,744** Ponte Vecchio GPUs (Intel Data Center GPU Max)
- **166** cabinets

**Node architecture (Intel blades):**

Each Intel node has:

- **CPU:** 2× Intel Xeon CPU Max **9470C** (Sapphire Rapids HBM) — 52 cores per socket, 2 threads per core; **64 GB HBM** per socket
- **Memory:** **512 GB DDR5**
- **GPU:** 6× Intel Data Center GPU Max **1550** (Ponte Vecchio) — 128 Xe cores per socket, **128 GB HBM2e** per socket
- **Network:** **8× Slingshot-11** NICs

Nodes are so large that there is **one node per blade**, or **64 nodes per cabinet**.

**Network architecture:** Slingshot-11 in a **dragonfly** topology; compute and storage share the same fabric.

- **166×** compute groups
- **8×** storage groups (DAOS servers)
- **1×** service group (login nodes and ancillary servers)

Inter-group connectivity: 2 links compute–compute, 2 compute–service, 2 compute–storage; 8 storage–service; 24 storage–storage. Each group has **32 switches**; per switch: 16 ports down to endpoints (L0), 31 to other switches in rack (L1), up to 16 to other groups (L2). **Blocking factor** within compute ≈ **1.55** (165 other groups × 2 global links / 512 endpoints).

**Storage:** Aurora uses **DAOS** instead of a traditional parallel file system. **1,024** Intel Coyote Pass servers, each with:

- 2× Intel 5320 (Ice Lake)
- **512 GiB** DDR4 (16× 32 GB DIMMs)
- **8,192 GiB** Intel Optane 200 (16× 512 GB DIMMs)
- **244.8 TB** Samsung PM1733 SSDs (16× 15.3 TB)
- 2× Slingshot-11 NICs

**Total:** **230 PB** capacity (16+2 erasure coding), **over 31 TB/s** bandwidth.

---

## ABCI 3.0 (AIST)

**Date:** Jun 18, 2025. **Tags:** #system/japan.

ABCI 3.0 is a **766-node** **HPE** GPU supercomputer sited at **AIST** (Japan). Evolution of Japan’s leading AI infrastructure.

**[Image: ABCI 3.0 (AIST) — system or node. Insert your image.]**

**Performance debut:** Debuted on the **Top500** at **#15** at **ISC25**. **Rmax** = **145.1 PF** FP64 using **416 nodes** (54% of the system). Benchmark run: **33 minutes**. Deployed in **2024**.

**Node architecture:**

- **766** Cray **XD670** nodes
- Per node:
  - **CPU:** 2× Intel **Sapphire Rapids**
  - **GPU:** 8× GPU per node
  - **Network (compute):** 8× **NDR200** InfiniBand
  - **Memory:** **2,048 GiB** DDR5-5600
  - **Local storage:** 2× **7.68 TB** NVMe (U.3)
  - **Network (storage):** 1× **HDR** InfiniBand (dedicated for storage)

**Network:** **Three-level non-blocking fat tree**.

**Storage:** **75 PB** global storage — **Lustre** and **S3**; backend on **QLC SSDs**.

---

## Alps (CSCS)

**Date:** Jan 25, 2025. **Tags:** #system, #europe.

Alps is a **“Frankenstein” Cray EX** supercomputer at **CSCS**, composed of **five different blade types** across **two sites**: **CSCS in Lugano** and **EPFL in Lausanne**. It includes multiple GPU and CPU blade types.

**[Image: Alps (CSCS) — system or blade layout. Insert your image.]**

**Blade and node summary:**

| Blade type   | Node count | CPU                          | GPU                          |
|--------------|------------|------------------------------|------------------------------|
| Cray EX425   | 1,024      | 2× AMD Rome                  | — (CPU-only)                 |
| Cray EX235n  | 144        | 1× AMD Milan                 | 4× GPU (custom 96 GB HBM2e)  |
| Cray EX255a  | 128        | —                            | 4× AMD **MI300A**            |
| Cray EX235a  | 24         | 1× AMD Trento                | 4× AMD **MI250X**            |

**Notes:** Custom GPU variants include **96 GB HBM2e**.

**Status:** As of August 2024, Alps was still in **preproduction**; performance had not stabilized.

**References:** “Understanding Data Movement in Tightly Coupled Heterogeneous Systems: A Case Study with the Grace Hopper Superchip” (architectural details); “Exploring GPU-to-GPU Communication: Insights into Supercomputer Interconnects” (collectives performance on Alps).

---

## Why these three matter

- **Aurora** — First reported **exaflop** (1.012 EF HPL) on a Cray EX with **Intel** as prime: Sapphire Rapids HBM + Ponte Vecchio, Slingshot-11 dragonfly, **DAOS** for 230 PB and 31+ TB/s. Reference for DOE/ASCR leadership systems and Intel Max stack.
- **ABCI 3.0** — Japan’s flagship AI/HPC system: XD670, NDR200, 75 PB Lustre/S3. Top500 #15 at ISC25; 145.1 PF with 54% of nodes. Reference for GPU-based national scale and three-level fat tree.
- **Alps** — Mixed Cray EX at CSCS/EPFL: MI300A, MI250X, custom GPU (96 GB HBM2e), and CPU-only Rome. “Frankenstein” = multiple blade types and vendors on one fabric. Reference for **heterogeneous** Cray EX and European HPC.

---

*Systems module — Article 1. Aurora (ALCF), ABCI 3.0 (AIST), Alps (CSCS). Insert your images at the [Image: …] placeholders.*
