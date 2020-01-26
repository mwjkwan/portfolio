import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

class NavigationBar extends Component {
  render() {
    var links = [
      {
        to: '/app/faq',
        icon: 'question',
        tooltip: 'homepage',
        text: 'FAQ'
      },
      {
        to: '/app/press',
        icon: 'question',
        tooltip: 'homepage',
        text: 'FAQ'
      },
      {
        to: '/app/faq',
        icon: 'question',
        tooltip: 'homepage',
        text: 'FAQ'
      },
    ];

    const { location, logoutUser } = this.props;

    return (
      <Navbar
        links={links}
        logoutUser={logoutUser}
        pathname={location.pathname}
        settingsURL="/app/settings"
      />
    );
  }
}

export default compose(withRouter, NavigationBar);
