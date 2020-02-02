/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Description from 'components/Description';

const thumbnailStyle = css`
    .Thumbnail {
        background-color: #F3F2EF;
        max-width: 50em;
    }
    .thumbnail-content {
        display: inline-block;
        vertical-align: middle;
        margin: 0;
    }
    .description {
        margin-left: 15px;
        overflow-wrap: break-word;
    }
`;

const Article = (props) => {
  const {
    description,
    header,
    image,
    year,
  } = props;
  return (
    <div css={thumbnailStyle}>
        {year && <h6>{year}</h6>}
        {header && <h2>{header}</h2>}
        {description && <Description>{description}</Description>}
        { image && 
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
        }
        {props.children}
    </div>
  );
};

export default Article;