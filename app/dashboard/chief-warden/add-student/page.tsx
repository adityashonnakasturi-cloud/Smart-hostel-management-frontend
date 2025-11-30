"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import FormCard from "@/components/dashboard/form-card"
import AccountCreatedModal from "@/components/auth/account-created-modal"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { generateSecurePassword } from "@/lib/password-generator"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

export default function AddStudentPage() {
  const [formData, setFormData] = useState({
    usn: "",
    name: "",
    email: "",
    phone: "",
    room: "",
    block: "",
    
  })

  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [isBackendStub, setIsBackendStub] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    const password = generateSecurePassword(10)
    setGeneratedPassword(password)

    try {
      const response = await fetch("/chief-warden/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, password }),
      })

      if (response.status === 200) {
        setIsBackendStub(false)
        setShowPasswordModal(true)
        // Reset form
        setFormData({
          usn: "",
          name: "",
          email: "",
          phone: "",
          room: "",
          block: "",
          
        })
      } else if (response.status >= 400 && response.status < 500) {
        const errorData = await response.json()
        setErrors(errorData.errors || { general: "Validation error" })
      } else {
        setErrors({ general: "Server error occurred" })
      }
    } catch (err) {
      setIsBackendStub(true)
      setShowPasswordModal(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Add New Student</h2>
            <p className="text-muted-foreground mt-1">Register a new hostel resident</p>
          </div>
        </div>

        <FormCard
          title="Student Information"
          description="Enter the student's details and room assignment"
          onSubmit={handleSubmit}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">USN</label>
              <input
                type="text"
                name="usn"
                value={formData.usn}
                onChange={handleChange}
                placeholder="e.g., USN001"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
              {errors.usn && <p className="text-red-500 text-xs mt-1">{errors.usn}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Doe"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., john@example.com"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g., +91 9876543210"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Room Number</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="e.g., 101"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
              {errors.room && <p className="text-red-500 text-xs mt-1">{errors.room}</p>}
            </div>

            

            
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              data-testid="chief-add-student-btn"
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Adding..." : "Add Student"}
            </button>
            <Link
              href="/dashboard/chief-warden"
              className="px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
            >
              Cancel
            </Link>
          </div>
        </FormCard>
      </div>

      <AccountCreatedModal
        isOpen={showPasswordModal}
        title="Student created"
        password={generatedPassword}
        isStub={isBackendStub}
        onClose={() => setShowPasswordModal(false)}
      />
    </DashboardLayout>
  )
}
