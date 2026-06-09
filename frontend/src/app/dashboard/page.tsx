"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DashboardPage() {
  // Mock data for MVP
  const stats = [
    { name: "Total Products", value: "124" },
    { name: "Compliant DPPs", value: "89" },
    { name: "Pending Supplier Data", value: "35" },
  ]

  const recentProducts = [
    { id: "1", name: "Organic Cotton Tee", sku: "TSH-ORG-01", status: "Compliant" },
    { id: "2", name: "Recycled Denim Jacket", sku: "JAC-REC-02", status: "Pending" },
    { id: "3", name: "Linen Summer Dress", sku: "DRE-LIN-03", status: "Compliant" },
    { id: "4", name: "Wool Knit Sweater", sku: "SWE-WOO-04", status: "Draft" },
  ]

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-serif font-bold tracking-tight mb-2">Welcome back, Maison</h2>
        <p className="text-muted-foreground text-sm">Here is the traceability status of your collections.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={i} className="glass border-border/50 hover:border-primary/50 transition-colors duration-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold">{stat.value}</div>
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
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>DPP Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id} className="border-border/50 hover:bg-secondary/20 transition-colors duration-300">
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border ${
                      product.status === "Compliant" ? "border-green-500/30 bg-green-500/10 text-green-400" :
                      product.status === "Pending" ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-400" :
                      "border-gray-500/30 bg-gray-500/10 text-gray-400"
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <a href={`/dashboard/products/${product.id}`} className="text-sm text-primary hover:text-primary/80 transition-colors">View Details</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
