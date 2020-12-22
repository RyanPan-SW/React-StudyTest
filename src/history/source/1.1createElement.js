// import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import React from "./react-self/react";

/* 1. 联系React createElement */
// const dom = React.createElement(
//   "h2",
//   { className: "abc", style: { fontSize: 21 } },
//   '123',
//   React.createElement("div", {}, 312),
//   React.createElement("p", { style: {color: 'red', fontSize: 12} }, 666),
// );

class App extends React.Component {
  render() {
    return (
      <div>
        <p style={{color: 'red'}}>1</p>
        <div>321</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
