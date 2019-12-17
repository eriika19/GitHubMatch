import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Fade from "react-reveal/Fade";

//import Layout from "../components/Layout";
import Splash from "../components/Splash";
import Loader from "../components/Loader";

class Home extends Component {
/*   static async getInitialProps({ store }) {
    store.dispatch({ type: "SOME_ASYNC_ACTION_REQUEST" });
    return { staticData: "Hello world!" };
  } */

  state = {
    loading: false,
    load: false
  };

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

    window.addEventListener("load", this.handleLoad);
    window.addEventListener("scroll", this.changeState, true);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.handleLoad);
    window.removeEventListener("scroll", this.changeState);
  }

  // Manejo de Splash con logo de Luuna
  handleLoad = () => {
    setTimeout(this.changeState, 700);
  };

  changeState = () => {
    this.setState({
      load: true
    });
  };

  render() {
    console.log(this.props);
    
    const { load, loading } = this.state;
    return (
      <main className="has-padding-top section view">
        <Head>
          <title>Luuna | GitHub Match</title>
        </Head>
        <Fade big cascade>
          <Splash load={load} />
        </Fade>
        <Fade right>
          <section id="home" className={load ? "section" : "section hide"}>
            <div className="container">
              <h2 className="title is-2 is-spaced">¡Hola!</h2>
              <h5 className="subtitle is-5">
                Bienvenid@ al mejor buscador de usuarios y repositorios dentro
                de GitHub.
              </h5>
              <div className="content has-text-centered has-lg-margin-top">
                <p className="is-size-5"> ¿Qué match deseas buscar hoy?</p>
                <div className="buttons is-centered">
                  <Link href="/users">
                    <button className="button is-medium is-rounded is-info is-light">
                      Usuario GitHub
                    </button>
                  </Link>
                  <Link href="/repositories">
                    <button className="button is-medium is-rounded is-success is-light">
                      Repositorio GitHub
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Fade>
        <Loader loading={loading} />
      </main>
    );
  }
}

export default connect(state => state)(Home);
