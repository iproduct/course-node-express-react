const selectedTodo = (state=null, action) => {
  switch (action.type) {
  case 'SELECT_TODO':
    return action.todo;
  default:
    return state;
  }
};

export default selectedTodo;