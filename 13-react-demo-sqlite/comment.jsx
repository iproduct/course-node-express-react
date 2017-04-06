import React from "react";
var Remarkable = require('remarkable');
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
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  }
});

export default Comment;
