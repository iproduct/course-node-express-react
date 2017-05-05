import React from 'react';
const CommandToolbar = ({ deleteAllCompleted, selectedTodo, deleteAllCanceled }) => (
  <div className="commands">
    <button className="btn btn-warning" onClick={deleteAllCompleted} disabled={selectedTodo}>Delete All Completed</button>
    <button className="btn btn-danger" onClick={deleteAllCanceled} disabled={selectedTodo}>Delete All Canceled</button>
  </div>);

export default CommandToolbar;
