import { Component } from "react";
import Router from "next/router";
import Head from "next/head";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    this.cleanMatchedUsers();
  }

  cleanMatchedUsers = () => {
    this.setState({
      matchUsers: null
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

  getData = async () => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byUser(searchValue);
    const { data } = response;
    return data;
  };

  handleData = async data => {
    const arrPromises = data.items.map(async item => {
      const userData = await GitHubMatch.getUser(item.login);
      return userData;
    });
    return Promise.all(arrPromises);
  };

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
          const matchUsers = await this.handleData(data);
          this.setState({
            matchUsers: matchUsers
          });
        }

        this.setState({
          searching: false
        });
      }
    }
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
                    placeholder="Buscar usuario GitHub.."
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
                {matchUsers === null ? (
                  ""
                ) : matchUsers.size === 0 ? (
                  <p className="is-danger">No se encontraron coincidencias</p>
                ) : (
                  `Se encontró ${matchUsers.length} coincidencia(s)`
                )}
                <div id="results" className="container has-margin-top">
                    {Array.isArray(matchUsers)
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
