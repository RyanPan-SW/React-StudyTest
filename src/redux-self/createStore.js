function createStore(reducer, initialState) {
  let state = initialState
  let listerners = []
  function getState() {
    return state
  }
  function dispatch(action) {
    state = reducer(state, action)
    listerners.forEach(l => l())
    return action
  }
  function subscribe(listerner) {
    listerners.push(listerner)
    // 返回一個取消訂閱
    return function () {
      let index = listerners.indexOf(listerner)
      listerners.splice(index, 1)
    }
  }
  return { getState, dispatch, subscribe }
}

function reducer(state, action) {
  return action.color
}

let store = createStore(reducer, 'green')
store.subscribe(() => {
  console.log('更新l');
})
console.log(store.getState());

store.dispatch({ type: 'changeColor', color: 'red' })
console.log(store.getState());