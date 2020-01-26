import React from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import Feedback from '../components/Feedback';

const PageSchoolNotFound = ({ email, logoutUser, settings }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      height: '100%',
      flexDirection: 'column',
      padding: 20,
      maxWidth: 500,
      margin: '0 auto',
    }}
  >
    {'Sorry, Datamatch is not at your college yet! :('}
    <div style={{ height: 20 }} />
    <div>You need an email from the following:</div>
    <br />
    {Object.keys(settings.email_to_college).map(email => {
      return (
        <div key={email} style={{ fontFamily: 'apercu' }}>
          {email}
          <br />
        </div>
      );
    })}
    <br />
    <div>
      If you want to bring Datamatch to your campus, reach out to us below!
    </div>
    <br />
    <Feedback
      buttonText="Send!"
      email={email}
      name="Interest from another College"
      placeholder="Send us a message!"
      submittedText="We'll get back ASAP!"
    />
    <br />
    <Link to="/" onClick={logoutUser}>
      Log Out
    </Link>
  </div>
);

export default compose(withRouter)(PageSchoolNotFound);
