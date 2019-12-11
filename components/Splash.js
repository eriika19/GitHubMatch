const Splash = ({ load }) => (
    <div id="splash" className={load ? " splash view hide" : " splash view"}>
      <figure className="level-item image splash-logo">
        <img src="/assets/logo-lunna-trans.png" alt="logo-splash" />
      </figure>
        </div>
);

export default Splash;