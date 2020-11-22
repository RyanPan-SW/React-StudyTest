import { all, take, call, put, fork, cancel, cancelled } from "redux-saga/effects";
import * as types from "../types/sage-login-types";
import API from "../../api";
let loading = false

function* loginFlow(params) {
  while (true) {
    /* // 1
    const { username, password } = yield take(types.LOGIN_REQUEST);
    // 1. call 会阻塞login进程，有返回值
    const token = yield call(login, username, password);
    if (token) {
      yield put({ type: types.SET_USERNAME, username });
      API.setItem("token", token);
      yield take(types.LOGINOUT);
      API.clearItem("token");
      yield put({ type: types.SET_USERNAME, username: null });
    } */

    // 2
    const { username, password } = yield take(types.LOGIN_REQUEST);
    //2. fork 开启一个新的紫金城执行login， 且不会有返回结果值， 但是会返回任务本身
    const task = yield fork(login, username, password);
    const action = yield take([types.SET_USERNAME, types.LOGINOUT]);
    if (action.type === types.LOGINOUT) {
      yield cancel(task);
    }
    API.clearItem("token");
    yield put({ type: types.SET_USERNAME, username: null });
  }
}

function* login(username, password) {
  try {
    loading = true
    const token = yield call(API.login, username, password);
    yield put({ type: types.SET_USERNAME, username });
    API.setItem("token", token);
    loading = false
    // return token;
  } catch (error) {
    loading = false
    console.log("error", error);
    yield put({ type: types.LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      loading = false
    }
  }
}

export default function* rootSaga() {
  yield all([loginFlow()]);
}
