"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProducts, createProduct } from "@/lib/api";

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brandId, setBrandId] = useState("");
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    try { setProducts(await fetchProducts()); } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !brandId) return;
    setAdding(true);
    try {
      await createProduct({ name, sku, brand_id: brandId });
      setName(""); setSku(""); setBrandId("");
      await load();
    } catch (e) { console.error(e); }
    finally { setAdding(false); }
  }

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground mt-1">Manage your product catalog and DPPs.</p>
      </div>

      {/* Add product */}
      <Card className="glass luxury-border">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Product name" value={name} onChange={(e) => setName(e.target.value)} required className="flex-1" />
            <Input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} className="sm:w-32" />
            <Input placeholder="Brand ID" value={brandId} onChange={(e) => setBrandId(e.target.value)} required className="sm:w-40" />
            <Button type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Products grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="glass p-6 space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-20" />
            </Card>
          ))
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <span className="text-5xl mb-4 block opacity-30">□</span>
            <p className="text-muted-foreground mb-2">No products yet</p>
            <p className="text-sm text-muted-foreground">Use the form above to add your first product.</p>
          </div>
        ) : (
          products.map((p: any) => (
            <Link key={p.id} href={`/dashboard/products/${p.id}`}>
              <Card className="glass luxury-border hover:border-amber-500/40 transition-all duration-300 cursor-pointer h-full group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <p className="font-serif font-bold text-lg group-hover:text-primary transition-colors">{p.name}</p>
                    <span className="text-xs text-muted-foreground">→</span>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground mb-2">{p.sku || "No SKU"}</p>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
