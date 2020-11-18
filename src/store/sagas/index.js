import { all, take, call, put } from "redux-saga/effects";
import * as types from "../types/sage-login-types";
import API from "../../api";

function* loginFlow(params) {
  while (true) {
    const { username, password } = yield take(types.LOGIN_REQUEST);
    const token = yield call(login, username, password);
    debugger
    if (token) {
      yield put({ type: types.SET_USERNAME, username });
      API.setItem("token", token);
      yield take(types.LOGINOUT);
      API.clearItem("token", token);
    }
  }
}

function* login(username, password) {
  try {
    const token = yield call(API.login, username, password);
    return token;
  } catch (error) {
    yield put({ type: types.LOGIN_ERROR, error });
  }
}

export default function* rootSaga() {
  yield all([ loginFlow() ]);
}
