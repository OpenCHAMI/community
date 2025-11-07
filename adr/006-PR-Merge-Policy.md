# ADR 006: Standardized Pull Request (PR) Merge Policy

**Date Proposed:** 2025-09-11  
**Status:** Proposed  

**Participants:**  
- [@jvd10](https://github.com/jvd10)  
- [@alexlovelltroy](https://github.com/alexlovelltroy)  
- [@cjh1](https://github.com/cjh1)  
- [@haroldlongley](https://github.com/haroldlongley)  
- [@j0hnL](https://github.com/j0hnL)  
- [@mdklein](https://github.com/mdklein)  
- [@rainest](https://github.com/rainest)  
- [@trcotton](https://github.com/trcotton)
- [@adamhough](https://github.com/adamhough)
- [@atifsyedali](https://github.com/atifsyedali)
- Sadaf Alam
- [@jsollom-hoe](https://github.com/jsollom-hpe)
- [@yogi4](https://github.com/yogi4)
- [@shots47s](htts://github.com/shots47s)
---

## Context

[Original RFD: Proposal for Standardized Pull Request Merge Policy #95](https://github.com/OpenCHAMI/roadmap/issues/95)

Currently, the OpenCHAMI project lacks a formally documented, standard procedure for reviewing and merging pull requests across repositories. The current process is often informal and can rely on a small number of gatekeepers for all contributions.

This can lead to merge bottlenecks, ambiguity when PRs are left open without a clear path forward, concentrated burden on individuals, etc.

This ADR proposes a lightweight, standardized policy to address these challenges, with the goal of making the contribution process more transparent, efficient, and collaborative.

---

## Decision

Adopt a standardized PR merge policy for all OpenCHAMI repositories, defined by three core requirements:

1. **Peer Review and Testing**
   - All pull requests must be reviewed by at least one other project member.
   - The reviewer should run the tests provided by the contributor, validating that the results are reproducible.

2. **Reproducible Test Documentation**
   - All pull requests must include documentation of the tests performed to validate the changes, except for documentation-only PRs where testing is optional.
   - For documentation PRs: If the change is procedural (e.g., updates to a process or instructions), a test procedure should be provided if possible. For changes that only correct grammar, spelling, formatting, diagrams, or improve clarity, no test procedure is required.
   - For code PRs: Documentation must include specific commands run and resulting output, enabling any contributor to reproduce the test environment and verify results.

3. **Merge Authorization**
   - A pull request is eligible to be merged once it contains the necessary information to reproduce testing, a reviewer has confirmed test reproducibility, and the PR has at least one approving review.
   - Only after approval by a codeowner may the PR be merged. Merging is not limited to the original reviewer or a single gatekeeper, but codeowner approval is required.

Once this formalized approach is practiced, each repository will have a maintainers list defined in [`CODEOWNERS`](https://github.com/OpenCHAMI/.github/blob/main/CODEOWNERS), which will automatically trigger a review and approval from maintainers. This maintainers list is yet to be populated for each of the repos.

This policy formalizes the current informal process, making expectations explicit and reducing ambiguity.

---

## Other Options Considered

- Continue with informal, ad-hoc merge practices (rejected due to bottlenecks and lack of transparency)
- Require merges only by designated maintainers (rejected due to concentrated burden and slower process)
- Automated merges without peer review (rejected due to risk of untested or low-quality changes)

---

## Consequences

**Positive:**
- More transparent and predictable contribution workflow
- Reduced merge bottlenecks and burden on individual gatekeepers
- Improved reproducibility and quality of merged code
- Encourages collaborative review and knowledge sharing

**Negative:**
- May require additional effort from contributors to document tests
- Reviewers must allocate time to validate reproducibility
- Possible delays if documentation or testing is incomplete

---

## Non-Goals

- Prescribing specific test frameworks or CI/CD tools
- Mandating a minimum number of reviewers beyond one
- Defining code style or documentation standards outside of test documentation

---

## Points of Contention

- What constitutes sufficient test documentation
- Whether more than one reviewer should be required
- How to handle exceptions for urgent or trivial changes

---

## Notes

- This policy is intended to formalize and clarify the current informal merge practices in OpenCHAMI.
- The goal is to make the "unspoken" process explicit, reducing ambiguity and improving contributor experience.
- The policy may be refined over time based on feedback and evolving project needs.
- The maintainers list in CODEOWNERS will help automate review requests and approvals, but is still being populated for each repository.

---

## References

- [OpenCHAMI roadmap discussions](https://github.com/OpenCHAMI/roadmap/issues)
- [OpenCHAMI CODEOWNERS file](https://github.com/OpenCHAMI/.github/blob/main/CODEOWNERS)
- [Original RFD: Proposal for Standardized Pull Request Merge Policy #95](https://github.com/OpenCHAMI/roadmap/issues/95)