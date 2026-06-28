# Fabric Passport — Agent Guide

> **Digital Product Passport (DPP) platform** for textile/fashion supply-chain traceability.
> Supplier onboarding, DPP generation, audit trails, compliance with EU DPP regulation (ESPR).

## What this project is

Fabric Passport helps brands and manufacturers create and manage **Digital Product Passports** —
the standardized digital records that the EU ESPR will require for textiles, footwear, and other
product categories. It is **not** an EU AI Act compliance tool.

Core features:
- Supplier registry & traceability (Vietnam-focused launch market)
- DPP generation (QR-code-linked product passports)
- Audit trail / evidence vault per supplier and product
- Dashboard for brands to track DPP readiness

## Architecture

```
fabric-passport/
├── backend/          # FastAPI (Python 3.11) — auth, suppliers, DPP, audit
│   ├── main.py       # FastAPI app + middleware (⚠️ owned by security hardening)
│   ├── config.py     # env-driven config
│   ├── auth.py       # JWT auth
│   ├── models.py     # SQLAlchemy models
│   ├── routers/      # API routes
│   └── requirements.txt  # ⚠️ owned by security hardening
├── frontend/         # Next.js 14 + TypeScript + Tailwind
│   └── src/          # app/, components/, lib/
├── app/              # (legacy Vite frontend — being phased out)
├── render.yaml       # Render.com backend deploy
└── .github/workflows/ci.yml
```

## Deploy

- **Backend:** Render (`render.yaml`) → `fabric-passport-api`
- **Frontend:** Vercel → `fabric-passport.vercel.app`
- **CORS origins** must include `https://fabric-passport.vercel.app`

## Development conventions

- Backend: run from `backend/` with `uvicorn main:app --reload --port 8000`
- Frontend: run from `frontend/` with `npm run dev`
- Never commit `.env` files or secrets — only `.env.example`
- Legacy folders (`frontend/backend/`, `frontend/backend-railway/`, `lexia-backend/`) are
  untracked remnants from the previous "Lexia" product; do not rely on them.

## Rename context

This project was rebranded from **Lexia** (EU AI Act compliance) → **Fabric Passport** (DPP platform).
If you encounter residual "lexia" references, update them to "fabric-passport" / "Fabric Passport".
