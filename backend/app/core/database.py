from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.sqlite_url,
    connect_args={"check_same_thread": False},  # required for SQLite
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# PostgreSQL Engine for Analytical Data
postgres_engine = create_engine(settings.postgres_url)
PostgresSessionLocal = sessionmaker(
    autocommit=False, autoflush=False, bind=postgres_engine
)


class Base(DeclarativeBase):
    pass


class HistoryBase(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_postgres_db():
    db = PostgresSessionLocal()
    try:
        yield db
    finally:
        db.close()
