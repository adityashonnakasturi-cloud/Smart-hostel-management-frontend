import type React from "react"
interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export default function StatCard({ icon, title, value, subtitle, trend }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        <div className="text-2xl opacity-60">{icon}</div>
      </div>
      {trend && (
        <div className={`mt-4 text-sm font-medium ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
          {trend.isPositive ? "↑" : "↓"} {trend.value}%
        </div>
      )}
    </div>
  )
}
