import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import Loading from '../components/Loading';

class MatchView extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, matched: props.matched };
  }

  onClick = async () => {
    const { matchOnClick, profile } = this.props;
    this.setState({ loading: true });
    await matchOnClick();
    this.setState({
      loading: false,
      matched: this.state.matched || profile.searchMatches > 0,
    });
  };

  render() {
    const {
      canDate,
      canDateOnClick,
      compatibility,
      counter,
      description,
      dorm,
      email,
      email_to_college,
      name,
      profile_pic,
      year,
    } = this.props;
    const { loading, matched } = this.state;

    const emailSuffix = email.split('@')[1];
    const school = email_to_college[emailSuffix];

    return (
      <div
        style={{
          display: 'flex',
          marginBottom: 30,
          maxWidth: 600,
          position: 'relative',
        }}
      >
        <img
          alt="profile"
          src={profile_pic || require('assets/empty.png')}
          style={{
            width: 125,
            height: 125,
            objectFit: 'cover',
            minWidth: 125,
            background: `url(${require('assets/loading.svg')})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />
        <div className="info">
          <div className="basics">
            {!compatibility
              ? `${school.toUpperCase()}, ${year.toUpperCase()}, ${dorm.toUpperCase()}`
              : `${school.toUpperCase()}, ${year.toUpperCase()}, ${dorm.toUpperCase()}, ${compatibility}%`}
            <br />
            <div className="name">
              {!counter ? name : `${counter}. ${name}`}
            </div>
            {/* <div className="icons">
          <Link
            id="facebook"
            to={this.props.to ? this.props.to : '/'}
          >
            <img
              src={require('assets/facebook.png')}
              style={{ width: '31px', height: '31px' }}
            />
          </Link>
          <Link id="spotify" to={this.props.to ? this.props.to : '/'}>
            <img
              src={require('assets/spotify.png')}
              style={{ width: '35px', height: '35px' }}
            />
          </Link>
        </div> */}
          </div>
          <div className="description">{description}</div>
          {!canDate ? (
            !loading ? (
              <button
                id={matched ? 'see-match' : 'match'}
                onClick={this.onClick}
              >
                {matched ? 'SEE MATCH' : 'MATCH'}
              </button>
            ) : (
              <button id="match">
                <Loading style={{ height: '25px' }} />
              </button>
            )
          ) : (
            <button onClick={canDateOnClick}>SCHEDULE FREE DATE</button>
          )}
        </div>
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { profile: state.firebase.profile };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(MatchView);
