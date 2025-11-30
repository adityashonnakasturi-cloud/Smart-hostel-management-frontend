"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [previousPassword, setPreviousPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [backendMissing, setBackendMissing] = useState(false)

  const validateForm = () => {
    if (!previousPassword.trim()) {
      setError("Previous password is required")
      return false
    }
    if (!newPassword.trim()) {
      setError("New password is required")
      return false
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const response = await fetch("/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ previous_password: previousPassword, new_password: newPassword }),
      })

      if (response.status === 200) {
        setSuccess(true)
        setPreviousPassword("")
        setNewPassword("")
        setTimeout(() => {
          onClose()
          setSuccess(false)
        }, 2000)
      } else if (response.status === 401) {
        setError("Previous password incorrect")
      } else {
        setError("Error updating password")
      }
    } catch (err) {
      console.warn("[v0] Backend endpoint missing: /auth/change-password")
      setBackendMissing(true)
      setError("Backend endpoint missing — password change unavailable")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Change Password</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {backendMissing && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
            Password change unavailable — backend endpoint missing
          </div>
        )}

        {success ? (
          <div className="text-center py-6">
            <p className="text-green-600 font-medium mb-2">✓ Password updated successfully</p>
            <p className="text-sm text-muted-foreground">Your password has been changed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Previous Password *</label>
              <input
                type="password"
                value={previousPassword}
                onChange={(e) => setPreviousPassword(e.target.value)}
                placeholder="Enter your current password"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                disabled={isLoading || backendMissing}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                disabled={isLoading || backendMissing}
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters required</p>
            </div>

            {error && <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">{error}</div>}

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                disabled={isLoading || backendMissing}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
