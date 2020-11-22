import * as types from "../types/sage-login-types";

const loginInitialState = { username: null, error: null };

export const login = (state = loginInitialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return { username: action.username, password: action.password };
    case types.SET_USERNAME:
      return { username: action.username };
    case types.LOGINOUT:
      return { username: null, error: action.error };
    default:
      return state;
  }
};
