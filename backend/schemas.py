from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = "brand"

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

from datetime import datetime

class ProductBase(BaseModel):
    name: str
    sku: Optional[str] = None
    description: Optional[str] = None

class ProductCreate(ProductBase):
    brand_id: str

class ProductResponse(ProductBase):
    id: str
    brand_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class DPPBase(BaseModel):
    material_composition: Optional[str] = None
    carbon_footprint_kg: Optional[float] = None
    water_usage_liters: Optional[float] = None
    status: Optional[str] = "draft"

class DPPCreate(DPPBase):
    product_id: str
    supplier_id: str

class DPPResponse(DPPBase):
    id: str
    product_id: str
    supplier_id: str
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
