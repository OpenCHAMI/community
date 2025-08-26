### 1. Name of Project

**OpenCHAMI** Open **C**omposable **H**eterogeneous **A**daptive **M**anagement **I**nfrastructure

### 2. Project Description

Provisioning and managing HPC systems involve detecting and cataloging hardware, configuring network and storage, and deploying operating systems and software environments. These processes typically rely on automated tools to ensure consistency, scalability, and efficiency. Traditional HPC management approaches often use tightly integrated frameworks, while newer methods leverage modular and API-driven architectures to provide greater flexibility and automation.

OpenCHAMI is a consortium-driven set of composable software to enable sysadmins to securely and quickly provision and manage HPC/AI systems at any scale.  It's main features are: 
* Redfish-based Hardware Discovery
* Flexible API-based inventory management with customizable grouping and tenancy delegation
* Inventory-driven services for Infrastructure-As-Code control of HPC/AI Nodes
* Secure node initialization and bootstrapping based on machine identity
* Customizable options for:
  - Diskful or Diskless HPC node boot
  - HPC Node Operating System
  - Hypervisor or Bare Metal
  - High Speed Fabric (Infiniband/Slingshot/NVLink/Ethernet)
  - Deployment and HA methods

OpenCHAMI was founded in 2023 by a consortium of sites addressing key challenges in managing HPC/AI systems. Traditional monolithic HPC management solutions fall short in several areas:

* Lack of Flexibility: Existing systems are too rigid, failing to meet the dynamic, cloud-like needs of modern researchers.
* Limited Control for Researchers: Researchers cannot easily specify and customize their environments, hindering productivity and innovation.
* Inefficient Infrastructure Management: Evolving and repairing infrastructure often leads to unacceptable downtime, disrupting critical workloads.
* Inadequate Tools for Sysadmins: Current management tools do not enable sysadmins to provide responsive and scalable services effectively.
* Isolation Across Sites: Tools and techniques developed at one site cannot be seamlessly applied to others, making collaboration and sharing of best practices difficult.
* Stifled Innovation: The inability to easily share successes and methodologies limits collective innovation and improvement.

OpenCHAMI aims to overcome these challenges by providing a set of loosely coupled, composable tools that offer flexibility, scalability, and ease of management for HPC/AI systems of any size. This consortium-driven approach fosters collaboration, enabling members to share successes and innovations, ultimately enhancing the management and operation of on-premise HPC infrastructures.

