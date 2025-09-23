---
id: 0004
title: "Rename Services"
status: "Accepted"
date: "2025-09-11"
---

# ADR 0004: Rename OpenCHAMI Services

**Date Proposed:** 2025-09-11 

**Status:** Accepted (_[Proposed | Accepted | Deprecated | Superseded | Rejected]_)

## **Participants**
- [@alexlovelltroy](https://github.com/alexlovelltroy)  
- [@cjh1](https://github.com/cjh1)  
- [@haroldlongley](https://github.com/haroldlongley)  
- [@j0hnL](https://github.com/j0hnL)  
- [@mdklein](https://github.com/mdklein)  
- [@rainest](https://github.com/rainest)  
- [@trcotton](https://github.com/trcotton)
- [@adamhough](https://github.com/adamhough)
- Atif Ali
- Sadaf Alam
- [@jsollom-hpe](https://github.com/jsollom-hpe)
- [@jvd10](https://github.com/jvd10)
- [@yogi4](https://github.com/yogi4)
- [@larry-kaplan](https://github.com/larry-kaplan)

---

## **Context:**

Components in OpenCHAMI have been named somewhat inconsistently which has led to name collisions with other tools and confusion.

When describing the names, there are several that are pertinent to the discussion.  The repository name, executable, container, package, and go module names are all important.

### Current Naming

| **Service** | **Repository Name** | **Executable Name** | **Container Name** | **RPM Package Name** | **go module** |
| --- | --- | --- | --- | --- | --- |
| smd | https://github.com/OpenCHAMI/smd | `smd` | `ghcr.io/openchami/smd` | None | `github.com/OpenCHAMI/smd/v2` |
| cloud-init | https://github.com/OpenCHAMI/cloud-init | `cloud-init-server` | `ghcr.io/openchami/cloud-init` | None | `github.com/OpenCHAMI/cloud-init` |
| power control | https://github.com/OpenCHAMI/power-control | `power-control` | `ghcr.io/openchami/pcs` | None | `github.com/OpenCHAMI/power-control/v2` |
| discovery | https://github.com/OpenCHAMI/magellan | `magellan` | `ghcr.io/openchami/magellan` | `magellan_${VERSION}_linux_)${ARCH}.rpm` | `github.com/OpenCHAMI/magellan` |
| CLI | https://github.com/OpenCHAMI/ochami | `ochami` | `ghcr.io/openchami/ochami` | `ochami_${VERSION}_linux_${ARCH}.rpm` | `github.com/OpenCHAMI/ochami` |
| image-builder | https://github.com/OpenCHAMI/image-builder | `image-build` | `ghcr.io/openchami/image-build` | None | None (python) |
| Secure token exchange | https://github.com/OpenCHAMI/tokensmith | `tokensmith` | None | None | `github.com/openchami/tokensmith` |
| DNS and DHCP | https://github.com/OpenCHAMI/coresmd | `coredns`, `coredhcp` | `ghcr.io/openchami/coresmd` | None | `github.com/openchami/coresmd` |
| Remote Console| https://github.com/OpenCHAMI/remote-console | `remote-console` | `ghcr.io/openchami/remote-console:2.11` | None | `github.com/OpenCHAMI/remote-console` |
| bss | https://github.com/OpenCHAMI/bss | `bss` | `ghcr.io/openchami/bss` | None | `github.com/OpenCHAMI/bss` |
| configurator | https://github.com/OpenCHAMI/configurator | `configurator` | `ghcr.io/openchami/configurator` | None | `github.com/OpenCHAMI/configurator` |

Developers, users, and distributors need a set of stable names to build on that don't conflict with other/existing tools

---

## **Decision:**

At the September 2025 developer summit, the TSC discussed stable naming and decided on new, more consistent naming.  
- standardize on lowercase `openchami` in go modules
- rename the cloud-init server such that it doesn't conflict with the client tool from cannonical
- rename the image builder to better describe what it does
- rename smd and bss to better describe their function

** Naming Criteria **

- The package name must include `openchami` and must not conflict with other packages available from common package managers
- Services must include `openchami` in the binary names so tools like `ps` show clearly which services are part of OpenCHAMI
- Names should help new users understand the purpose of the software


| **Service** | **Repository Name** | **Executable Name** | **Container Name** | **RPM Package Name** | **go module** |
| --- | --- | --- | --- | --- | --- |
| Inventory (smd) | https://github.com/OpenCHAMI/inventory | `openchami-inventory` | `ghcr.io/openchami/inventory` | None | `github.com/openchami/inventory` |
| Configuration Service (cloud-init) | https://github.com/OpenCHAMI/configuration | `openchami-configuration` | `ghcr.io/openchami/configuration` | openchami-configuration-service${VERSION}_linux_${ARCH}.rpm | `github.com/openchami/configuration` |
| power control | https://github.com/OpenCHAMI/power-control | `openchami-power` | `ghcr.io/openchami/power-control` | None | `github.com/openchami/power-control` |
| discovery | https://github.com/OpenCHAMI/discovery | `openchami-discovery` (symlinked to `magellan`) | `ghcr.io/openchami/discovery` | `openchami-discovery_${VERSION}_linux_)${ARCH}.rpm` | `github.com/openchami/discovery` |
| CLI | https://github.com/OpenCHAMI/ochami | `ochami` | `ghcr.io/openchami/ochami` | `ochami_${VERSION}_linux_${ARCH}.rpm` | `github.com/openchami/ochami` |
| image-builder | https://github.com/OpenCHAMI/image-builder | `image-build` | `ghcr.io/openchami/image-builder` | None | None (python) |
| Secure token exchange | https://github.com/OpenCHAMI/tokensmith | `openchami-tokensmith` | None | None | `github.com/openchami/tokensmith` |
| CoreDNS Plugin | https://github.com/OpenCHAMI/coredns-plugin | None |None | None | `github.com/openchami/coredns-plugin/openchami-inventory` |
| CoreDHCP Plugin | https://github.com/OpenCHAMI/coredhcp-plugin | None | None | None | `github.com/openchami/coredhcp-plugin/openchami-inventory` | 
| Remote Console| https://github.com/OpenCHAMI/remote-console | `openchami-console` | `ghcr.io/openchami/remote-console:2.11` | None | `github.com/openchami/remote-console` |
| Boot (bss) | https://github.com/OpenCHAMI/boot-service | `openchami-boot` | `ghcr.io/openchami/boot` | None | `github.com/openchami/boot` |
| configurator | https://github.com/OpenCHAMI/configurator | `openchami-configurator` | `ghcr.io/openchami/configurator` | None | `github.com/openchami/configurator` |


---

## **Other Options Considered:**

- Renaming all services based on names related to Ferdiand Magellan
- Using `ochami` in every name
- Starting from scratch with new names

---

## **Consequences:**
 - Repositories will be renamed
 - Go module names will be updated
 - References to existing names will be updated
 - Future naming should follow convention

---

## **Points of Contention:**

The renaming of **cloud-init** was heavily debated, and the current recorded decision was developed from the majority concensus.

[cloud-init](https://cloud-init.io/) references the open source client maintained by cannonical.  The client references a set of over [30 Datasources](https://cloudinit.readthedocs.io/en/latest/reference/datasources.html) which define what data is available and how it is retrieved.  The OpenCHAMI `cloud-init-server` implements the server portion of the [NoCloud](https://cloudinit.readthedocs.io/en/latest/reference/datasources/nocloud.html) Datasource.  Services that provide the server portion of a datasource are commonly called `metadata services`.  Some examples:

 - AWS EC2 - Instance Metadata Service (IMDS)
 - Azure - Azure Instance Metadata Service (IMDS)
 - Google Cloud - Google Compute Engine Metadata Server
 - OpenStack - Metadata API or Config Drive
 - VMware - GuestInfo interface

The TSC felt that `metadata-service` and other variations thereof wasn't descriptive enough and would be challenging for new users.  Since the combination of server and client are used to perform the initial configuration of a node/instance, the name `configuration-service` ultimately gained popular acclaim

---

**References:**
- [Roadmap Issue #106](https://github.com/OpenCHAMI/roadmap/issues/106)


