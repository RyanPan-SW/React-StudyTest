class Component {
  constructor(props) {
    this.props = props;
  }
}

Component.prototype.isReactComponent = {};

class PureComponent extends Component {}
PureComponent.prototype.isReactComponent = true;

export { Component };
