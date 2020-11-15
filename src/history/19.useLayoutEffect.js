import React, { useState, useLayoutEffect, useEffect } from "react";
import "./index.css";

function App(props) {
  const [color, setColor] = useState("red");

  useLayoutEffect(
    () => {
      // alert(color);
      let dom = document.getElementById("dom");
      console.log("useLayoutEffect", dom, dom.scrollHeight);
      console.log("useLayoutEffect", color);
      /*   return () => {
      cleanup;
    }; */
    } /*  [input] */
  );

  useEffect(
    () => {
      // alert(color);
      let dom = document.getElementById("dom");
      console.log("useEffect", dom, dom.scrollHeight);
      console.log("useEffect", color);
      /* return () => {
      cleanup;
    }; */
    } /*  [input] */
  );

  return (
    <>
      <div id="dom" style={{ backgroundColor: color }}>
        颜色
      </div>
      <button
        onClick={() => {
          setColor("red");
        }}
      >
        红
      </button>
      <button
        onClick={() => {
          setColor("yellow");
        }}
      >
        黄
      </button>
      <button
        onClick={() => {
          setColor("blue");
        }}
      >
        蓝
      </button>
    </>
  );
}

export default App;
