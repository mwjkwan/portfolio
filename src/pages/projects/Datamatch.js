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

const text = {
  intro: `I lead a 10-person team to design UI/UX of Datamatch website for semi-serious Valentine’s Day
  matchmaking service. Started at Harvard in 1994, Datamatch is used by over 25,000 students across 17 universities.
  This year, I redesigned the website with a focus on the match interface, integrating a sidebar so users
  can schedule dates and browse their matches without needing to navigate between pages. In addition, I also
  designed our new school and restaurant portals, which allow our partners to edit their survey questions and
  validate date codes automatically.`,
  development: `Besides design, I also contributed to the web team by re-implementing the profile page
  and the restaurant portal summary statistics. Our tech stack uses React, Redux, and Firebase.`,
};

export default class Datamatch extends Component {
  renderPage() {
    return (
      <Article {...content}>
        <div>{text.intro}</div>
        <div>{text.development}</div>
      </Article>
    );
  }

  render() {
    const { thumbnail } = this.props;
    return thumbnail ? <Thumbnail {...content} /> : this.renderPage();
  }
}
