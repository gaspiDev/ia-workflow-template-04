import logging
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db, get_postgres_db
from app.schemas.chat_message import ChatMessage, QueryRequest, QueryResponse, ChatMessageCreate
from app.services import chat_message as svc
from app.agents.alto_agent import alto_agent, AltoAgentDeps

logger = logging.getLogger("api.routers.chat_message")

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/history", response_model=list[ChatMessage])
def get_history(db: Session = Depends(get_db)):
    logger.info("GET /chat/history")
    return svc.get_history(db)


@router.delete("/history", status_code=status.HTTP_204_NO_CONTENT)
def clear_history(db: Session = Depends(get_db)):
    logger.info("DELETE /chat/history")
    svc.clear_history(db)


@router.post("/query", response_model=QueryResponse)
async def query_agent(
    request: QueryRequest,
    db: Session = Depends(get_db),
    pg_db: Session = Depends(get_postgres_db)
):
    logger.info(f"POST /chat/query: {request.query}")
    
    # 1. Save user message to history
    user_msg = ChatMessageCreate(role="user", content=request.query)
    svc.repo.create(db, user_msg)
    
    # 2. Run AI Agent
    try:
        deps = AltoAgentDeps(db=pg_db)
        result = await alto_agent.run(request.query, deps=deps)
        answer = result.output
    except Exception as e:
        logger.error(f"Agent error: {str(e)}")
        answer = "I'm sorry, I encountered an error while processing your request."
    
    # 3. Save assistant response to history
    assistant_msg = ChatMessageCreate(role="assistant", content=answer)
    svc.repo.create(db, assistant_msg)
    
    # 4. Return answer and updated history
    history = svc.get_history(db)
    return QueryResponse(answer=answer, history=history)
