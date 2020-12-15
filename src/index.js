import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App(props) {
  const [number, setNumber] = useState(0);

  useEffect(
    () => {
      document.title = "React App " + number;
    } /* , [input] */
  );

  const handleClick = () => {

    setNumber(number => number + 3);
    console.log(number);
  };

  return (
    <div>
      <div>App</div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
      <button onClick={handleClick}>click +</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
