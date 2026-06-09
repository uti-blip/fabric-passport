import { ReactNode } from "react"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 glass px-4 sm:px-8">
        <h1 className="text-2xl font-serif font-bold tracking-tight luxury-gradient-text">Fabric Passport</h1>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-8 text-sm ml-10">
          <Link href="/dashboard" className="text-foreground transition-colors hover:text-primary">
            Overview
          </Link>
          <Link href="/dashboard/products" className="text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="/dashboard/dpps" className="text-muted-foreground transition-colors hover:text-foreground">
            DPPs
          </Link>
          <Link href="/dashboard/suppliers" className="text-muted-foreground transition-colors hover:text-foreground">
            Suppliers
          </Link>
        </nav>
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-8 sm:py-8 md:gap-8">
        {children}
      </main>
    </div>
  )
}
