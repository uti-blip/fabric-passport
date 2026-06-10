"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { fetchProducts, fetchDPPs } from "@/lib/api";

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}

export default function DashboardPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [dpps, setDpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchDPPs()])
      .then(([p, d]) => {
        setProducts(p);
        setDpps(d);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const compliant = dpps.filter((d: any) => d.status === "compliant").length;
  const pending = dpps.length - compliant;

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Your supply chain traceability at a glance.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Total Products", value: products.length, href: "/dashboard/products" },
          { label: "Compliant DPPs", value: compliant, href: "/dashboard/dpps", accent: "text-emerald-400" },
          { label: "Pending", value: pending, href: "/dashboard/dpps", accent: "text-amber-400" },
        ].map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="glass luxury-border hover:border-amber-500/40 transition-all duration-300 group cursor-pointer h-full">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                {loading ? (
                  <Skeleton className="h-9 w-16" />
                ) : (
                  <p className={`text-3xl font-serif font-bold ${stat.accent || ""}`}>
                    {stat.value}
                  </p>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Products table */}
      <Card className="glass luxury-border overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div>
            <h3 className="text-lg font-serif font-bold">Recent Products</h3>
            <p className="text-sm text-muted-foreground">Digital Product Passport status.</p>
          </div>
          <Link
            href="/dashboard/products"
            className="text-sm text-primary hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-border/30 text-left">
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-20 rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4 w-12 ml-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-muted-foreground mb-3">No products yet.</p>
                    <Link
                      href="/dashboard/products"
                      className="text-sm text-primary hover:underline"
                    >
                      Add your first product →
                    </Link>
                  </td>
                </tr>
              ) : (
                products.slice(0, 5).map((p: any) => {
                  const dpp = dpps.find((d: any) => d.product_id === p.id);
                  const status = dpp?.status || "draft";
                  return (
                    <tr key={p.id} className="hover:bg-accent/30 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                        {p.sku || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{p.name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                            status === "compliant"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : status === "draft"
                              ? "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              status === "compliant" ? "bg-emerald-400" :
                              status === "draft" ? "bg-zinc-400" : "bg-amber-400"
                            }`}
                          />
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/dashboard/products/${p.id}`}
                          className="text-sm text-primary hover:underline"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
