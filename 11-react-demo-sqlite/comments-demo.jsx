'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CommentForm from './comment-form';
import CommentList from './comment-list';

/**
 * CommentBox class
 */
let CommentBox = React.createClass({
  propTypes: {
    url: React.PropTypes.string,
    pollInterval: React.PropTypes.number,
  },
  getInitialState: function () {
    return { data: [] };
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function (comment) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function (newComment) {
        console.log(`New comment added:`, newComment);
        this.setState(prevState => ({ data: prevState.data.concat(newComment) }));
        this.loadCommentsFromServer();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentDelete: function (commentId) {
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
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList onCommentDelete={this.handleCommentDelete} data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={50000} />,
  document.getElementById('app')
);