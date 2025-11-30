"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import AccountCreatedModal from "@/components/auth/account-created-modal"
import { ArrowLeft, Edit2, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import { generateSecurePassword } from "@/lib/password-generator"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

interface Warden {
  id: string
  name: string
  email: string
  phone: string
  block: string
  studentsManaged: number
  status: "Active" | "Inactive"
}

interface MessManager {
  id: string
  name: string
  email: string
  phone: string
  hostel: string
  status: "Active" | "Inactive"
}

export default function ManageWardensPage() {
  const [wardens, setWardens] = useState<Warden[]>([
    {
      id: "1",
      name: "Mr. Sharma",
      email: "sharma@hostel.edu",
      phone: "+91 9876543210",
      block: "Block A",
      studentsManaged: 45,
      status: "Active",
    },
    {
      id: "2",
      name: "Ms. Patel",
      email: "patel@hostel.edu",
      phone: "+91 9876543211",
      block: "Block B",
      studentsManaged: 38,
      status: "Active",
    },
    {
      id: "3",
      name: "Mr. Kumar",
      email: "kumar@hostel.edu",
      phone: "+91 9876543212",
      block: "Block C",
      studentsManaged: 42,
      status: "Active",
    },
    {
      id: "4",
      name: "Ms. Gupta",
      email: "gupta@hostel.edu",
      phone: "+91 9876543213",
      block: "Block D",
      studentsManaged: 40,
      status: "Inactive",
    },
  ])

  const [messManagers, setMessManagers] = useState<MessManager[]>([
    {
      id: "1",
      name: "Mr. Singh",
      email: "singh@hostel.edu",
      phone: "+91 9876543214",
      hostel: "Hostel 1",
      status: "Active",
    },
    {
      id: "2",
      name: "Ms. Verma",
      email: "verma@hostel.edu",
      phone: "+91 9876543215",
      hostel: "Hostel 2",
      status: "Inactive",
    },
  ])

  const [showWardenForm, setShowWardenForm] = useState(false)
  const [showMessManagerForm, setShowMessManagerForm] = useState(false)
  const [editingWardenId, setEditingWardenId] = useState<string | null>(null)
  const [editingMessManagerId, setEditingMessManagerId] = useState<string | null>(null)

  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [modalTitle, setModalTitle] = useState("")
  const [isBackendStub, setIsBackendStub] = useState(false)
  const [isLoadingWarden, setIsLoadingWarden] = useState(false)
  const [isLoadingMessManager, setIsLoadingMessManager] = useState(false)

  const [wardenFormData, setWardenFormData] = useState({
    name: "",
    email: "",
    phone: "",
    block: "",
  })

  const [messManagerFormData, setMessManagerFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hostel: "",
  })

  const [wardenErrors, setWardenErrors] = useState<Record<string, string>>({})
  const [messManagerErrors, setMessManagerErrors] = useState<Record<string, string>>({})

  const handleChangeWarden = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setWardenFormData((prev) => ({ ...prev, [name]: value }))
    if (wardenErrors[name]) {
      setWardenErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleChangeMessManager = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setMessManagerFormData((prev) => ({ ...prev, [name]: value }))
    if (messManagerErrors[name]) {
      setMessManagerErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmitWarden = async (e: React.FormEvent) => {
    e.preventDefault()
    setWardenErrors({})
    setIsLoadingWarden(true)

    const password = generateSecurePassword(10)
    setGeneratedPassword(password)
    setModalTitle("Account created")

    try {
      if (editingWardenId) {
        setWardens((prev) => prev.map((w) => (w.id === editingWardenId ? { ...w, ...wardenFormData } : w)))
        setEditingWardenId(null)
      } else {
        const response = await fetch("/chief-warden/wardens", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...wardenFormData, password }),
        })

        if (response.status === 200) {
          setIsBackendStub(false)
          setWardens((prev) => [
            ...prev,
            {
              id: String(prev.length + 1),
              ...wardenFormData,
              studentsManaged: 0,
              status: "Active",
            },
          ])
        } else if (response.status >= 400 && response.status < 500) {
          const errorData = await response.json()
          setWardenErrors(errorData.errors || { general: "Validation error" })
          setIsLoadingWarden(false)
          return
        } else {
          setIsBackendStub(true)
        }
      }

      setShowPasswordModal(true)
      setWardenFormData({ name: "", email: "", phone: "", block: "" })
      setShowWardenForm(false)
    } catch (err) {
      setIsBackendStub(true)
      setShowPasswordModal(true)
    } finally {
      setIsLoadingWarden(false)
    }
  }

  const handleSubmitMessManager = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessManagerErrors({})
    setIsLoadingMessManager(true)

    const password = generateSecurePassword(10)
    setGeneratedPassword(password)
    setModalTitle("Account created")

    try {
      if (editingMessManagerId) {
        setMessManagers((prev) =>
          prev.map((m) => (m.id === editingMessManagerId ? { ...m, ...messManagerFormData } : m)),
        )
        setEditingMessManagerId(null)
      } else {
        const response = await fetch("/chief-warden/mess-managers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...messManagerFormData, password }),
        })

        if (response.status === 200) {
          setIsBackendStub(false)
          setMessManagers((prev) => [
            ...prev,
            {
              id: String(prev.length + 1),
              ...messManagerFormData,
              status: "Active",
            },
          ])
        } else if (response.status >= 400 && response.status < 500) {
          const errorData = await response.json()
          setMessManagerErrors(errorData.errors || { general: "Validation error" })
          setIsLoadingMessManager(false)
          return
        } else {
          setIsBackendStub(true)
        }
      }

      setShowPasswordModal(true)
      setMessManagerFormData({ name: "", email: "", phone: "", hostel: "" })
      setShowMessManagerForm(false)
    } catch (err) {
      setIsBackendStub(true)
      setShowPasswordModal(true)
    } finally {
      setIsLoadingMessManager(false)
    }
  }

  const handleEditWarden = (warden: Warden) => {
    setWardenFormData({ name: warden.name, email: warden.email, phone: warden.phone, block: warden.block })
    setEditingWardenId(warden.id)
    setShowWardenForm(true)
  }

  const handleDeleteWarden = (id: string) => {
    setWardens((prev) => prev.filter((w) => w.id !== id))
  }

  const handleEditMessManager = (messManager: MessManager) => {
    setMessManagerFormData({
      name: messManager.name,
      email: messManager.email,
      phone: messManager.phone,
      hostel: messManager.hostel,
    })
    setEditingMessManagerId(messManager.id)
    setShowMessManagerForm(true)
  }

  const handleDeleteMessManager = (id: string) => {
    setMessManagers((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
              <ArrowLeft size={24} className="text-foreground" />
            </Link>
            <div>
              <h2 className="text-3xl font-bold text-foreground">Manage Wardens</h2>
              <p className="text-muted-foreground mt-1">View, edit, and assign wardens to hostel blocks</p>
            </div>
          </div>
          <button
            onClick={() => {
              setWardenFormData({ name: "", email: "", phone: "", block: "" })
              setEditingWardenId(null)
              setShowWardenForm(true)
            }}
            data-testid="add-warden-btn"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Warden
          </button>
          <button
            onClick={() => {
              setMessManagerFormData({ name: "", email: "", phone: "", hostel: "" })
              setEditingMessManagerId(null)
              setShowMessManagerForm(true)
            }}
            data-testid="add-mess-manager-btn"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Add Mess Manager
          </button>
        </div>

        {/* Add/Edit Warden Form */}
        {showWardenForm && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {editingWardenId ? "Edit Warden" : "Add New Warden"}
            </h3>
            <form onSubmit={handleSubmitWarden} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={wardenFormData.name}
                    onChange={handleChangeWarden}
                    placeholder="e.g., Mr. Sharma"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {wardenErrors.name && <p className="text-red-500 text-xs mt-1">{wardenErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={wardenFormData.email}
                    onChange={handleChangeWarden}
                    placeholder="e.g., sharma@hostel.edu"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {wardenErrors.email && <p className="text-red-500 text-xs mt-1">{wardenErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={wardenFormData.phone}
                    onChange={handleChangeWarden}
                    placeholder="e.g., +91 9876543210"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {wardenErrors.phone && <p className="text-red-500 text-xs mt-1">{wardenErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Block Assignment</label>
                  <select
                    name="block"
                    value={wardenFormData.block}
                    onChange={handleChangeWarden}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  >
                    <option value="">Select Block</option>
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                    <option value="Block C">Block C</option>
                    <option value="Block D">Block D</option>
                  </select>
                  {wardenErrors.block && <p className="text-red-500 text-xs mt-1">{wardenErrors.block}</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoadingWarden}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingWarden ? "Adding..." : editingWardenId ? "Update" : "Add"} Warden
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowWardenForm(false)
                    setEditingWardenId(null)
                    setWardenFormData({ name: "", email: "", phone: "", block: "" })
                  }}
                  className="px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add/Edit Mess Manager Form */}
        {showMessManagerForm && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {editingMessManagerId ? "Edit Mess Manager" : "Add New Mess Manager"}
            </h3>
            <form onSubmit={handleSubmitMessManager} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={messManagerFormData.name}
                    onChange={handleChangeMessManager}
                    placeholder="e.g., Mr. Singh"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {messManagerErrors.name && <p className="text-red-500 text-xs mt-1">{messManagerErrors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={messManagerFormData.email}
                    onChange={handleChangeMessManager}
                    placeholder="e.g., singh@hostel.edu"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {messManagerErrors.email && <p className="text-red-500 text-xs mt-1">{messManagerErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={messManagerFormData.phone}
                    onChange={handleChangeMessManager}
                    placeholder="e.g., +91 9876543214"
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  />
                  {messManagerErrors.phone && <p className="text-red-500 text-xs mt-1">{messManagerErrors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Hostel Assignment</label>
                  <select
                    name="hostel"
                    value={messManagerFormData.hostel}
                    onChange={handleChangeMessManager}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  >
                    <option value="">Select Hostel</option>
                    <option value="Hostel 1">Hostel 1</option>
                    <option value="Hostel 2">Hostel 2</option>
                    <option value="Hostel 3">Hostel 3</option>
                  </select>
                  {messManagerErrors.hostel && <p className="text-red-500 text-xs mt-1">{messManagerErrors.hostel}</p>}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoadingMessManager}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMessManager ? "Adding..." : editingMessManagerId ? "Update" : "Add"} Mess Manager
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMessManagerForm(false)
                    setEditingMessManagerId(null)
                    setMessManagerFormData({ name: "", email: "", phone: "", hostel: "" })
                  }}
                  className="px-6 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Wardens List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Block</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Students Managed</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wardens.map((warden) => (
                  <tr key={warden.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-foreground">{warden.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{warden.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{warden.phone}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{warden.block}</td>
                    <td className="px-6 py-4 text-foreground">{warden.studentsManaged}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          warden.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {warden.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditWarden(warden)}
                          className="p-2 hover:bg-muted rounded-lg transition text-primary"
                          title="Edit warden"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteWarden(warden.id)}
                          className="p-2 hover:bg-muted rounded-lg transition text-red-500"
                          title="Delete warden"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mess Managers List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Hostel</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messManagers.map((messManager) => (
                  <tr key={messManager.id} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="px-6 py-4 text-foreground">{messManager.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{messManager.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{messManager.phone}</td>
                    <td className="px-6 py-4 text-foreground font-medium">{messManager.hostel}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          messManager.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {messManager.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditMessManager(messManager)}
                          className="p-2 hover:bg-muted rounded-lg transition text-primary"
                          title="Edit mess manager"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteMessManager(messManager.id)}
                          className="p-2 hover:bg-muted rounded-lg transition text-red-500"
                          title="Delete mess manager"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {wardens.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Wardens Found</h3>
            <p className="text-muted-foreground mb-4">Add your first warden to get started</p>
            <button
              onClick={() => {
                setWardenFormData({ name: "", email: "", phone: "", block: "" })
                setEditingWardenId(null)
                setShowWardenForm(true)
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Add Warden
            </button>
          </div>
        )}

        {messManagers.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Mess Managers Found</h3>
            <p className="text-muted-foreground mb-4">Add your first mess manager to get started</p>
            <button
              onClick={() => {
                setMessManagerFormData({ name: "", email: "", phone: "", hostel: "" })
                setEditingMessManagerId(null)
                setShowMessManagerForm(true)
              }}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Add Mess Manager
            </button>
          </div>
        )}
      </div>

      <AccountCreatedModal
        isOpen={showPasswordModal}
        title={modalTitle}
        password={generatedPassword}
        isStub={isBackendStub}
        onClose={() => setShowPasswordModal(false)}
      />
    </DashboardLayout>
  )
}
