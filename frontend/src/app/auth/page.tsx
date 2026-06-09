"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("brand")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup"
      
      let body, headers
      if (isLogin) {
        body = new URLSearchParams()
        body.append('username', email)
        body.append('password', password)
        headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      } else {
        body = JSON.stringify({ email, password, role })
        headers = { 'Content-Type': 'application/json' }
      }

      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers,
        body
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.detail || "Something went wrong")
      }

      const data = await res.json()
      if (isLogin) {
        localStorage.setItem("token", data.access_token)
        router.push("/dashboard")
      } else {
        setIsLogin(true)
        setError("Account created! Please log in.")
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-zinc-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">Fabric Passport</CardTitle>
          <CardDescription>
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select 
                  id="role" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="brand">Brand</option>
                  <option value="supplier">Supplier</option>
                </select>
              </div>
            )}
            
            {error && <p className="text-sm text-red-500">{error}</p>}
            
            <Button type="submit" className="w-full">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
