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

API versioning is needed to support resource evolution while maintaining backward compatibility. Several API version schemes have been proposed, but the ones used by Kubernetes and Google APIs more closely match what OpenCHAMI needs.

### Two-Layer Versioning System

OpenCHAMI follows Kubernetes and Google’s approach with two distinct versioning layers:

1. **API Group Version** (in the URL path): /apis/smd/v2/

   - Declares the release of the group as a whole.
   - Not a minimum or uniform bound on resources.

2. **Resource Schema Version** (in the request/response payload):

   - Individual resources can be served in multiple versions at once.
   - Group version and resource version do not move in lockstep.

This separation allows the same API group endpoint to serve resources in different schema versions. For example:

- URL remains: `GET /apis/smd/v3/components/x1001c0s0b0n0`
- Client specifies resource version via Accept header: `Accept: application/json;version=v3beta1`
- Server can serve the same Component resource in both `v2` and `v3beta1` schemas

**NB** In OpenCHAMI terms, we are considering a change to the Component resource to allow the `Id` field to reference non-xname ids.  In the current API Versioning scheme, this change would require moving from v2 to v3 immediately.  With two-level versioning in place, the new Component can be made available as a beta Resource without changing the full group version.  As long as the current v2 behavior is supported as the default in the API, there is no breaking change.

This design enables individual resources to evolve without requiring a new API group version.

#### API Group Versioning

In Kubernetes, API groups extend the API at path levels:

```
/apis/<GROUP_NAME>/<VERSION>
```

and are referenced internally via `<GROUP_NAME>/<VERSION>`.

In OpenCHAMI, HAProxy already plays the role of grouping, making multiple microservices appear to be one API.
If we treat `smd` as a single API group, `v2` indicator in the url below indicates that the second stable version of the smd api is present at the url.

```
https://openchami.system.site/apis/smd/v2/
```

This would allow us to reference `smd/v2` as a unit in documentation and releases, and to advertise support for specific group versions per deployment. Internally, `smd` itself would still route requests via `/v2` in its own API router.

#### Resource-Level Versioning

In Kubernetes as well as in the linked Google AIP-185 below, versioning happens at the resource schema level as well as the API group version.

For example:

- The API group might be `/apis/apps/v1`
- Within it, a `Deployment` resource might have multiple served versions (`v1`, `v1beta1`) with one storage version.
- There is no presumption that resource versioning is tied in any way to group versioning.  It is totally permissable for a `v3` group API to contain schemas for resources at `v1` or even `v17`

### Integers vs alphanumeric for versions

The [Google AIP-185 API Versioning](https://google.aip.dev/185) puts the major version number in the URI. The use of the term "major version number" is taken from [semantic versioning at semver.org](https://semver.org/). However, unlike in traditional semantic versioning, Google APIs must not expose minor or patch version numbers. For example, Google APIs use v1, not v1.0, v1.1, or v1.4.2. From a user's perspective, major versions are updated in place, and users receive new functionality without migration. For this reason, this RFD suggests only using the major version number in the URL.

Kubernetes distinguishes stable vs. unstable APIs by version naming:

- `v1`, `v2` → stable
- `v2beta3` → beta (pre-release for v2)
- `v3alpha1` → alpha (experimental)

We currently only use whole integers. Borrowing Kubernetes’ pattern would let us signal stability to clients, for example:

- smd/v3beta1 → try it now, but expect breaking changes before v3
- smd/v3alpha1 → highly experimental

### Code Example

```go
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
)

// ---------- Resource versions ----------

// Legacy schema (clients still use this)
// apiVersion: smd.openchami.io/v2
type ComponentV2 struct {
	APIVersion string `json:"apiVersion"` // "smd.openchami.io/v2"
	Kind       string `json:"kind"`       // "Component"
	ID         string `json:"id"`         // xname-as-id (legacy)
	// ... other legacy fields ...
}

// New/storage schema (what we persist)
// apiVersion: smd.openchami.io/v3beta1
type ComponentV3 struct {
	APIVersion string          `json:"apiVersion"` // "smd.openchami.io/v3beta1"
	Kind       string          `json:"kind"`       // "Component"
	ID         string          `json:"id"`         // opaque id
	Location   ComponentLoc    `json:"location"`   // holds xname
	// ... evolved fields ...
}
type ComponentLoc struct {
	XName string `json:"xname"`
}

// ---------- Converters (hub-and-spoke style) ----------

func (v2 *ComponentV2) ToV3(storageID string) ComponentV3 {
	// storageID is the opaque id we mint/lookup for this xname
	return ComponentV3{
		APIVersion: "smd.openchami.io/v3beta1",
		Kind:       "Component",
		ID:         storageID,
		Location:   ComponentLoc{XName: v2.ID},
	}
}

func (v3 *ComponentV3) ToV2() ComponentV2 {
	return ComponentV2{
		APIVersion: "smd.openchami.io/v2",
		Kind:       "Component",
		ID:         v3.Location.XName, // surface xname as "id" for legacy clients
	}
}
```

## Decision

Versioning of APIs will be done using the Kubernetes API versioning scheme with release-based versioning.

See Kubernetes API versioning. [Kubernetes API Versioning](https://kubernetes.io/docs/reference/using-api/#api-versioning)

See Release-based versioning as described by Google API Versioning. [Google AIP-185 API Versioning](https://google.aip.dev/185) 

## Other Options Considered

### Channel-based Versioning

The Kubernetes/Google API Channel-based versioning is an alternative to the Kubernetes/Google API Release-based versioning which has only three channels: stable, beta, and alpha (expermental). See [Google AIP-185 API Versioning](https://google.aip.dev/185) for more comparision of these two different versioning methods.

### Request Header Versioning

The version could be specified in the request HEADER.
Example: `GET /users` with header `Accept: application/vnd.myapi.v2+json`

Pros:

- Clean URLs.
- Can support multiple representations or minor variations.
- Encouraged in REST-style APIs.

Cons:

- Harder for humans to discover.
- Not cache-friendly.
- Poor support in some tools or proxies.

## Consequences

Some of the existing services in OpenCHAMI may need to be updated to handle the range of new version strings for the APIs which are part of [OpenCHAMI roadmap issue #78](https://github.com/OpenCHAMI/roadmap/issues/78) and this ADR.

The CLI tools (`ochami` and `manta`) which communicate with the OpenCHAMI APIs will need to be updated to use the stable version of the APIs or, where appropriate, a beta or alpha version to explore the different API versions and the capability of the services providing the API groups.

## Non-Goals

Not applicable

## Points of Contention

Not applicable

## Notes

Not applicable

## References

- [Kubernetes Release Versioning](https://github.com/kubernetes/sig-release/blob/master/release-engineering/versioning.md)
- [Kubernetes API Versioning](https://kubernetes.io/docs/reference/using-api/?utm_source=chatgpt.com#api-versioning)
- [Google AIP-185 API Versioning](https://google.aip.dev/185)
- [OpenCHAMI roadmap issue #78](https://github.com/OpenCHAMI/roadmap/issues/78)
- [IETF RFC 7231 - Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content, specifically the Accept header](https://datatracker.ietf.org/doc/html/rfc7231#section-5.3.2)
- [Github API Versions document](https://docs.github.com/en/rest/about-the-rest-api/api-versions?apiVersion=2022-11-28) describes an alternate method for supplying the version in the header.
