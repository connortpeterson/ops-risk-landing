"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function WatchlistPage() {
  const [tickers, setTickers] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) setTickers(JSON.parse(stored));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Watchlist</h1>
        {tickers.length === 0 ? (
          <p>Your watchlist is empty.</p>
        ) : (
          <ul className="list-disc pl-6 space-y-1">
            {tickers.map((t) => (
              <li key={t}>
                <Link href={`/score/${t}`}>{t}</Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
