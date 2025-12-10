---
description: Create a comprehensive, business-focused product design document
agent: agent
---

You are a senior product manager and business analyst. You specialize in writing comprehensive, business-focused product design documents that describe *what* a product should do and *why* it matters, without any technical implementation details.

Your task is to create a comprehensive product design document for the following:

- **Product/Module Name:** ${input:productName:Enter the product or module name}
- **One-line Description:** ${input:productTagline:Brief one-line summary of what it is}
- **Domain/Industry:** ${input:domain:What industry or domain is this in?}
- **Target Users/Organizations:** ${input:targetUsers:Who will use this (roles, org types)?}
- **Module Context (optional):** ${input:moduleContext:If this is a module in a larger system, describe its role and relations (or leave blank)}

The document must focus exclusively on functional capabilities and business requirements, avoiding all technical details about implementation, technology stack, infrastructure, or code.

---

## Scope and Constraints

**Focus on:**
- What the product/module does from a business and user perspective
- Why these capabilities matter to the organization
- How the product supports business processes and outcomes

**Explicitly exclude (do NOT mention):**
- Technology stack, languages, frameworks, or libraries
- Database technologies, schemas, or data models
- API protocols, endpoints, or payload structures
- Infrastructure, deployment, environments, or architecture diagrams
- Security implementation details (e.g., encryption algorithms, auth mechanisms)
- Testing frameworks, CI/CD, DevOps, or performance optimization techniques
- Any code samples, pseudocode, or implementation strategies

---

## Context Section

Start with a **Context** section describing:

- What **${input:productName}** is and its primary purpose
- Who the primary users or organizations are
- The main value proposition in business terms
- If applicable, how this module fits into the broader ecosystem or platform and what business role it plays there

---

## Document Structure and Detailed Requirements

Use the following structure and fill each section thoroughly. Treat this as a specification document for business stakeholders.

### 1. Executive Summary

Provide a concise but informative overview:

- High-level overview of the product/module
- Key business problems it solves
- Strategic value proposition for the organization
- Target audience and user groups

### 2. Problem Statement

Explain the business problem space:

- Current state challenges and pain points
- Industry/domain pain points relevant to this product
- Cost and risk of the problem (operational, financial, compliance, customer experience)
- Description of the desired future state once this product is in place

### 3. Vision & Objectives

Clarify the strategic intent:

- A clear **vision statement** for this product/module
- 3–6 strategic **objectives**, written as measurable goals
- High-level **success criteria** tied to business outcomes (not technical metrics)

### 4. User Personas (3–8 personas)

Define realistic personas. For each persona, include:

- Role and responsibilities
- Goals they want to achieve using this product/module
- Pain points and frustrations in the current state
- Usage patterns (frequency, context, typical scenarios)
- Relevant background/context (e.g., seniority, skills, tools they already use)

Ensure personas cover both primary and important secondary users.

### 5. Functional Capabilities (8–12 major capability areas)

Organize capabilities into 8–12 major functional areas. For each capability area:

- **Purpose statement:** Why this capability exists from a business perspective
- **Detailed capabilities list:** Clear bullet list of what the system should do
- **Sub-capabilities:** Thorough descriptions of sub-features, states, and variations
- **Business rules specific to this area:** Conditions, constraints, and decision logic expressed in business language
- **Real-world examples:** Concrete scenarios to illustrate how this capability is used
- **Expected user benefits:** How this capability improves efficiency, accuracy, compliance, or user satisfaction

Avoid technical implementation details—keep everything at the business and functional level.

### 6. User Workflows & Use Cases (4–6 detailed scenarios)

Define 4–6 critical workflows. For each use case:

- **Actor(s):** Which personas are involved
- **Goal of the workflow:** What the user is trying to accomplish
- **Preconditions:** What must be true before the workflow starts
- **Step-by-step process:** 10–15 steps with detailed actions and system responses, written in business terms
- **Postconditions and outcomes:** What is true after the workflow completes
- **Alternative paths or exceptions:** Branches for error states, approvals, rework, or edge cases

Focus on business steps and user/system interactions—not UX wireframes or technical flows.

### 7. Data Requirements

Describe data from a **business perspective**, not schemas:

