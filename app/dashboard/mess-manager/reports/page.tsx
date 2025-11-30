"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/mess-manager" },
  { icon: "➕", label: "Add Surplus Food", href: "/dashboard/mess-manager/add-surplus" },
  { icon: "📦", label: "Manage Distribution", href: "/dashboard/mess-manager/manage" },
  { icon: "👥", label: "View NGOs", href: "/dashboard/mess-manager/ngos" },
  { icon: "📈", label: "Reports", href: "/dashboard/mess-manager/reports" },
]

const monthlyData = [
  { month: "Jan", surplus: 45, distributed: 40 },
  { month: "Feb", surplus: 52, distributed: 48 },
  { month: "Mar", surplus: 68, distributed: 62 },
  { month: "Apr", surplus: 75, distributed: 70 },
  { month: "May", surplus: 82, distributed: 78 },
  { month: "Jun", surplus: 90, distributed: 85 },
]

const ngoDistributionData = [
  { name: "Food for All", value: 35, color: "#0d9488" },
  { name: "Community Kitchen", value: 30, color: "#10b981" },
  { name: "Hunger Relief", value: 20, color: "#059669" },
  { name: "Others", value: 15, color: "#047857" },
]

export default function ReportsPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="Mess Manager" userName="Manager">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/mess-manager" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground mt-1">View food surplus and distribution statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<span className="text-2xl">📦</span>}
            title="Total Surplus"
            value="412 kg"
            subtitle="All time"
          />
          <StatCard
            icon={<span className="text-2xl">🎯</span>}
            title="Total Distributed"
            value="385 kg"
            subtitle="Delivered to NGOs"
          />
          <StatCard
            icon={<span className="text-2xl">👥</span>}
            title="Active Partners"
            value="3"
            subtitle="NGO organizations"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Surplus vs Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="surplus" fill="#0d9488" />
                <Bar dataKey="distributed" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Distribution by NGO Partner</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ngoDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ngoDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Surplus Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="surplus" stroke="#0d9488" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}
