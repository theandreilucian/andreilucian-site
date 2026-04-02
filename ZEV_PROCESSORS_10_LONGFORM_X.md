# Zev — 10 Long-Form X Posts (Processors Module)

**Source:** Glenn's Digital Garden — Processors module (AMD, Huawei Ascend, Google TPUv4, Intel Ponte Vecchio, Microsoft Maia).  
**Voice:** Short, confident, specific. Technical clarity over hype. Serious. Audience: nerds.  
**Format:** 10 long threads. Bullet lists for all features and specs. Numbered tweets (1/ 2/ 3/ …). All content from provided processor docs; no invented facts.

---

## PR1. AMD MI250X — CDNA 2, dual-GCD

1/ AMD MI250X is AMD's high-end CDNA 2 GPU. One package, two GCDs; to the OS and programmer it appears as two separate GPUs. Specs below are for a single MI250X package.

2/ Core structure — features:
• 2 GCDs (Graphics Compute Die) connected via Infinity Fabric on a single OAM package
• 220 CUs total (110 CUs per GCD)
• 14,080 Stream Processors (64 per CU)
• 880 Matrix Cores (4 per CU)

3/ Clock, sparsity, memory:
• 1.7 GHz peak clock
• No sparsity
• 128 GB HBM2e across 8 stacks
• 3.2 TB/s maximum memory bandwidth

4/ Interconnect & power:
• 8× AMD Infinity Fabric (Die-to-Die, D2D) links
• 1×16 PCIe Gen4 (Host-to-Device, H2D)
• 560 W maximum

5/ Theoretical max performance (TFLOPS):
• FP64: VFMA 47.9, Matrix 95.7
• FP32: VFMA 47.9, Matrix 95.7
• FP16: Matrix 383
• BF16: Matrix 383
• INT8: Matrix 383
• INT4: Matrix 383
Source: Processors module, AMD MI250X.

---

## PR2. AMD MI300A — APU (Zen 4 + CDNA 3)

1/ AMD MI300A is AMD's APU: one Zen 4 (CPU) tile plus three CDNA 3 (GPU) tiles. Optimized for workloads that want CPU and GPU in one package. Released Nov 2024.

2/ CPU — each MI300A CPU has:
• 24 Zen 4 cores
• 3.7 GHz clock speed

3/ GPU — each MI300A GPU has:
• 6 XCDs (38 CUs per XCD → 228 CUs total)
• 14,592 Stream Processors (64 per CU)
• 912 Matrix Cores (4 per CU)
• 2.1 GHz peak clock
• 4:2 structured sparsity

4/ Memory, interconnect, power:
• 128 GB HBM3 (8 stacks)
• 5.3 TB/s max memory bandwidth
• 8×16 AMD Infinity Fabric
• PCIe Gen5
• 760 W maximum

5/ Performance (theoretical max TFLOPS):
• FP64: VFMA 61.3
• FP32: VFMA 122.6
• TF32: VFMA 490.3, Matrix 980.6, Sparse 980.6
• FP16/BF16: 980.6 / 1960 / 1960
• FP8: 1960 / 3920 / 3920
• INT8: 1960 / 3920 / 3920

6/ Platforms:
• HPE Cray EX255a
• NEC LX 401Bax-3GA
• Eviden BullSequana XH3406-3
Source: Processors module, AMD MI300A.

---

## PR3. AMD MI300X — CDNA 3, 192 GB HBM3

1/ AMD MI300X is AMD's first GPU on CDNA 3. Built for large models: a single 8-way OAM MI300X UBB can host a copy of Llama 3.1 405B in FP16.

2/ Specifications — each MI300X GPU has:
• 8 XCDs (304 CUs total, 38 CUs per XCD)
• 19,456 Stream Processors (64 per CU)
• 1,216 Matrix Cores (4 per CU)
• 2.1 GHz peak clock
• 2:4 structured sparsity

3/ Memory and interconnect:
• 192 GB HBM3 (8 stacks)
• 5.3 TB/s max memory bandwidth
• 7×16 AMD Infinity Fabric (D2D)
• 1×16 PCIe Gen5 (H2D)
• 750 W maximum (TBP)

4/ Performance (theoretical max TFLOPS):
• FP64: VFMA 81.7, Matrix 163.4
• FP32: VFMA 164.4, Matrix 163.4
• TF32: 653.7 / 1307.4 / 1307.4
• FP16/BF16: 1307.4 / 2614.9 / 2614.9
• FP8: 2614.9 / 5229.8 / 5229.8
• INT8: 2614.9 / 5229.8 / 5229.8

5/ Platforms & cloud:
• Azure ND MI300X v5
• Dell PowerEdge XE9680, HPE Cray XD675, Lenovo SR685a V3, Supermicro AS 8125GS-TNMR2
• Vultr (cloud)
Source: Processors module, AMD MI300X.

