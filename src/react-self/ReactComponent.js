import { createDOM } from "./vdom";

// 批量更新更新
export let updateQueue = {
  isBatchingUpdate: false,  // 属否是批量更新模式
  updaters: [], // 更新器的数组

  // 1. 添加状态
  add(updater) {
    this.updaters.push(updater);  // 传递更新器
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
    // 判断
    // 当前是否处于批量更新模式(异步)，则先添加更新队列去等待更新
    // 当前是否处于非批量更新模式(同步)，直接更新组件
    updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent();
  }

  // 2. 更新组件
  updateComponent() {
    let { classInstance, paddingState } = this // updater {里的类组件实力, 数组中的状态}
    if ( paddingState.length > 0 ) {
      classInstance.state = this.getState()
      classInstance.forceUpdate()
    }
  }

  // 3.
  getState() {
    let { classInstance, paddingState } = this;
    let { state } = classInstance; // 获取到老组件的当前状态
    if (paddingState.length > 0) {
      paddingState.forEach(nextState => {
        if (typeof nextState === "function") {
          debugger;
          state = nextState(state);
          // state = { ...state, ...nextState.call(classInstance, state) };
        } else {
          debugger;
          state = { ...state, ...nextState };
        }
      });
    }
    paddingState.length = 0;
    return state;
  }
}

class Component {
  // 1.
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$updater = new Updater(this);
  }

  // 2.
  setState(partialState) {
    this.$updater.addState(partialState);
  }

  // 3.
  forceUpdate() {
    let newVDOM = this.render(); // 新的虚拟DOM
    let newDOM = createDOM(newVDOM); // 创建新的真实DOM元素
    let oldDOM = this.dom; // 来源于虚拟dom的updateClassComponent,组件的操作
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    this.dom = newDOM;
  }
}
// 这里是用来区分函数组件和类组件的，(因为类组件编译过后也是函数)
Component.prototype.isReactComponent = {};

// class PureComponent extends Component {}

// PureComponent.prototype.isReactComponent = true;
export { Component };
