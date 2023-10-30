# Architecture Principles

## It's not done until it is done.

All contributions must have:

* Tests for validation (unit/integration/performance as appropriate)
* Security Impact Assessments
* Usage and Integration Documentation


## Less is more

Operational burden is more impactful than hardware cost in the lifetime of an HPC system.  The more people are involved in managing software, the greater the chance that they may make a mistake and cause downtime.  Don't introduce new software for admins to understand unless the overall operational benefit is far greater than the administrative burden.

## Authentication and Authorization must be flexible

The shared `root`/`superuser` account is becoming less common with the rise of policy-based access control primitives.  In its place, systems are trending toward the principle of least privilege with both Role Based Access Control (RBAC) and Access Policy engines like Rego within Open Policy Agent.  The focus of access control should be around the action itself rather than the person exercising that action.  "Does this user have Update permissions on this Object?" is better than "Is this person in the Admin group in LDAP?"

## Horizontal Scale is better than Vertical Scale

Ochami is intended for the largest HPC systems, but needs to be valuable for the smallest as well.  Admins learn on small systems in order to optimize for uptime on the big ones. Wherever possible, adding an additional instance of a microservice should linearly scale the performance of the service.  As a consequence, internal locking/semaphores are discouraged.  Other cloud patterns are encouraged.

## Distributed Systems are hard.  Avoid them where possible.

As a corollary of the rule on horizontal scale is this one.  While ochami is inherently a distributed system, not every microservice needs to suffer from distributed systems problems.  For instance, most data in an HPC management system is fairly static.  The physical characteristics of the system aren't likely to change from minute to minute.  Services that load the physical representations at start up and periodically refresh them based on usage are more effective than those that attempt to check the actual state of every object on every use.  In addition, usage of a central database can introduce troubleshooting problems.  One alternative is to reference flat files from an object store that can be downloaded on startup.

## Troubleshooting > Upgrade > Installation

Admin users need tools to keep jobs running, even when parts of the system are experiencing challenges.  Develop software that is usefully verbose in error conditions and relatively silent in normal operation.  Make that software as easy as possible to upgrade without system downtime.  Finally, ensure that installation is just a special case of upgrade in which the software is getting bootstrapped.