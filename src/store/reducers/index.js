import counter from './counter'
import { combineReducers } from 'redux'

let reducers = {
  counter
  /* namespace: counter */ // namespace,命名空间
  /* ...otherReducer */
}

let reducer = combineReducers(reducers)
export default reducer

