import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GitHubMatch from "../utils/apiCalls";

import Layout from "../components/Layout";
import RepoCard from "../components/RepoCard";

class RepositoriesPage extends Component {
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
  }

  cleanMatchedRepos = () => {
    this.setState({
      matchRepos: ""
    });
  };

  toggleSearching = () => {
    this.setState({
      searching: !this.state.searching
    });
  };

  handleChange = e => {
    if (e.target.value.length < 2) {
      this.cleanMatchedRepos();
    }
    this.setState({
      searchValue: e.target.value
    });
  };

  getData = async () => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byRepo(searchValue);
    const { data } = response;
    return data;
  };

  handleSubmit = async e => {
    //Init searching state
    this.toggleSearching();
    e.preventDefault();

    const { searchValue } = this.state;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      //get searchValue results
      const data = await this.getData();
      //handle results to get matchUsers array
      const matchRepos = data.items;
      this.setState({
        matchRepos: matchRepos
      });
    }
    //Finalize searching state
    this.toggleSearching();
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
              <form className="field" onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChange}
                    value={searchValue}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon className="fas" icon="search" />
                  </span>
                </p>
              </form>
              <section id="results">
                {matchRepos === ""
                  ? ``
                  : `Se encontró ${matchRepos.length} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {matchRepos.length > 0
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

export default RepositoriesPage;
