import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fabric Passport — EU Digital Product Passport",
  description:
    "Traceability, compliance, and sustainability for DTC fashion brands. EU AI Act ready.",
  openGraph: {
    title: "Fabric Passport",
    description: "Digital Product Passport for DTC Fashion Brands",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
