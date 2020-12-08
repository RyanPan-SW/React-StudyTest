// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 100, name: 'zhangsan' };
  }

  static defaultProps = {}; // 初始化默认属性对象

  static getDerivedStateFromProps() {
    console.log("getDerivedStateFromProps");
  }

  getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate')
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    console.log(this)

    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        <div>
          {this.state.name}: {this.state.number}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ClassComponent />, document.getElementById("root"));
