
export default function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers)
  return function (state = {}, action) { // state 来源于createStore里面的dispatch方法里面的reducer(state, action)
    const nextState = {}
    for (const key of reducerKeys) {
      let reducer = reducerKeys[key]
      let previousStateKey = state[key]
      let nextStateForKey = reducer(previousStateKey, action) // 调动reducers，传入老状态计算新的状态
      nextState = nextStateForKey
    }
    return nextState
  }
}