import { ReactCurrentOwner, RESERVED_PROPS } from "./ReactCurrentOwner";
import { Component } from "./ReactComponent";
import { ReactElement } from "./vdom";
import { REACT_FORWARD_REF_TYPE } from "./ReactSymbols";

function hasValidRef(config) {
  return config.ref !== undefined;
}
function hasValidKey(config) {
  return config.key !== undefined;
}
/**
 *
 * @param {*} type 元素类型
 * @param {*} config 配置对象属性
 * @param {*} children 子元素
 */
export function createElement(type, config, children) {
  let propName;
  let key = null; //在兄弟节点中唯一标识自己的唯一性的，在同一个的不同兄弟之间key要求不同
  let ref = null; //ref=React.createRef() "username" this.refs.username {input=>this.username = input} 从而得到真实的DOM元素
  let self = null; //用来获取真实的this指针
  let source = null; //用来定位创建此虚拟DOM元素在源码的位置 哪个文件 哪一行 哪一列
  const props = { ...config };

  if (config !== null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }

    if (hasValidKey(config)) {
      key = config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    for (propName in config) {
      if (!RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    /* 1. 只有一个children，直接渲染 */
    props.children = children;
  } else if (childrenLength > 1) {
    /* 2.由多个元素，赋值给props.children,继续渲染 */
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    //只有当属性对象没有此属性对应的值的时候，默认属性才会生效，否则直接忽略
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

function createRef() {
  return { current: null };
}

function forwardRef(render) {
  // return class extends Component {
  //   render() {
  //     console.log(this.props);
  //     // return 1;
  //     return FunctionComponent(this.props,this.ref);
  //   }
  // };

  return { $$typeof: REACT_FORWARD_REF_TYPE, render };
}

function createContext() {
  let value;
  function Provider(props) {
    value = props.value;
    return props.children;
  }
  function Consumer(props) {
    return props.children(value);
  }
  return { Provider, Consumer };
}

const React = { createElement, Component, createRef, forwardRef, createContext };

export default React;
