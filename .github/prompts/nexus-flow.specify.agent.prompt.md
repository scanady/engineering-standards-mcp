---
description: Generate a high-level process flow with automation annotations and agent architecture recommendations for agentic AI system design.
agent: agent
---

## User Input

```text
$ARGUMENTS
```

Process name and industry/domain context MUST be provided in the arguments.

## Goal

Generate a high-level process flow document that identifies the major tasks or phases from process initiation to completion, with annotations to support agentic AI system design. The output should focus on strategic process stages rather than detailed steps, providing a clear overview of key activities, automation potential, agent boundaries, and system integration requirements.

## Operating Constraints

**DIRECT OUTPUT**: Generate content directly into the current document. Do NOT read or write external files.

**FORMAT COMPLIANCE**: Strictly follow the established formatting rules:
- Use markdown formatting
- Use numbered list format (1., 2., 3., etc.)
- Each task should be a single, descriptive phrase
- Add agent design annotations in brackets after task name
- Task names should be self-explanatory
- Focus on WHAT is accomplished, not HOW

**AGENT DESIGN ANNOTATIONS**: Each task should include the following annotations in brackets:

**Automation Level:**
- `[Fully Automated]` - Can be performed entirely by AI agents without human intervention
- `[AI-Assisted]` - AI agent performs task with human oversight or approval
- `[Human-Led]` - Primarily human task with AI support/recommendations
- `[Human-Only]` - Requires human judgment, not suitable for automation

**Optional Additional Annotations:**
- `[Parallel]` - Can be performed in parallel with other tasks
- `[Decision Point]` - Requires decision-making logic or rules engine
- `[External System]` - Requires integration with external systems/APIs
- `[Human Escalation]` - May require escalation to human based on conditions
- `[Validation Required]` - Output requires validation before proceeding

**TASK NAMING REQUIREMENTS**:
- Use clear, descriptive task names that stand alone
- Combine related activities into logical groupings for a given agent
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

### 3a. Identify Domain-Appropriate Agent Roles

Research typical human roles in the domain and use those as agent names:
- Study the industry's organizational structure
- Identify standard job titles/roles (e.g., Claims Examiner, Underwriter, Loan Officer)
- Use role names that practitioners would recognize
- Maintain industry terminology conventions

**Example Domain Roles:**

**Insurance:**
- Claims Examiner, Claims Adjuster, Claims Investigator
- Underwriter, Underwriting Assistant
- Policy Service Representative, Customer Service Specialist
- Fraud Investigator, Special Investigator
- Use pattern: "[Role] Agent" (e.g., "Claims Examiner Agent", "Underwriter Agent")

**Banking:**
- Loan Officer, Loan Processor
- Underwriter, Credit Analyst
- Compliance Officer, KYC Analyst
- Wire Transfer Specialist, Payment Processor
- Use pattern: "[Role] Agent" (e.g., "Loan Officer Agent", "Credit Analyst Agent")

**Healthcare:**
- Registrar, Patient Access Coordinator
- Authorization Coordinator, Prior Auth Specialist
- Medical Coder, Claims Examiner
- Billing Specialist, Collections Agent
- Use pattern: "[Role] Agent" (e.g., "Prior Auth Specialist Agent", "Medical Coder Agent")

**E-commerce:**
- Order Fulfillment Associate, Warehouse Picker
- Customer Service Representative, Returns Specialist
- Inventory Manager, Shipping Coordinator
- Use pattern: "[Role] Agent" (e.g., "Order Fulfillment Agent", "Returns Specialist Agent")

**Human Resources:**
- HR Coordinator, Onboarding Specialist
- Benefits Administrator, Compensation Analyst
- Performance Management Specialist, HR Business Partner
- Use pattern: "[Role] Agent" (e.g., "Onboarding Specialist Agent", "Benefits Administrator Agent")

### 4. Generate Output Structure

Produce markdown with a process flow list followed by agent architecture section:

**Process Flow:**
- Title: "# [Process Name] Process Flow"
- Numbered list of 8-15 high-level tasks
- Each task with automation level annotation
- Additional annotations as applicable
- Tasks in logical chronological order

**Agent Architecture Considerations:**
- Suggested agents (which tasks belong to which agents)
- Key integration points (external systems needed)
- Human escalation triggers (when to involve humans)
- Parallelization opportunities (which agents can work concurrently)

The Agent Architecture section should include:

