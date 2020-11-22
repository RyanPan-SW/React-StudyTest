import { createDOM } from "./vdom";

export function render(element, container, componentInstance) {
  console.log("🚀 ~ file: react-dom.js dom", element);
  let dom = createDOM(element);
  console.log("object", dom);
  // return container.appendChild(dom);
}

// export { render}
const ReactDOM = { render };
export default ReactDOM;
