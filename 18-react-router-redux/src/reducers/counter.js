import { INCREMENT, DECREMENT } from '../constants'

const initialState = {
  number: 1
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + action.amount };
    case DECREMENT:
      return { number: state.number - action.amount };
    default:
      return state;
  }
}