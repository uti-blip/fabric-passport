"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchProducts, createProduct } from "@/lib/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [brandId, setBrandId] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !brandId) return;
    await createProduct({ name, sku, brand_id: brandId });
    setName(""); setSku(""); setBrandId("");
    load();
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-serif font-bold tracking-tight">Products</h2>

      <Card className="glass border-border/50">
        <CardHeader><CardTitle className="text-lg">Add Product</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex gap-3">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input placeholder="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
            <Input placeholder="Brand ID" value={brandId} onChange={(e) => setBrandId(e.target.value)} required />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="glass border-border/50">
        <CardContent className="pt-6">
          {loading ? <p className="text-muted-foreground">Loading...</p> :
           products.length === 0 ? <p className="text-muted-foreground">No products yet.</p> : (
            <Table>
              <TableHeader>
                <TableRow><TableHead>SKU</TableHead><TableHead>Name</TableHead><TableHead>Created</TableHead></TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.sku || "—"}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
