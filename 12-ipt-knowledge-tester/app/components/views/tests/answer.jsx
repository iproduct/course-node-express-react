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
import getMarkdown from '../../../helpers/get-markdown';

class Answer extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    let state = {};

    // Get or create answer data
    if (props.answer) {
      state.answer = this.props.answer;
    } else {
      // Default answer initialization
      state.answer = {
        id: '',
        text: '',
        weight: 0
      }
    }

    this.state = state;

    // Bind methods to this
    this.render = this.render.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleEditAnswer = this.handleEditAnswer.bind(this);
    this.handleDeleteAnswer = this.handleDeleteAnswer.bind(this);

  }


  // Class methods
  handleTextChange(e) {
    let answer = this.state.answer;
    answer[e.target.name] = e.target.value;
    this.setState({ answer: answer });
  }

  handleNumberChange(e) {
    let answer = this.state.answer;
    answer[e.target.name] = parseInt(e.target.value);
    this.setState({ answer: answer });
  }

  handleEditAnswer() {
    if (this.props.onEdit && this.state.answer)
      this.props.onEdit(this.state.answer.id);
  }

  handleDeleteAnswer() {
    if (this.props.onDelete && this.state.answer)
      this.props.onDelete(this.state.answer.id);
  }


  // Render component
  render() {
    let isControls = this.props.isControls;
    let isInput = this.props.isEdit || this.props.isNew;

    return (
      <tr className="answer">
        <td>
          { isInput ? (
              <input type="text" name="text" placeholder="Type answer here ..." className="answer-text form-control"
                value={this.state.answer.text} onChange={this.handleTextChange} />
          ) : (
              <span className="answer-text" dangerouslySetInnerHTML={ getMarkdown(this.state.answer.text) } />
            ) }
        </td>

        { isInput ? (
          <td>
            <input type="number" id="weight" name="weight" placeholder="1" className="answer-weight form-control"
              value={this.state.answer.weight} onChange={this.handleNumberChange} />
          </td>
        ) : (this.props.showWeights ? (
          <td><span className="answer-weight">{this.state.answer.weight}</span></td>) : null
          ) }

        { this.props.isControls ? (
          <td className="answerControls">
            { isControls ?
              (isInput ? (
                  <div className="answer-controls">
                    <button type="button" className="btn btn-success" onClick={this.props.onSave}>OK</button>
                    <button type="button" className="btn btn-warning" onClick={this.props.onCancel}>Cancel</button>
                  </div>
                ) : (
                  <div className="answer-controls">
                    <button type="button" className="btn btn-default" onClick={this.props.onMoveUp}>Up</button>
                    <button type="button" className="btn btn-default" onClick={this.props.onMoveDown}>Down</button>
                    <button type="button" className="btn btn-warning" onClick={this.handleEditAnswer}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteAnswer}>Delete</button>
                  </div>
                )
              ) : null
            }
          </td>
        ) : null }
      </tr>
    );
  }
}

Answer.propTypes = {
  answer: React.PropTypes.shape({
    id: React.PropTypes.number,
    text: React.PropTypes.string.isRequired,
    weight: React.PropTypes.number.isRequired
  }),
  showWeights: React.PropTypes.bool,
  isControls: React.PropTypes.bool,
  isNew: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  onSave: React.PropTypes.func,
  onCancel: React.PropTypes.func,
  onMoveUp: React.PropTypes.func,
  onMoveDown: React.PropTypes.func,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func
};

Answer.defaultProps = {
  weight: 0,
  showWeights: false,
  isEdit: false
};

export default Answer;
