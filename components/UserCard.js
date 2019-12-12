const UserCard = props => {
  const { login, avatar_url, html_url, name, location, bio } = props;

  return (
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
              <small>@{login}</small>
            </span>
          </p>
          <p>
            {bio} <br />
            <br />
            <small>{location} </small>
          </p>
          <br />
          <a className="level-item-left" href={html_url} target="_blank">
            Abrir perfil
          </a>
        </div>
      </div>
      <style jsx>
        {`
          figure {
            margin: 1rem;
          }
          img.is-rounded {
            margin: 0;
          }
        `}
      </style>
    </article>
  );
};

export default UserCard;
