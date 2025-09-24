# ADR [002]: [API Versioning]

**Date Proposed:** [2025-09-10]

**Status:** [Proposed]

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
- [@jsollom-hpe](https://github.com/jsollom-hpe)
- [@jvd10](https://github.com/jvd10)
- [@yogi4](https://github.com/yogi4)

## Context

The REST APIs in the OpenCHAMI project are primarily inherited from the MIT-licensed code released by HPE as part of CSM.  As we evolve the microservices and APIs, we will need to make breaking changes which invalidate some assumptions of CSM clients.  Because of the way API versioning was handled in CSM, any breaking changes necessitate a major API version change at what we will describe in this ADR as "the group level" which may span multiple microservices.  There is no concept in the APIs or microservices for gradual evolution in which clients can opt-in to new functionality before it becomes a permanent change.

The TSC is contemplating several changes to the schema structures of various resources within OpenCHAMI and wants to outline the process for gradual evolutiuon before embarking on potentially incompatible changes.

OpenCHAMI is not the first project to contemplate these kinds of changes and can draw on expertise from other entities that have published their own reasoning and guidance for their own API-Versioning schemes.

## Decision

After reviewing several possibilities and discussing the issue in person at the Developer summit in September of 2025, we have decided to follow a two-layer versioning system in which both the API group version and the resource schema version are pertinent.  This decision is informed heavily by the [Kubernetes API Versioning Reference](https://kubernetes.io/docs/reference/using-api/#api-versioning).

### Two-Layer Versioning System

OpenCHAMI follows the Kubernetes approach with two distinct versioning layers:

1. **API Group Version** (in the URL path): `/apis/inventory/v2/`

   - Declares the release of the group as a whole.
   - Not a minimum or uniform bound on resources.

2. **Resource Schema Version** (in the request/response payload):

   - Individual resources can be served in multiple versions at once.
   - Group version and resource version do not move in lockstep.

This separation allows the same API group endpoint to serve resources in different schema versions. For example:

- URL remains: `GET /apis/inventory/v3/components/x1001c0s0b0n0`
- Client specifies resource version via Accept header: `Accept: application/json;version=v3beta1`
- Server can serve the same Component resource in both `v2` and `v3beta1` schemas

This design enables individual resources to evolve without requiring a new API group version.

### Group Level Versioning

A group of APIs under a certian url structure are represented together with a version number in the url. i.e: `/inventory/v2`.  The `v2` indicator in this url describes the version of the API.  The group version indicates the stable collection of resources and behavior of those resources within a set of child URLS.

### Resource Level Versioning

Within a versioned group are a set of resources that each have a default version within the group.  The resources themselves do not include their version in the url.  Instead, they include their version within the resource itself in a `schemaVersion` field.  Note that the group version should also be included in the resource schema.

## Request Header Versioning

Clients communicating with a REST API that wish to select a non-standard resource version need a way of indicating what they prefer.  While the header alone is not sufficient for versioning, it is a useful way to indicate intent.

The `Accept:` header will be used for a client indicating to a server that a specific schema version is requested.
The `Content-Type:` header will be used to describe the content being sent.  This include responses from servers as well as payloads delivered by clients

When these headers do not exist, or do not include information about schemas, the server and client can both assume the default schemaVersion for the resource.

- [The Right and Wrong Way to Version Your APIs](https://www.beyondthesemicolon.com/the-right-and-wrong-way-to-version-your-apis/)
- [RESTful API Versioning](https://restfulapi.net/versioning/)
- [A Comprehensive Guide to API Versioning: Paths, Queries, and Headers](https://hackernoon.com/a-comprehensive-guide-to-api-versioning-paths-queries-and-headers)

## Integers vs alphanumeric for indicating stability of versions

The [Google AIP-185 API Versioning](https://google.aip.dev/185) puts the major version number in the URI. The use of the term "major version number" is taken from [semantic versioning at semver.org](https://semver.org/). However, unlike in traditional semantic versioning, Google APIs must not expose minor or patch version numbers. For example, Google APIs use v1, not v1.0, v1.1, or v1.4.2. From a user's perspective, major versions are updated in place, and users receive new functionality without migration. 

We agree with the reasoning from Google on this and have decided only to use the major version number in the URL.

Kubernetes distinguishes stable vs. unstable APIs by version naming:

- `v1`, `v2` → stable
- `v2beta3` → beta (pre-release for v2)
- `v3alpha1` → alpha (experimental)

We agree with this reasoning as well and extend it to both group and resource naming.

- `inventory/v3beta1` -> try it now, but expect breaking changes before v3
- `inventory/v3alpha1` -> highly experimental
- `schemaVersion: v3` -> stable
- `schemaVersion: v4alpha3` -> highly experimental

## Other Options Considered

### Channel and Release based Versioning

[Google AIP-185 API Versioning](https://google.aip.dev/185) describes both release and channel-based versioning and advocates for channel-based.  Both require significant coordination among microservice developers and appear better suited for large, stable API surfaces than those still evolving.

## Consequences

- Existing microservices will need to transition to the new versioning system before we can declare OpenCHAMI ready for a 1.0 release.
- Clients like `ochami` and `manta` will need to accommodate the updates as new urls and schemas become available.
- OpenCHAMI will need to describe a standard schema template for existing and new resources.
- OpenCHAMI TSC will need to define the format of HTTP Headers before this ADR can be accepted.

## Non-Goals

Not applicable

## Points of Contention

Not applicable

## Notes

This ADR describes the decision, but does not prescribe implementation.  The following notes may be useful for discussing future implementation choices.

### Example Schema Gist

```json
{
  "apiVersion": "inventory/v2",          // group-level version (set in the URL too)
  "kind": "Node",                        // resource type
  "schemaVersion": "v3",                 // resource-level schema version (evolves per-kind)
  "metadata": {
    "name": "node47",
    "uid": "a0f3…",
    "labels": { "site": "west1", "tier": "prod" },
    "annotations": { "owner": "team-ops" },
    "createdAt": "2025-09-11T00:00:00Z",
    "updatedAt": "2025-09-24T00:00:00Z",
  },
  "spec": { /* desired state */ },
  "status": { /* observed state */}
}
```

### Accept and Content-Type Header options

1. application/vnd.inventory.component+json;v=v1alpha1 <-- `<Group>.<Resource>+representation;v=version`
2. application/json; profile="https://schemas.example.com/inventory/component/v1alpha1" <-- Public profile schema in jsonSchema format

The first option is more common.  The second option is harder to maintain, but easier for users to troubleshoot/lint.

## References

- [Kubernetes Release Versioning](https://github.com/kubernetes/sig-release/blob/master/release-engineering/versioning.md)
- [Kubernetes API Versioning](https://kubernetes.io/docs/reference/using-api/#api-versioning)
- [Google AIP-185 API Versioning](https://google.aip.dev/185)
- [OpenCHAMI roadmap issue #78](https://github.com/OpenCHAMI/roadmap/issues/78)
- [IETF RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content, specifically the Accept header](https://datatracker.ietf.org/doc/html/rfc7231#section-5.3.2)
- [Github API Versions document](https://docs.github.com/en/rest/about-the-rest-api/api-versions?apiVersion=2022-11-28) describes an alternate method for supplying the version in the header.
