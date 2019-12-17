import {
  GET_USERS_MATCH,
  GET_USERS_MATCH_SUCCESS,
  GET_USERS_MATCH_FAIL, 
  GET_USERS_MATCH_SEARCHING, 
} from "../../constants";

const INITIAL_STATE = {
  userSearchValue: "",
  searching: false,
  usersMatch: [],
  pagination: {
    perPage: 20,
    currentPage: "",
    totalCount: "",
    lastPage: "",
  }
};

const usersReducer = (state = INITIAL_STATE, { type, payload = {} }) => {

  switch (type) {
    case GET_USERS_MATCH:
      return { ...state, searchValue:  };
    case GET_USERS_MATCH_SUCCESS:
      return {
        ...state,
        ...payload
      };
    case GET_USERS_MATCH_FAIL:
      return INITIAL_STATE;
    case GET_USERS_MATCH_SEARCHING:
  return { ...state, cargando: true };
    default:
      return state;
  }
};

export default usersReducer;
