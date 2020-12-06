// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
    this.input = React.createRef(); // {current: null}
  }

  handleClick = () => {
    console.log(this);
  };

  render() {
    return (
      <div>
        <button ref={this.input} onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

ReactDOM.render(<ClassComponent name={"hello"} />, document.getElementById("root"));
