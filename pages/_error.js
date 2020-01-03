import { PureComponent } from "react";
import { number } from "prop-types";
import Router from "next/router";

class ErrorPage extends PureComponent {
  static propTypes = {
    statusCode: number
  };

  static defaultProps = {
    statusCode: 200
  };

  render() {
    let Page;
    switch (this.props.statusCode) {
      case 200:
      case 404: {
        Page = () => <RenderComp statusCode={404} />;
        break;
      }
      case 500: {
        Page = () => <RenderComp statusCode={500} />;
        break;
      }
      default:
        break;
    }
    return <Page />;
  }
}

const RenderComp = ({ statusCode }) => (
  <section className="content-container">
    <img
      className="error-image"
      alt="error-img"
      src={`/assets/${statusCode}.jpg`}
    />
    <br />
    <br />
    <div className="buttons is-centered">
      <button
        className="button level-item is-info is-light is-outlined is-medium is-rounded"
        onClick={() => Router.push("/")}
      >
        Ir a página de inicio
      </button>
    </div>
  </section>
);

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode };
};

export default ErrorPage;
