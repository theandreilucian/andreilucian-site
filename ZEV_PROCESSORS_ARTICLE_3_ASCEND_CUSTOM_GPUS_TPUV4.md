# Processors Module — Article 3: Huawei Ascend, Google TPUv4

**Purpose:** One article for the Processors module. Huawei Ascend and Google TPUv4. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Articles 1 and 2 covered the AMD MI lineup. This one covers **Huawei Ascend** (910, 910C, CloudMatrix 384) and **Google TPUv4**—processor, ICI, trays, cubes, and reconfigurable superpods.

---

## Huawei Ascend — 910, 910C, CloudMatrix 384

**Date:** May 02, 2025. **Tags:** #artificial-intelligence, #GPU.

**Ascend** is a series of AI accelerators developed by Huawei.

**[Image: Huawei Ascend — product or block diagram. Insert your image.]**

**Ascend 910** — Original version. Chiplets fabbed by **TSMC** on the **N7+** process (7 nm class with EUV).

**Ascend 910C** — Upgrade of the 910. Compute chiplets manufactured by **SMIC** on its 2nd generation 7 nm–class process (**N+2**). The SoC has around **53 billion transistors**.

**CloudMatrix 384** — Scale-up version of the Ascend 910C. Incorporates **384 Ascend 910C** accelerators in a single scale-up domain. Estimated cost **$8.2 million**.

For the Processors module, Ascend matters as the non–US, non-AMD alternative in the frontier AI accelerator space and as a reference for custom memory and scale-up packaging (CloudMatrix 384).

---

## Google TPUv4 — Processor, ICI, trays, cubes, supercomputer

**Date:** Apr 11, 2025. **Tag:** #GPU.

See Google’s TPUv4 documentation for the canonical spec. Summary below.

**[Image: Google TPUv4 — processor, tray, or cube diagram. Insert your image if available.]**

### Processor

Each **TPUv4 processor** has:

- **2 TensorCores** (Google’s terminology; distinct from NVIDIA’s)
- **8 MXUs** (2 per TensorCore)
- **2 vector units** (1 per TensorCore)
- **2 scalar units** (1 per TensorCore)
- **No sparsity**
- **32 GB HBM2** (4? stacks), **1.2 TB/s** max
- **x16 PCIe Gen3**
- **192 W** maximum

### ICI (Inter-Chip Interconnect)

**ICI** is a **proprietary inter-chip interconnect** that enables **RDMA over P2P PCIe** with **full host bypass**. It is how TPUs talk to each other and provides **400G bandwidth in each direction**. It uses a **reliable data layer** with in-order delivery and link-level credit-based flow control.

### Tray

A single **TPU tray** has **4 processors** arranged in a **2×2×1 ICI mesh**.

### Cube

A **cube** has **16 trays** (**64 TPUs**) in a single physical rack. The cube is a **4×4×4 mesh** of TPUs; they share an **OCS** (optical circuit switch) that connects to other cubes. Each x/y/z face of the cube has **16 ICIs** to other cubes. Because each cube is tied to an OCS, this **4×4×4 cube** is the **minimum granularity of reconfigurability** within a TPU cluster.

### Supercomputer (SuperPod)

**64 cubes** are assembled into a **pod** of **4,096 processors** with **6,144 optical ICI links** and **48 OCS switches**.

**Optical circuit switches (OCS)** are used to connect (“xconnect”) multiple cubes to form a **job-specific torus** within a SuperPod. That grouping of cubes is called a **slice**. OCS is new on TPUv4 (not on TPUv3); Google uses **Palomar** OCS technology. **Reconfiguring the torus via OCS takes ten seconds.**

### Cells and job scheduling

Multiple TPUv4 supercomputers may share a single **Borg cell**. Jobs are scheduled using **Borg**; Borg sends commands to a SuperPod’s **Pod Manager** to reconfigure the OCS switches. The ICI is reconfigured so a job lands on a **tight torus topology** carved out of the larger 4×4×4 physical torus via optical switching. That avoids **job fragmentation** common on other low-radix networks. OCS reconfiguration takes **ten seconds**. Job specification must include a requested topology in **(4x, 4y, 4z)** format and a cell.

### Performance (theoretical max TFLOPS)

| Data Type | VFMA | Matrix | Sparse |
|-----------|------|--------|--------|
| FP64      | —    | —      | —      |
| FP32      | —    | —      | —      |
| TF32      | —    | —      | —      |
| FP16      | —    | —      | —      |
| BF16      | —    | 275    | —      |
| FP8       | —    | —      | —      |
| INT32     | —    | —      | —      |
| INT8      | —    | 275    | —      |

(Other rows may be documented in Google’s TPUv4 docs.)

### Legacy TPU

- **TPUv3** — Pods had **1,024 TPUs** in a **static 32×32** ICI torus; could be combined into a 128×32 mesh with “limited ICI routing capability” at largest scale.
- **TPUv2** — Pods had **256 TPUs** in a **static 16×16** ICI torus.

TPUv4’s differentiator is **reconfigurable topology via OCS** (10 s) and **slice**-based job placement, so the physical 4×4×4 cube layout can be logically reassigned per job.

---

## Why these matter

- **Huawei Ascend** — Non–US, non-AMD frontier accelerator track; 910C on SMIC N+2; CloudMatrix 384 as a scale-up answer to GB200 NVL72 and a reference for 384-accelerator domains and cost (~$8.2M).
- **Custom A100/H100** — Show that **memory capacity** and **TDP** are negotiable for large buyers (European HPC, Meta). Standard SKUs are not the only option.
- **Google TPUv4** — Different stack: TensorCores/MXUs, 32 GB HBM2 per processor, **ICI** (400G, RDMA, host bypass), **OCS** and **slices** for reconfigurable torus in **10 seconds**. 4,096 processors per pod; topology requested as (4x, 4y, 4z). For the Processors module, TPUv4 is the reference for “reconfigurable optical interconnect” and job-specific topology at scale.

---

*Processors module — Article 3. Huawei Ascend, Custom A100/H100, Google TPUv4. Insert your images at the [Image: …] placeholders.*
