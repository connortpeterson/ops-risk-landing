# ops-risk-landing

This project was bootstrapped with [Vite](https://vitejs.dev/) using the React + TypeScript template.
Tailwind CSS is configured for styling, and React Router provides navigation.

The Score page now supports PDF export, a persistent watchlist, and dynamic scoring for any ticker.

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Linting

Ensure dependencies are installed with `npm install`, then run:

```bash
npm run lint
```

### Scorecard Watchlist

Click the **Watchlist** button on any scorecard to save the ticker locally. View
your saved tickers at `/watchlist`.

The `dist` directory will contain the optimized site with compiled Tailwind utilities.
## API Example

Run `eodhd_api_example.py` to fetch sample data from the EODHD Fundamental Data, Insider Transactions, and Earnings Calendar APIs. Set an `EODHD_API_TOKEN` environment variable with your API key before running.


## License

MIT
