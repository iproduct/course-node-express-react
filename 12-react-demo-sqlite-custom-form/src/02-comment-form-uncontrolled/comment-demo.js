import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from "./comment-box";

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={50000} />,
  document.getElementById('app')
);