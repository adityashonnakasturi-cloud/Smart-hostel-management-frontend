"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import FormCard from "@/components/dashboard/form-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ImageUpload from "@/components/dashboard/image-upload"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/student" },
  { icon: <span>👤</span>, label: "Profile Overview", href: "/dashboard/student/profile" },
  { icon: <span>🏠</span>, label: "Room Details", href: "/dashboard/student/room" },
  { icon: <span>⚠️</span>, label: "Submit Complaint", href: "/dashboard/student/complaint" },
  { icon: <span>📋</span>, label: "Complaint Status", href: "/dashboard/student/complaints" },

]

export default function ComplaintPage() {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    priority: "Medium",
    image: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (image: File | null) => {
    setFormData((prev) => ({ ...prev, image }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Complaint submitted:", formData)
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Student" userName="John Doe">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Submit Complaint</h2>
            <p className="text-muted-foreground mt-1">Report an issue or concern</p>
          </div>
        </div>

        <FormCard
          title="New Complaint"
          description="Describe your issue and we will help you resolve it"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Room Issue">Electrician</option>
              <option value="Maintenance">Plumber</option>
              <option value="Food Quality">Cleaner</option>
              <option value="Safety">Room boy</option>
              <option value="Amenity">Carpenter</option>
              <option value="Other">Civil</option>
            </select>
          </div>

          

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your issue in detail"
              rows={6}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Upload Image</label>
            <ImageUpload
              onImageChange={handleImageChange}
              accept="image/jpeg, image/png"
              maxSize={5 * 1024 * 1024} // 5MB
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
              href="/dashboard/student"
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
