import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Fade from "react-reveal/Fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import GitHubMatch from "../utils/api-calls";
import {
  cleanUsersMatch,
  getUsersMatch,
} from "../store/actions/users-actions";
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

  /*   toggleSearching = () => {
    this.setState({
      searching: !this.state.searching
    });
  }; */

  /*   cleanPagination = () => {
    this.setState({
      usersMatch: "",
      totalCount: "",
      currentPage: "",
      lastPage: ""
    });
  }; */

  /*   setInitialPagination = () => {
    console.log("entro a set inital");
    console.log(this.props.usersPerPage, this.props.usersTotalResults);
    //const { usersPerPage, usersTotalResults } = this.props;
    const currentPage = 1;
    const lastPage = Math.ceil(
      this.props.usersTotalResults / this.props.usersPerPage
    );
    this.setState({
      pagination: { currentPage, lastPage }
    });
  }; */

  /*   setCurrentPagination = (usersMatch, page) => {
    this.setState({
      usersMatch: usersMatch,
      currentPage: page
    });
  }; */

  setCurrentPagination = page => {
    this.setState({
      pagination: { ...this.state.pagination, currentPage: page }
    });
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

  /*   handleData = async data => {
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
  }; */

  //initSearch = async dispatch => await dispatch(getUsersMatch());

  handleSubmit = e => {
    e.preventDefault();
    const { usersSearchValue } = this.state;

    /* Verifiy valid searchValue */
    if (usersSearchValue.length > 0) {
      const { dispatch, usersPerPage } = this.props;
      dispatch(getUsersMatch({ usersSearchValue, currentPage: 1, usersPerPage }));

      //get results from usersSearchValue
      //  dispatch(getUsersMatch({ usersSearchValue, page, usersPerPage })); //get results from usersSearchValue

      /*       const data = await this.getData(page, perPage); //get searchValue results
      const usersMatch = await this.handleData(data); //handle results to get usersMatch array*/
    }
  };

  handlePagination = async e => {
    const { usersPerPage } = this.props;
    const page = e.target.name;

    const data = await this.getData(page, UsersPerPage); //get searchValue results
    const usersMatch = await this.handleData(data); //handle results to get usersMatch array

    this.setCurrentPagination(page);
  };

  render() {
    console.log("this.props: ", this.props);

    const { usersSearchValue } = this.state;

    //const { dispatch } = this.props;

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
                  ? ``
                  : `Se encontró ${this.props.usersTotalResults} coincidencia(s)`}
                <div id="results" className="container has-margin-top">
                  {this.props.usersMatch.length > 0
                    ? this.props.usersMatch.map((props, i) =>
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
          lastPage={this.props.pagination.lastPage}
          currentPage={this.props.pagination.currentPage}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    searching: state.userReducer.searching,
    usersSearchValue: state.userReducer.usersSearchValue,
    usersMatchArr: state.userReducer.usersMatchArr
  };
};

//export default connect(mapStateToProps)(UsersPage);
export default connect(state => state)(UsersPage);
