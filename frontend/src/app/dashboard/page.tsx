"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchProducts, fetchDPPs } from "@/lib/api";

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [dpps, setDpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, d] = await Promise.all([fetchProducts(), fetchDPPs()]);
        setProducts(p);
        setDpps(d);
      } catch (e) {
        console.error("Failed to load dashboard:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const compliantCount = dpps.filter((d: any) => d.status === "compliant").length;
  const stats = [
    { name: "Total Products", value: products.length },
    { name: "Compliant DPPs", value: compliantCount },
    { name: "Pending", value: dpps.length - compliantCount },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight mb-2">Dashboard</h2>
        <p className="text-muted-foreground text-sm">Traceability status of your collections.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name} className="glass border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle className="font-serif text-xl">Recent Products</CardTitle>
          <CardDescription>Status of your digital product passports.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground py-4">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-muted-foreground py-4">
              No products yet.{" "}
              <a href="/dashboard/products" className="text-primary hover:underline">
                Create your first product
              </a>
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>DPP Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product: any) => {
                  const dpp = dpps.find((d: any) => d.product_id === product.id);
                  const status = dpp?.status || "draft";
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.sku || "—"}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                          status === "compliant" ? "border-green-500/30 bg-green-500/10 text-green-400" :
                          status === "draft" ? "border-gray-500/30 bg-gray-500/10 text-gray-400" :
                          "border-yellow-500/30 bg-yellow-500/10 text-yellow-400"
                        }`}>
                          {status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <a href={`/dashboard/products/${product.id}`} className="text-sm text-primary hover:underline">
                          View
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
