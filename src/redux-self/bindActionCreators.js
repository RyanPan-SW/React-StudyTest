function bindActionCreator(actionCreator, dispatch) {
  return function (amount) {
    dispatch(actionCreator.apply(this, amount))
  }
}
export function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch)
  }
  else {
    const boundActionCreators = {}
    for (const key in actionCreators) {
      if (typeof actionCreators[key] === 'function') {
        return boundActionCreators[key] = bindActionCreator(actionCreators[key], dispatch)
      }
    }
  }
}