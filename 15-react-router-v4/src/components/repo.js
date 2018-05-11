import React from 'react';
import { PropTypes } from 'prop-types';

const Repo = ({ match }) => {
  return (
    <div>
      <h3>User: {match.params.userName}</h3>
      <h3>Repo: {match.params.repoName}</h3>
    </div>
  );
}

Repo.propTypes = {
  params: PropTypes.object
}

export default Repo;