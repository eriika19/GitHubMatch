import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {byUser, byRepo} from "../../utils/api-calls";
import {
  getUsersMatchSuccess,
  getUsersMatchFail
} from "../actions/users-actions";
import {
  getReposMatchSuccess,
  getReposMatchFail
} from "../actions/repositories-actions";

import {
  GET_USERS_MATCH,
  GET_REPOS_MATCH,
} from "../../constants";

export function* getUsersMatch(action) {
  const { userSearchValue, page, per_page } = action.payload;
  console.log("userSearchValue", userSearchValue);
  console.log("page", page);
  try {
    const { data } = yield call(byUser(userSearchValue, page, per_page));
    yield put(getUsersMatchSuccess(data));
  } catch (error) {
    console.log(error);
    yield put(getUsersMatchFail());
  }
}

export function* getReposMatch(action) {
  const { repoSearchValue, page, per_page } = action.payload;
  console.log("repoSearchValue", repoSearchValue);
  console.log("page", page);
  try {
    const { data } = yield call(byRepo(repoSearchValue, page, per_page));
    yield put(getReposMatchSuccess(data));
  } catch (error) { 
    console.log(error);
    yield put(getReposMatchFail());
  }
}



/*  export function* topicList(action) {
  try {
    const { type = "", categoryName = "", page = 1 } = action.payload;
    const requestUrl = type === "favorite" ? getFavoriteTopic : getTopicList;
    // const _categoryName = categoryName === '全部' ? '' : categoryName;
    const params = {
      categoryName,
      page
    };
    if (type === "我的发布" || type === "我的收藏") {
      const { userName } = yield select(selectUserInfo);
      params.userName = userName;
    }
    const { data } = yield call(requestUrl, params);
    yield put(
      fetchTopicListSuccess({
        ...data,
        type,
        categoryName
      })
    );
  } catch (error) {
    console.log(error);
    yield put(fetchTopicListFail());
  }
}  */

export default function* rootSagas() {
  yield all([
    takeLatest(GET_USERS_MATCH, getUsersMatch),
    takeLatest(GET_REPOS_MATCH, getReposMatch),
  ]);
}
