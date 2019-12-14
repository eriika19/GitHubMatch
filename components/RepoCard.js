import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "hover.css/css/hover-min.css";

const getDaysAgo = date => {
  const updateAt = new Date(date);
  const currentDate = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  const timeLapse = currentDate.getTime() - updateAt.getTime(); // tiempo en milisegundos
  const daysAgo = Math.round(timeLapse / oneDay);
  return daysAgo;
};

const RepoCard = props => {
  const {
    description,
    forks_count,
    homepage,
    html_url,
    name,
    owner,
    updated_at
  } = props;

  const daysAgo = getDaysAgo(updated_at);

  return (
    <div className="card">
      <article className="media">
        <figure className="media-left">
          <p className="image is-96x96 is-img-card">
            <img className="is-rounded" src={owner.avatar_url} />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p className="title is-5">
              {name}
              <br />
              <span>
                <a href={owner.html_url} target="_blank">
                  <small>@{owner.login}</small>
                </a>
              </span>
            </p>
            <p>{description ? description : <br />}</p>
            <small>
              <time>{`Actualizado hace: ${daysAgo} día(s)`}</time>
            </small>
            <br />
            <small>
              {`Forks: `}
              {forks_count}
            </small>
            <div className="level ">
              <p className="level-item hvr-icon-grow">
                <a href={html_url} target="_blank">
                  <span className="icon is-vertical-align">
                    <i className="hvr-icon">
                      <FontAwesomeIcon
                        className="fas fa-lg"
                        icon={["fab", "github-alt"]}
                      />
                    </i>
                  </span>
                  <span>
                    <small className="is-nice-blue">
                      {" "}
                      Abrir Repositorio GitHub
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
                ``
              )}
            </div>
          </div>
        </div>
        <style jsx>
          {`
            figure {
              margin: 1rem;
            }
          `}
        </style>
      </article>
    </div>
  );
};

export default RepoCard;
