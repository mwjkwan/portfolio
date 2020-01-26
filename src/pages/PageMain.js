/** @jsx jsx **/
import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';

const pageMainStyle = css`
  height: 100%;
  background: #f9a9a5;
  text-align: center;
  align-items: center;

  .banner-container {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 25px;
    border-top: 3px solid #dedef0;
    border-bottom: 3px solid #dedef0;
    background: #fcfbfb;
  }

  .banner {
    width: 100%;
    line-height: 44px;
    color: #bd574e;
    font-size: 20px;
    -moz-animation: marquee 20s linear infinite;
    -webkit-animation: marquee 20s linear infinite;
    animation: marquee 20s linear infinite;
  }

  @-moz-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @-webkit-keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes marquee {
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  .StartButton {
    background: #bd574e;
    color: white;
    font-family: 'Apercu';
    font-size: 24px;
    padding: 5px 15px;
    letter-spacing: 0.145em;
  }

  .Links {
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    background: white;
    padding: 15px;

    a {
      position: relative;
      text-decoration: none;
    }

    a:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 3px;
      left: 0;
      background-color: #fff;
      visibility: hidden;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.4s ease-in-out 0s;
      transition: all 0.4s ease-in-out 0s;
    }

    a:hover:before {
      visibility: visible;
      -webkit-transform: scaleX(0.9);
      transform: scaleX(0.9);
    }
  }

  .map-container {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9a9a5;
    height: 100%;
    width: 100%;
  }

  .map {
    margin-top: 50px;
    max-width: 1000px;
    width: 80%;
  }

  .center-piece {
    width: 400px;
    height: 200px;
    background: #bd574e;
    position: absolute;
    box-shadow: 0.2em 0.2em #dedef0;
    font-family: Apercu;
  }

  .counter {
    font-size: 100px;
    font-weight: bold;
    color: #fffbfb;
  }

  .counter-description {
    color: #fffbfb;
    font-size: 20px;
  }

  .logo-container {
    position: absolute;
    bottom: 80px;
    left: 50px;
    height: 140px;
    width: 500px;
  }

  .logo {
    height: 140px;
    width: 140px;
    margin-right: 10px;
    float: left;
  }

  .logo-description {
    color: #bd574e;
    font-size: 20px;
    letter-spacing: 0.145em;
    text-align: left;
  }
`;

export default class PageMain extends Component {
  render() {
    return (
      <div css={pageMainStyle}>
        <div className="banner-container">
          <div className="banner">
            DATAMATCH: LIVE ANIMATED TICKER WITH RANDOM STUFF (either jokes like
            last year or signups) ANIMATED TICKER WITH RANDOM STUFF
          </div>
        </div>
        <div className="map-container">
          <img alt="map" className="map" src={require('assets/map.png')} />
          <div className="center-piece">
            <div className="counter">100,000</div>
            <div className="counter-description">
              users have signed up for Datamatch
            </div>
          </div>
        </div>
        <div className="logo-container">
          <img className="logo" alt="logo" src={require('assets/dmlogo.png')} />
          <div className="logo-description">
            DATAMATCH:
            <br /> THE TWENTY-FIFTH
            <br /> ANNIVERSARY
            <br /> EDITION
          </div>
        </div>
        <div className="Links">
          <Link to="/register" className="StartButton">
            SIGN UP
          </Link>
        </div>
      </div>
    );
  }
}
