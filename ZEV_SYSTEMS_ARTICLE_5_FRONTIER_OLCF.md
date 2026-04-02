# Systems Module — Article 5: Frontier (OLCF)

**Purpose:** One article for the Systems module. **Frontier** — Cray EX supercomputer at Oak Ridge (OLCF) with AMD MI250X GPUs. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

**Frontier** is the **Cray EX** supercomputer composed of **AMD MI250X** GPUs and operated by the **Oak Ridge Leadership Computing Facility (OLCF)**. It achieved a max **HPL** score of **1.353 EFLOPS** in November 2025 after debuting at **1.102 EFLOPS** in June 2022. This article covers system scale, node architecture, network (dragonfly, Slingshot), and the Orion Lustre storage subsystem.

---

## System overview

**Date:** Feb 03, 2026. **Tags:** #usa/doe/ascr, #system.

**[Image: Frontier (OLCF) — cabinets, FRONTIER branding, data center aisle. Insert your image.]**

**Scale:**

- **9,856** Cray EX235a compute nodes
- **9,856** AMD Trento CPUs (Epyc 7A53) — one per node
- **39,424** AMD MI250X GPUs — four per node (each MI250X has two GCDs, so eight logical GPUs per node in software)
- **77** cabinets
- **Interconnect:** **Slingshot** fabric, **dragonfly** topology

---

## Node architecture

Each **Cray EX235a** node has:

**CPU:**

- **1×** AMD Trento (Epyc 7A53)
- **64** Zen 3 cores, **2** threads per core
- **2.0 GHz** base, up to **3.7 GHz** max

**Memory and storage:**

- **512 GB** DDR4 DRAM, **205 GB/s** peak bandwidth
- **2×** 2 TB NVMe SSDs (local storage)

**GPUs:**

- **4×** AMD MI250X
- Each MI250X: **128 GB** HBM2e (64 GB per GCD), **3.2 TB/s** peak HBM bandwidth per GPU
- Node total: **512 GB** GPU memory, **12.8 TB/s** aggregate GPU memory bandwidth

**Network:**

- **4×** Slingshot-11 NICs (e.g. han0–han3), each connecting to GPUs and out to the fabric

**On-node interconnect (from Frontier User Guide–style diagram):**

- **Infinity Fabric GPU–GPU:** 50+50 GB/s
- **Infinity Fabric CPU–GPU:** 36+36 GB/s
- **PCIe Gen4 ESM:** 50+50 GB/s
- **PCIe Gen4:** 8+8 GB/s
- **Ethernet (NIC–GPU):** 25+25 GB/s

**[Image: Frontier — node architecture diagram (NUMA, PCI switch, NVMe, GPUs, NICs). Insert your image.]**

**GPU presentation:** Each *physical* MI250X is presented to Linux as *two* GPUs (one per GCD). So ORNL’s “eight GPUs per node” (logical) and AMD’s “four GPUs per node” (physical) both refer to the same hardware.

---

## Network architecture

Frontier’s Slingshot fabric is organized in a **dragonfly** topology. In the **Cray EX4000** cabinet view, **one cabinet** is one **dragonfly group**.

**Per group:**

- **128** compute nodes
- **32×** 64-port **200G** Slingshot switches
- **4** NICs per node

**Switch port distribution (per switch):**

- **Up to 16** ports down to endpoints (L0)
- **31** ports to other switches in the rack (L1)
- **Up to 16** ports to other groups (L2)

**Per group totals:**

- **512** ports to endpoints
- **992** ports intra-group (switch–switch)
- **Up to 512** ports inter-group

**Inter-group connectivity:**

- **4 links** from each group to every other group
- **Blocking factor:** 512 endpoints / (73 other groups × 4 global links) ≈ **1.753**
- **Injection bandwidth (per group):** 512 endpoints × 200G = **102.4 Tb/s**
- **Ejection bandwidth (per group):** 4 links × 200G × 73 other groups = **58.4 Tb/s**

**[Image: Frontier — network / dragonfly / Slingshot diagram. Insert your image.]**

---

## Storage subsystem — Orion

Frontier’s file system is **Orion**: a large, multi-tier **Lustre** file system built from **Cray ClusterStor E1000**, integrated into the same **dragonfly** network.

**High-level components:**

- **2×** ClusterStor management nodes
- **2×** MGS (Metadata Server) nodes
- **40×** MDS (Metadata Server) nodes
- **450×** OSS (Object Storage Server) nodes
- **160×** LNET router nodes (external connectivity)
- **12×** utility nodes
- **80×** Slingshot switches
- **35×** management switches

**Scalable Storage Unit (SSU):**

- **1×** Cray E1000 system
- **24×** 3.84 TB NVMe drives
- **2×** nodes, each with: 1× AMD Rome (32-core), **256 GB** DDR4, **2×** Slingshot-11 NICs
- **2×** 4U106 SAS enclosures with **212×** 18 TB HDDs

**Scalable Storage Cluster (SSC) = one dragonfly group:**

- **45×** SSUs
- **32×** LNET router nodes
- **8×** MDS nodes (across four E1000 systems); each MDS: Rome 32-core, 256 GB DDR4, 2× Slingshot-11, half of the E1000’s **24× 30.72 TB** NVMe drives for metadata
- **5×** management switches
- **16×** Slingshot switches

**Full file system:** Five SSCs (five dragonfly groups).

**Object Storage Targets (OSTs):**

- **5,400×** 3.84 TB NVMe → **20,736 TB** raw, **11,400 TB** formatted
- **47,700×** 18 TB HDD → **858,600 TB** raw, **667,600 TB** formatted

**Metadata Targets (MDTs):**

- **480×** 30.72 TB NVMe → **14,745.6 TB** raw, **9,700 TB** formatted for **Data-on-MDT (DoM)**

**Stack:** ClusterStor runs **ZFS** and **dRAID** (not Idiskfs and not Cray’s proprietary GridRAID).

**[Image: Frontier — storage / Orion / ClusterStor diagram or capacity summary. Insert your image.]**

---

## Why Frontier matters

- **Performance** — 1.353 EFLOPS HPL (Nov 2025); exascale in production since 2022.
- **Scale** — 9,856 EX235a nodes, 39,424 MI250X (4 per node, 8 logical GCDs), 77 cabinets; Slingshot dragonfly.
- **Node** — Trento 64-core, 512 GB DDR4, 4× MI250X (128 GB HBM2e each), 4× Slingshot-11; clear Infinity Fabric and PCIe bandwidths.
- **Network** — EX4000 group: 128 nodes, 32× 64-port 200G Slingshot; 4 links/group; blocking ~1.75; 102.4 Tb/s injection, 58.4 Tb/s ejection per group.
- **Storage** — Orion Lustre on ClusterStor E1000; five dragonfly groups; OSTs (NVMe + HDD), MDTs (30.72 TB NVMe, DoM); ZFS and dRAID.

For the Systems module, Frontier is the reference for **DOE ASCR exascale**: Cray EX235a, AMD Trento + MI250X, Slingshot dragonfly, and a massive Lustre deployment (Orion) on the same fabric.

---

*Systems module — Article 5. Frontier (OLCF). Insert your images at the [Image: …] placeholders.*