---

## PR4. AMD MI325X — Memory bump to MI300X

1/ AMD MI325X is the memory bump to MI300X (like H200 to H100). Same compute subsystem as MI300X; memory and power step up. Launched Oct 2024; in production 4Q2024. Positioned against H200.

2/ Specifications — each MI325X GPU has:
• 8 XCDs (compute identical to MI300X)
• 304 CUs, 19,456 Stream Processors, 1,216 Matrix Cores
• 2.1 GHz peak, 2:4 structured sparsity
• 256 GB HBM3E (8 stacks)
• 6 TB/s max memory bandwidth
• 7× AMD Infinity Fabric (D2D), 1× PCIe Gen5 (H2D)
• 1000 W maximum (TBP) — up from MI300X 750 W

3/ Takeaway:
• XCDs and below match MI300X; memory subsystem upgraded to HBM3E
• 1000 W TBP instead of 750 W
• FP16/FP8 advertised performance in line with MI300X (e.g. 1.3 PF FP16, 2.6 PF FP8)
Source: Processors module, AMD MI325X.

---

## PR5. AMD MI355X — CDNA 4, inferencing

1/ AMD MI355X is built on CDNA 4. Lower FP64 and FP32 than MI300X; significantly higher 16-bit and 8-bit performance. Adds FP6 and FP4. Optimized for inferencing. Ships in 8-way OAM UBB.

2/ Specifications — each MI355X GPU has:
• 8 XCDs (256 CUs, 32 per XCD)
• 16,384 Stream Processors (64 per CU)
• 1,024 Matrix Cores (4 per CU)
• 2.4 GHz peak clock
• 2:4 structured sparsity
• 288 GB HBM3e (8 stacks), up to 8 TB/s max bandwidth
• 7× 153.6 GB/s AMD Infinity Fabric (D2D)
• 1× PCIe Gen5 x16 (H2D)
• 1400 W maximum

3/ Performance (theoretical max TFLOPS):
• FP64: 78.6 (VFMA and Matrix)
• FP32: 157.3
• FP16/BF16: Matrix 2516.6, Sparse 5033.2
• FP8: Matrix 5033.2, Sparse 10066.4
• FP6/FP4: 10066.3 / 20132.6
• INT8/INT4: 5033.2 / 10066.4
Low-precision performance comparable to B200; FP64 much higher than B200. Source: Processors module, AMD MI355X.

---

## PR6. AMD MI430X — Next-gen CDNA, HPC

1/ AMD MI430X is an AMD GPU built on next-generation AMD CDNA. Aimed at HPC markets with hardware support for FP64.

2/ Features:
• Hardware support for FP64 (double-precision)
• 432 GB HBM4
• 19.6 TB/s bandwidth
• Target: HPC workloads where FP64 and memory capacity/bandwidth matter

3/ Context: Forward-looking product (doc date Jan 2026). When you need maximum memory and bandwidth in the AMD roadmap, MI430X is the HPC-oriented option. Source: Processors module, AMD MI430X.

---

## PR7. Huawei Ascend 910, 910C, CloudMatrix 384

1/ Ascend is a series of AI accelerators developed by Huawei. Three pieces: Ascend 910 (original), Ascend 910C (upgrade), CloudMatrix 384 (scale-up).

2/ Ascend 910 — features:
• Original version; chiplets fabbed by TSMC on N7+ (7 nm class with EUV)
• Built from chiplets

3/ Ascend 910C — features:
• Upgrade of the 910; compute chiplets manufactured by SMIC on 2nd-gen 7 nm class process (N+2)
• SoC has around 53 billion transistors

4/ CloudMatrix 384 — features:
• Scale-up version of Ascend 910C; competes against GB200 NVL72
• 384 Ascend 910C accelerators in a single scale-up domain
• Cost: $8.2 million

5/ Takeaway: 910 = TSMC N7+; 910C = SMIC N+2, 53B transistors; CloudMatrix 384 = 384× 910C in one domain for large-scale AI. Source: Processors module, Huawei Ascend.

---

## PR8. Google TPUv4 — Processor, ICI, tray, cube, OCS

1/ Google TPUv4: processor, ICI, tray, cube, and how jobs get a reconfigurable torus. No sparsity; dense matrix focus.

2/ Processor — each TPUv4 has:
• 2 TensorCores (Google’s); 8 MMUs (2 per TensorCore), 2 vector units, 2 scalar units
• 32 GB HBM2 (~7 stacks), 1.2 TB/s max HBM bandwidth
• x16 PCIe Gen5
• 192 W maximum

3/ ICI (Inter-Chip Interconnect):
• Proprietary inter-chip interconnect; RDMA over P2P PCIe with full host bypass
• 480G bandwidth each direction
• Reliable data layer, in-order delivery, link-level credit-based flow control

