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
              {NAV_ITEMS.map((props, i) => (
                <NavbarItem {...props} key={i} activeRoute= {this.props.activeRoute} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

  const NAV_ITEMS = [
    { page: "Inicio", route: "/" },
    { page: "Usuarios", route: "/users" },
    { page: "Repositorios", route: "/repositories" }
  ];

const NavbarItem = ({ route, page, activeRoute }) => (
  <Link href={route}>
    <a className={route === activeRoute ? "navbar-item is-active" : "navbar-item"}>{page}</a>
  </Link>
);

export default Nav;