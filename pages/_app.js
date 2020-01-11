import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import "bulma/css/bulma.min.css";
import "hover.css/css/hover-min.css";
import "bulma-pageloader/dist/css/bulma-pageloader.min.css";

// config for fontawesome
config.autoAddCss = false;
//library from fontawesome
import { faSearch, faPlusCircle, faUserPlus, faMinusCircle, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
library.add(faSearch, faGithubAlt, faPlusCircle, faUserPlus, faMinusCircle, faUserMinus);

//config for _app and title 
import { RouterTitle } from "../constants/RouterTypes";
import configureStore from "../store/configure-store";

import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

class NextApp extends App {
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
    const { Component, pageProps, store, router } = this.props;

    return (
      <Provider store= {store}>
          <Header title= {RouterTitle[router.pathname]} />
          <Nav activeRoute= {router.pathname} />
          <Component {...pageProps} />
          <Footer />
      </Provider>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga(NextApp));