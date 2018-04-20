import React from "react";
import {PropTypes} from 'prop-types';

class CommentForm extends React.Component {
  author = React.createRef();
  text = React.createRef();

  focus = () => {
    this.text.current.focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onCommentSubmit({ author: this.author.current.value, text: this.text.current.value });
    this.author.current.value = this.text.current.value = '';
  };

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" id="author" name="author" defaultValue=""
          ref={this.author} />
        <input type="text" placeholder="Say something..." id="text" name="text" defaultValue=""
          ref={this.text} />
        <input type="submit" value="Post" />
        <input type="button" value="Focus the text input" onClick={this.focus} />
      </form>
    );
  }
}

CommentForm.propTypes = {
  onCommentSubmit: PropTypes.func,
};

export default CommentForm;
