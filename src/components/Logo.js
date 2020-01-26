import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends Component {
  getSource = () => {
    const { login, portal } = this.props;

    if (login) {
      if (portal === '/restaurant') {
        return require('../assets/restaurantlogin.png');
      } else if (portal === '/school_portal') {
        return require('../assets/schoolportallogin.png');
      }
      return require('../assets/loginlogo.png');
    }

    return require('../assets/textlogo.png');
  };

  render() {
    const { center, flat, to } = this.props;

    if (flat) {
      return (
        <div className="Logo">
          <Link to={to || '/'}>
            <div
              style={{
                display: 'flex',
                justifyContent: center ? 'center' : 'flex-start',
                marginBottom: 0,
              }}
            >
              <img
                alt="horizontal logo"
                src={require('../assets/horizontal.png')}
                style={{ width: '200px' }}
              />
            </div>
          </Link>
        </div>
      );
    }

    return (
      <div className="Logo">
        <Link to={to || '/'}>
          <img
            alt="logo"
            src={this.getSource()}
            style={{ maxWidth: '460px', width: '100%' }}
          />
        </Link>
      </div>
    );
  }
}
