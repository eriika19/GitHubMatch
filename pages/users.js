import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";

import Layout from "../components/Layout";

class UsersPage extends Component {
 state = {
    loading: false
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
    }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Head>
          <title>Luuna | GitHub Users Match</title>
        </Head>
        <Layout loading = {loading}>
          <Fade right>
            <section id="users" className="section">
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
      </div>
    );
  }
}

export default UsersPage;
