const todoReducer = (state = {}, action) => {
  switch (action.type) {

  case 'ADD_TODO':
    return {
      id: action.id,
      text: action.text,
      status: 'active'
    };

  case 'EDIT_TODO':
    if (state.id !== action.todo.id) {
      return state;
    }
    return Object.assign({}, { ...action.todo });
  
  case 'CHANGE_STATUS':
    if (state.id !== action.id) {
      return state;
    }
    return { ...state, status: action.status }
    // Object.assign({}, state, { status: action.status });

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

  case 'EDIT_TODO':
    return state.map(todo =>
      todoReducer(todo, action)
    );

  case 'CHANGE_STATUS':
    return state.map(todo =>
      todoReducer(todo, action)
    );

    case 'DELETE_TODOS':
    return state.filter(todo =>
      todo.status !== action.status
    );

    case 'DELETE_TODO':
    return state.filter(todo =>
      todo.id !== action.id
    );

  default:
    return state;
  }
};

export default todosReducer;