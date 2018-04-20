'use strict';

import React from 'react';
import axios from 'axios';
import CommentForm from './comment-form';
import CommentList from './comment-list';
import { CSSTransition } from 'react-transition-group';
import { PropTypes } from 'prop-types';
import { hot } from 'react-hot-loader';

/**
 * CommentBox class
 */
class CommentBox extends React.Component {
  static propTypes = {
    url: PropTypes.string,
    pollInterval: PropTypes.number,
  }

  state = { 
    comments: [], 
    errors: undefined, 
    messages: undefined,
    showMessages: false,
    showErrors: false
  };
  

  loadCommentsFromServer = () =>
    axios.get(this.props.url)
      .then(({ data: comments }) => {
        // console.log("GET" , comments);
        this.setState({
          comments: comments.reverse()
        });
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined,
            showMessages: false,
            showErrors: true
          });
          console.error(this.props.url, err.response.data);
        }
      });

  handleCommentSubmit = (comment) => {
    axios.post(this.props.url, comment)
      .then(({ data: newComment }) => {
        this.setState(prevState => ({
          comments: [newComment, ...prevState.comments],
          errors: undefined,
          messages: `New comment added: ${newComment.text}`,
          showMessages: true,
          showErrors: false
        }));
        console.log(`New comment added:`, newComment);
        ::this.clearMessagesAndErrorsAfter(5000);
      })
      .catch((err) => {
        if (err.response.data.errors) {
          this.setState({
            errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
            messages: undefined,
            showMessages: false,
            showErrors: true
          });
          console.error(this.props.url, err.response.data);
          ::this.clearMessagesAndErrorsAfter(5000);
        }
      });
  }

  handleCommentDelete = async function (commentId) {
    // delete comment optimistically
    this.setState(prevState => ({
      comments: prevState.comments.filter(comment => comment.id !== commentId), errors: '', messages: undefined
    }));

    //AJAX DELETE request
    try {
      let data = await axios.delete(this.props.url + "/" + commentId);
      console.log(data.message);
      this.setState({
        errors: undefined,
        messages: `Comment was deleted successfully.`,
        showMessages: true,
        showErrors: false
      });
      console.log(`Comment with ID=${commentId} deleted successfully.`);
    } catch (err) {
      if (err.response.data.errors) {
        this.setState({
          errors: err.response.data.errors.reduce((errs, err) => errs + ' ' + err.message, ''),
          messages: undefined,
          showMessages: false,
          showErrors: true
        });
        console.error(this.props.url, err.response.data);
        this.loadCommentsFromServer();
      }
    }
    ::this.clearMessagesAndErrorsAfter(5000);
  }.bind(this);

  clearMessagesAndErrorsAfter (timeMs) {
    if(this.messagesTimeout) clearTimeout(this.messagesTimeout); //cancel pending timeout
    this.messagesTimeout = setTimeout(() => {
      this.setState({
        showMessages: false,
        showErrors: false
      });
      this.messagesTimeout = undefined;
    }, timeMs);
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
        {/* <CSSTransitionroup transitionName="messages" transitionEnterTimeout={500} transitionLeaveTimeout={300}> */}
        <CSSTransition in={this.state.showErrors} timeout={1000} 
        unmountOnExit classNames="messages">
          <div>  
            <div className="errors">{this.state.errors}</div>
          </div>)
        </CSSTransition>  
        <CSSTransition in={this.state.showMessages} timeout={1000} 
        unmountOnExit classNames="messages">
          <div> 
            <div className="messages">{this.state.messages}</div>
          </div>
        </CSSTransition>
        <CommentList onCommentDelete={this.handleCommentDelete} comments={this.state.comments} />
      </div>
    );
  }
}

export default (CommentBox);