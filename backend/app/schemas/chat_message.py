from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ChatMessageBase(BaseModel):
    role: str
    content: str


class ChatMessageCreate(ChatMessageBase):
    pass


class ChatMessage(ChatMessageBase):
    id: int
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)
