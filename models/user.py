"""
User model for GebeyaAlert.
"""
from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship, Column, String
from sqlalchemy import Boolean, Index

from .base import BaseModel, TimestampMixin

if TYPE_CHECKING:
    from .alert import Alert
    from .notification_log import NotificationLog


class User(BaseModel, TimestampMixin, table=True):
    """User model representing farmers/users in the system."""
    
    __tablename__ = "users"
    
    phone_number: str = Field(
        sa_column=Column(String(20), unique=True, nullable=False, index=True),
        description="User's phone number (unique identifier)"
    )
    language: str = Field(
        default="en",
        sa_column=Column(String(10), nullable=False),
        description="User's preferred language (e.g., 'en', 'am', 'om')"
    )
    is_admin: bool = Field(
        default=False,
        sa_column=Column(Boolean, nullable=False, server_default='false'),
        description="Whether the user is an administrator"
    )
    
    # Relationships
    alerts: List["Alert"] = Relationship(back_populates="user")
    notification_logs: List["NotificationLog"] = Relationship(back_populates="user")

