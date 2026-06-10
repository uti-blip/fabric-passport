"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDPPPublic } from "@/lib/api";

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}

export default function PublicDPPPage({ params }: { params: { id: string } }) {
  const [dpp, setDpp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id === "demo") {
      setDpp({
        id: "demo",
        material_composition: "100% GOTS Certified Organic Cotton — Source: Tamil Nadu, India",
        carbon_footprint_kg: 2.4,
        water_usage_liters: 150,
        status: "compliant",
        product_id: "demo-1",
        supplier_id: "demo-s1",
        created_at: new Date().toISOString(),
        product_name: "Classic Organic Tee",
        brand_name: "EcoFashion Co.",
      });
      setLoading(false);
      return;
    }
    fetchDPPPublic(params.id)
      .then(setDpp)
      .catch(() => setDpp(null))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="space-y-4 text-center">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </div>
    );
  }

  if (!dpp) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="text-6xl">◆</span>
          <h1 className="text-2xl font-serif font-bold">Passport not found</h1>
          <p className="text-muted-foreground">This DPP does not exist or has been removed.</p>
          <Link href="/" className="text-primary hover:underline text-sm">
            ← Back to Fabric Passport
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="glass border-b border-border/30">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-serif font-bold luxury-gradient">Fabric Passport</span>
          <span className="text-xs text-muted-foreground">
            EU Digital Product Passport
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Verified DPP
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            {dpp.product_name || "Product Passport"}
          </h1>
          <p className="text-muted-foreground">{dpp.brand_name || "Brand"}</p>
        </div>

        {/* QR placeholder + key metrics */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass luxury-border rounded-2xl p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Carbon</p>
            <p className="text-2xl font-serif font-bold">{dpp.carbon_footprint_kg} <span className="text-sm font-sans font-normal text-muted-foreground">kg CO₂e</span></p>
          </div>
          <div className="glass luxury-border rounded-2xl p-6 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Water</p>
            <p className="text-2xl font-serif font-bold">{dpp.water_usage_liters} <span className="text-sm font-sans font-normal text-muted-foreground">liters</span></p>
          </div>
          <div className="glass luxury-border rounded-2xl p-6 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-xl mb-2 flex items-center justify-center">
              <span className="text-xs text-black font-mono">QR</span>
            </div>
            <p className="text-xs text-muted-foreground">Scan for details</p>
          </div>
        </div>

        {/* Material composition */}
        <div className="glass luxury-border rounded-2xl p-8">
          <h3 className="text-sm text-muted-foreground uppercase tracking-wider mb-4">Material Composition</h3>
          <p className="text-lg leading-relaxed">{dpp.material_composition || "Not specified"}</p>
        </div>

        {/* Footer info */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="glass rounded-xl p-4">
            <span className="text-xs uppercase tracking-wider block mb-1">Passport ID</span>
            <code className="text-xs font-mono text-foreground/70">{dpp.id}</code>
          </div>
          <div className="glass rounded-xl p-4">
            <span className="text-xs uppercase tracking-wider block mb-1">Created</span>
            <span>{new Date(dpp.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>

        <div className="text-center pt-8">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Powered by Fabric Passport — EU AI Act compliant
          </Link>
        </div>
      </div>
    </div>
  );
}
