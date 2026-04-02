# Systems Module — Article 6: Fugaku (R-CCS), FugakuNEXT (R-CCS)

**Purpose:** One article for the Systems module. **Fugaku** at RIKEN-RCCS (Kobe) and its successor **FugakuNEXT**. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

**Fugaku** is Japan’s flagship supercomputer at **RIKEN-RCCS** in Kobe — a large, Arm-based system built on **Fujitsu A64FX** with HBM2. Its planned successor, **FugakuNEXT**, targets deployment in **2029** and operations in **2030**, with next-generation GPUs, **Fujitsu Monaka-X** CPUs, and a colocated **IBM quantum** system. This article covers Fugaku’s scale and node, FugakuNEXT’s architecture and targets, performance tables, storage, and the strawman non-quantum node vision (3D stacking, silicon photonics, CGRA).

---

## Fugaku (R-CCS)

**Date:** Dec 04, 2024. **Tag:** #system/japan.

Fugaku is a large-scale supercomputer at **RIKEN Center for Computational Science (R-CCS)** in Kobe. It is built on **Fujitsu A64FX** processors with **HBM2** memory and achieved **415.53 PFLOPS** HPL on the June 2020 Top500 list.

**[Image: Fugaku (R-CCS) — system, cabinets, or site. Insert your image.]**

**Scale:**

- **158,976** compute nodes
- **158,976** Fujitsu A64FX Arm CPUs (one per node)
- **432** racks (396 fully populated, 36 half-populated)
- **Fully populated rack:** 384 nodes
- **Half-populated rack:** 192 nodes

**Platform hierarchy (Fugaku has no public brand name; Fujitsu’s commercial equivalent is PRIMEHPC FX1000):**

- **Node → CMU:** 2 nodes per CPU Memory Unit (CMU)
- **CMU → BoB:** 8 CMUs per “bunch of blades” (BoB)
- **BoB → shelf:** 3 BoBs per shelf
- **Shelf → rack:** 8 shelves per rack

**Node architecture (each node):**

- **CPU:** 1× Fujitsu A64FX
  - **48** Armv8.2-A **SVE** (Scalable Vector Extension) cores + **2** assistant cores
  - **2.0 GHz** base, **2.2 GHz** max
  - **3.072 TF** FP64 base, **3.3792 TF** FP64 max
- **Memory:** **32 GB** HBM2, **1,024 GB/s** peak bandwidth
- **Network:** 1× **10-port Tofu D** router (28 Gbps × 2 lanes per port)
- **Expansion:** 1× PCIe Gen3 x16

---

## FugakuNEXT (R-CCS)

**Date:** Aug 22, 2025. **Tag:** #system/japan.

**FugakuNEXT** is the codename for Japan’s follow-on flagship, succeeding Fugaku. **RIKEN** leads; **Fujitsu** holds the design contract; A GPU vendor supplies the GPUs. Deployment in **Kobe** in **2029**, operations from **2030**.

**[Image: FugakuNEXT — announcement, diagram, or site. Insert your image.]**

**Scale and performance (from initial announcement):**

- **Over 3,400** nodes
- **15,000** GPUs
- **2.6 EFLOPS** FP64 (target)
- **20×** application speedup over Fugaku, **60×** over K computer
- **600 EFLOPS** FP8 with **2:1 sparsity**
- **Less than 40 MW** (target **30 MW**)

**System architecture (per initial announcement):**

- **CPU:** **Fujitsu Monaka-X** (ARM with **SME**, possible NPU)
- **GPU:** Next-generation GPU
- **Host–device:** TBD coherent interconnect
- **Scale-up:** **NVLink** within nodes, possibly between nodes
- **Scale-out:** Custom high-speed interconnect
- **Quantum:** Colocated **IBM quantum** system — **156-qubit IBM Heron** attached to the scale-out fabric

---

## Performance targets (Satoshi Matsuoka, Salishan 2025)

For simulation workloads, RIKEN has outlined (e.g. at Salishan 2025):

- **Raw hardware performance gain:** 10×–20×
- **Mixed precision or emulation:** 2×–8×
- **Surrogates / PINN (Physics-Informed Neural Networks):** 10×–25×
- **Total:** **200×–1000×** or more over Fugaku — “**Zettascale**” class

