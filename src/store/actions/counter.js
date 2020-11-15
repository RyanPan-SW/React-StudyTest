import * as types from '../actions-types';

export function add(amount) {
  return { type: types.ADD, amount }
}

export function minus (amount) {
  return { type: types.MINUS }
}
