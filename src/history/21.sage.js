import React, { useState } from "react";
import { connect } from "react-redux";
import actions from "./store/actions/login";

function App({ username: propsuUserName, login }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const clickLogin = () => {
    login(username, password);
  };
  const loginout = () => {};

  return (
    <>
      {propsuUserName ? (
        <form action="">
          <button onClick={loginout}> 当前用户：{username} login out</button>
        </form>
      ) : (
        <form>
          <label htmlFor="用户名">
            <span>username:</span>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label htmlFor="密码">
            <span>password:</span>
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button onClick={clickLogin}>login</button>
        </form>
      )}
    </>
  );
}

export default connect((state) => state, actions)(App);
