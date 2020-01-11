import React, { Component } from "react";
import { connect } from "react-redux";
import { node, func } from "prop-types";
import Router from "next/router";

import { cleanUsersMatch } from "../store/actions/users-actions";
import { cleanReposMatch } from "../store/actions/repositories-actions";
import Loader from "./Loader";

class Layout extends Component {
  static propTypes = {
    children: node.isRequired,
    dispatch: func.isRequired
  };

  state = {
    loading: false
  };

  componentDidMount() {
    Router.onRouteChangeStart = () => {
      const { dispatch } = this.props;
      dispatch(cleanUsersMatch());
      dispatch(cleanReposMatch());
      this.setState({ loading: true });
    };
    Router.onRouteChangeComplete = () => {
      this.setState({ loading: false });
    };
    Router.onRouteChangeError = () => {
      this.setState({ loading: false });
    };
  }

  render() {
    //console.log("layoutProps: ", this.props);
    const { loading } = this.state;
    const { children } = this.props;
    return (
      <main id="main" className="has-padding-top section view">
        <Loader loading={loading === undefined ? false : loading} />
        {children}
        <style jsx global>
          {`
            body {
              font-family: "Noto Sans", sans-serif;
              font-size: 1.1rem;
            }
            .view {
              min-height: 100vh;
            }
            .hide {
              display: none;
            }
            .content-container {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .has-padding-top {
              padding-top: 7.2rem;
            }
            .has-margin-top {
              margin-top: 2.5rem;
            }
            .has-lg-margin-top {
              margin-top: 4.5rem;
            }
            .has-margin-bottom {
              margin-bottom: 2.5rem;
              margin-top: -4rem;
            }
            .is-vertical-align {
              vertical-align: middle;
            }
            .buttons {
              margin-top: 2rem;
            }
            .button {
              border-width: 0.12rem;
            }
            .footer {
              padding: 1.95rem 1rem 2.65em;
            }
            .image img {
              margin-top: 0.55rem;
              margin-left: 0.9rem;
            }
            img.is-rounded {
              margin: 0;
            }
            .is-nice-blue {
              color: #5b7bb2;
              font-weight: 600;
            }
            a.is-nice-blue {
              font-size: 1.3rem;
              font-weight: 400;
            }
            a.navbar-item.is-active,
            .navbar-dropdown a.navbar-item.is-active,
            .navbar-dropdown a.navbar-item:hover {
              background-color: #d7eaf9 !important;
              color: #5b7bb2;
            }
            .is-bgnice-blue {
              background-color: #b3d4fc;
            }
            .is-info.input {
              border-color: #5b7bb2;
              border-width: 0.1rem;
            }
            .control.has-icons-left .icon.is-left {
              left: 3px;
              height: 1.6rem;
              margin-top: 0.47rem;
            }
            .card {
              border-radius: 10px;
              margin-bottom: 1rem;
            }
            figure.media-left {
              margin: 1rem;
            }
            p.title.is-not-spaced {
              margin-bottom: 0.25rem;
            }
            .tabs.is-toggle li.is-active a {
              background: #5b7bb2;
              border-color: #5b7bb2;
            }
            .icon.hvr-icon-pulse-shrink {
              margin-top: 1.2rem;
              min-width: 17.5rem;
            }
            .hvr-icon-pulse-shrink .hvr-icon {
              width: 1.1rem;
            }
            @media (max-width: 1023px) {
              .section {
                padding-left: 0.4rem;
                padding-right: 0.4rem;
              }
              a.navbar-item,
              a.navbar-link {
                border-bottom: 1px dashed #5b7bb2;
                padding: 1.2rem;
                margin-left: 1rem;
                margin-right: 1rem;
                font-size: 0.9rem;
                color: #777;
              }
            }
          `}
        </style>
      </main>
    );
  }
}

export default connect()(Layout);