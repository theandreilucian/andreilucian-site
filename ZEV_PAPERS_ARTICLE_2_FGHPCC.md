# FG-HPCC: One Article — Mission, Vision, Security, and Use Cases

**Purpose:** One article from the Future Generation High Performance Computing Center (FG-HPCC) RFI. Mission needs, productivity, infrastructure vision, security, control plane, and future use cases.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

**Source:** LLNL FG-HPCC RFI (NNSA/DOE). No invented content.

---

## Introduction

The Future Generation High Performance Computing Center (FG-HPCC) is Lawrence Livermore National Security’s vision for the next step in NNSA computing.

It is not a single machine. It is a converged data center: HPC, AI training and inference, web services, analytics, and CI — composable, tightly integrated, and manageable through a common software stack.

This article walks through mission needs, gaps, the anticipated solution, security, the control plane, and the use cases that define what FG-HPCC must support.

---

## 1. Evolving mission needs

NNSA’s mission is evolving. The stockpile is aging; systems are refurbished, reused, or replaced.

**Simulation:** ASC simulations need more realism and accuracy to track aging. Better physics and solution methods mean greater computational demand. Weapon modernization will make up a large share of NNSA workload in the coming decade.

**Collaboration:** Design agency (DA) and production agency (PA) sites must work together. NNSA simulations increasingly use data and models from across the complex so that designs are optimized for real production.

**Scale:** HPC use cases will grow from single-site studies to a web of connected sites — iterating on design and production. Multi-physics codes must integrate more capabilities and reach more users. Simulation results must reflect the latest PA data and stay consistent with manufacturing.

---

## 2. Revolutionizing productivity

HPC procurements and GPUs have already cut simulation times from weeks to hours. GPUs will stay central for physical simulation and AI.

The bottleneck is often not runtime but **human factors**: complex workflows and cross-complex collaboration. NNSA tri-labs are therefore focused on **developer and designer productivity**.

FG-HPCC aims to accelerate the mission along three paths:

- **Artificial Intelligence (AI)** — Guide and accelerate large simulation workflows, understand complex phenomena, automate non-simulation tasks (e.g. image or document analysis). AI synthesizes knowledge from data. NNSA workloads will couple more with AI; simulation ensembles will feed AI training, and simulation-generated data must be readily available for rapid, iterative model training.

- **Increased automation** — AI, continuous deployment of codes, ML models, and workflow scheduling. Users set up and run large scientific workflows automatically and securely. Code teams and facility developers build, test, and deploy code and infrastructure automatically. The scientific and AI library landscape changes constantly; rapid testing of internal and external packages is essential. ML-ops augments developer workflows for versioning and managing ML models and software. Regular updates and fast iteration are required without sacrificing correctness or end-user productivity.

- **Persistent services** — NNSA HPC applications become remotely accessible services. Production sites use DA-developed simulations, models, and databases; DA-hosted simulations use models and data from production for more accurate scenarios and rapid iteration. Designers and analysts use hosted datasets for codes, AI training, or large-scale analysis. Data lives in S3-like object storage with updated indexes and databases, not only traditional filesystems. FG-HPCC must let NNSA developers access codes, data, and AI models through hosted web portals and other services.

---

## 3. Future infrastructure vision and gaps

The vision: over 3 double-precision exaflops in peak capability, abundant utilities in the computer room, and NNSA data centers that remain world-class. But those centers must **evolve** with the mission.

**Gap 1 — Independent systems and difficult upgrades:** Most HPC procurements deliver integrated systems; centers run independently. Incremental upgrades are hard and often force changes to unrelated resources.

**Gap 2 — Limited security model:** Current HPC centers rely on OS-level controls, trusted filesystems, and network zones. That model is too coarse for future NNSA needs. Strong isolation and multi-tenancy are missing.

**Gap 3 — Inefficient resource management:** Users specify resources explicitly via per-machine batch schedulers. Decomposed workflows with multiple interacting components are poorly supported. There is no common scheduling layer to coordinate disparate or disaggregated resources, so the center underperforms.

---

## 4. Anticipated solution — Center as a system

LLNS will transform the Livermore Computing (LC) system into a **converged data center** supporting HPC, AI training, AI inference, web services, analytics, and CI.

**Principles:**

