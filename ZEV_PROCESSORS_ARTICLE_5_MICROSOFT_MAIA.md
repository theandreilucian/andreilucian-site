# Processors Module — Article 5: Microsoft Maia 100 and Maia 200

**Purpose:** One article for the Processors module. Microsoft’s first- and second-generation AI accelerators (Maia). Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Article 4 covered Intel Ponte Vecchio. This one covers **Microsoft Maia** — the in-house AI accelerator family for Azure. **Maia 100** is first-generation (TSMC N5, 64 tiles, Ethernet interconnect). **Maia 200** is second-generation (TSMC 3 nm, 216 GB HBM3e, optimized for high-volume inference and token generation), with a hierarchical tile/cluster architecture, on-die NIC, and scale to 6,144 accelerators.

---

## Microsoft Maia 100 — First-generation

**Date:** Oct 22, 2024. **Tag:** #GPU.

Maia 100 is Microsoft’s **first-generation** AI accelerator (stylized *Maia*).

**[Image: Microsoft Maia 100 — product or block diagram. Insert your image.]**

**Architecture:**

- **16 clusters** → **64 tiles** per accelerator
- **Tensor unit** — Implemented as **16×R×16** (notation may relate to tensor-core terminology; exact meaning vendor-specific)
- **L1 and L2 scratchpads**
- **Precision:** Low-precision MX formats — **4-bit, 6-bit, 9-bit**, plus **FP32** and **BF16**

**Memory:**

- **64 GB HBM2e** (4× HBM2e stacks)
- **1.8 TB/s** bandwidth

**Interconnect:**

- **12× 400 GbE** ports per chip
  - **9×400G** to three other Maia chips per node (3×400G each)
  - **3×400G** to the **T0** switch layer
- Each Maia 100 connects to **three different T0 switches** → **multi-plane with three planes**
- **Ethernet** for both **intra-node** and **inter-node**
- **4,800 Gbps** AllGather and Scatter-Reduce bandwidth
- **1,200 Gbps** Alltoall bandwidth
- Uses a **gather-based approach** for distributed GEMM (not AllReduce-based); detailed at Hot Chips

**Manufacturing and power:**

- **105 billion transistors** on an **820 mm²** reticle-limited die
- **TSMC N5**
- **500 W** typical, up to **700 W**

---

## Microsoft Maia 200 — Second-generation

**Date:** Jan 26, 2026. **Tag:** #GPU.

Maia 200 is Microsoft’s **second-generation** AI accelerator, optimized for **high-volume AI inference** and **token generation** in Azure. Fabricated on **TSMC 3 nm**.

**[Image: Microsoft Maia 200 — product or block diagram. Insert your image.]**

**Headline specs:**

- **140B transistors**, **TSMC 3 nm**
- **Matrix engine** — FP8, FP6, FP4
- **Vector engine** — BF16, FP16, FP32
- **216 GB HBM3e** (6× 36 GB 12-high stacks), **7 TB/s** bandwidth
- **272 MB** on-die SRAM ( **CSRAM** + **TSRAM** )
- **On-die NIC** — Ethernet-based, **1.4 + 1.4 TB/s** per accelerator
- **Scale:** Scale-up within nodes, scale-out across nodes; collectives for up to **6,144 accelerators**

---

## Maia 200 — Architecture (tile and cluster)

**Tile** (smallest autonomous unit):

- **Tile Tensor Unit (TTU)** — Matrix multiply / convolution; FP8, FP6, FP4; mixed precision (e.g. FP8 activations × FP4 weights)
- **Tile Vector Processor (TVP)** — Programmable SIMD; FP8, BF16, FP16, FP32
- **Tile SRAM (TSRAM)** — Multi-banked local SRAM for tile execution
- **Tile DMA** — Moves data in/out of TSRAM without stalling compute
- **Tile Control Processor (TCP)** — Orchestrates TTU and DMA; hardware semaphores for fine-grained sync

**Cluster** (second tier):

- Multiple tiles per cluster
- **Cluster SRAM (CSRAM)** — Large multi-banked SRAM shared across tiles in the cluster
- **Cluster DMA** — Staging between CSRAM and co-packaged HBM
- **Cluster core** — Control and synchronization for multi-tile execution
- Redundancy schemes for tiles and SRAM for yield while keeping the hierarchical execution model

**On-chip network:**

- **Logical planes** — Bulk tensor (data plane) vs latency-sensitive control/sync (control plane)
- **QoS** for critical low-latency traffic
- **Hierarchical broadcast** and localized cluster traffic to cut redundant HBM reads
- **Layered DMA** — Tile DMA, Cluster DMA, Network DMA to overlap movement with compute

---

## Maia 200 — Intra-node and interconnect

**Intra-node:** **Fully Connected Quads (FCQ)** between accelerator packages — Microsoft’s answer to dense node-level connectivity (e.g. NVLink-style).

**Interconnect:**

- **Protocol:** Ethernet-based, custom **Microsoft AI Transport Layer (ATL)**
- **Features:** Packet spraying, multipath routing, congestion-resistant flow control (reminiscent of MRC-style flow control)

---

## Maia 200 — Performance

Maia 200 is designed for **low-precision inference throughput** within a **750 W** SoC TDP.

**[Image: Microsoft Maia 200 — performance or system diagram. Insert your image if available.]**

| Metric | Value |
|--------|--------|
| **Peak FP4** | >10 PFLOPS (10.1 PetaOPS cited) |
| **Peak FP8** | >5 PFLOPS |
| **HBM capacity** | 216 GB HBM3e |
| **HBM bandwidth** | 7 TB/s |
| **On-die SRAM** | 272 MB (CSRAM + TSRAM) |
| **Network bandwidth** | 2.8 TB/s bidirectional per accelerator |
| **Power** | 750 W SoC TDP |

---

## Maia 200 — System architecture

**Node / tray:** Each node (tray) has **four accelerators**, **one FCQ**, and **direct, non-switched links** between them.

**Scaling:** Network scales out to **6,144 accelerators** in a **two-tier** topology → **1,536 nodes/trays**. Uses **128-port** switches (or equivalently **2×400G×64 port** switches) with **packet spraying** for data distribution. **ATL** is used for both **intra-rack** and **inter-rack**; the design implies an **8-plane multi-plane fat tree** topology.

---

## Why Maia matters

- **Maia 100** — First-generation in-house Azure accelerator; 64 tiles, 64 GB HBM2e, 12×400G Ethernet, three-plane T0, gather-based distributed GEMM. 105B transistors, N5, 500–700 W. Reference for “cloud vendor custom silicon” and Ethernet as the scale-out fabric.
- **Maia 200** — Second-generation; 140B transistors, 3 nm; 216 GB HBM3e, 7 TB/s; 272 MB SRAM; FP8/FP6/FP4 matrix, BF16/FP16/FP32 vector. Tile/cluster hierarchy (TTU, TVP, TSRAM, CSRAM, DMA, TCP). On-die NIC (1.4+1.4 TB/s); FCQ intra-node; ATL over Ethernet with packet spraying and congestion-resistant flow control. >10 P FP4, >5 P FP8 at 750 W; scale to 6,144 accelerators in an 8-plane fat tree. For the Processors module, Maia is the reference for **Microsoft Azure custom AI silicon** and for **Ethernet-based** accelerator interconnect at scale.

---

*Processors module — Article 5. Microsoft Maia 100 and Maia 200. Insert your images at the [Image: …] placeholders.*
