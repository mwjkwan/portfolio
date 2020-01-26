/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

import Checkboxes from '../components/Checkboxes';
import Header from '../components/Header';
import Input from '../components/Input';
import PicUpload from '../components/PicUpload';
import Select from '../components/Select';
import SelectAutocomplete from '../components/SelectAutocomplete';
import Textarea from '../components/Textarea';

import { USTerritoryList, CountryList } from 'constants/Countries';

const pageProfileLayoutStyle = css`
  .profile-container {
    margin-top: 10px;
  }

  .profile-pic {
    float: left;
    margin-right: 10px;
  }

  .profile-input {
    text-align: left;
    width: 300px;
    height: 43px;
    margin-bottom: 9px;
    color: #545353;
    background: #f4f2f2;
    border: 0px;
  }

  .profile-select {
    background: #f4f2f2;
    background-image: url(https://image.flaticon.com/icons/svg/60/60781.svg);
    background-position: 95% 50%;
    background-repeat: no-repeat;
    background-size: 16px;
    border: 0px;
    width: 300px;
    height: 43px;
    margin-bottom: 9px;
    color: #545353;
  }

  .looking-for-select {
    width: 150px !important;
    margin-bottom: 0px !important;
  }

  .match-type-select {
    width: 170px !important;
    margin-bottom: 0px !important;
  }

  .gender-select {
    width: 120px !important;
    margin-bottom: 0px !important;
  }

  .looking-for-gender-select {
    width: 250px !important;
    margin-bottom: 0px !important;
  }

  .bottom-elements {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .question-header {
    font-family: Apercu;
    letter-spacing: 0.05em;
    margin-bottom: 0.1em;
  }

  .question-subheader {
    font-family: Apercu-Light;
    font-size: 12px;
    letter-spacing: 0.05em;
    margin-bottom: 1em;
  }

  .madlibs {
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
  }

  .madlibs > div {
    display: inline-block;
    margin-top: 0.3em;
    margin-right: 0.5em;
  }

  .profile-text-area {
    text-align: left;
    width: 300px;
    height: 75px;
    color: #545353;
    background: #f4f2f2;
    border: 0px;
  }

  .text-area-container {
    display: inline-block;
  }

  .save-button {
    margin-left: 210px;
    width: 300px;
  }

  .incomplete-message {
    margin-top: 5px;
    margin-left: 210px;
    color: red;
  }

  .react-toggle--checked .react-toggle-track {
    background-color: #bd574e;
  }

  .react-toggle--checked:hover:not(.react-toggle--disabled)
    .react-toggle-track {
    background-color: #6c2c2c;
  }

  .react-toggle--checked .react-toggle-thumb {
    border-color: #bd574e;
  }
`;

const mandatoryStateSelect = 'United States of America';

class PageProfile extends Component {
  constructor(props) {
    super(props);
    const {
      description,
      dorm,
      email,
      gender,
      lookingFor,
      lookingForGender,
      matchType,
      name,
      show,
      year,
      location,
    } = props.profile;

    let harvardMIT;
    if (props.profile.harvardMIT) {
      harvardMIT = { Yes: true };
    } else {
      harvardMIT = { Yes: false };
    }

    this.state = {
      description,
      dorm,
      email,
      gender,
      harvardMIT,
      lookingFor,
      lookingForGender,
      matchType,
      name,
      show,
      year,
      location,
    };
  }

  handleInputChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLocationChange = value => {
    const { location } = this.state;
    if (CountryList.includes(value)) {
      this.setState({ location: { country: value } });
    } else {
      this.setState({ location: { ...location, state: value } });
    }
  };