- Users compose **heterogeneous** compute and storage into complex, orchestrated workflows. Composable but tightly integrated.
- The system is not optimized for one workload only: e.g. GPU partitions for AI/HPC, CPU-only for services. Incremental updates; homogeneous, tightly integrated resources where it matters.
- Resources are **co-scheduled and orchestrated** via common interfaces. Users do not micromanage allocation; they expect fast, efficient execution.
- **Automated provisioning** of compute, storage, and network tailored to jobs, applications, and workflows — from long-running jobs that need a full platform to millions of small jobs.
- Users provision and control the system through **well-defined APIs**. New codes, services, and workflow tools can be developed quickly; web interfaces deliver secure, persistent services across the NNSA complex.

**Innovations:** Converging multi-tenant hyperscale data center technologies; a **center-as-a-system** deployment model; cloud-like capabilities. LLNS will integrate and operate the data center using a **common, open-source software stack** for flexible and secure hardware provisioning and will expand procurement to a **wider range of HPC/cloud vendors** to avoid single-vendor lock-in.

**Procurement:** The transformation calls for a more **flexible procurement strategy**. Instead of one large integrated acquisition, LLNS may issue multiple awards targeting specific resource types. Figure 2 (conceptual) illustrates **five major elements**, from one or more vendors:

1. Next-generation, integrated ModSim capability  
2. An element to train AI models and run inference with ModSim  
3. Compute optimized for persistent, data-intensive services  
4. Center-wide storage resources and/or services  
5. A high-speed data-center-wide network for complex workflows and jobs  

LC will manage the software stack and integrate these elements; focus is on functionality and performance of APIs and interfaces. The transition is expected to unfold over the next 4–5 years, with interest in technology deliverable through roughly 2030. Other NNSA labs (Sandia, LANL, KCNSC) can tailor deployments to their needs and compose HPC center components with strong isolation via a central data center network.

---

## 5. Open-source system software stack

LLNS builds on its history under the ASC program. Key pieces of the stack include:

- **SLURM** — De facto standard for HPC batch scheduling (originally an ASC project).  
- **Flux** — Next-generation resource manager (e.g. on El Capitan), enabling heterogeneous, massively parallel workflows.  
- **TOSS** — NNSA tri-lab operating system stack, RHEL-derived, with kernel patches and packages for large-scale management, configuration, and hardware support for GPUs and networks; STIG for classified use.  
- **ZFS on Linux** — ASC project underlying Lustre at tri-labs.  
- **Spack** — De facto package manager for user-level HPC software.  
- **OpenCHAMI** and others — Emerging tools for system management modernization.

The **envisioned stack** (Figure 1 in the RFI) places a traditional HPC stack alongside frameworks for services and AI, with **primitives for strong isolation**, **control-plane APIs**, and **storage APIs** underneath. A main goal of the RFI is to assess potential designs and components of this stack and to prioritize collaborations for development. Aspirational requirements are in Section 3; collaborations are in Section 4 and Section 6.

---

## 6. Security — Multi-tenancy, isolation, access control

Security is **paramount**. Traditional HPC — OS-level controls, trusted filesystems, network zones — is too coarse for future NNSA needs. Future data center elements must build in robust security from hardware to software (integrity, confidentiality, availability).

**Multi-tenancy:** Multiple users at different security levels must use resources efficiently. Users compose **arbitrary subsets** of resources for jobs, workflows, and services. No portion of the system is dedicated to a single security level. Physical air gaps remain for classified vs unclassified; within each side, **strong logical separation** replaces reliance on physical separation alone.

**Strong on- and off-node isolation:** One user must not observe another’s data or actions. Fine-grained partitioning of CPUs, GPUs, network, and storage with heightened security per partition.

**Flexible access control:** Data owners control access. Role-based authentication is critical for data-centric workflows. Filesystems and other data services must enforce authorization so that **a single node compromise does not breach the whole filesystem**.

**Result:** FG-HPCC resources must be usable for **any** workload without compromising security — batch, on-demand, orchestrated, persistent service, or untrusted CI. Job size does not matter; users can securely share nodes (e.g. fractions of CPUs, GPUs). Multiple tenants from different programs or labs can run separate jobs on the same network or in a single node. Users can build secure, persistent services independently. Public cloud has shown that virtualization, software-defined networking, trusted execution, and encryption can be viable in HPC; traditional HPC often lacks these guarantees. LLNS welcomes research into lowering overhead and cost for mission workloads.

---

## 7. Interoperability and data center control plane

