import React from "react";
import Remarkable from 'remarkable';
let md = new Remarkable();

let Comment = React.createClass({
  propTypes: {
    commentId: React.PropTypes.number.isRequired,
    author: React.PropTypes.string,
    children: React.PropTypes.any,
    onCommentDelete: React.PropTypes.func
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
