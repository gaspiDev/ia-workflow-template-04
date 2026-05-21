from sqlalchemy.orm import Session
from app.models.chat_message import ChatMessage
from app.schemas.chat_message import ChatMessageCreate


def get_all(db: Session) -> list[ChatMessage]:
    return db.query(ChatMessage).order_by(ChatMessage.timestamp.asc()).all()


def create(db: Session, data: ChatMessageCreate) -> ChatMessage:
    message = ChatMessage(**data.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


def delete_all(db: Session) -> None:
    db.query(ChatMessage).delete()
    db.commit()
