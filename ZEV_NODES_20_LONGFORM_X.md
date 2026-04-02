# Zev — 20 Long-Form X Posts (Nodes Module)

**Source:** Glenn's Digital Garden — Nodes module only.  
**Voice:** Short, confident, specific. Technical clarity over hype. Serious. Audience: nerds.  
**Format:** Numbered threads for X. One tweet per line (1/, 2/, 3/...). Each tweet under 280 characters. Copy-paste one block per tweet. All content derived from the garden; no invented facts.

---

## N1. Azure ND A100 v4 — Microsoft's eight-way A100 node

1/ 8 GPUs. One node. Two choices. Azure ND A100 v4 is Microsoft's eight-way A100 VM — pick by memory, not just compute.

2/ ND A100 v4: Standard_ND96asr_A100_v4. 40 GB HBM per GPU. Eight A100s, one chassis. Same compute density; lower memory bill.

3/ NDm A100 v4: Standard_ND96amsr_A100_v4. 80 GB HBM per GPU. Same eight-way layout, double the HBM. For large models where 40 GB isn't enough.

4/ Why two SKUs? Cost and capacity. The 40 GB variant = same density for less. The 80 GB variant = fewer recomputes, bigger caches.

5/ One chassis, eight A100 modules, two rows of GPUs, high-speed links, host for CPU and NICs. Reference eight-way A100 design.

6/ In Azure: "ND" = NVIDIA-accelerated. "NDm" = same family, more memory per GPU. Both are real options for AI and HPC at eight-way scale.

**Source:** Azure ND A100 v4. Nodes module, glennklockwood.com/garden.

---

## N2. Azure ND GB200 v6 — Grace Blackwell in the cloud

1/ 72 GPUs. One NVLink domain. That's the number. Microsoft's ND GB200 v6 is the Grace–Blackwell stack in Azure.

2/ Each physical server: 2× GB200 Superchips. Each superchip = 1 Grace CPU + 2 Blackwell GPUs, NVLink C2C for coherence.

3/ So per server: 2 Grace CPUs, 4 Blackwell GPUs, cache-coherent across the pair. The node scales up to 72 GPUs in a single NVLink domain.

4/ One domain = GPUs talk at full bandwidth without the host. For large-model training, that's the difference between scaling and hitting a wall.

5/ Scale-out: InfiniBand. Tight coupling inside the box; high-bandwidth, low-latency links to other nodes. NVLink in, InfiniBand out.

6/ GB200 = Arm CPU + Blackwell GPUs, built for AI. Azure gives you that stack in the cloud. When you size jobs, watch the 72-GPU NVLink domain.

**Source:** Azure ND GB200 v6. Nodes module, glennklockwood.com/garden.

---

## N3. Azure ND H100 v5 — Full spec

1/ DGX-class in the cloud. ND H100 v5 is Microsoft's eight-way H100 VM — DGX H100–style, Intel Sapphire Rapids host.

2/ One VM: 96 cores (2× 56-core Sapphire Rapids). 1,900 GiB DDR5. 28,000 GiB local NVMe (8× drives). Checkpoints, datasets, scratch.

3/ 1× 80G Ethernet (100G Azure SmartNIC). 8× 400G NDR InfiniBand — ConnectX 7, one per GPU. Scale-out for multi-node training and collectives.

4/ 8× NVIDIA H100 on HGX baseboard, NVLink between them. The main compute.

5/ From the top: eight H100 heatsinks, NVMe below, HGX and NVLink switches at the far end. Dense GPU compute, 28 TB local SSD, 400G InfiniBand.

**Source:** Azure ND H100 v5. Nodes module, glennklockwood.com/garden.

---

## N4. ND H100 v5 — Rear: IO, SmartNIC, InfiniBand, storage, power

1/ What's on the back of an eight-way H100 node. The rear is where the ND H100 v5 talks to the world: storage, fabric, power.

2/ Far end: intake fans. Behind them: HGX baseboard, eight tall heatsinks. Under the grab bar: NVLink switches. GPU + NVLink side.

