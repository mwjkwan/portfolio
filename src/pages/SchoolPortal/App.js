import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Route, Switch, Redirect } from 'react-router-dom';

import Loading from '../components/Loading';
import Sidebar from '../components/Sidebar';

import NavigationBar from './NavigationBar';
import Home from './Home';
import Profile from './Profile';
import Team from './Team';
import Survey from './Survey';

class PageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      school: props.profile.schoolAdmin,
    };
  }

  async componentDidMount() {
    const { firebase, isLoggedIn, profile } = this.props;
    let school = profile.schoolAdmin;

    // if we aren't 100% sure this person is a schoolAdmin
    if (isLoggedIn && !school) {
      const { data } = await firebase
        .functions()
        .httpsCallable('user-makeSchoolAdmin')();
      school = data;
    }

    this.setState({ loading: false, school });
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ margin: '10% auto' }}>
          <Loading size={200} type="spin" />
        </div>
      );
    }

    const { school } = this.state;
    const prefix = '/school_portal';

    if (!this.props.isLoggedIn) {
      return <Redirect to={`${prefix}/login`} />;
    }

    if (!school) {
      return <Redirect to="/" />;
    }

    return (
      <div className="PageSchool">
        <Sidebar leftSidebar={<NavigationBar />}>
          <Switch>
            <Route exact path={prefix} component={Home} />
            <Route
              exact
              path={`${prefix}/school`}
              render={() => <Profile school={school} />}
            />
            <Route
              exact
              path={`${prefix}/survey`}
              render={() => <Survey school={school} />}
            />
            <Route
              exact
              path={`${prefix}/team`}
              render={() => <Team school={school} />}
            />
            <Route component={() => <Redirect to={prefix} />} />
          </Switch>
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.firebase.auth.uid,
    profile: state.firebase.profile,
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(PageApp);
