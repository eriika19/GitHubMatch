import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from "react-reveal/Fade";

import GitHubMatch from "../utils/apiCalls";

import Layout from "../components/Layout";
import UserCard from "../components/UserCard";

class UsersPage extends Component {
  state = {
    loading: false,
    searching: false,
    searchValue: "",
    matchUsers: "",
    totalCount: "",
    currentPage: "",
    lastPage: "",
    perPage: ""
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

  cleanPagination = () => {
    this.setState({
      matchUsers: "",
      totalCount: "",
      currentPage: "",
      lastPage: ""
    });
  };

  toggleSearching = () => {
    this.setState({
      searching: !this.state.searching
    });
  };

  setInitialPagination = (totalCount, lastPage, perPage) => {
    this.setState({
      totalCount: totalCount,
      lastPage: lastPage,
      perPage: perPage
    });
  };

  setCurrentPagination = (matchUsers, page) => {
    this.setState({
      matchUsers: matchUsers,
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

  handleData = async data => {
    const arrPromises = data.items.map(async item => {
      const userData = await GitHubMatch.getUser(item.login);
      return userData;
    });
    return Promise.all(arrPromises);
  };

  getData = async (page, perPage) => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byUser(searchValue, page, perPage);
    const { data } = response;
    return data;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { searchValue } = this.state;
    this.toggleSearching(); //Init searching state

    //Set intial paramenters
    const page = 1;
    const perPage = 20;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      const data = await this.getData(page, perPage); //get searchValue results
      const matchUsers = await this.handleData(data); //handle results to get matchUsers array
      const totalCount = data.total_count; //total of matches found
      const lastPage = Math.ceil(totalCount / perPage);
      this.setInitialPagination(totalCount, lastPage, perPage);
      this.setCurrentPagination(matchUsers, page);
      console.log(this.state.matchUsers);
    }

    this.toggleSearching(); //Finalize searching state
  };

  handlePagination = async e => {
    const { perPage } = this.state;
    this.toggleSearching(); //Init searching state
    const page = e.target.name;

    const data = await this.getData(page, perPage); //get searchValue results
    const matchUsers = await this.handleData(data); //handle results to get matchUsers array

    this.setCurrentPagination(matchUsers, page);
    console.log(this.state.matchUsers);

    this.toggleSearching(); //Finalize searching state
  };

  createArrPagination = lastPage => {
    const arrPagination = [];
    for (let i = 1; i <= lastPage; i++) {
      arrPagination.push(i);
    }
    return arrPagination;
  };

  ItemPagination = (page, i) => {
    const { currentPage } = this.state;
    const currentPageNumber = parseInt(currentPage, 10);

    return currentPageNumber == page ? (
      <li key={i}>
        <a
          className="pagination-link is-current"
          aria-label={"Page " + { page }}
          aria-current="page"
          name={page}
          onClick={e => this.handlePagination(e)}
        >
          {page}
        </a>
      </li>
    ) : (
      <li key={i}>
        <a
          className="pagination-link"
          aria-label={"Goto page " + { page }}
          name={page}
          onClick={e => this.handlePagination(e)}
        >
          {page}
        </a>
      </li>
    );
  };

  ItemsPagination = page => {
    const { lastPage } = this.state;
    const pageNumber = parseInt(page, 10);
    const pages = [pageNumber - 1, pageNumber, pageNumber + 1];
    const arrPages = pages.filter(pag => 1 <= pag && pag <= lastPage);
    return arrPages.map((pag, i) => this.ItemPagination(pag, i));
  };

  render() {
    const {
      loading,
      searching,
      searchValue,
      matchUsers,
      totalCount,
      currentPage,
      lastPage
    } = this.state;

    const arrPagination =
      lastPage > 6 ? [] : this.createArrPagination(lastPage);

    return (
      <div>
        <Head>
          <title>Luuna | GitHub Match Users</title>
        </Head>
        <Layout loading={loading}>
          <Fade right>
            <section id="users" className="section">
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
                    placeholder="Buscar usuario GitHub.."
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
              <section id="result">
                {matchUsers === ""
                  ? ``
                  : `Se encontró ${totalCount} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {matchUsers.length > 0
                    ? matchUsers.map((props, i) => (
                        <UserCard {...props} key={i} />
                      ))
                    : ``}
                </div>
              </section>
            </section>
          </Fade>
        </Layout>
        {currentPage ? (
          lastPage > 5 ? (
            <nav
              className="pagination is-rounded is-centered has-margin-bottom"
              role="navigation"
              aria-label="pagination"
            >
              <ul className="pagination-list">
                {this.ItemPagination(1)}
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                {this.ItemsPagination(currentPage)}
                <li>
                  <span className="pagination-ellipsis">&hellip;</span>
                </li>
                {this.ItemPagination(lastPage)}
              </ul>
            </nav>
          ) : (
            <nav
              className="pagination is-rounded is-centered has-margin-bottom"
              role="navigation"
              aria-label="pagination"
            >
              <ul className="pagination-list">
                {arrPagination.map((page, i) => this.ItemPagination(page, i))}
              </ul>
            </nav>
          )
        ) : (
          ``
        )}
      </div>
    );
  }
}

export default UsersPage;


