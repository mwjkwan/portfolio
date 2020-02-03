/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
  header: 'Datamatch',
  description:
    'Design and web development for matchmaking service used by over 27,000 students.',
  image: require('assets/project-covers/DatamatchCover.png'),
  technologies: 'React, Redux, Firebase, Figma',
  link: '/projects/datamatch',
};

export default class Datamatch extends Component {
  renderPage() {
    return <Article {...content}>Coming soon!</Article>;
  }

  render() {
    const { thumbnail } = this.props;
    return thumbnail ? <Thumbnail {...content} /> : this.renderPage();
  }
}
