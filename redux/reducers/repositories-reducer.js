import {
  GET_REPOS_MATCH,
  GET_REPOS_MATCH_SUCCESS,
  GET_REPOS_MATCH_FAIL
} from "../../constants";


const INITIAL_STATE = {
  repoSearchValue: "",
  searching: false,
  reposMatch: [],
  pagination: {
    perPage: 20,
    currentPage: "",
    totalCount: "",
    lastPage: ""
  }
};

const repositoriesReducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case GET_REPOS_MATCH:
      return INITIAL_STATE;
    case GET_REPOS_MATCH_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case GET_REPOS_MATCH_FAIL:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default repositoriesReducer;
