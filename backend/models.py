from sqlalchemy import Column, String, Text, Numeric, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import uuid
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="brand") # brand or supplier
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Brand(Base):
    __tablename__ = "brands"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    website = Column(String(255))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    products = relationship("Product", back_populates="brand", cascade="all, delete-orphan")

class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    country = Column(String(100), default="Vietnam")
    certification_details = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    dpps = relationship("DPP", back_populates="supplier", cascade="all, delete-orphan")

class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True, default=generate_uuid)
    brand_id = Column(String, ForeignKey("brands.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    sku = Column(String(100), unique=True)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    brand = relationship("Brand", back_populates="products")
    dpp = relationship("DPP", back_populates="product", uselist=False, cascade="all, delete-orphan")

class DPP(Base):
    __tablename__ = "dpps"

    id = Column(String, primary_key=True, default=generate_uuid)
    product_id = Column(String, ForeignKey("products.id", ondelete="CASCADE"))
    supplier_id = Column(String, ForeignKey("suppliers.id", ondelete="CASCADE"))
    material_composition = Column(Text)
    carbon_footprint_kg = Column(Numeric)
    water_usage_liters = Column(Numeric)
    status = Column(String(50), default="draft") # draft, compliant, published
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    product = relationship("Product", back_populates="dpp")
    supplier = relationship("Supplier", back_populates="dpps")
