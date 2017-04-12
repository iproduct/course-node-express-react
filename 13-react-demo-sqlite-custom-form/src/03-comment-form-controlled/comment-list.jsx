import React from 'react';
import Comment from './comment';
import {PropTypes} from 'prop-types';

let CommentList = React.createClass({
  propTypes: {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        author: PropTypes.string,
        text: PropTypes.string
    })),
    onCommentDelete: PropTypes.func
  },
  render: function () {
    let commentNodes = this.props.data.reverse().map((comment) => {
      return (
        <Comment author={comment.author} commentId={comment.id} key={comment.id} onCommentDelete={this.props.onCommentDelete}>
          {comment.text}
        </Comment>
      );
    });
    return (
    <div className="commentList">
      {commentNodes}
    </div>
    );
  }
});

export default CommentList;