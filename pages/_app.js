import App from "next/app";
import "bulma/css/bulma.min.css";
import "hover.css/css/hover-min.css";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false;

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
library.add(faSearch, faGithubAlt);

import Header from "../components/Header";
import Footer from "../components/Footer";

class MyApp extends App {
  
  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      }
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <div className="container is-fluid">
        <Header />
        <Component {...pageProps} />
        <Footer />
        <style jsx global>
          {`
            body {
              font-family: "Noto Sans", sans-serif;
              font-size: 1.1rem;
            }

            .view {
              min-height: 100vh;
            }

            .hide {
              display: none;
            }

            .nice-hide {
              transition: all 5s ease-out;
              display: none;
            }

            .has-padding-top {
              padding-top: 7.2rem;
            }

            .is-vertical-align {
              vertical-align: middle;
            }

            .splash {
              padding-top: 15vh;
            }

            .splash-logo img {
              width: 15rem;
              height: auto;
            }

            .footer {
              //    position: fixed;
              padding: 1.95rem 1rem 2.65em;
              left: 0;
              right: 0;
              bottom: 0;
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
              color: #5b7bb2;
              font-weight: 600;
            }

            .is-nice-blue:hover {
              color: #b3d4fc;
            }

            .is-bgnice-blue {
              background-color: #b3d4fc;
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
              cursor: pointer;
            }

            a.navbar-item {
              color: #5b7bb2;
              font-size: 1.1rem;
            }

            .image img {
              margin-top: 0.55rem;
              margin-left: 0.9rem;
            }

            img.is-rounded {
              margin: 0;
            }

            span {
              color: #7a6ff0;
            }

            .is-info.input {
              border-color: #5b7bb2;
              border-width: 0.1rem;
            }

            .has-margin-top {
              margin-top: 2.5rem;
            }

            .has-lg-margin-top {
              margin-top: 4.5rem;
            }

            .has-margin-bottom {
              margin-bottom: 2.5rem;
              margin-top: -4rem;
            }

            .card {
              border-radius: 10px;
              margin-bottom: 1rem;
            }

            .buttons {
              margin-top: 2rem;
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

              .section {
                padding-left: 0;
                padding-right: 0;
              }
            }
          `}
        </style>
      </div>
    );
  }
}

export default MyApp;
