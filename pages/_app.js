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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
library.add(faSearch, faGithubAlt);

//config for _app and title 
import { RouterTitle } from "../constants/RouterTypes";
import configureStore from "../store/configure-store";

import Header from "../components/Header";
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
 /*   console.log("this.props: ", this.props);*/
    console.log("store: ", store); 

    return (
        <Provider store={store}>
          <div>
            <Header title={RouterTitle[router.pathname]} />
            <Component {...pageProps} />
            <Footer />
          </div>
        </Provider>
    );
  }
}

//export default withRedux(configureStore)(NextApp);
export default withRedux(configureStore)(withReduxSaga(NextApp));