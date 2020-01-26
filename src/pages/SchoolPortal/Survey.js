/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { isLoaded } from 'react-redux-firebase';
import Modal from 'react-bootstrap/Modal';

import Header from '../components/Header';
import Loading from '../components/Loading';

const surveyStyle = css`
  .radio {
    border-radius: 50%;
    border: 2px solid #bd574e;
    min-width: 20px;
    height: 20px;
    background: #dd8078;
    margin-right: 11px;
  }

  .answer {
    padding: 0px 10px;
    font-family: 'apercu-light';
    height: 40px;
    text-align: left;
    color: #222222;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: rgba(196, 196, 196, 0.1);
    }
  }

  .answer-input {
    border-width: 0px;
    padding: 0px;
  }

  .question {
    margin-bottom: 15px;
    position: relative;
  }

  .question-input {
    color: #545353;
    border-width: 0;
    font-family: apercu;
    font-size: 1.25rem;
    padding: 0px;
    height: 30px;
    &:hover {
      background: rgba(196, 196, 196, 0.1);
    }
  }

  .question:hover > .removeButton {
    visibility: visible;
  }

  .removeButton {
    height: 20px;
    width: 20px;
    color: #bd574e;
    border-radius: 50%;
    background: rgba(249, 198, 195, 0.8);
    border: 2px solid #bd574e;
    position: absolute;
    right: 0px;
    top: 5px;
    visibility: hidden;
    font-size: 13px;
    cursor: pointer;
    line-height: 18px;
    text-align: center;
    &:hover {
      visibility: visible;
    }
  }

  .button-symbol {
    line-height: 29px;
  }

  .round-button {
    background: rgba(249, 198, 195, 0.8);
    border: 3px solid #bd574e;
    border-radius: 50%;
    color: #bd574e;
    cursor: pointer;
    display: inline-block;
    height: 35px;
    text-align: center;
    vertical-align: middle;
    width: 35px;
  }

  .save-changes {
    align-items: center;
    background: #bd574e;
    color: #ffffff;
    font-family: Apercu;
    font-size: 18px;
    height: 38px;
    letter-spacing: 0.05em;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 170px;
  }

  .checkmark {
    margin-right: 4px;
  }
`;

const surveyModalStyle = css`
  .modal-container {
    text-align: center;
    padding: 40px;
  }

  .modal-question {
    font-size: 22px;
  }

  .modal-cancel {
    cursor: pointer;
  }
`;

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      modalIndex: 0,
      show: false,
      survey: [],
    };
  }

  componentDidUpdate(prevProps) {
    const { survey } = this.props;
    if (prevProps.survey !== survey) {
      const questions = survey || {};
      const surveyList = Object.keys(questions)
        .sort()
        .map(key => questions[key]);
      this.setState({ loading: false, survey: surveyList });
    }
  }

  editQuestion = index => {
    return event => {
      const { survey } = this.state;
      const newQuestion = {
        ...survey[index],
        text: event.target.value,
      };
      let newSurvey = survey.slice();
      newSurvey[index] = newQuestion;
      this.setState({ survey: newSurvey });
    };
  };

  editAnswer = (index, answerKey) => {
    return event => {
      let newSurvey = this.state.survey.slice();
      const newQuestion = {
        ...newSurvey[index],
        answers: {
          ...newSurvey[index].answers,
          [answerKey]: event.target.value,
        },
      };
      newSurvey[index] = newQuestion;
      this.setState({ survey: newSurvey });
    };
  };

  addQuestion = () => {
    let newSurvey = this.state.survey.slice();
    const newQuestion = {
      text: 'Question ' + (newSurvey.length + 1),
      answers: {
        0: 'Option 1',
        1: 'Option 2',
        2: 'Option 3',
        3: 'Option 4',
        4: 'Option 5',
      },
    };
    newSurvey.push(newQuestion);
    this.setState({ survey: newSurvey });
  };

  deleteQuestion = index => {
    let newSurvey = this.state.survey.slice();
    newSurvey.splice(index, 1);
    this.setState({ survey: newSurvey, show: false });
  };

  saveSurvey = () => {
    const { survey } = this.state;
    let questionsDict = {};
    survey.forEach((question, index) => {
      questionsDict[index] = question;
    });
    this.props.updateSurvey(questionsDict);
    alert('Changes saved!');
  };

  confirm = modalIndex => this.setState({ modalIndex, show: true });

  render() {
    if (!isLoaded(this.props.survey)) {
      return <Loading />;
    }

    const { modalIndex, survey, show } = this.state;

    return (
      <div className="SchoolPortalSurvey" css={surveyStyle}>
        <Header>SURVEY</Header>
        <br />
        Questions will be displayed in the actual survey in the order shown
        below.
        <br />
        <br />
        <div>
          {survey.map((question, index) => {
            const answers = question.answers || {};
            const answerKeys = Object.keys(answers).sort();

            return (
              <div className="question" key={index}>
                <input
                  className="question-input"
                  onChange={this.editQuestion(index)}
                  type="text"
                  value={question.text}
                />
                <div
                  className="removeButton"
                  onClick={() => this.confirm(index)}
                >
                  <i className="fas fa-times" />
                </div>

                {answerKeys.map(answerKey => {
                  const answer = question.answers[answerKey];

                  return (
                    <div key={answerKey} className="answer">
                      <div className="radio" />
                      <input
                        className="answer-input"
                        onChange={this.editAnswer(index, answerKey)}
                        type="text"
                        value={answer}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <Modal
          css={surveyModalStyle}
          onHide={() => this.setState({ show: false })}
          show={show}
        >
          <Modal.Body className="modal-container">
            <div className="modal-question">
              Are you sure you want to delete this question?
            </div>
            <br />
            <br />
            <button onClick={() => this.deleteQuestion(modalIndex)}>
              I'm sure.
            </button>
            <br />
            <br />
            <div
              className="modal-cancel"
              onClick={() => this.setState({ show: false })}
            >
              Just kidding!
            </div>
          </Modal.Body>
        </Modal>
        <div className="round-button" onClick={this.addQuestion}>
          <i className="fas fa-plus button-symbol"></i>
        </div>
        <br />
        <button className="save-changes" onClick={this.saveSurvey}>
          <i className="fas fa-check checkmark"></i>Save Changes
        </button>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    survey: state.firebase.data.survey,
    updateSurvey: data => {
      props.firebase.set(`/surveys/${props.school}`, data);
    },
  };
};

export default compose(
  withRouter,
  firebaseConnect(props => [
    {
      path: `/surveys/${props.school}`,
      storeAs: 'survey',
    },
  ]),
  connect(mapStateToProps),
)(Survey);
