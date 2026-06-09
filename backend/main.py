from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from config import ALLOWED_ORIGINS, DEBUG
import models


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (not at import time)
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="Fabric Passport API",
    description="Digital Product Passport system — EU AI Act compliance",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────
from routers import auth_router, products, dpps, ingestion

app.include_router(auth_router.router)
app.include_router(products.router)
app.include_router(dpps.router)
app.include_router(ingestion.router)


@app.get("/")
def read_root():
    return {"status": "ok", "service": "Fabric Passport API", "version": "0.1.0"}


@app.get("/health")
def health():
    return {"status": "healthy", "debug": DEBUG}
