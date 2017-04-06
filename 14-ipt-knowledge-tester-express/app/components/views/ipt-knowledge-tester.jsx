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
import Navigation from './main/navigation';
import TestService from '../../services/test.service'
import UserService from '../../services/user.service'
import LocaleService from '../../services/locale.service'

const TEST_SERVICE_URL = '/api/tests';
const USER_SERVICE_URL = '/api/users';
const DEFAULT_LOCALE = 'bg';

class IPTKnowledgeTester extends React.Component {
  constructor(props) {
    super(props);
    this.testServiceSingleton = new TestService(TEST_SERVICE_URL);
    this.userServiceSingleton = new UserService(USER_SERVICE_URL);
    this.onLocaleChange = this.onLocaleChange.bind(this);
    this.localeServiceSingleton = new LocaleService(DEFAULT_LOCALE, this.onLocaleChange);
  }

  getChildContext() {
    return {
      testService: this.testServiceSingleton,
      userService: this.userServiceSingleton,
      localeService: this.localeServiceSingleton
    };
  }

  onLocaleChange() {
    this.setState({});
  }

  render() {
    return (
      <main>
        <Navigation />

        {/* Here routed components go ... */}
        <div className="container">
          {this.props.children}
        </div>
      </main>
    );
  }
}

IPTKnowledgeTester.propTypes = {
  children: React.PropTypes.node
}

IPTKnowledgeTester.childContextTypes = {
  testService: React.PropTypes.object,
  userService: React.PropTypes.object,
  localeService: React.PropTypes.object
};

export default IPTKnowledgeTester;