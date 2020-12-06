// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
    this.classInput = React.createRef(); // {current: null}
  }

  handleClick = () => {
    this.classInput.current.getFocus();
  };

  render() {
    return (
      <div>
        <ChildInput ref={this.classInput} />
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}
class ChildInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.childInput = React.createRef();
  }

  getFocus = () => {
    this.childInput.current.focus();
  };

  render() {
    return <input type="text" ref={this.childInput} />;
  }
}

ReactDOM.render(<ClassComponent name={"hello"} />, document.getElementById("root"));
