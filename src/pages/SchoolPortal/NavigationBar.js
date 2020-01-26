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
        to: '/school_portal',
        icon: 'home',
        text: 'Home',
      },
      { to: '/school_portal/school', text: 'School', icon: 'user' },
      {
        to: '/school_portal/survey',
        icon: 'th-list',
        text: 'Survey',
      },
      {
        to: '/school_portal/stats',
        icon: 'chart-area',
        text: 'Stats',
      },
      {
        to: '/school_portal/team',
        icon: 'users',
        text: 'Team',
      },
    ];

    if (this.props.admin) {
      links.push({
        to: '/school_portal/admin',
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
        settingsURL="/school_portal/settings"
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
