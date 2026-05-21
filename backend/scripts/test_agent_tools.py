import sys
import os
# Set dummy key before importing anything that might trigger client init
os.environ["OPENAI_API_KEY"] = "sk-dummy"

from os.path import dirname, abspath
# Add the parent directory to sys.path so we can import 'app'
sys.path.insert(0, dirname(dirname(abspath(__file__))))

from sqlalchemy.orm import Session
from app.core.database import PostgresSessionLocal
from app.agents.alto_agent import AltoAgentDeps, list_tables, get_table_metadata, execute_select
from pydantic_ai import RunContext

def test_tools():
    db: Session = PostgresSessionLocal()
    deps = AltoAgentDeps(db=db)
    # We create a dummy RunContext for testing tool functions directly
    ctx = RunContext(
        deps=deps,
        model=None,
        usage=None,
        prompt="",
        messages=[]
    )

    print("--- Testing Tools ---")
    
    # 1. Test list_tables
    tables = list_tables(ctx)
    print(f"Tables found: {tables}")
    assert "shops" in tables
    assert "sales" in tables

    # 2. Test get_table_metadata
    metadata = get_table_metadata(ctx, "shops")
    print(f"Metadata for 'shops': {metadata}")
    assert "name" in metadata
    assert "spot_number" in metadata

    # 3. Test execute_select
    print("Executing SELECT query...")
    results = execute_select(ctx, "SELECT name FROM shops LIMIT 2")
    print(f"Query results: {results}")
    assert isinstance(results, list)
    if len(results) > 0:
        assert "name" in results[0]

    # 4. Test security check
    print("Testing security check (DELETE)...")
    security_error = execute_select(ctx, "DELETE FROM shops")
    print(f"Security error result: {security_error}")
    assert "Error" in security_error

    db.close()
    print("--- All tool tests passed! ---")

if __name__ == "__main__":
    test_tools()
