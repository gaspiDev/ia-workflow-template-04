---
story: STORY-005
prd: PRD-001
slug: openrouter-integration-validation
title: Integrate OpenRouter and Implement SELECT Query Validation
type: feature
priority: high
complexity: medium
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-21
status: done
---

# Plan: Integrate OpenRouter and Implement SELECT Query Validation

## Summary
Connect the AI Agent to OpenRouter to enable live natural language processing. Implement the `POST /api/v1/chat/query` endpoint that coordinates the agent run and persists the conversation to the SQLite history database.

## User Story
As a user, I want the AI agent to securely answer my questions using a free-tier LLM, so that I don't have to worry about costs or security breaches.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-005-openrouter-integration-validation.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | feature |
| Complexity | medium |
| Systems Affected | Backend (Agent, API, SQLite) |
| Story | STORY-005 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| building-pydantic-ai-agents | Integration with LLM providers. | Task 1, 2 |
| fastapi-python | Implementation of the API endpoint. | Task 3 |

---

## Patterns to Follow

### LLM Provider
Use `pydantic_ai`'s `OpenAIModel` with a custom base URL for OpenRouter: `https://openrouter.ai/api/v1`.

### Response Persistence
The `POST /chat/query` endpoint must:
1. Save the user's message to SQLite.
2. Run the agent.
3. Save the agent's response to SQLite.
4. Return the response to the user.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `backend/app/core/config.py` | UPDATE | Add `openrouter_api_key` and `model_name`. |
| `backend/app/agents/alto_agent.py` | UPDATE | Configure agent to use OpenRouter. |
| `backend/app/routers/chat_message.py` | UPDATE | Implement `POST /query` endpoint. |
| `backend/app/schemas/chat_message.py` | UPDATE | Add schema for query request/response. |

---

## Tasks

### Task 1: Update Configuration
- [x] **File**: `backend/app/core/config.py`
- [x] **Action**: UPDATE
- [x] **Implement**: 
    - `openrouter_api_key: str`
    - `model_name: str`

### Task 2: Configure OpenRouter in Agent
- [x] **File**: `backend/app/agents/alto_agent.py`
- [x] **Action**: UPDATE
- [x] **Implement**: Initialize the agent with `OpenAIModel` pointing to OpenRouter.

### Task 3: Create Query Endpoint
- [x] **File**: `backend/app/routers/chat_message.py`
- [x] **Action**: UPDATE
- [x] **Implement**: 
    - `POST /query` endpoint.
    - Inject `deps` (Postgres Session).
    - Use `alto_agent.run_sync()`.
    - Persist messages using `chat_message` service.

### Task 4: Verify Integration
- [x] **File**: `backend/scripts/test_agent_live.py`
- [x] **Action**: CREATE
- [x] **Implement**: A script that sends a real natural language question to the agent.

---

## End-to-End Tests
- [x] Call `POST /api/v1/chat/query` with "List all shops".
- [x] Verify the response is an accurate list.
- [x] Verify `GET /api/v1/chat/history` now contains 2 new messages.

---

## Validation
```bash
# In backend:
export OPENROUTER_API_KEY="your_key"
python scripts/test_agent_live.py
```

---

## Acceptance Criteria
- [x] Agent correctly uses OpenRouter to answer natural language questions.
- [x] Messages are persisted in SQLite.
- [x] Query validation still blocks non-SELECT statements.
