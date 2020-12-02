class Component {
  constructor(props) {
    this.props = props;
  }

  setState() {
    let update = new Updater();
  }
}

// 这里是用来区分函数组件和类组件的，(因为类组件编译过后也是函数)
Component.prototype.isReactComponent = {};

class PureComponent extends Component {}

PureComponent.prototype.isReactComponent = true;

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
    this.isBatchingUpdate = true;
    // 更新每个更新期，更新组件，清空数组，还原批量更新 isBatchingUpdate
    this.updaters.forEach((updater) => updater.updateComponent());
    this.isBatchingUpdate = false;  // 设置为非批量更新模式
    this.updaters.length = 0;
  },
};

class Updater {
  constructor(instance) {
    this.classInstance = instance;
    this.paddingState = []; // 用来存放所有的状态
  }

  // 1. 把分状态或者更新函数放在数组中缓存起来
  addState(partialState) {
    this.paddingState.push(partialState);
    updateQueue.isBatchingUpdate ? updateQueue.add(this): this.updateComponent();
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

}

export { Component };
