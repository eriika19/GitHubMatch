import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <noscript>
            If you're seeing this message, that means
            <strong>JavaScript has been disabled on your browser</strong>,
            please <strong>enable JS</strong> to make this app work.
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;