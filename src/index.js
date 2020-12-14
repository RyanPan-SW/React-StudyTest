import React /* , { useState , useCallback, useMemo } */ from "react";
import ReactDOM from "react-dom";

/**
 * useCallback 对传递过来的回调函数优化处理，返回也是一个函数
 * useMemo 返回值可以是任何的函数，对象等都可以
 * 也可以使用useMemo实现useCallback
 * cons handleClick = useMemo(() => { return () => {setNumber(number + 1)} }, [number])
 */

function App(props) {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("zhangsan");

  // const handleClick = () => {
  //   setNumber(number + 2);
  // };
  const handleClick = useCallback(() => {
    setNumber(number + 1);
  }, [number]);

  // let data = { number };
  const data = useMemo(() => ({ number }), [number]);
  // const data = useMemo(() => {return { number }}, [number]);

  return (
    <div>
      <input type="text" value={name} onChange={event => setName(event.target.value)} />
      <MemoChild handleClick={handleClick} data={data} />
    </div>
  );
}

let MemoChild = React.memo(Child);

function Child(props) {
  console.log("Child render");
  return <button onClick={props.handleClick}>{props.data.number}</button>;
}

ReactDOM.render(<App />, document.getElementById("root"));

// function render() {
//   ReactDOM.render(<App />, document.getElementById("root"));
// }
// render();
/**
 *
 */

// let hookState = []; // 存放当前组件的所有state
// let hookIndex = 0; // 代表单亲hooks的索引

let lastState; /* ( === hookState[hookIndex]) */
function useState(initailState) {
  let state = lastState || (typeof initailState === "function" ? initailState() : initailState);

  function setState(newState) {
    if (typeof newState === "function") {
      newState = newState(lastState);
    }
    if (!Object.is(lastState, newState)) {
      lastState = newState;
      // render();
    }
  }
  return [state, setState];
}

let lastCallbak, lastCallbackDeps;
function useCallback(callback, deps) {
  if (lastCallbak) {
    let same = deps.every((item, index) => item === lastCallbackDeps[index]);
    if (!same) {
      lastCallbak = callback;
      lastCallbackDeps = deps;
    }
  } else {
    lastCallbak = callback;
    lastCallbackDeps = deps;
  }
  return lastCallbak;
}

let lastMemo, lastMemoDeps;
function useMemo(factroy, deps) {
  if (lastMemo) {
    let same = deps.every((item, index) => item === lastMemoDeps[index]);
    if (!same) {
      lastCallbak = factroy();
      lastCallbackDeps = deps;
    }
  } else {
    lastCallbak = factroy();
    lastCallbackDeps = deps;
  }
  return lastCallbak;
}
