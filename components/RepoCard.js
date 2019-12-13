const getDaysAgo = date => {
  const updateAtDate = new Date(date);
  const currentDate = new Date();

  const oneDay = 1000 * 60 * 60 * 24;

  const timeLapse = currentDate.getTime() - updateAtDate.getTime(); // tiempo en milisegundos
  const daysPassed = Math.round(timeLapse / oneDay);
  return daysPassed;
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

  const date = new Date(updated_at);
  const updateDate = date.toString();
  const daysPassed = getDaysAgo(updated_at);

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
              <time
                dateTime={updateDate}
              >{`Actualizado hace: ${daysPassed} día(s)`}</time>
            </small>
            <br />
            <small>
              {`Forks: `}
              {forks_count}
            </small>
            <div className="field has-addons level ">
              <p className="control level-item">
                <a href={html_url} target="_blank">
                  <small className="is-nice-blue">Abrir Repo</small>
                </a>
              </p>
              {homepage ? (
                <p className="control level-item">
                  <a className="level-item" href={homepage} target="_blank">
                    <small className="is-nice-blue">Abrir Homepage</small>
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
