import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route, Switch, Redirect } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';

import CheckIn from './CheckIn';
import ConfirmationCodes from './ConfirmationCodes';
import Home from './Home';
import NavigationBar from './NavigationBar';

class PageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      restaurant: props.profile.restaurantAdmin,
    };
  }

  async componentDidMount() {
    const { firebase, isLoggedIn, profile } = this.props;
    let restaurant = profile.restaurantAdmin;

    // if we aren't 100% sure this person is a restaurantAdmin
    if (isLoggedIn && !restaurant) {
      const { data } = await firebase
        .functions()
        .httpsCallable('user-makeRestaurantAdmin')();
      restaurant = data;
    }

    let restaurantInformation = null;
    if (restaurant) {
      const snapshot = await firebase
        .ref(`/restaurants/${restaurant}`)
        .once('value');
      restaurantInformation = snapshot.val();
    }

    this.setState({ loading: false, restaurant, restaurantInformation });
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ margin: '10% auto' }}>
          <Loading size={200} type="spin" />
        </div>
      );
    }

    const { restaurant, restaurantInformation } = this.state;
    const prefix = '/restaurant';

    if (!this.props.isLoggedIn) {
      return <Redirect to={`${prefix}/login`} />;
    }

    if (!restaurant) {
      return <Redirect to="/" />;
    }

    return (
      <div className="PageRestaurant">
        <Sidebar leftSidebar={<NavigationBar />}>
          <Switch>
            <Route
              exact
              path={prefix}
              render={() => (
                <Home
                  restaurantInformation={restaurantInformation}
                  {...this.props}
                />
              )}
            />
            <Route
              exact
              path={`${prefix}/check-in`}
              render={() => (
                <CheckIn
                  restaurant={restaurant}
                  restaurantInformation={restaurantInformation}
                  {...this.props}
                />
              )}
            />
            <Route
              exact
              path={`${prefix}/confirmation-codes`}
              render={() => (
                <ConfirmationCodes
                  restaurantInformation={restaurantInformation}
                  {...this.props}
                />
              )}
            />
          </Switch>
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.firebase.auth.uid,
    profile: state.firebase.profile,
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(PageApp);
