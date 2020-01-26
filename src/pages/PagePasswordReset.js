import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import AuthWrapper from '../components/AuthWrapper';
import Loading from '../components/Loading';

class PagePasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, message: '', sent: false };
  }

  onFormSubmit = async event => {
    event.preventDefault();

    const email = this.refs.email.value;
    this.setState({ loading: true });

    const { auth, loginPath } = this.props;

    try {
      await auth().sendPasswordResetEmail(email, {
        url: `${process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT}${loginPath}`,
      });
      this.setState({ loading: false, sent: true });
    } catch (error) {
      this.setState({ loading: false, message: error.message });
    }
  };

  renderForm = () => {
    const { loading, message, sent } = this.state;
    return (
      <div>
        <AuthWrapper portal={this.props.portal}>
          <form onSubmit={this.onFormSubmit}>
            <h1>Reset Password</h1>
            <br />
            {!sent ? (
              <div>
                <input placeholder="Email" ref="email" type="email" />
                <br />
                <br />
                {loading ? (
                  <Loading style={{ height: 50 }} />
                ) : (
                  <button type="submit">Reset</button>
                )}
                <br />
                {message && (
                  <div className="Warning">
                    <br />
                    {message}
                  </div>
                )}
                <br />
              </div>
            ) : (
              <div>
                Sent reset link! Check your email! <br />
                <br />
              </div>
            )}
          </form>
        </AuthWrapper>
      </div>
    );
  };

  onFormSubmitConfirm = async (event, oobCode, continueUrl) => {
    event.preventDefault();

    this.setState({ loading: true });
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    const { confirmPasswordReset, history } = this.props;

    let continuePath = '/login';
    if (continueUrl) {
      continuePath = continueUrl.split(
        process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      )[1];
    }

    if (password === confirmPassword) {
      try {
        await confirmPasswordReset(oobCode, password);
        alert('Password reset confirmed!');
        this.setState({ loading: false });
        history.push(continuePath);
      } catch (error) {
        this.setState({ loading: false, message: error.message });
      }
    } else {
      this.setState({ loading: false, message: 'Passwords do not match' });
    }
  };

  renderConfirm = (oobCode, continueUrl) => {
    const { loading, message } = this.state;

    return (
      <AuthWrapper portal={this.props.portal}>
        <form
          onSubmit={event =>
            this.onFormSubmitConfirm(event, oobCode, continueUrl)
          }
        >
          <h1>Reset Password</h1>
          <br />
          <input placeholder="Password" ref="password" type="password" />
          <br />
          <br />
          <input
            placeholder="Confirm Password"
            ref="confirmPassword"
            type="password"
          />
          <br />
          <br />
          {loading ? (
            <Loading style={{ height: 50 }} />
          ) : (
            <button type="submit">Reset</button>
          )}
          <br />
          {message && (
            <div className="Warning">
              <br />
              {message}
              <br />
            </div>
          )}
          <br />
        </form>
      </AuthWrapper>
    );
  };

  componentDidMount() {
    const { appPath, isLoggedIn, history } = this.props;
    if (isLoggedIn) {
      history.push(appPath);
    }
  }

  render() {
    const { location, loginPath, registerPath } = this.props;
    const { continueUrl, oobCode } = queryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    return (
      <div className="PagePasswordReset">
        {oobCode ? this.renderConfirm(oobCode, continueUrl) : this.renderForm()}
        <div className="AuthLinks">
          <Link to={loginPath}>Already have an account? Log in</Link>
          <br />
          <div style={{ height: 10 }} />
          <Link to={registerPath}>Create an account</Link>
          <br />
        </div>
      </div>
    );
  }
}

PagePasswordReset.defaultProps = {
  appPath: '/app',
  loginPath: '/login',
  registerPath: '/register',
};

function mapStateToProps(state, props) {
  const { auth, confirmPasswordReset } = props.firebase;
  return { auth, confirmPasswordReset, isLoggedIn: !!state.firebase.auth.uid };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(PagePasswordReset);
