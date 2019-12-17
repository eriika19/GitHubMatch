import { PureComponent } from "react";
import { connect } from "react-redux";

class Pagination extends PureComponent {
  /*   static async getInitialProps({ store }) {
    store.dispatch({ type: "SOME_ASYNC_ACTION_REQUEST" });
    return { staticData: "Hello world!" };
  } */

  setCurrentPagination = (usersMatch, page) => {
    this.setState({
      usersMatch: usersMatch,
      currentPage: page
    });
  };

  ItemsPagination = (page, lastPage) => {
    const pageNumber = parseInt(page, 10);
    const pages = [pageNumber - 1, pageNumber, pageNumber + 1];
    const arrPages = pages.filter(pag => 1 <= pag && pag <= lastPage);
    return arrPages.map((pag, i) => ItemPagination(pag, i));
  };

  ItemPagination = (page, i) => {
    const { currentPage, handlePagination } = this.props;
    const currentPageNumber = parseInt(currentPage, 10);

    return (
      <li key={i}>
        <a
          className={
            currentPageNumber == page
              ? "pagination-link is-current"
              : "pagination-link"
          }
          aria-lable={
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

  render() {
    const { currentPage, lastPage, totalCount, handleFunc } = this.props;

    const arrPagination = lastPage > 6 ? [] : createArrPagination(lastPage);

    return currentPage ? (
      lastPage > 5 ? (
        <nav
          className="pagination is-rounded is-centered has-margin-bottom"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {ItemPagination(1)}
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            {ItemsPagination(currentPage)}
            <li>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
            {ItemPagination(lastPage)}
          </ul>
        </nav>
      ) : (
        <nav
          className="pagination is-rounded is-centered has-margin-bottom"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {arrPagination.map((page, i) => ItemPagination(page, i))}
          </ul>
        </nav>
      )
    ) : (
      ``
    );
  }
}

const createArrPagination = lastPage => {
  const arrPagination = [];
  for (let i = 1; i <= lastPage; i++) {
    arrPagination.push(i);
  }
  return arrPagination;
};

export default connect(state => ({
  topicInfo: state.topic,
  channelList: state.channel.list,
  userInfo: state.user.userInfo
}))(Pagination);
