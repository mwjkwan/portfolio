/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firestoreConnect,
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase';
import uuidv1 from 'uuid/v1';

import Header from '../components/Header';
import Loading from '../components/Loading';
import PicUpload from '../components/PicUpload';

const teamStyle = css`
  .description {
    font-family: Apercu-light;
    font-size: 16px;
    margin-bottom: 10px;
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

  .input-container {
    align-items: center;
    display: grid;
    grid-column-gap: 7px;
    grid-template-columns: 135px 300px 35px;
    grid-template-rows: 45px 45px 45px;
    grid-row-gap: 2px;
    margin-bottom: 10px;
  }

  .input {
    background: #f4f2f2;
    border: 0px;
    height: 40px;
  }

  .image-input {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 4;
  }

  .name-input {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  .position-input {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 3;
  }

  .phrase-input {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 3;
    grid-row-end: 4;
  }

  .remove-button {
    grid-column-start: 3;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
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
`;

class Team extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidUpdate() {
    const { team } = this.props;

    if (isLoaded(team) && this.state.loading) {
      this.setState({
        loading: false,
        teams: (team || {}).data || [],
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

  addInput = () => {
    // append empty string to end of array
    const empty = {
      image_url: '',
      name: '',
      phrase: '',
      position: '',
    };
    this.setState({ teams: [...this.state.teams.slice(), empty] });
  };

  removeInput = (index, inputs) => {
    const newInputs = inputs.slice();
    delete newInputs[index];
    this.setState({ teams: this.dictToArray(newInputs) });
  };

  editInput = (index, value, inputs, name) => {
    let newInputs = {
      ...inputs,
      [index]: {
        ...inputs[index],
        [name]: value,
      },
    };
    this.setState({ teams: this.dictToArray(newInputs) });
  };

  assignTeam = () => {
    const { school, updateBoard, updateTeam } = this.props;
    const { teams } = this.state;

    updateTeam({ data: teams });
    if (school === 'Harvard') {
      updateBoard({ boardMembers: teams });
    }

    alert('Team saved!');
  };

  render() {
    const { loading, teams } = this.state;
    const { school } = this.props;

    if (loading) {
      return (
        <div style={{ height: 200 }}>
          <Loading />
        </div>
      );
    }

    return (
      <div css={teamStyle}>
        <Header>TEAM</Header>
        <div className="description">
          For each team member, add a name, a square image, a position, and a
          30-character phrase (e.g. I'm feeling lucky). Make sure to hit Save
          Changes even with headshot/profile picture changes!
        </div>
        <div className="description">
          Team members will be displayed in the exact order shown below.
        </div>
        <InputList
          addInput={this.addInput}
          editInput={this.editInput}
          inputs={teams}
          removeInput={this.removeInput}
          school={school}
        />
        <button className="save-changes" onClick={this.assignTeam}>
          <i className="fas fa-check checkmark"></i>Save Changes
        </button>
      </div>
    );
  }
}

class InputList extends Component {
  onClick = () => {
    const { addInput, name } = this.props;
    addInput(name);
  };

  render() {
    let { inputs } = this.props;

    let dict = {};
    for (var i = 0; i < inputs.length; i++) {
      dict[i] = inputs[i];
    }

    return (
      <div>
        <div>
          {Object.keys(dict).map(index => (
            <Input index={index} inputs={dict} key={index} {...this.props} />
          ))}
        </div>
        <div className="round-button" onClick={this.onClick}>
          <i className="fas fa-plus button-symbol"></i>
        </div>
      </div>
    );
  }
}

class Input extends Component {
  onClick = () => {
    const { index, inputs, removeInput } = this.props;
    removeInput(index, inputs);
  };

  onChange = name => {
    return event => {
      const { editInput, index, inputs } = this.props;
      editInput(index, event.target.value, inputs, name);
    };
  };

  updateImage = img => {
    const { editInput, index, inputs } = this.props;
    editInput(index, img.profile_pic, inputs, 'image_url');
  };

  render() {
    const { index, inputs, school } = this.props;

    return (
      <div className="input-container">
        <div className="image-input">
          <PicUpload
            name={uuidv1()}
            original_pic={
              inputs[index].image_url || require('assets/empty.png')
            }
            path={'/team_pics/' + school}
            size={135}
            updateURL={this.updateImage}
          />
        </div>
        <input
          className="input name-input"
          onChange={this.onChange('name')}
          placeholder="Name"
          type="text"
          value={inputs[index].name}
        />
        <input
          className="input position-input"
          onChange={this.onChange('position')}
          placeholder="Position"
          type="text"
          value={inputs[index].position}
        />
        <input
          className="input phrase-input"
          maxLength="30"
          onChange={this.onChange('phrase')}
          placeholder="Phrase (max 30 chars)"
          type="text"
          value={inputs[index].phrase}
        />
        <div className="round-button remove-button" onClick={this.onClick}>
          <i className="fas fa-minus button-symbol"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    team: state.firestore.data.team,
    updateBoard: team =>
      props.firestore.update({ collection: 'settings', doc: 'config' }, team),
    updateTeam: team =>
      props.firestore.update(
        {
          collection: 'team',
          doc: props.school,
        },
        team,
      ),
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect(({ school }) => [
    {
      collection: 'team',
      doc: school,
      storeAs: 'team',
    },
  ]),
  connect(mapStateToProps),
)(Team);
