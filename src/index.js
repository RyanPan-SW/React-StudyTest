// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.classInput = React.createRef(); // {current: null}
  }

  handleClick = () => {
    this.classInput.current.focus();
    console.log(this);
  };

  render() {
    return (
      <div>
        <ForwareChildInput ref={this.classInput} />
        <button onClick={this.handleClick}>click</button>
      </div>
    );
  }
}

const ForwareChildInput = React.forwardRef((props, ref) => {
  return <input ref={ref} />;
});
ReactDOM.render(<ClassComponent />, document.getElementById("root"));
