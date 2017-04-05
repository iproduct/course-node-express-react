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
import $ from 'jquery';
import deepEqual from 'deep-equal';
import getMarkdown from '../../../helpers/get-markdown';
import { getMaxId, findById, removeById, setById } from '../../../helpers/collection-helpers';
import Question from './question';
import Modal from '../../common/modal';


class Test extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Initialize state
    let state = {
      newQuestionId: undefined,
      editedQuestionId: undefined
    };

    // Determine working mode flags
    state.isControls = this.props.isControls ||
      (props.location && props.location.query && props.location.query.controls === 'true');
    state.isEdit = this.props.isEdit ||
      (props.location && props.location.query && props.location.query.edit === 'true');
    state.isDetails = this.props.isDetails ||
      (props.location && props.location.query && 
        (props.location.query.details === 'true' || props.location.query.details === undefined));

    // Get or create test data
    if (props.test) {
      state.test = this.props.test;
    } else {
      // Default test initialization
      state.test = {
        id: '',
        title: '',
        description: '',
        difficulty: 'intermediate',
        author: '',
        license: 'CC BY-NC-SA',
        questions: []
      }

      // Read id from route param testId
      if (props.params && props.params.testId) {
        // state.test = data.find((test) => test.id === this.props.params.testId);

        // Load test by id
        context.testService.getTestById(this.props.params.testId).then((test) => {
          let newState = this.state;
          newState.test = test;
          if (newState.isEdit) {
            newState.oldTest = $.extend(true, {}, test); //needed in edit mode only for reset
          }
          this.setState(newState);
        });
      }
    }

    if (state.isEdit) {
      state.oldTest = $.extend(true, {}, state.test);
    }

    this.state = state;

    // Bind methods to this
    this.render = this.render.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.resetChanges = this.resetChanges.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.confirmCancelEdit = this.confirmCancelEdit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.editTest = this.editTest.bind(this);
    this.deleteTest = this.deleteTest.bind(this);

    this.addQuestion = this.addQuestion.bind(this);
    this.editQuestion = this.editQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.cancelQuestion = this.cancelQuestion.bind(this);
  }

  // Class methods
  resetChanges() {
    this.setState({ test: $.extend(true, {}, this.state.oldTest) });
  }

  saveChanges() {
    this.setState({ oldTest: $.extend(true, {}, this.state.test) });
    if (this.state.test.id) { // edit test mode
      this.context.testService.editTest(this.state.test).then(() => {
        //return back to tests collection
        this.context.router.push({ pathname: `/tests`, query: { controls: true } });
      });
    } else {  // add new test mode
      this.context.testService.addNewTest(this.state.test).then(() => {
        //return back to tests collection
        this.context.router.push({ pathname: `/tests`, query: { controls: true } });
      });
    }
  }

  cancelEdit() {
    if (deepEqual(this.state.test, this.state.oldTest)) {
      this.confirmCancelEdit();
    } else {
      $('#test-cancel-confirm').modal();
    }
  }

  confirmCancelEdit() {
    // reset the changes
    this.setState({ test: $.extend(true, {}, this.state.oldTest) });
    // cancel edit mode
    this.context.router.push({ pathname: `/tests`, query: { controls: true, edit: false } });
  }

  handleTextChange(e) {
    let test = this.state.test;
    test[e.target.name] = e.target.value;
    this.setState({ test: test });
  }

  editTest() {
    const path = { pathname: `/test/${this.state.test.id}`, query: { controls: true, edit: true } };
    this.context.router.push(path);
  }

  deleteTest() {
    if (this.state.test.id) {
      this.context.testService.deleteTest(this.state.test.id).then((deletedTest) => {
        if (this.props.onTestDelete) this.props.onTestDelete(deletedTest.id);  // call parent's callback
        this.context.router.push({ pathname: `/tests`, query: { controls: true } }); //return back to tests collection
      });
    }
  }


  // Handle questions
  addQuestion() {
    if (this.state.isEdit) {
      let newTestState = this.state.test;
      let questions = newTestState.questions;
      let newQuestionId = getMaxId(questions) + 1;
      questions.push({ id: newQuestionId, text: '', hint: '', weight: 1, answers: [] }); // add new empty question
      this.setState({
        test: newTestState,
        oldQuestion: undefined, // no previous value to reset
        newQuestionId: newQuestionId,  // set add mode for the question
        editedQuestionId: undefined
      });
    }
  }

  editQuestion(questionId) {
    if (this.state.isEdit && questionId) {
      this.setState({
        oldQuestion: $.extend(true, {}, findById(this.state.test.questions, questionId)), // backup copy to reset
        newQuestionId: undefined,
        editedQuestionId: questionId // set edit mode for the question
      });
    }
  }

  deleteQuestion(questionId) {
    if (this.state.isEdit && questionId) {
      let newTestState = this.state.test;
      let questions = newTestState.questions;
      newTestState.questions = removeById(questions, questionId); // remove new added question
      this.setState({ test: newTestState, newQuestionId: undefined, editedQuestionId: undefined });
    }
  }

  saveQuestion() {
    this.setState({ newQuestionId: undefined, editedQuestionId: undefined });
  }

  cancelQuestion() {
    let newTestState = this.state.test;
    let questions = newTestState.questions;
    if (this.state.newQuestionId) {
      newTestState.questions = removeById(questions, this.state.newQuestionId); // remove new added question
    } else if (this.state.editedQuestionId && this.state.oldQuestion) {
      newTestState.questions = setById(questions, this.state.editedQuestionId, this.state.oldQuestion); // reset the saved old copy
    }
    this.setState({ test: newTestState, newQuestionId: undefined, editedQuestionId: undefined });
  }


  // Render component
  render() {
    let isControls = this.state.isControls;
    let isEdit = this.state.isEdit;
    let isDetails = this.state.isDetails;

    let questionNodes = [];
    if (isDetails) {
      questionNodes = this.state.test.questions.map((question) => {
        return (
          <li key={question.id} className="well well-md">
            <Question question={question} showWeights={true} showAnswers={false}
              isControls={this.state.isEdit}
              isNew={this.state.isEdit && this.state.newQuestionId === question.id}
              isEdit={this.state.isEdit && this.state.editedQuestionId === question.id}
              onSave={this.saveQuestion} onCancel={this.cancelQuestion}
              onDelete={this.deleteQuestion} onEdit={this.editQuestion}>
            </Question>
          </li>
        );
      });
    }

    return (
      <div className="test">
        { isEdit ? (
          <h2>{!this.state.test.id ? "Add New" : "Edit"} Test</h2>
        ) : null}
        <h3 className="test-title">
          { (isEdit) ? (
            <input type="text" name="title" placeholder="Name the test ..." className="form-control"
              value={this.state.test.title} onChange={this.handleTextChange} />
          ) : (
              <span>{this.state.test.title}</span>
            ) }
        </h3>
        <div className="row">
          <table className="metadata table table-bordered table-striped col-xs-12 col-md-6 col-lg-4">
            <tbody>
              <tr>
                <td>Description</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="description" placeholder="Describe the test ..." className="form-control"
                      value={this.state.test.description} onChange={this.handleTextChange} />
                  ) :
                    (<span dangerouslySetInnerHTML={getMarkdown(this.state.test.description) } />
                    ) }
                </td>
              </tr>
              { (!isEdit) ? (
                <tr>
                  <td>Questions #</td>
                  <td>{this.state.test.questions.length}</td>
                </tr>
              ) : null }
              <tr>
                <td>Difficulty</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="difficulty" placeholder="Test difficulty ..." className="form-control"
                      value={this.state.test.difficulty} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.difficulty}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>Author</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="author" placeholder="Test author ..." className="form-control"
                      value={this.state.test.author} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.author}</span>
                    ) }
                </td>
              </tr>
              <tr>
                <td>License</td>
                <td>
                  { (isEdit) ? (
                    <input type="text" name="license" placeholder="Test author ..." className="form-control"
                      value={this.state.test.license} onChange={this.handleTextChange} />
                  ) :
                    (<span>{this.state.test.license}</span>
                    ) }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        { isDetails ? (
            <ol className="questions">
              {questionNodes}
            </ol>
          ) : null
        }

        { isControls ?
          (isEdit ? (
            <div className="test-controls">
              <button type="button" className="btn btn-success" onClick={this.saveChanges}>Save Test</button>
              <button type="button" className="btn btn-warning" onClick={this.resetChanges}>Reset Test</button>
              <button type="button" className="btn btn-primary" onClick={this.addQuestion}>Add Question</button>
              <button type="button" className="btn btn-default" onClick={this.cancelEdit}>Cancel Edit</button>
            </div>
          ) : (
              <div className="test-controls">
                <button type="button" className="btn btn-warning" onClick={this.editTest}>Edit Test</button>
                <button type="button" className="btn btn-danger" onClick={this.deleteTest}>Delete Test</button>
              </div>
            )
          ) : null
        }
        <Modal modalId="test-cancel-confirm" title="Unsaved Edits Confirmation" onConfirm={this.confirmCancelEdit}>
          Your edits have NOT been saved. Are you sure you want to CANCEL without saving them?
        </Modal>
      </div>
    );
  }

}

