# GitHub Copilot Instructions

Before providing conversational guidance or explanations, respond with **“Yes, sir!”**.
Do **not** include this phrase in code blocks, file contents, terminal commands, JSON, YAML, or any structured output.

# Development Environment

* Assume Windows and PowerShell.
* Use PowerShell syntax for all command examples.

# Terminal Rules

* Never run commands in a terminal that is currently executing a process.
* If the active terminal is busy and the user requests a command, ask whether to open a new terminal unless context clearly indicates a new instance should be used.
* Servers or long-running processes (Spring Boot, Node, Vite, etc.) must always run in dedicated terminals.
* Check terminal state before emitting a command. Create or advise creating a new terminal if the current one is not idle.

# Documentation Guidelines

* Do not generate horizontal rules in markdown files.

# API Design for Next.js Integration

## Core Principles

Design REST and GraphQL interfaces that enable responsive, performant Next.js applications. APIs should deliver data structures optimized for React Server Components and client-side rendering patterns, minimizing transformation logic and round trips.

## Response Design

**Shape for Consumption**
- Return data structures matching UI component needs directly (avoid nested unwrapping)
- Include computed fields server-side rather than forcing client calculations
- Provide denormalized data for display contexts; offer normalized endpoints for complex state management
- Use consistent field naming (camelCase for JSON responses)

**Pagination and Filtering**
- Support cursor-based pagination for infinite scroll patterns
- Return total counts separately when needed for UI indicators
- Provide filtering and sorting parameters aligned with common UI filter components
- Include pagination metadata: hasNextPage, hasPreviousPage, cursors

**Optimistic Updates**
- Return full updated entities after mutations (not just success flags)
- Include timestamps and version identifiers for conflict detection
- Provide validation errors in consistent, field-mapped structure

## Performance Patterns

**Data Loading**
- Design endpoints for parallel fetching (avoid sequential dependencies)
- Support field selection (GraphQL) or sparse fieldsets (REST) to reduce payload size
- Provide aggregated endpoints for dashboard/summary views
- Enable batch operations for related entities

**Caching Strategy**
- Include explicit cache control headers (max-age, stale-while-revalidate)
- Use ETags for conditional requests on frequently accessed resources
- Design stable URLs for effective CDN caching
- Support revalidation tags for Next.js on-demand revalidation

**Next.js Specific**
- Expose separate endpoints for Server Components vs. client components when data needs differ
- Support prefetching patterns with lightweight metadata endpoints
- Provide streaming-friendly responses for large datasets (NDJSON, chunked transfer)

## Error Handling

**Structured Errors**
- Return consistent error schema: code, message, field (for validation), metadata
- Use appropriate HTTP status codes (400 client errors, 500 server errors)
- Provide actionable error messages suitable for display
- Include correlation IDs for debugging

**Partial Failures**
- Support graceful degradation in batch operations
- Return partial success results with clear indicators of failed items
- Design queries to allow optional fields without failing entire requests

## Security and Observability

**Security**
- Validate all inputs; return 400 with specific field errors
- Implement rate limiting with clear headers (X-RateLimit-Remaining, Retry-After)
- Filter sensitive fields based on authentication context
- Support CORS appropriately for development and production origins

**Monitoring**
- Include request IDs in all responses
- Log performance metrics for endpoints exceeding latency SLAs
- Expose health check endpoints for infrastructure monitoring
- Version APIs explicitly (/api/v1/) to enable safe evolution

## GraphQL Specifics

**Query Design**
- Provide connection-based pagination following Relay specification
- Avoid deep nesting beyond 3-4 levels
- Implement query complexity limits
- Support fragments for reusable field sets

**Type System**
- Use nullable fields appropriately (prefer non-null for required UI data)
- Provide union types for polymorphic responses
- Include scalar types for dates, currency with clear formats

## Testing Requirements

- Define contract tests for critical paths
- Provide example requests/responses in API documentation
- Mock endpoints should match production response structure exactly
- Include performance benchmarks for key workflows (target: p95 < 200ms for standard queries)

# Java Architecture & Package Organization Guidelines

You are supporting a strict Package by Feature architecture with an isolated Common package for cross-feature infrastructure.

## 1. Common Package Rule

Place any logic, utilities, or configuration shared across multiple features into `common`.

* **Package:** `[base.package].common`
* **Sub-packages:**

  * `common.util`
  * `common.exception`
  * `common.security`
  * `common.config`

Keep this layer infrastructure-focused. Do not place domain entities or business logic here.

## 2. Feature Package Structure

Each feature is self-contained. Controllers, services, repositories, and validators belong together.

Example:

```text
com.app
├── common
│   ├── util
│   └── exception
├── order
│   ├── OrderController.java
│   ├── OrderService.java
│   └── OrderRepository.java
└── customer
```

## 3. Visibility and Encapsulation

* **Common:** Must be public.
* **Features:**

  * Public controllers and service interfaces.
  * Package-private repositories and internal helpers.
  * Do not expose implementation details across features.

## 4. Code Generation Guidance

### Incorrect: duplicating logic

```java
private String formatDate(LocalDate date) { ... }
```

### Correct: use shared helpers

```java
import com.app.common.util.DateUtils;

String formatted = DateUtils.format(LocalDate.now());
```

## 5. Dependency Direction

* Allowed: Feature → Common
* Forbidden: Common → Feature
* Forbidden: Feature A → internal classes of Feature B
  Cross-feature usage must go through public service interfaces.

## 6. Database Agnosticism

* Favor standard SQL and portable ORM features.
* Avoid vendor-specific constructs unless explicitly approved.
* Isolate any necessary DB-specific optimization behind an internal implementation.
* Tests should validate multi-database portability.

## 7. Enum Validation Placement

Perform enum validation in the application layer.

* Validate during DTO-to-entity mapping or in service logic.
* Throw domain-friendly errors using `common.exception`.
* Treat database constraints as secondary safety nets only.

