# Zev — Cray: 1 Medium-Length X Thread

**Purpose:** Virality, inspiration, education. Same confident Zev voice. Audience: nerds, hospitals, government.  
**Format:** 1 thread. Medium length (~10–12 tweets). [Image: …] = attach your image with that tweet.

---

## Thread — Cray EX: Six Blades (EX154n, EX235a, EX235n, EX254n, EX255a, EX425)

1/ Cray EX: six blades that cover B200, GH200, AMD Trento/Milan, MI250X, MI300A, and CPU-only. EX154n, EX235a, EX235n, EX254n, EX255a, EX425. Here’s the map.

2/ **EX154n** — the B200 blade. One GB200 NVL4 board per blade: two Grace CPUs, four B200 GPUs. 100% liquid cooled, 1U chassis. 240 GB memory per Grace; 192 GB HBM3e per B200. Up to four Slingshot injection ports per blade; one local NVMe SSD per blade. Accelerated compute for ML and sovereign AI.

3/ [Image: Cray EX154n — internal. Upload your photo: liquid cooling (copper cold plates, blue tubes), NVL4 board, chassis.]

4/ Catch: a Cray EX rack tops out at 224 GPUs (56 blades), not 256 — power or cooling limit. EX154n is expected to ship by end of 2025.

5/ **EX235a** — Trento + MI250X. Two nodes per blade. Per node: 1× AMD Trento CPU, up to 512 GB DDR4, up to 2× NVMe SSDs, 4× AMD MI250X GPUs, up to 4× Slingshot-11 NICs. Trento has Infinity Fabric to the MI250X GPUs: HBM is cache coherent with CPU memory. Slingshot-11 NICs are on the GPUs’ PCIe ports, not the CPU’s.

6/ **EX235n** — Milan + A100. Two nodes per blade. Per node: 1× AMD Milan CPU, up to 512 GB DDR4, no node-local storage, 4× NVIDIA A100 GPUs on HGX baseboard, up to 4× Slingshot-11 NICs.

7/ **EX254n** — GH200 blade. Two nodes per blade. Per node: 4× GH200 superchips (1 Grace 72c + 1 Hopper H100 each). 128 GB LPDDR5X (HPE spec; Grace supports up to 480 GB). 4× Slingshot-11. No NVMe in the wild; HPE docs mention M.2 blade kit. Each GH200 = one NUMA domain. Used in Alps, Isambard-AI, KISTI-6.

8/ [Image: Cray EX254n or liquid-cooled blade. Upload your photo: GH200 blade internals or copper cold plates, white corrugated cooling tubes.]

9/ **EX255a** — MI300A APU blade. 2× 4-socket node cards (8 APUs per blade). 1× NVMe M.2 slot per node card (2 per blade). 4×–8× Slingshot-11 per node (8×–16× per blade). Rabbit chassis uses spare Slingshot ports for NVMe. High density of 200G Slingshot in the era of 400G NDR InfiniBand.

10/ [Image: Cray EX255a — blade internals. Upload your photo: node cards, copper heatsinks, blue/white/grey cabling.]

11/ **EX425** — CPU-only. Two nodes per blade. Per node: 2× AMD Rome or AMD Milan CPUs, up to 1024 GB DDR4 (8× DIMMs per socket, up to 64 GB/DIMM), no node-local storage, no GPUs, up to 4× Slingshot-11 NICs. The workhorse when the workload doesn’t need accelerators.

12/ Takeaway: EX154n for B200 and sovereign AI. EX235a for Trento + MI250X and coherent memory. EX235n for Milan + A100. EX254n for GH200 and Alps/Isambard. EX255a for MI300A APU density. EX425 for CPU-only. Cray EX — one platform, six blades, every workload.

---

## Image checklist (upload in order)

- **Tweet 3:** Cray EX154n — internal (liquid cooling, copper, blue tubes, NVL4).
- **Tweet 8:** Cray EX254n or liquid-cooled blade (GH200 internals or copper cold plates, white tubes).
- **Tweet 10:** Cray EX255a — blade internals (node cards, cabling).

**Source:** Your Cray EX materials (EX154n, EX235a, EX235n, EX254n, EX255a, EX425). No invented specs.
