function render(element, container, componentInstance) {
  if(typeof element === 'string'||  typeof element === 'number') {
    return container.appendChild(document.createTextNode(element))
  }
}