import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const csp = "default-src 'self'; script-src 'self' https://vercel.com; style-src 'self'; object-src 'none';";
  return (
    <Html>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
