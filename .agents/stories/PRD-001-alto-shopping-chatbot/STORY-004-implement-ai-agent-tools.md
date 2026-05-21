---
id: STORY-004
prd: PRD-001
slug: implement-ai-agent-tools
title: Implement Pydantic-AI Agent with Read-Only Tools
type: feature
priority: high
complexity: large
phase: 2
status: todo
labels: [backend, ai]
epic_branch: epic/PRD-001-alto-shopping-chatbot
plan: null
report: null
commit: null
depends_on: [STORY-001, STORY-002]
blocks: [STORY-005]
skills: [building-pydantic-ai-agents]
created: 2026-05-20
updated: 2026-05-20
---

# STORY-004: Implement Pydantic-AI Agent with Read-Only Tools

## Description

As a user, I want the AI agent to be able to explore the database schema and find information, so that I can ask questions in natural language.

## Acceptance Criteria

- [ ] Given a natural language query, when the agent runs, then it can call `list_tables` to see the PostgreSQL schema.
- [ ] Given a specific table, when the agent runs, then it can call `get_table_metadata` to see column information.
- [ ] Given a query that requires data, when the agent runs, then it can call `execute_select` to fetch results from PostgreSQL.
- [ ] Given the agent configuration, when I check the tools, then they are implemented using `pydantic_ai.Agent` and `RunContext`.

## Technical Notes

- Use `pydantic_ai` framework as per `building-pydantic-ai-agents` skill.
- Implement tools: `list_tables`, `get_table_metadata`, `execute_select`.
- Use `RunContext` for passing PostgreSQL session/dependency.
- Follow `building-pydantic-ai-agents` rule: "`@agent.tool` requires `RunContext` as first param".

## Dependencies

- **Blocked by**: STORY-001, STORY-002
- **Blocks**: STORY-005

## PRD Reference

Source: [`PRD-001/PRD.md`](../../PRDs/PRD-001-alto-shopping-chatbot/PRD.md) — section 7 (Tools/Features)
