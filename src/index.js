// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 100 };
    console.log("object");
  }

  static defaultProps = {}; // 初始化默认属性对象

  componentWillMount() {
    console.log("componentWillMount 组件将要挂载");
  }

  componentDidMount() {
    console.log("componentDidMount 组件将要挂载");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("5 shouldComponentUpdate");
    return this.state.number % 2 === 0 ? true : false;
  }

  componentWillUpdate() {
    console.log("6 componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("7 componentDidUpdate");
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    console.log("render");
    return (
      <div>
        <button onClick={this.handleClick}>click</button>
        <ChildCom number={this.state.number} />
      </div>
    );
  }
}

class ChildCom extends React.Component {
  componentWillReceiveProps(newProps) {
    debugger
    console.log("componentWillReceiveProps");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return <div>{this.props.number}</div>;
  }
}

ReactDOM.render(<ClassComponent />, document.getElementById("root"));
