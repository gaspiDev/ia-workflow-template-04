---
id: STORY-001
prd: PRD-001
slug: setup-postgresql-schema
title: Setup PostgreSQL Schema and Alembic Migrations
type: technical
priority: high
complexity: small
phase: 1
status: in-progress
labels: [backend, database]
epic_branch: epic/PRD-001-alto-shopping-chatbot
plan: .agents/plans/PRD-001-alto-shopping-chatbot/STORY-001-setup-postgresql-schema.plan.md
report: null
commit: null
depends_on: []
blocks: [STORY-002, STORY-004]
skills: [fastapi-python]
created: 2026-05-20
updated: 2026-05-20
---

# STORY-001: Setup PostgreSQL Schema and Alembic Migrations

## Description

As a developer, I want to define the PostgreSQL schema for Alto Shopping and set up Alembic migrations, so that the database structure is versioned and reproducible.

## Acceptance Criteria

- [ ] Given a fresh PostgreSQL instance, when I run Alembic migrations, then the tables `shops`, `sales`, `categories`, `employees`, and `rent` are created.
- [ ] Given the database models, when I inspect the schema, then all columns and foreign keys match the requirements for Alto Shopping.
- [ ] Given the `backend/app/models` directory, when I check for SQLModel/SQLAlchemy definitions, then the models are present and correctly linked.

## Technical Notes

- Use `SQLModel` or `SQLAlchemy 2.0` as per `fastapi-python` skill.
- Define models in `backend/app/models/`.
- Initialize Alembic in the `backend/` directory.
- Follow `fastapi-python` principles: "Employ lowercase with underscores for file/directory naming".

## Dependencies

- **Blocked by**: None
- **Blocks**: STORY-002, STORY-004

## PRD Reference

Source: [`PRD-001/PRD.md`](../../PRDs/PRD-001-alto-shopping-chatbot/PRD.md) — section 12 (Phase 1)
