import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ titleText, buttonText, buttonLink, ...rest }) {
  return (
    <React.Fragment>
      <h2 className="header center orange-text">My Blogs</h2>
      <div className="row center">
        <h5 className="header col s12 light">{titleText}</h5>
      </div>
      <div className="row center">
        <Link to={buttonLink} className="btn waves-effect waves-light orange">
          {buttonText}
        </Link>
      </div>
    </React.Fragment>
  );
}
