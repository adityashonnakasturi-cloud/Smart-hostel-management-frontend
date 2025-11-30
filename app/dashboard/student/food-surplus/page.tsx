"use client"

import { useState } from "react"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { ArrowLeft, MapPin, Clock, Utensils } from "lucide-react"
import Link from "next/link"

const menuItems = [
  { icon: "📊", label: "Dashboard", href: "/dashboard/student" },
  { icon: "👤", label: "Profile Overview", href: "/dashboard/student/profile" },
  { icon: "🏠", label: "Room Details", href: "/dashboard/student/room" },
  { icon: "⚠️", label: "Submit Complaint", href: "/dashboard/student/complaint" },
  { icon: "📋", label: "Complaint Status", href: "/dashboard/student/complaints" },
  { icon: "🍽️", label: "Food Surplus", href: "/dashboard/student/food-surplus" },
]

const foodItems = [
  {
    id: "1",
    item: "Rice",
    quantity: "5kg",
    source: "Mess Hall",
    expiry: "2025-11-03",
    pickup: "10:00 AM",
    location: "Main Mess",
  },
  {
    id: "2",
    item: "Dal",
    quantity: "2kg",
    source: "Mess Hall",
    expiry: "2025-11-02",
    pickup: "2:00 PM",
    location: "Kitchen Store",
  },
  {
    id: "3",
    item: "Vegetables",
    quantity: "10kg",
    source: "Dining Hall",
    expiry: "2025-11-04",
    pickup: "8:00 AM",
    location: "Vegetable Storage",
  },
  {
    id: "4",
    item: "Bread",
    quantity: "30pcs",
    source: "Bakery",
    expiry: "2025-11-02",
    pickup: "5:00 PM",
    location: "Bakery Counter",
  },
  {
    id: "5",
    item: "Fruits",
    quantity: "15kg",
    source: "Mess Hall",
    expiry: "2025-11-05",
    pickup: "9:00 AM",
    location: "Fruit Store",
  },
]

export default function FoodSurplusPage() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <DashboardLayout menuItems={menuItems} role="Student" userName="John Doe">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/student" className="p-2 hover:bg-muted rounded-lg transition">
            <ArrowLeft size={24} className="text-foreground" />
          </Link>
          <div>
            <h2 className="text-3xl font-bold text-foreground">Food Surplus Distribution</h2>
            <p className="text-muted-foreground mt-1">Browse and request available surplus food</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodItems.map((food) => (
            <div
              key={food.id}
              className={`rounded-lg border-2 p-6 transition cursor-pointer ${
                selectedItems.includes(food.id)
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-foreground">{food.item}</p>
                  <p className="text-sm text-muted-foreground">{food.quantity}</p>
                </div>
                <button
                  onClick={() => handleSelect(food.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    selectedItems.includes(food.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {selectedItems.includes(food.id) ? "Selected" : "Select"}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Utensils size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{food.source}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{food.pickup}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-primary" />
                  <span className="text-sm text-foreground">{food.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Expires: <span className="font-medium text-foreground">{food.expiry}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div className="fixed bottom-6 right-6 bg-card border border-primary rounded-lg p-6 shadow-lg">
            <p className="text-sm text-muted-foreground">Selected Items</p>
            <p className="text-2xl font-bold text-foreground">{selectedItems.length}</p>
            <button className="w-full mt-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-medium">
              Request Pickup
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
