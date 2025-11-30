"use client"

import type React from "react"

import { useState } from "react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface LoginFormProps {
  role: string
}

export default function LoginForm({ role }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // TODO: Implement actual authentication
      // await new Promise((resolve) => setTimeout(resolve, 500))
      // console.log("Login attempt:", { role, email, password })
      // // Redirect based on role
      // const dashboardMap: Record<string, string> = {
      //   Student: "/dashboard/student",
      //   Warden: "/dashboard/warden",
      //   "Chief Warden": "/dashboard/chief-warden",
      //   Staff: "/dashboard/staff",
      //   NGO: "/dashboard/ngo",
      //   "Mess Manager": "/dashboard/mess-manager",
      //   Parent: "/dashboard/parent",
      // }
      // window.location.href = dashboardMap[role] || "/dashboard"

      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
          role: role.toLowerCase().replace(" ", "")  // optional cleanup
        })
      });

      const data = await res.json();
      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Redirect based on backend user role
      const userRole = data.user.role;

      const redirectMap: Record<string, string> = {
        "student": "/dashboard/student",
        "warden": "/dashboard/warden",
        "chiefWarden": "/dashboard/chief-warden",
        "staff": "/dashboard/staff",
        "ngo": "/dashboard/ngo",
        "messManager": "/dashboard/mess-manager",
        "parent": "/dashboard/parent"
      };

      window.location.href = redirectMap[data.user.role] || "/dashboard";

    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Redirect to the forgot password page
    window.location.href = "/forgot-password"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Email or Username</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email or username"
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
          required
        />
      </div>

      {error && (
        <div className="px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
          <span className="text-foreground">Remember me</span>
        </label>
        <a href="#" onClick={handleForgotPassword} className="text-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  )
}
