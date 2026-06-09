from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Fabric Passport API",
    description="Backend API for Fabric Passport DPP system",
    version="0.1.0",
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import auth_router, products, dpps, ingestion

app.include_router(auth_router.router)
app.include_router(products.router)
app.include_router(dpps.router)
app.include_router(ingestion.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Welcome to Fabric Passport API"}