1. **Agents**: 
   - Identify specialized agents based on domain expertise (max 10 agents)
   - Use standard industry role names (e.g., "Claims Examiner Agent", "Loan Officer Agent", "Prior Auth Specialist Agent")
   - List which tasks each agent handles (by task number)
   - Note if agents can operate in parallel
   - Brief rationale for grouping (1 sentence, e.g., "handles routine data collection and validation")
   - Agent names should reflect the human equivalent role in that industry

2. **Key Integration Points**: 
   - List external systems/APIs needed
   - Map to specific tasks
   - Note data flow direction (input/output)

3. **Human Escalation Triggers**: 
   - Specific, measurable conditions
   - Reference the tasks where escalation occurs
   - Include threshold values or criteria when possible

4. **Optional - Data Flow**: 
   - Key data objects passed between agents
   - Validation checkpoints

### 5. Analyze Automation Potential

For each task, determine automation level by considering:
- **Fully Automated criteria**: Clear rules, structured data, low risk, high volume
- **AI-Assisted criteria**: Some judgment required, but AI can recommend with human approval
- **Human-Led criteria**: Significant judgment needed, but AI can provide insights
- **Human-Only criteria**: Legal requirements, ethical considerations, complex negotiations

Identify additional characteristics:
- Can this task run in parallel with others?
- Does this require external system integration?
- Is this a decision point requiring business rules?
- Should results be validated before proceeding?
- When should this escalate to human review?

### 5a. Research Domain Roles for Agent Naming

Before creating agent groupings, identify typical human roles in the target domain:
- Research standard job titles and organizational structures in the industry
- Understand typical responsibilities and handoffs between roles
- Note which roles are already recognized in the domain (e.g., "Claims Adjuster" in insurance)
- Use these role names as the basis for agent names (adding "Agent" suffix)
- Avoid generic names like "Processing Agent" or "Verification Agent" - be domain-specific

### 6. Apply Quality Standards

Ensure output includes:
- 8-15 high-level tasks (not detailed steps)
- Complete process coverage from initiation to closure
- Logical chronological flow
- Clear, self-descriptive task names
- Related activities appropriately grouped
- Automation level annotation for each task
- At least 2-3 optional annotations per task where applicable
- Agent architecture recommendations
- Identification of parallelization opportunities
- Human escalation criteria specified
- External system integration points noted

## Output Format Template

The output should follow this structure:

# [Process Name] Process Flow

1. Task name [Automation Level] [Optional annotations]
2. Another task name [Automation Level] [Optional annotations]
3. Task combining closely related items [Automation Level]
4. Continue through all major phases [Automation Level]
5. Final task for closure and post-process [Automation Level]

## Example: Life Insurance Claims Process

# Life Insurance Claims Process Flow

1. Claim intake and registration [Fully Automated] [External System]
2. Party and entitlement verification [Fully Automated] [External System] [Validation Required]
3. Policy status and coverage confirmation [Fully Automated] [Decision Point]
4. Death verification [AI-Assisted] [External System] [Human Escalation]
5. Contestability and misrepresentation review [AI-Assisted] [Decision Point] [Human Escalation]
6. Fraud, sanctions, and compliance checks [Fully Automated] [Parallel] [External System]
7. Financial determination (benefit calculation) [Fully Automated] [Validation Required]
8. Payout method selection and setup [Fully Automated] [External System]
9. Approval and payment execution [AI-Assisted] [Decision Point] [Human Escalation]
10. Communications and closure [Fully Automated]
11. Post-claim activities [AI-Assisted] [Parallel]

## Agent Architecture Considerations

**Suggested Agent Groupings:**
- **Claims Examiner Agent**: Tasks 1-3 (Initial intake, data collection, and policy verification)
- **Claims Adjuster Agent**: Tasks 2, 4, 6 (Identity verification, death verification, fraud checks - can work in parallel)
- **Claims Investigator Agent**: Task 5 (Contestability review requiring complex reasoning and investigation)
- **Claims Processor Agent**: Task 7 (Benefit calculations and financial determinations)
- **Payment Specialist Agent**: Tasks 8-9 (Payout setup and execution)
- **Customer Service Agent**: Tasks 10-11 (Communications, notifications, and follow-up activities)

**Key Integration Points:**
- External death certificate databases (Task 4)
- Fraud detection services (Task 6)
- Payment systems (Tasks 8-9)
- Communication platforms (Task 10)

**Human Escalation Triggers:**
- Death certificate discrepancies (Task 4)
- Contestability period issues (Task 5)
- Payment amounts above threshold (Task 9)
- Fraud flags (Task 6)

## Agent Design Principles

