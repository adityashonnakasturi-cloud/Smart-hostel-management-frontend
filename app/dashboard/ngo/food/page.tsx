"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft, MapPin, Clock } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/ngo" },
  { icon: "🍽️", label: "Available Food", href: "/dashboard/ngo/food" },
  
  { icon: "📦", label: "Pickups", href: "/dashboard/ngo/pickups" },
  { icon: "📈", label: "Reports", href: "/dashboard/ngo/reports" },
]

const foodItems = [
  {
    id: "1",
    item: "Rice",
    quantity: "5kg",
    
    expires: "2025-11-03",
    pickup: "10:00 AM",
    location: "sdm cet mess",
  },
  {
    id: "2",
    item: "Dal",
    quantity: "2kg",
    
    expires: "2025-11-02",
    pickup: "2:00 PM",
    location: "sdm cet mess",
  },
  {
    id: "3",
    item: "Vegetables",
    quantity: "10kg",
    
    expires: "2025-11-04",
    pickup: "8:00 AM",
    location: "sdm cet mess",
  },
  {
    id: "4",
    item: "Bread",
    quantity: "30pcs",
    
    expires: "2025-11-02",
    pickup: "5:00 PM",
    location: "sdm cet mess",
  },
  {
    id: "5",
    item: "Main Mess",
    quantity: "15kg",
   
    expires: "2025-11-05",
    pickup: "9:00 AM",
    location: "sdm cet mess",
  },
]

export default function FoodPage() {
  const [filters, setFilters] = useState({ source: "all" })

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const filteredFoodItems = foodItems.filter((food) => {
    if (filters.source === "all") return true
    return food.source.toLowerCase() === filters.source.toLowerCase()
  })

  return (
    <DashboardLayout menuItems={menuItems} role="NGO" userName="NGO Representative">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/ngo" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Available Surplus Food</h2>
            <p className="text-muted-foreground mt-1">Browse and request available food items</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col md:flex-row gap-4">
          <select
            name="source"
            value={filters.source}
            onChange={handleFilterChange}
            className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          >
            <option value="all">All Sources</option>
            <option value="mess">Main Mess</option>
            <option value="dining">Dining Hall</option>
            <option value="bakery">Bakery</option>
          </select>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoodItems.map((food) => (
            <div key={food.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">{food.item}</p>
                  <p className="text-sm text-muted-foreground">{food.quantity}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Available
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{food.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm text-foreground">Pickup: {food.pickup}</span>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Expires:</span> {food.expires}
                </div>
              </div>

              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium">
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