3/ Storage: E1.S SSD carriers. Multiple bays, hot-swap. That's your 28,000 GiB local NVMe. Dense, serviceable.

4/ Networking: 1× RJ45 (out-of-band). 4× OSFP = 8× NDR InfiniBand (8× 400G). 2-port Azure SmartNIC + 1-port Ethernet for host.

5/ Power: 6× power supplies. Redundancy and headroom. Same node class as Eagle. The rear view = IO and power in one glance.

**Source:** Azure ND H100 v5 (rear / Eagle). Nodes module, glennklockwood.com/garden.

---

## N5. Azure ND MI200 v4 — Eight-way MI250X and Explorer

1/ Top500 #11. Same node. ND MI200 v4 = Microsoft's eight-way MI250X node. Explorer, Microsoft's AMD-based supercomputer, was built from it.

2/ Explorer landed #11 on the June 2023 Top500. So the node is real, at scale.

3/ One chassis, eight MI250X modules, heatsinks, interconnects. MI250X = AMD's dual-GPU card; eight in one node = serious FP64 and matrix for HPC and AI.

4/ Explorer proved Microsoft could field a big AMD GPU system and compete on the list. ND MI200 v4 is the building block.

5/ Azure has A100, H100, MI200, GB200 nodes. MI200 v4 is the AMD chapter.

**Source:** Azure ND MI200 v4. Nodes module, glennklockwood.com/garden.

---

## N6. BullSequana AI1242 — AMD MI355X for the XH3500 platform

1/ 2.3 TB HBM3e. 8 GPUs. Your fabric, your choice. Eviden's BullSequana AI1242 is the MI355X node for the XH3500 platform.

2/ 2× AMD 9005 (host). 8× MI355X in OAM — dense, liquid cooling, high power. 2.3 TB HBM3e total. 24× DDR5 RDIMMs.

3/ Up to 10× NICs: BXI v3, NDR InfiniBand, or Ethernet. You pick the fabric. Up to 4× NVMe for checkpoints and datasets.

4/ At SC25: eight MI355X modules, copper heatsinks or cold plates. Compute, memory, storage, fabric — all in one node.

5/ AI1242 = MI355X in the BullSequana lineup. GPU density + HBM3e + flexible fabric.

**Source:** BullSequana AI1242. Nodes module, glennklockwood.com/garden.

---

## N7. BullSequana XH3406-3 — Eviden's MI300A blade

1/ CPU + GPU in one package. Four per blade. BullSequana XH3406-3 = Eviden's MI300A blade. AMD Instinct MI300A = APU: one package, CPU and GPU.

2/ No discrete wiring; one part, better coherence between host and accelerator.

3/ On the blade: four MI300A modules, thick black cabling (APU-to-APU). Power, cooling, chassis connectors.

4/ AMD's "one package, CPU + GPU" play. For tight coupling and unified memory, the APU can beat separate CPU + GPU.

5/ XH3406-3 when you want MI300A in a Cray-style platform. One blade, four APUs, interconnect and cooling included.

**Source:** BullSequana XH3406-3. Nodes module, glennklockwood.com/garden.

---

## N8. What's in a node — CPUs, accelerators, and the backplane

1/ One slide-in unit. Six things that define it. A node = one unit of compute that goes into a chassis or rack.

2/ Host compute: 1–2+ CPU sockets (LGA). OS, drivers, non-accelerator work. Accelerator compute: GPUs, APUs — same board or HGX. Trend: 4–8 GPUs, NVLink or Infinity Fabric.

3/ Memory: DDR for host, HBM for GPUs. Storage: E1.S, NVMe, M.2 — or none. No local = boot from network and shared storage.

4/ Networking: NICs on CPU PCIe or on GPU (e.g. Slingshot on GPU in EX235a). Who talks to the fabric, and how.

5/ Edge: blade plugs into backplane. Power, management, fabric. The "node" is what you slide in; the chassis gives power, cooling, network.

