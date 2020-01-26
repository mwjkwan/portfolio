/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Modal from 'react-bootstrap/Modal';

import Loading from '../components/Loading';
import { generateCode, wait } from 'utils/helpers';
import Dates from './Dates';

const rightSidebarStyle = css`
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

  .heading {
    font-family: 'Apercu';
    font-size: 24px;
    line-height: 29px;
    color: #545353;
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

  .description {
    font-size: 16px;
    line-height: 19px;
    color: #545353;
    margin-bottom: 10px;
    margin-right: 20px;
  }

  .description-bold {
    font-family: Apercu;
  }

  .submit-button {
    width: auto;
    height: 30px;
    padding-right: 10px;
    padding-left: 10px;
    font-family: Apercu;
    font-size: 14px;
    letter-spacing: 0.145em;
    text-decoration-line: underline;
    color: #fffbfb;
    margin-top: 10px;
  }

  .bottom-description {
    margin-top: 10px;
    font-size: 16px;
    line-height: 19px;
    margin-right: 20px;
  }

  .box-container {
    float: left;
    margin-right: 15px;
  }

  .box {
    float: left;
    margin-right: 5px;
    margin-top: 3.5px;
    width: 17px;
    height: 17px;
  }

  .box1 {
    background: #e9c8c5;
  }

  .box2 {
    background: #d3908a;
  }

  .box3 {
    background: #ffad87;
  }

  .key {
    margin-bottom: 10px;
  }

  .date {
    text-align: left;
    width: 155px;
    height: 32px;
    margin-bottom: 12px;
    margin-right: 12px;
    border: 2px solid #4f5262;
    font-family: Apercu;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.145em;
    color: #4f5262;
    background: #f9a9a5;
  }

  .code {
    color: #4f5262;
    font-weight: bold;
    font-size: 1.2rem;
    text-decoration: underline;
  }

  .cancel {
    text-decoration: underline;
    font-weight: bold;
    cursor: pointer;
  }

  .close-button {
    font-size: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const rightSidebarModalStyle = css`
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

class RightSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cancellingDate: false,
      claimingDate: false,
      filled: false,
      show: false,
    };
  }

  async componentDidUpdate() {
    const { code, date, firebase, requested } = this.props;
    const { cancellingDate, claimingDate } = this.state;

    if (claimingDate || cancellingDate) {
      return;
    }

    if (!requested) {
      return;
    }

    if (date !== this.state.date) {
      if (date) {
        const dateSnapshot = await firebase.ref(`/dates/${date}`).once('value');
        const dateInformation = dateSnapshot.val();
        this.setState({ date, dateInformation });
      } else {
        this.setState({ date });
      }
    }

    if (code !== this.state.code) {
      this.setState({ code });
    }
  }

  changeFinalized = finalized => {
    const { firebase, matchId, meUser } = this.props;
    firebase.update(`/matches/${matchId}/finalized`, {
      [meUser.id]: finalized,
    });
    this.setState({ dateId: null });
  };

  setDateId = dateId => this.setState({ dateId });

  setFilled = filled => this.setState({ filled });

  claimFirebase = async () => {
    const { dateId } = this.state;
    const { firebase, matchId, matchedUser, meUser } = this.props;

    const dateSnapshot = await firebase
      .ref(`dates/${dateId}/datesAvailable`)
      .once('value');
    const datesAvailable = dateSnapshot.val();

    let updates = {};
    const code = generateCode();
    updates[`/matches/${matchId}/date`] = dateId;
    updates[`/matches/${matchId}/code`] = code;
    updates[`/dates/${dateId}/datesAvailable`] = datesAvailable - 1;
    updates[`/dates/${dateId}/claimingMatch`] = matchId;
    updates[`/codes/${code}/date`] = dateId;
    updates[`/codes/${code}/match`] = matchId;

    await firebase.ref().update(updates);
    firebase.functions().httpsCallable('email-dateConfirmation')({
      code,
      dateId,
      matchId,
      meUser,
      matchedUser,
    });
  };

  claimDate = async () => {
    const { dateId } = this.state;

    if (!dateId) {
      return;
    }

    this.setState({ claimingDate: true });

    let success = false;
    for (let i = 0; i < 5; ++i) {
      try {
        await this.claimFirebase();
        success = true;
        break;
      } catch (e) {
        if (e.code !== 'PERMISSION_DENIED') {
          alert(e.toString());
          break;
        }
      }

      await wait(300);
    }

    if (!success) {
      alert('Failed to redeem date. Please refresh the page and try again.');
    } else {
      this.setState({ dateId: null });
    }

    this.setState({ claimingDate: false });
  };

  cancelFirebase = async () => {
    const { code, date, firebase, matchId, matchedUser, meUser } = this.props;

    const dateSnapshot = await firebase
      .ref(`dates/${date}/datesAvailable`)
      .once('value');
    const datesAvailable = dateSnapshot.val();

    let updates = {};
    updates[`/matches/${matchId}/date`] = null;
    updates[`/matches/${matchId}/code`] = null;
    updates[`/dates/${date}/datesAvailable`] = datesAvailable + 1;
    updates[`/dates/${date}/cancellingMatch`] = matchId;
    updates[`/codes/${code}/date`] = null;
    updates[`/codes/${code}/match`] = null;

    await firebase.ref().update(updates);
    firebase.functions().httpsCallable('email-dateCancellation')({
      meUser,
      matchedUser,
      matchId,
    });
  };

  cancelDate = async () => {
    const { code, date } = this.props;

    if (!date || !code) {
      alert('Date or code not found. Cannot cancel date!');
      return;
    }

    this.setState({ cancellingDate: true, show: false });

    let success = false;
    for (let i = 0; i < 5; ++i) {
      try {
        await this.cancelFirebase();
        success = true;
        break;
      } catch (e) {
        if (e.code !== 'PERMISSION_DENIED') {
          alert(e.toString());
          break;
        }
      }

      await wait(300);
    }

    if (!success) {
      alert('Failed to cancel date. Please refresh the page and try again.');
    }

    this.setState({ cancellingDate: false });
  };

  renderHeader = () => {
    const { meFinalized, otherFinalized } = this.props;
    const { date } = this.state;

    if (!meFinalized || !otherFinalized) {
      return <div className="heading">SCHEDULE FREE DATE</div>;
    }

    if (!date) {
      return <div className="heading">REDEEM YOUR DATE</div>;
    }

    return <div className="heading">YOU’RE ALL SET!</div>;
  };

  renderDescription = (name, otherName) => {
    const { meFinalized, otherFinalized } = this.props;
    const { code, date } = this.state;

    if (!meFinalized) {
      return (
        <div className="description">
          You’re eligible to redeem a free date with your top two matches.
          <br /> <br />
          <span className="description-bold">WHO: </span>
          {otherName} and {name} <br></br>
          <span className="description-bold">WHEN + WHERE: </span>Select when
          you're free
        </div>
      );
    }

    if (meFinalized && !otherFinalized) {
      return (
        <div className="description">
          <i>{otherName} hasn't submitted availability yet.</i>
        </div>
      );
    }

    if (!date) {
      return (
        <div className="description">
          Once you press "redeem code," you’ll get an email that you can show at
          the register to redeem your free date.
          <br />
          <br />
          Happy matching!
        </div>
      );
    }

    const { dateInformation } = this.state;
    if (!dateInformation) {
      return <Loading />;
    }
    const { day, place } = dateInformation;

    return (
      <div className="description">
        <br />
        <button className="date">
          {place.toUpperCase()} {day}
        </button>
        <br />
        <p className="code">CODE: {code}</p>
      </div>
    );
  };

  renderKey = () => {
    const { matchedUser, meFinalized, otherFinalized } = this.props;
    if (!meFinalized || !otherFinalized) {
      return (
        <div className="key">
          <div className="box-container">
            <div className="box box1" /> You
          </div>
          <div className="box-container">
            <div className="box box2" />
            {matchedUser.name.split(' ')[0]}
          </div>
          <div>
            <div className="box box3" />
            Both
          </div>
        </div>
      );
    }
  };

  confirm = () => this.setState({ show: true });

  renderBottomElements = () => {
    const { email, meFinalized, otherFinalized } = this.props;
    const { claimingDate, cancellingDate, date, dateId, filled } = this.state;

    if (!meFinalized) {
      return (
        <div className="description">
          <button
            className="submit-button"
            onClick={() => (filled ? this.changeFinalized(true) : null)}
            style={{ background: filled ? '#bd574e' : '#6e6973' }}
          >
            SUBMIT AVAILABILITY
          </button>
          <div className="bottom-description">
            Once you both submit, you’ll be able to redeem a code for a time you
            can both make!
          </div>
        </div>
      );
    }

    if (meFinalized && !otherFinalized) {
      return null;
    }

    if (!date) {
      return claimingDate ? (
        <Loading />
      ) : (
        <div className="bottom-description">
          <button
            className="submit-button"
            onClick={this.claimDate}
            style={{ background: dateId ? '#bd574e' : '#6e6973' }}
          >
            REDEEM CODE
          </button>
          <br />
          <br />
          <div className="cancel" onClick={() => this.changeFinalized(false)}>
            Change your availability
          </div>
          <br />
          (Codes must be redeemed online here before{' '}
          <b>
            <u>5am</u>
          </b>{' '}
          the day of the actual date.)
        </div>
      );
    }

    const { dateInformation } = this.state;
    if (!dateInformation) {
      return <Loading />;
    }
    const now = new Date().getTime();
    const { unix } = dateInformation;

    return (
      <div className="bottom-description">
        Your verification code has also been sent to {email}.
        <br />
        <br />
        Present your code at the cashier to redeem your date. Dates can be
        cancelled anytime before{' '}
        <b>
          <u>5am</u>
        </b>{' '}
        the day of the actual date.
        <br />
        <br />
        {cancellingDate ? (
          <Loading />
        ) : now < unix ? (
          <div className="cancel" onClick={this.confirm}>
            Cancel date
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const {
      close,
      involvedSchools,
      matchedUser,
      matchId,
      meFinalized,
      meUser,
      otherFinalized,
      requested,
    } = this.props;
    const otherUid = matchedUser.id;
    const { claimingDate, date, dateId, show } = this.state;

    if (!requested) {
      return (
        <div css={rightSidebarStyle}>
          <Loading />
        </div>
      );
    }

    return (
      <div css={rightSidebarStyle}>
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

        {this.renderHeader()}
        {this.renderDescription(meUser.name, matchedUser.name)}
        {this.renderKey()}

        {!date && (
          <Dates
            claimingDate={claimingDate}
            involvedSchools={involvedSchools}
            dateId={dateId}
            matchId={matchId}
            meFinalized={meFinalized}
            otherFinalized={otherFinalized}
            otherUid={otherUid}
            setDateId={this.setDateId}
            setFilled={this.setFilled}
            uid={meUser.id}
          />
        )}

        {this.renderBottomElements()}

        <Modal
          css={rightSidebarModalStyle}
          onHide={() => this.setState({ show: false })}
          show={show}
        >
          <Modal.Body className="modal-container">
            <div className="modal-question">
              Are you sure you want to cancel your date? You will lose your
              spot, and you and your match will both receive a cancellation
              email. You will be able to reschedule.
            </div>
            <br />
            <button onClick={this.cancelDate}>Yes, cancel</button>
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { code, date, finalized } = state.firebase.data;
  const { auth, requested } = state.firebase;
  const { matchedUser, meUser } = props;

  return {
    code,
    date,
    email: auth.email,
    finalized,
    meFinalized: (finalized || {})[meUser.id],
    otherFinalized: (finalized || {})[matchedUser.id],
    requested: requested.code && requested.date && requested.finalized,
  };
};

export default compose(
  firebaseConnect(({ matchId }) => [
    {
      path: `/matches/${matchId}/code`,
      storeAs: 'code',
    },
    {
      path: `/matches/${matchId}/date`,
      storeAs: 'date',
    },
    {
      path: `/matches/${matchId}/finalized`,
      storeAs: 'finalized',
    },
  ]),
  connect(mapStateToProps),
)(RightSidebar);
