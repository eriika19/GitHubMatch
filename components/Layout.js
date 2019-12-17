import Nav from "./Nav";
import Loader from "./Loader";
import Header from "./Header";
import Footer from "./Footer";

const Layout = props => {
  const { children, loading } = props;

  return (
    <main id="main" className="has-padding-top section view">
      <Header />
      <Nav />
      {children}
      <Footer />
      <Loader loading={loading === undefined ? false : loading} />
    </main>
  );
};

export default Layout;