6/ When you compare nodes across vendors, you're comparing those six: CPUs, accelerators, memory, storage, fabric, and how it plugs in.

**Source:** Nodes module (general). Glenn's Digital Garden, glennklockwood.com/garden.

---

## N9. BullSequana XH3515 — GH200 blade for JUPITER

1/ JUPITER Booster = this blade. BullSequana XH3515 = GH200 blade. It's what goes into JUPITER. Two compute nodes per blade.

2/ Per node: 4× GH200 (Grace CPU + Hopper H100 per superchip, coherent memory). 480 GB LPDDR5 (Grace side). 360 GB HBM (Hopper side).

3/ 4× NDR200 InfiniBand — Quantum-2, 200 Gbit per GH200. One InfiniBand port per superchip for scale-out.

4/ Layout: GH200 modules, blue InfiniBand cabling. Two nodes per blade, four GH200s per node. Dense Grace–Hopper, clear fabric.

5/ JUPITER = flagship European exascale. XH3515 delivers the GH200 piece. "JUPITER Booster" = this blade in the rack.

**Source:** BullSequana XH3515. Nodes module, glennklockwood.com/garden.

---

## N10. Cray EX154n — B200 NVL4 blade, liquid cooled

1/ 192 GB HBM3e per GPU. 100% liquid cooled. 1U. Cray EX154n = B200 blade for Cray EX. One GB200 NVL4 board: 2 Grace + 4 B200 GPUs.

2/ NVL4 layout. NVLink (or equivalent) between B200s and Grace for coherence. 100% liquid cooled in 1U — copper cold plates, blue coolant.

3/ Specs: 2× Grace (240 GB per processor). 4× Blackwell (192 GB HBM3e per GPU). Up to 4× Slingshot per blade. 1× local NVMe per blade.

4/ Grace + B200, 192 GB per GPU, Slingshot. Accelerated compute for ML and sovereign AI.

5/ Catch: A Cray EX rack = 224 GPUs (56 blades), not 256. Power or cooling limit at the rack. Expected to ship by end of 2025.

**Source:** Cray EX154n. Nodes module, glennklockwood.com/garden.

---

## N11. Cray EX235a — Trento, MI250X, and GPU-attached Slingshot

1/ Two things that make this blade different. Cray EX235a: AMD Trento + 4× MI250X per node. Two nodes per blade. Up to 512 GB DDR4, up to 2 NVMe, up to 4 Slingshot-11 per node.

2/ 1. Coherent memory. Trento = modified Milan with Infinity Fabric to the MI250X. GPUs' HBM is cache coherent with CPU memory. One coherence domain.

3/ 2. NICs on the GPU. Slingshot-11 is on the GPUs' PCIe ports, not the CPU's. GPUs talk to the fabric directly. CPU out of the path for GPU–GPU and GPU–network.

4/ For training, that's where the NIC belongs. Lower latency; no CPU bottleneck for fabric traffic.

5/ Summary: Trento + 4× MI250X + coherent memory + GPU-attached Slingshot. AMD alternative in the same platform — same chassis, same Slingshot, different topology.

**Source:** Cray EX235a. Nodes module, glennklockwood.com/garden.

---

## N12. Cray EX235n — Milan and four A100s on HGX

1/ 1 Milan. 4 A100s. No local disk. Cray EX235n = Milan + 4× A100 per node. Two nodes per blade.

2/ Per node: 1 Milan, up to 512 GB DDR4, no local storage, 4 A100s on HGX, up to 4 Slingshot-11. A100s on HGX = standard NVLink packaging.

3/ No local storage = you use fabric + shared storage (Rabbit chassis or parallel filesystem). Node stays simple; storage lives elsewhere.

4/ On this blade, NICs are on the CPU. GPU→fabric = GPU→PCIe→CPU→NIC. Classic topology (unlike EX235a where NICs are on the GPU).

5/ EX235n = A100 option in Cray EX. Milan host, 4 A100s per node, Slingshot for scale-out. Plan for network or shared storage.

