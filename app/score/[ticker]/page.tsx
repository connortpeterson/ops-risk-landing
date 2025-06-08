import Header from "@/components/header";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";

interface ScorePageProps {
  params: { ticker?: string[] | string };
}

export default function ScorePage({ params }: ScorePageProps) {
  const tickerParam = Array.isArray(params.ticker)
    ? params.ticker[0]
    : params.ticker;
  if (!tickerParam) return notFound();
  const ticker = tickerParam.toUpperCase();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 md:px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Scorecard for {ticker}</h1>
        <p>
          This page would display a detailed scorecard for the selected ticker.
        </p>
      </main>
      <Footer />
    </div>
  );
}
