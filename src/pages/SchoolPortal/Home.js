/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header';

const homeStyle = css`
  button {
    width: 130px;
    height: 25px;
    margin-right: 30px;
    margin-bottom: 15px;
  }
`;

class Home extends Component {
  render() {
    return (
      <div>
        <Header>UNIVERSITY PORTAL</Header>
        <br />
        <b>Welcome to the school portal!</b>
        <br />
        Here is where you’ll edit your school details, the survey, the team, the
        survey, and check out the stats once the survey and matches are live.
        <br />
        <br />
        <b>Resources:</b>
        <br />
        Survey writing guidelines:
        <br />
        Pub materials:
        <br />
        Brand assets:
        <br />
        Join the Slack here:
        <br />
        <br />
        <div className="links" css={homeStyle}>
          <button
            onClick={() => this.props.history.push('/school_portal/school')}
          >
            EDIT PROFILE
          </button>
          <button
            onClick={() => this.props.history.push('/school_portal/survey')}
          >
            EDIT SURVEY
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
