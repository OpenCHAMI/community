---
id: 0003
title: "Out of Scope for OpenCHAMI"
status: "Approved"
date: "2025-09-11"
---

# ADR 0003: Out of Scope for OpenCHAMI

**Date Proposed:** 2025-09-11 (Items should close after 6 weeks of discussion based on consensus)

**Status:** Approved (_[Proposed | Accepted | Deprecated | Superseded | Rejected]_)

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

OpenCHAMI specifically targets the system adminstrator of an HPC system as its user.  It is the sysadmin's responsibility to provide a running HPC system for science users.  In addition, the featureset of OpenCHAMI is narrowly defined as tooling that will be useful to a sysadmin when provisioning and troubleshooting the nodes of an HPC system.  Even that description leaves plenty of room for interpretation.  To better serve developers and users, the TSC feels it necessary to record a collection of functionality that is out-of-scope for OpenCHAMI.  

This ADR is meant to declare what functionality should not be considered as part of OpenCHAMI. The TSC reserves the right to include previously excluded functionality and will supercede this ADR as needed when previously out-of-scope items are added.  Elements that lead to exclusion from scope include criteria such as the following:
- Functionality that is markedly different between sites.
- Functionality that can be provided through third-party clients without needing to alter the core
- Experimental technologies that have not gained wide acceptence in the HPC ecosystem

While items on this list are out of scope for OpenCHAMI, extending internal APIs to allow third parties to more easily integrate is accepted and welcome and can be decided at the API level.

---

## **Decision:**

### Workload Management

OpenCHAMI doesn't include a workload manager of any kind and makes no presumptions about how jobs will be handled.  The inventory APIs of OpenCHAMI anticipate the need for workload managers to gather timely data about which nodes exist along with arbitrary group membership.

### Operating System

OpenCHAMI doesn't prescribe any requirements on the host operating system for the services.  Many of the tools are containerized and will function on any platform that supports containers.  Some, like CoreDHCP, only support the Linux operating system.

Tests have been successful to run OpenCHAMI services on:
- Rocky Linux 8/9/10
- Ubuntu 24
- SONiC Swtiches
- Cumulus Network hardware

OpenCHAMI doesn't impose any limits on the Operating System being used by the HPC nodes it provisions.  The interface for provisioning nodes is iPXE.  Further customization is provided through cloud-init.  Operating systems that can leverage these two can be supported by OpenCHAMI.  Several Linux operating systems have been tested successfully.

## High Speed Networking

OpenCHAMI has no facilities for directly managing a high speed network fabric.  Sites may choose to build automation based on information within OpenCHAMI when configuring their switches.  They may also choose to use OpenCHAMI to boot and configure their switches using iPXE.  Support beyond these two items is beyond the scope of OpenCHAMI.

## Log Management

While log aggregation is essential for managing HPC systems regardless of scale, logging and monitoring differ greatly from one site to another.  Through cloud-init, OpenCHAMI can provide customized logging configuration files to send metrics and logs to external monitoring infrastructure. It can also be used to network boot log aggregation servers through normal iPXE/cloud-init configuration.  Anything further is out of scope.

## Image Build and Management

The OpenCHAMI provisioning system can reference any system image which can be supported via the Linux kernel.  It makes no assumptions about the contents of that image.  Images built, managed, and delivered externally from OpenCHAMI are the expectation.  No provision exists within OpenCHAMI to build, store, organize, or manage system images.

**NB** lacking an existing open source image builder suitable for use in CI, the community has started collaborating on https://github.com/openchami/image-builder which is in common usage, but in no way required.

### Management Network

No OpenCHAMI system can function or even boot without a coherent network for delivering iPXE and/or cloud-init information.  However, the configuration of that network is very specific to the site and the relevant networking hardware.  While inventory APIs may be used to provision the network and the switches themselves may require iPXE for boot and provisioning, OpenCHAMI itslef has no specific features to facilitate network configuration.

### HPC Node Health

OpenCHAMI is agnostic of the operating system on the nodes for which it is the provisioner.  In fact, OpenCHAMI seeks to remain ignorant of the software running on these nodes.  As such, while there are relevant APIs in OpenCHAMI to ascertain the power status of nodes via BMC and PDU APIs, there is no way for OpenCHAMI to ascertain the health of those nodes.  As developers of OpenCHAMI, we expect the workload manager to include some ability to determine which nodes are ready for work.  OpenCHAMI supports providing workload managers with timely node invantory information and leaves it up to them to decide how to properly utilize them.

---

## **Consequences:**
- Extending OpenCHAMI APIs to facilitate out of scope items may be appropriate and must be handled in the API directly.
- We currently expect that secure attestation will be handled directly by the managed OS as part of node initialization.  OpenCHAMI may provide additional support for this in the future.  But overall OpenCHAMI desired to remain OS agnostic for the managed node OS.
- Actions such as the secure partitioning of the HSN will need to use the APIs provided by the appropriate fabric manager.  Additional tooling will likely be required to interface fabric managers with OpenCHAMI.
- Logging will have requirements for configuration and information needed by OpenCHAMI.
- An optional image builder that is part of OpenCHAMI may be considered.

---

## **Non-Goals:**

This ADR is an initial attempt at defining out of scope components and is not exhaustive.  It focuses on components that could be considered for inclusion and not anything that is obviously not relevant.
---

## **References:**
- [Roadmap Issue #51](https://github.com/OpenCHAMI/roadmap/issues/51)
-

