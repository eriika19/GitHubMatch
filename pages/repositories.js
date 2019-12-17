import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GitHubMatch from "../utils/apiCalls";

import Layout from "../components/Layout";
import Oops from "../components/Oops";
import RepoCard from "../components/RepoCard";
import Pagination from "../components/Pagination";

class RepositoriesPage extends Component {
  state = {
    loading: false,
    searching: false,
    searchValue: "",
    matchRepos: "",
    totalCount: "",
    currentPage: "",
    lastPage: "",
    perPage: 20
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
  toggleSearching = () => {
    this.setState({
      searching: !this.state.searching
    });
  };

  cleanPagination = () => {
    this.setState({
      matchRepos: "",
      totalCount: "",
      currentPage: "",
      lastPage: ""
    });
  };

  setInitialPagination = data => {
    const { perPage } = this.state;
    const totalCount = data.total_count; //total of matches found
    const lastPage = Math.ceil(totalCount / perPage);
    this.setState({
      totalCount: totalCount,
      lastPage: lastPage
    });
  };

  setCurrentPagination = (matchRepos, page) => {
    this.setState({
      matchRepos: matchRepos,
      currentPage: page
    });
  };

  handleChange = e => {
    if (e.target.value.length < 2) {
      this.cleanPagination();
    }
    this.setState({
      searchValue: e.target.value
    });
  };

  getData = async (page, perPage) => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byRepo(searchValue, page, perPage);
    const { data } = response;
    return data;
  };

  handleSubmit = async e => {
    this.toggleSearching(); //Init searching state
    e.preventDefault();
    const { searchValue, perPage } = this.state;
    //Set intial paramenters
    const page = 1;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      const data = await this.getData(page, perPage); //get searchValue results
      const matchRepos = data.items; //handle results to get matchUsers array
      this.setInitialPagination(data);
      this.setCurrentPagination(matchRepos, page);
    }
    this.toggleSearching(); //Finalize searching state
  };
 
  handlePagination = async e => {
    const { perPage } = this.state;
    this.toggleSearching(); //Init searching state
    const page = e.target.name;

    const data = await this.getData(page, perPage); //get searchValue results
    const matchRepos = data.items;

    this.setCurrentPagination(matchRepos, page);
    this.toggleSearching(); //Finalize searching state
  };

  render() {
    const {
      loading,
      searching,
      searchValue,
      matchRepos,
      totalCount,
      currentPage,
      lastPage
    } = this.state;

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
                    <i>
                      <FontAwesomeIcon className="fas" icon="search" />
                    </i>
                  </span>
                </p>
              </form>
              <section id="results">
                {matchRepos === ""
                  ? ``
                  : `Se encontró ${totalCount} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {matchRepos.length > 0
                    ? matchRepos.map((props, i) => (
                        props=== undefined ? <Oops /> : <RepoCard {...props} key={i} />
                      ))
                    : ``}
                </div>
              </section>
            </section>
          </Fade>
        </Layout>
        <Pagination handlePagination={this.handlePagination} lastPage={lastPage} currentPage={currentPage} />
      </div>
    );
  }
}

export default RepositoriesPage;
