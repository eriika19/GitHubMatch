import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fade from "react-reveal/Fade";

//import GitHubMatch from "../utils/api-calls";

//import Layout from "../components/Layout";
import UserCard from "../components/UserCard";
import Oops from "../components/Oops";
import Loader from "../components/Loader";

class UsersPage extends Component {
  /*   static async getInitialProps({ store }) {
    store.dispatch({ type: "SOME_ASYNC_ACTION_REQUEST" });
    return { staticData: "Hello world!" };
  } */

  state = {
    loading: false,
    searching: false,
    searchValue: "",
    usersMatch: "",
    totalCount: "",
    currentPage: "",
    lastPage: "",
    perPage: ""
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchChannelList());
    const _userCode = window.localStorage.getItem("username");
    if (_userCode) {
      dispatch(
        getUserInfo({
          username: _userCode
        })
      );
    }

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
      usersMatch: "",
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

  setCurrentPagination = (usersMatch, page) => {
    this.setState({
      usersMatch: usersMatch,
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

  getUsersArr = async data => {
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
      const usersMatch = await this.getUsersArr(data); //handle results to get usersMatch array
      const totalCount = data.total_count; //total of matches found
      const lastPage = Math.ceil(totalCount / perPage - 1);
      this.setInitialPagination(data);
      this.setCurrentPagination(usersMatch, page);
      console.log(this.state.usersMatch);
    }

    this.toggleSearching(); //Finalize searching state
  };

  handlePagination = async e => {
    const { perPage } = this.state;
    this.toggleSearching(); //Init searching state
    const page = e.target.name;

    const data = await this.getData(page, perPage); //get searchValue results
    const usersMatch = await this.getUsersArr(data); //handle results to get usersMatch array

    this.setCurrentPagination(usersMatch, page);
    console.log(this.state.usersMatch);

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
    console.log(this.props);

    const {
      loading,
      searching,
      searchValue,
      usersMatch,
      totalCount,
      currentPage,
      lastPage
    } = this.state;

    return (
      <main className="has-padding-top section view">
        <Head>
          <title>Luuna | GitHub Match Users</title>
        </Head>
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
              {usersMatch === ""
                ? ``
                : `Se encontró ${totalCount} coincidencia(s)`}
              <div id="results" className="container has-margin-top">
                {usersMatch.length
                  ? usersMatch.map((props, i) =>
                      props === undefined ? (
                        Oops
                      ) : (
                        <UserCard {...props} key={i} />
                      )
                    )
                  : ``}
              </div>
            </section>
          </section>
        </Fade>
        <Loader loading={loading} />
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
      </main>
    );
  }
}

export default connect(state => ({
  pagination: state.pagination,
  usersMatch: state.usersMatch,
}))(UsersPage);
