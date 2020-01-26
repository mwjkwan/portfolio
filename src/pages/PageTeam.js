/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  firestoreConnect,
  firebaseConnect,
  isLoaded,
} from 'react-redux-firebase';
import { Collapse } from 'react-bootstrap';

import Header from '../components/Header';
import Loading from '../components/Loading';
import arrowright from 'assets/arrowright.png';
import arrowdown from 'assets/arrowdown.png';

const pageTeamStyle = css`
  .image-container {
    position: relative;
    float: left;
    margin-left: 5px;
    margin-bottom: 5px;
  }

  .team-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }

  .image-hover {
    position: absolute;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    background: white;
    height: 200px;
    width: 200px;

    &:hover {
      opacity: 0.8;
    }
  }

  .overlay-text-container {
    text-align: center;
  }

  .overlay-text {
    display: block;
    margin-bottom: 5px;
  }

  button {
    background: none;
    border: none;
    box-shadow: none;
    outline: none;
    color: #545353;
    cursor: pointer;
    text-align: left;
    font-family: 'apercu';
    font-size: 1.25rem;
  }

  .closedTab {
    &:before {
      background-image: url(${arrowright});
      background-size: 13px 20px;
      background-repeat: no-repeat;
      background-position: left center;
      display: inline-block;
      width: 30px;
      height: 15px;
      content: '';
    }
  }

  .openTab {
    color: #bd574e !important;
    &:before {
      background-image: url(${arrowdown});
      background-size: 20px 13px;
      background-repeat: no-repeat;
      background-position: left center;
      display: inline-block;
      width: 30px;
      height: 15px;
      content: '';
    }
  }
`;

class PageTeam extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, showBoard: false };
  }

  componentDidUpdate() {
    const { team } = this.props;

    if (isLoaded(team) && this.state.loading) {
      this.setState({
        loading: false,
        team: (team || {}).data || [],
      });
    }
  }

  renderMember = (member, index) => (
    <div className="image-container" key={index}>
      <img
        alt="teamPic"
        className="team-image"
        src={member.image_url || require('assets/empty.png')}
      />
      <div className="image-hover">
        <div className="overlay-text-container">
          <div className="overlay-text">{member.name}</div>
          <div className="overlay-text">{member.position}</div>
          <div className="overlay-text">{member.phrase}</div>
        </div>
      </div>
    </div>
  );

  renderBoard = boardMembers => (
    <div>
      <button
        className={this.state.showBoard ? 'openTab' : 'closedTab'}
        onClick={() => this.setState({ showBoard: !this.state.showBoard })}
      >
        Datamatch Board
      </button>
      <Collapse in={this.state.showBoard}>
        <div>
          {boardMembers.map((member, index) =>
            this.renderMember(member, index),
          )}
        </div>
      </Collapse>
    </div>
  );

  render() {
    const { boardMembers, college } = this.props;
    const { loading, team } = this.state;

    if (loading) {
      return (
        <div style={{ height: 200 }}>
          <Loading />
        </div>
      );
    }

    return (
      <div css={pageTeamStyle}>
        <Header>Team</Header>
        <div>
          <h5>{college}</h5>
          {team.map((member, index) => this.renderMember(member, index))}
          {college !== 'Harvard' && this.renderBoard(boardMembers)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    team: state.firestore.data.team,
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect(props => [
    {
      collection: 'team',
      doc: props.college,
      storeAs: 'team',
    },
  ]),
  connect(mapStateToProps),
)(PageTeam);
