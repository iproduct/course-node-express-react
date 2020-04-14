const todoReducer = (state = {}, action) => {
  switch (action.type) {

  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      status: 'active'
    };

  case 'CHANGE_STATUS':
    if (state.id !== action.id || state.status === action.status) {
      return state;
    }
    return Object.assign({}, state, { status: action.status });

  default:
    return state;
  }
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return [
      ...state,
      todoReducer(undefined, action)
    ];
  case 'CHANGE_STATUS':
    return state.map(todo =>
        todoReducer(todo, action)
      );
  case 'DELETE_TODOS':
    return state.filter(todo =>
        todo.status !== action.status
      );
  default:
    return state;
  }
};

export default todosReducer;