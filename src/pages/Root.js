import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import Loading from '../components/Loading';
import { PrivateRoute, PublicRoute } from '../components/PrivateRoute';

import PageApp from 'pages/PageApp';
import PageAuth from 'pages/PageAuth';
import PageMain from 'pages/PageMain';
import RestaurantPortal from 'pages/RestaurantPortal';
import SchoolPortal from 'pages/SchoolPortal';

class RootImpl extends React.Component {
  render() {
    return (
      <div className="Root">
        <Switch>
          <Route
            path="/app"
            component={PageApp}
          />
          <Route component={() => <Redirect to="/" />} />
        </Switch>
      </div>
    );
  }
}

export default RootImpl;
