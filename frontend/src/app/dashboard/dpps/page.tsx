"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { fetchDPPs } from "@/lib/api";

function Skeleton({ className }: { className?: string }) {
  return <div className={`skeleton ${className || ""}`} />;
}

export default function DPPsPage() {
  const [dpps, setDpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDPPs().then(setDpps).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 animate-in">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight">Digital Product Passports</h2>
        <p className="text-muted-foreground mt-1">All DPPs across your supply chain.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="glass p-6 space-y-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-16" />
            </Card>
          ))
        ) : dpps.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <span className="text-5xl mb-4 block opacity-30">◆</span>
            <p className="text-muted-foreground mb-2">No DPPs yet</p>
            <p className="text-sm text-muted-foreground">
              DPPs are created when supplier data is uploaded.
            </p>
          </div>
        ) : (
          dpps.map((dpp: any) => (
            <Link key={dpp.id} href={`/dpp/${dpp.id}`}>
              <Card className="glass luxury-border hover:border-amber-500/40 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                        dpp.status === "compliant"
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-zinc-500/30 bg-zinc-500/10 text-zinc-400"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${dpp.status === "compliant" ? "bg-emerald-400" : "bg-zinc-400"}`} />
                      {dpp.status}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">View →</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Material</p>
                    <p className="text-sm font-medium line-clamp-2">{dpp.material_composition || "—"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Carbon</p>
                      <p className="font-medium">{dpp.carbon_footprint_kg ?? "—"} kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Water</p>
                      <p className="font-medium">{dpp.water_usage_liters ?? "—"} L</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