**Source:** Cray EX235n. Nodes module, glennklockwood.com/garden.

---

## N13. Cray EX254n — Four GH200s per node, 128 GB LPDDR5X

1/ 4 GH200s per node. 128 GB. Alps, Isambard-AI, KISTI-6 use it. Cray EX254n: two nodes per blade. Per node: 4× GH200 (1 Grace 72c + 1 Hopper H100 each).

2/ Coherent memory per Grace–Hopper pair. Memory: 128 GB LPDDR5X per node. Grace can do 480 GB; HPE spec = 128 GB. Cost/performance for HPC.

3/ 4× Slingshot-11 per node. No NVMe in the wild; HPE docs mention an M.2 blade kit. Default = no local; add kit if you want it.

4/ One GH200 = one NUMA domain. Four per node. Matters for placement and memory bandwidth/latency.

5/ Liquid cooling in photos. EX254n = "4 GH200s, 128 GB, Slingshot, optional M.2" in the Cray EX stack.

**Source:** Cray EX254n. Nodes module, glennklockwood.com/garden.

---

## N14. Cray EX255a — MI300A APUs and 200G Slingshot

1/ 8 APUs per blade. Rabbit for storage. 200G Slingshot. Cray EX255a = MI300A APU blade. Two 4-socket node cards → 8 APUs per blade.

2/ 1× M.2 per node card (2 per blade). 4× Slingshot-11 per node (8 per blade). Not much storage on the blade.

3/ Cray's Rabbit chassis fixes that — spare Slingshot switch ports host NVMe servers. Storage in the chassis, not on every node. Still fast.

4/ Why so many 200G ports? NVIDIA's at 400G NDR. More Slingshot ports per node to keep aggregate bandwidth up at 200G per port.

5/ MI300A blade: 8 APUs, Slingshot fabric, Rabbit when you need storage.

**Source:** Cray EX255a. Nodes module, glennklockwood.com/garden.

---

## N15. Cray EX425 — CPU-only blade, Rome or Milan

1/ No GPUs. Up to 1 TB DDR4 per node. Same fabric. Cray EX425 = dual-socket Rome or Milan, no GPUs. Two nodes per blade.

2/ Per node: 2× Rome/Milan, up to 1024 GB DDR4 (8× DIMMs/socket, 64 GB/DIMM max), no local storage, no GPUs, up to 4 Slingshot-11.

3/ Pure CPU blade. Lots of host memory and cores for preprocessing, post-processing, visualization, compilation, embarrassingly parallel CPU jobs.

4/ No local storage → fabric + shared (Rabbit or parallel FS). No GPUs → no accelerator cost or power. Use it where the work is CPU-bound.

5/ Same Slingshot as the rest of EX. Mix CPU-only and GPU nodes on one network. EX425 when you need more CPU capacity and zero GPUs.

**Source:** Cray EX425. Nodes module, glennklockwood.com/garden.

---

## N16. Why GPU-attached NICs — The EX235a design choice

1/ Most nodes: GPU → CPU → NIC. EX235a: GPU → NIC. No CPU in the path. On most nodes, NICs live on the CPU's PCIe tree.

2/ GPU sends data → PCIe → CPU → PCIe → NIC. CPU in the path = extra latency, CPU cycles for copies and protocol.

3/ On Cray EX235a, Slingshot-11 is on the GPUs' PCIe ports. GPUs talk to the fabric directly. That's GPU-attached (GPU-direct) networking.

4/ Training = lots of GPU–GPU traffic across nodes. If it goes through the CPU, you add latency and the CPU can become the bottleneck.

5/ NIC on the GPU → GPU pushes straight to the fabric. Driver + NIC do the rest. Where you put the NIC (CPU vs. GPU) is a first-order choice. EX235a chose GPU.

**Source:** Cray EX235a. Nodes module, glennklockwood.com/garden.

---

## N17. Azure ND node evolution — A100, H100, MI200, GB200

