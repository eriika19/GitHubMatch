import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cleanReposMatch, getReposMatch } from "../store/actions/repositories-actions";

import Layout from "../components/Layout";
import Oops from "../components/Oops";
import RepoCard from "../components/RepoCard";
import Pagination from "../components/Pagination";

class RepositoriesPage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searching: PropTypes.bool.isRequired,
    reposPerPage: PropTypes.number
  };

  static defaultProps = {
    reposPerPage: 20
  };

  state = {
    reposSearchValue: ""
  };

  handleChange = e => {
    if (e.target.value.length < 2) {
      const { dispatch } = this.props;
      dispatch(cleanReposMatch());
    }
    this.setState({
      reposSearchValue: e.target.value
    });
  };

  /*   getData = async (page, perPage) => {
    const { searchValue } = this.state;
    const response = await GitHubMatch.byRepo(searchValue, page, perPage);
    const { data } = response;
    return data;
  }; */

  handleSubmit = e => {
    e.preventDefault();
    const { reposSearchValue } = this.state;

    //Verifiy valid searchValue
    if (reposSearchValue.length > 0) {
      const { dispatch, reposPerPage } = this.props;
      dispatch(
        getReposMatch({ reposSearchValue, currentPage: 1, reposPerPage })
      );
    }
  };

  handlePagination = e => {
    const page = e.target.name;
    const { reposSearchValue } = this.state;
    const { dispatch, reposPerPage } = this.props;
    dispatch(
      getReposMatch({ reposSearchValue, currentPage: page, reposPerPage })
    );
  };

  render() {
    console.log("this.props: ", this.props);
    const { reposSearchValue } = this.state;

    return (
      <Fragment>
        <Layout>
          <Fade right>
            <section id="repositories" className="section">
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
                    placeholder="Buscar repositorio GitHub.."
                    onChange={this.handleChange}
                    value={reposSearchValue}
                  />
                  <FontAwesomeIcon
                    className="icon is-small is-left"
                    icon="search"
                  />
                </div>
              </form>
              <section id="results">
                {this.props.reposMatch === ""
                  ? ""
                  : `Se encontró ${this.props.reposTotalResults} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {this.props.reposMatch.length > 0
                    ? this.props.reposMatch.map((props, i) =>
                        props === undefined ? (
                          <Oops key={i} />
                        ) : (
                          <RepoCard {...props} key={i} />
                        )
                      )
                    : ""}
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
    searching: state.reposReducer.searching,
    reposMatch: state.reposReducer.reposMatch,
    reposTotalResults: state.reposReducer.reposTotalResults,
    pagination: state.reposReducer.pagination,
    error: state.reposReducer.error  
  };
};

export default connect(mapStateToProps)(RepositoriesPage);
//export default connect(state => state)(RepositoriesPage);
