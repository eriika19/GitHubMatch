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
    matchUsers: ""
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

  cleanMatchedUsers = () => {
    this.setState({
      matchUsers: ""
    });
  };

  toggleSearching = () => {
    this.setState({
      searching: !this.state.searching
    });
  };

  handleChange = e => {
    if (e.target.value.length < 2) {
      this.cleanMatchedUsers();
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

  getData = async () => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byUser(searchValue);
    const { data } = response;
    return data;
  };

  handleSubmit = async e => {
    this.toggleSearching(); //Init searching state

    e.preventDefault();

    const { searchValue } = this.state;

    //Verifiy valid searchValue
    if (searchValue.length > 0) {
      const data = await this.getData(searchValue); //get searchValue results
      const matchUsers = await this.handleData(data); //handle results to get matchUsers array
      this.setState({
        matchUsers: matchUsers
      });
    }

    this.toggleSearching(); //Finalize searching state
  };

  render() {
    const { loading, searching, searchValue, matchUsers } = this.state;

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
                  : `Se encontró ${matchUsers.length} coincidencia(s)`}
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
      </div>
    );
  }
}

export default UsersPage;
