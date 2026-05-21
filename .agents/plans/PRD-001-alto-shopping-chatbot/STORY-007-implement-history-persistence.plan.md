---
story: STORY-007
prd: PRD-001
slug: implement-history-persistence
title: Implement Chat History Persistence with Backend API
type: feature
priority: high
complexity: medium
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-21
status: done
---

# Plan: Implement Chat History Persistence with Backend API

## Summary
Connect the React chat interface with the FastAPI backend to persist and retrieve chat history. This involves fetching history on mount, sending new messages to the AI agent (via STORY-004/005 endpoints), and clearing history.

## User Story
As a user, I want my chat history to be saved and loaded automatically, so that I can resume my conversations after refreshing the page.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-007-implement-history-persistence.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | feature |
| Complexity | medium |
| Systems Affected | Frontend (React), Backend API |
| Story | STORY-007 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| vercel-react-best-practices | Ensures clean data fetching and state management. | Task 1, 2, 3 |
| react-router-declarative-mode | Navigation and page structure consistency. | Task 1 |

---

## Patterns to Follow

### Data Fetching
- Use a dedicated `api.js` utility for fetch calls.
- Handle loading and error states in the `Chat` component.
- Use `useEffect` for initial load.

### API Endpoints
- `GET /api/v1/chat/history`: Fetch all previous messages.
- `DELETE /api/v1/chat/history`: Clear all messages.
- `POST /api/v1/chat/query`: (To be implemented in STORY-004) Send a question and get an AI response.

---

## Files to Change

| File | Action | Purpose |
|------|--------|---------|
| `frontend/src/lib/api.js` | CREATE | Centralized API client using `fetch`. |
| `frontend/src/pages/Chat.jsx` | UPDATE | Integrate API calls, manage loading state, and update history. |

---

## Tasks

### Task 1: Create API Utility
- [x] **File**: `frontend/src/lib/api.js`
- [x] **Action**: CREATE
- [x] **Implement**: 
    - `API_BASE_URL` from environment or default.
    - `getHistory()`: fetches messages.
    - `clearHistory()`: deletes messages.
    - `sendQuery(query)`: sends user message to AI (mocked until STORY-004 is done).

### Task 2: Implement Initial History Load
- [x] **File**: `frontend/src/pages/Chat.jsx`
- [x] **Action**: UPDATE
- [x] **Implement**: 
    - `useEffect` to call `api.getHistory()`.
    - Update `messages` state with result.
    - Show a loading indicator if needed.

### Task 3: Implement Clear History Integration
- [x] **File**: `frontend/src/pages/Chat.jsx`
- [x] **Action**: UPDATE
- [x] **Implement**: 
    - Update `handleClear` to call `api.clearHistory()`.
    - Reset local state after successful deletion.

### Task 4: Query Integration
- [x] **File**: `frontend/src/pages/Chat.jsx`
- [x] **Action**: UPDATE
- [x] **Implement**: Connect `handleSend` to the real `/chat/query` endpoint via `api.sendQuery()`.

---

## End-to-End Tests
- [x] Load the Chat page: Verify history is fetched from backend.
- [x] Send a message: Verify it appears in state.
- [ ] Refresh page: Verify messages persist (once STORY-004 saves them).
- [x] Click Trash icon: Verify history is cleared on both frontend and backend.

---

## Validation
```bash
# Verify backend is running
# In frontend:
npm run dev
# Open browser and test interactions
```

---

## Acceptance Criteria
- [x] Given the chat component, when it mounts, then it fetches history from `GET /chat/history` and displays it.
- [x] Given a new message, when it is sent, then the UI updates immediately and persistence is handled.
- [x] Given the "Clear History" button, when I click it, then it calls `DELETE /chat/history` and clears the local message list.
- [x] Scroll position is maintained at the bottom after new messages.
