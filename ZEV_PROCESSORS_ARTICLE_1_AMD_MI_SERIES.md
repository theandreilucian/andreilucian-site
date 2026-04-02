# Processors Module — Article 1: AMD MI250X, MI300A, MI300X

**Purpose:** One article for the Processors module. AMD CDNA 2 and CDNA 3 GPUs and APU. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

The Processors module is where hardware meets the stack: GPUs and APUs that drive training and inference at scale.

This article covers three AMD parts that matter for HPC and AI: **MI250X** (CDNA 2), **MI300A** (APU), and **MI300X** (CDNA 3). Together they show the arc from dual-GCD CDNA 2 to unified CDNA 3 and to a CPU–GPU APU for integrated workloads.

---

## AMD MI250X — CDNA 2, dual-GCD

**Date:** Aug 11, 2024. **Tag:** #GPU.

MI250X is AMD’s high-end **CDNA 2** GPU.

**[Image: AMD MI250X — product or block diagram. Insert your image.]**

A single MI250X package is **two Graphics Compute Die (GCDs)** connected with **Infinity Fabric** on one **OAM** package. To the OS and the programmer it shows up as **two separate GPUs**.

**Per package:**

- **2 GCDs** — 110 CUs per GCD → **220 CUs** total  
- **14,080 stream processors** (64 per CU)  
- **880 matrix cores** (4 per CU) — the units that accelerate AI/ML matrix math  
- **Peak clock:** 1.7 GHz  
- **Sparsity:** No sparsity (dense-only in this summary)  
- **Memory:** **128 GB HBM2e** (8 stacks), **3.2 TB/s** max bandwidth  
- **Interconnect:** 8× AMD Infinity Fabric (D2D), 1×16 **PCIe Gen4** (H2D)  
- **Power:** 560 W max  

**Theoretical peak (TFLOPS):**

- **FP64:** VFMA 47.9, Matrix 95.7  
- **FP32:** VFMA 47.9, Matrix 95.7  
- **FP16 / BF16 / INT8 / INT4 (Matrix):** 383  

CDNA 2 and dual-GCD make MI250X a strong option for mixed HPC and AI when you need FP64 and high memory bandwidth without moving to the next node generation.

---

## AMD MI300A — APU (CPU + GPU)

**Date:** Nov 29, 2024. **Tags:** #GPU, #CPU.

MI300A is AMD’s **APU**: one tile of **Zen 4** CPU and three tiles of **CDNA 3** GPU on one package.

**[Image: AMD MI300A — product or block diagram. Insert your image.]**

Think of it as “replace 25% of an MI300X with a **Genoa** CPU.” You get integrated CPU and GPU in a single part for workloads that want both without a separate host CPU.

**CPU (per MI300A):**

- **24 Zen 4 cores** @ 3.7 GHz  

**GPU (per MI300A):**

- **6 XCDs** — 38 CUs per XCD → **228 CUs**  
- **14,592 stream processors**, **912 matrix cores**  
- **Peak frequency:** 2.1 GHz  
- **Sparsity:** **4:2 structured sparsity**  
- **Memory:** **128 GB HBM3** (8 stacks), **5.3 TB/s** max  
- **Interconnect:** 8×16 AMD Infinity Fabric, **PCIe Gen5**  
- **Power:** 760 W max  

**Theoretical peak (GPU, TFLOPS):**

- **FP64 (VFMA):** 61.3  
- **FP32 (VFMA):** 122.6  
- **TF32 / FP16 / BF16 / FP8 / INT8:** Matrix and Sparse (e.g. FP8/INT8 Sparse **3920**)  

APUs matter where you want **tight CPU–GPU coupling** and a single memory space—simulation plus inference, or orchestration and model run on the same socket. For hospitals and government, that can mean fewer nodes and simpler deployment.

---

## AMD MI300X — CDNA 3, 192 GB HBM3

**Date:** Jun 19, 2025. **Tag:** #GPU.

MI300X is AMD’s first GPU on **CDNA 3**. It’s the big-memory, high-FLOP part for frontier training and large-model inference.

**[Image: AMD MI300X — product or block diagram. Insert your image.]**

**Per MI300X GPU:**

- **8 XCDs** — 38 CUs per XCD → **304 CUs**  
- **19,456 stream processors**, **1,216 matrix cores**  
- **Peak frequency:** 2.1 GHz  
- **Sparsity:** **2:4 structured sparsity**  
- **Memory:** **192 GB HBM3** (8 stacks), **5.3 TB/s** max  
- **Interconnect:** 7×16 AMD Infinity Fabric (D2D), 1×16 **PCIe Gen5** (H2D)  
- **Power:** 750 W max (TBP)  

Note: it also has a **complex memory hierarchy** that we don’t yet fully summarize here.

**Theoretical peak (TFLOPS):**

| Type   | VFMA  | Matrix  | Sparse   |
|--------|-------|---------|----------|
| FP64   | 81.7  | 163.4   | —        |
| FP32   | 164.4 | 163.4   | —        |
| TF32   | —     | 653.7   | 1307.4   |
| FP16   | —     | 1307.4  | 2614.9   |
| BF16   | —     | 1307.4  | 2614.9   |
| FP8    | —     | 2614.9  | 5229.8   |
| INT8   | —     | 2614.9  | 5229.8   |

**Scale:** A single **8-way OAM MI300X UBB** can host a copy of **Llama 3.1 405B in FP16**. That’s a concrete target for “one chassis, one very large model.”

**Platforms (examples):**

- **Azure** ND MI300X v5  
- Dell PowerEdge XE9680  
- HPE Cray XD675  
- Lenovo SR685a V3  
- Supermicro AS 8125GS-TNMR2  

Plus cloud providers (e.g. Azure) selling MI300X capacity.

---

## Why this lineup matters

- **MI250X:** CDNA 2, dual-GCD, 128 GB HBM2e. Proven path for HPC and AI when you’re not yet on CDNA 3.  
- **MI300A:** APU. Zen 4 + CDNA 3 in one package. For integrated CPU–GPU workloads and simpler system design.  
- **MI300X:** CDNA 3, 192 GB HBM3, 1.2k+ matrix cores. For frontier training and hosting very large models (e.g. 405B in FP16) in a single 8-way group.  

Sparsity (2:4 and 4:2) and matrix-core counts are where AMD is pushing efficiency and peak TFLOPS for AI. For the Processors module, these three parts are the ones to know.

---

*Processors module — AMD MI250X, MI300A, MI300X. Insert your images at the [Image: …] placeholders.*
