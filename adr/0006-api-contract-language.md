---
id: 0006
title: "API Contract Language"
status: "Proposed"
date: "2025-09-23"
---

# ADR 0006: API Contract Language

**Date Proposed:** 2025-09-23 (Items should close after 6 weeks of discussion based on consensus)

**Status:** Proposed

**Participants**
 - @alexlovelltroy
 - @jsollom-hpe
 
---

## Context

OpenCHAMI is composed of multiple microservices, each providing APIs that must be discoverable and interoperable. To ensure consistency across services, client developers and integrators need a clear and machine-readable definition of the APIs.  

The OpenAPI Specification (OAS) is an industry-standard format for describing REST APIs, supporting both human readability and automated tooling for client generation, validation, and documentation. Ensuring all OpenCHAMI microservices publish an OpenAPI contract will align with established practices and improve long-term maintainability.  

This ADR builds upon [ADR-002: API Versioning](https://github.com/OpenCHAMI/community/blob/main/adr/002-API-Versioning.md), ensuring that all published OpenAPI contracts remain compatible with the versioning strategy defined there.

---

## Decision

All microservices developed within OpenCHAMI **must publish an OpenAPI specification** describing their APIs.  

- The OpenAPI spec should cover all exposed endpoints, input/output models, and authentication mechanisms.  
- The spec must remain consistent with the API versioning policies outlined in [ADR-002](https://github.com/OpenCHAMI/community/blob/adr/002-API-Versioning/adr/002-API-Versioning.md).  
- Both of the following approaches are considered valid for generating OpenAPI specifications:
  - **Design-first:** using [TypeSpec](https://typespec.io/docs/getting-started/getting-started-rest/01-setup-basic-syntax/) to author the OpenAPI.yaml before implementation.  
  - **Code-first:** using [swag](https://github.com/swaggo/swag) to generate the OpenAPI.yaml from code comments.  
- Neither approach is mandated; both are currently in use within OpenCHAMI. Teams may choose based on service needs and developer expertise.  
- Clients written to interact with the OpenAPI spec should work without modification. Any issues with compliance should be reported as bugs and fixed promptly.


---

## Other Options Considered

- **No standardized API contract format**  
  - Rejected because it would lead to fragmented documentation and increase integration costs.  

- **Mandating a single generation tool (TypeSpec or swag only)**  
  - Rejected because teams already use both approaches, and forcing one path could stifle productivity or adoption.  

---

## Consequences

- **Positive**  
  - Uniformity across services, making client development and service integration easier.  
  - Automated client generation and validation becomes straightforward.  
  - Early detection of API breaking changes through OpenAPI linting and validation.  

- **Negative**  
  - Requires initial setup and discipline to maintain specs in sync with implementation.  
  - Inconsistent quality of generated specs may occur if teams don’t validate output.  
  - Some developers may face a learning curve with TypeSpec or swag.  

---

## Non-Goals

- This ADR does **not** mandate the use of a single toolchain (TypeSpec vs swag).  
- This ADR does **not** define a style guide for API design (e.g., naming conventions, pagination patterns).  
- This ADR does **not** address non-REST API paradigms (e.g., gRPC, GraphQL).
- There are several proposed standards for how to advertize and share the OpenAPI description of the microservice.  None have gained enough traction to be included in this decision.  
  - [RFC 8631](https://datatracker.ietf.org/doc/html/rfc8631) Describes the use of link headers for every response that contain a `service-desc` relation
  - [RFC 9727](https://datatracker.ietf.org/doc/rfc9727/) Encourages the use of `/.well-known/api-catalog` to collect information about included APIs in a microservice architecture

---

## Points of Contention

- Preference for **design-first (TypeSpec)** vs **code-first (swag)** workflows. Some teams may advocate for consistency by mandating one, while others value flexibility.  

---

## Notes

- Future ADRs may cover standardization of API style guides, testing strategies, or linting rules.  
- Documentation portals (e.g., Swagger UI, Redoc) can be automatically generated from OpenAPI specs for better discoverability.  

---

## References

- [ADR-002: API Versioning](https://github.com/OpenCHAMI/community/blob/main/adr/002-API-Versioning.md)  
- [TypeSpec Documentation](https://typespec.io/docs/getting-started/getting-started-rest/01-setup-basic-syntax/)  
- [swag Documentation](https://github.com/swaggo/swag)
- [RFD #88](https://github.com/OpenCHAMI/roadmap/issues/88)
