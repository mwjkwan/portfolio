/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
    header: "Page Layout Algorithm",
    description: "Algorithm for page layout generation of websites.",
    image: require('assets/photos/DiegoFigueroa-MK.JPG'),
    technologies: "JavaScript",
    link: "/projects/page-layout-algorithm",
}

export default class LayoutAlgo extends Component {
  
  renderPage() {
      return (
        <Article
            {...content}
        >
            Testing testing 123
        </Article>
      );
  }

  render() {
    const { thumbnail } = this.props;
    return ( thumbnail ? <Thumbnail {...content} /> : this.renderPage() );
  }
}