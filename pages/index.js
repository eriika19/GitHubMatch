import { Component } from "react";
import Fade from "react-reveal/Fade";

import Layout from "../components/Layout";


class Home extends Component {
  state = {
    load: ""
  };

  componentDidMount() {
    window.addEventListener("load", this.handleLoad);
    window.addEventListener("scroll", this.changeState, true);
    this.setState({
      load: false
    });
  }

  handleLoad = () => {
    setTimeout(this.changeState, 800);
  };

  changeState = () => {
    this.setState({
      load: true
    });
  };

  render() {
    const { load } = this.state;
    return (
      <div>
            <Head>
              <title>Luuna | GitHub Match</title>
            </Head>
        <Splash load={load} />
    <Layout>
        <Fade right>
          <section id="home" className={load ? "section" : "section hide"}>
            <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <h3 className="title is-3">¡Hola!</h3>
                  <br />
                  <h4 className="subtitle is-4">
                    Bienvenid@ a tu proceso de crecimiento
                  </h4>
                </div>
              </div>
            </section>
            <Login />
          </section>
          </Fade>
    </Layout>          
      </div>
    );
  }
};

const Splash = ({ load }) => (
  <Fade big cascade>
    <div
      id="splash"
      className={load ? " splash view nice-hide" : " splash view"}
    >
      <figure className="level-item image logo">
        <img src="/assets/logo.png" alt="logo-splash" />
      </figure>
    </div>
  </Fade>
);

export default Home;
