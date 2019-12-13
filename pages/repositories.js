import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GitHubMatch from "../utils/apiCalls";

import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";

class ReposPage extends Component {
  state = {
    loading: false,
    searching: false,
    searchValue: "",
    matchRepos: ""
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

    this.setState({
      matchRepos: null
    });
  }

  handleChange = e => {
    if (e.target.value.length < 2) {
      this.setState({
        matchRepos: null
      });
    }
    this.setState({
      searchValue: e.target.value
    });
  };

  getData = async searchValue => {
    const response = await GitHubMatch.byRepo(searchValue);
    if (response.data.total_count > 0) {
      const data = response.data;
      return data;
    } else {
      return false;
    }
  };

  /*   handleData = async data => {
    const arrPromises = data.items.map(async item => {
      const repoData = await GitHubMatch.getRepo();
      return repoData;
    });
    return Promise.all(arrPromises);
  }; */

  handleKeyPress = async e => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.setState({
        searching: true
      });
      const { searchValue } = this.state;

      if (searchValue.length > 0) {
        const data = await this.getData(searchValue);
        if (data) {
          //const matchRepos = await this.handleData(data);
          const matchRepos = data.items;
    //      console.log(matchRepos);
          

          this.setState({
            matchRepos: matchRepos
          });
        } else {
          this.setState({
            matchRepos: false
          });
        }
      }

      this.setState({
        searching: false
      });
    }
  };

  render() {
    const { loading, searching, searchValue, matchRepos } = this.state;

    return (
      <div>
        <Head>
          <title>Luuna | GitHub Match Repos</title>
        </Head>
        <Layout loading={loading}>
          <Fade right>
            <section id="repositories" className="section">
              <form className="field">
                <p
                  className={
                    searching
                      ? "control has-icons-left is-expanded is-loading"
                      : "control has-icons-left is-expanded"
                  }
                >
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
              <section id="results">
                {matchRepos === null ? (
                  ""
                ) : matchRepos === false ? (
                  <p className="is-danger">No se encontraron coincidencias</p>
                ) : (
                  `Se encontró ${matchRepos.length} coincidencia(s)`
                )}
                <div id="results" className="container has-margin-top">
                  {Array.isArray(matchRepos)
                    ? matchRepos.map((props, i) => (
                        <RepoCard {...props} key={i} />
                      ))
                    : ``}
                </div>
              </section>
            </section>
          </Fade>
        </Layout>
      </div>
    );
  }
}

export default ReposPage;
