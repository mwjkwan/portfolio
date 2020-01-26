/** @jsx jsx **/
import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { isEmpty } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MatchView from '../components/MatchView';
import RightSidebar from './RightSidebar';
import MatchSidebar from './MatchSidebar';

const pageListStyle = css`
  .info {
    width: calc(100% - 140px);
    margin: 0px 0px 0px 20px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
      width: 190px;
      height: 25px;
      padding: 2px;
      font-family: 'Apercu';
      font-size: 14px;
      letter-spacing: 0.145em;
      text-decoration-line: underline;
    }

    #match {
      width: 70px;
    }

    #see-match {
      width: 105px;
    }
  }

  .basics {
    padding-bottom: 2px;
    font-family: 'Inconsolata';
    font-style: medium;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    color: #bd574e;
  }

  .name {
    font-family: 'Apercu';
    font-size: 24px;
    line-height: 29px;
  }

  .description {
    display: inline-block;
    padding-bottom: 8px;
    line-height: 19px;
  }

  #search {
    margin-top: 10px;
    width: 418px;
    height: 40px;
    border: none;
    background: #f4f2f2;
    display: flex;
    align-items: center;
    letter-spacing: 0.05em;
    color: #757575;
  }
`;

class PageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // search state
      createdMatchIds: {},
      loadingSearch: false,
      search: '',
      searches: [],
      searching: false,

      // right sidebar state
      showMatchSidebar: false,
      showRightSidebar: false,
    };
  }

  handleKeyPress = async event => {
    const { search } = this.state;

    if (event.key === 'Enter' && search) {
      this.setState({ searching: true, loadingSearch: true });

      const name = search
        .trim()
        .toLowerCase()
        .split(' ');
      const first = name[0];
      const last = name.length > 1 ? name[name.length - 1] : '';

      const { data } = await this.props.firebase
        .functions()
        .httpsCallable('user-userSearch')({ first, last });

      this.setState({ searches: data, loadingSearch: false });
    }
  };

  handleInputChange = event => {
    const eventValue = event.target.value;
    const value = eventValue.trim();

    if (value === '') {
      this.setState({ search: '', searches: [], searching: false });
      return;
    }

    this.setState({ search: eventValue });
  };

  renderMessage = () => {
    const { status } = this.props;

    if (status === 'live-survey') {
      return (
        <div>
          <div>
            Your matches will be up bright and early on Friday, February 14th.
          </div>
          <br />
          <div>
            In the meantime, you can finalize your{' '}
            <u>
              <Link to="/app/survey">survey</Link>
            </u>{' '}
            responses, browse our{' '}
            <u>
              <Link to="/app/faq">FAQ</Link>
            </u>
            , check out our{' '}
            <u>
              <Link to="/app/team">team</Link>
            </u>
            , or read our{' '}
            <u>
              <Link to="/app/archives">archives</Link>
            </u>
            .
          </div>
        </div>
      );
    } else if (status === 'live-processing') {
      return (
        <div>
          <div>We're calculating matches now! Hang tight!</div>
          <br />
          <div>
            In the meantime, you can finalize your{' '}
            <u>
              <Link to="/app/profile">profile</Link>
            </u>
            , browse our{' '}
            <u>
              <Link to="/app/faq">FAQ</Link>
            </u>
            , check out our{' '}
            <u>
              <Link to="/app/team">team</Link>
            </u>
            , or read our{' '}
            <u>
              <Link to="/app/archives">archives</Link>
            </u>
            .
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Survey and matches are officially closed! If you have no matches, it
          looks like you didn't fill out the survey fully :(
        </div>
      );
    }
  };

  renderSearch = () => (
    <input
      id="search"
      onChange={this.handleInputChange}
      onKeyPress={this.handleKeyPress}
      placeholder="Hate your matches? Search more people here"
      type="text"
      value={this.state.search}
    ></input>
  );

  canDateOnClick = (matchedUser, matchId, match) =>
    this.setState({
      involvedSchools: match.involvedSchools,
      matchedUser,
      matchId,
      showMatchSidebar: false,
      showRightSidebar: true,
    });

  matchOnClick = async (matchedUser, matchId, match, otherUid) => {
    const { firebase, profile } = this.props;
    const { createdMatchIds } = this.state;

    let newMatchId = matchId || createdMatchIds[otherUid];

    if (!newMatchId) {
      if (profile.searchMatches <= 0) {
        alert("You've ran out of search matches :(");
        return;
      }

      const { data } = await firebase
        .functions()
        .httpsCallable('match-createMatch')(otherUid);

      if (!data) {
        return;
      }

      newMatchId = data;
      this.setState({
        createdMatchIds: { ...createdMatchIds, [otherUid]: newMatchId },
      });
    }

    this.setState({
      matchedUser,
      matchId: newMatchId,
      showMatchSidebar: true,
      showRightSidebar: false,
    });
  };

  closeSidebar = () => {
    this.setState({
      showMatchSidebar: false,
      showRightSidebar: false,
    });
  };

  render() {
    const { email_to_college, matches, profile, status, uid } = this.props;

    if (
      isEmpty(matches) ||
      (status !== 'live-matches' && status !== 'development')
    ) {
      return (
        <div className="PageList" css={pageListStyle}>
          <Header>RESULTS</Header>
          <br />
          {this.renderMessage()}
        </div>
      );
    }

    const { loadingSearch, searching, searches } = this.state;

    const {
      involvedSchools,
      matchedUser,
      matchId,
      showMatchSidebar,
      showRightSidebar,
    } = this.state;

    if (searching) {
      return (
        <div className="PageList" css={pageListStyle}>
          <Header>RESULTS</Header>
          {this.renderSearch()}
          <div>
            You have <b>{profile.searchMatches}</b> search matches left!
          </div>
          <br />
          {loadingSearch && <Loading />}
          {!loadingSearch &&
            searches.map(user => {
              const { id, name } = user;

              if (!name) {
                return null;
              }

              const match = user.match || {};

              return (
                <MatchView
                  canDate={match.canDate}
                  canDateOnClick={() =>
                    this.canDateOnClick(user, match.matchId, match)
                  }
                  compatibility={match.rating}
                  email_to_college={email_to_college}
                  key={id}
                  matchOnClick={() =>
                    this.matchOnClick(user, match.matchId, match, id)
                  }
                  matched={match.matched ? match.matched[uid] : false}
                  {...user}
                />
              );
            })}
          {!loadingSearch && searches.length === 0 && (
            <div> No results. Try to be more generic. </div>
          )}
          {showRightSidebar && (
            <RightSidebar
              close={this.closeSidebar}
              involvedSchools={involvedSchools}
              matchedUser={matchedUser}
              matchId={matchId}
              meUser={profile}
            />
          )}
          {showMatchSidebar && (
            <MatchSidebar
              close={this.closeSidebar}
              matchedUser={matchedUser}
              matchId={matchId}
              meUser={profile}
            />
          )}
        </div>
      );
    }

    const sortable = Object.keys(matches).map(matchId => {
      const { canDate, rating = 0 } = matches[matchId];
      return [matchId, canDate ? rating + 10000 : rating];
    });
    sortable.sort((a, b) => b[1] - a[1]);

    const ids = sortable.map(([matchId, _rating]) => matchId);

    return (
      <div>
        <div className="PageList" css={pageListStyle}>
          <Header>RESULTS</Header>
          {this.renderSearch()}
          <br />

          {ids.map((matchId, counter) => {
            const match = matches[matchId];
            const { matchedUser } = match;

            if (!matchedUser.name) {
              return null;
            }

            return (
              <MatchView
                canDate={match.canDate}
                canDateOnClick={() =>
                  this.canDateOnClick(matchedUser, matchId, match)
                }
                compatibility={match.rating}
                counter={counter + 1}
                email_to_college={email_to_college}
                key={matchId}
                matched={match.matched ? match.matched[uid] : false}
                matchOnClick={() =>
                  this.matchOnClick(matchedUser, matchId, match)
                }
                {...matchedUser}
              />
            );
          })}
        </div>

        {showRightSidebar && (
          <RightSidebar
            close={this.closeSidebar}
            involvedSchools={involvedSchools}
            matchedUser={matchedUser}
            matchId={matchId}
            meUser={profile}
          />
        )}

        {showMatchSidebar && (
          <MatchSidebar
            close={this.closeSidebar}
            matchedUser={matchedUser}
            matchId={matchId}
            meUser={profile}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const uid = state.firebase.auth.uid;
  return { profile: { id: uid, ...state.firebase.profile }, uid };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(PageList);
