# OpenCHAMI Special Interest Groups

Most discussion of new inclusions to OpenCHAMI or modifications to existing code will first happen through special interest groups.  These groups are created through a proposal to the TSC and follow certain activity and participation guidelines.  They are intended to be the primary venue for domain experts to discuss ideas before they are ready to be approved/discussed at the full TSC level.

## Current SIGs

| Name | Description | Leader(s) | Links | Status |
|------|-------------|-----------|-------|--------|
| Security | Enforcing a cloud security model for HPC system management | @jeremy-duckworth | [SIGs/Security](/SIGS/Security) | Active |
| Multi-Tenancy |  Providing a cloud-like interface to allow operators to configure tenancy on HPC systems | @mdklein | [SIGS/Multi-Tenancy](/SIGs/Multi-Tenancy) | Active |
|      |             |           |       |        |


## SIG Roles and Organizational Governance 

In order to standardize Special Interest Group efforts, create maximum transparency, and route contributors to the appropriate SIG, SIGs should follow these guidelines:

- Create a charter and have it approved by the TSC
- Meet regularly (minimum monthly) for at least 30 minutes and publish meeting notes
- Provide an annual report to the TSC via a Pull Request to this repsitory

## SIG Statuses

Special Interest Groups are expected to come and go as needed through the lifecycle of the project.  They can be in any of the following states.  Inactive SIGs can be reconsituted by resubmitting a charter to the TSC and restarting regular meetings.

* **ACTIVE** All governance a participation guidelines are being met and the meetings and annual reports are published in a timely fashion
* **FORMING** There is some interest in a SIG, but the TSC has not yet approved it, likely because the governance is somehow incomplete or the membership is too small.
* **DISBANDING** The SIG has decided to discontinue the SIG pending a final set of meetings/reports.
* **INACTIVE** When a SIG is unable to regularly establish consistent quorum or otherwise fulfill its Organizational Management responsibilities.


## Roles

### Notes on Roles

Within this section "Lead" refers to someone who is a member of the union of a Chair, Tech Lead or Subproject Owner role. There is no one lead to any OpenCHAMI community group. Leads have specific decision making power over some part of a group and thus additional accountability. Each role is detailed below.

### Activity Expectations

- Leads SHOULD remain active and responsive in their Roles.
- Leads taking an extended leave of 1 or more months SHOULD coordinate with other leads to ensure the role is adequately staffed during the leave.
- Leads going on leave for 1-3 months MAY work with other Leads to identify a temporary replacement.
- Leads of a role SHOULD remove any other leads or roles that have not communicated a leave of absence and either cannot be reached for more than 1 month.
- Lead not fulfilling their documented responsibilities for more than 1 month MAY be removed from the SIG by the TSC.

### Requirements

- Leads MUST be a member of the OpenCHAMI github organization.
- SIGs MAY prefer various levels of domain knowledge depending on the role. This should be documented.

### Escalations

- Lead membership disagreements MAY be escalated to the TSC.



### Tech Lead

- Optional Role: SIG Technical Leads
    - Establish new subprojects
    - Decommission existing subprojects
    - Resolve X-Subproject technical issues and decisions
    - Number: 2-3
    - Membership tracked in sigs.yaml
    - Role description in technical-lead.md

### All Leads

- SHOULD maintain health of at least one subproject or the health of the SIG
- SHOULD show sustained contributions to at least one subproject or to the SIG
- SHOULD hold some documented role or responsibility in the SIG and / or at least one subproject (e.g. reviewer, approver, etc)
- MAY build new functionality for subprojects
- MAY participate in decision making for the subprojects they hold roles in
- Includes all reviewers and approvers in OWNERS files for subprojects
- MUST take an inclusive speaker training course in support of our community values within 30 days from the date of their appointment.

## Priocesses

### Technical processes

Subprojects of the SIG MUST use the following processes unless explicitly following alternatives they have defined.

- Proposing and making decisions

    - Proposals sent as RFD PRs
    - Follow RFD decision making process

- Test health

    - Canonical health of code published to dashboard
    - Consistently broken tests automatically send an alert to their google group..

### SIG Retirement

- In the event that the SIG is unable to regularly establish consistent quorum or otherwise fulfill its Organizational Management responsibilities
    - after 3 or more months it SHOULD be retired
    - after 6 or more months it MUST be retired