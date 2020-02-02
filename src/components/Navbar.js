/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profilePhoto from 'assets/MelissaKwanProfile.jpg'

const navbarStyle = css`
  .Navigation {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: right;
    margin: 30px 50px 0px 50px;
    color: #515151;
    position: relative;
    overflow: auto;
    padding: 1em;

    logo {
      textalign: center;
      width: 100%;
    }

    .link {
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
      line-height: 27px;
      letter-spacing: 0.1em;
      color: #ffffff;
      text-decoration: none;
    }

    a {
      color: #000000;
      font-size: 16px;
      text-decoration: none;
      letter-spacing: 0.1em;

      &:hover {
        text-decoration: none;
      }
    }

    .profile-photo {
      max-width: 100px;
    }

    .Highlight {
      a {
        font-size: 16px;
        font-family: 'Apercu';
        color: #AAAFFF;
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
        {link.text}
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
            <img className="profile-photo" src={profilePhoto} alt="Melissa Kwan" />
            <h1>Melissa Kwan</h1>
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