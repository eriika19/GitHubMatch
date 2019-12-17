import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => (
  <footer className="footer">
    <div className="content has-text-centered">
      <p>
        <strong>GitHub Match</strong> created with &#10084; by
        <a href="https://itzelenciso.com"> Itzel Enciso</a> .
      </p>
      <p>
        The website is deployed with Now&#9650; and the source code is in a
        <a href="https://github.com/eriika19/GitHubMatch"> GitHub</a> project .
        ¡Enjoy!
        <span className="icon hvr-icon-spin">
          <i className="">
            <FontAwesomeIcon
              className="fas fa-lg hvr-icon"
              icon={["fab", "github-alt"]}
            />
          </i>
        </span>
      </p>
    </div>
  </footer>
);

export default Footer;
