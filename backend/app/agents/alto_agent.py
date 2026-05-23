import re
from dataclasses import dataclass
from sqlalchemy import text, inspect
from sqlalchemy.orm import Session
from pydantic_ai import Agent, RunContext
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from app.core.config import settings

@dataclass
class AltoAgentDeps:
    db: Session

# Configure OpenRouter provider explicitly and pass it to OpenAIModel
provider = OpenAIProvider(
    base_url='https://openrouter.ai/api/v1',
    api_key=settings.openrouter_api_key,
)

model = OpenAIModel(
    settings.model_name,
    provider=provider,
)

# System instructions for the agent
SYSTEM_PROMPT = """
You are an expert data analyst for 'Alto Shopping', a modern shopping center.
Your goal is to answer questions about shops, sales, employees, and rent using the provided tools.

Follow this process:
1. If you don't know the schema, call 'list_tables'.
2. If you need to know the columns of a table, call 'get_table_metadata'.
3. Formulate a SQL query (PostgreSQL syntax) and call 'execute_select'.
   - ONLY execute 'SELECT' queries.
   - Be concise and accurate.
   - If the results are empty, inform the user clearly.
   - For queries involving money (amount), format them as currency.

Available tables typically include: categories, shops, employees, sales, rents, and paises.
"""

alto_agent = Agent(
    model,
    deps_type=AltoAgentDeps,
    system_prompt=SYSTEM_PROMPT,
)

@alto_agent.tool
def list_tables(ctx: RunContext[AltoAgentDeps]) -> list[str]:
    """List all available tables in the analytical database."""
    inspector = inspect(ctx.deps.db.get_bind())
    return inspector.get_table_names()

@alto_agent.tool
def get_table_metadata(ctx: RunContext[AltoAgentDeps], table_name: str) -> dict:
    """Get columns and types for a specific table to understand its structure."""
    inspector = inspect(ctx.deps.db.get_bind())
    columns = inspector.get_columns(table_name)
    return {col['name']: str(col['type']) for col in columns}

@alto_agent.tool
def execute_select(ctx: RunContext[AltoAgentDeps], query: str) -> list[dict] | str:
    """
    Execute a SQL SELECT query against the analytical database.
    ONLY SELECT statements are allowed.
    """
    # Basic security check: must start with SELECT (case-insensitive)
    clean_query = query.strip()
    if not re.match(r'^\s*SELECT', clean_query, re.IGNORECASE):
        return "Error: Only SELECT queries are allowed for security reasons."
    
    # Additional check to prevent multiple statements or dangerous keywords
    if clean_query.count(";") > 1 or (";" in clean_query and not clean_query.endswith(";")) or any(k in clean_query.upper() for k in ["DROP", "DELETE", "UPDATE", "INSERT", "TRUNCATE"]):
        return "Error: Forbidden keywords or multiple statements detected."

    try:
        result = ctx.deps.db.execute(text(clean_query))
        # Convert rows to dictionaries
        return [dict(row._mapping) for row in result.fetchall()]
    except Exception as e:
        return f"Error executing query: {str(e)}"
