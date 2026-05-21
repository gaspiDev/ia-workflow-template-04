import logging
from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.chat_message import ChatMessage
from app.services import chat_message as svc

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
