import React from "react";

export const CommentForm = ({ onCommentSubmit }) => {

  let author, text;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit({author, text});
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your name" name="author" defaultValue="" ref="ref => author = ref" />
      <input type="text" placeholder="Say something..." name="text" defaultValue="" ref="ref => text = ref" />
      <input type="submit" value="Post" />
    </form>
  );
}

CommentForm.propTypes = {
  onCommentSubmit: React.PropTypes.func,
};
export default CommentForm;
