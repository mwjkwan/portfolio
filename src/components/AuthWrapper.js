/** @jsx jsx */

import { Component } from 'react';
import { jsx, css, Global } from '@emotion/core';
import Logo from './Logo';

const authWrapperStyle = css`
  text-align: center;
  padding: 20px;

  a {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }

  .Box {
    box-shadow: 4px 4px #dedef0;
    padding: 20px 30px;
    max-width: 460px;
    align-items: left;
    justify-content: left;
    text-align: left;
    margin: 40px auto 0 auto;
    input {
      background: #f4f2f2;
      border: none;
    }
  }
`;

export default class AuthWrapper extends Component {
  render() {
    const { children, portal } = this.props;

    return (
      <div className="AuthWrapper" css={authWrapperStyle}>
        <Global styles={{ body: { background: '#F9A9A5' } }} />
        <Logo login center portal={portal} />
        <div className={'Box'}>{children}</div>
      </div>
    );
  }
}
