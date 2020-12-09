import React, { Component } from "react";
import ReactDOM from "react-dom";

/**
 * HOC：反向继承
 * 应用场景： 开发很多button组件，都有一个共同的特点，初始值为0，每次点击之后增加1
 * 反向继承两大作用：
 *  1. 渲染劫持、
 *  2. 操作state（有自己的属性、状态）
 *  注意： 继承的state、props也会被覆盖
 */
class Button extends Component {
  componentDidMount() {
    console.log("1. Button componentDidMount");
  }

  render() {
    console.log("1.Button render");
    return <button name={this.props.name}></button>;
  }
}

const Wrapper = OldComponent => {
  return class extends OldComponent {
    state = { number: 0 };
    componentDidMount() {
      console.log("2. wrapper componentDidMount");
      // 如果项调用继承的 componentDidMount,可以手动调用
      super.componentDidMount();
    }

    handleClick = () => {
      this.setState({ number: this.state.number + 1 });
    };

    render() {
      console.log("2. wrapper render");
      const renderElement = super.render();
      const newProps = { ...renderElement.props, onClick: this.handleClick };
      // 把渲染的内容改变了
      const newElement = React.cloneElement(renderElement, newProps, this.state.number);
      return newElement;
    }
  };
};

const NewButton = Wrapper(Button);

ReactDOM.render(<NewButton name={"zhangSan"} />, document.getElementById("root"));
