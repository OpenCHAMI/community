---
id: 0007
title: "OpenBao as the Default Secret Store"
status: "Proposed"
date: "2026-10-15"
---

# ADR 0007: OpenBao as the Default Secret Store

**Date Proposed:** 2026-10-15 (Items should close after 6 weeks of discussion based on consensus)

**Status:** Proposed

**Participants**
- @bmcdonald3
- @alexlovelltroy
- @Masber
- @milliams

---

## Context

OpenCHAMI services need to store and retrieve credentials used to communicate with Baseboard Management Controllers (BMCs). The credential manager described in RFD #128 uses a reconciliation loop to rotate passwords through Redfish. Its original design includes current and new passwords in API resources persisted in a local SQLite database, exposing credentials through plaintext storage and potentially through logging.

The discussion initially proposed HashiCorp Vault for centralized secret storage, access policies, and auditing. It subsequently considered Infisical and an encrypted local file store to reduce deployment overhead, particularly for air-gapped installations using Podman Quadlets or Docker containers. Sites also reported existing Vault deployments and use of OpenBao as an open-source alternative.

Recent HashiCorp Vault releases use the Business Source License rather than an open-source license. OpenBao is an open-source fork of Vault under the Linux Foundation and provides a Vault-compatible API, policy-based access control, and audit capabilities. The discussion concluded with support from the RFD author for OpenBao as the default.

OpenCHAMI needs a default that supports shared credential access across services without requiring every deployment to adopt a proprietary-licensed secret manager or implement its own centralized security controls.

---

## Decision

**OpenBao is the default secret store for OpenCHAMI-managed BMC credentials, replacing HashiCorp Vault as the default proposed in RFD #128.**

- Reference deployments and new credential-store integrations should target OpenBao by default, including air-gapped container deployments.
- Credential access should be separated from reconciliation logic through a secret-store interface. OpenBao is the default implementation; this decision does not prohibit site-managed alternatives, including existing Vault deployments, where compatibility and security requirements are verified.
- Operational databases should retain credential references and reconciliation metadata rather than plaintext passwords. Credentials must not be included in logs or ordinary resource responses.
- Services must authenticate with distinct machine identities and receive only the credential access needed for their function. AppRole is an option for non-Kubernetes deployments; this ADR does not mandate one authentication method for every site.
- Routine human access to raw BMC passwords should be denied by policy. Privileged recovery access must be explicitly controlled and audited; application policies cannot prevent access by an administrator who controls the secret manager or its host.
- Deployments must enable audit logging and protect the resulting records. TLS, persistent storage, backup and restore, and seal/unseal procedures are deployment requirements, including in air-gapped environments.

---

## Other Options Considered

- **HashiCorp Vault:** Provides the required secret-management capabilities and is already operated at some sites. Not selected as the default because of the licensing change in recent releases. Existing site-managed deployments are not prohibited by this ADR.
- **Infisical:** Offers centralized secret management and machine authentication. It was considered during prototyping, but introduces a different service stack and integration path. OpenBao was preferred in the subsequent discussion as the open-source Vault alternative.
- **Encrypted local file storage:** The `LocalStore` proposal in `hms-securestorage` uses AES-GCM encryption with per-secret keys derived from a master key using HKDF. It reduces infrastructure requirements, but file encryption alone does not provide centralized per-service access policies or credential-access auditing. It is not the default; any development or site-specific use must be explicit, not a silent fallback when OpenBao is unavailable.
- **Plaintext SQLite or flat files:** Do not provide adequate protection for stored credentials or centralized access controls and are not an acceptable default.
- **Docker/Podman secrets and SOPS:** Useful for provisioning bootstrap secrets or encrypted configuration, but do not by themselves provide the shared runtime read/write API, authorization, and auditing needed for BMC credential management.

---

## Consequences

### Positive

- Establishes an open-source default for centralized BMC credential storage.
- Provides a common foundation for service identities, least-privilege policies, and credential-access auditing.
- Avoids coupling credential reconciliation to one backend implementation while retaining a consistent default.
- Supports sites already familiar with Vault-style APIs and operational practices, subject to compatibility testing.

### Negative

- Adds a service that must be deployed, patched, monitored, backed up, and recovered.
- Retains seal/unseal and cold-start bootstrapping concerns. Choosing OpenBao does not eliminate the operational complexity raised during the Vault discussion.
- Makes credential-dependent operations reliant on secret-store availability. Services must handle outages without reverting to plaintext storage.
- Requires secure delivery and renewal of machine authentication material. Passing long-lived bootstrap secrets through environment variables is not, by itself, a complete security design.
- Does not eliminate credential exposure from a compromised service authorized to read those credentials.

---

## Non-Goals

- Mandating a specific storage backend, replica count, high-availability topology, or unseal mechanism. Integrated Raft storage is an option, not a requirement for a distributed deployment at every site.
- Selecting a password-generation model, password policy, or exact credential-manager API schema.
- Defining the full rotation transaction, initial credential enrollment, or migration procedure for existing credentials.
- Requiring immediate replacement of all site-managed secret stores or all existing SMD and Magellan integrations.

---

## Points of Contention

- Centralized policy and auditing add operational cost compared with encrypted local storage, particularly at small sites.
- Existing Vault operators may prefer to retain their managed service rather than deploy OpenBao. This ADR establishes a default, not an exclusive backend.
- Air-gapped cold-start recovery requires a site-appropriate bootstrap and unseal design without assuming access to cloud key-management services.

---

## Notes

The earlier discussion favored encrypted local storage before later proposing OpenBao as the default. This ADR records that updated direction; it does not assert that every participant endorsed every implementation detail.

Implementation design must address recovery when a BMC accepts a password change but the secret-store update fails or the process stops. Redfish updates and secret-store writes are not one atomic transaction; simply writing the new password after a successful HTTP response can lose access to the BMC.

---

## References

- [RFD #128: BMC credential storage discussion](https://github.com/OpenCHAMI/roadmap/issues/128)
- [RFD author's support for OpenBao as the default](https://github.com/OpenCHAMI/roadmap/issues/128#issuecomment-6043975746)
- [Credential manager prototype](https://github.com/bmcdonald3/credential-manager)
- [Encrypted local store proposal: hms-securestorage PR #20](https://github.com/Cray-HPE/hms-securestorage/pull/20)
- [RFD #133: Evolve Magellan into the BMC interaction layer](https://github.com/OpenCHAMI/roadmap/issues/133)
- [OpenBao documentation](https://openbao.org/docs/)
- [OpenBao source and license](https://github.com/openbao/openbao)