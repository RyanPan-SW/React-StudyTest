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

export function createDOM() {}
