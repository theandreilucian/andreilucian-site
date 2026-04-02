# Revisiting Reliability in Large-Scale Machine Learning Research Clusters — One Article

**Purpose:** One article from the Meta paper *Revisiting Reliability in Large-Scale Machine Learning Research Clusters*, with quoted findings and annotated commentary.

**Date:** Jun 19, 2025. **Tags:** paper/meta, reliability, ML clusters.

**Voice:** Confident, technical. Audience: nerds, hospitals, government.

**Source:** Meta paper (RSC-1, RSC-2); commentator’s notes (HPC/infrastructure background). No invented content.

---

## Introduction

**Revisiting Reliability in Large-Scale Machine Learning Research Clusters** is a paper by authors at Meta that reports on eleven months of operations on two AI clusters: **RSC-1** (16K GPUs) and **RSC-2** (8K GPUs). The clusters ran mixed workloads at wildly varying scales; the paper focuses on reliability and on quantifying metrics **weighted by jobs** vs **weighted by cycles** (node-minutes).

Overall it doesn’t deliver breakthrough insight that would surprise people who have been working in HPC for a while. Meta rediscover metrics that have been in use (e.g. **forward progress**—they call it **ETTF**) and show how different the picture looks when metrics are job-weighted rather than node-minute-weighted. They present a formalized model that, in effect, treats reliability as a **pile of nodes connected in series**.

A large part of the paper is about the impact of their **preemption policy** on utilization (they use “goodput,” which they acknowledge differs from the industry-standard definition). Jobs become eligible for preemption after **two hours**, which lets large jobs launch without draining huge parts of the cluster; but rapid failures of large jobs cause excessive preemption of small jobs and undercut some of the utilization gains. So: no new breakthrough, but a **good signal** that the AI community is converging on the same reliability and utilization questions as HPC. The paper also contains operational nuggets that hint at what other leading AI research labs are likely doing. Good on Meta for being open so that others further behind can follow.

Below: key quotes and a practitioner’s commentary.

---

## 1. Scale, utilization, and job mix

**[Quote]**

*4k GPU jobs constitute less than 1% of our jobs while consuming 12% of the GPU resources at the cluster level.*

**[Quote]**

*11 months of data collected from state-of-the-art AI researcher clusters with >80% utilization.*

**[Quote]**

*RSC-1 and RSC-2 follow the same design template discussed below. RSC-1 is a general ML cluster (e.g., training some of the prominent LLMs) of 16k GPU size, while RSC-2 focuses on vision applications and is of 8k GPU size.*

**[Quote]**

*Leaning into the High-Performance Computing (HPC) stack, our clusters use the Slurm [45] scheduler on top of bare-metal allocations.*

**[Quote]**

*Jobs are eligible to be preempted after running for 2 hours, and they have a maximum lifetime of 7 days.*

**[Quote]**

*Overall, our clusters average 7.2k for RSC-1 and 4.4k for RSC-2 jobs submitted per day, averaging 83% and 85% cluster utilization, respectively.*

---

## 2. Design: pods, health checks, and recovery strategy

**[Quote]**

*Each rack has two servers, and ten racks are connected via a rail-optimized network, forming a pod. Pod-pod communications go through the next level of switches (spine switches).*

**[Quote]**

*Our infrastructure is instead designed to check that jobs are running on healthy hardware, restarting the job on different nodes if there is a failure. This can be viewed as a cooperative recovery strategy as the application is still responsible for correctly implementing checkpoint and resume logic.*

**Take:** Requires the **application to be aware of infrastructure and vice versa**. That underscores the importance of infrastructure that is **programmable by the application layer**.

**[Quote]**

*Health checks that are periodically scheduled to run every five minutes, and return codes indicating success, failure, or warning. Each health check examines some aspect of node health, spanning from GPU errors (e.g. XID errors [9]) to file system mounts, and services status (i.e., scheduler).*

**[Quote]**

*High severity check failures will immediately signal a scheduler handler to remove the node and reschedule all jobs executing on the node, while lower severity checks will signal to the scheduler to remove the node for remediation after jobs running on the node have finished.*

**Take:** Health checks every **five minutes**, integrated with the workload orchestrator (Slurm). Reliability is integrated through the stack, from hardware health up into the application layer. That’s easier for Meta because research and facilities sit under the same roof; harder for AI labs that rely on a third party for training infrastructure.

---

## 3. File systems vs object storage

