import Link from "next/link";

const features = [
  {
    icon: "◆",
    title: "Digital Product Passport",
    desc: "Generate EU-compliant DPPs for every SKU — materials, carbon footprint, water usage, supplier traceability.",
  },
  {
    icon: "◇",
    title: "Supplier Collaboration",
    desc: "Invite suppliers to upload data directly. Automated CSV ingestion. Real-time compliance status.",
  },
  {
    icon: "◈",
    title: "Public Transparency",
    desc: "Share QR-code DPPs with customers. Build trust through radical transparency.",
  },
];

const stats = [
  { value: "2027", label: "EU DPP Mandate" },
  { value: "30M+", label: "Products affected" },
  { value: "100%", label: "Compliance ready" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-serif font-bold luxury-gradient">
            Fabric Passport
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/auth"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors luxury-glow"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-4 py-1.5 text-xs text-amber-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            EU AI Act — Article 12
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-6">
            Traceability{" "}
            <span className="luxury-gradient">worth wearing</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            The Digital Product Passport platform for DTC fashion brands.
            Comply with EU regulations, collaborate with suppliers, and
            share your supply chain story with customers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] luxury-glow"
            >
              Start your passport →
            </Link>
            <Link
              href="/dpp/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-border px-8 py-3.5 text-base text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
            >
              View demo DPP
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-1 rounded-2xl glass-strong luxury-border overflow-hidden">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center py-10 px-4 ${
                i < 2 ? "border-r border-border/30" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl font-serif font-bold luxury-gradient mb-2">
                {s.value}
              </span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
            Built for{" "}
            <span className="luxury-gradient">fashion supply chains</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every product. Every material. Every supplier. One passport.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass luxury-border rounded-2xl p-8 hover:border-amber-500/50 transition-all duration-500 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 text-lg mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-serif font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-32 text-center">
        <div className="glass-strong luxury-border rounded-3xl p-12 luxury-glow">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to passport your products?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Join leading DTC brands already preparing for the 2027 EU mandate.
          </p>
          <Link
            href="/auth"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Get started free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fabric Passport. EU AI Act compliant.
          </span>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/auth" className="hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/dpp/demo" className="hover:text-foreground transition-colors">
              Demo DPP
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
