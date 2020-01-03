import {
  GET_USERS_MATCH,
  GET_USERS_MATCH_SUCCESS,
  GET_USERS_MATCH_FAIL,
  CLEAN_USERS_MATCH
} from "../../constants/ActionTypes";

const INITIAL_STATE = {
  searching: false,
  usersMatch: "",
  error: ""
};

const usersReducer = (state = INITIAL_STATE, { type, payload = {} }) => {
  switch (type) {
    case CLEAN_USERS_MATCH:
      return INITIAL_STATE;

    case GET_USERS_MATCH:
      return { ...state, searching: true };

    case GET_USERS_MATCH_FAIL:
      return { ...state, error: payload, searching: false };

    case GET_USERS_MATCH_SUCCESS:
      return {
        ...state,
        usersMatch: payload,
        searching: false,
        error: ""
      };

    default:
      return state;
  }
};

export default usersReducer;