**Take (from paper and commentary):** A significant amount of job failures is due to **reliance on file systems**. AI labs would do well to **avoid parallel file systems** and use **object storage** instead. Object storage decouples how applications interact with data from the health of the node: the node need only provide the **data plane** (network connectivity to storage), not the **control plane** (authentication and authorization, which file-based storage requires). Object storage delegates auth and session management to the application layer (user-space protocol), so applications can respond more flexibly to misbehaving storage—storage issues don’t have to be treated as node health problems.

**[Quote]**

*IB Links, filesystem mounts, GPU memory errors, and PCIe errors contribute heavily to the failure rates, however for IB Links in particular this seems to be dominated by a short period of many IB Link related job failures from a handful of nodes in the summer of 2024 as shown in Figure 5.*

**Take:** The fact that **file system mounts** contribute so much to job failures is a strong indictment of relying on shared, file-based storage for model training. Had Meta used object storage exclusively (no stateful relationship between each compute node’s kernel and a remote, distributed service), a significant fraction of job failures could have been avoided. Not that storage-related problems would vanish, but object storage puts authentication and session management in the application’s hands so that storage issues aren’t node health problems anymore.

---

## 4. ETTR, productive runtime, and forward progress

**[Quote]**

*ETTR is defined as the ratio of productive runtime to the available wallclock time of a job run.*

**Take:** Infrastructure providers operating in **zero-trust mode** have no insight into this, because the infrastructure has no visibility into the application runtime space. So the infrastructure **cannot define** productive runtime.

**[Quote]**

*The exact definition of productive runtime is open to interpretation depending on context, but we consider two sources of unproductive scheduled time:*

**Take:** So Meta has **rediscovered** the idea of **“forward progress”** as defined by NNSA. The concept isn’t new to HPC.

**[Quote]**

*Job preemption, resource fragmentation, and failures are the dominant sources of lost goodput.*

---

## 5. Failures: NCCL, attribution, and co-occurrence

**[Quote]**

*A NCCL timeout occurs whenever a rank observes that a collective operation, such as an AllReduce, has not completed within a several minutes.*

**Take:** I am surprised the NCCL timeouts take **minutes**.

**[Quote]**

*Errors such as NCCL timeouts may be naively attributed to a proximal cause e.g., on the network rather than a deadlock. Networking has a large “blast-radius”, causing errors across the stack.*

**[Quote]**

*We attribute a failure to a cause if the cause was detected within the last 10 minutes or 5 minutes after a failing job’s lifetime (FAILED or NODE_FAIL).*

**Take:** This works because there is **feedback on the state of the application** that triggers a root-cause at the infrastructure level.

**[Quote]**

*Failures may co-occur—3% and 5% of hardware failures on RSC-1/RSC-2 have co-occurring events of similar priority. For example, we observe PCIe errors often co-occur with XID 79 (GPU falling off the bus) and IPMI “Critical Interrupt” events.*

**Take:** Sounds familiar. Co-occurrence is the norm in real clusters.

---

## 6. MTTF by job size and single points of failure

**[Quote]**

*Figure 7 illustrates that the mean-time-to-failure (MTTF) of 1024-GPU jobs is 7.9 hours—roughly 2 orders-of-magnitude lower than 8-GPU jobs (47.7 days).*

**Take:** From their 1024-GPU job failures, the **MTBF of a single node** should be on the order of **42.1 days**. So they’ve effectively confirmed that **each GPU node is a single point of failure**. That should not be surprising.

---

## 7. Preemption, crash loops, and second-order effects

**[Quote]**

*The worst-case version of this is a crash loop, where a single job is configured to requeue on failures (e.g., by using exception handling in the submission script). In the period we observe, we see a 1024 GPU job NODE_FAIL and subsequently requeue 35 times, causing a total of 548 preemptions (over 7k GPUs).*

**Take:** This is a **bad interaction between policy and infrastructure**. One misbehaving job amplifies into hundreds of preemptions.

**[Quote]**

*While optimizing large jobs is clearly important, 16% of the total lost goodput resulting from hardware failures is due to second-order preemptions, which come from jobs of much smaller sizes. These results indicate that the cluster as a whole is impacted beyond the failures themselves.*

**Take:** A significant amount of cluster utilization loss is due to their **preemption policy**. Not surprising; anyone who has scheduled hugely variable job sizes has seen this in the form of backfill bubbles or node-draining bubbles.

