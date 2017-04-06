import React from 'react'

const Repo = (props) => {
  return (
    <div>
      <h3>{props.params.userName}: {props.params.repoName}</h3>
    </div>
  );
}

Repo.propTypes = {
  params: React.PropTypes.object
}

export default Repo;