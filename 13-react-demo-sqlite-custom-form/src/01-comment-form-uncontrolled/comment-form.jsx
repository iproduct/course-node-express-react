import React from "react";
import {PropTypes} from 'prop-types';

export const CommentForm = ({ onCommentSubmit }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = e.target.elements;
    console.log("Inputs: ", inputs);
    // let comment = {};
    // for (let i = 0; i < inputs.length; i++) {
    //   comment[inputs[i].name] = inputs[i].value;
    //   inputs[i].value = '';
    // }
    // console.log(comment);
    onCommentSubmit({author: inputs['author'].value, text: inputs['text'].value});
    inputs['author'].value = '';
    inputs['text'].value = '';
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your name" name="author" defaultValue="" />
      <input type="text" placeholder="Say something..." name="text" defaultValue="" />
      <input type="submit" value="Post" />
    </form>
  );
}

CommentForm.propTypes = {
  onCommentSubmit: PropTypes.func,
};
export default CommentForm;