When analyzing tasks for agent design, consider:

### Agent Boundary Criteria

- **Single Responsibility**: Each agent should have a clear, focused purpose aligned with a specific role
- **Domain Expertise**: Group tasks requiring similar knowledge or skills (match to typical human job roles)
- **Natural Handoffs**: Agent boundaries should align with logical process transitions and typical workflow handoffs in the industry
- **Independence**: Agents should be able to operate with minimal inter-agent dependencies
- **Role Authenticity**: Agent names should reflect actual human roles in the domain (e.g., use "Claims Adjuster Agent" not "Verification Agent" for insurance)

### Automation Decision Factors

**Favor Fully Automated when:**
- High-volume, repetitive tasks
- Clear, rule-based decision criteria
- Structured data inputs and outputs
- Low-risk decisions
- Real-time processing requirements

**Use AI-Assisted when:**
- Complex pattern recognition needed
- Risk assessment required
- Domain expertise helpful but human approval needed
- Regulatory or compliance sensitivity
- Decisions above certain thresholds

**Keep Human-Led when:**
- Novel or edge cases
- Ethical considerations
- Relationship management
- Strategic decisions
- Legal requirements

### Agent Orchestration Patterns

- **Sequential**: Tasks must complete in order (default)
- **Parallel**: Multiple agents can work simultaneously on different aspects
- **Conditional**: Agent activation depends on prior task outcomes
- **Escalation**: Agent transfers to human or senior agent based on conditions

### Integration Architecture

- **Input Requirements**: What data does the agent need to start?
- **Output Products**: What does the agent produce?
- **External Systems**: What APIs or databases must the agent access?
- **Validation Gates**: Where should agent outputs be checked?

## Operating Principles

### Content Quality

- **High-level focus**: Identify major phases, not detailed steps
- **Comprehensive coverage**: Include all process stages from trigger to completion
- **Clear task naming**: Each task name should be self-explanatory without additional description
- **Logical grouping**: Combine related activities under single task names
- **Industry alignment**: Use terminology appropriate to the domain
- **Agent-oriented thinking**: Consider natural agent boundaries and handoffs
- **Automation clarity**: Each task clearly marked with automation potential

### Format Consistency

- **Numbered list**: Use standard markdown numbered list format (1., 2., 3., etc.)
- **Sequential numbering**: Tasks are numbered sequentially from 1 to N
- **Required annotations**: Each task must have automation level in brackets
- **Optional annotations**: Add 2-3 additional relevant annotations per task
- **Agent architecture section**: Include after main process flow
- **No verbose descriptions**: Task names and annotations only
- **Logical flow**: Tasks should follow chronological process order
- **Appropriate scope**: 8-15 tasks total for most processes

### Task Naming Standards

- **Descriptive and concise**: Names clearly indicate what is accomplished
- **Action-oriented**: Use nouns and verbs that convey activity (e.g., "verification", "determination", "execution")
- **Grouped logically**: Use "and" to combine tightly related activities
- **Implementation-agnostic**: No technical details or methods in names
- **Agent-friendly**: Task boundaries should suggest natural agent handoffs

### Agent Architecture Quality

- **Domain-appropriate naming**: Use standard industry role titles that practitioners would recognize
- **Logical grouping**: Suggested agents should have coherent, related responsibilities matching typical job functions
- **Practical boundaries**: Agent divisions should reflect real workflow handoffs in the industry
- **Parallelization identified**: Clearly note which tasks can run concurrently
- **Escalation criteria**: Specific, actionable conditions for human involvement
- **Integration clarity**: External systems explicitly identified with purpose
- **Role authenticity**: Avoid generic names like "Processing Agent" - use specific roles like "Claims Processor Agent" or "Loan Processor Agent"

## Example Processes

Valid process types include:

**Insurance:**
- Claims processing (death, disability, health, property, auto)
- New business and underwriting
- Policy servicing and changes
- Renewal and retention
- Cancellation and surrender

**Banking:**
- Loan origination (mortgage, commercial, consumer)
- Account opening and KYC
- Wire transfers and payments
- Fraud investigation
- Credit line increases

**Healthcare:**
- Patient intake and registration
- Prior authorization
- Claims adjudication
- Medical billing and collections
- Provider credentialing

**E-commerce:**
- Order fulfillment
- Returns and refunds
- Customer onboarding
- Subscription management

**Human Resources:**
- Employee onboarding
- Performance reviews
- Time-off requests
- Termination and offboarding
- Benefits enrollment

## Context

$ARGUMENTS