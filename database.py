"""
Database configuration and session management.
"""
from sqlmodel import SQLModel, Session, create_engine
from typing import Generator

from config import settings

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)


def get_db() -> Generator[Session, None, None]:
    """
    Dependency function to get database session.
    Yields a database session and closes it after use.
    """
    session = None
    try:
        session = Session(engine)
        yield session
    except Exception:
        # Rollback on any exception
        if session:
            session.rollback()
        raise
    finally:
        if session:
            session.close()


def init_db() -> None:
    """
    Initialize database by creating all tables.
    Should be called after all models are imported.
    """
    # Import all models here so they're registered with SQLModel
    from models import User, Crop, Market, Price, Alert, NotificationLog  # noqa: F401
    
    SQLModel.metadata.create_all(engine)


