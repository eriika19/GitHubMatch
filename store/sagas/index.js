import { all, call, put, takeLatest } from "redux-saga/effects";
import GitHubMatch from "../../utils/api-calls";

import {
  getUsersMatchSuccess,
  getUsersMatchFail
} from "../actions/users-actions";
/* import {
  getReposMatchSuccess,
  getReposMatchFail,
} from "../actions/repositories-actions"; */

import {
  GET_USERS_MATCH
  // GET_REPOS_MATCH
} from "../../constants/ActionTypes";

import mockData from "../../data/mock-data";

/* export function* usersMatchArr(action) {
  //const { usersSearchValue, page, usersPerPage } = action.payload;
  const { byUser, getUser } = GitHubMatch;
  try {
/*     const arrPromises = mockData.items.map(item => call(getUser, item.login));
    const usersMatchArr = yield all(arrPromises); */
/*     const { data } = yield;
    call(byUser, action.payload);
    const arrPromises = data.items.map(item => call(getUser, item.login));
    const usersMatchArr = yield all(arrPromises); *//*
    yield put(getUsersMatchSuccess(mockData.items));
  } catch (error) {
    console.log(error);
    yield put(getUsersMatchFail(error.message));
  }
} */

function* usersMatchArr() {
  yield delay(1000);
  yield put(getUsersMatchSuccess(mockData.items));
}

function* rootSagas() {
  yield all([takeLatest(GET_USERS_MATCH, usersMatchArr)]);
};

/* function* rootSagas() {
  yield takeEvery(GET_USERS_MATCH, usersMatchArr);
} */

export default rootSagas;
