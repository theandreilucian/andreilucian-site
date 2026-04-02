# Processors Module — Article 2: AMD MI325X, MI355X, MI430X

**Purpose:** One article for the Processors module. AMD CDNA 3 memory bump, CDNA 4 inference part, and next-gen HPC. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Article 1 covered MI250X, MI300A, and MI300X. This one picks up the next step: **MI325X** (CDNA 3, memory bump to match H200), **MI355X** (CDNA 4, inference-optimized), and **MI430X** (next-gen CDNA, HPC and FP64, HBM4).

Together they show the path from “more memory on the same compute” to “inference-first with FP6/FP4” to “next node with 432 GB HBM4.”

---

## AMD MI325X — CDNA 3, memory bump

**Date:** Oct 10, 2024. **Tag:** #GPU. **Production:** Expected Q4 2024.

MI325X is the **memory bump** to MI300X—same CDNA 3 compute (8 XCDs, 304 CUs), upgraded memory and power. Positioned for high-memory inference and training.

**[Image: AMD MI325X — product or block diagram. Insert your image.]**

**Per MI325X GPU:**

- **Compute:** Same as MI300X — 8 XCDs, **304 CUs**, 19,456 stream processors, 1,216 matrix cores; 2.1 GHz peak; **2:4 structured sparsity**
- **Memory:** **256 GB HBM3E** (8 stacks), **6 TB/s** max (up from MI300X’s 192 GB, 5.3 TB/s)
- **Interconnect:** 7× AMD Infinity Fabric (D2D), 1×16 **PCIe Gen5** (H2D)
- **Power:** **1000 W** max TBP (up from MI300X’s 750 W)

**Theoretical peak:** Launch advertised **1.3 PF FP16** and **2.6 PF FP8**—same as MI300X; the gain is capacity and bandwidth for larger models and longer contexts.

| Type | VFMA | Matrix | Sparse |
|------|------|--------|--------|
| FP64 | 81.7 | 163.4 | — |
| FP32 | 164.4 | 163.4 | — |
| TF32 | — | 653.7 | 1307.4 |
| FP16 | — | 1307.4 | 2614.9 |
| BF16 | — | 1307.4 | 2614.9 |
| FP8 | — | 2614.9 | 5229.8 |
| INT8 | — | 2614.9 | 5229.8 |

Use it when you’re already on CDNA 3 and need **more memory per GPU** without changing the rest of the stack.

---

## AMD MI355X — CDNA 4, inference-optimized

**Date:** Jun 19, 2025. **Tag:** #GPU.

MI355X is AMD’s first **CDNA 4** GPU. **Optimized for inferencing**: lower FP64 and FP32 than MI300X, but **higher 16-bit and 8-bit** performance, plus **FP6 and FP4** support. Low-precision performance is strong for inference; FP64 is high. Ships in **8-way OAM UBB**.

**[Image: AMD MI355X — product or block diagram. Insert your image.]**

**Per MI355X GPU:**

- **8 XCDs** — 32 CUs per XCD → **256 CUs**
- **16,384 stream processors**, **1,024 matrix cores**
- **Peak frequency:** **2.4 GHz**
- **Sparsity:** **2:4 structured sparsity**
- **Memory:** **288 GB HBM3e** (8 stacks), **8 TB/s** max
- **Interconnect:** 7× 153.6 GB/s AMD Infinity Fabric (D2D), 1×16 **PCIe Gen5** (H2D)
- **Power:** **1400 W** max

**Theoretical peak (TFLOPS):**

| Type | VFMA | Matrix | Sparse |
|------|------|--------|--------|
| FP64 | 78.6 | 78.6 | — |
| FP32 | 157.3 | 157.3 | — |
| TF32 | — | — | — |
| FP16 | — | 2516.6 | 5033.2 |
| BF16 | — | 2516.6 | 5033.2 |
| FP8 | — | 5033.2 | 10066.4 |
| FP6 | — | 10066.3 | 20132.6 |
| FP4 | — | 10066.3 | 20132.6 |
| INT8 | — | 5033.2 | 10066.4 |
| INT4 | — | 5033.2 | 10066.4 |

FP6 and FP4 are the new levers for **quantized and ultra–low-precision inference** at scale. For the Processors module, MI355X is the one to watch for **inference-first** deployments and for matching B200 on low-precision while keeping stronger FP64.

---

## AMD MI430X — Next-gen CDNA, HBM4, HPC

**Date:** Jan 08, 2026. **Tag:** #GPU.

MI430X is a **future** AMD GPU built on **next-generation AMD CDNA**, aimed at **HPC markets** with **hardware support for FP64**.

**[Image: AMD MI430X — product or block diagram. Insert your image.]**

**Headline specs:**

- **432 GB HBM4**
- **19.6 TB/s** memory bandwidth

That’s a major step up in capacity and bandwidth for very large models, long context, and memory-bound HPC. FP64 focus means it’s aimed at scientific simulation and double-precision workloads as well as AI.

Details on XCD count, CUs, matrix cores, and full TFLOPS will follow as AMD discloses. For now, the Processors module tracks it as the **next node**: HBM4 and 19.6 TB/s as the targets.

---

## Why these three matter

- **MI325X** — Same CDNA 3 compute as MI300X, **256 GB HBM3E** and **6 TB/s**. Use it when you need more memory and bandwidth per GPU without a full architecture change. Direct answer to H200.
- **MI355X** — **CDNA 4**, inference-optimized. Lower FP64/FP32, higher 16/8-bit, **FP6 and FP4**. 288 GB HBM3e, 8 TB/s, 1400 W. The part to compare to B200 for inference and for “same low-precision, better FP64.”
- **MI430X** — Next-gen CDNA, **432 GB HBM4**, **19.6 TB/s**. Placeholder for the next big jump in capacity and bandwidth and for HPC/FP64.

Together with Article 1 (MI250X, MI300A, MI300X), this gives the full arc from CDNA 2 through CDNA 4 and into the next node.

---

*Processors module — Article 2. AMD MI325X, MI355X, MI430X. Insert your images at the [Image: …] placeholders.*
