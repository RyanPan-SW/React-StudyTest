import { createDOM } from "./vdom";

function render(element, container, componentInstance) {
  /* if (typeof element === "string" || typeof element === "number") {
    return container.appendChild(document.createTextNode(element));
  } */
  let dom = createDOM(element)
  return container.appendChild(document.createTextNode(dom))
}

export { render };
