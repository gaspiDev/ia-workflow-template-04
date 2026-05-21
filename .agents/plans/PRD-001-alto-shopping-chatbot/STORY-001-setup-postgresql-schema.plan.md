---
story: STORY-001
prd: PRD-001
slug: setup-postgresql-schema
title: Setup PostgreSQL Schema and Alembic Migrations
type: technical
priority: high
complexity: small
phase: 1
status: todo
labels: [backend, database]
epic_branch: epic/PRD-001-alto-shopping-chatbot
plan: null
report: null
commit: null
depends_on: []
blocks: [STORY-002, STORY-004]
skills: [fastapi-python]
created: 2026-05-20
updated: 2026-05-20
---

# Plan: Setup PostgreSQL Schema and Alembic Migrations

## Summary
This plan covers the definition of the PostgreSQL schema for the Alto Shopping analytic database and the initialization of Alembic for versioned migrations. We will define SQLAlchemy 2.0 models for categories, shops, sales, employees, and rent, and configure Alembic to manage this schema.

## User Story
As a developer, I want to define the PostgreSQL schema for Alto Shopping and set up Alembic migrations, so that the database structure is versioned and reproducible.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-001-setup-postgresql-schema.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | technical |
| Complexity | small |
| Systems Affected | Backend (Models, Database, Migrations) |
| Story | STORY-001 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| fastapi-python | Follows SQLAlchemy 2.0 patterns and modular model definitions. | Tasks 2, 3 |

---

## Patterns to Follow

### Naming
```python
# SOURCE: backend/app/models/pais.py:1-12
class Pais(Base):
    __tablename__ = "paises"
    # ...
```

### Models (SQLAlchemy 2.0)
```python
# SOURCE: backend/app/models/pais.py:5-12
from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Pais(Base):
    __tablename__ = "paises"
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    # ...
```

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/requirements.txt` | UPDATE | Add `alembic` and `psycopg2-binary`. |
| `backend/app/core/config.py` | UPDATE | Add `POSTGRES_URL` and `SQLITE_URL`. |
| `backend/app/models/category.py` | CREATE | Define `Category` model. |
| `backend/app/models/shop.py` | CREATE | Define `Shop` model. |
| `backend/app/models/sale.py` | CREATE | Define `Sale` model. |
| `backend/app/models/employee.py` | CREATE | Define `Employee` model. |
| `backend/app/models/rent.py` | CREATE | Define `Rent` model. |
| `backend/app/models/__init__.py` | UPDATE | Export all models for Alembic. |
| `backend/alembic.ini` | CREATE | Alembic configuration. |
| `backend/alembic/env.py` | UPDATE | Configure Alembic to use the project metadata. |

---

## Tasks

### Task 1: Update Dependencies and Configuration
- **File**: `backend/requirements.txt`, `backend/app/core/config.py`, `backend/.env.example`
- **Action**: UPDATE
- **Implement**: 
    - Add `alembic` and `psycopg2-binary` to `requirements.txt`.
    - Update `Settings` in `config.py` to include `postgres_url` (defaulting to a local PG string) and `sqlite_url`.
    - Update `.env.example` with these new variables.
- **Validate**: `cd backend && pip install -r requirements.txt` (or use virtualenv).

### Task 2: Define Alto Shopping Models
- **File**: `backend/app/models/`
- **Action**: CREATE
- **Implement**: Create individual files for `Category`, `Shop`, `Sale`, `Employee`, and `Rent` following the `pais.py` pattern (SQLAlchemy 2.0).
    - `Category`: `id`, `name`.
    - `Shop`: `id`, `name`, `category_id` (FK), `spot_number`.
    - `Sale`: `id`, `shop_id` (FK), `amount`, `date`.
    - `Employee`: `id`, `shop_id` (FK), `name`, `position`.
    - `Rent`: `id`, `shop_id` (FK), `amount`, `due_date`.
- **Mirror**: `backend/app/models/pais.py`
- **Validate**: Ensure models are correctly imported in `backend/app/models/__init__.py`.

### Task 3: Initialize and Configure Alembic
- **File**: `backend/alembic.ini`, `backend/alembic/env.py`
- **Action**: CREATE / UPDATE
- **Implement**: 
    - Run `alembic init alembic` in the `backend/` directory.
    - Update `alembic.ini` to use a placeholder or the `POSTGRES_URL`.
    - Update `alembic/env.py` to import `Base.metadata` and set `target_metadata = Base.metadata`.
- **Validate**: `alembic history` should run without errors.

### Task 4: Generate First Migration
- **File**: `backend/alembic/versions/`
- **Action**: CREATE
- **Implement**: Run `alembic revision --autogenerate -m "initial_alto_shopping_schema"`.
- **Validate**: Verify the generated migration file contains the `create_table` commands for all 5 new tables.

---

## End-to-End Tests
- [ ] `cd backend && alembic upgrade head` -> Successfully creates tables in PostgreSQL.
- [ ] Inspect PG database (e.g., via `psql`) to verify tables and columns.

---

## Validation
```bash
cd backend
pip install -r requirements.txt
alembic upgrade head
```

---

## Acceptance Criteria
- [ ] Given a fresh PostgreSQL instance, when I run Alembic migrations, then the tables `shops`, `sales`, `categories`, `employees`, and `rent` are created.
- [ ] Given the database models, when I inspect the schema, then all columns and foreign keys match the requirements for Alto Shopping.
- [ ] Given the `backend/app/models` directory, when I check for SQLModel/SQLAlchemy definitions, then the models are present and correctly linked.
- [ ] All tasks completed.
- [ ] Alembic history is clean.
