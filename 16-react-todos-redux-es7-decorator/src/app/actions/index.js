let nextTodoId = 0;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

export const editTodo = (todo) => ({
  type: 'EDIT_TODO',
  todo
});

export const selectTodo = (todo) => ({
  type: 'SELECT_TODO',
  todo
});

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const changeStatus = (id, status) => ({
  type: 'CHANGE_STATUS',
  id,
  status
});

export const deleteTodos = (withStatus) => ({
  type: 'DELETE_TODOS',
  status: withStatus
});