**Interoperability:** FG-HPCC must ensure that **resources from different elements** can be used together with **strong isolation**. Example: a user requests ModSim, AI, and I/O resources for an AI-augmented ModSim workflow. The resource manager (e.g. Flux or Kubernetes) must quickly establish an **isolated network** connecting these elements through the Data Center Network Core. By 2030, a single universal isolation technology may not exist; center-wide interoperability may require **bridging** different network isolation mechanisms. Once the network is in place, the resource manager sets up VMs (if not bare metal) and associates networks with jobs on the appropriate subsets of CPU and GPU. LLNS is seeking information on building virtual networks across diverse technologies, interoperability of isolation mechanisms (VLANs, VXLAN/VNI, encryption, pkeys), and low-overhead on-node virtualization and its interaction with isolated networks.

**Control plane:** The FG-HPCC will provide **baseline services** to operate the data center as an on-premises cloud. It will not replicate every hyperscaler service; the burden would be too high. It will deliver at least **baseline storage, compute, and network allocation** so that users or facility staff can build higher-level services or PaaS. Facility staff manage center-wide filesystems; users create job-specific filesystems. Capabilities will let users quickly stand up persistent services, frameworks, ensemble runs, and workflows — using Terraform, Helm, and other IaC so that services and HPC workflows can be provisioned securely inside FG-HPCC.

The control plane must let users **compose FG-HPCC elements into private, isolated enclaves** and must allow **elements to be added, upgraded, or removed** over time without breaking user workflows. There is no single widely adopted open standard for on-premises control planes comparable to public cloud; the RFI asks respondents to propose projects that provide **open, on-premises, cloud-like control interfaces** for heterogeneous hardware and multiple vendors.

**APIs and interfaces:** FG-HPCC will manage on-premises hardware via **low-level IaaS-style APIs**. Open, industry-standard or de-facto standard APIs (e.g. Sunfish, Redfish, S3, Terraform providers) will be used where available; where they do not exist, APIs must be open and well documented. Management will cover nodes, VMs, network, storage, AI processors, volumes, and other hardware. **In-band and out-of-band** management are both required for fine-grained access control and strong isolation.

**Resource management and orchestration:** Isolated allocations must **span elements** and support **heterogeneous resource models**. LLNS plans to use **Flux** for HPC allocation and scheduling on future systems; other NNSA labs may use SLURM or similar. Flux is open-source; LLNS encourages R&D to extend Flux for FG-HPCC. Flux already supports a heterogeneous graph model. Integration with **Kubernetes** is of interest — LLNS and tri-labs use Kubernetes for facility services and containerized user services. R&D that lets Kubernetes use FG-HPCC capabilities, alone or with traditional HPC resource management, is encouraged. Integrations between Kubernetes and Flux for converged HPC/cloud workflows exist; further R&D leveraging both is welcome. Flux, Kubernetes, and other higher-level tools will sit on **lower-level IaaS APIs** for network, VMs, and related resources.

**Guest OS:** The guest OS is critical for HPC jobs. FG-HPCC will use a virtualized environment; hardware support for GPUs, network fabrics, and other accelerators must be maintained in guest kernels. A **STIG** is required for classified use. LLNS uses **TOSS** in production (RHEL-derived, kernel patches, GPU/network support, STIG). New systems are expected to use TOSS version N or N-1. Other NNSA labs may use Rocky, Alma, or SLES. Hardware enablement must be **releasable in a form that allows NNSA labs to compile from source** against their chosen guest OS kernel. LLNS expects to distribute this software beyond LLNL and requires **early engagement with kernel.org** to upstream hardware support.

**Virtualization and hypervisors:** FG-HPCC will use virtualization extensively. LLNS is interested in virtualization that fits HPC environments, **low overhead** (CPU and GPU/accelerators), VMs that **spin up quickly** with **little to no overhead over bare metal**, and efficient use of node hardware by the guest. Interest also extends to bridging performance and security gaps in CPU and GPU virtualization and to **multi-tenant GPU sharing** on a node.

**Network and storage isolation:** LLNS seeks high-performance, low-latency **isolated virtual networks** and information on **traffic encryption**, **data-center-wide key management**, **memory encryption**, and other isolation techniques and their performance. For **storage**, LLNS and NNSA labs plan to modernize so that storage can be **shared across security domains**; technologies that **isolate storage** for one security domain from others on the same device are needed, including **encrypted volumes** and their interaction with key management.

