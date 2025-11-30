"use client"

import { LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ChangePasswordModal from "@/components/auth/change-password-modal"

interface TopbarProps {
  userName?: string
}

export default function Topbar({ userName = "User" }: TopbarProps) {
  const { logout } = useAuth()
  const router = useRouter()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <>
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="md:hidden w-12" />

          {/* Center title */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 pl-4 border-l border-border relative">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
              <button
                onClick={toggleProfileMenu}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition"
              >
                {userName.charAt(0)}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      setIsPasswordModalOpen(true)
                      setIsProfileMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
                    data-testid="change-password-btn"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
                    title="Logout"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-muted rounded-lg transition text-foreground"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
    </>
  )
}
