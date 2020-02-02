/** @jsx jsx */

import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Description from 'components/Description';

const articleStyle = css`
    .Article {
        max-width: 50em;
    }
    .Article >* {
        margin-bottom: 1em !important;
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
    <div css={articleStyle}>
        <div class="Article">
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
            <div class="Page-Content">
                {props.children}
            </div>
        </div>
    </div>
  );
};

export default Article;