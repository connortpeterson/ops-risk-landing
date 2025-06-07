"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-serif text-xl font-bold text-blue-900">BiotechOps</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-700 hover:text-blue-900 transition">
              Platform
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-900 transition">
              Research
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-900 transition">
              Insights
            </a>
            <a href="#" className="text-slate-700 hover:text-blue-900 transition">
              About
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-slate-700">
              Sign In
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Get Access</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-slate-700 hover:text-blue-900 transition">
                Platform
              </a>
              <a href="#" className="text-slate-700 hover:text-blue-900 transition">
                Research
              </a>
              <a href="#" className="text-slate-700 hover:text-blue-900 transition">
                Insights
              </a>
              <a href="#" className="text-slate-700 hover:text-blue-900 transition">
                About
              </a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" className="text-slate-700 justify-start">
                  Sign In
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 justify-start">Get Access</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
