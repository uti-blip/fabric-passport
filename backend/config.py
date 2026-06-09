import os
from pathlib import Path

# ── Database ──────────────────────────────────────────
DB_PATH = os.getenv(
    "DATABASE_URL",
    f"sqlite:///{Path(__file__).parent / 'fabric_passport.db'}",
)

# ── Security ──────────────────────────────────────────
SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production-at-least-32-chars")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1 week

# ── CORS ──────────────────────────────────────────────
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000"
).split(",")

# ── App ───────────────────────────────────────────────
APP_ENV = os.getenv("APP_ENV", "development")
DEBUG = os.getenv("DEBUG", "true").lower() == "true"
