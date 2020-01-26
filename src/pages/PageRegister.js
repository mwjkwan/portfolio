import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import AuthWrapper from '../components/AuthWrapper';
import GoogleButton from '../components/GoogleButton';
import Loading from '../components/Loading';

class PageRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: '',
    };
  }

  onFormSubmit = async event => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const confirmPassword = this.refs.confirmPassword.value;

    this.setState({ loading: true });

    const { auth, redirectURL, registerUser } = this.props;

    if (password === confirmPassword) {
      try {
        await registerUser({ email, password });
        await auth().currentUser.sendEmailVerification({
          url: `${process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT}${redirectURL}`,
        });
      } catch (error) {
        this.setState({ loading: false, message: error.message });
      }
    } else {
      this.setState({ loading: false, message: 'Passwords do not match' });
    }
  };

  loginWithProvider = provider => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch(error => {
      this.setState({ loading: false, message: error.message });
    });
  };

  componentDidMount() {
    const { isLoggedIn, history, redirectURL } = this.props;
    if (isLoggedIn) {
      history.push(redirectURL);
    }
  }

  render() {
    const { loginPath, portal, resetPath } = this.props;
    return (
      <div>
        <AuthWrapper portal={portal}>
          <form onSubmit={this.onFormSubmit}>
            <h1>Sign Up</h1>
            <br />
            <input placeholder="College email" ref="email" type="email" />
            <br />
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
            {!this.state.loading ? (
              <div>
                <button type="submit">Sign Up</button>
                <br />
                {this.state.message && (
                  <div className="Warning">
                    <br />
                    {this.state.message}
                  </div>
                )}
                <hr />
                <GoogleButton
                  onClick={() => this.loginWithProvider('google')}
                  text={'Sign up with Google'}
                />
              </div>
            ) : (
              <Loading size={90} />
            )}
          </form>
        </AuthWrapper>
        <div className="AuthLinks">
          <Link to={loginPath}>Already have an account? Log in</Link>
          <br />
          <div style={{ height: 10 }} />
          <Link to={resetPath}>Forgot password? Reset it here!</Link>
          <br />
        </div>
      </div>
    );
  }
}

PageRegister.defaultProps = {
  loginPath: '/login',
  redirectURL: '/app',
  resetPath: '/reset',
};

function mapStateToProps(state, props) {
  const { auth, createUser, login } = props.firebase;
  return {
    auth,
    isLoggedIn: !!state.firebase.auth.uid,
    loginUser: login,
    registerUser: createUser,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(PageRegister);
