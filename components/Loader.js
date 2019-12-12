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

export default Loader;
