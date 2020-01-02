import { PureComponent } from "react";
import Link from "next/link";

class Nav extends PureComponent {
  state = {
    navMenuOpen: false
  };

  NAV_ITEM = [
    { page: "Inicio", route: "/" },
    { page: "Usuarios", route: "/users" },
    { page: "Repositorios", route: "/repositories" }
  ];

  toggle = () => {
    this.setState({
      navMenuOpen: !this.state.navMenuOpen
    });
  };

  render() {
    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <Link href="/">
              <figure className="image is-128x128 nav-logo">
                <img src="/assets/logo.png" alt="logo" />
              </figure>
            </Link>
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
              {this.NAV_ITEM.map((props, i) => (
                <NavbarItem {...props} key={i} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const NavbarItem = ({ route, page, i }) => (
  <Link href={route} key={i}>
    <a className="navbar-item">{page}</a>
  </Link>
);

export default Nav;