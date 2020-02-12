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

const text = {
  intro: `As the Publisher for HODP, I redesigned and implemented website using Python, Flask, and Jinja.
  I also taught Python and Jupyter Notebook bootcamp session for 30 new members, and serve on the team that
  maintains codebase of web apps hosted on the website.`,
}

export default class HarvardOpenDataProject extends Component {
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
