import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route, Switch } from 'react-router-dom';

import PageConfirmEmail from 'pages/PageConfirmEmail';
import PageLogin from 'pages/PageLogin';
import PageRegister from 'pages/PageRegister';
import PagePasswordReset from 'pages/PagePasswordReset';

import PageApp from './App';

class RestaurantPortal extends Component {
  render() {
    const prefix = '/restaurant';
    const loginPath = `${prefix}/login`;
    const registerPath = `${prefix}/register`;
    const resetPath = `${prefix}/reset`;
    const { emailVerified, isLoggedIn } = this.props;

    return (
      <div className="PageRestaurantRoot">
        <Switch>
          <Route
            exact
            path={loginPath}
            component={() => (
              <PageLogin
                portal={prefix}
                redirectURL={prefix}
                registerPath={registerPath}
                resetPath={resetPath}
                title="Restaurant Portal"
              />
            )}
          />
          <Route
            exact
            path={registerPath}
            component={() => (
              <PageRegister
                loginPath={loginPath}
                portal={prefix}
                redirectURL={prefix}
                resetPath={resetPath}
              />
            )}
          />
          <Route
            exact
            path={resetPath}
            component={() => (
              <PagePasswordReset
                appPath={prefix}
                loginPath={loginPath}
                portal={prefix}
                registerPath={registerPath}
              />
            )}
          />
          <Route
            path={prefix}
            component={
              emailVerified && isLoggedIn
                ? PageApp
                : () => (
                    <PageConfirmEmail
                      appPath={prefix}
                      loginPath={loginPath}
                      portal={prefix}
                    />
                  )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, profile } = state.firebase;

  return {
    emailVerified: auth.emailVerified,
    isLoggedIn: !!auth.uid,
    profile,
  };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(RestaurantPortal);
