/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firestoreConnect,
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase';

import Input from '../components/Input';
import Loading from '../components/Loading';
import InputList from './InputList';

const profileStyle = css`
  p {
    font-size: 18px;
    font-family: Apercu;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0.05em;
  }

  .nodescription {
    margin-bottom: 10px;
  }

  .description {
    font-size: 16px;
    font-family: Apercu-light;
    margin-bottom: 10px;
  }

  .inputcontainer {
    display: table;
  }

  .input {
    width: 300px;
    height: 40px;
    background: #f4f2f2;
    border: 0px;
    margin-bottom: 5px;
    margin-right: 10px;
  }

  .buttonsymbol {
    line-height: 29px;
  }

  .roundbutton {
    height: 35px;
    width: 35px;
    border: 3px solid #bd574e;
    border-radius: 50%;
    display: inline-block;
    background: rgba(249, 198, 195, 0.8);
    color: #bd574e;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
  }

  .savechanges {
    background: #bd574e;
    color: #ffffff;
    font-family: Apercu;
    font-size: 18px;
    width: 170px;
    height: 38px;
    letter-spacing: 0.05em;
    align-items: center;
    margin-top: 20px;
  }

  .checkmark {
    margin-right: 4px;
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidUpdate() {
    const { school, settings } = this.props;

    if (isLoaded(settings) && this.state.loading) {
      const { college_to_dorm, email_to_college, names } = settings;

      this.setState({
        dorms: college_to_dorm[school] || [],
        emails:
          Object.keys(email_to_college).filter(
            email => email_to_college[email] === school,
          ) || [],
        loading: false,
        name: names[school] || '',
        settings,
      });
    }
  }

  dictToArray = dict => {
    let newArray = [];
    for (var key in dict) {
      newArray.push(dict[key]);
    }
    return newArray;
  };

  addInput = name => {
    // append empty string to end of array
    this.setState({ [name]: [...this.state[name].slice(), ''] });
  };

  removeInput = (index, inputs, name) => {
    const newInputs = inputs.slice();
    delete newInputs[index];
    this.setState({ [name]: this.dictToArray(newInputs) });
  };

  editInput = (index, value, inputs, name) => {
    inputs[index] = value;
    this.setState({ [name]: this.dictToArray(inputs) });
  };

  assignSettings = () => {
    const { school, updateSettings } = this.props;
    const { settings, name } = this.state;
    const { college_to_dorm, email_to_college, names } = settings;

    const emails = this.state.emails.filter(email => {
      return email !== '';
    });

    const dorms = this.state.dorms.filter(dorm => {
      return dorm !== '';
    });

    // reject this school's emails to override
    let emailsDict = Object.keys(email_to_college).reduce((map, email) => {
      if (email_to_college[email] !== school) {
        map[email] = email_to_college[email];
      }
      return map;
    }, {});

    emailsDict = emails.reduce((map, email) => {
      map[email] = school;
      return map;
    }, emailsDict);

    let newSettings = {
      ...settings,
      college_to_dorm: {
        ...college_to_dorm,
        [school]: dorms,
      },
      email_to_college: emailsDict,
      names: {
        ...names,
        [school]: name,
      },
    };

    updateSettings(newSettings);
    alert('Config saved!');
  };

  onNameInputChange = e => this.setState({ name: e.target.value });

  render() {
    const { dorms, emails, loading, name } = this.state;

    if (loading) {
      return (
        <div style={{ height: 200 }}>
          <Loading />
        </div>
      );
    }

    return (
      <div css={profileStyle}>
        <Header>SCHOOL</Header>
        <p className="nodescription">Informal School Name (e.g. Harvard)</p>
        <Input
          className="input"
          handleInputChange={this.onNameInputChange}
          placeholder="Name"
          type="text"
          value={name}
        />

        <br />

        <p className="nodescription">Valid Email Suffix</p>
        <InputList
          addInput={this.addInput}
          editInput={this.editInput}
          inputs={emails}
          name="emails"
          removeInput={this.removeInput}
        />

        <br />

        <p>Dorms</p>
        <div className="description">Add your dorm names here!</div>
        <InputList
          addInput={this.addInput}
          editInput={this.editInput}
          inputs={dorms}
          name="dorms"
          removeInput={this.removeInput}
        />

        <button className="savechanges" onClick={this.assignSettings}>
          <i className="fas fa-check checkmark"></i>Save Changes
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    settings: state.firestore.data.config,
    updateSettings: settings => {
      props.firestore.update(
        {
          collection: 'settings',
          doc: 'config',
        },
        settings,
      );
    },
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect(() => [
    {
      collection: 'settings',
      doc: 'config',
      storeAs: 'config',
    },
  ]),
  connect(mapStateToProps),
)(Profile);