**Complex-wide federation:** LLNS envisions NNSA sites transforming into FG-HPCCs locally and eventually **federating** resources across data centers. FG-HPCC instances should coordinate across sites and organizations, similar to cloud platforms. LLNS is seeking information on **federating data center networks** across sites (e.g. continental US) and on **permission models** for federating local authentication (e.g. DOE OneID, NNSA ESNHub).

---

## 8. Future use cases — AI-augmented ModSim, digital twins, inverse design

**AI-augmented simulation (5.1.1):** Traditional ModSim codes will be augmented with **embedded AI surrogate models** (multi-physics, multi-scale) and **AI orchestration models** for simulation campaigns. Workloads will mix **double-precision** ModSim with **low-precision** inference for small models, ideally on the same node. The orchestrating AI model may run on AI-capable hardware at modest to large scale.

**Digital twins (5.1.2):** FG-HPCC will use **digital twins** that integrate AI into simulation workloads — e.g. twins of components manufactured at PA sites (Y-12, KCNSC, Pantex) from DA designs. A digital twin of a 3D-printed part can feed traditional simulation for “born certified” outcomes. AI models will **monitor physical systems** and **integrate measurement streams** to enrich digital models. Computational demands will emphasize **real-time execution** and **on-demand scheduling** in line with live experiments at production facilities.

**Inverse design (5.1.3):** **Generative AI** will support inverse design by rapidly exploring large design spaces and identifying regions that justify more ModSim runs. Workflows will orchestrate large numbers of traditional ModSim runs with varied inputs; outputs (and full input data) will inform human designers or train surrogate models. These generative models can be heavier than typical surrogates but lighter than full orchestration models and may use dedicated AI accelerators or distinct AI elements.

**AI workloads and computational motifs (5.2):** Beyond the three above, FG-HPCC will support: **AI-augmented simulation campaigns** (e.g. LLM orchestration, ModSim + surrogates, surrogate retraining, LLM fine-tuning); **inverse design** (LLM or other model orchestrating batched ModSim and surrogates); **specialized foundation model development** (large-scale transformer training for scientific domains, possibly coupled with ModSim for data); **data-surrogate models** (DSMs representing and compressing multi-modal datasets, including rare events); and **HPC code assistants** (LLM helping port HPC code, potentially as a persistent service on AI-capable nodes). Training requirements range from **hundreds of compute hours** to **exaflop days** for the largest models. Data I/O for these hybrid AI workflows differs from traditional ModSim checkpoints: **datasets from TB to PB**, billions or trillions of samples/tokens; storage must support **read-mostly, near random-access** or **in-situ ingestion** of streams for online training; **data provenance** is a first-class concern; data may come from **edge facilities** (e.g. NIF, Advance Manufacturing Lab, Vera Rubin, Scorpius) for digital twins and for **calibrating ModSim codes**.

**Services and orchestration (5.3):** These workloads need **more orchestration** — for runs, training, inference, model updates — than traditional HPC. Users will **dynamically schedule** their own ensemble runs; workflows need intelligent **placement** of jobs on the right resources at the right scale with the right data. Communication spans many network layers and libraries; work granularity can be much **finer**. FG-HPCC must support **co-scheduled services**, **deep resource awareness**, and **strong user isolation** so that one workflow’s data is not exposed to others. Orchestrators must **co-schedule** analysis, training, and inference from the same workflow efficiently.

**Data-centric computing (5.4):** For digital twins, FG-HPCC must run **persistent services** that connect to **external production agencies** and receive **frequent data updates** for model updates and redeployments. New ML components must be **placed near** training or analysis data. FG-HPCC will maintain **persistent data warehouses, data lakes, and large datasets** used across sites, with **cross-site replication, versioning, and updates**. **Staging compute near data** and **data near compute** will be critical. Many NNSA datasets have **need-to-know** restrictions; the center must support **flexible access control** and **efficient data movement** so authorized users can access data without excessive copying or long waits, and so **sharing is simple and fine-grained** within and across sites.

**Developer and operational workloads (5.5):** ML models and simulations must be **versioned and managed** like code. **CI** must trigger automatically for code and model changes — from inside FG-HPCC, from trusted external sites, and for support libraries on platforms like GitHub. ML workloads need **frequent model updates and redeployments**, often with **human-in-the-loop**. Engineers use tools such as Jupyter, Colab, and SageMaker; the **cycle of productive iteration** — create, tune, deploy, refine — must be possible and efficient inside FG-HPCC.

