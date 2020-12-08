import { comparsComponent, createDOM } from "./vdom";

// 批量更新更新
export let updateQueue = {
  isBatchingUpdate: false, // 属否是批量更新模式
  updaters: [], // 更新器的数组

  // 1. 添加状态
  add(updater) {
    this.updaters.push(updater); // 传递更新器
  },

  // 2. 批量更新
  batchUpdate() {
    let { updaters } = this;
    this.isBatchingUpdate = true;
    // 更新每个更新期，更新组件，清空数组，还原批量更新 isBatchingUpdate
    updaters.forEach(updater => updater.updateComponent());
    this.isBatchingUpdate = false; // 设置为非批量更新模式
    updaters.length = 0;
  },
};

class Updater {
  constructor(componentInstance) {
    this.classInstance = componentInstance; // 每个Updater和每一个组件实例是一对一的关系
    this.paddingState = []; // 批量更新，用来存放所有的状态
  }

  // 1. 把分状态或者更新函数放在数组中缓存起来
  addState(partialState) {
    this.paddingState.push(partialState);
    this.emitUpdate();
    // 判断
    // 当前是否处于批量更新模式(异步)，则先添加更新队列去等待更新
    // 当前是否处于非批量更新模式(同步)，直接更新组件
    // updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
  }

  emitUpdate(nextProps) {
    this.nextProps = nextProps;

    if (this.classInstance.componentWillReceiveProps) {
      this.classInstance.componentWillReceiveProps(nextProps);
    }
    if (this.nextProps || !updateQueue.isBatchingUpdate) {
      this.updateComponent();
    } else {
      updateQueue.add(this);
    }
  }

  // 2. 更新组件
  updateComponent() {
    let { classInstance, paddingState, nextProps } = this; // updater {里的类组件实力, 数组中的状态}
    if (nextProps || paddingState.length > 0) {
      // 1. 获取state，更新组件
      // classInstance.state = this.getState();
      // classInstance.forceUpdate();
      // 2.
      let nextState = this.getState();
      shouldUpdate(classInstance, nextProps, nextState);
    }
  }

  // 3.
  getState() {
    let { classInstance, paddingState } = this;
    let { state } = classInstance; // 获取到老组件的当前状态
    if (paddingState.length > 0) {
      paddingState.forEach(nextState => {
        if (typeof nextState === "function") {
          state = nextState(state);
          // state = { ...state, ...nextState.call(classInstance, state) };
        } else {
          state = { ...state, ...nextState };
        }
      });
    }
    paddingState.length = 0;
    return state;
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  // 不管是否更新了组件，都会更新内部的属性和状态
  classInstance.props = nextProps || classInstance.props;
  classInstance.state = nextState || classInstance.state;
  // 如果有shouldComponentUpdate，并且返回值为true，就更新
  if (classInstance.shouldComponentUpdate && !classInstance.shouldComponentUpdate(nextProps, nextState)) {
    return;
  }
  classInstance.forceUpdate();
}

// 1.实例类
class Component {
  // 1.
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$updater = new Updater(this);
  }

  // 2.
  setState(partialState, callback) {
    this.$updater.addState(partialState);
  }

  // 3.
  forceUpdate() {
    const { props, state, oldVDom, dom: oldDOM, getSnapshotBeforeUpdate } = this;
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    let extraArgs = getSnapshotBeforeUpdate && getSnapshotBeforeUpdate();
    let newVDOM = this.render(); // 新的虚拟DOM
    // /* let newDOM = */ comparsComponent(oldVDom, newVDOM);


    let newDOM = createDOM(newVDOM); // 创建新的真实DOM元素
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    this.dom = newDOM;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(props, state, extraArgs);
    }
  }
}
// 这里是用来区分函数组件和类组件的，(因为类组件编译过后也是函数)
Component.prototype.isReactComponent = {};

// class PureComponent extends Component {}

// PureComponent.prototype.isReactComponent = true;
export { Component };
