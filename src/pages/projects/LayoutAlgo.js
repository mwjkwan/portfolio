/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
  header: 'Page Layout Algorithm',
  description: 'Algorithm for page layout generation of websites.',
  image: require('assets/project-covers/PageLayoutCover.png'),
  technologies: 'JavaScript',
  link: '/projects/page-layout-algorithm',
};

const text = {
  intro: `I interned term-time and over the summer at Fisherman, a startup that generates websites for restaurants
  and other SMBs. I outlined product roadmap for the second version of the generator, improved and re-implemented
  flexible page layout algorithm in JavaScript, and built React components for use in generated websites.
  Ultimately, these improvements helped to reduce our manual website edit time by 50%.`,
}

export default class LayoutAlgo extends Component {
  renderPage() {
    return <Article {...content}>
    <div>{text.intro}</div>
  </Article>;
  }

  render() {
    const { thumbnail } = this.props;
    return thumbnail ? <Thumbnail {...content} /> : this.renderPage();
  }
}
