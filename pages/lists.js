import React, { useState, Fragment } from "react";
import { useStore } from "react-redux";
import Fade from "react-reveal/Fade";

import Layout from "../components/Layout";
import UserCard from "../components/UserCard";
import RepoCard from "../components/RepoCard";

//create custom forceUpdate hook
const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
};

const ListsPage = () => {
  const store = useStore();
  const forceUpdate = useForceUpdate();
  const USERS = "USERS";
  const REPOSITORIES = "REPOSITORIES";
  const { usersList } = store.getState().usersListReducer;
  const { reposList } = store.getState().reposListReducer;
  const [categorieList, setCategorieList] = useState(USERS);

  return (
    <Fragment>
      <Layout>
        <Fade right>
          <section id="user-lists" className="section">
            <div className="tabs is-toggle is-toggle-rounded is-medium is-centered is-fullwidth">
              <ul>
                <li className={categorieList === USERS ? "is-active" : ""}>
                  <a
                    onClick={() => {
                      setCategorieList(USERS);
                    }}
                  >
                    Usuarios
                  </a>
                </li>
                <li
                  className={categorieList === REPOSITORIES ? "is-active" : ""}
                >
                  <a
                    onClick={() => {
                      setCategorieList(REPOSITORIES);
                    }}
                  >
                    Repositorios
                  </a>
                </li>
              </ul>
            </div>
            <section id="show-list">
              {categorieList === USERS
                ? `Tienes ${usersList.length} usuarios guardados en tu lista`
                : ""}
              {categorieList === REPOSITORIES
                ? `Tienes ${reposList.length} repositorios guardados en tu lista`
                : ""}
              <div
                id="results"
                className="container has-margin-top"
                onClick={forceUpdate}
              >
                {categorieList === USERS
                  ? usersList.map(props => (
                      <UserCard {...props} key={props.id} />
                    ))
                  : ""}
                {categorieList === REPOSITORIES
                  ? reposList.map(props => (
                      <RepoCard {...props} key={props.id} />
                    ))
                  : ""}
              </div>
            </section>
          </section>
        </Fade>
      </Layout>
    </Fragment>
  );
};

export default ListsPage;
