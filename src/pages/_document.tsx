import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>{/* Fonte global, meta tags que valem pra todas páginas */}</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
