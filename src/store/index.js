import { createStore, /* combineReducers */ } from 'redux';
// import counter from './reducers/counter';
import combineReducers from './reducers';

// let reducers = { counter}

let store = createStore(combineReducers)
export default store