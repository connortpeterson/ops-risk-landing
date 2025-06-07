import { useRouter } from 'next/router'
import { useState, FormEvent } from 'react'

export default function Home() {
  const router = useRouter()
  const [ticker, setTicker] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = ticker.trim().toUpperCase()
    if (trimmed) {
      void router.push(`/score/${trimmed}`)
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form onSubmit={handleSubmit} className="space-y-4 text-center">
        <label className="block text-lg font-medium">
          Enter Biotech Ticker (e.g. SRPT)
        </label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
          className="w-full max-w-sm p-3 border rounded-md shadow-md"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
        >
          Run Scorecard
        </button>
      </form>
    </section>
  )
}
