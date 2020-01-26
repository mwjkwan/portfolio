/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

const pageSurveyStyle = css`
  max-width: 700px;

  .radio {
    border-radius: 50%;
    border: 2px solid #bd574e;
    width: 20px;
    height: 20px;
    background: #dd8078;
    margin-right: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radio-inside {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    background: #4f1f1f;
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

  .answer-selected {
    background: #f3f2f2;
    &:hover {
      background: #f3f2f2;
    }
  }

  .question {
    margin-bottom: 15px;
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
    width: 170px;
  }

  .checkmark {
    margin-right: 4px;
  }

  .incomplete-message {
    color: red;
  }
`;

class PageSurvey extends Component {
  renderMessage = completed => {
    const { status } = this.props;
    if (status === 'live-survey' || status === 'development') {
      return completed ? (
        <div>
          You've completed the survey! Make sure your{' '}
          <Link to="/app/profile">profile</Link> is up to date as we calculate
          your matches by <b>Friday, February 14</b>!
        </div>
      ) : (
        <div className="incomplete-message">Your survey is incomplete!</div>
      );
    } else if (status === 'live-processing') {
      return <div>The survey is closed! Check back soon for your matches!</div>;
    } else if (status === 'live-matches') {
      return (
        <div>
          The survey is closed!{' '}
          <Link to="/app/results">Check out your matches!</Link>
        </div>
      );
    }
  };

  render() {
    const {
      responsesRequested,
      status,
      survey,
      surveyRequested,
      updateResponse,
    } = this.props;

    if (!responsesRequested || !surveyRequested) {
      return (
        <div style={{ height: 300 }}>
          <Loading />
        </div>
      );
    }

    if (!survey || (!status.includes('live') && status !== 'development')) {
      return <div>Currently, there's no survey open. Check back soon!</div>;
    }

    const questions = survey || {};
    let responses = this.props.responses || [];

    const questionsKeys = Object.keys(questions).sort();

    const completed =
      Object.keys(responses).length === Object.keys(questions).length;

    return (
      <div css={pageSurveyStyle}>
        <Header>SURVEY</Header>
        <div>
          Don’t overthink these questions. They will reveal things that you
          don't even know about yourself.
        </div>
        <br />
        {questionsKeys.map((questionId, questionIndex) => {
          const { answers, text } = questions[questionId];

          const answerKeys = Object.keys(answers || {}).sort();

          return (
            <div className="question" key={questionId}>
              <h5>{questionIndex + 1 + '. ' + text}</h5>
              {answerKeys.map((answerNum, answerIndex) => {
                const text = answers[answerNum];
                const selected = responses[questionIndex] === answerIndex;

                return (
                  <div
                    className={selected ? 'answer answer-selected' : 'answer'}
                    key={answerIndex}
                    onClick={() => {
                      if (!selected) {
                        updateResponse(questionIndex, answerIndex);
                      }
                    }}
                  >
                    <div className="radio">
                      {selected && <div className="radio-inside" />}
                    </div>
                    {text}
                  </div>
                );
              })}
            </div>
          );
        })}
        <button
          className="save-changes"
          onClick={() => {
            alert('Changes saved!');
          }}
        >
          <i className="fas fa-check checkmark"></i>Save Changes
        </button>
        <br />
        <br />
        <div>{this.renderMessage(completed)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { firebase, status, surveyKey, uid } = props;
  const { data, requested } = state.firebase;

  return {
    responses: data.responses,
    responsesRequested: requested.responses,
    survey: data.survey,
    surveyRequested: requested.survey,
    updateResponse: (questionId, responseId) => {
      if (status === 'live-survey' || status === 'development') {
        firebase.update('/responses/' + surveyKey + '/' + uid, {
          [questionId]: responseId,
        });
      }
    },
  };
};

export default compose(
  firebaseConnect(props => [
    {
      path: '/responses/' + props.surveyKey + '/' + props.uid,
      storeAs: 'responses',
    },
    {
      path: '/surveys/' + props.surveyKey,
      storeAs: 'survey',
    },
  ]),
  connect(mapStateToProps),
)(PageSurvey);
