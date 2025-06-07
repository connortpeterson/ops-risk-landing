import os
import requests

API_TOKEN = os.getenv("EODHD_API_TOKEN", "YOUR_API_TOKEN")


def fetch_fundamental(ticker: str):
    url = f"https://eodhd.com/api/fundamentals/{ticker}?api_token={API_TOKEN}&fmt=json"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()


def fetch_insider_transactions(ticker: str):
    url = f"https://eodhd.com/api/insider-transactions?api_token={API_TOKEN}&ticker={ticker}&fmt=json"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()


def fetch_earnings_calendar(start: str, end: str):
    url = (
        f"https://eodhd.com/api/calendar/earnings?from={start}&to={end}"
        f"&api_token={API_TOKEN}&fmt=json"
    )
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response.json()


if __name__ == "__main__":
    ticker = "AAPL.US"
    fundamental = fetch_fundamental(ticker)
    insider = fetch_insider_transactions(ticker)
    earnings = fetch_earnings_calendar("2018-12-02", "2018-12-06")

    print("Fundamental data:\n", fundamental)
    print("Insider transactions:\n", insider)
    print("Earnings calendar:\n", earnings)
