"use client"

import type React from "react"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: Record<string, any>[]
  actions?: (row: Record<string, any>) => React.ReactNode
}

export default function DataTable({ columns, data, actions }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0

    const aVal = a[sortConfig.key]
    const bVal = b[sortConfig.key]

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key ? { key, direction: prev.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" },
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4 text-left">
                  <button
                    onClick={() => col.sortable && handleSort(col.key)}
                    className="font-semibold text-foreground flex items-center gap-2 hover:text-primary"
                  >
                    {col.label}
                    {col.sortable &&
                      (sortConfig?.key === col.key ? (
                        sortConfig.direction === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : (
                        <ChevronUp size={16} className="opacity-30" />
                      ))}
                  </button>
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right font-semibold text-foreground">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} className="border-b border-border hover:bg-muted/20 transition">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 text-foreground">
                    {row[col.key]}
                  </td>
                ))}
                {actions && <td className="px-6 py-4 text-right">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
