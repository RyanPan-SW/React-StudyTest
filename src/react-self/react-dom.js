import { createDOM } from "./vdom";

export function render(element, container, componentInstance) {
  let dom = createDOM(element);
  return container.appendChild(dom);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { render };
