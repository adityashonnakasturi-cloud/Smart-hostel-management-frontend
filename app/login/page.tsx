"use client"

import { useState } from "react"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"
import ForgotPasswordModal from "@/components/auth/forgot-password-modal"

const roles = ["Student", "Warden", "Chief Warden", "Staff", "NGO", "Mess Manager", "Parent"]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("Student")
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false)

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  selectedRole === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          <LoginForm role={selectedRole} />
          {selectedRole === "Parent" && (
            <p className="text-xs text-muted-foreground mt-4 p-3 bg-muted rounded">
              📝 Use your student's USN as email and their password to login as parent and view their complaints.
            </p>
          )}
        </div>

        <p className="text-center text-muted-foreground mt-6">
          New user?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
        <p className="text-center text-muted-foreground mt-2">
          <button
            onClick={() => setIsForgotPasswordModalOpen(true)}
            className="text-primary font-semibold hover:underline"
          >
            Forgot Password?
          </button>
        </p>
        {isForgotPasswordModalOpen && <ForgotPasswordModal onClose={() => setIsForgotPasswordModalOpen(false)} />}
      </div>
    </div>
  )
}
