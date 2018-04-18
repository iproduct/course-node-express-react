'use strict';

import React from 'react';
import $ from 'jquery';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import {PropTypes} from 'prop-types';

/**
 * CommentBox class
 */
class CommentBox extends React.Component {
 constructor(params) {
   super(params);
   this.state = { data: [] };
  }

  loadCommentsFromServer = () => {
    $.getJSON({
      url: this.props.url,
      cache: false,
      success: function (data) {
        this.setState({ data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };

  handleCommentSubmit = (comment) => {
    $.post({
      url: this.props.url,
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify(comment),
      success: function (newComment) {
        var newComments = this.state.data.concat([newComment]);
        console.log(`New comment added:`, newComment);
        this.setState({ data: newComments });
        this.loadCommentsFromServer();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };

  handleCommentDelete = (commentId) => {
    // var comments = this.state.data;
    // comment.id = Date.now();
    // var newComments = comments.concat([comment]);
    // this.setState({ data: newComments });
    $.ajax({
      url: this.props.url + "/" + commentId,
      type: 'DELETE',
      success: function (data) {
        console.log(data);
        this.loadCommentsFromServer();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };

  componentDidMount = () => {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  };

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CommentList onCommentDelete={this.handleCommentDelete} comments={this.state.data} />
      </div>
    );
  }
}

CommentBox.propTypes = {
  url: PropTypes.string,
  pollInterval: PropTypes.number,
};

export default CommentBox;