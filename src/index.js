
import React/* , { useReducer } */ from "react";
import ReactDOM from "react-dom";

/**
 *
 */
let lastState;
function useReducer(reducer, initialState) {
  lastState = lastState || initialState
  function dispatch(action) {
    lastState = reducer(lastState,action)
    render()
  }
  return [ lastState, dispatch ]
}

// 就是一个普通的纯函数，传入老的状态，返回新的状态
function reducer(oldState, action) {
  switch (action.type) {
    case "ADD":
      return { number: oldState.number + 1 };
    case "MINUS":
      return { number: oldState.number - 1 };

    default:
      return oldState;
  }
}


function App(props) {
  let initialState = { number: 0 };
  const [state, dispatch] = useReducer(reducer, initialState /* , init */);

  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: "ADD" })}>+</button>
      <button onClick={() => dispatch({ type: "MINUS" })}>-</button>
    </div>
  );
}

function render(){

  ReactDOM.render(<App />, document.getElementById("root"));
}
render()
