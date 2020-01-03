import { all, call, put, takeLatest } from "redux-saga/effects";
import GitHubMatch from "../../utils/api-calls";

import {
  getUsersMatchSuccess,
  getUsersMatchFail,
  setUsersPagination
} from "../actions/users-actions";
import {
  getReposMatchSuccess,
  getReposMatchFail,
  setReposPagination
} from "../actions/repositories-actions";

import { GET_USERS_MATCH, GET_REPOS_MATCH } from "../../constants/ActionTypes";

function* usersMatchArr(action) {
  const { currentPage, usersPerPage } = action.payload;
  try {
    const response = yield call(GitHubMatch.byUser, action.payload);
    const {
      data: { total_count, items }
    } = response;
    const lastPage = Math.ceil(total_count / usersPerPage);
    const pagination = { lastPage, currentPage };

    const arrPromises = items.map(item =>
      call(GitHubMatch.getUser, item.login)
    );
    const usersMatchArr = yield all(arrPromises);

    yield put(getUsersMatchSuccess(usersMatchArr));
    yield put(setUsersPagination({ total_count, pagination }));
  } catch (error) {
    console.log(error);
    yield put(getUsersMatchFail(error.message));
  }
}


function* reposMatchArr(action) {
  const { currentPage, reposPerPage } = action.payload;
  try {
    const response = yield call(GitHubMatch.byRepo, action.payload);
    const {
      data: { total_count, items: reposMatchArr }
    } = response;
    const lastPage = Math.ceil(total_count / reposPerPage);
    const pagination = { lastPage, currentPage };

    yield put(getReposMatchSuccess(reposMatchArr));
    yield put(setReposPagination({ total_count, pagination }));
  } catch (error) {
    console.log(error);
    yield put(getReposMatchFail(error.message));
  }
}

function* rootSagas() {
  yield all([
    takeLatest(GET_USERS_MATCH, usersMatchArr),
    takeLatest(GET_REPOS_MATCH, reposMatchArr)
  ]);
}

export default rootSagas;
