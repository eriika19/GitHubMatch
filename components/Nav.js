import { Component } from "react";
import Link from "next/link";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle;
  }

  state = {
    navMenuOpen: ""
  };

  componentDidMount() {
    this.setState({
      navMenuOpen: false
    });
  }

  toggle = () => {
    this.setState({
      navMenuOpen: !this.state.navMenuOpen
    });
  };

  render() {
    const data = [
      { section: "Inicio", route: "/" },
      { section: "Usuarios", route: "/users" },
      { section: "Repositorios", route: "/repositories" }
    ];

    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <figure className="image is-128x128 nav-logo">
              <img src="/assets/logo.png" />
            </figure>
            <span
              className={
                this.state.navMenuOpen
                  ? "navbar-burger is-active"
                  : "navbar-burger"
              }
              data-target="navbarMenuHeroB"
              onClick={this.toggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div
            className={
              this.state.navMenuOpen ? "navbar-menu is-active" : "navbar-menu"
            }
            id="navbarMenuHeroB"
          >
            <div
              className={
                this.state.navMenuOpen ? "navbar-end is-active" : "navbar-end"
              }
            >
              {data.map((props, i) => (
                <NavbarItem {...props} key={i} />
              ))}
            </div>
          </div>
        </div>
        <style jsx>
          {`

            }
          `}
        </style>
      </nav>
    );
  }
}

const NavbarItem = ({ route, section, i }) => (
  <Link href={route} key={i}>
    <a className="navbar-item">{section}</a>
  </Link>
);

export default Nav;
