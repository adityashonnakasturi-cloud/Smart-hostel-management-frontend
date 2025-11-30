"use client"

import Link from "next/link"
import ForgotPasswordModal from "@/components/auth/forgot-password-modal"

export default function ForgotPasswordPage() {
  const handleClose = () => {
    window.location.href = "/login"
  }

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your email to receive a recovery code</p>
        </div>

        <ForgotPasswordModal onClose={handleClose} />

        <p className="text-center text-muted-foreground mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
