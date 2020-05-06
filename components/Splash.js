import { bool } from "prop-types";

const Splash = ({ load }) => (
  <div id="splash" className={load ? " splash view hide" : " splash view"}>
    <figure className="level-item image splash-logo">
      <img src="/assets/github-match.png" alt="logo-splash" />
    </figure>
    <style jsx>
      {`
        .splash {
          padding-top: 15vh;
        }
        .splash-logo img {
          width: 15rem;
          height: auto;
        }
      `}
    </style>
  </div>
);

Splash.propTypes = {
  load: bool.isRequired
};

export default Splash;