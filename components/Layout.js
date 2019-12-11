import Nav from "./Nav";

const Layout = props => (
  <main id="main" className="has-padding-top section">
    <Nav />
    {props.children}
  </main>
);

export default Layout;
