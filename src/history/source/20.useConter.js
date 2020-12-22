import React, { useState, /* useLayoutEffect, */ useEffect } from "react";
import "./index.css";

/*
### 9.自定义Hook 
+ 有时候我们想要在组件之间复用一些状态逻辑
+ 自定义Hook 可以让你在不增加组件的情况下达到相同的目的
+ Hook 是一种复用状态的逻辑方式，他不服用 state 本身，事实上Hook的每次调用都有一个完全独立的state
+ 自定义的hook更新是一种约定，而不是一种功能，如果函数的名字一use开头，并且调用了其他的hook，则称为自定义Hook
 */

function App(props) {
  return (
    <>
      <Counter1 />
      <Counter2 />
    </>
  );
}

function Counter1(params) {
  const [number, setNumber] = useConter(0);
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 5)}>+ 5 </button>
    </div>
  );
}

function Counter2(params) {
  const [number, setNumber] = useConter(0);
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 5)}>+ 5 </button>
    </div>
  );
}

// 自定义 Hooks
function useConter(init) {
  const [number, setNumber] = useState(init);

  useEffect(() => {
    setInterval(() => {
      setNumber((number) => number + 1);
    }, 1000);
  }, []);

  return [number, setNumber];
}

export default App;
