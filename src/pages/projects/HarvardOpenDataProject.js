/** @jsx jsx */

import { Component } from 'react';
import { jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
  header: 'Harvard Open Data Project',
  description: 'Data analysis projects, web development.',
  image: require('assets/project-covers/HODPCover.png'),
  technologies: 'R, Python, Flask, HTML, CSS, JavaScript',
  link: '/projects/hodp',
};

export default class HarvardOpenDataProject extends Component {
  renderPage() {
    return <Article {...content}>Coming soon!</Article>;
  }

  render() {
    const { thumbnail } = this.props;
    return thumbnail ? <Thumbnail {...content} /> : this.renderPage();
  }
}
