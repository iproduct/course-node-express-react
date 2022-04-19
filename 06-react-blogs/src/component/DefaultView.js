import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import './About.css';

const DefaultView = ({ children, actionButtonText, actionLinkTo }) => {
  const childrenArray = React.Children.toArray(children);
  console.log(childrenArray);
  return (
    <div className="section no-pad-bot" id="index-banner">
      <div className="About container">
        <h1 className="header center orange-text">{childrenArray.find(reactElem => reactElem.type === "header")}</h1>
        <div className="row center">
          <h5 className="header col s12 light">{childrenArray.find(reactElem => reactElem.type === "div")}</h5>
        </div>
        <div className="row center">
          <Link to={actionLinkTo} className="btn-large waves-effect waves-light orange" >
            {actionButtonText}
          </Link>
        </div>
      </div>
    </div>

  )
}

DefaultView.propTypes = {
  actionButtonText: PropTypes.string.isRequired,
  actionLinkTo: PropTypes.string.isRequired
}

export default DefaultView