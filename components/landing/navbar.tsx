"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              HM
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">HostelConnect</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-foreground hover:text-primary transition">
              Home
            </Link>
            <Link href="#features" className="text-foreground hover:text-primary transition">
              Features
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
            <Link href="/login" className="text-foreground hover:text-primary transition">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-secondary transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Home
            </Link>
            <Link href="#features" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Features
            </Link>
            <Link href="#contact" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Contact
            </Link>
            <Link href="/login" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Login
            </Link>
            <Link href="/signup" className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg text-center">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
