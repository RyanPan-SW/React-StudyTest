import React, { useState, useRef, forwardRef, useImperativeHandle } from "react";
import "./index.css";

// 父组件
function App(props) {
  let [number, setNumber] = useState(0);
  let parentRef = useRef(null);

  const getFocus = () => {
    parentRef.current.focus();
  };

  return (
    <div>
      <ForwardChild ref={parentRef} value={number} />
      <button onClick={getFocus}>获取焦点</button>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  );
}

function Child(props, ref) {
  let inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
    };
  });
  return <input type="text" value={props.value} ref={ref} />;
}

let ForwardChild = forwardRef(Child);


/* function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
} */

export default App;
