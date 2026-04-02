# Article 3 — Cray EX: AMD and CPU-Only Blades (EX235a, EX255a, EX425)

**Purpose:** Medium-length article. One of three (Azure, BullSequana, Cray). Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

HPE’s Cray EX platform runs on Slingshot.

This article covers the AMD and CPU-only blades: Trento + MI250X, MI300A APU, and CPU-only.

One platform. Every workload.

This article walks through each blade: what’s in the box and when to use it.

---

## EX235a — Trento + MI250X

**EX235a** — Trento + MI250X.

Two nodes per blade.

Per node: 1× AMD Trento CPU, up to 512 GB DDR4, up to 2× NVMe SSDs, 4× AMD MI250X GPUs, up to 4× Slingshot-11 NICs.

These nodes are unique: Trento is a modified Milan with Infinity Fabric to the MI250X GPUs.

GPU HBM is cache coherent with CPU memory.

The Slingshot-11 PCIe NICs are attached to the GPUs’ PCIe ports, not the CPU’s — a non-standard, performance-optimized layout.

---

## EX255a — MI300A APU Blade

**EX255a** — MI300A APU blade.

2× 4-socket node cards (8 APUs per blade).

1× NVMe M.2 slot per node card (2 per blade).

4×–8× Slingshot-11 injection ports per node (8×–16× per blade).

The lack of node-local storage is often compensated by Cray’s Rabbit chassis, which uses spare Slingshot switch ports to host NVMe servers.

The high density of 200G Slingshot ports also matters as the industry moves to 400G NDR InfiniBand.

**[Image: Cray EX255a — blade internals. Insert your photo: node cards, copper heatsinks, blue/white/grey cabling.]**

---

## EX425 — CPU-Only

**EX425** — CPU-only.

Two nodes per blade.

Per node: 2× AMD Rome or AMD Milan CPUs, up to 1,024 GB DDR4 (8× DIMMs per socket, up to 64 GB/DIMM), no node-local storage, no GPUs, up to 4× Slingshot-11 NICs.

The workhorse when the workload doesn’t need accelerators.

---

## Takeaway

- **EX235a** — Trento + MI250X and coherent memory
- **EX255a** — MI300A APU density
- **EX425** — CPU-only

Cray EX — one platform, multiple blades, every workload.

---

## Closing

Drop in your images at the placeholders above and you have a complete medium-length article on Cray EX.

Ready for nerds, hospitals, and government.

**Image checklist (this article):**

1. Cray EX255a — blade internals  

---

*Source: Your Cray EX node materials. No invented specs.*
