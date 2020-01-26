import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthWrapper from '../components/AuthWrapper';
import GoogleButton from '../components/GoogleButton';
import Loading from '../components/Loading';

class PageLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, message: '' };
  }

  onFormSubmit = event => {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;

    this.setState({ loading: true });

    this.props.loginUser({ email, password }).catch(error => {
      this.setState({ message: error.message, loading: false });
    });
  };

  loginWithProvider = provider => {
    this.setState({ loading: true });

    this.props.loginUser({ provider }).catch(error => {
      this.setState({ message: error.message, loading: false });
    });
  };

  componentDidMount() {
    const { isLoggedIn, history, redirectURL } = this.props;
    if (isLoggedIn) {
      history.push(redirectURL);
    }
  }

  render() {
    const { portal, registerPath, resetPath, title } = this.props;
    return (
      <div>
        <AuthWrapper portal={portal}>
          <form onSubmit={this.onFormSubmit}>
            <h1>{title}</h1>
            <br />
            <input placeholder="College email" ref="email" type="email" />
            <br />
            <br />
            <input placeholder="Password" ref="password" type="password" />
            <br />
            <br />
            {!this.state.loading ? (
              <div>
                <button type="submit">Log In</button>
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
                />
              </div>
            ) : (
              <Loading size={90} />
            )}
          </form>
        </AuthWrapper>
        <div className="AuthLinks">
          <Link to={registerPath}>Create an account</Link>
          <br />
          <div style={{ height: 10 }} />
          <Link to={resetPath}>Forgot password? Reset it here!</Link>
          <br />
        </div>
      </div>
    );
  }
}

PageLogin.propTypes = {
  loginUser: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

PageLogin.defaultProps = {
  redirectURL: '/app',
  registerPath: '/register',
  resetPath: '/reset',
};

function mapStateToProps(state, props) {
  return {
    isLoggedIn: !!state.firebase.auth.uid,
    loginUser: props.firebase.login,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(PageLogin);
