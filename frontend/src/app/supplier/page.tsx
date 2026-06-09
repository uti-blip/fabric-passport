"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadCloud, CheckCircle2 } from "lucide-react"

export default function SupplierDashboard() {
  const [lang, setLang] = useState<"en" | "vi">("vi")
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")

  const t = {
    en: {
      title: "Supplier Portal",
      desc: "Upload traceability data for your brand partners.",
      upload: "Upload CSV Data File",
      uploading: "Uploading...",
      success: "Data successfully submitted to brands!",
      selectFile: "Select CSV File",
      submit: "Submit Data",
      switchLang: "Đổi sang Tiếng Việt"
    },
    vi: {
      title: "Cổng Thông Tin Nhà Cung Cấp",
      desc: "Tải lên dữ liệu truy xuất nguồn gốc cho các thương hiệu đối tác.",
      upload: "Tải Lên Tệp Dữ Liệu CSV",
      uploading: "Đang tải lên...",
      success: "Dữ liệu đã được gửi thành công cho các thương hiệu!",
      selectFile: "Chọn tệp CSV",
      submit: "Gửi Dữ Liệu",
      switchLang: "Switch to English"
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setStatus("uploading")

    try {
      const formData = new FormData()
      formData.append("file", file)
      
      const supplierId = "mock-supplier-id" // In a real app, this comes from JWT token
      const res = await fetch(`http://localhost:8000/ingestion/csv?supplier_id=${supplierId}`, {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")
      setStatus("success")
      setFile(null)
    } catch (error) {
      console.error(error)
      setStatus("error")
    }
  }

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 dark:bg-zinc-950">
      <header className="flex h-14 items-center justify-between border-b bg-background px-6">
        <h1 className="text-xl font-bold">Fabric Passport</h1>
        <Button variant="ghost" onClick={() => setLang(lang === "en" ? "vi" : "en")}>
          {t[lang].switchLang}
        </Button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>{t[lang].title}</CardTitle>
            <CardDescription>{t[lang].desc}</CardDescription>
          </CardHeader>
          <CardContent>
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 space-y-4 text-green-600">
                <CheckCircle2 size={64} />
                <p className="text-lg font-medium text-center">{t[lang].success}</p>
                <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
                  Upload Another File
                </Button>
              </div>
            ) : (
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-zinc-900 transition-colors">
                  <UploadCloud className="h-10 w-10 text-gray-400 mb-4" />
                  <Label htmlFor="file" className="cursor-pointer text-center">
                    <span className="text-sm font-semibold text-blue-600 hover:underline">
                      {t[lang].selectFile}
                    </span>
                    <Input 
                      id="file" 
                      type="file" 
                      accept=".csv"
                      className="hidden" 
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </Label>
                  {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={!file || status === "uploading"}>
                  {status === "uploading" ? t[lang].uploading : t[lang].submit}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
