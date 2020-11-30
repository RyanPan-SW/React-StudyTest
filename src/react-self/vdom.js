import { REACT_ELEMENT_TYPE } from "./ReactSymbols";

export function ReactElement(type, key, ref, _self, _source, _owner, props) {
  const element = { $$typeof: REACT_ELEMENT_TYPE, type, _owner, props };
  return element;
}


export function createDOM() {
  
}