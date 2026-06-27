"""Vietnam textile supplier scraper for Fabric Passport.

Scrapes major Vietnam textile directories and B2B platforms
to discover verified garment manufacturers, fabric mills,
and trading companies.
"""
import asyncio
import re
from datetime import datetime
from typing import List, Dict, Any, Optional
from dataclasses import dataclass

import httpx
from bs4 import BeautifulSoup


@dataclass
class ScrapedSupplier:
    name: str
    country: str = "VN"
    city: Optional[str] = None
    website: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    products: List[str] = None
    certifications: List[str] = None
    moq: Optional[int] = None
    employee_count: Optional[str] = None
    source: str = ""
    raw_data: Dict[str, Any] = None

    def __post_init__(self):
        if self.products is None:
            self.products = []
        if self.certifications is None:
            self.certifications = []
        if self.raw_data is None:
            self.raw_data = {}


class VietnamTextileScraper:
    """Scraper for Vietnam textile suppliers.

    Sources:
    - vietnamtextile.org (directory)
    - vietnammanufacturers.com
    - Alibaba Vietnam filtered results
    - Google search fallback
    """

    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        ),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    TIMEOUT = httpx.Timeout(30.0, connect=10.0)

    # Known Vietnam textile cities
    TEXTILE_CITIES = [
        "Ho Chi Minh City", "Hanoi", "Da Nang", "Bien Hoa",
        "Can Tho", "Hai Phong", "Nha Trang", "Vung Tau",
        "Binh Duong", "Dong Nai", "Long An", "Tay Ninh",
        "Thu Dau Mot", "An Giang", "Binh Thuan",
    ]

    # Known certifications to look for
    CERT_PATTERNS = [
        r"GOTS", r"OEKO-TEX", r"OEKO\s*TEX", r"BCI",
        r"Fair\s*Trade", r"GRS", r"FSC", r"bluesign",
        r"Cradle\s*to\s*Cradle", r"ISO\s*14001", r"SA8000",
        r"WRAP", r"BSCI", r"Sedex", r"OEKO-TEX\s*Standard\s*100",
    ]

    def __init__(self):
        self.client: Optional[httpx.AsyncClient] = None

    async def __aenter__(self):
        self.client = httpx.AsyncClient(
            headers=self.HEADERS,
            timeout=self.TIMEOUT,
            follow_redirects=True,
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.client:
            await self.client.aclose()

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    async def discover(
        self,
        material_type: Optional[str] = None,
        certification: Optional[str] = None,
        city: Optional[str] = None,
        min_employees: Optional[int] = None,
        max_results: int = 50,
    ) -> List[ScrapedSupplier]:
        """Discover Vietnam textile suppliers across all sources."""
        tasks = [
            self._scrape_vietnamtextile_org(material_type, max_results),
            self._scrape_alibaba_vn(material_type, max_results),
            self._scrape_google_fallback(material_type, city, max_results),
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        all_suppliers: List[ScrapedSupplier] = []
        for result in results:
            if isinstance(result, Exception):
                print(f"[Scraper] Source failed: {result}")
                continue
            all_suppliers.extend(result)

        # Deduplicate by name + city
        seen = set()
        deduped = []
        for s in all_suppliers:
            key = (s.name.lower().strip(), (s.city or "").lower().strip())
            if key not in seen:
                seen.add(key)
                deduped.append(s)

        # Filter
        filtered = self._apply_filters(
            deduped, certification=certification, city=city, min_employees=min_employees
        )

        return filtered[:max_results]

    async def enrich_supplier(self, supplier: ScrapedSupplier) -> ScrapedSupplier:
        """Enrich a supplier record with additional data from their website."""
        if not supplier.website:
            return supplier

        try:
            resp = await self.client.get(supplier.website, timeout=15.0)
            if resp.status_code == 200:
                soup = BeautifulSoup(resp.text, "html.parser")
                # Extract certifications
                text = soup.get_text(separator=" ", strip=True)
                for pattern in self.CERT_PATTERNS:
                    if re.search(pattern, text, re.IGNORECASE):
                        cert = re.search(pattern, text, re.IGNORECASE).group(0)
                        if cert not in supplier.certifications:
                            supplier.certifications.append(cert)
                # Extract email if missing
                if not supplier.email:
                    emails = re.findall(
                        r"[\w.+-]+@[\w-]+\.[\w.-]+", text
                    )
                    if emails:
                        supplier.email = emails[0]
                # Extract phone if missing
                if not supplier.phone:
                    phones = re.findall(
                        r"\+84[\s\d.-]{7,15}|\(84\)[\s\d.-]{7,15}", text
                    )
                    if phones:
                        supplier.phone = phones[0]
        except Exception as e:
            print(f"[Scraper] Enrichment failed for {supplier.name}: {e}")

        return supplier

    # ------------------------------------------------------------------
    # Source-specific scrapers
    # ------------------------------------------------------------------

    async def _scrape_vietnamtextile_org(
        self, material_type: Optional[str], max_results: int
    ) -> List[ScrapedSupplier]:
        """Scrape vietnamtextile.org member directory."""
        url = "https://vietnamtextile.org.vn/en/members/"
        try:
            resp = await self.client.get(url)
            if resp.status_code != 200:
                return []

            soup = BeautifulSoup(resp.text, "html.parser")
            suppliers = []

            # Look for member listings
            listings = soup.find_all("div", class_=re.compile("member|company|supplier", re.I))
            if not listings:
                listings = soup.find_all("article") or soup.find_all("div", class_=re.compile("item|entry", re.I))

            for listing in listings[:max_results]:
                name_tag = (
                    listing.find("h2") or listing.find("h3") or
                    listing.find("a", class_=re.compile("title|name", re.I)) or
                    listing.find("a")
                )
                if not name_tag:
                    continue

                name = name_tag.get_text(strip=True)
                website = name_tag.get("href") if name_tag.name == "a" else None

                # Try to find city
                city = None
                for c in self.TEXTILE_CITIES:
                    if c.lower() in listing.get_text().lower():
                        city = c
                        break

                # Try to find email
                email = None
                email_tag = listing.find("a", href=re.compile("mailto:"))
                if email_tag:
                    email = email_tag.get("href", "").replace("mailto:", "")

                supplier = ScrapedSupplier(
                    name=name,
                    city=city,
                    website=website,
                    email=email,
                    source="vietnamtextile.org",
                )
                suppliers.append(supplier)

            return suppliers
        except Exception as e:
            print(f"[Scraper] vietnamtextile.org failed: {e}")
            return []

    async def _scrape_alibaba_vn(
        self, material_type: Optional[str], max_results: int
    ) -> List[ScrapedSupplier]:
        """Scrape Alibaba Vietnam suppliers (filtered search)."""
        keywords = material_type or "garment"
        url = (
            f"https://www.alibaba.com/trade/search?"
            f"fsb=y&IndexArea=product_en&CatId=&SearchText={keywords}+vietnam"
        )
        try:
            resp = await self.client.get(url)
            if resp.status_code != 200:
                return []

            soup = BeautifulSoup(resp.text, "html.parser")
            suppliers = []

            # Alibaba product listings
            items = soup.find_all("div", class_=re.compile("product-item|list-item", re.I))
            for item in items[:max_results]:
                title_tag = item.find("h2") or item.find("a", title=True)
                if not title_tag:
                    continue

                name = title_tag.get("title") or title_tag.get_text(strip=True)
                link = title_tag.get("href", "")
                if link and not link.startswith("http"):
                    link = "https:" + link

                # Try to extract company name from item
                company_tag = item.find("a", class_=re.compile("company|supplier", re.I))
                company_name = company_tag.get_text(strip=True) if company_tag else name

                supplier = ScrapedSupplier(
                    name=company_name,
                    website=link,
                    source="alibaba.com",
                )
                suppliers.append(supplier)

            return suppliers
        except Exception as e:
            print(f"[Scraper] Alibaba failed: {e}")
            return []

    async def _scrape_google_fallback(
        self,
        material_type: Optional[str],
        city: Optional[str],
        max_results: int,
    ) -> List[ScrapedSupplier]:
        """Google search fallback for Vietnam textile suppliers."""
        query = f"textile manufacturer Vietnam {material_type or ''} {city or ''}"
        url = f"https://www.google.com/search?q={query.replace(' ', '+')}"

        try:
            resp = await self.client.get(url)
            if resp.status_code != 200:
                return []

            soup = BeautifulSoup(resp.text, "html.parser")
            suppliers = []

            # Google search results
            results = soup.find_all("div", class_=re.compile("g|result", re.I))
            for result in results[:max_results]:
                title_tag = result.find("h3")
                if not title_tag:
                    continue

                name = title_tag.get_text(strip=True)
                link_tag = result.find("a")
                website = link_tag.get("href") if link_tag else None

                # Skip non-supplier results
                if any(x in name.lower() for x in ["wikipedia", "news", "linkedin", "facebook"]):
                    continue

                # Try to find city
                snippet = result.get_text()
                found_city = None
                for c in self.TEXTILE_CITIES:
                    if c.lower() in snippet.lower():
                        found_city = c
                        break

                supplier = ScrapedSupplier(
                    name=name,
                    city=found_city,
                    website=website,
                    source="google_search",
                )
                suppliers.append(supplier)

            return suppliers
        except Exception as e:
            print(f"[Scraper] Google fallback failed: {e}")
            return []

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    def _apply_filters(
        self,
        suppliers: List[ScrapedSupplier],
        certification: Optional[str] = None,
        city: Optional[str] = None,
        min_employees: Optional[int] = None,
    ) -> List[ScrapedSupplier]:
        """Apply filters to scraped suppliers."""
        result = suppliers

        if certification:
            cert_lower = certification.lower()
            result = [
                s for s in result
                if any(cert_lower in c.lower() for c in s.certifications)
            ]

        if city:
            city_lower = city.lower()
            result = [
                s for s in result
                if s.city and city_lower in s.city.lower()
            ]

        if min_employees:
            # Rough heuristic - can't reliably extract from all sources
            result = [s for s in result if s.employee_count]

        return result


# ------------------------------------------------------------------
# Convenience functions
# ------------------------------------------------------------------

async def scrape_vietnam_suppliers(
    material_type: Optional[str] = None,
    certification: Optional[str] = None,
    max_results: int = 30,
) -> List[ScrapedSupplier]:
    """Quick entry point to scrape Vietnam suppliers."""
    async with VietnamTextileScraper() as scraper:
        return await scraper.discover(
            material_type=material_type,
            certification=certification,
            max_results=max_results,
        )


async def enrich_supplier_batch(suppliers: List[ScrapedSupplier]) -> List[ScrapedSupplier]:
    """Enrich a batch of suppliers with website data."""
    async with VietnamTextileScraper() as scraper:
        tasks = [scraper.enrich_supplier(s) for s in suppliers]
        return await asyncio.gather(*tasks)
