import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibility-filter';
import selectedTodo from './selected-todo';

const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  selectedTodo
});

export default rootReducer;