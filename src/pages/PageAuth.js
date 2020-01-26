import React, { Component } from 'react';
import { compose } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '../components/PrivateRoute';
import queryString from 'query-string';

import PageLogin from './PageLogin';
import PageRegister from './PageRegister';
import PagePasswordReset from './PagePasswordReset';
import PageConfirmEmail from './PageConfirmEmail';

class PageAuth extends Component {
  render() {
    const { mode } = queryString.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });

    return (
      <div className="PageAuth">
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={() => <PageLogin title="Log In" />}
          />
          <PublicRoute exact path="/register" component={PageRegister} />
          <PrivateRoute exact path="/app" component={PageConfirmEmail} />
          <Route
            path="/(auth|reset)"
            render={() => {
              if (mode === 'verifyEmail') {
                return <Route path="/auth" component={PageConfirmEmail} />;
              } else {
                return (
                  <PublicRoute
                    path="/(auth|reset)"
                    component={PagePasswordReset}
                  />
                );
              }
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default compose(withRouter)(PageAuth);
