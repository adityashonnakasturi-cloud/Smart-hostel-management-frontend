"use client"

import { useState } from "react"
import Link from "next/link"
import SignupForm from "@/components/auth/signup-form"

const rolesWithSignup = ["NGO"]

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState("Staff")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              HM
            </div>
            <span className="font-bold text-xl text-foreground">HostelConnect</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Sign up to get started</p>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-3">Account Type</p>
          <div className="space-y-2">
            {rolesWithSignup.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`w-full p-3 rounded-lg border-2 text-left transition ${
                  selectedRole === role ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
              >
                <p className="font-medium text-foreground">{role}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <SignupForm role={selectedRole} />
        </div>

        <p className="text-center text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
