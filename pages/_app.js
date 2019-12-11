import App from "next/app";
import "bulma/css/bulma.min.css";
import "hover.css/css/hover-min.css";
//import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add( faEnvelope, faLock, fab );

import Header from "../components/Header";

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div>
        <Header />
        <Component {...pageProps} />
        </div>
    );
  }
}

export default MyApp;