from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/dpps", tags=["dpps"])

@router.post("/", response_model=schemas.DPPResponse)
def create_dpp(dpp: schemas.DPPCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    db_dpp = models.DPP(**dpp.model_dump())
    db.add(db_dpp)
    db.commit()
    db.refresh(db_dpp)
    return db_dpp

@router.get("/", response_model=List[schemas.DPPResponse])
def get_dpps(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    dpps = db.query(models.DPP).offset(skip).limit(limit).all()
    return dpps

@router.get("/{dpp_id}", response_model=schemas.DPPResponse)
def get_dpp(dpp_id: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    dpp = db.query(models.DPP).filter(models.DPP.id == dpp_id).first()
    if not dpp:
        raise HTTPException(status_code=404, detail="DPP not found")
    return dpp
