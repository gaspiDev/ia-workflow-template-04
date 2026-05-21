---
story: STORY-006
prd: PRD-001
slug: build-chat-ui
title: Build React Chat Interface with Purple/White Palette
type: NEW_CAPABILITY
complexity: MEDIUM
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-20
---

# Plan: Build React Chat Interface with Purple/White Palette

## Summary
This plan covers the implementation of the primary Chatbot UI for the Alto Shopping AI. We will update the global theme to a purple and white palette, install the necessary `shadcn` components, and build a responsive chat interface. The UI will support displaying a list of messages (user vs. assistant) and a form to send new queries. This story focuses on the visual and structural implementation with mock data, preparing it for the backend integration in STORY-007.

## User Story
As a user, I want a visually appealing and easy-to-use chat interface, so that I can interact with the AI agent naturally.

## Story Reference
- Story file: `.agents/stories/PRD-001-alto-shopping-chatbot/STORY-006-build-chat-ui.md`
- PRD: `.agents/PRDs/PRD-001-alto-shopping-chatbot/PRD.md`

## Metadata
| Field | Value |
|-------|-------|
| Type | NEW_CAPABILITY |
| Complexity | MEDIUM |
| Systems Affected | Frontend UI, Theme, Routing |
| Story | STORY-006 |
| PRD | PRD-001 |
| Epic Branch | `epic/PRD-001-alto-shopping-chatbot` |

---

## Skills In Use
| Skill | Why it applies | Tasks affected |
|-------|---------------|----------------|
| shadcn | Component composition, semantic colors (purple), and form patterns. | Tasks 1, 2, 3 |
| vercel-react-best-practices | Optimizing rendering for the chat list and ensuring clean component extraction. | Task 3 |
| react-router-declarative-mode | Registering the new `/chat` route using `<Routes>` and `<Route>`. | Task 4 |

---

## Patterns to Follow

### Naming
```javascript
// SOURCE: frontend/src/App.jsx:1-10
import Home from "@/pages/Home"
import About from "@/pages/About"
```

### Components
```javascript
// Following shadcn composition rules (Skill: shadcn)
<Card>
  <CardHeader>
    <CardTitle>Chat with Alto Shopping</CardTitle>
  </CardHeader>
  <CardContent>
    <ScrollArea className="h-[500px]">
      {/* Messages */}
    </ScrollArea>
  </CardContent>
</Card>
```

---

## Files to Change
| File | Action | Purpose |
|------|--------|---------|
| `frontend/src/index.css` | UPDATE | Update the theme to purple/white palette. |
| `frontend/src/pages/Chat.jsx` | CREATE | Main chat page implementation. |
| `frontend/src/components/ChatMessage.jsx` | CREATE | Individual message bubble component. |
| `frontend/src/App.jsx` | UPDATE | Register the `/chat` route. |
| `frontend/src/layouts/RootLayout.jsx` | UPDATE | Add navigation link to Chat. |

---

## Tasks

### Task 1: Update Global Theme to Purple
- **File**: `frontend/src/index.css`
- **Action**: UPDATE
- **Implement**: Update `--primary`, `--ring`, `--sidebar-primary`, and other semantic tokens to use purple shades (e.g., `oklch(0.5 0.2 290)` for primary).
- **Validate**: Check the home page or buttons to see if the color has changed to purple.

### Task 2: Install Shadcn Components
- **File**: N/A
- **Action**: RUN COMMAND
- **Implement**: `npx shadcn@latest add card scroll-area input badge separator avatar field`
- **Validate**: Verify files exist in `frontend/src/components/ui/`.

### Task 3: Implement Chat UI Components
- **File**: `frontend/src/components/ChatMessage.jsx`, `frontend/src/pages/Chat.jsx`
- **Action**: CREATE
- **Implement**: 
    - `ChatMessage`: Styled bubble using `Badge` or `Card` with alignment based on role.
    - `Chat`: A centered layout with a `Card` containing a `ScrollArea` for messages and an `InputGroup` (as per shadcn skill) for text entry.
- **Mirror**: Follow `shadcn` composition rules for `Card` and `ScrollArea`.
- **Validate**: `npm run dev` and visually check the layout with mock messages.

### Task 4: Configure Routing and Navigation
- **File**: `frontend/src/App.jsx`, `frontend/src/layouts/RootLayout.jsx`
- **Action**: UPDATE
- **Implement**:
    - Add `<Route path="chat" element={<Chat />} />` to `App.jsx`.
    - Add `<NavLink to="/chat">Chat</NavLink>` to the header in `RootLayout.jsx`.
- **Mirror**: Follow existing routing pattern in `App.jsx`.
- **Validate**: Click the "Chat" link in the nav and ensure the chat page loads.

---

## End-to-End Tests
- [ ] Open the app, click "Chat" in the nav.
- [ ] Verify the UI is purple and white.
- [ ] Type a message in the input and click "Send" (or press Enter).
- [ ] Verify the message appears in the chat list (even if the response is currently mocked).
- [ ] Verify the scroll area automatically scrolls to the bottom (if implemented).

---

## Validation
```bash
cd frontend && npm run lint
```

---

## Acceptance Criteria
- [ ] Given the frontend app, when I open the chat page, then I see a purple and white color palette.
- [ ] Given the message list, when I send a message, then it appears in the chat window with appropriate styling.
- [ ] Given the `shadcn` components, when I use them for the chat layout, then they follow the `shadcn` composition rules.
- [ ] Given the input field, when I type and press enter, then the message is sent (mocked for now).
- [ ] All tasks completed.
- [ ] Frontend lint passes.
- [ ] Follows existing patterns.
