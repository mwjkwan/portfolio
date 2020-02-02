/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
    header: "CS51 Teaching Materials",
    description: "Functional programming course materials for weekly code review with 15 students.",
    image: require('assets/photos/DiegoFigueroa-MK.JPG'),
    technologies: "OCaml",
    link: "/projects/cs51",
}

export default class CS51 extends Component {
  
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