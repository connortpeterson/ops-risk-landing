import { useParams } from 'react-router-dom'

function Score() {
  const { ticker } = useParams<{ ticker: string }>()

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 p-6">
      <main className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-2xl font-bold">{ticker?.toUpperCase()} Scorecard</h1>
        <p>Coming soon.</p>
      </main>
    </section>
  )
}

export default Score
