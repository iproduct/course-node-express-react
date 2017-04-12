import React from "react";
import Remarkable from 'remarkable';
import {PropTypes} from 'prop-types';

let md = new Remarkable();

let Comment = React.createClass({
  propTypes: {
    commentId: PropTypes.number.isRequired,
    author: PropTypes.string,
    children: PropTypes.any,
    onCommentDelete: PropTypes.func
  },
  rawMarkup: function () {
    let rawMarkup = '';
    if (this.props.children) {
      rawMarkup = md.render(this.props.children.toString());
    }
    return { __html: rawMarkup };
  },
  handleDelete: function () {
    let commentId = this.props.commentId;
    if (!commentId) {
      return;
    }
    // TODO: send comment delete request to the server
    this.props.onCommentDelete(commentId);
  },
  render: function () {
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
});

export default Comment;