Test.propTypes = {
  params: React.PropTypes.object,
  location: React.PropTypes.object,
  test: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    difficulty: React.PropTypes.oneOf(['beginner', 'intermediate', 'expert']).isRequired,
    author: React.PropTypes.string,
    license: React.PropTypes.oneOf(['CC0', 'CC BY', 'CC BY-ND', 'CC BY-NC', 'CC BY-NC-SA', 'CC BY-NC-ND', 'Apache 2.0', 'EPL', 'GPL']).isRequired,
    questions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        id: React.PropTypes.number,
        text: React.PropTypes.string.isRequired,
        hint: React.PropTypes.string,
        weight: React.PropTypes.number.isRequired,
        answers: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            id: React.PropTypes.number,
            text: React.PropTypes.string.isRequired,
            weight: React.PropTypes.number.isRequired,
          })
        )
      })
    ).isRequired
  }),
  isControls: React.PropTypes.bool,
  isEdit: React.PropTypes.bool,
  isDetails: React.PropTypes.bool,
  onTestDelete: React.PropTypes.func
};

Test.contextTypes = {
  testService: React.PropTypes.object,
  router: React.PropTypes.object
};

Test.defaultProps = {
  difficulty: 'intermediate',
  license: 'CC BY-NC-SA',
  questions: 0,
};


export default Test;
