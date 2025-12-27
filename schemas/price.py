"""
Price schemas.
"""
from datetime import date
from pydantic import BaseModel, Field
from typing import Optional
from decimal import Decimal


class PriceCreate(BaseModel):
    """Schema for creating a price."""
    crop_id: int = Field(..., description="ID of the crop")
    market_id: int = Field(..., description="ID of the market")
    price: Decimal = Field(..., gt=0, description="Price in ETB (Ethiopian Birr)")
    price_date: date = Field(..., description="Date of the price record")


class PriceResponse(BaseModel):
    """Schema for price response."""
    id: int
    crop_id: int
    market_id: int
    price: Decimal
    price_date: date
    
    class Config:
        from_attributes = True


class PriceResponseWithDetails(BaseModel):
    """Schema for price response with crop and market details."""
    id: int
    crop_id: int
    market_id: int
    price: Decimal
    price_date: date
    crop_name: Optional[str] = None
    market_name: Optional[str] = None
    market_region: Optional[str] = None
    
    class Config:
        from_attributes = True





