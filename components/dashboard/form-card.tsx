"use client"

import type React from "react"

interface FormCardProps {
  title: string
  description?: string
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
}

export default function FormCard({ title, description, children, onSubmit }: FormCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 max-w-2xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
      </form>
    </div>
  )
}
