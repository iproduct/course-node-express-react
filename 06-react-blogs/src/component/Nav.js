import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './Nav.css'

const activeClassName = 'Nav-active';

const Nav = props => {
  return (
    <nav className="light-blue lighten-1" role="navigation">
      <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
        <ul className="right hide-on-med-and-down">
        <li><NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            View Blog Posts
          </NavLink></li>
          <li><NavLink
            to="/posts"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Manage Posts
          </NavLink></li>

          <li><NavLink
            to="/add-post"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Add Post
          </NavLink></li>
          <li><NavLink
            to="/add-user"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            Add User
          </NavLink></li>
          <li><NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClassName : undefined
            }
          >
            About
          </NavLink></li>

        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><a href="#">Navbar Link</a></li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  )
}

Nav.propTypes = {}

export default Nav