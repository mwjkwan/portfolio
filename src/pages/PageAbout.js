/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Description from 'components/Description';

const aboutMe = `I'm a sophomore at Harvard studying computer science and philosophy. 
    I'm passionate about writing elegant code, simplifying designs, and telling the stories behind data. 
    Outside of class, I'm involved in Datamatch and Harvard Open Data Project both for web development (React, Python, Firebase) 
    as well as design (Adobe Creative Suite, Figma). I'm really excited to learn more about civic tech and how campaigns can 
    interact with the media: which debate moments blow up and which don't, and how we can quantify them.`;

export default class PageAbout extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <br />
        <Description content={aboutMe} />
      </div>
    );
  }
}