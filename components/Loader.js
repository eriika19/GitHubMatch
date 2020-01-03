import { bool } from "prop-types";

const Loader = ({ loading }) => {
  return (
    <div
      className={
        loading
          ? "pageloader is-bgnice-blue is-active"
          : "is-bgnice-blue pageloader"
      }
    >
      <span className="title">Cargando...</span>
    </div>
  );
};

Loader.propTypes = {
  loading: bool.isRequired
};

export default Loader;
