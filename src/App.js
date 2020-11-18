import React, { useState } from "react";
import { connect } from "react-redux";
import actions from "./store/actions/login";

function App({ username: propsuUserName, login }) {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const clickLogin = () => {
    login(username, password);
  };
  const loginout = () => {
  };

  return (
    <>
      {propsuUserName ? (
        <form action="">
          <button onClick={loginout}>login out</button>
        </form>
      ) : (
        <form>
          <label htmlFor="用户名">
            <span>username:</span>
            <input type="text" onChange={setUsername} />
          </label>
          <label htmlFor="密码">
            <span>password:</span>
            <input type="text" onChange={setPassword} />
          </label>
          <button onClick={clickLogin}>login</button>
        </form>
      )}
    </>
  );
}

export default connect((state) => state, actions)(App);
