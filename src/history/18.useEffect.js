import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";

function App(props) {
  let [number, setNumber] = useState(0);
  /**
   * useEffect里面的函数会在组件挂在完成之后，和组件更新之后执行。
   * 如果 [] 依赖项没有，函数会在每次渲染都会执行
   * 如果 [] 依赖项位空数组，只会在渲染之后执行一次，之后不会执行了
   * 如果 [] 依赖项有传内容，就会在依赖项更改之后执行
   */
  useEffect(() => {
    let timer = setInterval(() => {
      setNumber((number) => number + 1);
    }, 1000);

    /**
     * 返回一个函数 又成为销毁函数，作用与class组件的 componentWillUnMount一样
     */
    /* return () => {
      clearInterval(timer);
    }; */
  }/* , [] */);

  return (
    <div>
      <p>{number}</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
