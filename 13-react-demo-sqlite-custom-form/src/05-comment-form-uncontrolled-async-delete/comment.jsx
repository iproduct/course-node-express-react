import React from "react";
import {PropTypes} from 'prop-types';
import Remarkable from 'remarkable';

let md = new Remarkable();

class Comment extends React.Component {
  static propTypes = {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string,
    children: PropTypes.any,
    onCommentDelete: PropTypes.func
  };

  rawMarkup = () => {
    let rawMarkup = '';
    if (this.props.children) {
      rawMarkup = md.render(this.props.children.toString());
    }
    return { __html: rawMarkup };
  };

  handleDelete = () => {
    let commentId = this.props.commentId;
    if (!commentId) {
      return;
    }
    // TODO: send comment delete request to the server
    this.props.onCommentDelete(commentId);
  };

  render() {
    return (
      <div className="comment">
        <h3 className="commentAuthor">
          {this.props.author}
        </h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
}

export default Comment;
