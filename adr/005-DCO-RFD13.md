# ADR 005: Adopt Developer Certificate of Origin (DCO) for Code Contributions

**Date Proposed:** 2025-09-10  
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
- [@atifsyedali](Atif Ali)
- Sadaf Alam
- [@jsollom-hpe](https://github.com/jsollom-hpe)
- [@jvd10](https://github.com/jvd10)
- [@yogi4](https://github.com/yogi4)

---

**Context:**  
OpenCHAMI requires a clear and enforceable process to ensure that all code contributions are legally compliant and transparent. The RFD (#13) raised the need to either adopt a Developer Certificate of Origin (DCO) workflow or enforce Contributor License Agreements (CLA) via tooling such as EasyCLA. This decision affects all contributors and maintainers across OpenCHAMI projects.

The community discussed the trade-offs at the 2025 Developer Summit. DCO was favored because it is lightweight, widely adopted across open source, and easy for contributors to comply with while maintaining proper legal assurances.

---

**Decision:**  
OpenCHAMI will adopt **DCO sign-off enforcement** for all repositories. Every commit must be signed off using the `Signed-off-by` line that certifies the contribution’s origin. GitHub enforcement will be configured through the DCO App/Bot to block merges that do not include proper sign-off.

---

**Other Options Considered:**  
- **Contributor License Agreement (CLA)**  
  - Pros: Explicit legal agreement per contributor; more formal legal standing.  
  - Cons: Heavier administrative burden; contributor friction; requires board-level and HPE copyright review.

Given the open source community norms and ease of adoption, CLA was not selected at this time.

---

**Consequences:**  
- All contributors must sign off their commits before they can be merged.  
- Maintainers will need to verify sign-offs and rely on DCO bot enforcement.  
- CONTRIBUTING.md and PR templates will be updated with clear instructions on how to sign off commits.  
- Provides the project with consistent, legally sound contribution practices.

---

**Non-Goals:**  
- This ADR does not establish a CLA process.
- Nothing in this decision precludes a future CLA process.

---

**Points of Contention:**  
- Some maintainers suggested CLA for stronger legal assurances, particularly given HPE’s original ownership of portions of code.  
- Consensus determined that DCO is sufficient for now, with the possibility of revisiting CLA in the future if required by legal review.

---

**Notes:**  
- Enforcement will begin with core OpenCHAMI repositories and extend to others as governance approves.  
- Educational material and troubleshooting tips will be shared with contributors to minimize friction.

---

**References:**  
- [RFD #13: DCO/CLA for Code Contributions](https://github.com/OpenCHAMI/community/issues/13)  
- [Linux Foundation DCO Overview](https://developercertificate.org/)  
- [OpenCHAMI Developer Summit 2025 Notes](https://openchami.org/tacc25)
