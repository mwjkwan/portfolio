import React, { Component } from 'react';
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

    const { location } = this.props;

    return (
      <Navbar
        links={links}
        pathname={location.pathname}
      />
    );
  }
}

export default withRouter(NavigationBar);