import { useState, useEffect } from 'react'

const STORAGE_KEY = 'watchlist'

export default function useWatchlist(): [string[], (t: string) => void, (t: string) => void] {
  const [list, setList] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as string[]) : []
    } catch (err) {
      console.warn('Failed to parse watchlist', err)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    } catch (err) {
      console.warn('Failed to persist watchlist', err)
    }
  }, [list])

  const add = (ticker: string) => {
    setList((prev) => (prev.includes(ticker) ? prev : [...prev, ticker]))
  }

  const remove = (ticker: string) => {
    setList((prev) => prev.filter((t) => t !== ticker))
  }

  return [list, add, remove]
}
