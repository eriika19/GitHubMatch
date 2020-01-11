import React, { useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { updateReposList } from "../store/actions/repositories-list-actions";

const getDaysAgo = date => {
  const updateAt = new Date(date);
  const currentDate = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  const timeLapse = currentDate.getTime() - updateAt.getTime(); // tiempo en milisegundos
  const daysAgo = Math.round(timeLapse / oneDay);
  return daysAgo;
};

const getIndex = id => {
  const store = useStore();
  const { reposList } = store.getState().reposListReducer;
  const index = reposList.findIndex(repo => repo.id === id);
  return index;
};

const RepoCard = props => {
  const {
    description,
    id,
    forks_count,
    homepage,
    html_url,
    name,
    owner,
    updated_at
  } = props;
  const item = props;

  const index = getIndex(id);
  const [addedItem, setAddedItem] = useState(index < 0 ? false : true);
  const daysAgo = getDaysAgo(updated_at);
  const dispatch = useDispatch();
  return (
    <div className="card" id={id}>
      <article className="media">
        <figure className="media-left">
          <p className="image is-96x96 is-img-card">
            <img className="is-rounded" src={owner.avatar_url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="title is-5 is-not-spaced">
              {name}
              <br />
              <span>
                <a href={owner.html_url} target="_blank">
                  <small>@{owner.login}</small>
                </a>
              </span>
            </p>
            <p>
              <small> {`Forks: ${forks_count}`} </small>
            </p>
            <p>{description ? description : <br />}</p>
            <small>
              <time>{`Actualizado hace ${daysAgo} día(s)`}</time>
            </small>
            <div className="level has-text-centered">
              <p className="level-item is-vertical-align">
                <a href={html_url} target="_blank">
                  <span className="icon">
                    <span className="icon hvr-icon-spin">
                      <i>
                        <FontAwesomeIcon
                          className="fas fa-lg hvr-icon"
                          icon={["fab", "github-alt"]}
                        />
                      </i>
                    </span>
                  </span>
                  <span className="is-vertical-align">
                    <small className="is-nice-blue">
                      {` Abrir Repositorio GitHub`}
                    </small>
                  </span>
                </a>
              </p>
              {homepage ? (
                <p className="level-item">
                  <a href={homepage} target="_blank">
                    <span className="is-vertical-align">
                      <small className="is-nice-blue">Abrir Homepage</small>
                    </span>
                  </a>
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="media-right icon">
          <span
            className="icon hvr-icon-pulse-shrink"
            onClick={() => {
              dispatch(updateReposList({ item, index }));
              setAddedItem(!addedItem);
            }}
          >
            {addedItem ? `Eliminar de lista ` : `Agregar a lista `}
            <i>
              <FontAwesomeIcon
                className="fas fa-lg hvr-icon"
                icon={addedItem ? "minus-circle" : "plus-circle"}
              />
            </i>
          </span>
        </div>
      </article>
    </div>
  );
};

export default RepoCard;