Together, the members chose a few of the existing microservices from the open source Cray System Manager (CSM) as a starting point. While CSM is a fully integrated solution with strong ties to the Cray EX product line and consists of over 300 repositories on GitHub, OpenCHAMI has only selected two for inclusion thus far:

 1. [SMD](https://github.com/openchami/smd) The CSM Inventory Database
 1. [BSS](httpps://github.com/openchami/bss) The CSM Boot Sript Service
 
 The rest of the software surrounding these microservices has been developed within OpenCHAMI to address specific gaps:

 1. [Cloud-Init](https://github.com/openchami/cloud-init) A cloud-init provider that implements the endpoints for the `nocloud` cloud-init datasource and integrates with the rest of OpenCHAMI to enable secure, targeted, dynamic post-boot configuration
 1. [Magellan](https://github.com/openchami/magellan) A standalone redfish-based discovery tool that can scan ip ranges and populate SMD with detailed information about nodes and other devices.  It provides tooling to update BMC firmware and BIOS settings across a fleet of  Nodes.  It also includes a standalone mode that writes structured json files for big data analysis.
 1. [Configurator](https://github.com/openchami/configurator) A templating service that can read SMD and generate different kinds of files for use with clusters.  New templates can be added with plugins.  Examples of files include:
    - Warewulf nodes.conf
    - powerman and conman configuration files
    - /etc/hosts files
    - dnsmasq configuration files
1. [Ansible Inventory Provider](https://github.com/OpenCHAMI/ansible-smd-inventory) An inventory provider for ansible that uses OpenCHAMI APIs for details and group membership
1. [CoreSMD (a CoreDHCP Plugin)](https://github.com/OpenCHAMI/coresmd) The OpenCHAMI CoreDHCP service that populates DHCP via information in SMD.
1. [Image-Builder](https://github.com/OpenCHAMI/image-builder) A simple container-based system for building squashfs system images suitable for HPC nodes.  OpenCHAMI can boot and manage any squashfs images.  They don't need to be created in any special way.

Orchestrating the OpenCHAMI software is also a site choice.  Within the [GitHub Organization](https://github.com/openchami), partners have shared example deployment methods that work for them including Kubernetes, Docker Compose, Podman Quadlets, and SystemD Units.  The project strives __not__ to endorse one deployment method over another and regards it as a bug when the software presumes one method over another.

With so much opportunity for customization, the OpenCHAMI project doesn't have a single installation that can be described as the one true way.  However, new users to the project want to get going quickly without having to make lots of choices.  For that, the OpenCHAMI team maintains a [Quickstart Repository on Github](https://github.com/openchami/quickstart) that assembles the OpenCHAMI components with third party open source tooling for functionality that isn't HPC specific.  


**Note** CSM was developed at Cray as part of the effort to deploy exascale HPC.  It is in operation today at the partner sites and remains one of the two supported options for managing CrayEX supercomptuers from HPE. [Cray-HPE CSM Documentation](https://cray-hpe.github.io/docs-csm/en-10/)


### 3. Statement on Alignment with High Performance Software Foundation's Mission
OpenCHAMI is an open-source consortium project dedicated to simplifying and streamlining the provisioning and management of high-performance computing (HPC) and AI systems. Our goals closely mirror the High Performance Software Foundation’s mission to “foster collaboration and stewardship of open source software projects that fuel innovation in high performance computing.” We see ourselves as complementary to the broader HPC software ecosystem and closely aligned with HPSF in the following ways:
#### 3.1 Open, Collaborative Development
* OpenCHAMI’s development philosophy is built around open standards, transparent processes, and a community-driven approach. We collaborate across a consortium of HPC sites and practitioners who share code, experience, and lessons learned, echoing HPSF’s emphasis on openness and community empowerment.OpenCHAMI fosters an environment where best practices and innovations are shared across institutions. This collaborative approach mirrors HPSF’s commitment to reducing duplication of effort and encouraging a community-led ecosystem.
#### 3.2 Modular, Composable Software Architecture
* Inspired by modern DevOps and cloud-native principles, OpenCHAMI’s composable microservices approach empowers sites to customize their HPC/AI infrastructures with minimal overhead or vendor lock-in. This modularity and flexibility align with HPSF’s commitment to promoting innovation and adaptability in high performance computing environments.
#### 3.3 Enhancing HPC Productivity
* By providing secure, robust, and automated tools for system administrators and researchers—from hardware discovery and firmware management to advanced provisioning—OpenCHAMI lowers barriers to entry. These enhancements help HPC practitioners focus on research and innovation rather than complex, manual cluster management. This goal supports HPSF’s mission to make HPC software more accessible and efficient.
#### 3.4 Community Knowledge-Sharing and Best Practices
* OpenCHAMI’s consortium model encourages the exchange of best practices among HPC sites, enabling collective problem-solving and accelerating improvements. This spirit of open collaboration resonates with HPSF’s dedication to creating a thriving ecosystem where successes and methodologies are shared to benefit all participants.
#### 3.5 Inclusive and Vendor-Neutral
* OpenCHAMI’s emphasis on customizable deployment (via Kubernetes, Docker Compose, Podman, SystemD, and beyond) ensures that HPC sites of various scales, architectures, and vendor relationships can adopt our software. This inclusivity supports HPSF’s vision of promoting vendor-neutral solutions that strengthen the broader high-performance computing community.
#### 3.6 Focus on Future-Ready HPC & AI
* As demand grows for HPC infrastructure that supports AI and data-centric workloads, OpenCHAMI specifically targets flexibility in OS choice, hypervisor or bare metal, diskful or diskless boot, and integration with high-speed fabrics. We see this forward-looking approach as integral to HPSF’s mission of driving future innovation in HPC software.

By serving as a practical and modern open-source toolkit for HPC infrastructure management, OpenCHAMI supports the High Performance Software Foundation’s core mission of fostering collaboration, openness, and innovation within the HPC community. We look forward to further engagement with HPSF members, sharing our technology, and learning from others in the broader HPC software ecosystem.


### 4. Project Website (please provide a link)

[Project Website](https://openchami.org)

### 5. Open Source License (please provide a link)

[MIT License](https://spdx.org/licenses/MIT.html): [LICENSE](https://github.com/OpenCHAMI/.github/blob/main/LICENSE)


### 6. Code of Conduct (please provide a link)

[Code of Conduct](https://github.com/OpenCHAMI/.github/blob/main/CODE_OF_CONDUCT.md)

### 7. Governance Practices (please provide a link)

[Project Governance](https://github.com/OpenCHAMI/.github/blob/main/GOVERNANCE.MD)

### 8. Two Sponsors from the High Performance Software Foundation's Technical Advisory Committee

1. Greg Becker
1. Reid Priedhorsky

### 9. What is the project's solution for source control?

All source is maintained in Github repositories within the [OpenCHAMI Organization](https://github.com/openchami)

### 10. What is the project's solution for issue tracking?

All issues are tracked in the github repositories representing the different components of OpenCHAMI.  The project leadership also maintains[roadmap](https://github.com/openchami/roadmap) and [release](https://github.com/openchami/release) repositories with their own issue reporting that isn't tied to a specific component or to propose new functionality.  We report to the board through a [public github project](https://github.com/orgs/OpenCHAMI/projects/1) for larger initiatives.

### 11. Please list all external dependencies and their license

Snapshot of dependencies at the time of submission

| **Dependency**                                     | **License**                                                                      |
|----------------------------------------------------|----------------------------------------------------------------------------------|
| ansible-core                                       | GPL‐3.0                                                                          |
| click                                              | BSD‐3‐Clause                                                                     |
| colorama                                           | BSD‐3‐Clause                                                                     |
| docker                                             | MIT                                                                              |
| github.com/Cray-HPE/hms-base                       | MIT                                                                              |
| github.com/Cray-HPE/hms-certs                      | MIT                                                                              |
| github.com/Cray-HPE/hms-compcredentials            | MIT                                                                              |
| github.com/Cray-HPE/hms-go-http-lib                | MIT                                                                              |
| github.com/Cray-HPE/hms-hmetcd                     | MIT                                                                              |
| github.com/Cray-HPE/hms-s3                         | MIT                                                                              |
| github.com/Cray-HPE/hms-securestorage              | MIT                                                                              |
| github.com/Cray-HPE/hms-xname                      | MIT                                                                              |
| github.com/DATA-DOG/go-sqlmock                     | MIT                                                                              |
| github.com/Masterminds/squirrel                    | MIT                                                                              |
| github.com/coredhcp/coredhcp                       | Apache License 2.0                                                               |
| github.com/cznic/mathutil                          | BSD‐2‐Clause                                                                     |
| github.com/docker/distribution                     | Apache License 2.0                                                               |
| github.com/evanphx/json-patch                      | MIT                                                                              |
| github.com/gin-gonic/gin                           | MIT                                                                              |
| github.com/go-chi/chi                              | MIT                                                                              |
| github.com/go-chi/chi/v5                           | MIT                                                                              |
| github.com/golang-migrate/migrate/v4               | MIT                                                                              |
| github.com/google/uuid                             | BSD‐3‐Clause                                                                     |
| github.com/gorilla/mux                             | BSD‐3‐Clause                                                                     |
| github.com/graphql-go/graphql                      | MIT                                                                              |
| github.com/hashicorp/go-retryablehttp              | MPL 2.0                                                                          |
| github.com/insomniacslk/dhcp                       | BSD‐3‐Clause                                                                     |
| github.com/jmoiron/sqlx                            | MIT                                                                              |
| github.com/lestrrat-go/jwx                         | MIT                                                                              |
| github.com/lestrrat-go/jwx/v2                      | MIT                                                                              |
| github.com/lib/pq                                  | MIT                                                                              |
| github.com/mattn/go-sqlite3                        | MIT                                                                              |
| github.com/nikolalohinski/gonja/v2                 | MIT                                                                              |
| github.com/pkg/browser                             | BSD‐2‐Clause                                                                     |
| github.com/pin/tftp/v3                             | MIT                                                                              |
| github.com/rodaine/table                           | MIT                                                                              |
| github.com/rs/zerolog                              | MIT                                                                              |
| github.com/sirupsen/logrus                         | MIT                                                                              |
| github.com/spf13/cobra                             | Apache License 2.0                                                               |
| github.com/spf13/viper                             | MIT                                                                              |
| github.com/stretchr/testify                        | MIT                                                                              |
| github.com/stmcginnis/gofish                       | Apache License 2.0                                                               |
| go.mongodb.org/mongo-driver                        | Apache License 2.0                                                               |
| golang.org/x/exp                                   | BSD‐style (Go License)                                                           |
| gopkg.in/yaml.v2                                   | Apache License 2.0                                                               |
| jinja2                                             | BSD‐3‐Clause                                                                     |
| packaging                                          | Apache License 2.0                                                               |
| PyYAML                                             | MIT                                                                              |
| python-dotenv                                      | BSD‐3‐Clause                                                                     |
| requests                                           | Apache License 2.0                                                               |
| rich                                               | MIT                                                                              |

  
### 12. Please describe your release methodology and mechanics
* Please refer to [OpenChami Release](https://github.com/openchami/release)
* The microservices containers are made available through ghcr.io. The release document listed above has references to the latest versions. 
### 13. Please describe Software Quality efforts (CI, security, auditing)
We rely on github Vulnerability Code Scanning, CodeQL and Security advisories. We will be integrating OpenSSF scans and will work with the community initiating Threat Modeling, Pen-Testing, and Security Audits. 
### 14. Please list the project's leadership team

**Technical Steering Committee**

* [Alex Lovell-Troy](https://github.com/alexlovelltroy) **TSC Chair**  TSC Representative from LANL
* [Matt Williams](https://github.com/milliams) TSC Representative from the University of Bristol
* [Mark Klein](https://github.com/mdklein) TSC Representative from CSCS
* [Andy Garside](https://github.com/ajgarside) TSC Representative from HPE
* [Brian Friesen](https://github.com/bcfriesen) TSC Representative from NERSC

**Governing Board**

* Thomas Schulthess from CSCS
* Larry Kaplan from HPE
* Travis Cotton from LANL
* Eric Roman from NERSC
* Sadaf Alam from University of Bristol


### 15. Please list the project members with access to commit to the mainline of the project

The TSC above has access to commit directly to all project repositories.  Individual developers from various member sites have permission to commit to independent components in their capacity as maintainers of those components.  The TSC grants commit access to developers who meet several criteria and record their access in the CODEOWNERS file of each repository.

**Commiter Criteria:**

 1. Valid and verifiable signing key for all commits
 1. Confirmed by a TSC member as connected with a partner **-or-** confirmed by a TSC member to be deploying OpenCHAMI for providing HPC Services to users
 1. A commitment from the user to engage in regular code reviews for the repository

### 16. Please describe the project's decision-making process

We operate on consensus with regular meetings (video). Significant changes often start with a Request For Discussion (RFD) containing context and alternatives.  Where needed, the TSC will vote according to the charter.

### 17. What is the maturity level of your project?

[Sandbox](https://github.com/hpsfoundation/tac?tab=readme-ov-file#sandbox)

### 18. Please list the project's official communication channels

* **Website:** [OpenCHAMI.org](https://openchami.org)
* **Mailing List:** [MailerLite](https://mailerlite.com)
* **Slack Instance:** [OpenCHAMI Slack](https://openchami.slack.com)

### 19. Please list the project's social media accounts

* None

### 20. Please describe any existing financial sponsorships

* Nearly all contributions are made by employees of the partners on company time.
* CSCS maintains a GitHub account for maintenance of the GitHub Organization

### 21. Please describe the project's infrastructure needs or requests

**Needs:**
 - None

**Requests:**
 - Test Clusters for automated integration testing
