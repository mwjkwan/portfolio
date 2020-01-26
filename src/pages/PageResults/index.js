import React, { Component } from 'react';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Loading from '../components/Loading';
import PageList from './routes/PageList';

class PageResults extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, matches: {} };
  }

  async componentDidMount() {
    const { status } = this.props;

    if (status !== 'live-matches' && status !== 'development') {
      this.setState({ loading: false });
      return;
    }

    const { data } = await this.props.firebase
      .functions()
      .httpsCallable('match-getMatches')();
    this.setState({ loading: false, matches: data });
  }

  render() {
    const { loading, matches } = this.state;
    const { email_to_college, status } = this.props;

    if (loading) {
      return (
        <div style={{ height: 200 }}>
          <Loading />
        </div>
      );
    }

    return (
      <PageList
        email_to_college={email_to_college}
        matches={matches}
        status={status}
      />
    );
  }
}

export default compose(firebaseConnect())(PageResults);
