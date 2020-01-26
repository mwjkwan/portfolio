import React from 'react';
import Email from '../components/Email';

export default class Join extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: 'center',
          background: 'rgb(242, 242, 242)',
          padding: '20px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <h3 style={{ marginBottom: 0 }}>Join the Datamatch team!</h3>
        <br />
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          {
            'Datamatch is the largest student-run matchmaking site with over 27,000 users last year! Join one of our tech, algo, design, or business teams and become a cupid <3'
          }
        </div>
        <br />
        <Email center />
      </div>
    );
  }
}
