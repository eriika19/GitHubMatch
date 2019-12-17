import {
  GET_USERS_MATCH,
  GET_USERS_MATCH_SUCCESS,
  GET_USERS_MATCH_FAIL, 
  GET_USERS_MATCH_SEARCHING
} from "../../constants";

export const getUsersMatch = async (payload = {}) => ({
  type: GET_USERS_MATCH,
  payload
});

export const getUsersMatchSuccess = async payload => ({
  type: GET_USERS_MATCH_SUCCESS,
  payload
});

export const getUsersMatchFail = async () => ({ type: GET_USERS_MATCH_FAIL });

export const getUsersMatchSearching = async () => ({ type: GET_USERS_MATCH_SEARCHING });
