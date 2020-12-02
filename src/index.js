// import React from "react";
// import ReactDOM from "react-dom";

import React from "./react-self/react";
import ReactDOM from "./react-self/react-dom";

/**
 * 组件状态和时间处理
 * 属性和状态都是组件的数据源
 * 属性是父组件传进来的，不可以修改 （props）
 * 状态是自己内部定义的，可以自己修改 （state）
 */
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  componentDidMount() {
    // 1. 要依赖函数中的上一个值来计算得到下一个值，就需要给setState传递一个函数
    // this.setState(prevState => ({number: prevState.number + 1}))
    // 2. setState 有两个参数，后面是一个回调，和上面作用一样
    // this.setState({ number: 2 }, () => {
    //   this.setState({ number: 4 });
    // });
  }

  handleDiv = () => {
    console.log('handleDiv');
  }
  
  handleClick = () => {
    console.log("object");
  };

  render() {
    return (
      <div onClick={this.handleDiv}>
        <span onClick={this.handleClick}>12</span>
        <h2>ggg</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <ClassComponent name={"hello"} />,
  document.getElementById("root")
);
