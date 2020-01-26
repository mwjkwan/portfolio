/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';

import Checkboxes from '../components/Checkboxes';
import Input from '../components/Input';
import Logo from '../components/Logo';
import PicUpload from '../components/PicUpload';
import Radios from '../components/Radios';
import Select from '../components/Select';
import Textarea from '../components/Textarea';

import PageSchoolNotFound from 'pages/PageSchoolNotFound';

const pageOnboardStyle = css`
  height: 100%;
  background: #f9a9a5;

  .header {
    padding: 20px;
    text-align: center;
    width: 100%;
  }

  .header-text {
    color: white;
  }

  .header-sub-text {
    color: white;
    font-size: 20px;
  }

  .logo-container {
    display: inline-block;
    width: 120px;
    margin-bottom: 20px;
  }

  .form {
    margin: 0 auto;
    width: 540px;
    text-align: center;
    background: white;
    padding: 10px 20px 30px 20px;
  }

  .question {
    color: #bd574e;
    font-size: 20px;
  }

  .next-button {
    width: 70px;
    height: 40px;
    margin-top: 10px;
  }

  .onboard-input {
    width: 500px;
    border: 0px;
    border-bottom: 1px solid;
    padding-bottom: 0px;
    padding-left: 0px;
    display: block;
    color: #bd574e;
  }

  .onboard-select {
    width: 500px;
    border: 0px;
    border-bottom: 1px solid;
    padding-bottom: 0px;
    padding-left: 0px;
    display: block;
    background-image: url(https://image.flaticon.com/icons/svg/60/60781.svg);
    background-position: 95% 65%;
    background-repeat: no-repeat;
    background-size: 16px;
    color: #bd574e;
  }

  .input-container {
    text-align: left;
    opacity: 1;
    transition: opacity 5s height 5s;
    display: inline-block;
    width: 100%;
  }

  input::placeholder {
    color: #bd574e;
  }

  .input-disappear {
    height: 0px;
    overflow: hidden;
    opacity: 0;
  }

  .checkboxes-container {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .radios-container {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  .text-area {
    margin-top: 10px;
  }

  .profile-pic-description {
    color: #bd574e;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .finish-container {
    text-align: center;
  }

  .finish-text {
    color: #bd574e;
  }

  .finish-emotes {
    font-size: 90px;
  }

  .progress-bar-container {
    margin-top: 20px;
  }

  .progress-bar {
    background-color: #bd574e;
  }

  .logout-container {
    text-align: center;
    margin-top: 10px;
  }
`;

class PageOnboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      displayIndex: 1,
      dorm: '',
      gender: '',
      harvardMIT: { Yes: false },
      lookingFor: '',
      lookingForGender: '',
      matchType: '',
      name: '',
      onboarded: true,
      year: '',
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = (name, response) => {
    const values = this.state[name];
    const bool = values ? !values[response] : true;
    const newValues = {
      ...values,
      [response]: bool,
    };
    this.setState({ [name]: newValues });
  };

  handleRadioChange = (name, response) => {
    this.setState({ [name]: response });
  };

  moveToNextInput = () => {
    this.setState({ displayIndex: this.state.displayIndex + 1 });
  };

  keyPressed = event => {
    const { key, target } = event;
    if (key === 'Enter') {
      event.preventDefault();
      if (target.value) {
        this.moveToNextInput();
      }
    }
  };

  handleButtonClick = event => {
    event.preventDefault();
    this.moveToNextInput();
  };

  checkDisplay = index => {
    return this.state.displayIndex === index
      ? 'input-container'
      : 'input-disappear';
  };

  finishOnboarding = event => {
    event.preventDefault();

    const { college, email, history, updateProfile } = this.props;
    const { harvardMIT, name } = this.state;
    const lowerCaseName = name.toLowerCase();

    updateProfile({
      ...this.state,
      college,
      displayIndex: null,
      email,
      harvardMIT:
        college === 'Harvard' || college === 'MIT' ? harvardMIT.Yes : null,
      isEmpty: null,
      isLoaded: null,
      last: lowerCaseName.split(' ').slice(-1)[0],
      searchMatches: 15,
      searchName: lowerCaseName,
      show: true,
    });
    history.push('/app');
  };

  render() {
    const {
      college,
      dorms,
      email,
      logoutUser,
      profile_pic,
      settings,
      updateProfile,
    } = this.props;

    if (!college) {
      return (
        <PageSchoolNotFound
          email={email}
          logoutUser={logoutUser}
          settings={settings}
        />
      );
    }

    const {
      description,
      displayIndex,
      dorm,
      gender,
      harvardMIT,
      lookingFor,
      lookingForGender,
      matchType,
      name,
      year,
    } = this.state;

    const numQuestions = college === 'Harvard' || college === 'MIT' ? 11 : 10;

    return (
      <div className="PageOnboard" css={pageOnboardStyle}>
        <div className="header">
          <div className="logo-container">
            <Logo />
          </div>
          <h1 className="header-text">Basic Info</h1>
          <div className="header-sub-text">You can update this anytime!</div>
        </div>
        <form className="form">
          <div className={this.checkDisplay(1)}>
            <div className="question">What is your name?</div>
            <Input
              className="onboard-input"
              handleInputChange={this.handleInputChange}
              keyPressed={this.keyPressed}
              placeholder="Type your answer here..."
              name="name"
              type="text"
              value={name}
            />
            <NextButton onClick={this.handleButtonClick} show={name}>
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(2)}>
            <div className="question">Which dorm do you live in?</div>
            <Select
              className="onboard-select"
              handleInputChange={this.handleInputChange}
              name="dorm"
              value={dorm}
              values={dorms}
              placeholder="Choose a dorm..."
            />
            <NextButton onClick={this.handleButtonClick} show={dorm}>
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(3)}>
            <div className="question">What year are you?</div>
            <Select
              className="onboard-select"
              handleInputChange={this.handleInputChange}
              name="year"
              placeholder="Choose a year..."
              value={year}
              values={[
                'First Year',
                'Sophomore',
                'Junior',
                'Senior',
                'Grad student',
              ]}
            />
            <NextButton onClick={this.handleButtonClick} show={year}>
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(4)}>
            <div className="question">What is your gender?</div>
            <div className="radios-container">
              <Radios
                handleClick={this.handleRadioChange}
                labels={[
                  'I identify as male',
                  'I identify as female',
                  'I identify as nonbinary',
                ]}
                name="gender"
                responses={['Male', 'Female', 'Nonbinary']}
                value={gender}
              />
            </div>
            <NextButton onClick={this.handleButtonClick} show={gender}>
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(5)}>
            <div>
              <div className="question">What gender are you looking for?</div>
              <div className="checkboxes-container">
                <Checkboxes
                  handleClick={this.handleCheckboxChange}
                  labels={[
                    'I want to be matched with males',
                    'I want to be matched with females',
                    'I want to be match with nonbinary people',
                  ]}
                  name="lookingForGender"
                  responses={['Male', 'Female', 'Nonbinary']}
                  values={lookingForGender}
                />
              </div>
            </div>
            <NextButton
              onClick={this.handleButtonClick}
              show={
                lookingForGender &&
                (lookingForGender['Male'] ||
                  lookingForGender['Female'] ||
                  lookingForGender['Nonbinary'])
              }
            >
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(6)}>
            <div className="question">
              What relationship are you looking for?
            </div>
            <div className="checkboxes-container">
              <Checkboxes
                handleClick={this.handleCheckboxChange}
                labels={['True love', 'Friendship']}
                name="lookingFor"
                responses={['true love', 'bestie']}
                values={lookingFor}
              />
            </div>
            <NextButton
              onClick={this.handleButtonClick}
              show={
                lookingFor && (lookingFor['true love'] || lookingFor['bestie'])
              }
            >
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(7)}>
            <div className="question">
              Are you looking to be matched with similar or different people?
            </div>
            <div className="radios-container">
              <Radios
                handleClick={this.handleRadioChange}
                labels={[
                  'I want to be matched with similar people to me',
                  'I want to be matched with different people to me',
                ]}
                name="matchType"
                responses={['similar', 'different']}
                value={matchType}
              />
            </div>
            <NextButton onClick={this.handleButtonClick} show={matchType}>
              OK <i className="fas fa-check" />
            </NextButton>
          </div>
          <div className={this.checkDisplay(8)}>
            <div className="question">
              A bit about yourself! (300 chars or less, optional)
            </div>
            <Textarea
              className="text-area"
              name="description"
              handleInputChange={this.handleInputChange}
              placeholder="Type your answer here..."
              rows="4"
              type="text"
              value={description}
            />
            <NextButton onClick={this.handleButtonClick} show={true}>
              NEXT
            </NextButton>
          </div>
          <div className={this.checkDisplay(9)}>
            <div className="profile-pic-description">
              Upload a profile picture (optional)
            </div>
            <div>
              <PicUpload
                name={email}
                original_pic={profile_pic}
                path="/profile_pics"
                size={200}
                updateURL={updateProfile}
              />
            </div>
            <NextButton onClick={this.handleButtonClick} show={true}>
              NEXT
            </NextButton>
          </div>
          {(college === 'Harvard' || college === 'MIT') && (
            <div className={this.checkDisplay(10)}>
              <div className="question">Harvard-MIT Matches (optional)</div>
              <div className="checkboxes-container">
                <Checkboxes
                  handleClick={this.handleCheckboxChange}
                  labels={['I want to opt in to cross Harvard-MIT matches!']}
                  name="harvardMIT"
                  responses={['Yes']}
                  values={harvardMIT}
                />
              </div>
              <NextButton onClick={this.handleButtonClick} show={true}>
                NEXT
              </NextButton>
            </div>
          )}
          <div className={this.checkDisplay(numQuestions)}>
            <div className="finish-container">
              <h1 className="finish-text">We're All Set!</h1>
              <div className="finish-emotes">{'🎉🎉🎉'}</div>
            </div>
            <button onClick={this.finishOnboarding}>START</button>
          </div>
          <div
            className="progress-bar-container"
            style={{
              display: displayIndex === numQuestions ? 'none' : 'block',
            }}
          >
            <ProgressBar now={(100 * displayIndex) / numQuestions} />
          </div>
          <br />
        </form>
        <div className="logout-container">
          <Link to="/" onClick={logoutUser}>
            Log Out
          </Link>
        </div>
      </div>
    );
  }
}

class NextButton extends Component {
  render() {
    const { children, onClick, show } = this.props;

    if (!show) {
      return null;
    }

    return (
      <button className="next-button" onClick={onClick}>
        {children}
      </button>
    );
  }
}

const mapStateToProps = (state, props) => {
  const email = state.firebase.auth.email;
  const { settings } = props;

  const suffix = email.split('@')[1];
  const college = settings.email_to_college[suffix];
  const dorms = settings.college_to_dorm[college] || [];

  return {
    college,
    dorms,
    email,
    logoutUser: props.firebase.logout,
    profile_pic: state.firebase.profile.profile_pic,
    updateProfile: props.firebase.updateProfile,
  };
};

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(PageOnboard);