  handleOptionAsObject = event => {
    const { name, value } = event.target;
    const selected = value.split(',').reduce((result, item) => {
      result[item] = true;
      return result;
    }, {});
    console.log(selected);
    this.setState({ [name]: selected });
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

  handleToggleChange = () => {
    this.setState({ show: !this.state.show });
  };

  checkRequired = () => {
    const required = [
      'dorm',
      'gender',
      'matchType',
      'location',
      'name',
      'year',
    ];

    let completed = required.every(requirement => this.state[requirement]);

    const { lookingForGender, location } = this.state;
    const { Male, Female, Nonbinary } = lookingForGender || {};
    const lookingFor = this.state.lookingFor || {};

    const locationComplete =
      location && (location.country !== mandatoryStateSelect || location.state);

    // Using bracket notation as 'true love' is not a valid identifier
    const truelove = lookingFor['true love'];
    const bestie = lookingFor['bestie'];

    completed =
      completed &&
      locationComplete &&
      (Male || Female || Nonbinary) &&
      (truelove || bestie);

    return completed;
  };

  checkChanged = () => {
    const { profile } = this.props;
    const { Male, Female, Nonbinary } = this.state.lookingForGender || {};
    const lookingForGender = profile.lookingForGender || {};
    const lookingFor = profile.lookingFor || {};
    const lookingForState = this.state.lookingFor || {};

    const harvardMIT = profile.harvardMIT || false;
    const { Yes } = this.state.harvardMIT;

    // Using bracket notation as 'true love' is not a valid identifier
    const truelove = lookingForState['true love'];
    const bestie = lookingForState['bestie'];

    const needCheck = [
      'description',
      'dorm',
      'gender',
      'matchType',
      'name',
      'show',
      'year',
    ];

    let same = needCheck.every(input => this.state[input] === profile[input]);

    // ^ is XOR. We need it to deal with undefined === false cases.
    same =
      same &&
      !(Male ^ lookingForGender['Male']) &&
      !(Female ^ lookingForGender['Female']) &&
      !(Nonbinary ^ lookingForGender['Nonbinary']) &&
      !(truelove ^ lookingFor['true love']) &&
      !(bestie ^ lookingFor['bestie']) &&
      harvardMIT === Yes;

    return same;
  };

  saveProfile = () => {
    if (this.checkRequired()) {
      const { college, updateProfile } = this.props;
      const lowerCaseName = this.state.name.toLowerCase();
      const { harvardMIT, show } = this.state;

      updateProfile({
        ...this.state,
        harvardMIT:
          college === 'Harvard' || college === 'MIT'
            ? harvardMIT && harvardMIT.Yes
            : null,
        last: show ? lowerCaseName.split(' ').slice(-1)[0] : null,
        searchName: show ? lowerCaseName : null,
      });
      alert('Info saved!');
    }
  };

  // Parses object like {'true love': true, 'bestie': false} as 'true love'
  parseObject = obj => {
    const result = Object.keys(obj)
      .filter(key => obj[key] === true)
      .join();
    console.log(result);
    return result;
  };

  render() {
    const { college, email, profile_pic, updateProfile } = this.props;
    const { location } = this.state;

    var filled = this.checkRequired();
    var changed = this.checkChanged();

    const lookingForSelect = this.parseObject(this.state.lookingFor);
    const lookingForGenderSelect = this.parseObject(
      this.state.lookingForGender,
    );

    const showStateSelect =
      location && location.country === mandatoryStateSelect;

    return (
      <div className="PageProfile" css={pageProfileLayoutStyle}>
        <Header>PROFILE</Header>
        <br />
        <div className="profile-container">
          <div>
            <div className="profile-pic">
              <PicUpload
                name={email}
                original_pic={profile_pic}
                path="/profile_pics"
                size={200}
                updateURL={updateProfile}
              />
            </div>
            <Input
              className="profile-input"
              handleInputChange={this.handleInputChange}
              name="name"
              placeholder="Your name"
              type="text"
              value={this.state.name || ''}
            />
            <Select
              className="profile-select"
              handleInputChange={this.handleInputChange}
              name="dorm"
              placeholder="Dorm"
              value={this.state.dorm}
              values={this.props.dorms}
            />
            <Select
              className="profile-select"
              handleInputChange={this.handleInputChange}
              name="year"
              placeholder="Year"
              value={this.state.year}
              values={[
                'First Year',
                'Sophomore',
                'Junior',
                'Senior',
                'Grad student',
              ]}
            />
            <div className="text-area-container">
              <Textarea
                className="profile-text-area"
                handleInputChange={this.handleInputChange}
                name="description"
                placeholder="Write a bit about yourself!"
                rows={2}
                type="text"
                value={this.state.description}
              />
            </div>
            <div className="bottom-elements">
              <div className="question-header">
                WHAT DO YOU WANT FROM DATAMATCH? (BE HONEST.)
              </div>
              <div className="question-subheader">
                Read our <a href="/app/gender_policy">gender policy.</a>
              </div>
              <div className="madlibs">
                <div>I'm looking for</div>
                <Select
                  className="profile-select looking-for-select"
                  handleInputChange={this.handleOptionAsObject}
                  name="lookingFor"
                  placeholder="Select"
                  value={lookingForSelect}
                  labels={['love', 'friendship', 'anything, really']}
                  values={['true love', 'bestie', 'true love,bestie']}
                />
                <div>with someone who is</div>
                <Select
                  className="profile-select match-type-select"
                  handleInputChange={this.handleInputChange}
                  name="matchType"
                  placeholder="Select"
                  value={this.state.matchType}
                  labels={['similar to me', 'different from me']}
                  values={['similar', 'different']}
                />
              </div>
              <div className="madlibs">
                <div>I identify as</div>
                <Select
                  className="profile-select gender-select"
                  handleInputChange={this.handleInputChange}
                  name="gender"
                  placeholder="Select"
                  value={this.state.gender}
                  labels={['male', 'female', 'nonbinary']}
                  values={['Male', 'Female', 'Nonbinary']}
                />
                <div>and I want to be matched with</div>
                <Select
                  className="profile-select looking-for-gender-select"
                  handleInputChange={this.handleOptionAsObject}
                  name="lookingForGender"
                  placeholder="Select"
                  value={lookingForGenderSelect}
                  labels={[
                    'males',
                    'females',
                    'nonbinary people',
                    'males & females',
                    'males & nonbinary people',
                    'females & nonbinary people',
                    'people of any gender',
                  ]}
                  values={[
                    'Male',
                    'Female',
                    'Nonbinary',
                    'Male,Female',
                    'Male,Nonbinary',
                    'Female,Nonbinary',
                    'Male,Female,Nonbinary',
                  ]}
                />
              </div>
              <div className="bottom-elements">
                <div className="question-header">WHERE DO YOU CALL HOME?</div>
                <div className="question-subheader">
                  Our stats team is visualizing the home countries of all
                  Datamatch participants. Check out their work{' '}
                  <a href="/app/stats">here.</a>
                </div>
                <SelectAutocomplete
                  className="profile-select"
                  placeholder="Type Home Country"
                  name="country"
                  value={this.state.location ? this.state.location.country : ''}
                  handleInputChange={this.handleLocationChange}
                  itemsData={CountryList}
                />
                {showStateSelect && (
                  <SelectAutocomplete
                    className="profile-select"
                    placeholder="Type Home State"
                    name="state"
                    value={this.state.location ? this.state.location.state : ''}
                    itemsData={USTerritoryList}
                    handleInputChange={this.handleLocationChange}
                  />
                )}
              </div>
            </div>
            {(college === 'Harvard' || college === 'MIT') && (
              <div className="bottom-elements">
                <div className="question-header">HARVARD-MIT MATCHES</div>
                <Checkboxes
                  handleClick={this.handleCheckboxChange}
                  labels={['I want to opt in to cross Harvard-MIT matches!']}
                  name="harvardMIT"
                  responses={['Yes']}
                  values={this.state.harvardMIT}
                />
              </div>
            )}
            <div className="bottom-elements">
              <div className="question-header">SHOW IN SEARCH</div>
              <Toggle
                defaultChecked={this.state.show}
                onChange={this.handleToggleChange}
              />
            </div>
          </div>
          <br />
          <div className="save-button">
            <button
              onClick={this.saveProfile}
              style={{
                opacity: filled ? 1 : 0.8,
                margin: '0 auto',
              }}
            >
              Save Changes
            </button>
          </div>
          {!filled && (
            <div className="incomplete-message">
              Please fully complete profile before saving.
            </div>
          )}
          {!changed && (
            <div className="incomplete-message">You have unsaved changes.</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    email: state.firebase.auth.email,
    profile: state.firebase.profile,
    profile_pic: state.firebase.profile.profile_pic,
    updateProfile: props.firebase.updateProfile,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PageProfile);
