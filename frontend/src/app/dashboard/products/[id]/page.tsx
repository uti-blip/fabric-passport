"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QRCodeSVG } from "qrcode.react"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Mock product data
  const [product, setProduct] = useState({
    id: params.id,
    name: "Organic Cotton Tee",
    sku: "TSH-ORG-01",
    status: "Compliant",
    dpp: {
      material_composition: "100% Organic Cotton",
      carbon_footprint_kg: 2.4,
      water_usage_liters: 120,
      supplier: "VietTex Garments Ltd. (Ho Chi Minh City)",
    }
  })

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold tracking-tight mb-2">{product.name}</h2>
          <p className="text-muted-foreground text-sm">SKU: {product.sku} • EU 2027 Compliance: <span className="text-green-500 font-medium">{product.status}</span></p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium shadow-lg hover:opacity-90 transition-opacity">
          Publish Widget
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Traceability Data Editor */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="font-serif text-xl">Traceability Data</CardTitle>
              <CardDescription>Supplier input verified via blockchain anchors.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Material Composition</label>
                <input 
                  type="text" 
                  value={product.dpp.material_composition} 
                  className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Carbon Footprint (kg CO2e)</label>
                  <input 
                    type="number" 
                    value={product.dpp.carbon_footprint_kg} 
                    className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    readOnly
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Water Usage (Liters)</label>
                  <input 
                    type="number" 
                    value={product.dpp.water_usage_liters} 
                    className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    readOnly
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Primary Supplier</label>
                <input 
                  type="text" 
                  value={product.dpp.supplier} 
                  className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  readOnly
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marketing Widget Preview */}
        <div className="flex flex-col gap-6">
          <Card className="glass border-border/50 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
            <CardHeader>
              <CardTitle className="font-serif text-xl luxury-gradient-text">Marketing Widget</CardTitle>
              <CardDescription>Embed this on your Shopify product page.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
              <div className="p-4 bg-white rounded-xl shadow-inner">
                <QRCodeSVG 
                  value={`https://fabricpassport.eu/p/${product.id}`} 
                  size={150} 
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"Q"}
                />
              </div>
              <p className="text-xs text-center text-muted-foreground text-balance">
                Scan to view the complete EU Digital Product Passport for this item.
              </p>
              
              <div className="w-full mt-4">
                <label className="text-xs font-medium mb-1 block">Embed Code</label>
                <div className="relative">
                  <textarea 
                    className="w-full h-24 bg-background/80 border border-border rounded-md px-3 py-2 text-xs font-mono resize-none focus:outline-none"
                    readOnly
                    value={`<div id="fp-widget-${product.id}"></div>\n<script src="https://fabricpassport.eu/widget.js" data-product="${product.id}" async></script>`}
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-secondary text-secondary-foreground rounded text-xs hover:bg-secondary/80">
                    Copy
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
