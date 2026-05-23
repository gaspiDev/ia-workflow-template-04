import asyncio
import os
import sys
from os.path import dirname, abspath

# Add the parent directory to sys.path so we can import 'app'
sys.path.insert(0, dirname(dirname(abspath(__file__))))

from app.core.database import PostgresSessionLocal
from app.agents.alto_agent import alto_agent, AltoAgentDeps
from app.core.config import settings

async def test_live_agent():
    print("--- Testing Live Agent with OpenRouter ---")
    print(f"Using Model: {settings.model_name}")
    
    question = "How many shops are there in the mall?"
    print(f"Question: {question}")
    
    pg_db = PostgresSessionLocal()
    deps = AltoAgentDeps(db=pg_db)
    
    try:
        result = await alto_agent.run(question, deps=deps)
        print("\n--- Agent Response ---")
        print(result.output)
        print("----------------------\n")
    except Exception as e:
        print(f"Error during agent run: {e}")
    finally:
        pg_db.close()

if __name__ == "__main__":
    asyncio.run(test_live_agent())
