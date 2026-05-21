---
story: STORY-002
prd: PRD-001
slug: database-seeding
title: Implement Database Seeding for Alto Shopping
type: technical
priority: high
complexity: small
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-20
---

# Plan: Implement Database Seeding for Alto Shopping

## Summary
This plan covers the implementation of a Python script to seed the PostgreSQL analytical database with realistic sample data for "Alto Shopping". The data will include categories, shops, sales, employees, and rent records, ensuring that relationships are correctly established for testing the AI agent's analytic capabilities.

## User Story
As a developer, I want a seeding script with sample data, so that I can quickly set up the local environment with relevant data for testing.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-002-database-seeding.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | technical |
| Complexity | small |
| Systems Affected | Database (PostgreSQL) |
| Story | STORY-002 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| fastapi-python | Uses SQLAlchemy 2.0 sessions and models for seeding. | Task 1 |

---

## Patterns to Follow

### Naming
- Script file: `backend/scripts/seed_db.py`
- Utility functions: `seed_categories`, `seed_shops`, etc.

### Database Session
```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

engine = create_engine(settings.postgres_url)
SessionLocal = sessionmaker(bind=engine)
```

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/scripts/seed_db.py` | CREATE | Main seeding script. |
| `backend/README.md` | UPDATE | Document the seeding command. |

---

## Tasks

### Task 1: Create the Seeding Script
- **File**: `backend/scripts/seed_db.py`
- **Action**: CREATE
- **Implement**: 
    - Initialize a SQLAlchemy engine using `settings.postgres_url`.
    - Implement a `main()` function that:
        1. Clears existing data (optional/guarded).
        2. Seeds `categories` (e.g., Fashion, Food, Electronics, Services).
        3. Seeds `shops` linked to categories.
        4. Seeds `sales` for each shop (multiple records per shop).
        5. Seeds `employees` for each shop.
        6. Seeds `rent` records for each shop.
    - Use `with SessionLocal() as session:` for transactions.
- **Validate**: Run `./.venv/bin/python scripts/seed_db.py` and check for "Seeding completed successfully" message.

### Task 2: Document the Seeding Process
- **File**: `backend/README.md`
- **Action**: UPDATE
- **Implement**: Add a section under "Setup" or "Development" explaining how to run the seeding script.
- **Validate**: Ensure the command is clear and accurate.

---

## End-to-End Tests
- [ ] Run `python scripts/seed_db.py`.
- [ ] Connect to PostgreSQL: `psql -h localhost -U gsp2k -d alto-shopping`.
- [ ] Run `SELECT COUNT(*) FROM shops;` -> Returns > 0.
- [ ] Run `SELECT s.name, c.name FROM shops s JOIN categories c ON s.category_id = c.id;` -> Returns correctly joined data.

---

## Validation
```bash
cd backend
./.venv/bin/python scripts/seed_db.py
PGPASSWORD=secreto psql -h localhost -U gsp2k -d alto-shopping -c "SELECT COUNT(*) FROM shops"
```

---

## Acceptance Criteria
- [ ] Given a Python seeding script, when I execute it against the PostgreSQL DB, then all tables are populated with relevant dummy data for a shopping center.
- [ ] Given the seeded data, when I run a manual query, then I can see relationships between `shops`, `sales`, and `employees`.
- [ ] Given the `backend/` directory, when I look for a seeding command, then it is documented and functional.
- [ ] All tasks completed.
