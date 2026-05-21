---
story: STORY-004
prd: PRD-001
slug: implement-ai-agent-tools
title: Implement Pydantic-AI Agent with Read-Only Tools
type: feature
priority: high
complexity: large
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-21
status: done
---

# Plan: Implement Pydantic-AI Agent with Read-Only Tools

## Summary
Build the core AI Agent logic using `pydantic-ai`. This involves configuring the agent with system instructions and three specialized tools to interact with the PostgreSQL analytical database: `list_tables`, `get_table_metadata`, and `execute_select`.

## User Story
As a user, I want the AI agent to be able to explore the database schema and find information, so that I can ask questions in natural language.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-004-implement-ai-agent-tools.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | feature |
| Complexity | large |
| Systems Affected | Backend (Agent, Database) |
| Story | STORY-004 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| building-pydantic-ai-agents | Core framework for the agent. | All tasks |

---

## Patterns to Follow

### Dependency Injection
Use `RunContext` to pass the PostgreSQL session to tools.

### Tool Implementation
- `list_tables`: Use SQLAlchemy `inspect` or raw SQL on `information_schema`.
- `get_table_metadata`: Use SQLAlchemy `inspect` to get columns and types.
- `execute_select`: Execute raw SQL using the session, ensuring it starts with `SELECT`.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/requirements.txt` | UPDATE | Add `pydantic-ai`. |
| `backend/app/core/database.py` | UPDATE | Add PostgreSQL engine and session. |
| `backend/app/agents/alto_agent.py` | CREATE | Define the agent and its tools. |
| `backend/scripts/test_agent_tools.py" | CREATE | Script to verify tools work against seeded DB. |

---

## Tasks

### Task 1: Update Dependencies
- [x] **File**: `backend/requirements.txt`
- [x] **Action**: UPDATE
- [x] **Implement**: Add `pydantic-ai>=0.0.14` (or latest).

### Task 2: Configure PostgreSQL Engine
- [x] **File**: `backend/app/core/database.py`
- [x] **Action**: UPDATE
- [x] **Implement**: 
    - Create `postgres_engine` using `settings.postgres_url`.
    - Create `PostgresSessionLocal`.
    - Add `get_postgres_db` dependency.

### Task 3: Create Agent and Tools
- [x] **File**: `backend/app/agents/alto_agent.py`
- [x] **Action**: CREATE
- [x] **Implement**:
    - `AltoAgentDeps` class with `db: Session`.
    - `alto_agent = Agent(...)` with system prompt.
    - `@alto_agent.tool` for `list_tables`, `get_table_metadata`, `execute_select`.
    - `execute_select` MUST validate that the query is a `SELECT` statement.

### Task 4: Verify Tools
- [x] **File**: `backend/scripts/test_agent_tools.py`
- [x] **Action**: CREATE
- [x] **Implement**: A script that runs the agent with `TestModel` or `run_sync` to call each tool and print output.

---

## End-to-End Tests
- [x] Run `python backend/scripts/test_agent_tools.py`.
- [x] Verify `list_tables` returns the 6 shopping tables.
- [x] Verify `get_table_metadata('shops')` returns columns like `id`, `name`, `category_id`.
- [x] Verify `execute_select` returns data from the `sales` table.

---

## Validation
```bash
# In backend:
pip install -r requirements.txt
python scripts/test_agent_tools.py
```

---

## Acceptance Criteria
- [x] Given a natural language query, when the agent runs, then it can call `list_tables` to see the PostgreSQL schema.
- [x] Given a specific table, when the agent runs, then it can call `get_table_metadata` to see column information.
- [x] Given a query that requires data, when the agent runs, then it can call `execute_select` to fetch results from PostgreSQL.
- [x] `execute_select` blocks any non-SELECT queries.
