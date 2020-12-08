import { addEvent } from "./event";
import { render } from "./react-dom";
import { REACT_ELEMENT_TYPE, REACT_FORWARD_REF_TYPE } from "./ReactSymbols";

/**
 *  ReactElement只是一个用来承载信息的容器，他会告诉后续的操作这个节点的以下信息
 * 1. type类型，用于判断如何创建节点
 * 2. key和ref这些特殊信息
 * 3. props新的属性内容
 * 4. $$typeof用于确定是否属于ReactElement
 */
export function ReactElement(type, key, ref, _self, _source, _owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    _owner,
    props,
  };
  return element;
}

export function createDOM(element) {
  let { type, props, ref } = element; // {"type":"div","props":{"children":"123", "style": { "color": "red" }}}
  let dom = null;
  // 2. 函数组件
  if (typeof element === "string" || typeof element === "number") {
    return (dom = document.createTextNode(element));
  }
  if (typeof type === "function") {
    return type.prototype.isReactComponent ? updateClassComponent(element) : updateFunctionComponent(element);
  } else {
    dom = document.createElement(type); // 创建一个真实的DOM
  }

  if (ref) {
    ref.current = dom;
  }

  updateProps(dom, props);
  if (typeof props.children === "string" || typeof props.children === "number") {
    dom.textContent = props.children;
  } else if (typeof props.children === "object" && props.children.type) {
    render(props.children, dom);
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : "";
  }

  // dom.oldDom = dom; //不管是什么类型的元素，都让它的dom属性指向他创建出来的直实DOM元素
  return dom;
}

/**
 *  把props上的属性复赋值到真实的DOM上，并不处理props.childrens
 * @param {*} dom 真实的DOM元素
 * @param {*} props 元素属性（className、style、...）
 */
export function updateProps(dom, props) {
  for (const key in props) {
    if (key === "children") continue;
    if (key === "style") {
      // { color: 'red' }
      let styles = props[key];
      for (const attr in styles) {
        dom.style[attr] = styles[attr];
      }
    } else if (key.startsWith("on")) {
      addEvent(dom, key.toLocaleLowerCase(), props[key]);
    } else {
      dom[key] = props[key];
    }
  }
}
// {"type":"div","props":{"children":"123"}}

export function reconcileChildren(children, parentDOM) {
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDOM);
  }
}

/**
 * {type: updateFunctionComponent function() , props: {...}}
 * @param {*} element {function component}
 */
export function updateFunctionComponent(element) {
  let { type, props } = element;
  let renderVirtualDOM = type(props);
  let newDOM = createDOM(renderVirtualDOM);
  return newDOM;
}

/**
 * {type: class ClassComponent, props: {...}}
 * @param {*} oldElement {class component}
 */
export function updateClassComponent(oldElement, newElement) {
  let { type, props, ref, state } = oldElement;
  let classInstance = new type(props);
  // oldElement.classInstance = classInstance;
  // 2. 实现生命周期 componentWillMount
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount();
  }
  let nextProps = oldElement.props;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps(nextProps);
  }
  // if (newElement.type.getDerivedStateFromProps) {
  //   let newState = newElement.type.getDerivedStateFromProps(nextProps, classInstance.state);
  //   if (newState) {
  //     classInstance.state = { ...state, ...newState };
  //   }
  // }
  if (ref) {
    ref.current = classInstance;
  }
  let renderVirtualDOM = classInstance.render(); // 虚拟DOM
  // renderVirtualDOM.oldVDom = renderVirtualDOM // 将旧的dom挂在dom属性下面

  // 一、
  // return createDOM(render VirtualDOM)
  // 二、
  let newDOM = createDOM(renderVirtualDOM); // 在实例组件的类上面挂载一个DOM属性，指向真实的DOM节点
  classInstance.dom = newDOM;
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount();
  }
  return newDOM;
}

export function comparsComponent(oldElement, newELement) {
  console.log("oldElement", oldElement, Array.isArray(oldElement));
  console.log("newELement", newELement);

  // 都没有
  if (oldElement == null && newELement === null) {
    return newELement;
  } else if (oldElement && newELement === null) {
    // 删除了
    let currentDOM = oldElement.dom;
    currentDOM.parentDOM.removeChild(currentDOM);
    if (oldElement.classInstance.componentWillUnmount) oldElement.classInstance.componentWillUnmount();
    return null;
  } else if (oldElement === null && newELement) {
    let newDOM = createDOM(newELement);
    newELement.dom = newDOM;
    return newELement;
  } else if (newELement && oldElement && oldElement.type !== newELement.type) {
    let currentDOM = oldElement.dom;
    let newDOM = createDOM(newELement);
    newELement.dom = newDOM;
    currentDOM.parentDOM.replaceChild(newDOM, currentDOM);
    if (oldElement.classInstance.componentWillUnmount) oldElement.classInstance.componentWillUnmount();
    return newELement;
  } else {
    updateElement(oldElement, newELement);
    return newELement;
  }
}

function updateElement(oldDOM, newDOM) {
  let currentDOM = (newDOM.dom = oldDOM.dom);
  newDOM.classInstance = oldDOM.classInstance;
  if (typeof oldDOM.type === "string") {
    updateChildren(currentDOM, oldDOM.props.children, newDOM.props.children);
    updateProps(currentDOM, oldDOM.props, newDOM.props);
  } else if (typeof oldDOM.type === "function") {
    updateClassInstance(oldDOM, newDOM);
  }
}

function updateChildren(params) {
  // ...
}

function updateClassInstance(params) {
  // ...
}