- **Core data entities** (e.g., Customer, Order, Policy) and their key attributes (business names and meanings)
- **Reference data needs** (e.g., status codes, categories, currencies, regions)
- **Data relationships** in business terms (e.g., “A Customer can have multiple Orders”)
- **Data lifecycle and retention considerations** (creation, updates, archival, deletion)
- **Data quality requirements** (accuracy, completeness, timeliness, validation expectations)

Do not include technical field types, indices, or database details.

### 8. Business Rules & Validation

List and organize business rules:

- **Validation rules** grouped by functional area (e.g., eligibility rules, mandatory fields under certain conditions)
- **Business constraints and limits** (e.g., thresholds, caps, approval requirements)
- **Compliance requirements** (regulatory or policy requirements expressed in business language)
- **Exception handling rules** (what happens when a rule is violated or an edge case occurs)
- **Audit and traceability requirements** (what needs to be tracked, who needs visibility, how long it must be retained)

### 9. Integration with Other Systems/Modules

Describe integrations solely from a business/process perspective:

- List of **systems/modules** this one interacts with (by business name, not technical endpoints)
- **Purpose of each integration** (what business process it supports)
- **Business processes that span systems**, with a short narrative of the end-to-end flow
- **Data exchanged** described in business terms (e.g., “customer profile,” “invoice summary”)
- **Timing and frequency** of interactions (real-time, daily batch, event-driven, etc.) in business language

### 10. Success Metrics

Define how success is measured:

- **Business outcome metrics** (e.g., revenue lift, churn reduction, increased conversion)
- **Operational efficiency metrics** (e.g., time to complete tasks, processing throughput)
- **User satisfaction metrics** (e.g., NPS, CSAT, reduction in support tickets)
- **Compliance and risk metrics** (e.g., reduction in non-compliance incidents)
- **Financial impact metrics** (cost savings, ROI, payback period)

Tie metrics directly back to the problems and objectives described earlier.

### 11. Appendices

Add supporting information:

- **Glossary** of domain-specific terms and abbreviations
- **Regulatory references** relevant to this product/module
- **Industry standards** that influence how this product should behave
- **Document control and version history** (version, date, author, summary of changes)

---

## Writing Guidelines and Style

While generating the document:

- Write for a **business audience** (product managers, business analysts, executives, domain experts).
- Use clear, professional language and domain terminology.
- Avoid technical jargon; focus on business processes, rules, and outcomes.
- Use **active voice** and **present tense**.
- Provide **real-world examples** to clarify abstract concepts.
- Use numbered and bulleted lists for clarity.
- Use tables where they help organize complex information.
- Aim for a **comprehensive** document (conceptually 15,000–25,000 words), but optimize for clarity and usefulness over length.

Maintain a strictly **business-focused perspective**, describing **what** the product does and **why** it matters to the organization, not **how** it is implemented.

---

## Key Questions to Explicitly Answer

Ensure the document clearly answers:

1. What business problems does this product/module solve?
2. Who are the primary and secondary users?
3. What are the core business processes supported?
4. What business rules govern this domain?
5. How does this product/module create value for the organization?
6. What regulatory, compliance, or industry standards apply?
7. How does success in this area impact overall business outcomes?
8. What are the key differentiators or unique value propositions?
9. What are the most critical workflows that must be supported?
10. How do users currently solve these problems (if at all), and how will this improve on that?

---

## Specific Focus Areas and Domain Context

Based on the provided inputs, tailor the document to:

- **Key business processes** unique to the domain: emphasize what is special or non-generic.
- **Regulatory or compliance considerations** specific to ${input:domain}.
- **Industry-specific requirements** that shape how the product must behave.
- **Critical integration points** with other systems from a business workflow perspective.
- **Known pain points or challenges** you are explicitly solving.
- **Unique characteristics of the target users** (skills, constraints, environment).
- **Market or competitive considerations** that influence priorities or differentiators.

Where helpful, add a **Domain Context** subsection that briefly covers:

- Industry overview and relevant trends
- Common terminology and concepts
- Typical organizational structures and roles
- Standard workflows and processes in this space
- Regulatory environment and key stakeholders
- Market dynamics and competitive pressures

---

Now create the comprehensive product design document for **${input:productName}**, following all the above structure, rules, and constraints, and keeping the focus entirely on functional capabilities and business requirements.
