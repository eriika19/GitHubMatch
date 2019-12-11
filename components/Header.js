import { Component } from "react";
import Router from "next/router";
import Head from "next/head";

class Header extends Component {
  state = { loading: false };

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      this.setState({ loading: true });
    };
    Router.onRouteChangeComplete = () => {
      this.setState({ loading: false });
    };
    Router.onRouteChangeError = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    return (
      <div id="header" className="header">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="description" content="GitHub Match" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#B2CCFF" />
          <link rel="manifest" href="/_next/static/manifest.json" />
          <link rel="icon" href="/static/favicon.ico" />
          <link
            rel="apple-touch-icon"
            href="/static/apple-touch-icon.png"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <Loader loading={this.state.loading} />
      </div>
    );
  }
}

const Loader = ({ loading }) => {
  return (
    <div
      className={
        loading
          ? "pageloader is-active"
          : "pageloader"
      }
    >
      <span className="title">Cargando...</span>
    </div>
  );
};

export default Header;
