import React, { useState } from "react";

function Countent() {
  const [num, setNum] = useState(0);
  const [num1, setNum1] = useState(110);

  return (
    <div>
      <div>Counter:</div>
      <div>num: {num}</div>
      <div>num: {num1}</div>
      <button
        onClick={() => {
          setNum(num + 1);
          setNum1(num1 + 1);
        }}
      >
        + 1
      </button>
    </div>
  );
}

export default Countent;
