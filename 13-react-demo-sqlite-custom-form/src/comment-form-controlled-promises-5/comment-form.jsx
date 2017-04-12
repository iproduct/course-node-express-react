import React from "react";

class CommentForm extends React.Component {
  author = '';
  text = '';

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCommentSubmit({ author: this.author.value, text: this.text.value });
    this.author.value = this.text.value = '';
  };

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" id="author" name="author" defaultValue=""
          ref={ref => this.author = ref} />
        <input type="text" placeholder="Say something..." id="text" name="text" defaultValue=""
          ref={ref => this.text = ref} />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

CommentForm.propTypes = {
  onCommentSubmit: React.PropTypes.func,
};

export default CommentForm;
