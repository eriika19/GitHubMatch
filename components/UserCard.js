import React, { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateUsersList } from "../store/actions/users-list-actions";

const getIndex = id => {
  const store = useStore();
  const { usersList } = store.getState().usersListReducer;
  const index = usersList.findIndex(user => user.id === id);
  return index;
};

const UserCard = props => {
  const { avatar_url, bio, html_url, id, login, location, name } = props;
  const item = props;

  const index = getIndex(id);
  const [addedItem, setAddedItem] = useState(index < 0 ? false : true);

  const dispatch = useDispatch();
  return (
    <div className="card" id={id}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-96x96 is-img-card">
            <img className="is-rounded" src={avatar_url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="title is-5">
              {name}
              <span>
                <a href={html_url} target="_blank">
                  <small>@{login}</small>
                </a>
              </span>
            </p>
            <p>
              {bio ? bio : <br />}
              <br />
              <small>{location} </small>
            </p>
            <div className="level has-text-centered">
              <p className="level-item is-vertical-align">
                <a href={html_url} target="_blank">
                  <span className="icon hvr-icon-spin">
                    <i>
                      <FontAwesomeIcon
                        className="fas fa-lg hvr-icon"
                        icon={["fab", "github-alt"]}
                      />
                    </i>
                  </span>
                  <span>
                    <small className="is-nice-blue"> Abrir GitHub</small>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="media-right icon">
          <span
            className="icon hvr-icon-pulse-shrink"
            onClick={() => {
              dispatch(updateUsersList({ item, index }));
              setAddedItem(!addedItem);
            }}
          >
            {addedItem ? `Eliminar de lista ` : `Agregar a lista `}
            <i>
              <FontAwesomeIcon
                className="fas fa-lg hvr-icon"
                icon={addedItem ? "user-minus" : "user-plus"}
              />
            </i>
          </span>
        </div>
      </article>
    </div>
  );
};

export default UserCard;
