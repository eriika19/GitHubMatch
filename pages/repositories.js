import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Layout from "../components/Layout";

class RepostitoriesPage extends Component {
  state = {
    loading: false,
    searchValue: ""
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

  handleChange = e => {
    if (e.target.value.length > 0) {
      this.setState({
        searchValue: e.target.value
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      alert("Se ha enviado un valor de búsqueda " + this.state.searchValue);
      e.preventDefault();
    }
  };

  render() {
    const { loading, searchValue } = this.state;
    return (
      <div>
        <Head>
          <title>Luuna | GitHub Repositories Match</title>
        </Head>
        <Layout loading={loading}>
          <Fade right>
            <section id="repostitories" className="section">
              <form className="field">
                <p className="control has-icons-left is-expanded">
                  <input
                    className="input is-info is-rounded"
                    type="text"
                    placeholder="Buscar repositorio GitHub.."
                    onKeyPress={this.handleKeyPress}
                    onChange={this.handleChange}
                    value={searchValue}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon className="fas" icon="search" />
                  </span>
                </p>
              </form>
            </section>
          </Fade>
        </Layout>
      </div>
    );
  }
}

export default RepostitoriesPage;
