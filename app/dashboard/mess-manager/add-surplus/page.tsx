"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import FormCard from "@/components/dashboard/form-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"


const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/mess-manager" },
  { icon: "➕", label: "Add Surplus Food", href: "/dashboard/mess-manager/add-surplus" },
  { icon: "📦", label: "Manage Distribution", href: "/dashboard/mess-manager/manage" },
  { icon: "👥", label: "View NGOs", href: "/dashboard/mess-manager/ngos" },
  { icon: "📈", label: "Reports", href: "/dashboard/mess-manager/reports" },
]

export default function AddSurplusPage() {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    unit: "kg",
    expiryDate: null as Date | null,
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleExpiryChange = (expiryDate: Date | null) => {
    setFormData((prev) => ({ ...prev, expiryDate }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Surplus added:", formData)
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Mess Manager" userName="Manager">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mess-manager" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Add Surplus Food</h2>
            <p className="text-muted-foreground mt-1">Log new surplus food items</p>
          </div>
        </div>

        <FormCard
          title="Food Surplus Details"
          description="Enter details of the surplus food items"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g., Rice"
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                </div>
                <div className="pt-8">
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="ltr">ltr</option>
                    <option value="pcs">pcs</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <label className="block text-sm font-medium text-foreground mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4"
                required
              />
              <label className="block text-sm font-medium text-foreground mb-2">
                Expiry Time
              </label>

              <div className="flex gap-2">
                {/* Hours */}
                <select
                  name="expiryHour"
                  className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  required
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                {/* Minutes */}
                <select
                  name="expiryMinute"
                  className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  required
                >
                  {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map(m => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                {/* AM/PM */}
                <select
                  name="expiryPeriod"
                  className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  required
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Additional notes about the food item"
              rows={4}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Add Surplus Food
            </button>
            <Link
              href="/dashboard/mess-manager"
              className="px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
            >
              Cancel
            </Link>
          </div>
        </FormCard>
      </div>
    </DashboardLayout>
  )
}
