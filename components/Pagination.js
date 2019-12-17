const Pagination = ({ handlePagination, lastPage, currentPage}) => {
  const arrPagination = lastPage > 6 ? [] : createArrPagination(lastPage);

  return currentPage ? (
    lastPage > 5 ? (
      <nav
        className="pagination is-rounded is-centered has-margin-bottom"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list">
          {ItemPagination(handlePagination, currentPage, 1)}
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          {ItemsPagination(handlePagination, lastPage, currentPage)}
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          {ItemPagination(handlePagination, currentPage, lastPage)}
        </ul>
      </nav>
    ) : (
      <nav
        className="pagination is-rounded is-centered has-margin-bottom"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list">
          {arrPagination.map((page, i) =>
            ItemPagination(handlePagination, currentPage, page, i)
          )}
        </ul>
      </nav>
    )
  ) : (
    ``
  );
};

const createArrPagination = lastPage => {
  const arrPagination = [];
  for (let i = 1; i <= lastPage; i++) {
    arrPagination.push(i);
  }
  return arrPagination;
};

const ItemsPagination = (handlePagination, lastPage, currentPage) => {
  const pageNumber = parseInt(currentPage, 10);
  const pages = [pageNumber - 1, pageNumber, pageNumber + 1];
  const arrPages = pages.filter(pag => 1 <= pag && pag <= lastPage);
  return arrPages.map((pag, i) =>
    ItemPagination(handlePagination, currentPage, pag, i)
  );
};

const ItemPagination = (handlePagination, currentPage, page, i) => {
  const currentPageNumber = parseInt(currentPage, 10);

  return (
    <li key={i}>
      <a
        className={
          currentPageNumber == page
            ? "pagination-link is-current"
            : "pagination-link"
        }
        aria-label={
          currentPageNumber == page ? "Page " + page : "Goto page " + page
        }
        aria-current={currentPageNumber == page ? "page" : ""}
        name={page}
        onClick={e => handlePagination(e)}
      >
        {page}
      </a>
    </li>
  );
};

export default Pagination;
