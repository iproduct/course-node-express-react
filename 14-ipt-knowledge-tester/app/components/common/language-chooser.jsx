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

import React from "react";

class LanguageChooser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.switchLocale = this.switchLocale.bind(this);
  }

  switchLocale(e) {
    this.context.localeService.setLocale(e.target.value);
  }

  render() {
    return (
      <p className="form-inline">
        <span>Switch Locale:</span>

        <select className="form-control" defaultValue={this.context.localeService.getLocale()} onChange={this.switchLocale}>
          <option>en</option>
          <option>bg</option>
        </select>
      </p>
    );
  }
}

LanguageChooser.contextTypes = {
  localeService: React.PropTypes.object
};

export default LanguageChooser;