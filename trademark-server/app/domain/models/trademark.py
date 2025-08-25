from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone, timedelta
from enum import Enum


class TrademarkStatus(str, Enum):
    ENABLED = "enabled"
    DISABLED = "disabled"

class TrademarkBase(SQLModel):
    brand_name: str = Field(min_length=1, max_length=255, description="Name of the brand")
    title: str = Field(min_length=1, max_length=255, description="Title of the trademark")
    status: TrademarkStatus = Field(default=TrademarkStatus.ENABLED, description="Status of the trademark")

class Trademark(TrademarkBase, table=True):
    __tablename__ = "trademarks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone(timedelta(hours=-5))))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone(timedelta(hours=-5))))

class TrademarkCreate(TrademarkBase):
    pass

class TrademarkUpdate(SQLModel):
    brand_name: Optional[str] = Field(None, min_length=1, max_length=255)
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    status: Optional[TrademarkStatus] = None

class TrademarkResponse(TrademarkBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True