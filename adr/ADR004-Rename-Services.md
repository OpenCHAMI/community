**ADR 004:** Rename OpenCHAMI Components 
**Date Proposed:** 2025-09-11
**Status:** Proposed

**Participants:**

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
- [@jvd10](https://github.com/jvd10)
- [@yogi4](https://github.com/yogi4)
- [@shots47s](htts://github.com/shots47s)

**Context:** 
OpenCHAMI/roadmap#106

**Decision:**

Execute the following renamings:

- **cloud-init** should be renamed **ochami-cloud-init-service**
- **smd** should be renamed **ochami-inventory-service**
- **bss** should be renamed **ochami-bootscript-service**
- **coresmd** should be renamed **ochami-name-service**
- **power-control** should be renamed **ochami-power-control**
- **ochami** should have the repo renamed **ochami-cli**, but no change to the binary
- **image-builder** should be renamed to reflect what it does, but to not conflict with upstream packages.
- **Magellan** should be renamed or should be the origin of a Ferdiand Magellan naming scheme
- **tokensmith** should be renamed or should be the origin of a "smith" naming scheme

**Other Options Considered:**

- Renaming **cloud-init** to **ochami-configuration-service**
- Renaming **cloud-init** to **ochami-node-init-service**
  

**Consequences:**

- Repositories will be renamed and have cascading effect on any code or markdown that refers to these repositories.

**Non-Goals:**

- Not renaming all repositories

**Points of Contention:

- The renaming of **cloud-init** was heavily debated, and the current recorded decision was developed from the majority concensus.

**Notes: **

References:

- OpenCHAMI/roadmap#106
