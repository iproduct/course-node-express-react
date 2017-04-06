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
import $ from 'jquery';
import getMarkdown from '../../../helpers/get-markdown';
import { getMaxId, findById, removeById, setById } from '../../../helpers/collection-helpers';
import Answer from './answer';

class Question extends React.Component {
  constructor(props) {
    super(props);

    // Initialize state
    let state = {};

    // Determine working mode flags
    state.isControls = this.props.isControls;
    state.isEdit = this.props.isEdit;
    state.isNew = this.props.isNew;

    // Get or create question data
    if (props.question) {
      state.question = this.props.question;
    } else {
      // Default question initialization
      state.question = {
        id: '',
        text: '',
        hint: '',
        weight: 0,
        answers: []
      }
    }

    this.state = state;

    // Bind methods to this
    this.render = this.render.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleEditQuestion = this.handleEditQuestion.bind(this);
    this.handleDeleteQuestion = this.handleDeleteQuestion.bind(this);

    this.addAnswer = this.addAnswer.bind(this);
    this.editAnswer = this.editAnswer.bind(this);
    this.deleteAnswer = this.deleteAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.cancelAnswer = this.cancelAnswer.bind(this);
  }

  // Class methods
  handleTextChange(e) {
    let question = this.state.question;
    question[e.target.name] = e.target.value;
    this.setState({ question: question });
  }

  handleNumberChange(e) {
    let question = this.state.question;
    question[e.target.name] = parseInt(e.target.value);
    this.setState({ question: question });
  }

  handleEditQuestion() {
    if(this.props.onEdit && this.state.question)
      this.props.onEdit(this.state.question.id);
  }

  handleDeleteQuestion() {
    if(this.props.onDelete && this.state.question)
      this.props.onDelete(this.state.question.id);
  }


  // Handle answers
  addAnswer() {
    if (this.props.isNew || this.props.isEdit) {
      let newQuestionState = this.state.question;
      let answers = newQuestionState.answers;
      let newAnswerId = getMaxId(answers) + 1;
      answers.push({ id: newAnswerId, text: '', weight: 0 }); // add new empty answer
      this.setState({
        question: newQuestionState,
        oldAnswer: undefined, // no previous value to reset
        newAnswerId: newAnswerId,  // set add mode for the answer
        editedAnswerId: undefined
      });
    }
  }

  editAnswer(answerId) {
    if (this.props.isEdit && answerId) {
      this.setState({
        oldAnswer: $.extend(true, {}, findById(this.state.question.answers, answerId)), // backup copy to reset
        newAnswerId: undefined,
        editedAnswerId: answerId // set edit mode for the answer
      });
    }
  }

  deleteAnswer(answerId) {
    if (this.props.isEdit && answerId) {
      let newQuestionState = this.state.question;
      let answers = newQuestionState.answers;
      newQuestionState.answers = removeById(answers, answerId); // remove the answer
      this.setState({ question: newQuestionState, newAnswerId: undefined, editedAnswerId: undefined });
    }
  }

  saveAnswer() {
    this.setState({ newAnswerId: undefined, editedAnswerId: undefined });
  }

  cancelAnswer() {
    let newQuestionState = this.state.question;
    let answers = newQuestionState.answers;
    if (this.state.newAnswerId) {
      newQuestionState.answers = removeById(answers, this.state.newAnswerId); // remove new added answer
    } else if (this.state.editedAnswerId && this.state.oldAnswer) {
      newQuestionState.answers = setById(answers, this.state.editedAnswerId, this.state.oldAnswer); // reset the saved old copy
    }
    this.setState({ newAnswerId: undefined, editedAnswerId: undefined });
  }


  // Render component
  render() {
    let isControls = this.props.isControls;
    let isInput = this.props.isEdit || this.props.isNew;

    let answerNodes = this.state.question.answers.map((answer) => {
      return (
        <Answer key={answer.id} answer={answer} 
          showWeights={this.props.showWeights}
          isControls={isInput}
          isNew={isInput && this.state.newAnswerId === answer.id}
          isEdit={isInput && this.state.editedAnswerId === answer.id}
          onSave={this.saveAnswer} onCancel={this.cancelAnswer}
          onDelete={this.deleteAnswer} onEdit={this.editAnswer} />
      );
    });

    return (
      <div className="question form-horizontal">
        { isInput ? (
          <div className="form-group col-xs-12">
            <input type="text" name="text" placeholder="Type test question here ..." className="question-text form-control"
              value={this.state.question.text} onChange={this.handleTextChange} />
          </div>
        ) : (
            <span className="question-text" dangerouslySetInnerHTML={ getMarkdown(this.state.question.text) } />
          ) }

        { isInput ? (
          <div className="form-group col-xs-12">
            <input type="text" name="hint" placeholder="Hint about question ..." className="question-hint form-control"
              value={this.state.question.hint} onChange={this.handleTextChange} />
          </div>
        ) : (this.props.showHint ? (
          <span className="question-hint" dangerouslySetInnerHTML={ getMarkdown(this.state.question.hint) } />) : null
          ) }

        { isInput ? (
          <div className="form-group">
            <label htmlFor="weight" className=" control-label col-xs-1">Weight: </label>
            <div className="question-weight col-xs-2">
              <input type="number" id="weight" name="weight" placeholder="1" className="question-weight form-control"
                value={this.state.question.weight} onChange={this.handleNumberChange} />
            </div>
          </div>
        ) : (this.props.showWeights ? (
          <span className="question-weight">Weight: {this.state.question.weight}</span>) : null
          ) }

        <table className="answers table table-bordered table-striped table-condensed">
          <tbody>
            {answerNodes}
          </tbody>
        </table>

        { this.props.isControls ? (
          <div className="questionControls">
            { isControls ?
              (isInput ? (
                <div className="question-controls">
                  <button type="button" className="btn btn-success" onClick={this.props.onSave}>OK</button>
                  <button type="button" className="btn btn-warning" onClick={this.props.onCancel}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={this.addAnswer}>Add Answer</button>
                </div>
              ) : (
                  <div className="question-controls">
                    <button type="button" className="btn btn-default" onClick={this.props.onMoveUp}>Move Up</button>
                    <button type="button" className="btn btn-default" onClick={this.props.onMoveDown}>Move Down</button>
                    <button type="button" className="btn btn-warning" onClick={this.handleEditQuestion}>Edit Question</button>
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteQuestion}>Delete Question</button>
                  </div>
                )
              ) : null
            }
          </div>
        ) : null }
      </div>
    );
  }

}

Question.propTypes = {
  question: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    hint: React.PropTypes.string,
    weight: React.PropTypes.number,
    answers: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired,
        weight: React.PropTypes.number.isRequired,
      })
    )
  }),
  showWeights: React.PropTypes.bool,
  showHint: React.PropTypes.bool,
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

Question.defaultProps = {
  weight: 1,
  showWeights: false,
  showHint: false,
  isEdit: false
};

export default Question;
