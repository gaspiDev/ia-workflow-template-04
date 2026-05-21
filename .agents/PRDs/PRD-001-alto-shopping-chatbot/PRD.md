---
id: PRD-001
slug: alto-shopping-chatbot
title: Alto Shopping AI Chatbot
status: draft
base_branch: main
epic_branch: epic/PRD-001-alto-shopping-chatbot
created: 2026-05-20
updated: 2026-05-20
---

# PRD-001: Alto Shopping AI Chatbot

## 1. Executive Summary
The Alto Shopping AI Chatbot is a full-stack local application designed to provide users with an intuitive natural language interface for querying a shopping center's database. Users can ask questions about shops, sales, categories, employees, and rent, and receive immediate insights powered by an AI agent.

The MVP goal is to deliver a functional "Talk to your Data" experience where a stateless AI agent translates natural language into read-only SQL queries against a PostgreSQL database, while the frontend maintains a local chat history in SQLite for user reference.

## 2. Mission
To bridge the gap between complex database schemas and business curiosity through a seamless, secure, and visually appealing AI-driven interface.

**Core Principles:**
- **Simplicity:** Minimize friction from question to answer.
- **Safety:** Strictly read-only access to analytic data.
- **Speed:** Efficient async processing and stateless execution.
- **Aesthetics:** A modern, polished UI using a purple and white palette.

## 3. Target Users
- **Shopping Center Managers:** Need quick stats on sales and occupancy.
- **Operations Team:** Curious about employee distribution and shop categories.
- **Business Analysts:** Looking for patterns in rent and performance without writing SQL.

## 4. MVP Scope

### In Scope
- [x] **Chatbot UI:** Purple/white theme with `shadcn` components.
- [x] **Stateless AI Agent:** Powered by `pydantic-ai` and OpenRouter.
- [x] **PostgreSQL Integration:** Read-only analysis of `shops`, `sales`, `categories`, `employees`, and `rent`.
- [x] **SQLite Persistence:** Storing message history for UI display (stateless to LLM).
- [x] **Database Seeding:** SQL seed file and Alembic migrations.
- [x] **Natural Language Responses:** Concise answers derived from DB lookups.

### Out of Scope
- [ ] Multi-turn LLM memory (history is for UI only).
- [ ] Data modification (INSERT/UPDATE/DELETE).
- [ ] User authentication/multi-tenant sessions.
- [ ] Deployment to cloud (local-only focus).
- [ ] Complex data visualization (charts/graphs).

## 5. User Stories
- **As a Manager**, I want to ask "Which shop had the highest sales last month?" so that I can reward top performers.
- **As an Admin**, I want to ask "How many employees work in the 'Fashion' category?" so that I can manage staffing levels.
- **As a user**, I want my previous messages to stay on the screen so that I can reference my earlier questions.
- **As a developer**, I want a seeding script so that I can quickly set up the local environment with sample data.

## 6. Core Architecture & Patterns
- **Backend**: FastAPI with async execution. Follows `fastapi-python` skill conventions (functional, modular routers).
- **AI Layer**: `pydantic-ai` Agent with dependency injection for DB connections. Tools: `list_tables`, `get_table_metadata`, `execute_query`.
- **Frontend**: React SPA using `react-router-declarative-mode`.
- **Styling**: Vanilla CSS + Tailwind + `shadcn`. Follows `shadcn` skill for component composition (`FieldGroup`, `Button` with `data-icon`).
- **Database Architecture**:
    - **PostgreSQL**: Analytical source (Read-only).
    - **SQLite**: Local state/history.

## 7. Tools/Features
### AI Agent Tools
- `list_tables`: Lists available tables in the PostgreSQL schema.
- `get_table_metadata`: Retrieves column names and types for a specific table.
- `execute_select`: Executes a validated `SELECT` query.

### UI Components
- **Chat Window**: Main interface for interaction.
- **Message Bubbles**: Styled with purple/white tokens.
- **Action Bar**: Input with "Send" button and "Clear History" option.

## 8. Technology Stack
- **Backend**: Python 3.10+, FastAPI, Pydantic v2, SQLAlchemy 2.0, `pydantic-ai`.
- **Frontend**: React, Vite, Tailwind CSS, `shadcn/ui`, Lucide Icons.
- **Database**: PostgreSQL (Analytic), SQLite (History).
- **LLM Provider**: OpenRouter (Free tier models).
- **Migration Tool**: Alembic.

## 9. Security & Configuration
- **Strict Read-Only**: Agent only has access to a dedicated PG user with `SELECT` permissions.
- **Query Validation**: Strict regex/parsing to ensure only `SELECT` statements are executed.
- **Environment Variables**: `DATABASE_URL` (PG), `SQLITE_URL`, `OPENROUTER_API_KEY`.
- **Stateless LLM**: No user PII or historical context sent to the LLM per turn.

## 10. API Specification
- `GET /chat/history`: Fetch chat history from SQLite.
- `POST /chat/query`: Submit a message, trigger agent, store response, return answer.
- `DELETE /chat/history`: Clear the SQLite message log.

## 11. Success Criteria
- [ ] Agent correctly identifies the relevant table for a natural language query 90% of the time.
- [ ] UI reflects the purple/white palette consistently.
- [ ] Chat history persists across page reloads (via SQLite).
- [ ] Alembic migrations and seeding script work in a fresh environment.
- [ ] Zero successful DML/DDL executions via the AI agent.

## 12. Implementation Phases
### Phase 1: Foundation (Goal: DB & Backend Setup)
- Deliverables: PostgreSQL schema, seed data, Alembic migrations, FastAPI skeleton with SQLite history.
- Validation: Successful `db-seed` and API health check.

### Phase 2: AI Agent (Goal: Functional Natural Language Querying)
- Deliverables: `pydantic-ai` agent with tools, OpenRouter integration, query validation logic.
- Validation: Unit tests for agent tool calls and SELECT validation.

### Phase 3: Frontend & UI (Goal: Interactive Chatbot)
- Deliverables: React chat interface, purple/white styling, history persistence logic.
- Validation: User can ask a question, see the answer, and refresh the page to still see it.

## 13. Future Considerations
- Adding Chart.js/Recharts for data visualization.
- Multi-session support.
- File export (CSV/PDF) for query results.

## 14. Risks & Mitigations
- **Risk**: LLM generates invalid SQL. **Mitigation**: Agent retries on SQL error or returns a clear "I couldn't find that" message.
- **Risk**: SQL Injection via LLM. **Mitigation**: Strict `SELECT` enforcement and read-only DB user.
- **Risk**: OpenRouter latency. **Mitigation**: Show a loading state/spinner in UI.

## 15. Appendix
- Skills referenced: `building-pydantic-ai-agents`, `fastapi-python`, `shadcn`, `vercel-react-best-practices`, `react-router-declarative-mode`.
- Consigna Reference: `@CONSIGNA.md`.
