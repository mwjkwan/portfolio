/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

import Description from '../components/Description';
import Thumbnail from '../components/Thumbnail';
import Photo from '../assets/photos/DiegoFigueroa-MK.JPG';
import Article from '../components/Article';

const content = {
  header: 'Resume + Contact',
  description: 'Where you can find me:',
};

const resumeStyle = css`
  div {
    // display: inline-block;
  }
`;

export default class PageResume extends Component {
  render() {
    return (
      <Article {...content}>
        <div css={resumeStyle}>
          <ul>
            <li>
              <div>
                <b>Resume: </b>
                <a
                  target="_blank"
                  href={require('assets/files/MelissaKwanResume.pdf')}
                >
                  Attached
                </a>
              </div>
            </li>
            <li>
              <div>
                <b>LinkedIn:</b>{' '}
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/melissa-kwan-147b13143/"
                >
                  Melissa Kwan
                </a>
              </div>
            </li>
            <li>
              <div>
                <b>GitHub:</b>{' '}
                <a target="_blank" href="https://github.com/mwjkwan">
                  mwjkwan
                </a>
              </div>
            </li>
            <li>
              <div>
                <b>Email:</b>{' '}
                <a target="_blank" href="mailto:mkwan@college.harvard.edu">
                  mkwan@college.harvard.edu
                </a>
              </div>
            </li>
          </ul>
        </div>
      </Article>
    );
  }
}
