import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserCard = props => {
  const { login, avatar_url, html_url, name, location, bio } = props;

  return (
    <div className="card">
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
              <p className="level-item hvr-icon-spin is-vertical-align">
                <a href={html_url} target="_blank">
                  <span className="icon">
                    <i className="hvr-icon">
                      <FontAwesomeIcon
                        className="fas fa-lg"
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
      </article>
    </div>
  );
};

export default UserCard;
