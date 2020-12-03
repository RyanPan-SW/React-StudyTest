import { createDOM } from "./vdom";

export function render(element, container, componentInstance) {
  let dom = createDOM(element);
  return container.appendChild(dom);
}

// export { render}
const ReactDOM = { render };
export default ReactDOM;
