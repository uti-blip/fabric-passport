"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isSignup ? "/auth/signup" : "/auth/login";
      const isForm = !isSignup;
      const body = isSignup
        ? JSON.stringify({ email, password, role: "brand" })
        : new URLSearchParams({ username: email, password });

      const res = await fetch(`${API}${endpoint}`, {
        method: "POST",
        headers: isSignup
          ? { "Content-Type": "application/json" }
          : { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({ detail: "Failed" }));
        throw new Error(d.detail || "Authentication failed");
      }
      const data = await res.json();
      if (isSignup) {
        setIsSignup(false);
        setError("Account created — please sign in.");
      } else {
        localStorage.setItem("fp_token", data.access_token);
        router.push("/dashboard");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <Link href="/" className="text-2xl font-serif font-bold luxury-gradient">
            Fabric Passport
          </Link>
          <div className="space-y-6">
            <blockquote className="text-xl text-white/80 font-serif leading-relaxed max-w-md">
              &ldquo;The EU Digital Product Passport mandate arrives in 2027.
              Brands that prepare now will lead the market.&rdquo;
            </blockquote>
            <p className="text-sm text-white/40">— EU AI Act, Article 12</p>
          </div>
          <div className="flex gap-4 text-xs text-white/30">
            <span>EU AI Act Compliant</span>
            <span>·</span>
            <span>GDPR Ready</span>
            <span>·</span>
            <span>ISO 14001</span>
          </div>
        </div>
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-1/4 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="text-2xl font-serif font-bold luxury-gradient">
              Fabric Passport
            </Link>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-2xl font-serif font-bold">
              {isSignup ? "Create account" : "Welcome back"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isSignup
                ? "Start your compliance journey."
                : "Sign in to your brand dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="brand@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {error && (
              <div
                className={`text-sm rounded-lg px-4 py-3 ${
                  error.includes("created")
                    ? "bg-success/10 text-success border border-success/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  {isSignup ? "Creating..." : "Signing in..."}
                </span>
              ) : isSignup ? (
                "Create account"
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "No account yet?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
              className="text-primary hover:underline font-medium"
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
