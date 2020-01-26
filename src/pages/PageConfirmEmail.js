import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

import AuthWrapper from '../components/AuthWrapper';
import Loading from '../components/Loading';

class PageConfirmEmail extends Component {
  constructor(props) {
    super(props);

    const { continueUrl, oobCode } = queryString.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });

    this.state = {
      continueUrl,
      error: '',
      loading: false,
      oobCode,
      resent: false,
      verfied: false,
    };
  }

  verifyEmail = async () => {
    const { auth, email, history, isLoggedIn } = this.props;
    const { continueUrl, oobCode } = this.state;

    let continuePath = '/app';
    if (continueUrl) {
      continuePath = continueUrl.split(
        process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      )[1];
    }

    if (oobCode) {
      this.setState({ error: 'Verifying your email...' });
      try {
        await auth().applyActionCode(oobCode);
        this.setState({ error: 'Verified!', verified: true });

        if (isLoggedIn) {
          history.push(continuePath);
          window.location.reload();
        }
      } catch (error) {
        this.setState({ error: error.message });
      }
    } else {
      this.setState({
        error: `A verification email has been sent to your email address, ${email}.`,
      });
    }
  };

  onClick = async () => {
    const { appPath, auth } = this.props;
    this.setState({ loading: true });

    try {
      await auth().currentUser.sendEmailVerification({
        url: `${process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT}${appPath}`,
      });
      this.setState({
        error: 'Verification email resent. Please check your inbox.',
        loading: false,
        resent: true,
      });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  renderButton = () => {
    const { appPath, isLoggedIn } = this.props;
    const { loading, resent, verified } = this.state;

    if (loading) {
      return <Loading size={64} />;
    }

    if (isLoggedIn && !resent) {
      return <button onClick={this.onClick}>Resend verification email</button>;
    }

    if (!isLoggedIn && verified) {
      return (
        <div>
          You're verified!{' '}
          <Link to={appPath} style={{ fontFamily: 'apercu', color: 'black' }}>
            Click here to get started!
          </Link>
        </div>
      );
    }
  };

  componentDidMount() {
    const {
      appPath,
      emailVerified,
      history,
      isLoggedIn,
      loginPath,
    } = this.props;

    if (!isLoggedIn && !this.state.oobCode) {
      history.push(loginPath);
    }

    if (isLoggedIn && emailVerified) {
      history.push(appPath);
    }

    this.verifyEmail();
  }

  render() {
    const { isLoggedIn, logoutUser, portal } = this.props;
    const { error, verified } = this.state;

    return (
      <div className="PageConfirmEmail">
        <AuthWrapper portal={portal}>
          <h1>Confirm Your Email</h1>
          <br />
          {!verified && <div>{error}</div>}
          <br />
          <br />
          {this.renderButton()}
          <br />
          <br />
        </AuthWrapper>

        {isLoggedIn && (
          <div
            onClick={logoutUser}
            style={{
              background: 'none',
              color: 'white',
              fontSize: 16,
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            Logout
          </div>
        )}
      </div>
    );
  }
}

PageConfirmEmail.defaultProps = {
  appPath: '/app',
  loginPath: '/login',
};

function mapStateToProps(state, props) {
  const { auth, logout } = props.firebase;
  const { email, emailVerified, uid } = state.firebase.auth;

  return {
    auth,
    email,
    emailVerified: emailVerified,
    isLoggedIn: !!uid,
    logoutUser: logout,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(PageConfirmEmail);
