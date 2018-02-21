'use strict';

import React from 'react';
import axios from 'axios';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {PropTypes} from 'prop-types';

/**
 * CommentBox class
 */
class CommentBox extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    pollInterval: PropTypes.number,
  }

  constructor(props) {
    super(props);
    this.state = { comments: [], errors: undefined, messages: undefined };
  }

  loadCommentsFromServer = () =>
    axios.get(this.props.url)
      .then(({ data: comments }) => {
        // console.log("GET" , comments);
        this.setState({
          comments,
          errors: undefined,
          messages: undefined
        });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined
          });
          console.error(this.props.url, err.response.data);
        }
      });

  handleCommentSubmit = (comment) => {
    axios.post(this.props.url, comment)
      .then(({ data: newComment }) => {
        this.setState(prevState => ({
          comments: prevState.comments.concat(newComment),
          errors: undefined,
          messages: `New comment added: ${newComment.text}`
        }));
        console.log(`New comment added:`, newComment);
        setTimeout(this.loadCommentsFromServer, 10000);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined
          });
          console.error(this.props.url, err.response.data);
        }
      });
  }

  handleCommentDelete = (commentId) => {
    // delete comment optimistically
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== commentId), errors: '', messages: undefined
    }));

    //AJAX DELETE request
    axios.delete(this.props.url + "/" + commentId)
      .then(({ data: message }) => {
        console.log(message);
        this.setState({
          errors: undefined,
          messages: `Comment with deleted successfully.`
        });
        console.log(`Comment with ID=${commentId} deleted successfully.`);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined
          });
          console.error(this.props.url, err.response.data);
        }
        setTimeout(this.loadCommentsFromServer, 10000);
      });
  }

  componentDidMount = () => {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
        <CSSTransitionGroup transitionName="messages" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.state.errors && <div className="errors">{this.state.errors}</div>}
          {this.state.messages && <div className="messages">{this.state.messages}</div>}
        </CSSTransitionGroup>
        <CommentList onCommentDelete={this.handleCommentDelete} comments={this.state.comments} />
      </div>
    );
  }
}

export default CommentBox;