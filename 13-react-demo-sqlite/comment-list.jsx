import React from 'react';
import Comment from './comment';

let CommentList = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        author: React.PropTypes.string,
        text: React.PropTypes.string
    })),
    onCommentDelete: React.PropTypes.func
  },
  render: function () {
    let commentNodes = this.props.data.map((comment) => {
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