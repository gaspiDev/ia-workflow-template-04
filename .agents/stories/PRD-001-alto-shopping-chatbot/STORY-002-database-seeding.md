---
id: STORY-002
prd: PRD-001
slug: database-seeding
title: Implement Database Seeding for Alto Shopping
type: technical
priority: high
complexity: small
phase: 1
status: done
labels: [backend, database]
epic_branch: epic/PRD-001-alto-shopping-chatbot
plan: .agents/plans/PRD-001-alto-shopping-chatbot/STORY-002-database-seeding.plan.md
report: null
commit: null
depends_on: [STORY-001]
blocks: [STORY-004]
skills: [fastapi-python]
created: 2026-05-20
updated: 2026-05-20
---

# STORY-002: Implement Database Seeding for Alto Shopping

## Description

As a developer, I want a seeding script with sample data, so that I can quickly set up the local environment with relevant data for testing.

## Acceptance Criteria

- [ ] Given a `seed.sql` or Python seeding script, when I execute it against the PostgreSQL DB, then all tables are populated with relevant dummy data for a shopping center.
- [ ] Given the seeded data, when I run a manual query, then I can see relationships between `shops`, `sales`, and `employees`.
- [ ] Given the `backend/` directory, when I look for a seeding command (e.g., `npm run seed` or a python script), then it is documented and functional.

## Technical Notes

- Create a `seed_data.py` or `seed.sql` file.
- Ensure data covers edge cases (e.g., shops with no sales, multiple categories).
- Follow `fastapi-python` principles for modular utilities.

## Dependencies

- **Blocked by**: STORY-001
- **Blocks**: STORY-004

## PRD Reference

Source: [`PRD-001/PRD.md`](../../PRDs/PRD-001-alto-shopping-chatbot/PRD.md) — section 12 (Phase 1)
