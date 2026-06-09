import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PublicDPPPage({ params }: { params: { id: string } }) {
  // Mock data for the consumer view
  const data = {
    product: "Organic Cotton Tee",
    brand: "EcoFashion Co.",
    material: "100% GOTS Certified Organic Cotton",
    carbon: "2.4 kg CO2e",
    water: "150 Liters",
    madeIn: "Vietnam",
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Digital Product Passport</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Verified by Fabric Passport
          </p>
        </div>

        <Card className="shadow-lg border-t-4 border-t-green-500">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">{data.product}</CardTitle>
            <p className="text-muted-foreground font-medium">by {data.brand}</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Material Composition</h3>
              <p className="mt-1 text-lg font-medium">{data.material}</p>
            </div>

            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Environmental Impact</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Carbon Footprint</p>
                  <p className="font-semibold">{data.carbon}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Water Usage</p>
                  <p className="font-semibold">{data.water}</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Origin</h3>
              <p className="mt-1 text-lg font-medium">Made in {data.madeIn}</p>
            </div>

          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          This passport complies with EU DPP regulations for textiles.
        </p>
      </div>
    </div>
  )
}
