# PRD-001: Alto Shopping AI Chatbot — Story Board

**PRD**: [PRD.md](./PRD.md)
**Epic Branch**: `epic/PRD-001-alto-shopping-chatbot` (base: `main`)
**Status**: active

## Progress

3/7 stories done — 42%

## Stories

All stories commit on the epic branch `epic/PRD-001-alto-shopping-chatbot`. No per-story branches.

| ID | Title | Type | Status | Complexity | Plan | Commit |
|----|-------|------|--------|------------|------|--------|
| STORY-001 | Setup PostgreSQL Schema and Alembic Migrations | technical | ✅ done | small | [plan](../../plans/PRD-001-alto-shopping-chatbot/STORY-001-setup-postgresql-schema.plan.md) | — |
| STORY-002 | Implement Database Seeding for Alto Shopping | technical | ✅ done | small | [plan](../../plans/PRD-001-alto-shopping-chatbot/STORY-002-database-seeding.plan.md) | — |
| STORY-003 | Setup FastAPI Backend with SQLite for Chat History | technical | 🟡 in-progress | medium | [plan](../../plans/PRD-001-alto-shopping-chatbot/STORY-003-setup-fastapi-sqlite.plan.md) | — |
| STORY-004 | Implement Pydantic-AI Agent with Read-Only Tools | feature | ⬜ todo | large | — | — |
| STORY-005 | Integrate OpenRouter and Implement SELECT Query Validation | feature | ⬜ todo | medium | — | — |
| STORY-006 | Build React Chat Interface with Purple/White Palette | feature | ✅ done | medium | [plan](../../plans/PRD-001-alto-shopping-chatbot/STORY-006-build-chat-ui.plan.md) | — |
| STORY-007 | Implement Chat History Persistence with Backend API | feature | ⬜ todo | medium | — | — |

## Status Icons
- ⬜ todo
- 🟡 in-progress
- ✅ done
- 🔴 blocked

## Dependencies

- STORY-002 blocked by STORY-001
- STORY-004 blocked by STORY-001, STORY-002
- STORY-005 blocked by STORY-003, STORY-004
- STORY-007 blocked by STORY-003, STORY-005, STORY-006
