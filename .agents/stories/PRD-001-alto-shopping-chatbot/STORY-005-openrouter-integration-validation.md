---
id: STORY-005
prd: PRD-001
slug: openrouter-integration-validation
title: Integrate OpenRouter and Implement SELECT Query Validation
type: feature
priority: high
complexity: medium
phase: 2
status: todo
labels: [backend, ai, security]
epic_branch: epic/PRD-001-alto-shopping-chatbot
plan: null
report: null
commit: null
depends_on: [STORY-003, STORY-004]
blocks: [STORY-007]
skills: [building-pydantic-ai-agents]
created: 2026-05-20
updated: 2026-05-20
---

# STORY-005: Integrate OpenRouter and Implement SELECT Query Validation

## Description

As a user, I want the AI agent to securely answer my questions using a free-tier LLM, so that I don't have to worry about costs or security breaches.

## Acceptance Criteria

- [ ] Given a natural language query, when the agent generates a SQL query, then it is strictly a `SELECT` statement.
- [ ] Given a query that contains `INSERT`, `UPDATE`, `DELETE`, or `DROP`, when the agent attempts to execute it, then it is blocked and an error is returned.
- [ ] Given a valid request, when the agent processes it, then it uses the OpenRouter API with the configured free-tier model.
- [ ] Given a successful response, when the agent returns, then the response is stored in the SQLite history via the FastAPI endpoint.

## Technical Notes

- Use `OPENROUTER_API_KEY` environment variable.
- Implement strict regex or parsing validation for `SELECT` queries in the `execute_select` tool.
- Configure `pydantic_ai` to use an OpenRouter model (e.g., via `OpenAIModel` with base URL override if needed, or check specific `pydantic-ai` provider support).
- Follow `building-pydantic-ai-agents` practices for error handling and retries.

## Dependencies

- **Blocked by**: STORY-003, STORY-004
- **Blocks**: STORY-007

## PRD Reference

Source: [`PRD-001/PRD.md`](../../PRDs/PRD-001-alto-shopping-chatbot/PRD.md) — section 9 (Security & Configuration)