---

## 9. Collaborations and RFI — Roadmap, gaps, and review

**Response format:** Respondents are asked for a **high-level overview** of each topic they address: capabilities and how they align with FG-HPCC objectives. LLNS is interested in **impact on the HPC market** and **potential for broad adoption** (e.g. in cloud or other industry data centers), and in solutions that can be sustained beyond NNSA alone. In addition to technical content, LLNS requests outlines of potential **collaborations** in: (1) open-source software development, (2) hardware and software testing, (3) software hardening, (4) standardization. LLNS and partner labs will **identify promising collaborations** and connect NNSA staff with respondents for long-term FG-HPCC goals; **broader community adoption** is of particular interest. **No particular software architecture** is mandated; respondents may propose how the FG-HPCC control plane could work, with Figure 1 as a guideline. Information not widely published should include **source data or citations**.

**Roadmap (6.1.1):** Suggested categories for responses include: low-overhead security and isolation; processors/GPUs/accelerators for ModSim and for AI; low-overhead CPU/GPU virtualization; I/O, storage, and composable storage services; secure data-center networks with isolation; long-range connectivity between data centers (e.g. between NNSA labs) preserving isolation; network configuration, isolation mechanisms, and bridging; open-source system software stack; security guarantees for FG-HPCC capabilities; PaaS or other high-level solutions; and any other enabling technologies.

**Gaps (6.1.2):** Respondents are asked to focus on: **gaps** that prevent technologies from being used in HPC (or vice versa) — e.g. overheads, latencies, performance; **gaps in the HPC center software stack** that hinder broad use of cloud-like technologies on-prem; **advancements** needed to satisfy both HPC and broader industry; and **standardization** efforts that could mitigate gaps with open-source solutions and broad industry support.

**Software collaboration (6.1.3):** Topics of interest include: **low-overhead isolation software** for partitioning nodes, CPUs, GPUs, AI accelerators, and memory in multi-tenant systems; **encryption or confidential computing** with low overhead for HPC/AI; **low or zero-overhead network virtualization** for isolated, user- and job-specific silos; **adaptations** of MPI, network libraries, or GPU drivers for **virtualized or containerized** environments; and **open APIs, control planes, and implementations** for automating provisioning at scale or within a node, with **interoperability and extensibility** to existing standards. **Open-source collaborations are strongly preferred**; proprietary approaches may be described with an explanation of how NNSA, other DOE labs, and vendors could collaborate.

**Other collaboration (6.1.4):** Standards (existing committees or new bodies); **hardware/software testing** in the open LC HPC center, including co-design; **integration of AI accelerators** (hardware, software, network) into the LC center; and any other collaboration that furthers FG-HPCC goals. For **hardware**, LLNS and other NNSA labs are especially interested in **testing, proving, and hardening** FG-HPCC-related hardware; they have **testbed clusters** for this, under NDA if needed.

**RFI review (6.2):** Responses will be reviewed by **experts from the NNSA tri-labs (LLNL, LANL, Sandia)** and potentially by **DOE Office of Science** labs and other federal staff. Responses will be used (1) to **make DOE laboratory and federal staff aware** of upcoming technology developments and (2) to **prioritize industry/NNSA collaborations** at LLNL and other tri-labs. Reviewers will **rate** potential collaborations by their lab’s priorities and **recommend** the most promising to NNSA HQ. **Timeline:** RFI responses due **2025 August 08**; review **late August / September 2025**; **feedback to respondents** in Fall/Winter 2025 if requested.

---

## Closing

FG-HPCC is a vision for a **converged NNSA data center**: mission-driven productivity through AI, automation, and persistent services; security and isolation that support multi-tenancy and flexible access; a common open-source stack and control plane; and use cases that blend ModSim, AI, digital twins, inverse design, and data-centric workflows.

The RFI is the mechanism to gather information, assess the stack and its gaps, and prioritize collaborations. One article cannot replace the full document, but it summarizes the main threads — mission, gaps, solution, security, control plane, use cases, and how to respond — so that nerds, hospitals, and government can see what FG-HPCC is and why it matters.

---

*Source: LLNL FG-HPCC RFI (NNSA/DOE). Sections 2.3–2.5, 3.1–3.3, 4, 5, 6. No invented content.*
