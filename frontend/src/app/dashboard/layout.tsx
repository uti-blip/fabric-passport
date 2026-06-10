"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/api";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "◇" },
  { href: "/dashboard/products", label: "Products", icon: "□" },
  { href: "/dashboard/dpps", label: "DPPs", icon: "◆" },
  { href: "/supplier", label: "Suppliers", icon: "◈" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-border/30 bg-card/50">
        <div className="h-16 flex items-center px-6 border-b border-border/30">
          <Link href="/" className="text-lg font-serif font-bold luxury-gradient">
            Fabric Passport
          </Link>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border/30">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors w-full"
          >
            <span>↗</span>
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="lg:hidden fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="flex items-center justify-between h-14 px-4">
          <Link href="/" className="text-lg font-serif font-bold luxury-gradient">
            FP
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <span className="text-lg">{mobileOpen ? "×" : "≡"}</span>
          </button>
        </div>
        {mobileOpen && (
          <nav className="px-4 pb-4 space-y-1 border-t border-border/20 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive w-full"
            >
              Sign out
            </button>
          </nav>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pl-0 pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