4/ Tray and cube:
• One tray = 4 processors in a 2×2 ICI mesh
• One cube = 16 trays (64 TPUs) in one rack; 4×4×4 mesh
• All TPUs in a cube share an OCS (Optical Circuit Switch) connecting to other cubes
• 64-TPU cube = minimum granularity of reconfigurability

5/ Supercomputer and job scheduling:
• 64 cubes → pod of 4,096 TPUs; 6,144 optical ICI links, 48 OCS switches
• OCS reconfigures torus for a job (ten seconds); job specifies topology (4x, 4y, 4z) and cell
• Borg schedules jobs; Pod Manager reconfigures OCS so jobs land on a tight torus and avoid fragmentation
Source: Processors module, Google TPUv4.

---

## PR9. Intel Ponte Vecchio — Max 1000 and 1550

1/ Intel Ponte Vecchio ships as two SKUs: Intel Data Center GPU Max 1000 (56 Xe Cores) and Intel Data Center GPU Max 1550 (128 Xe Cores). Specs below for the 1550.

2/ Specifications — each Max 1550 has:
• 2 Xe Stacks
• 128 Xe-Cores (64 per stack)
• 1,024 Xe Vector Engines (8 per Xe-Core)
• 1,024 Xe Matrix Engines (8 per Xe-Core)
• 900 MHz base, 1.6 GHz peak
• No sparsity
• 128 GB HBM2e, 2.27 TB/s
• 16 Xe-Links (DDI); 1×16 PCIe Gen5 or CXL 1.1 (DDI)
• 600 W maximum

3/ Nomenclature:
• 1 GPU = 2 stacks
• 1 stack = 4 slices + 4 HBM2e controllers + 8 Xe Links
• 1 slice = 16 cores; 1 core = 8 vector + 8 matrix engines
• 1 vector engine = 512 bits; 1 matrix engine = 4096 bits
(Stacks were “tiles”; Vector Engines were “EUs.”)

4/ Performance (measured, preproduction Aurora / DGEBM):
• FP64: 17 (VFMA); FP32: 23; TF32: 110; FP16: 263; BF16: 273; INT8: 577
Source: Processors module, Intel Ponte Vecchio.

---

## PR10. Microsoft Maia 100 and Maia 200

1/ Maia (Microsoft Artificial Intelligence Accelerator) is Microsoft’s first-generation AI accelerator. Maia 200 is the second gen, optimized for high-volume AI inference and token generation in Azure; fabricated on TSMC 3 nm.

2/ Maia 100 — features:
• 16 clusters = 64 tiles; tensor unit 16×Rx16; L1 and L2 scratchpads
• Supports low-precision MX formats (4-bit, 6-bit, 9-bit, FP32, BF16)
• 64 GB HBM2e (4 stacks), 1.8 TB/s bandwidth
• 12× 400 GbE ports per chip (3×400G to three other Maia chips per node; 3×400G to T0 switch layer)
• Ethernet for intra- and inter-node interconnect; 4800 Gbps AllGather/Scatter-Reduce, 1200 Gbps Alltoall
• 105 billion transistors, 820 mm² reticle-limited die; TSMC N5
• 500 W (capable up to 700 W)

3/ Maia 200 — features:
• 1408 (or 140B) transistors on TSMC 3 nm
• Matrix engine: FP8/FP6/FP4; vector engine: BF16/FP16/FP32
• 216 GB HBM3e (6× 36 GB 12-high stacks), 7 TB/s
• 272 MB on-die SRAM (CSRAM + TSRAM)
• On-die NIC: Ethernet; 1.4+1.4 TB/s bidirectional per accelerator
• Scale: up to 6,144 accelerators for collectives
• 750 W SoC TDP

4/ Maia 200 architecture (short):
• Tile: TTU (matrix multiply/conv, FP8/FP6/FP4), TVP (SIMD, FP8/BF16/FP16/FP32), TSRAM, Tile DMA, TCP
• Cluster: multiple tiles, CSRAM, Cluster DMA, cluster core; redundancy for yield
• Node/tray: four accelerators, one FCQ; direct non-switched links
• Network: scales to 6,144 accelerators in two-tier topology; ATL protocol; packet spraying; 2.8 TB/s bidirectional per accelerator

5/ Performance (Maia 200):
• Peak FP4: >10 PFLOPS (10.1 PetaOPS); Peak FP8: >5 PFLOPS
• Designed for low-precision inference throughput in 750 W TDP
Source: Processors module, Microsoft Maia 100, Maia 200.

---

*Content file: `ZEV_PROCESSORS_10_LONGFORM_X.md`. Sources: `ZEV_PROCESSORS_10_SOURCES.md`. Spec: `ZEV_CONTENT_SPEC.md`.*
