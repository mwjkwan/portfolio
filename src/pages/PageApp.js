import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';
import { isLoaded } from 'react-redux-firebase';
import { Route } from 'react-router-dom';

import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';

import NavigationBar from 'pages/NavigationBar';
import PageAbout from 'pages/PageAbout';
import PageFeedback from 'pages/PageFeedback';
import PageGender from 'pages/PageGender';
import PageHome from 'pages/PageHome';
import PageOnboard from 'pages/PageOnboard';
import PagePress from 'pages/PagePress';
import PageProfile from 'pages/PageProfile';
import PageResults from 'pages/PageResults';
import PageSettings from 'pages/PageSettings';
import PageSurvey from 'pages/PageSurvey';
import PageTeam from 'pages/PageTeam';
// import PageFAQ from 'pages/PageApp/routes/PageFAQ';

class PageApp extends Component {
  render() {
    return (
      <div className="PageApp">
        <Sidebar leftSidebar={<NavigationBar />}>
          <Route path="/app/faq" component={PageAbout} />
          <Route path="/app/press" component={PagePress} />
          <Route path="/app/gender_policy" component={PageGender} />
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = (state, _props) => {
  const { firebase, firestore } = state;
  const { auth, profile } = firebase;

  return {
    email: auth.email,
    onboarded: profile.onboarded,
    settings: firestore.data.settings,
    uid: auth.uid,
  };
};

export default compose(
  firebaseConnect(),
  firestoreConnect(() => [
    {
      collection: 'settings',
      doc: 'config',
      storeAs: 'settings',
    },
  ]),
  withRouter,
  connect(mapStateToProps),
)(PageApp);
