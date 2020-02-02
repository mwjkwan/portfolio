/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';

const thumbnailStyle = css`
    .Thumbnail {
        background-color: #F3F2EF;
        max-width: 50em;
    }
    .thumbnail-content {
        display: inline-block;
        vertical-align: middle;
    }
    .description {
        margin-top: 0px;
        margin-left: 15px;
        margin-bottom: 15px;
        overflow-wrap: break-word;
    }
`;

const Thumbnail = (props) => {
  const {
    description,
    header,
    image,
    link,
    technology,
    year,
  } = props;
  return (
    <div css={thumbnailStyle}>
      <div className="Thumbnail">
        { image && 
            <Link className="thumbnail-content" to={link}>
                <img
                    alt={header}
                    src={image || require('assets/empty.png')}
                    style={{
                        width: '100%',
                        objectFit: 'cover',
                        marginBottom: 0,
                        minWidth: 125,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                />
            </Link>
        }
        <div className="thumbnail-content description">
          <Link to={link}><h3>{header}</h3></Link>
          {description && <p>{description}</p>}
          {technology && <p>{technology}</p>}
          {year && <p>{year}</p>}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;