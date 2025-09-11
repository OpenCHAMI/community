# ADR [000]: Establish an Architecture Decision Record (ADR) Process for Documenting Key Decisions

**Date Proposed:** 2025-07-03
**Status:** Accepted

**Participants**
- [@alexlovelltroy](https://github.com/alexlovelltroy)  
- [@cjh1](https://github.com/cjh1)  
- [@haroldlongley](https://github.com/haroldlongley)  
- [@j0hnL](https://github.com/j0hnL)  
- [@mdklein](https://github.com/mdklein)  
- [@rainest](https://github.com/rainest)  
- [@trcotton](https://github.com/trcotton)
- [@adamhough](https://github.com/adamhough)

---

**Context:**
[Background and context leading to the decision.]
Implement an Architecture Decision Record (ADR) process to systematically document and maintain key architectural and technical decisions.
Benefits:

- Transparency: Provides a clear history of decisions and the reasoning behind them.
- Consistency: Ensures decisions are documented in a uniform manner.
- Onboarding: Helps new contributors understand past decisions and the project's direction.
- Reference: Serves as a centralized repository for decision-making, reducing redundancy and confusion.

**Decision:**
Here’s the **markdown-formatted summary** of the decisions and discussions from [OpenCHAMI roadmap issue #98](https://github.com/OpenCHAMI/), based on the 2025 summit:

---

## Summary of Decisions from 2025 OpenCHAMI Summit

### Timing Constraints for ADR Decisions
- Proposals should be decided within **6 weeks** of submission.
- Ensures at least one **TSC meeting** can review the proposal.
- Need to define what happens when the timer expires (e.g., auto-reject, escalate, etc.).

### Revised Acceptance Criteria
- Move away from approval by just **2 TSC members**.
- Consider requiring a **majority vote** from the TSC.

### ADR Template Improvements
- Add a section for **“Options”** to document alternative approaches considered.
- Include **“Non-goals”** and **points of contention** to clarify scope and disagreements.

### Dashboard for ADR Requests
- Desire for a **visual board** showing ADRs pending review or decision.
- Should include:
  - Status updates
  - Expected decision timelines
  - Notifications when new ADRs are added

### Handling Low-Frequency TSC Meetings
- Monthly meetings are too infrequent for timely decisions.
- Suggest handling ADRs **asynchronously**, similar to [Issue #95](https://github.com/OpenCHAMI/):
  - Maintain a board of ADRs expected to be discussed
  - Announce new ADRs when added
  - Require a **minimum 6-week lead time** before decisions

### ADR Number Reservation
- Add instructions in the ADR README:
  - How to **reserve a number** by creating a branch with the number included.

---

**Other Options Considered:**
No Other options considers as this is required.

---

**Consequences:**
Avoids Chaos.

---

**Non-Goals:**
N/A

---

**Points of Contention:**
N/A

---

**Notes:**

---

**References:**
- [OpenCHAMI roadmap issue #98](https://github.com/OpenCHAMI/roadmap/issues/98)
- [AWS ADR Process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html)
- [GitHub adr organization](https://adr.github.io/)
- [Timing Architectural Decisions (ADs)](https://ozimmer.ch/assets/presos/ZIO-ITARCKeynoteTADv101p.pdf)
