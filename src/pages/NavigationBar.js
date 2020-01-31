import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';

class NavigationBar extends Component {
  render() {
    var links = [
      {
        to: '/',
        icon: 'home',
        text: 'Home',
      },
      {
        to: '/projects',
        icon: 'th-list',
        text: 'Projects',
      },
      {
        to: '/multimedia',
        icon: 'chart-area',
        text: 'Multimedia',
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