import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

export default class PageHome extends Component {
  renderMessage = () => {
    const { status } = this.props;

    if (status === 'live-survey' || status === 'development') {
      return (
        <div>
          Fill out <Link to="/app/survey">the survey!</Link>
        </div>
      );
    } else if (status === 'live-processing') {
      return (
        <div>
          We're calculating your matches. Spruce up{' '}
          <Link to="/app/profile">your profile</Link> before they are released!
        </div>
      );
    } else if (status === 'live-matches') {
      return (
        <div>
          Check out <Link to="/app/results">your matches!</Link>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="PageHome">
        <Header>DATAMATCH @ {this.props.name.toUpperCase()}</Header>
        {this.renderMessage()}
        <br />
      </div>
    );
  }
}
