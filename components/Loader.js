const Loader = ({ loading }) => {
  return (
    <div
      className={
        loading
          ? "pageloader is-nice-blue is-active"
          : "is-nice-blue pageloader"
      }
    >
      <span className="title">Cargando...</span>
    </div>
  );
};

export default Loader;