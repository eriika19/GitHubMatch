import { PureComponent } from "react";
import Link from "next/link";

class Nav extends PureComponent {
  state = {
    navMenuOpen: false
  };

  toggle = () => {
    this.setState({
      navMenuOpen: !this.state.navMenuOpen
    });
  };

  render() {
    //console.log('NavProps :', this.props);
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
              <span className="is-nice-blue"></span>
              <span className="is-nice-blue"></span>
              <span className="is-nice-blue"></span>
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
              <NavbarItem {...NAV_ITEMS[0]} {...this.props} />
              <NavbarItem {...NAV_ITEMS[1]} {...this.props} />

              <div className="navbar-item has-dropdown is-hoverable">
                <hr className="navbar-divider" />
                <a className="navbar-link is-nice-blue">Buscar</a>
                <div className="navbar-dropdown is-boxed is-right">
                  <NavbarItem {...NAV_ITEMS[2]} {...this.props} />
                  <NavbarItem {...NAV_ITEMS[3]} {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .nav-logo img {
              width: 6.5rem;
              height: auto;
              cursor: pointer;
            }
            @media (max-width: 1023px) {
              .navbar-menu {
                height: 100vh;
              }
            }
          `}
        </style>
      </nav>
    );
  }
}

const NavbarItem = ({ route, page, activeRoute }) => (
  <Link href={route}>
    <a
      className={
        route === activeRoute
          ? "navbar-item is-nice-blue is-active"
          : "navbar-item is-nice-blue"
      }
    >
      {page}
    </a>
  </Link>
);

const NAV_ITEMS = [
  { page: "Inicio", route: "/" },
  { page: "Listas", route: "/lists" },
  { page: "Usuarios GitHub", route: "/users" },
  { page: "Repositorios GitHub", route: "/repositories" }
];

export default Nav;