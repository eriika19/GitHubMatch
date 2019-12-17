import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import GitHubMatch from "../utils/apiCalls";

import Layout from "../components/Layout";
import Oops from "../components/Oops";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";


class UsersPage extends Component {
  state = {
    loading: false,
    searching: false,
    searchValue: "",
    matchUsers: "",
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
      matchUsers: "",
      totalCount: "",
      currentPage: "",
      lastPage: ""
    });
  };

  setInitialPagination = data => {
    const { perPage } = this.state;
    const totalCount = data.total_count; //total of matches found
    const lastPage = Math.ceil((totalCount / perPage));
    this.setState({
      totalCount: totalCount,
      lastPage: lastPage
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
    this.toggleSearching(); //Init searching state
    const { searchValue, perPage } = this.state;
    //Set intial paramenters
    const page = 1;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      const data = await this.getData(page, perPage); //get searchValue results
      const matchUsers = await this.handleData(data); //handle results to get matchUsers array
      this.setInitialPagination(data);
      this.setCurrentPagination(matchUsers, page);
      //     console.log(this.state.matchUsers);
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
                <div
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
                  <FontAwesomeIcon
                    className="icon is-small is-left"
                    icon="search"
                  />
                </div>
              </form>
              <section id="result">
                {matchUsers === ""
                  ? ``
                  : `Se encontró ${totalCount} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {matchUsers.length > 0
                    ? matchUsers.map((props, i) =>
                        props === undefined ? (
                          <Oops />
                        ) : (
                          <UserCard {...props} key={i} />
                        )
                      )
                    : ``}
                </div>
              </section>
            </section>
          </Fade>
        </Layout>
        <Pagination
          handlePagination={this.handlePagination}
          lastPage={lastPage}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default UsersPage;
