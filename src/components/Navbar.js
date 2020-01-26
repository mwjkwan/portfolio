/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const navbarStyle = css`
  .Navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    margin: 30px 50px 0px 50px;
    color: #515151;
    position: relative;
    height: calc(100% - 0px);
    min-height: 645px;
    overflow: auto;

    logo {
      textalign: center;
      width: 100%;
    }

    .links {
      margin-left: 5px;
    }

    .link {
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      line-height: 27px;
      letter-spacing: 0.07em;
      color: #ffffff;
    }

    a {
      color: #000000;
      font-size: 16px;

      &:hover {
        text-decoration: none;
      }
    }

    .Highlight {
      a {
        font-family: 'Apercu';
        opacity: 1;
        font-weight: bold;
      }
    }
  }
`;

const renderLink = (link, path) => {
  return (
    <div
      key={link.text}
      className={'link' + (path === link.to ? ' Highlight' : '')}
    >
      <Link to={link.to}>
        <i className={'icon fas fa-' + link.icon}></i>
        {link.text.toUpperCase()}
      </Link>
    </div>
  );
};

export default class Navbar extends Component {
  render() {
    const { links, pathname } = this.props;

    var parts = pathname.split('/');
    var path = '/' + parts[1] + (parts[2] ? '/' + parts[2] : '');

    return (
      <div css={navbarStyle}>
        <div className="Navigation">
          <div className="logo">
            Melissa Kwan
          </div>
          <div style={{ height: 25, textAlign: 'left' }} />
          <div className="links">
            {links.map(link => {
              return renderLink(link, path);
            })}
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    }),
  ).isRequired,
  pathname: PropTypes.string.isRequired,
};