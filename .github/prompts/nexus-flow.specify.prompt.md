---
description: Generate a high-level process flow with major tasks and phases for any business process.
---

## User Input

```text
$ARGUMENTS
```

Process name and industry/domain context MUST be provided in the arguments.

## Goal

Generate a high-level process flow document that identifies the major tasks or phases from process initiation to completion. The output should focus on strategic process stages rather than detailed steps, providing a clear overview of the key activities without implementation specifics.

## Operating Constraints

**DIRECT OUTPUT**: Generate content directly into the current document. Do NOT read or write external files.

**FORMAT COMPLIANCE**: Strictly follow the established formatting rules:
- Use markdown formatting
- Use numbered list format (1., 2., 3., etc.)
- Each task should be a single, descriptive phrase
- NO descriptions or additional details
- Task names should be self-explanatory
- Focus on WHAT is accomplished, not HOW

**TASK NAMING REQUIREMENTS**:
- Use clear, descriptive task names that stand alone
- Combine related activities into logical groupings
- Each task represents a major phase or activity cluster
- Use "and" to combine closely related activities (e.g., "Intake and registration")
- Aim for 8-15 high-level tasks total
- Tasks should flow in logical chronological order

## Execution Steps

### 1. Parse Input Context

Extract from user arguments:
- Process name
- Industry/domain
- Any specific requirements or constraints
- Special steps to include/exclude

### 2. Identify Major Process Phases

Analyze the process to identify 8-15 high-level tasks that represent major phases or activity clusters. Consider these typical process stages:

**Initiation:**
- Intake, notification, or request submission
- Registration and case creation

**Preparation:**
- Document and information collection
- Data gathering and assembly

**Verification:**
- Identity and party validation
- Status and eligibility confirmation
- Compliance and regulatory checks

**Analysis:**
- Review and assessment activities
- Risk evaluation
- Calculation and determination

**Decision:**
- Approval processes
- Authorization activities

**Execution:**
- Transaction processing
- Payment or fulfillment
- Implementation activities

**Finalization:**
- Communication and notification
- Documentation and closure
- Archival and record-keeping

**Post-Process:**
- Quality assurance
- Follow-up activities
- Monitoring

### 3. Group Related Activities

Combine related activities into logical high-level tasks:
- Group verification activities together (e.g., "Party and entitlement verification")
- Combine calculation and determination activities (e.g., "Financial determination and benefit calculation")
- Merge approval and execution when tightly coupled (e.g., "Approval and payment execution")
- Use descriptive conjunctions: "and", "or" when appropriate

### 4. Generate Output Structure

Produce markdown with a single simple list:

- Title: "# [Process Name] Process Flow" or "# [Process Name] Process"
- Bullet list of 8-15 high-level tasks
- Each task as a single bullet point with descriptive name only
- NO numbering, descriptions, or sub-items
- Tasks in logical chronological order

### 5. Apply Quality Standards

Ensure output includes:
- 8-15 high-level tasks (not detailed steps)
- Complete process coverage from initiation to closure
- Logical chronological flow
- Clear, self-descriptive task names
- Related activities appropriately grouped
- NO implementation details or technical specifics
- NO descriptions or explanatory text

## Output Format Template

The output should follow this structure:

# [Process Name] Process Flow

1. Task name describing major activity or phase
2. Another task name grouping related activities
3. Task combining closely related items
4. Continue through all major phases
5. Final task for closure and post-process

## Example: Life Insurance Claims Process

# Life Insurance Claims Process Flow

1. Claim intake and registration
2. Party and entitlement verification
3. Policy status and coverage confirmation
4. Death verification
5. Contestability and misrepresentation review
6. Fraud, sanctions, and compliance checks
7. Financial determination (benefit calculation)
8. Payout method selection and setup
9. Approval and payment execution
10. Communications and closure
11. Post-claim activities

## Operating Principles

### Content Quality

- **High-level focus**: Identify major phases, not detailed steps
- **Comprehensive coverage**: Include all process stages from trigger to completion
- **Clear task naming**: Each task name should be self-explanatory without additional description
- **Logical grouping**: Combine related activities under single task names
- **Industry alignment**: Use terminology appropriate to the domain

### Format Consistency

- **Numbered list**: Use standard markdown numbered list format (1., 2., 3., etc.)
- **Sequential numbering**: Tasks are numbered sequentially from 1 to N
- **No descriptions**: Task names stand alone without explanatory text
- **Logical flow**: Tasks should follow chronological process order
- **Appropriate scope**: 8-15 tasks total for most processes

### Task Naming Standards

- **Descriptive and concise**: Names clearly indicate what is accomplished
- **Action-oriented**: Use nouns and verbs that convey activity (e.g., "verification", "determination", "execution")
- **Grouped logically**: Use "and" to combine tightly related activities
- **Implementation-agnostic**: No technical details or methods in names

## Context

$ARGUMENTS