**[Image: FugakuNEXT — performance targets or requirements table. Insert your image.]**

**System performance requirements (RFP / vendor announcement):**

| Metric              | CPU    | GPU      |
|---------------------|--------|----------|
| FP64 vector         | 48 PF  | 3,000 PF |
| FP16/BF16 matrix   | 1,500 PF | 150,000 PF |
| FP8 matrix         | 3,000 PF | 300,000 PF |
| FP8 matrix, 2:1 sparse | —   | 600,000 PF |
| Memory capacity     | 10 PiB | 10 PiB   |
| Memory bandwidth    | 8 PB/s | 800 PB/s |

---

## Storage subsystem (FugakuNEXT)

Two tiers:

- **Tier 1 — Near-node local:** e.g. **CHFS**, **BeeOND**-style burst buffers
- **Tier 2 — Shared:** **Lustre**, **DAOS**

---

## Strawman non-quantum FugakuNEXT node vision (2028–2030)

Satoshi Matsuoka has described a **non-quantum** next-gen node vision since around 2022. The strawman targets **2028–2030** and emphasizes **3D stacking**, **silicon photonics**, and **strong-scaling accelerators** (e.g. **CGRA**).

**[Image: FugakuNEXT — strawman architecture diagram (3D stack, silicon photonics, CGRA). Insert your image.]**

**Diagram elements:**

- **Organic substrate** with **TSV interposer**
- **Left — General-purpose CPU:** High-bandwidth, high–memory-capacity many-core CPU with **3D-stacked memory** (DRAM, SRAM, NVM). >**20 TB/s** SRAM bandwidth (scalable to ~40 TB/s). FP64/FP32. Tiled architecture.
- **Center — Accelerator:** Strong-scaling / compute-intensive accelerator with **low-latency 3D SRAM** (e.g. **CGRA** for MD, DL inference, stencils, FFTs). >**1 PF** per node; configurable compute pipelines.
- **Right — Silicon photonics:** **Multi-port**, high injection; **1 Tbps × 12 = 12 Tbps**; **DWDM** direct chip–chip interconnect. **1.5 nm** (or similar) fabrication noted.
- **Network:** Low-arity switches, multi-dimensional torus, multi-channel injection.

**Targets (strawman):**

- **~80,000** nodes
- **2–3 EB/s** memory bandwidth (15–25× Fugaku)
- **~100 EF** low-precision FP (~50× Fugaku)
- **30×–100×** application performance over Fugaku with mixed precision
- **~30 MW** average power (~1.5× Fugaku)
- **Mainstream software** compatibility

**Themes:** 3D stacking (memory + logic); **silicon photonics**; large SRAM (e.g. AMD 3D V-Cache–style); **specialized tensor cores**; **CGRA** (vs. SIMD); **processing-in-memory (PIM)**.

---

## Why Fugaku and FugakuNEXT matter

- **Fugaku** — 158k A64FX nodes, 432 racks, 415 PF HPL; Arm SVE, HBM2, Tofu D; reference for **all-CPU, Arm-based** exascale-era HPC.
- **FugakuNEXT** — 3.4k+ nodes, 15K GPUs, 2.6 EF FP64, 600 EF FP8 sparse; Monaka-X + next-gen GPU; NVLink + custom scale-out; **156-qubit IBM Heron** on fabric; 30 MW target; 2029/2030.
- **Performance** — RFP/announcement table (48 PF CPU / 3,000 PF GPU FP64; 10 PiB + 800 PB/s GPU); Matsuoka targets: 200×–1000× over Fugaku (Zettascale).
- **Vision** — Strawman node: 80k nodes, 3D stack, silicon photonics, CGRA, 30 MW; two-tier storage (near-node + Lustre/DAOS).

For the Systems module, Fugaku and FugakuNEXT are the reference for **Japan’s flagship** path: Arm + HBM (Fugaku) and **CPU+GPU+quantum** (FugakuNEXT) with a clear performance and power roadmap.

---

*Systems module — Article 6. Fugaku (R-CCS), FugakuNEXT (R-CCS). Insert your images at the [Image: …] placeholders.*
