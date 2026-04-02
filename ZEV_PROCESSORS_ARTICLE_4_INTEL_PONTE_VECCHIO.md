# Processors Module — Article 4: Intel Ponte Vecchio (Data Center GPU Max)

**Purpose:** One article for the Processors module. Intel Ponte Vecchio — Data Center GPU Max 1100 and Max 1550. Place your images where you see **[Image: …]**.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

---

## Introduction

Article 3 covered Huawei Ascend and Google TPUv4. This one covers **Intel Ponte Vecchio** — the Data Center GPU Max family. Two SKUs, a clear nomenclature (GPU → stack → slice → core → engines), and performance measured on **Aurora** (ALCF) preproduction hardware.

---

## SKUs

**Intel Data Center GPU Max 1100** — **56 Xe Cores**.

**Intel Data Center GPU Max 1550** — **128 Xe Cores**. The specifications and performance below focus on this model.

---

## Specifications — Max 1550

**Date:** Aug 18, 2024. **Tag:** #GPU.

**[Image: Intel Ponte Vecchio / Data Center GPU Max 1550 — product or block diagram. Insert your image.]**

**Per GPU (Max 1550):**

- **3D stacks** — Ponte Vecchio uses 3D packaging.
- **128 Xe Cores** per stack.
  - Each **Xe-Core** has:
    - **8 Xe Vector Engines** → **1,024** Xe Vector Engines total
    - **8 Xe Matrix Engines** → **1,024** Xe Matrix Engines total
- **Clock:** **900 MHz** base, **1.6 GHz** peak
- **Sparsity:** No sparsity
- **Memory:** **128 GB HBM2e**, **2.2768 TB/s** max bandwidth
- **Interconnect:** **36 Xe Links** (BoD); **x16 PCIe Gen5** or **CXL 1.1** (BoD)
- **Power:** **600 W** max

---

## Nomenclature

Intel’s terminology can be confusing. Clarification:

- **1 GPU** = 2 stacks
- **1 stack** = 4 slices + HBM2e controllers + Xe Links
- **1 slice** = 16 cores
- **1 core** = 8 vector engines + 8 matrix engines
- **1 vector engine** = 512 bits
- **1 matrix engine** = 4096 bits

**Historical terms:** “Stacks” were formerly called “tiles.” “Vector Engines” were formerly called “execution units (EUs).”

---

## Performance

Performance values are **measured** from **preproduction** models on **Aurora** (Argonne Leadership Computing Facility), using **DGMlib**. There is some ambiguity in how much of the workload is vector FMA versus matrix operations, especially for the Xe Matrix Engines.

**Theoretical peak (illustrative):**

- **Vector FMA (FP64 equivalent):** 1,024 Vector Engines × (512 bits / 64 bits) × 900 MHz × 2 ops/clock ≈ **14.7 TFLOPS**
- **Matrix:** 1,024 Matrix Engines × 4096 bits × (1 / [cycle factor]) × 1600 MHz × 2 ops/clock → on the order of **~210 TFLOPS** (exact formula and cycle factor depend on Intel’s published spec). The **measured 17 TFLOPS** (FP64, below) is closer to the vector FMA peak (14.7) than to the matrix peak, suggesting the benchmark is largely vector FMA–bound or running at a different clock.

**Theoretical maximum TFLOPS (VFMA column from measurements):**

| Data Type | VFMA | Matrix | Sparse |
|-----------|------|--------|--------|
| FP64      | 17   | —      | —      |
| FP32      | 23   | —      | —      |
| TF32      | 110  | —      | —      |
| FP16      | 263  | —      | —      |
| BF16      | 273  | —      | —      |
| FP8       | —    | —      | —      |
| INT32     | —    | —      | —      |
| INT8      | 577  | —      | —      |

Matrix and Sparse columns are not filled in this summary; refer to Intel and Aurora documentation for matrix and sparse peaks if published.

---

## Why Ponte Vecchio matters

- **Intel in the data center GPU stack** — Max 1100 (56 Xe Cores) and Max 1550 (128 Xe Cores) are Intel’s entry for HPC and AI. **Aurora** at ALCF is the flagship deployment.
- **Nomenclature** — GPU = 2 stacks; stack = 4 slices + HBM + Xe Links; slice = 16 cores; core = 8 vector + 8 matrix engines. Knowing this avoids confusion with “tiles” and “EUs.”
- **Memory and power** — 128 GB HBM2e, 2.28 TB/s, 600 W. No sparsity; 3D packaging and Xe Links for scale-out.
- **Measured vs theoretical** — The VFMA numbers above are from preproduction Aurora hardware and DGMlib; theoretical vector peak is ~14.7 TFLOPS (FP64) at base clock. Matrix engines have much higher theoretical peak; real workloads may sit between vector and matrix depending on kernel mix.

For the Processors module, Ponte Vecchio is the reference for **Intel data center GPU** and for **Aurora**-class nodes.

---

*Processors module — Article 4. Intel Ponte Vecchio (Data Center GPU Max 1100 / Max 1550). Insert your image at the [Image: …] placeholder.*
