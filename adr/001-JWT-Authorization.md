# ADR [001]: JWTs for OpenCHAMI Authorization

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

---

## Context

OpenCHAMI microservices need to validate that each request is authorized before it can proceed. To avoid the overhead and inconsistency of each service independently authenticating clients, the architecture must rely on an external authentication provider at the site level. That provider issues signed JWTs (JSON Web Tokens), which microservices consume for authorization decisions.  

This approach aligns with established open standards ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519), [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725), [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)) and leverages extended claims to provide the context needed for secure, granular access control across a distributed microservice environment.

---

## Decision

1. **Use signed JWTs for authorization at the microservice level.**  
   Each microservice will require a valid, signed JWT for any protected endpoint. JWTs must be signed with approved algorithms and verified against the site’s public keys.  

2. **Require extended claims as referenced in standards.**  
   Tokens must contain both standard claims (`iss`, `sub`, `aud`, `exp`, `iat`, `nbf`, `jti`) and extended claims (`auth_time`, `acr`, `amr`, `azp`, `scope`, and role/group/entitlement claims where needed). Validation of these claims will be mandatory for request acceptance.  

3. **Provide a centralized chi middleware for validating claims.**  
   A shared Go chi middleware will perform signature validation, enforce required claims, and ensure consistency across all services. This reduces duplication, ensures uniform enforcement, and simplifies ongoing maintenance.

   [Tokensmith Middleware](https://github.com/OpenCHAMI/tokensmith/tree/main/middleware)  

---

## Other Options Considered

- **Per-service custom validation:** Each microservice could implement its own JWT parsing and claim validation. This was rejected due to duplication, increased risk of inconsistent enforcement, and higher maintenance burden.  
- **Opaque tokens with centralized introspection:** Tokens could be opaque identifiers resolved via an introspection endpoint. This was discarded because it introduces statefulness, additional latency, and external dependencies for each request.  
- **Session-based authentication:** Not feasible for stateless, scalable microservices; would add complexity and reduce portability.  

---

## Consequences

- **Positive:**  
  - Consistent enforcement of authorization across services.  
  - Reduced risk of implementation errors.  
  - Scalable and stateless authorization model.  
  - Easier audits and debugging through standardized claims.  

- **Negative:**  
  - Requires robust key management and rotation.  
  - Middleware must handle JWKS caching and refresh to avoid availability issues.  

- **Implementation:**
Each service should include the chi middleware from [tokensmith](https://github.com/openchami/tokensmith) to validate JWTs  

---

## Non-Goals

- Defining how clients obtain JWTs from the site’s authentication provider.  
- Covering inter-service authentication (mTLS, service accounts, etc.).   

---

## Points of Contention

- Level of strictness and number of required claims
- Internal microservice policy processing for permissions

---

## Notes

- Middleware will expose structured errors and logs for rejected requests.  
- Extended claims will be versioned and documented to avoid breaking changes.  
- [RFC 8725](https://datatracker.ietf.org/doc/html/rfc8725) best practices (e.g., algorithm whitelisting, critical header checks) must be enforced.  

### Required Claims Table

| Claim       | Required/Optional | Description                                                                 |
|-------------|------------------|-----------------------------------------------------------------------------|
| **iss**     | Required         | Issuer – must match the configured trusted identity provider.                |
| **sub**     | Required         | Subject – unique identifier for the authenticated user.                      |
| **aud**     | Required         | Audience – must include the microservice or API being accessed.              |
| **exp**     | Required         | Expiration time – token must be rejected if expired.                         |
| **iat**     | Required         | Issued At – must be validated against acceptable clock skew.                  |
| **nbf**     | Optional         | Not Before – if present, request must be after this time.                     |
| **jti**     | Recommended      | JWT ID – unique identifier, useful for replay protection.                     |
| **auth_time** | Recommended    | Time of end-user authentication.                                             |
| **acr**     | Recommended      | Authentication Context Class Reference (e.g., assurance level).              |
| **amr**     | Recommended      | Authentication Methods Reference (e.g., MFA, password, hardware token).      |
| **azp**     | Recommended      | Authorized party – useful when multiple clients are in play.                  |
| **scope**   | Required         | Scopes granted to the client/user.                                           |
| **roles / groups / entitlements** | Required if applicable | Authorization claims used to determine service- or resource-level access. |
| **email / email_verified** | Optional | Identity attributes; required only if downstream services rely on them. |

---

## References

- [OpenCHAMI roadmap issue #11](https://github.com/OpenCHAMI/roadmap/issues/11)  
- [OpenCHAMI roadmap issue #87](https://github.com/OpenCHAMI/roadmap/issues/87)  
- [RFC 7519: JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)  
- [RFC 8725: JWT Best Current Practices](https://datatracker.ietf.org/doc/html/rfc8725)  
- [OpenID Connect Core Spec](https://openid.net/specs/openid-connect-core-1_0.html)
- [Tokensmith](https://github.com/openchami/tokensmith)
