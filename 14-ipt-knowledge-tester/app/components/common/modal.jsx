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

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id={this.props.modalId} className="modal fade" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times; </span></button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.props.onConfirm}>OK</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

Modal.propTypes = {
  modalId: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func
};

Modal.defaultProps = {
  title: 'Confirmation Dialog',
  children: 'Are you sure?'
};

export default Modal;
