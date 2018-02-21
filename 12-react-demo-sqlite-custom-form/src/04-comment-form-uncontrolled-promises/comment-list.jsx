import React from 'react';
import Comment from './comment';
import {PropTypes} from 'prop-types';

class CommentList extends React.Component {
  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        author: PropTypes.string,
        text: PropTypes.string
    })),
    onCommentDelete: PropTypes.func
  };

  render() {
    let commentNodes = this.props.comments.reverse().map((comment) => {
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
}

export default CommentList;