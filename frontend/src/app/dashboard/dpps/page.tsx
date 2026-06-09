"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchDPPs } from "@/lib/api";

export default function DPPsPage() {
  const [dpps, setDpps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDPPs().then(setDpps).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight mb-2">Digital Product Passports</h2>
        <p className="text-muted-foreground text-sm">All DPPs across your supply chain.</p>
      </div>
      <Card className="glass border-border/50">
        <CardContent className="pt-6">
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : dpps.length === 0 ? (
            <p className="text-muted-foreground">No DPPs yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Carbon (kg)</TableHead>
                  <TableHead>Water (L)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dpps.map((dpp: any) => (
                  <TableRow key={dpp.id}>
                    <TableCell>{dpp.material_composition || "—"}</TableCell>
                    <TableCell>{dpp.carbon_footprint_kg ?? "—"}</TableCell>
                    <TableCell>{dpp.water_usage_liters ?? "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                        dpp.status === "compliant" ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-gray-500/30 bg-gray-500/10 text-gray-400"
                      }`}>
                        {dpp.status}
                      </span>
                    </TableCell>
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
