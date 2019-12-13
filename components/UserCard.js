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
            <div className="field has-addons level">
              <p className="control level-item">
                <a href={html_url} target="_blank">
                  <small className="is-nice-blue">Abrir GitHub</small>
                </a>
              </p>
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

export default UserCard;
