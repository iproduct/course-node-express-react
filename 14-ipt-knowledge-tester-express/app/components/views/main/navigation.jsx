/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import React from 'react';
// import { browserHistory } from 'react-router';
import NavLink from '../../navigation/nav-link';
import LanguageChooser from '../../common/language-chooser';

const Navigation = ({children}, context) => {

  function handleSearch(event) {
    event.preventDefault()
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    console.log(path);
    // navigate programmatically
    // browserHistory.push(path);
    context.router.push(path);
  }

  // function handleAddTest() {
  //   const path = { pathname: '/test', query: { controls: true, edit: true } };
  //   context.router.push(path);
  // }

  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <NavLink to="/" onlyActiveOnIndex={true} className="navbar-brand"><img alt="Brand" src="/app/assets/img/ipt-logo.png" /></NavLink>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
            <li><NavLink to={{ pathname: '/tests', query: { controls: true } }} >Tests</NavLink></li>
            

            <li className="dropdown">
              <NavLink to="/users" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Users <span className="caret"></span></NavLink>
              <ul className="dropdown-menu">
                <li><NavLink to={{ pathname: '/users', query: { controls: true } }} >Manage Users</NavLink></li>
                <li><NavLink to={{ pathname: '/user', query: { controls: true, edit: true } }} >Add New User</NavLink></li>
                <li role="separator" className="divider"></li>
                <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                <li><a href="#">Separated link</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <form className="navbar-form navbar-left" role="search" onSubmit={handleSearch}>
            <div className="form-group">
              <input type="text" placeholder="userName" className="form-control" /> / {' '}
              <input type="text" placeholder="repo" className="form-control" />{' '}
            </div>
            <button type="submit" className="btn btn-default">Go</button>
          </form>

          <div className="navbar-form navbar-right">
            <LanguageChooser className="form-control" />
          </div>

          <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/about">About</NavLink></li>
          </ul>

        </div>
      </div>
    </nav>
  );

}

Navigation.propTypes = {
  children: React.PropTypes.node
}

//<button onClick={handleAddTest} className="btn btn-primary">Add New Test</button>

// ask for `router` from context
Navigation.contextTypes = {
  router: React.PropTypes.object
};

export default Navigation;