---
type: standard
tier: backend
process: development
tags:
  - spring-boot
  - security
  - authentication
version: 1.0.0
created: '2024-12-01'
updated: '2024-12-09'
author: Technology Office
status: active
---

# Spring Boot Security Standards

## Overview

This document outlines the security standards for Spring Boot applications at New York Life. These standards ensure consistent security practices across all backend services.
## Authentication

### Profile-Based Configuration

All Spring Boot applications must implement profile-based authentication configuration:

- **Local/Development**: Use basic authentication or OAuth2 mock providers
- **QA/UAT**: Use OAuth2 with test authorization servers
- **Production**: Use OAuth2 with production authorization servers

### OAuth2 Configuration

Applications must use Spring Security OAuth2 Resource Server:

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthConverter()))
            );
        return http.build();
    }
}
```

## Authorization

### Role-Based Access Control

Use Spring Security's role-based access control:

- Define roles in application configuration
- Use method-level security with `@PreAuthorize`
- Implement custom authorization logic when needed

## Security Headers

All applications must configure security headers:

```java
http.headers(headers -> headers
    .contentSecurityPolicy("default-src 'self'")
    .frameOptions().deny()
    .xssProtection().block(true)
);
```

## API Security

### Rate Limiting

Implement rate limiting for public APIs using Bucket4j or similar libraries.

### Input Validation

- Validate all input using Bean Validation (JSR 380)
- Sanitize user input to prevent injection attacks
- Use parameterized queries for all database operations

## Secret Management

- Never commit secrets to version control
- Use environment variables or secret management services
- Rotate credentials regularly

## Audit Logging

All security-relevant events must be logged:

- Authentication attempts (success and failure)
- Authorization failures
- Changes to security configuration
- Access to sensitive data

## Compliance

Applications must comply with:

- SOC 2 requirements
- NIST Cybersecurity Framework
- Company-specific security policies

## References

- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- Internal Security Wiki (link to internal resource)

