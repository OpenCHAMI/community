# ADR [003]: [Out of Scope]

**Date Proposed:** [2025-09-11]

**Status:** Proposed

**Participants**
- [@larry-kaplan](https://github.com/larry-kaplan)
- [@alexlovelltroy](https://github.com/alexlovelltroy)  
- [@cjh1](https://github.com/cjh1)  
- [@haroldlongley](https://github.com/haroldlongley)  
- [@j0hnL](https://github.com/j0hnL)  
- [@mdklein](https://github.com/mdklein)  
- [@rainest](https://github.com/rainest)  
- [@trcotton](https://github.com/trcotton)
- [@jvb10](https://github.com/jvb10)
- [@yogi4](https://github.com/yogi4)
- [@shots47s](https://github.com/shots47s)
- [@adamhough](https://github.com/adamhough)
- [@jsollom-hpe](https://github.com/jsollom-hpe)

plus Atif Ali and Sadaf Alam

**Context:**
This ADR is meant to declare what functionality should not be considered as part of OpenCHAMI.  The elements are decided based on several criteria including:
- Considered part of the "managed ecosystem" and not the "management system"
- Often provided directly by the site

Being out of scope means that the functionality will not be implemented as part of OpenCHAMI.  However APIs or other hooks to interact with the listed functionalities may still be required in most cases.

**Decision:**
The following functionality is considered out of scope:
- Workload management and orchestration for users and their applications and private services (managed ecosystem)
- Managed node operating system (includes compute and other managed nodes such as login nodes) (managed ecosystem)
- High-speed network (HSN) management (managed ecosystem)
- Logging (site provided)
- Image building (site provided)

**Other Options Considered:**


**Consequences:**
- APIs and other hooks must be defined for the required interactions with components considered out of scope.
- Node health considerations are primarily the concern of the workload manager or orchestrator though the management system often needs some high-level indication of node status and must provide APIs for the workload manager to reboot and reconfigure nodes.
- We currently expect that secure attestation will be handled directly by the managed OS as part of node initialization.  OpenCHAMI may provide additional support for this in the future.  But overall OpenCHAMI desired to remain OS agnostic for the managed node OS.
- Actions such as the secure partitioning of the HSN will need to use the APIs provided by the appropriate fabric manager.  Additional tooling will likely be required to interface fabric managers with OpenCHAMI.
- Logging will have requirements for configuration and information needed by OpenCHAMI.
- An optional image builder that is part of OpenCHAMI may be considered.

**Non-Goals:**
This ADR is an initial attempt at defining out of scope components and is not exhaustive.  It focuses on components that could be considered for inclusion and not anything that is obviously not relevant.

**Points of Contention:**
Whether the management of the management network is in scope has not been decided and will be handled separately.

**Notes:**

**References:**
- OpenChami/roadmap#51

