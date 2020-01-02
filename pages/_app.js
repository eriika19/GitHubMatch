
import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
//import { withRouter } from "next/router";

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

//import configureStore from "../redux/configure-store";
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
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        {/* <Provider store={store}> */}
          <Header />
          <Component {...pageProps} />
          <Footer />
        {/* </Provider> */}
      </Container>
    );
  }
}

export default MyApp;

//export default withRedux(configureStore)(withReduxSaga({ async: true })(MyApp));
