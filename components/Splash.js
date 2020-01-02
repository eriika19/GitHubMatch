const Splash = ({ load }) => (
  <div id="splash" className={load ? " splash view hide" : " splash view"}>
    <figure className="level-item image splash-logo">
      <img src="/assets/logo-lunna-trans.png" alt="logo-splash" />
    </figure>
    <style jsx>
      {`
        .hide {
          display: none;
        }
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

export default Splash;