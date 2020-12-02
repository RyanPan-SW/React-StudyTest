class Component {
  constructor(props) {
    this.props = props;
  }

  // function componentDidMount() {
  //   console.log('componentDidMount');
  // }
}

// 这里是用来区分函数组件和类组件的，(因为类组件编译过后也是函数)
Component.prototype.isReactComponent = {};

class PureComponent extends Component {}

PureComponent.prototype.isReactComponent = true;

export { Component };
