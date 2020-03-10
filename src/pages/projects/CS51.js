/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Thumbnail from 'components/Thumbnail';
import Article from 'components/Article';

const content = {
  header: 'CS51 Teaching Materials',
  description:
    'Functional programming course materials for weekly code review with 15 students.',
  image: require('assets/project-covers/CS51Cover.png'),
  technologies: 'OCaml',
  link: '/projects/cs51',
};

const text = {
  intro: `As a Teaching Fellow for Harvard's CS51, I teach a code review of 10-15 students on functional,
  imperative, and object-oriented programming paradigms in OCaml. In addition, I old weekly office hours
  and problem-solving sessions, as well as grade problem sets and exams and provide feedback on code design.`,
  background: `CS51 is the follow-up class to CS50, Harvard's introductory computer science class. While CS50
  focuses on programming applications, CS51 focuses on coding well: writing software that is reusable, readable
  and easily maintained. The class requires students to get in a recursive mindset and to think about how to 
  break problems down into parts, and explaining the concepts has been such a rewarding experience as a TF.`,
};

export default class CS51 extends Component {
  renderPage() {
    return (
      <Article {...content}>
        <div>{text.intro}</div>
        <div>{text.background}</div>
      </Article>
    );
  }

  render() {
    const { thumbnail } = this.props;
    return thumbnail ? <Thumbnail {...content} /> : this.renderPage();
  }
}
