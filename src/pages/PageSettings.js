/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import Modal from 'react-bootstrap/Modal';

import Header from '../components/Header';
import Input from '../components/Input';
import PasswordReset from '../components/PasswordReset';

const pageSettingsStyle = css`
  button {
    width: 300px;
  }

  .Box {
    padding: 20px;
    border: 1px solid #f3f3f3;
  }
`;

class PageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      show: false,
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onClick = async providerId => {
    if (providerId === 'password') {
      this.setState({ show: true });
    } else if (providerId === 'google.com') {
      const { auth, firebase } = this.props;
      const currentUser = auth().currentUser;
      const provider = new firebase.auth.GoogleAuthProvider();
      let credential;

      // get credentials
      await auth()
        .signInWithPopup(provider)
        .then(result => {
          credential = result.credential;
        })
        .catch(() => alert('Reauthentication failed.'));

      // reauthenticate with credential
      currentUser
        .reauthenticateWithCredential(credential)
        .then(() => this.setState({ show: true }))
        .catch(() => alert('Reauthentication failed.'));
    }
  };

  deleteUser = async providerId => {
    const { deleteUser, reauthenticate } = this.props;
    if (providerId === 'password') {
      reauthenticate(this.state.password)
        .then(() => {
          deleteUser();
          alert('Account Deleted :(');
        })
        .catch(() => {
          alert('Incorrect password');
          this.setState({ password: '' });
        });
    } else if (providerId === 'google.com') {
      deleteUser();
      alert('Account Deleted :(');
    }
  };

  render() {
    const { auth, email, reauthenticate, resetPassword } = this.props;
    const { password, show } = this.state;
    const currentUser = auth().currentUser;
    const providerId = currentUser.providerData[0].providerId;

    return (
      <div className="PageSettings" css={pageSettingsStyle}>
        <Header>SETTINGS</Header>
        <br />
        <div className="Box">
          <div>
            <h5>Email</h5>
            <div>{email}</div>
          </div>
          {providerId === 'password' && (
            <PasswordReset
              auth={auth}
              reauthenticate={reauthenticate}
              resetPassword={resetPassword}
            />
          )}
        </div>
        <br />
        <div className="Box">
          <h5>Delete Account</h5>
          <br />
          <button onClick={() => this.onClick(providerId)}>
            Delete Your Account
          </button>
        </div>
        <br />

        <Modal onHide={() => this.setState({ show: false })} show={show}>
          <Modal.Body style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 22 }}>
              Are you sure you want to delete your account? You will lose your
              survey results and matches.
            </div>
            <br />
            <br />
            {providerId === 'password' ? (
              <div>
                <Input
                  handleInputChange={this.handleInputChange}
                  name="password"
                  placeholder="Confirm your password to delete account"
                  type="password"
                  value={password}
                />
                <br />
              </div>
            ) : null}
            <button onClick={() => this.deleteUser(providerId)}>
              I'm sure. Delete my account.
            </button>
            <br />
            <br />
            <div
              onClick={() => this.setState({ show: false, password: '' })}
              style={{ cursor: 'pointer' }}
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
  const { auth, logout, ref, resetPassword } = props.firebase;
  const { email, uid } = state.firebase.auth;
  const user = auth().currentUser;

  return {
    auth,
    deleteUser: () => {
      ref(`/users/${uid}`).remove();
      user.delete();
      logout();
    },
    email,
    profile: state.firebase.profile,
    reauthenticate: password => {
      const credential = auth.EmailAuthProvider.credential(email, password);
      return user.reauthenticateWithCredential(credential);
    },
    resetPassword,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PageSettings);
