"""In-memory supplier catalog with seed data for Fabric Passport.

Provides a fallback when scraping fails and seeds the database
with known verified Vietnam textile suppliers.
"""
from typing import List, Dict, Any, Optional
from datetime import datetime


SEED_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "name": "Vietnam Textile & Garment Group (Vinatex)",
        "country": "VN",
        "city": "Hanoi",
        "supplier_type": "manufacturer",
        "website": "https://vinatex.com.vn",
        "contact_email": "info@vinatex.com.vn",
        "products": ["cotton fabric", "polyester", "garment manufacturing"],
        "certifications": ["OEKO-TEX", "ISO 14001"],
        "moq": 500,
        "lead_time_days": 45,
        "rating": 4.5,
        "verified": True,
    },
    {
        "name": "TAL Apparel Vietnam",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://www.talapparel.com",
        "contact_email": "info@talapparel.com",
        "products": ["shirts", "blouses", "technical garments"],
        "certifications": ["OEKO-TEX", "bluesign", "BSCI"],
        "moq": 1000,
        "lead_time_days": 60,
        "rating": 4.7,
        "verified": True,
    },
    {
        "name": "Saitex International",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://saitexusa.com",
        "contact_email": "info@saitexusa.com",
        "products": ["denim", "jeans", "sustainable denim"],
        "certifications": ["GOTS", "OEKO-TEX", "BCI", "Fair Trade"],
        "moq": 300,
        "lead_time_days": 50,
        "rating": 4.8,
        "verified": True,
    },
    {
        "name": "Nha Be Garment Corporation",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://nhabegarment.com.vn",
        "contact_email": "export@nhabegarment.com.vn",
        "products": ["casual wear", "workwear", "uniforms"],
        "certifications": ["OEKO-TEX", "SA8000"],
        "moq": 500,
        "lead_time_days": 40,
        "rating": 4.2,
        "verified": True,
    },
    {
        "name": "Dong Xuan Knitting Company",
        "country": "VN",
        "city": "Hanoi",
        "supplier_type": "mill",
        "website": "https://dongxuan.com.vn",
        "contact_email": "sales@dongxuan.com.vn",
        "products": ["knitted fabric", "cotton jersey", "technical knit"],
        "certifications": ["OEKO-TEX", "ISO 14001"],
        "moq": 200,
        "lead_time_days": 30,
        "rating": 4.3,
        "verified": True,
    },
    {
        "name": "Phong Phu Corporation",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://phongphucorp.com",
        "contact_email": "info@phongphucorp.com",
        "products": ["denim", "casual wear", "outerwear"],
        "certifications": ["OEKO-TEX", "BSCI"],
        "moq": 1000,
        "lead_time_days": 55,
        "rating": 4.4,
        "verified": True,
    },
    {
        "name": "Viet Tien Garment",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://viettiengarment.com.vn",
        "contact_email": "info@viettiengarment.com.vn",
        "products": ["formal wear", "shirts", "trousers"],
        "certifications": ["OEKO-TEX", "ISO 14001", "SA8000"],
        "moq": 800,
        "lead_time_days": 45,
        "rating": 4.5,
        "verified": True,
    },
    {
        "name": "Thanh Cong Textile Garment",
        "country": "VN",
        "city": "Ho Chi Minh City",
        "supplier_type": "manufacturer",
        "website": "https://tcm.com.vn",
        "contact_email": "info@tcm.com.vn",
        "products": ["woven fabric", "garment manufacturing", "dyeing"],
        "certifications": ["OEKO-TEX", "bluesign"],
        "moq": 500,
        "lead_time_days": 50,
        "rating": 4.6,
        "verified": True,
    },
    {
        "name": "Hoa Tho Textile",
        "country": "VN",
        "city": "Da Nang",
        "supplier_type": "mill",
        "website": "https://hoatho.com.vn",
        "contact_email": "sales@hoatho.com.vn",
        "products": ["woven fabric", "dyed fabric", "printed fabric"],
        "certifications": ["OEKO-TEX"],
        "moq": 300,
        "lead_time_days": 35,
        "rating": 4.1,
        "verified": True,
    },
    {
        "name": "Song Hong Garment",
        "country": "VN",
        "city": "Hanoi",
        "supplier_type": "manufacturer",
        "website": "https://songhonggarment.com.vn",
        "contact_email": "export@songhonggarment.com.vn",
        "products": ["women's wear", "children's wear", "activewear"],
        "certifications": ["OEKO-TEX", "BSCI", "WRAP"],
        "moq": 600,
        "lead_time_days": 45,
        "rating": 4.4,
        "verified": True,
    },
]


class SupplierCatalog:
    """In-memory catalog of verified textile suppliers."""

    def __init__(self):
        self._suppliers = {s["name"]: s for s in SEED_SUPPLIERS}

    def list_all(self) -> List[Dict[str, Any]]:
        return list(self._suppliers.values())

    def get_by_name(self, name: str) -> Optional[Dict[str, Any]]:
        return self._suppliers.get(name)

    def filter_by_city(self, city: str) -> List[Dict[str, Any]]:
        city_lower = city.lower()
        return [s for s in self._suppliers.values() if city_lower in (s.get("city") or "").lower()]

    def filter_by_certification(self, cert: str) -> List[Dict[str, Any]]:
        cert_lower = cert.lower()
        return [
            s for s in self._suppliers.values()
            if any(cert_lower in c.lower() for c in s.get("certifications", []))
        ]

    def filter_by_product(self, product: str) -> List[Dict[str, Any]]:
        product_lower = product.lower()
        return [
            s for s in self._suppliers.values()
            if any(product_lower in p.lower() for p in s.get("products", []))
        ]

    def add_supplier(self, supplier: Dict[str, Any]) -> None:
        self._suppliers[supplier["name"]] = supplier

    def to_db_records(self, user_id: str) -> List[Dict[str, Any]]:
        """Convert catalog entries to database-ready records."""
        now = datetime.utcnow().isoformat()
        records = []
        for s in self._suppliers.values():
            records.append({
                "user_id": user_id,
                "name": s["name"],
                "country": s["country"],
                "city": s.get("city"),
                "supplier_type": s.get("supplier_type", "manufacturer"),
                "website": s.get("website"),
                "contact_email": s.get("contact_email"),
                "moq": s.get("moq"),
                "lead_time_days": s.get("lead_time_days"),
                "certifications": s.get("certifications", []),
                "rating": s.get("rating"),
                "verified": s.get("verified", False),
                "created_at": now,
                "updated_at": now,
            })
        return records
