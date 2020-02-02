/** @jsx jsx */

import React, { Component } from 'react';
import { jsx } from '@emotion/core';
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
      {
        to: '/writing',
        icon: 'chart-area',
        text: 'Writing',
      },
      {
        to: '/resume',
        icon: 'chart-area',
        text: 'Resume',
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