import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect()
export default class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  render() {
    const { match, location, history } = this.props;

    return (
      <div>
        <div>You are now at {location.pathname}</div>
        <div>Location: {JSON.stringify(location)}</div>
        <div>The match is: {JSON.stringify(match)}</div>
        <div>The history contains: {JSON.stringify(history)}</div>
      </div>
    )
  }
}