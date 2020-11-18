import * as types from "../types/sage-login-types";

const actions =  {
  login(username, password) {
    return { type: types.LOGIN_REQUEST, username, password };
  },
  loginout(){
    return { type: types.LOGINOUT }
  }
};


export default actions