import { Link } from 'react-router-dom'
import useWatchlist from './useWatchlist'

function Watchlist() {
  const [list, , remove] = useWatchlist()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Your Watchlist</h1>
        {list.length === 0 ? (
          <p className="text-center text-slate-600">No tickers saved yet.</p>
        ) : (
          <ul className="space-y-3">
            {list.map((ticker) => (
              <li key={ticker} className="flex justify-between items-center bg-white rounded-md shadow px-4 py-3">
                <Link to={`/score/${ticker}`} className="text-primary-600 font-medium">
                  {ticker}
                </Link>
                <button
                  onClick={() => remove(ticker)}
                  className="text-sm text-slate-500 hover:text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </section>
  )
}

export default Watchlist
