import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

// let dom = (
//   <div>
//     <span>321</span>
//     <p>111</p>
//     <h2>44</h2>
//   </div>
// );

// let dom = React.createElement(
//   "h1",
//   { className: "aaa", style: { color: "red" } },
//   {type: 'div', props: { children: 123 }}
// );

function FunctionCopmonent(props) {
  return (
    <div>
      <span>1</span>
      <h1>2</h1>
    </div>
  )
}

ReactDOM.render(<FunctionCopmonent name={'hello'} />, document.getElementById("root"));
