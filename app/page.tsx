import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

export default function HomePage() {
  const handleTickerSubmit = (ticker: string) => {
    // Handle ticker submission - integrate with your existing logic
    console.log(`Analyzing ticker: ${ticker}`)
    // You can add your existing functionality here:
    // - API calls
    // - State management
    // - Analytics tracking
    // - etc.
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection onTickerSubmit={handleTickerSubmit} />
      </main>
      <Footer />
    </div>
  )
}
