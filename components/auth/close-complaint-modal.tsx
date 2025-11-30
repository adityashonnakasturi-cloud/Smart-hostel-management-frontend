"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface CloseComplaintModalProps {
  complaintId: string
  selectedComplaint?: any
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => Promise<void>
}

export default function CloseComplaintModal({ complaintId, isOpen, onClose, onConfirm }: CloseComplaintModalProps) {
  const [reason, setReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [confirmStep, setConfirmStep] = useState(false)

  const handleReasonSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reason.trim().length < 10) {
      setError("Reason must be at least 10 characters")
      return
    }
    setError("")
    setConfirmStep(true)
  }

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm(reason)
      setReason("")
      setConfirmStep(false)
      onClose()
    } catch (err) {
      setError("Error closing complaint")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-foreground">Close Complaint</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded transition" aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {confirmStep ? (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
              <p className="font-medium">⚠ Are you sure you want to close this complaint?</p>
              <p className="text-xs mt-2">This action is recorded and cannot be undone.</p>
            </div>

            <div className="bg-muted p-4 rounded-lg max-h-32 overflow-y-auto">
              <p className="text-sm text-foreground">
                <span className="font-medium">Reason:</span> {reason}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium disabled:opacity-50"
              >
                {isLoading ? "Closing..." : "Confirm Close"}
              </button>
              <button
                onClick={() => setConfirmStep(false)}
                className="flex-1 py-2 border border-border rounded-lg hover:bg-muted transition font-medium"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleReasonSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Reason for Closing *</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Provide a detailed reason (minimum 10 characters)"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none h-32"
                data-testid="close-reason-textarea"
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {reason.length < 10 ? `${10 - reason.length} more characters needed` : "Ready to close"}
                </p>
                <span className="text-xs font-medium text-muted-foreground">{reason.length}/200</span>
              </div>
            </div>

            {error && <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">{error}</div>}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={reason.trim().length < 10}
                className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="confirm-close-btn"
              >
                Next
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
