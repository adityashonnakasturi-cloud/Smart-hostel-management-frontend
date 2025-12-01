"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import FormCard from "@/components/dashboard/form-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/warden" },
  { icon: "👥", label: "Student List", href: "/dashboard/warden/students" },
  { icon: "🏠", label: "Room Management", href: "/dashboard/warden/rooms" },
   { icon: <span>🛠️</span>, label: "Manage Staff", href: "/dashboard/warden/manage-staff" },
  { icon: "⚠️", label: "Raise Complaint", href: "/dashboard/warden/raise-complaint" },
  { icon: "📋", label: "View Complaints", href: "/dashboard/warden/complaints" },
]

export default function RaiseComplaintPage() {
  const [formData, setFormData] = useState({
    studentUSN: "",
    category: "",
    description: "",
    priority: "Medium",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Complaint raised:", formData)
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Warden" userName="Mr. Warden">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Raise Complaint</h2>
            <p className="text-muted-foreground mt-1">Report an issue for a student</p>
          </div>
        </div>

        <FormCard
          title="New Complaint"
          description="Fill in the details of the complaint you want to raise"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Student USN</label>
            <input
              type="text"
              name="studentUSN"
              value={formData.studentUSN}
              onChange={handleChange}
              placeholder="e.g., USN001"
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              required
            />
          </div>


          

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the complaint in detail"
              rows={5}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Submit Complaint
            </button>
            <Link
              href="/dashboard/warden"
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
