/** @jsx jsx */

import React, { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Description from '../components/Description';
import Thumbnail from '../components/Thumbnail';
import Photo from '../assets/photos/DiegoFigueroa-MK.JPG'
import Article from '../components/Article'

const aboutMe = `I'm a sophomore at Harvard studying computer science and philosophy. 
    I'm passionate about writing elegant code, simplifying designs, and telling the stories behind data. 
    Outside of class, I'm involved in Datamatch and Harvard Open Data Project both for web development (React, Python, Firebase) 
    as well as design (Adobe Creative Suite, Figma). I'm really excited to learn more about civic tech and how campaigns can 
    interact with the media: which debate moments blow up and which don't, and how we can quantify them.`;

export default class PageAbout extends Component {
  render() {
    return (
      <Article>
        <h2>About</h2>
        <br />
        <Description content={aboutMe} />
        <Thumbnail
          description="Design and web development for matchmaking service used by over 27,000 students."
          header="Datamatch"
          image={Photo}
          technologies={'React, Redux, Firebase, Figma'}
          link="/projects/datamatch"
        />
      </Article>
    );
  }
}