import { QRCodeCanvas } from "qrcode.react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DPPDetailsPage({ params }: { params: { id: string } }) {
  // Mock data for the DPP
  const dpp = {
    id: params.id,
    productName: "Organic Cotton Tee",
    sku: "TSH-ORG-01",
    status: "Compliant",
    qrUrl: `http://localhost:3000/dpp/${params.id}`
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">DPP Details</h2>
        <Button variant="outline">Download QR Code</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Marketing Widget (QR Code)</CardTitle>
            <CardDescription>Print this on your product labels.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <QRCodeCanvas value={dpp.qrUrl} size={200} />
            </div>
            <p className="text-sm text-muted-foreground break-all">{dpp.qrUrl}</p>
            <Button className="w-full">Copy Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Product Name</p>
              <p className="text-lg">{dpp.productName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SKU</p>
              <p className="text-lg">{dpp.sku}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Compliance Status</p>
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 mt-1 dark:bg-green-900 dark:text-green-200">
                {dpp.status}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
