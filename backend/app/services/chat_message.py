from sqlalchemy.orm import Session
from app.repositories import chat_message as repo
from app.schemas.chat_message import ChatMessage


def get_history(db: Session) -> list[ChatMessage]:
    messages = repo.get_all(db)
    return [ChatMessage.model_validate(m) for m in messages]


def clear_history(db: Session) -> None:
    repo.delete_all(db)
