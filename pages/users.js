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
    lastPage: ""
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

  setTotalCount = totalCount => {
    this.setState({
      totalCount: totalCount
    });
  };

  setMatchUsers = matchUsers => {
    this.setState({
      matchUsers: matchUsers
    });
  };

  setCurrentPage = page => {
    this.setState({
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

  getData = async page => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byUser(searchValue, page);
    //console.log(response);

    const { data } = response;
    return data;
  };

  handleSubmit = async e => {
    this.toggleSearching(); //Init searching state
    e.preventDefault();

    const { searchValue } = this.state;
    const page = 1;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      const data = await this.getData(searchValue, page); //get searchValue results
      const matchUsers = await this.handleData(data); //handle results to get matchUsers array
      const totalCount = data.total_count;
      const lastPage = Math.ceil(totalCount / 20);
      this.setTotalCount(totalCount); // save total of matches
      this.setMatchUsers(matchUsers);
      this.setCurrentPage(page);
      this.setState({
        lastPage: lastPage
      });
    }

    this.toggleSearching(); //Finalize searching state
  };

  handlePagination = async e => {
    this.toggleSearching(); //Init searching state
    const { searchValue } = this.state;
    const page = e.target.name;

    const data = await this.getData(searchValue, page); //get searchValue results
    const matchUsers = await this.handleData(data); //handle results to get matchUsers array
    this.setMatchUsers(matchUsers);
    this.setCurrentPage(page);

    this.toggleSearching(); //Finalize searching state
  };

  ItemPagination = page => (
    <li>
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

  ItemsPagination = page => {
    const { lastPage } = this.state;
    const pageNumber = parseInt(page, 10);
    const pages = [pageNumber - 1, pageNumber, pageNumber + 1];
    const arrPages = pages.filter(pag => 1 <= pag && pag <= lastPage);

    return arrPages.map(pag => (
      <li>
        <a
          className="pagination-link"
          aria-label={"Goto page " + { pag }}
          name={pag}
          onClick={e => this.handlePagination(e)}
        >
          {pag}
        </a>
      </li>
    ));
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
          <nav
            className="pagination is-rounded is-small is-centered "
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
          ``
        )}
      </div>
    );
  }
}

export default UsersPage;

/* 
const ItemPagination = ({ page }) => (
  <li>
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

const ItemsPagination = ({ page }) => {
  const pageNumber = parseInt(page, 10);
  const arrPages = [pageNumber - 1, pageNumber, pageNumber + 1];
  return arrPages.map(pag => (
    <li>
      <a
        className="pagination-link"
        aria-label={"Goto page " + { pag }}
        name={pag}
        onClick={e => this.handlePagination(e)}
      >
        {pag}
      </a>
    </li>
  ));
};
 */
