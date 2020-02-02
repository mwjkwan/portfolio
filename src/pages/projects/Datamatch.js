/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
    header: "Datamatch",
    description: "Design and web development for matchmaking service used by over 27,000 students.",
    image: require('assets/photos/DiegoFigueroa-MK.JPG'),
    technologies: "React, Redux, Firebase, Figma",
    link: "/projects/datamatch",
}

export default class Datamatch extends Component {
  renderThumbnail() {
    return (
        <Thumbnail {...content} />
    )
  }
  
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