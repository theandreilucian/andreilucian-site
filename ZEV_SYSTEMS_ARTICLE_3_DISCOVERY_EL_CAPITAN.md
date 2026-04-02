# Systems Module — Article 3: Discovery (OLCF), El Capitan (LLNL)

**Purpose:** One article for the Systems module. Two DOE systems: **Discovery** (Oak Ridge, follow-on to Frontier) and **El Capitan** (Lawrence Livermore). Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

This article covers two flagship DOE systems: **Discovery** at **Oak Ridge National Laboratory (OLCF)** — the follow-on to Frontier, delivery 2028 — and **El Capitan** at **Lawrence Livermore National Laboratory (LLNL)** — Cray EX255a with AMD MI300A APUs, already in production with >1.8 EFLOPS HPL. One is future; one is current. Both define the public-sector exascale stack.

---

## Discovery (OLCF)

**Date:** Jan 30, 2026. **Tags:** #system, #usa/doe/ascr.

**Discovery** is the **follow-on to Frontier** at Oak Ridge. Delivery is scheduled for **2028**. Details below are from the press release.

**[Image: Discovery (OLCF) — system, cabinet, or diagram. Insert your image.]**

**Platform and compute:**

- **Platform:** **Cray GX** (next-generation Cray platform)
- **CPU:** **Venice** CPUs
- **GPU:** **AMD MI430X** GPUs
- **Interconnect:** **Next-generation Slingshot**

**Storage:**

- **Cray E2000** Lustre appliances (parallel file system)
- **Cray K3000** DAOS appliances (AI / scalable object store)

Discovery represents the **ASCR** path: next-gen Cray, Venice + MI430X, and a dual storage strategy (Lustre for classic HPC, DAOS for AI and data-centric workloads). 2028 delivery positions it as the successor to Frontier’s exascale crown at OLCF.

---

## El Capitan (LLNL)

**Date:** Dec 05, 2025. **Tags:** #usa/doe/nnsa, #system.

**El Capitan** is the **Cray EX255a / MI300A** supercomputer at **Lawrence Livermore National Laboratory**. It is in production and has demonstrated **>1.8 EFLOPS** on HPL.

**[Image: El Capitan (LLNL) — system, cabinet, or node. Insert your image.]**

**Performance:**

- **Max HPL (November 2025):** **1.809 EFLOPS**
- **Debut HPL (November 2024):** **1.742 EFLOPS**

**Scale (as of November 2025):**

- **11,264** Cray EX255a compute nodes
- **45,056** AMD MI300A APUs
- **88** cabinets
- **704** Rabbit blades (8 blades per cabinet)
- **34.8 MW** peak power; **30 MW** when running HPL
- **Network:** **Slingshot-11** fabric, **dragonfly** topology

**Node architecture (each Cray EX255a node):**

- **4×** AMD MI300A APUs per node
- **512 GB** HBM3 (8-high stacks)
- Sockets **fully interconnected**

**Storage:**

- **Near-node / local:** 8 **Rabbit** blades per rack, integrated into the Slingshot fabric
- **Global file system:** Lustre file system named **Merced**

El Capitan is the **NNSA** flagship: Cray EX255a, MI300A APUs, Slingshot-11 dragonfly, and a clear split between rack-local storage (Rabbit on fabric) and global Lustre (Merced). It is the reference for **APU-based** exascale in the DOE fleet.

---

## Why these systems matter

- **Discovery** — OLCF’s next machine. Cray GX, Venice, MI430X, next-gen Slingshot, E2000 Lustre + K3000 DAOS. 2028. Defines the **ASCR** roadmap post-Frontier.
- **El Capitan** — LLNL’s in-production exascale. EX255a, 45k MI300A APUs, 1.809 EFLOPS HPL, Slingshot-11 dragonfly, Rabbit + Merced storage. Defines **NNSA** exascale and the **APU** (CPU+GPU in package) deployment model.

For the Systems module, Discovery and El Capitan are the reference pair: **future** ASCR (Oak Ridge) and **current** NNSA (Livermore), both in the same DOE ecosystem.

---

*Systems module — Article 3. Discovery (OLCF), El Capitan (LLNL). Insert your images at the [Image: …] placeholders.*
