from sqlalchemy import String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import List, Optional

from app.core.database import Base

class Shop(Base):
    __tablename__ = "shops"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    spot_number: Mapped[str] = mapped_column(String(20), nullable=False)

    category: Mapped["Category"] = relationship(back_populates="shops")
    sales: Mapped[List["Sale"]] = relationship(back_populates="shop")
    employees: Mapped[List["Employee"]] = relationship(back_populates="shop")
    rents: Mapped[List["Rent"]] = relationship(back_populates="shop")
