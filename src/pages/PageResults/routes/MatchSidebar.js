/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Loading from '../components/Loading';

const matchSidebarStyle = css`
  overflow-y: scroll;
  position: fixed;
  width: 361px;
  height: 100vh;
  right: 0px;
  bottom: 0px;
  background: #f3f2f2;
  padding-left: 20px;
  padding-top: 50px;

  @media (max-width: 650px) {
    height: calc(100vh - 58px);
  }

  @media (max-width: 500px) {
    width: 100%;
  }

  .user-image {
    width: 80px;
    height: 80px;
    background: url(${require('assets/loading.svg')});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .first-image {
    float: left;
    margin-right: 10px;
  }

  .heading {
    font-family: 'Apercu';
    font-size: 24px;
    line-height: 29px;
    color: #545353;
    margin-right: 20px;
  }

  .description {
    font-size: 16px;
    line-height: 19px;
    color: #545353;
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .close-button {
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

class MatchSidebar extends Component {
  componentDidUpdate() {
    const {
      firebase,
      matched,
      matchedUser,
      matchId,
      meUser,
      requested,
    } = this.props;

    if (!requested) {
      return;
    }

    if (!matched || !matched[meUser.id]) {
      firebase.update('/matches/' + matchId + '/matched', {
        [meUser.id]: true,
      });

      if (matched && matched[matchedUser.id]) {
        firebase.functions().httpsCallable('email-notifyMatched')({
          meUser,
          matchedUser,
          matchId,
        });
      }
    }
  }

  render() {
    const { close, matched, matchedUser, meUser, requested } = this.props;

    if (!requested) {
      return (
        <div css={matchSidebarStyle}>
          <Loading />
        </div>
      );
    }

    const bothMatched =
      matched && matched[matchedUser.id] && matched[meUser.id];

    return (
      <div css={matchSidebarStyle}>
        <i className="fas fa-times close-button" onClick={close} />
        <img
          alt="profile"
          className="user-image first-image"
          src={matchedUser.profile_pic || require('assets/empty.png')}
        />
        <img
          alt="profile"
          className="user-image"
          src={meUser.profile_pic || require('assets/empty.png')}
        />
        {bothMatched ? (
          <div>
            <div className="heading">
              YOU AND {matchedUser.name.split(' ')[0].toUpperCase()} MATCHED!
            </div>
            <div className="description">You guys can hang out and stuff.</div>
          </div>
        ) : (
          <div>
            <div className="heading">
              YOU MATCHED {matchedUser.name.split(' ')[0].toUpperCase()}!
            </div>
            <div className="description">
              You’ll both get notified if you match each other.
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, { matchId }) => {
  const { matched } = state.firebase.data;
  const { requested } = state.firebase;

  return {
    matched,
    requested: requested.matched,
  };
};

export default compose(
  firebaseConnect(({ matchId }) => [
    {
      path: `/matches/${matchId}/matched`,
      storeAs: 'matched',
    },
  ]),
  connect(mapStateToProps),
)(MatchSidebar);
