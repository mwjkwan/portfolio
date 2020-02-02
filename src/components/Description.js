/** @jsx jsx */

import { Component } from 'react';
import { css, jsx } from '@emotion/core';

const descriptionStyle = css`
  .description {
    max-width: 50em !important;
  }
`;

export default class Description extends Component {
  render() {
    const { content } = this.props;
    return (
      <div css={descriptionStyle}>
        <div class="description">
          {content}
        </div>
      </div>
    );
  }
}