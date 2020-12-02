import { createElement } from "./react";
import { render } from "./react-dom";
import { REACT_ELEMENT_TYPE } from "./ReactSymbols";

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
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(element);
  }
  let { type, props } = element; // {"type":"div","props":{"children":"123", "style": { "color": "red" }}}
  let dom
  // 2. 函数组件
  if (typeof type === 'function') {
    return type.prototype.isReactComponent ? updateClassComponent(element) : updateFunctionComponent(element)
  } else {
     dom = document.createElement(type); // 创建一个真实的DOM
  }

  updateProps(dom, props);
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children
  } else if (typeof props.children === 'object' && props.children.type){
    render(props.children, dom)
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom);
  } else {
    dom.textContent = props.children ? props.children.toString() : ''
  }
  return dom
}

/**
 *  把props上的属性复赋值到真实的DOM上，并不处理props.childrens
 * @param {*} dom 真实的DOM元素
 * @param {*} props 元素属性（className、style、...）
 */
export function updateProps(dom, props) {
  for (const key in props) {
    if (key === "children") continue;
    if (key === "style") {    // { color: 'red' }
      let styles = props[key];
      for (const attr in styles) {
        dom.style[attr] = styles[attr];
      }
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
export function updateFunctionComponent (element) {
  console.log(element);
  let {type, props} = element
  let renderVirtualDOM = type(props)
  console.log("🚀 ~ file: vdom.js ~ line 82 ~ updateFunctionComponent ~ renderVirtualDOM", renderVirtualDOM)
  return createDOM(renderVirtualDOM)
}

/**
 * {type: class ClassComponent, props: {...}}
 * @param {*} element {class component}
 */
export function updateClassComponent (element) {
  console.log(element);
  let {type, props} = element
  let classInstance = new type(props)
  let renderVirtualDOM = classInstance.render()
  console.log("🚀 ~ file: vdom.js ~ line 82 ~ updateFunctionComponent ~ renderVirtualDOM", renderVirtualDOM)
  return createDOM(renderVirtualDOM)
}