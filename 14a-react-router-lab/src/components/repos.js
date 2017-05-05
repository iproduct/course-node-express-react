import React from 'react';
import { PropTypes } from 'prop-types';
import Repo from './repo';
import { Route } from 'react-router-dom';

const Repos = (props) => {
    return (
      <div>
        <h2>Repos</h2>
        <Route path="/repos/:userName/:repoName" component={Repo} />
      </div>
    );
};


Repos.propTypes = {
  children: PropTypes.node
}

export default Repos;