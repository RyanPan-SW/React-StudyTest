/**
 *
 * @param {dom} dom 要绑定的DOM元素
 * @param {*} eventType 绑定的时间类型
 * @param {*} listener 时间函数回调 handleClick
 */

export function addEvent(dom, eventType, listener) {
  // 1. 现在dom创建一个属性 store,用来存放listener 事件
  let store = dom.store || (dom.store = {});
  
  store[eventType] = listener;
  // 2. 事件委托给document进行监听
  document.addEventListener(eventType.slice(2), dispatchEvent, false);
}

/**
 * 作用： 
 * 1. 为了合成事件
 * 2. 为了方便回收event对象
 * 3. 为了屏蔽浏览器兼容差异
 * @param {*} event 
 */

// 合成事件（集成）syntheicEvent
let syntheicEvent = {}
export function dispatchEvent(event) {  // 这里的event是原生的事件对象
  // 1. event => DOM元素
  
  let { target, type } = event;
  // 2. onClick
  let eventType = "on" + type;
  let { store } = target;
  let listener = store && store[eventType];
  if (listener) {
    syntheicEvent.nativeEvent = event
    for (const key in syntheicEvent) {
      syntheicEvent[key] = event[key]
    }
    listener.call(target, syntheicEvent);
    // 使用之后回收
    for (const key in syntheicEvent) {
      syntheicEvent[key] = null
    }

  }
}
