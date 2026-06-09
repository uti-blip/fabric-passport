from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
import csv
from io import StringIO
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/ingestion", tags=["ingestion"])

@router.post("/csv")
def ingest_csv(
    supplier_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Only CSV files are supported")
    
    content = file.file.read().decode('utf-8')
    csv_reader = csv.DictReader(StringIO(content))
    
    created_dpps = []
    for row in csv_reader:
        # Expected CSV columns: sku, material, carbon, water
        sku = row.get("sku")
        if not sku:
            continue
            
        product = db.query(models.Product).filter(models.Product.sku == sku).first()
        if not product:
            continue
            
        dpp = models.DPP(
            product_id=product.id,
            supplier_id=supplier_id,
            material_composition=row.get("material"),
            carbon_footprint_kg=float(row.get("carbon", 0)),
            water_usage_liters=float(row.get("water", 0)),
            status="compliant"
        )
        db.add(dpp)
        db.commit()
        db.refresh(dpp)
        created_dpps.append(dpp.id)
        
        # Mock Email Notification to Brand
        print(f"Mock Email sent to Brand: Supplier {supplier_id} uploaded data for Product {product.sku}")
        
    return {"message": f"Successfully ingested {len(created_dpps)} DPP records", "dpp_ids": created_dpps}
