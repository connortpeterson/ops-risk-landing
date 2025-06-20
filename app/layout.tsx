import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BiotechOps - Institutional-Grade Biotech Intelligence",
  description:
    "Get comprehensive risk assessments and investment insights for biotech companies. Built for investors who demand rigorous analysis and evidence-based decisions.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
