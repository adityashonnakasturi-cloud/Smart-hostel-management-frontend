"use client"

import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft, BarChart3, TrendingUp, Users, AlertCircle } from 'lucide-react'
import Link from "next/link"

const menuItems = [
  { icon: <span>📊</span>, label: "Dashboard", href: "/dashboard/chief-warden" },
  { icon: <span>➕</span>, label: "Add Student", href: "/dashboard/chief-warden/add-student" },
  { icon: <span>👥</span>, label: "Manage Wardens", href: "/dashboard/chief-warden/manage-wardens" },
  { icon: <span>⚠️</span>, label: "View Complaints", href: "/dashboard/chief-warden/complaints" },
  { icon: <span>📈</span>, label: "Reports", href: "/dashboard/chief-warden/reports" },
]

const reportStats = [
  {
    title: "Total Complaints",
    value: "156",
    change: "+12%",
    icon: AlertCircle,
    color: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    title: "Resolved Issues",
    value: "98",
    change: "+8%",
    icon: TrendingUp,
    color: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    title: "Active Wardens",
    value: "24",
    change: "+2%",
    icon: Users,
    color: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    title: "Pending Tasks",
    value: "34",
    change: "-5%",
    icon: BarChart3,
    color: "bg-red-100",
    textColor: "text-red-600",
  },
]

const monthlyData = [
  { month: "Jan", complaints: 45, resolved: 32 },
  { month: "Feb", complaints: 52, resolved: 38 },
  { month: "Mar", complaints: 48, resolved: 35 },
  { month: "Apr", complaints: 61, resolved: 48 },
  { month: "May", complaints: 55, resolved: 42 },
  { month: "Jun", complaints: 67, resolved: 56 },
  { month: "Jul", complaints: 72, resolved: 64 },
  { month: "Aug", complaints: 68, resolved: 58 },
  { month: "Sep", complaints: 71, resolved: 62 },
  { month: "Oct", complaints: 78, resolved: 68 },
  { month: "Nov", complaints: 82, resolved: 70 },
]

export default function ReportsPage() {
  return (
    <DashboardLayout menuItems={menuItems} role="Chief Warden" userName="Dr. Admin">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/chief-warden" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Reports & Analytics</h2>
            <p className="text-muted-foreground mt-1">Hostel management statistics and insights</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportStats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon size={20} className={stat.textColor} />
                  </div>
                </div>
                <p className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </p>
              </div>
            )
          })}
        </div>

        {/* Monthly Trend */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Monthly Complaint Trends</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Month</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Complaints</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Resolved</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Resolution Rate</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((row, i) => {
                  const rate = ((row.resolved / row.complaints) * 100).toFixed(0)
                  return (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition">
                      <td className="py-3 px-4 text-foreground font-medium">{row.month}</td>
                      <td className="py-3 px-4 text-right text-foreground">{row.complaints}</td>
                      <td className="py-3 px-4 text-right text-green-600 font-medium">{row.resolved}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Complaint Categories</h3>
            <div className="space-y-3">
              {[
                { label: "Room Issues", count: 45, percentage: 28 },
                { label: "Maintenance", count: 32, percentage: 20 },
                { label: "Amenities", count: 38, percentage: 24 },
                { label: "Safety", count: 24, percentage: 15 },
                { label: "Other", count: 17, percentage: 13 },
              ].map((cat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{cat.label}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-bold text-foreground">{cat.count}</p>
                    <p className="text-xs text-muted-foreground">{cat.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Status Summary</h3>
            <div className="space-y-4">
              {[
                { status: "Resolved", count: 98, color: "bg-green-500" },
                { status: "In Progress", count: 34, color: "bg-blue-500" },
                { status: "Pending", count: 24, color: "bg-yellow-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <p className="text-sm font-medium text-foreground">{item.status}</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">{item.count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download Report Button */}
        <div className="flex gap-3 pt-4">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium">
            Download PDF Report
          </button>
          <button className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition font-medium">
            Export as CSV
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
