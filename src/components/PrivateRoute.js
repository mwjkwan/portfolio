import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Redirect, Route } from 'react-router-dom';

const PrivateRouteImpl = ({
  component: Component,
  exact,
  isLoggedIn,
  path,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const PublicRouteImpl = ({ component: Component, exact, isLoggedIn, path }) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={props =>
        !isLoggedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{ pathname: '/app', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return { isLoggedIn: !!state.firebase.auth.uid };
};

export const PrivateRoute = compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PrivateRouteImpl);

export const PublicRoute = compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PublicRouteImpl);

export default PrivateRoute;
