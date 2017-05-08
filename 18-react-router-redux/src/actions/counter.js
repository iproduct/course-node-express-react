import { INCREMENT, DECREMENT } from '../constants'

export function increment(x) {
  return {
    type: INCREMENT,
    amount: x
  }
}

export function incrementAsync(x) {
  return dispatch =>
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment(x));
    }, 2000);
}

export function incrementIfOdd(x) {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter.number % 2 === 0) {
      return;
    }

    dispatch(increment(x));
  };
}

export function decrement(x) {
  return {
    type: DECREMENT,
    amount: x
  }
}