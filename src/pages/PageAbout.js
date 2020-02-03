/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import Description from '../components/Description';
import Thumbnail from '../components/Thumbnail';
import Photo from '../assets/photos/DiegoFigueroa-MK.JPG';
import Article from '../components/Article';

const aboutMe = (
  <div>
    I'm a sophomore at Harvard studying <b>computer science and philosophy. </b>
    I care about writing elegant code, simplifying designs, and telling the
    stories behind data. Outside of class, I'm involved in{' '}
    <Link to="/projects/datamatch">
      <b>Datamatch</b>
    </Link>{' '}
    and
    <Link to="/projects/hodp">
      <b> Harvard Open Data Project </b>
    </Link>
    both for web development (React, Python, Firebase) as well as design (Adobe
    Creative Suite, Figma).
  </div>
);

const content = {
  header: 'About',
};

const aboutStyle = css`
  div {
    font-size: 40px !important;
  }
`;

export default class PageAbout extends Component {
  render() {
    return (
      <Article {...content}>
        <div css={aboutStyle}>
          <Description>{aboutMe}</Description>
        </div>
      </Article>
    );
  }
}
