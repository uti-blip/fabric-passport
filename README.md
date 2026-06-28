# Fabric Passport

Digital Product Passport (DPP) platform for textile/fashion supply-chain traceability —
supplier onboarding, DPP generation, audit trails, and EU ESPR compliance readiness.

## Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind
- **Backend:** FastAPI (Python) + SQLite
- **Deploy:** Vercel (frontend) / Render (backend)

## Quick Start

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd frontend
npm install && npm run dev
```

## Project Structure

```
fabric-passport/
├── backend/          # FastAPI (auth, suppliers, DPP, audit)
├── frontend/         # Next.js (dashboard, supplier management)
└── docs/             # Pitch, plans, analysis
```
