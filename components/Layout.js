import Nav from "./Nav";
import Loader from "./Loader";

const Layout = props => {
  const { children, loading } = props;

  return (
    <main id="main" className="has-padding-top section view">
      <Nav />
      <Loader loading={loading === undefined ? false : loading} />
      {children}
    </main>
  );
};

export default Layout;
