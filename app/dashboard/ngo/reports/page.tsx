"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import StatCard from "@/components/dashboard/stat-card"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/ngo" },
  { icon: "🍽️", label: "Available Food", href: "/dashboard/ngo/food" },
 
  { icon: "📦", label: "Pickups", href: "/dashboard/ngo/pickups" },
  { icon: "📈", label: "Reports", href: "/dashboard/ngo/reports" },
]

const monthlyData = [
  { month: "Jan", pickups: 12, quantity: 45 },
  { month: "Feb", pickups: 15, quantity: 52 },
  { month: "Mar", pickups: 18, quantity: 68 },
  { month: "Apr", pickups: 22, quantity: 75 },
  { month: "May", pickups: 25, quantity: 82 },
  { month: "Jun", pickups: 28, quantity: 90 },
]

const foodCategoryData = [
  { name: "Rice", value: 30, color: "#0d9488" },
  { name: "Dal", value: 25, color: "#10b981" },
  { name: "Vegetables", value: 20, color: "#059669" },
  { name: "Bread", value: 15, color: "#047857" },
  { name: "Other", value: 10, color: "#065f46" },
]

export default function ReportsPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="NGO" userName="NGO Representative">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/ngo" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground mt-1">View your pickup history and statistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={<span className="text-2xl">📦</span>}
            title="Total Pickups"
            value="120"
            subtitle="All time"
          />
          <StatCard
            icon={<span className="text-2xl">⚖️</span>}
            title="Total Food Received"
            value="412 kg"
            subtitle="Combined weight"
          />
          <StatCard
            icon={<span className="text-2xl">👥</span>}
            title="People Served"
            value="1,250+"
            subtitle="Estimated beneficiaries"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Pickup Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pickups" stroke="#0d9488" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Food Distribution by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={foodCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {foodCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#0d9488" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  )
}