1/ Four node types. One progression. Azure's ND family = how one cloud rolled out GPU nodes in order.

2/ ND A100 v4: 8× A100, 40 or 80 GB HBM. First "eight GPUs in one VM." Still the play when you don't need Hopper/Blackwell.

3/ ND MI200 v4: 8× MI250X. Explorer, Top500 #11. AMD in the same eight-way class. ND H100 v5: 8× H100, Sapphire Rapids, 96 cores, 1.9 TB DDR5, 28 TB NVMe, 8× 400G NDR. DGX-style. Eagle-class.

4/ ND GB200 v6: Grace Blackwell. Scale to 72 GPUs in one NVLink domain. Newest: Arm host, Blackwell, NVLink C2C, InfiniBand.

5/ Pick by need: Cost-sensitive → A100. AMD → MI200. Max eight-way H100 → ND H100 v5. Grace–Blackwell + big NVLink domain → GB200 v6.

**Source:** Azure ND nodes. Nodes module, glennklockwood.com/garden.

---

## N18. Slingshot vs InfiniBand in Cray EX

1/ Cray EX = Slingshot. Azure ND = InfiniBand. You don't swap them. All Cray EX blades use Slingshot-11 (or similar). The fabric is Slingshot, not InfiniBand.

2/ Slingshot = HPE/Cray interconnect. Ethernet-based, custom switches and protocols for HPC: low latency, congestion control, scale.

3/ Azure ND = InfiniBand (8× 400G NDR on ND H100 v5, NDR200 on GH200). Cloud = often InfiniBand. Cray EX = Slingshot.

4/ Fabric is fixed by the vendor. EX255a's "200G Slingshot while NVIDIA has 400G NDR" = more 200G ports per node to keep bandwidth up.

5/ You can't drop InfiniBand into the same blade. Both run MPI, NCCL, etc. Same programming model; different hardware and topology.

**Source:** Cray EX blades, Slingshot. Nodes module, glennklockwood.com/garden.

---

## N19. Two nodes per blade — Why that number

1/ Why two nodes per blade? Packaging, cooling, power. EX235a, EX235n, EX254n, EX255a, EX425 — all ship two nodes per blade.

2/ One blade = two logical nodes. Two sets of CPUs/APUs, GPUs (or not), Slingshot ports.

3/ Packaging: One blade, one slot. Two nodes per blade = double the node count per slot without doubling blade size.

4/ Cooling and power: A blade has a fixed thermal and power budget. Two nodes × 4 GPUs (8 per blade) can fit; one node × 16 GPUs might not.

5/ You still request "N nodes." Scheduler gives you N nodes (maybe on N/2 blades). Two-per-blade is mainly infra and packaging — "more nodes per slot."

**Source:** Cray EX blades. Nodes module, glennklockwood.com/garden.

---

## N20. Node storage — E1.S, NVMe, M.2, and none

1/ Three storage stories. Pick the node that matches. Azure ND H100 v5: 28,000 GiB local NVMe (8× drives), E1.S SSD carriers. Hot-swap, high-capacity.

2/ Checkpoints, datasets, scratch. Fast and local. EX154n: 1× M.2 per blade. EX255a: 1× M.2 per node card (2 per blade). Boot or scratch local; bulk elsewhere.

3/ EX235n, EX425: no local storage. Boot from network; data over the fabric (parallel FS or Rabbit chassis over Slingshot). Simpler, cheaper node; storage centralized.

4/ E1.S = small, hot-swap, in carriers; high-end density and serviceability. M.2 = one or two sticks per node. No local = stateless compute node.

5/ When you pick a node type, you're picking its storage story. That decides where checkpoints and datasets live and how much you lean on the network.

**Source:** Multiple nodes. Nodes module, glennklockwood.com/garden.

---

*Content file: `ZEV_NODES_20_LONGFORM_X.md`. Sources: `ZEV_NODES_20_SOURCES.md`. Spec: `ZEV_CONTENT_SPEC.md`.*
