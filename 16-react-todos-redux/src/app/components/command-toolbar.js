import React from 'react';
const CommandToolbar = ({ deleteAllCompleted, deleteAllCanceled }) => (
  <div className="commands">
    <button className="btn btn-warning" onClick={deleteAllCompleted}>Delete All Completed</button>
    <button className="btn btn-danger" onClick={deleteAllCanceled}>Delete All Canceled</button>
  </div>);

export default CommandToolbar;
