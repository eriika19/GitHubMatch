import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cleanUsersMatch, getUsersMatch } from "../store/actions/users-actions";

import Layout from "../components/Layout";
import Oops from "../components/Oops";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";

class UsersPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    usersPerPage: PropTypes.number
  };

  static defaultProps = {
    usersPerPage: 20
  };

  state = {
    usersSearchValue: ""
  };

  handleChange = e => {
    if (e.target.value.length < 2) {
      const { dispatch } = this.props;
      dispatch(cleanUsersMatch());
    }
    this.setState({
      usersSearchValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { usersSearchValue } = this.state;

    /* Verifiy valid searchValue */
    if (usersSearchValue.length > 0) {
      const { dispatch, usersPerPage } = this.props;
      dispatch(getUsersMatch({ usersSearchValue, currentPage: 1, usersPerPage }));
    }
  };

  handlePagination = e => {
    const page = e.target.name;
    const { usersSearchValue } = this.state;
    const { dispatch, usersPerPage } = this.props;
    dispatch(getUsersMatch({ usersSearchValue, currentPage: page, usersPerPage }));
  };

  render() {
    console.log("this.props: ", this.props);
    const { usersSearchValue } = this.state;

    return (
      <Fragment>
        <Layout>
          <Fade right>
            <section id="users" className="section">
              <form className="field" onSubmit={this.handleSubmit}>
                <div
                  className={
                    this.props.searching
                      ? "control has-icons-left is-expanded is-loading"
                      : "control has-icons-left is-expanded"
                  }
                >
                  <input
                    className="input is-info is-rounded"
                    type="text"
                    placeholder="Buscar usuario GitHub.."
                    onChange={this.handleChange}
                    value={usersSearchValue}
                  />
                  <FontAwesomeIcon
                    className="icon is-small is-left"
                    icon="search"
                  />
                </div>
              </form>
              <section id="result">
                {this.props.usersMatch === ""
                  ? ''
                  : `Se encontró ${this.props.usersTotalResults} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {this.props.usersMatch.length > 0
                    ? this.props.usersMatch.map((props, i) =>
                        props === undefined ? (
                        <Oops key={i}/>
                        ) : (
                          <UserCard {...props} key={i} />
                        )
                      )
                    : ''}
                </div>
              </section>
            </section>
          </Fade>
        </Layout>
        <Pagination
          handlePagination={this.handlePagination}
          lastPage={this.props.pagination.lastPage}
          currentPage={this.props.pagination.currentPage}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searching: state.usersReducer.searching,
    usersMatch: state.usersReducer.usersMatch,
    usersTotalResults: state.usersReducer.usersTotalResults,
    pagination: state.usersReducer.pagination,
    error: state.usersReducer.error
  };
};

//export default connect(mapStateToProps)(UsersPage);
export default connect(state => state)(UsersPage);
