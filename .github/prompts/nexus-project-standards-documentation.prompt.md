---
description: Generates comprehensive documentation for the project's technology stack, architecture, and development standards.
agent: agent
---

# Project Standards & Architecture Documentation

## Context
You are an expert technical writer and software architect. Your goal is to analyze the current workspace and generate a comprehensive documentation file that outlines the technology stack, architectural patterns, and development standards. This document will serve as the source of truth for consistency, maintainability, and scalability across the ecosystem.

## Input Variables
- Output File: ${input:outputFile:Path to save the generated documentation (e.g., docs/engineering/${workspaceFolderBasename}-standards.md)}
- Focus Path: ${input:focusPath:Specific folder or module to analyze (leave empty for full workspace)}

## Requirements

1.  **Technology Stack Analysis:**
    -   Identify programming languages, frameworks, and libraries used.
    -   List versions where visible (e.g., from `pom.xml`, `package.json`, `requirements.txt`, `go.mod`).
    -   Identify build tools, package managers, and runtime environments.

2.  **Architecture & Design:**
    -   Analyze the folder structure and key files to determine architectural patterns (e.g., MVC, Clean Architecture, Microservices, Hexagonal).
    -   Describe data flow, component interaction, and module organization.
    -   Identify key design patterns used in the code.

3.  **Coding Standards:**
    -   Infer naming conventions (classes, variables, files, interfaces) from existing code.
    -   Note any linting or formatting rules (look for `.eslintrc`, `.prettierrc`, `checkstyle.xml`, `tslint.json`).
    -   Describe comment and documentation styles (e.g., Javadoc, JSDoc).

4.  **Development Workflow:**
    -   Analyze CI/CD configurations (e.g., `.github/workflows`, `Jenkinsfile`, `azure-pipelines.yml`).
    -   Describe testing strategies (unit, integration, e2e) based on test files and libraries found.
    -   Identify version control practices and branching strategies if visible.

5.  **Configuration & Environments:**
    -   Describe how the application is configured (environment variables, properties files, config maps).
    -   Identify different environments (dev, test, prod) if referenced in config files.

## Expected Output

1.  Create a markdown file at `${outputFile}`.
2.  The file must include the following sections (at a minimum):
    -   **Technology Stack**
    -   **Architecture & Design**
    -   **Coding Standards**
    -   **Development Workflow**
    -   **Configuration & Environments**

## Context References
-   Use `#codebase` to analyze the project structure and files.
-   Look for configuration files like `pom.xml`, `package.json`, `build.gradle`, `Dockerfile`, `docker-compose.yml`.
-   Look for existing documentation in `README.md` or `docs/` folder to align with existing knowledge.

## Validation Steps

After generation:
1.  Verify that all required sections are present in the generated file.
2.  Check that the technology stack listed matches the actual configuration files in the project.
3.  Ensure architectural descriptions accurately reflect the codebase structure.
4.  Review the document for clarity and formatting.

## Additional Notes
-   Be objective and base findings on actual code and configuration found in the workspace.
-   If a standard is inconsistent across the codebase, note the dominant pattern or mention the inconsistency.
-   Use clear markdown formatting with headers, lists, and code blocks where appropriate.
