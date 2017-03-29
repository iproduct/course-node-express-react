import React from 'react'

const Repos = (props) => {
    return (
      <div>
        <h2>Repos</h2>
        {props.children}
      </div>
    );
};


Repos.propTypes = {
  children: React.PropTypes.node
}

export default Repos;
