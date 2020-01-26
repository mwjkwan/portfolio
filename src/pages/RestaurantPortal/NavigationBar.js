import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

class NavigationBar extends Component {
  render() {
    var links = [
      {
        to: '/restaurant',
        icon: 'home',
        text: 'Home',
      },
      {
        to: '/restaurant/check-in',
        icon: 'th-list',
        text: 'Check-in',
      },
      {
        to: '/restaurant/stats',
        icon: 'chart-area',
        text: 'Stats',
      },
    ];

    if (this.props.admin) {
      links.push({
        to: '/restaurant/admin',
        text: 'Admin',
        icon: 'toolbox',
      });
    }

    const { location, logoutUser } = this.props;

    return (
      <Navbar
        links={links}
        logoutUser={logoutUser}
        pathname={location.pathname}
        settingsURL="/restaurant/settings"
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    logoutUser: props.firebase.logout,
    admin: state.firebase.profile.admin,
  };
}

export default compose(
  firebaseConnect(),
  withRouter,
  connect(mapStateToProps),
)(NavigationBar);
