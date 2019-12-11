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
        <style jsx global>
          {`
            body {
              font-family: "Noto Sans", sans-serif;
              font-size: 1.1rem;
            }

            .view {
              height: 100vh;
            }

            .hide {
              display: none;
            }

            .nice-hide {
              transition: all 5s ease-out;
              display: none;
            }

            .has-padding-top {
              padding-top: 8.2rem;
            }

            .splash {
              padding-top: 40vh;
            }

            .splash-logo img {
              width: 15rem;
              height: auto;
            }

            .is-purple {
              color: #8378f4;
            }

            .is-bg-purple {
              background-color: #8378f4;
            }

            .is-dark-blue {
              color: #777;
            }

            .is-nice-blue {
              color: #b3d4fc;
            }

            .is-blue {
              color: #5b7bb2;
            }

            .is-bg-blue {
              background-color: #5b7bb2;
              color: #fff;
            }

            .is-bg-blue {
              background-color: #5b7bb2;
              color: #fff;
            }

            .nav-logo img {
              width: 6.5rem;
              height: auto;
            }

            a.navbar-item {
              color: #5b7bb2;
            }

            .image img {
              margin-top: 0.55rem;
              margin-left: 0.9rem;
            }

            span {
              color: #7a6ff0;
            }

            .button {
              border-width: 0.12rem;
            }

            @media (max-width: 1023px) {
              .navbar-menu {
                height: 100vh;
              }

              a.navbar-item {
                border-bottom: 1px dashed #5b7bb2;
                padding: 1.2rem;
                margin-left: 1rem;
                margin-right: 1rem;
                color: #777;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default MyApp;