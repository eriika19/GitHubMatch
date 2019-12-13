import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Link from "next/link";
import Fade from "react-reveal/Fade";

import Layout from "../components/Layout";
import Splash from "../components/Splash";

class Home extends Component {
  state = {
    loading: false,
    load: ""
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

    this.setState({
      load: false
    });
  }

  handleLoad = () => {
    setTimeout(this.changeState, 700);
  };

  changeState = () => {
    this.setState({
      load: true
    });
  };

  render() {
    const { load, loading } = this.state;
    return (
      <Layout loading={loading}>
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
                  <button className="button is-medium is-rounded is-info is-light">
                    <Link href="/users">Usuario GitHub</Link>
                  </button>
                  <button className="button is-medium is-rounded is-success is-light">
                    <Link href="/repositories">Repositorio GitHub</Link>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Fade>
      </Layout>
    );
  }
}

export default Home;
