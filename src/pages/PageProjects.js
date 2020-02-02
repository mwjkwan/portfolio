/** @jsx jsx */

import { Component } from 'react';
import { css, jsx } from '@emotion/core';

import Description from '../components/Description';
import Article from '../components/Article'

import Datamatch from 'pages/projects/Datamatch'
import HarvardOpenDataProject from 'pages/projects/HarvardOpenDataProject'
import LayoutAlgo from 'pages/projects/LayoutAlgo'
import CS51 from 'pages/projects/CS51'

import { Container, Row, Col } from 'react-grid-system';

const aboutMe = `I'm a sophomore at Harvard studying computer science and philosophy. 
    I'm passionate about writing elegant code, simplifying designs, and telling the stories behind data. 
    Outside of class, I'm involved in Datamatch and Harvard Open Data Project both for web development (React, Python, Firebase) 
    as well as design (Adobe Creative Suite, Figma). I'm really excited to learn more about civic tech and how campaigns can 
    interact with the media: which debate moments blow up and which don't, and how we can quantify them.`;

const content = {
    header: "Projects",
}

const gridStyle = css`
    .col {
      padding-left: 0 !important;
      padding-right: 1em;
    };

    .col >* {
      margin-bottom: 1em;
    }
`;

export default class PageProjects extends Component {
  render() {
    return (
      <div css={gridStyle}> 
        <Article
          {...content}
        >
          <Description>{aboutMe}</Description>
          <Container gutterWidth={0}>
            <Row>
              <Col className="col" sm={6}>
                <Datamatch thumbnail />
                <LayoutAlgo thumbnail />
              </Col>
              <Col className="col" sm={6}>
                <HarvardOpenDataProject thumbnail />
                <CS51 thumbnail />
              </Col>
            </Row>
          </Container>
        </Article>
      </div>
    );
  }
}