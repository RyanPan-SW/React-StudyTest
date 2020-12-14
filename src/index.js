import React, { Component /* , useState */ } from "react";
import ReactDOM from "react-dom";

function Counter(props) {
  const [state, setState] = useState(0);
  const [state2, setState2] = useState(() => {
    return 60 * 60 * 80;
  });

  const add = () => {
    setTimeout(() => setState(state => state + 1), 3000);
  };
  return (
    <div>
      <p>{state}</p>
      <button
        onClick={() => {
          setState(state + 1);
        }}
      >
        +
      </button>
      <button onClick={add}>add</button>
    </div>
  );
}

let lastState;
function useState(initailState) {
  let state = lastState || (typeof initailState === "function" ? initailState() : initailState);
  function setState(newState) {
    if (typeof newState === "function") {
      lastState = newState(lastState);
      if (Object.is(lastState, newState)) {
        return;
      }
    } else {
      if (Object.is(lastState, newState)) {
        return;
      }
      lastState = newState;
    }
    render();
  }
  return [state, setState];
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById("root"));
}
render();
