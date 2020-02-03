/** @jsx jsx */

import { Component } from 'react';
import { css, jsx } from '@emotion/core';
import { Container, Row, Col } from 'react-grid-system';
import ReactPlayer from 'react-player';

import PhotoGallery from '../components/PhotoGallery';
import Article from '../components/Article';

const photos = [
  {
    src: require('assets/photos/DiegoFigueroa-MK.JPG'),
    width: 3,
    height: 2,
  },
  {
    src: require('assets/photos/DS6_4822.JPG'),
    width: 3,
    height: 2,
  },
  {
    src: require('assets/photos/DS6_4894.JPG'),
    width: 2,
    height: 3,
  },
  {
    src: require('assets/photos/DS6_7234.JPG'),
    width: 3,
    height: 2,
  },
  {
    src: require('assets/photos/DSC_6901.JPG'),
    width: 3,
    height: 2,
  },
  {
    src: require('assets/photos/KaiAng-MK.jpg'),
    width: 2.5,
    height: 2,
  },
  {
    src: require('assets/photos/MalloryMillard-MK.JPG'),
    width: 2,
    height: 3,
  },
  {
    src: require('assets/photos/NirbanBhatia-MK.JPG'),
    width: 2,
    height: 3,
  },
  {
    src: require('assets/photos/TanayDodgeball.JPG'),
    width: 3,
    height: 2,
  },
  {
    src: require('assets/photos/WillParkREAL-MelK.jpg'),
    width: 2,
    height: 2.5,
  },
  {
    src: require('assets/photos/YannickBohbot-Dridi-MK.JPG'),
    width: 2,
    height: 3,
  },
];

const content = {
  header: 'Multimedia',
  description: 'I shoot on a Nikon D600 and edit with Final Cut Pro!',
};

const gridStyle = css`
  .col {
    padding-left: 0 !important;
    padding-right: 1em;
  }

  .col > * {
    margin-bottom: 1em;
  }
`;

export default class PageMultimedia extends Component {
  render() {
    return (
      <div css={gridStyle}>
        <Article {...content}>
          <h3>Photography</h3>
          <PhotoGallery photos={photos} direction={'column'} />
          <h3>Videography</h3>
          <Container gutterWidth={0} style={{ maxWidth: '100vw !important' }}>
            <Row>
              <Col className="col" sm={6}>
                <ReactPlayer
                  width={'100%'}
                  height={'17em'}
                  url="https://vimeo.com/311012937"
                />
                <ReactPlayer
                  width={'100%'}
                  height={'17em'}
                  url="https://www.youtube.com/watch?v=RuOq5W0yOck"
                />
              </Col>
              <Col className="col" sm={6}>
                <ReactPlayer
                  width={'100%'}
                  height={'17em'}
                  url="https://www.youtube.com/watch?v=DNjkCnQzsFI"
                />
                <ReactPlayer
                  width={'100%'}
                  height={'17em'}
                  url="https://www.youtube.com/watch?v=PpFIzzHG5yA"
                />
              </Col>
            </Row>
          </Container>
        </Article>
      </div>
    );
  }
}
