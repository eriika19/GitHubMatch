const errorPage = ({ statusCode }) => (
  <section className="section has-text-centered is-centered is-vcentered">
    <p>
      <span>
        {statusCode ? (
          <span>
            ¡Oh, no! Hay un erro en el servidor: <b> {statusCode}.</b>
          </span>
        ) : (
          "¡Oh, no! Se ha producido un error al cargar la página."
        )}
        Por favor intenta de nuevo.
      </span>
    </p>
  </section>
);

errorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default errorPage;
