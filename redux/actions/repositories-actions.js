import {
  GET_REPOS_MATCH,
  GET_REPOS_MATCH_SUCCESS,
  GET_REPOS_MATCH_FAIL
} from "../../constants";

export const getReposMatch = async (payload = {}) => ({
  type: GET_REPOS_MATCH,
  payload
});

export const getReposMatchSuccess = async payload => ({
  type: GET_REPOS_MATCH_SUCCESS,
  payload
});

export const getReposMatchFail = async () => ({ type: GET_REPOS_MATCH_FAIL });
