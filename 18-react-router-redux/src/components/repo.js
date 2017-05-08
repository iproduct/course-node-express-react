import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

const Repo = (props) => {
  return (
    <div>
      <h3>User: {props.match.params.userName}</h3>
      <h3>Repo: {props.match.params.repoName}</h3>
    </div>
  );
}

Repo.propTypes = {
  params: PropTypes.object
}

export default connect()(Repo);