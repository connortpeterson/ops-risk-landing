"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [ticker, setTicker] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticker.trim()) {
      router.push(`/score/${ticker.toUpperCase()}`)
    }
  }

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value.toUpperCase())
  }

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Hero Headline */}
          <h1 className="font-serif text-blue-900 text-4xl sm:text-5xl font-bold tracking-tight">
            Institutional-Grade Biotech Intelligence
          </h1>

          {/* Subheadline */}
          <p className="text-slate-700 text-lg sm:text-xl leading-relaxed">
            Get comprehensive risk assessments and investment insights for biotech companies. Built for investors who
            demand rigorous analysis and evidence-based decisions.
          </p>

          {/* Ticker Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 justify-center max-w-md mx-auto mt-6">
            <Input
              type="text"
              placeholder="e.g. CRSP, SRPT"
              value={ticker}
              onChange={handleTickerChange}
              className="flex-1 text-center font-mono text-lg tracking-wider"
              maxLength={10}
            />
            <Button
              type="submit"
              className="bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition"
              disabled={!ticker.trim()}
            >
              Analyze
            </Button>
          </form>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-sm text-slate-600 mt-10">
            <div className="space-y-2">
              <div className="text-2xl">🧬</div>
              <h3 className="font-semibold text-slate-800">Evidence-Based Scoring</h3>
              <p>Quantitative analysis of clinical data, regulatory milestones, and market dynamics</p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl">📊</div>
              <h3 className="font-semibold text-slate-800">Modality-Adjusted Risk Model</h3>
              <p>Tailored risk frameworks for gene therapy, cell therapy, and traditional pharma</p>
            </div>

            <div className="space-y-2">
              <div className="text-2xl">🔬</div>
              <h3 className="font-semibold text-slate-800">Investor-Grade Snapshot PDF</h3>
              <p>Professional reports ready for investment committees and due diligence</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
