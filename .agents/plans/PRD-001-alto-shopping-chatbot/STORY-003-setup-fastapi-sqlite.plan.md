---
story: STORY-003
prd: PRD-001
slug: setup-fastapi-sqlite
title: Setup FastAPI Backend with SQLite for Chat History
type: technical
priority: high
complexity: medium
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-20
---

# Plan: Setup FastAPI Backend with SQLite for Chat History

## Summary
Implement a persistent chat history using SQLite. This involves creating the necessary layers (Model, Schema, Repository, Service, Router) to support fetching and clearing chat history via a FastAPI API. The SQLite database will be dedicated to chat history, separate from the PostgreSQL analytical database.

## User Story
As a developer, I want to set up the FastAPI backend with a SQLite database for chat history persistence, so that users can view their previous interactions.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-003-setup-fastapi-sqlite.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | technical |
| Complexity | medium |
| Systems Affected | Backend API, SQLite |
| Story | STORY-003 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| fastapi-python | Follows the layered architecture and dependency injection. | All tasks |

---

## Patterns to Follow

### Architecture
1. **Model**: `app/models/chat_message.py`
2. **Schema**: `app/schemas/chat_message.py`
3. **Repository**: `app/repositories/chat_message.py`
4. **Service**: `app/services/chat_message.py`
5. **Router**: `app/routers/chat_message.py`

### Multi-Engine Support
Since we have both PostgreSQL and SQLite, I will ensure `app/core/database.py` handles the history engine correctly.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/app/core/database.py` | UPDATE | Ensure it uses `settings.sqlite_url` for history. |
| `backend/app/models/chat_message.py` | CREATE | SQLAlchemy model for chat messages. |
| `backend/app/schemas/chat_message.py` | CREATE | Pydantic schemas for chat messages. |
| `backend/app/repositories/chat_message.py` | CREATE | DB operations for chat messages. |
| `backend/app/services/chat_message.py` | CREATE | Business logic for chat history. |
| `backend/app/routers/chat_message.py` | CREATE | API endpoints for chat history. |
| `backend/app/main.py` | UPDATE | Register the new chat history router. |

---

## Tasks

### Task 1: Update Database Configuration
- **File**: `backend/app/core/database.py`
- **Action**: UPDATE
- **Implement**: Ensure `engine` uses `settings.sqlite_url`.
- **Validate**: Check that `history.db` is created upon app startup.

### Task 2: Create Chat Message Model
- **File**: `backend/app/models/chat_message.py`
- **Action**: CREATE
- **Implement**: 
    - `id`: int (PK)
    - `role`: str (e.g., "user", "assistant")
    - `content`: str
    - `timestamp`: datetime (default=now)
- **Validate**: Import in `app/models/__init__.py`.

### Task 3: Create Chat Message Schema
- **File**: `backend/app/schemas/chat_message.py`
- **Action**: CREATE
- **Implement**: `ChatMessageBase`, `ChatMessageCreate`, `ChatMessage`.

### Task 4: Create Chat Message Repository
- **File**: `backend/app/repositories/chat_message.py`
- **Action**: CREATE
- **Implement**: `get_all()`, `create()`, `delete_all()`.

### Task 5: Create Chat Message Service
- **File**: `backend/app/services/chat_message.py`
- **Action**: CREATE
- **Implement**: `get_history()`, `clear_history()`.

### Task 6: Create Chat Message Router
- **File**: `backend/app/routers/chat_message.py`
- **Action**: CREATE
- **Implement**: 
    - `GET /chat/history`
    - `DELETE /chat/history`
- **Validate**: Ensure they use the service layer.

### Task 7: Register Router in Main
- **File**: `backend/app/main.py`
- **Action**: UPDATE
- **Implement**: `app.include_router(chat_message.router, prefix="/api/v1")`.

---

## End-to-End Tests
- [ ] Run the backend.
- [ ] Call `DELETE /api/v1/chat/history` (should return 204 or 200).
- [ ] Call `GET /api/v1/chat/history` (should return empty list `[]`).
- [ ] (Future) Verify messages are saved when the AI agent is integrated.

---

## Validation
```bash
# Start backend
cd backend
./.venv/bin/uvicorn app.main:app --reload
# Test endpoints
curl -X DELETE http://localhost:8000/api/v1/chat/history
curl http://localhost:8000/api/v1/chat/history
```

---

## Acceptance Criteria
- [ ] Given the FastAPI app, when I call `GET /chat/history`, then I receive a list of previous messages from SQLite.
- [ ] Given the FastAPI app, when I call `DELETE /chat/history`, then the SQLite history is cleared.
- [ ] Given a running app, when I check the SQLite database, then it contains a `messages` table with `role` and `content`.
- [ ] All tasks completed.
