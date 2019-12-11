import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";

import Layout from "../components/Layout";
import Splash from "../components/Splash";

class Home extends Component {
  state = {
    loading: "",
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
      loading: false,
      load: false,
    });
  }

  handleLoad = () => {
    setTimeout(this.changeState, 800);
  };

  changeState = () => {
    this.setState({
      load: true
    });
  };

  render() {
    const { load } = this.state;
    return (
      <Layout loading={false}>
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
              <div className="content">
                <p>¿Qué deseas buscar hoy?</p>
              </div>
            </div>
          </section>
        </Fade>
      </Layout>
    );
  }
}

export default Home;
