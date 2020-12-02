import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

// 1. createElement
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

// 2. function component
// function FunctionCopmonent(props) {
//   return (
//     <div>
//       <span>1</span>
//       <h1>2</h1>
//     </div>
//   )
// }

// 3. class component
class ClassComponent extends React.Component{
  render(){
    return (
      <div>
        <span>12</span>
        <h2>ggg</h2>
      </div>
    )
  }
}

ReactDOM.render(<ClassComponent name={'hello'} />, document.getElementById("root"));
