import { fontBody } from "@/lib/fonts";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`${fontBody} antialiased`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