**[Quote]**

*u₀ ≈ 5–20 mins* (restart time after a failure).

---

## 8. Checkpointing, scale, and ETTR

**[Quote]**

*Moving to a 5 minute checkpoint interval would increase expected ETTR to 0.93, illustrating the value of frequent checkpointing to insulate against interruptions (assuming checkpoint writes are non-blocking).*

**Take:** This statement has no meaning. If checkpointing were **non-blocking**, why not checkpoint continuously and get 100% ETTR? I can appreciate that reducing checkpoint interval improves forward progress/ETTR, but **assuming non-blocking checkpoints** is akin to assuming a spherical cow.

**[Quote]**

*2048–4096 GPU job runs on RSC-1 show an average ETTR of over 0.9 at a one-hour assumed checkpoint interval.*

**Take:** That’s a good milestone, but the previous paragraph suggests it is largely a **function of scale**. For larger training jobs, hourly checkpointing would not work, and that should not be a surprise.

**[Quote]**

*To reach ETTR of 0.9 for a 100,000 GPU training run on a hypothetical cluster with an RSC-2-like failure rate, checkpointing intervals and restart overhead need to be ~2 minutes.*

**Take:** You don’t need such a heavily formalized model to make these predictions. The data here (and reality) show that reliability is well-approximated as **a system of independent nodes connected in series**.

---

## 9. Lemon nodes and detection signals

**[Quote]**

*Among tens of detection signals available on each node, the following ones correlate with lemon nodes the most: excl_jobid_count, xid_cnt, tickets, out_count, multi_node_node_fails, single_node_node_fails, single_node_node_failure_rate.*

**Take:** It sounds like they did the same kind of thing as using **Darshan logs en masse** to correlate job slowness with specific Lustre OSTs. Same principle: find nodes that keep showing up in bad outcomes.

**[Quote]**

*Our lemon node detection mechanism led to 10% reduction in large job failures (512+ GPUs), from 14% to 4%. … Implementing lemon node detection can improve large job completion rate by over 30%.*

**Take:** The general principle is good—**find nodes that keep showing up in jobs that fail**. But they are **cherry-picking** the definition of “large job” here, and I don’t see how a 10% reduction in large job failures translates to a **30% improvement in job completion rate**. It feels like the authors are playing games with statistics to show impact rather than measuring improvement in a way that reflects overall cluster outcomes. The qualitative statement that finding lemon nodes is good is undeniable.

---

## 10. Network resilience and making unreliability less noticeable

**[Quote]**

*The network must remove and route around failures. Without resilience mechanisms in place, over 50% of bandwidth may be lost.*

**Take:** This is why everyone uses **adaptive routing**, and there is no reason these days not to use it. The statement is meaningful if the goal is to push for a fabric that supports **fine-grained adaptive routing** (i.e., not standard RoCE).

**[Quote]**

*We therefore envision future infrastructure systems that attempt to make unreliability less noticeable rather than attempting to remove it altogether.*

**Take:** This is a **truism**. Nobody would disagree. Nobody is trying to make unreliability go away, nor has anyone seriously tried since the early days of distributed computing.

**[Quote]**

*We can improve the success rate of training runs by retroactively identifying the root cause of a NCCL timeout, by comparing logged data across different ranks participating in the collective.*

**Take:** Isn’t this what **PyTorch flight recorder** already does?

---

## Closing

The Meta paper is a useful **operational snapshot**: 11 months on 16K and 8K GPU clusters, Slurm, bare metal, 2-hour preemption, 83–85% utilization, health checks every five minutes, and a formalized reliability model that amounts to nodes in series. The commentary above stresses: (1) **file system mounts** as a major failure source and the case for **object storage**; (2) **ETTR/forward progress** as a rediscovery of HPC concepts; (3) **single node as single point of failure** at 1024-GPU scale; (4) **preemption policy** as a big driver of lost goodput; (5) **lemon node detection** as valuable but with statistics that need careful reading; (6) **non-blocking checkpoints** as an unrealistic assumption for the headline ETTR claim. For anyone building or operating large ML clusters, the paper is a good signal that the AI community is aligning with HPC on how to measure and improve reliability—and that the stack (scheduler, health checks, storage choice, application cooperation) has to be designed together.

---

*Source: Revisiting Reliability in Large-Scale Machine Learning Research Clusters (Meta). Commentator’s notes. No invented content.*
