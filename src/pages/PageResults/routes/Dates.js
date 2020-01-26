/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import Loading from '../components/Loading';

const datesStyle = css`
  .blue-button {
    background: #dedef0;
  }

  .you-button {
    background: #e9c8c5;
  }

  .both-button {
    background: #ffad87;
  }

  .partner-button {
    background: #d3908a;
  }
`;

class Dates extends Component {
  constructor(props) {
    super(props);
    this.state = { processedDates: [] };
  }

  componentDidUpdate(prevProps) {
    const {
      availability,
      claimingDate,
      dateId,
      dates,
      meFinalized,
      otherFinalized,
    } = this.props;

    if (claimingDate) {
      return;
    }

    if (
      availability !== prevProps.availability ||
      dateId !== prevProps.dateId ||
      dates !== prevProps.dates ||
      meFinalized !== prevProps.meFinalized ||
      otherFinalized !== prevProps.otherFinalized
    ) {
      this.processDates();
    }
  }

  processDates = () => {
    const { meFinalized, otherFinalized, requested } = this.props;
    if (!requested) {
      return;
    }

    const availability = this.props.availability || {};
    const dates = this.props.dates || {};

    const sortedDates = Object.keys(dates).sort((a, b) => {
      const [month1, day1] = dates[a].day.split('/').map(s => parseInt(s));
      const [month2, day2] = dates[b].day.split('/').map(s => parseInt(s));
      return month1 !== month2 ? month1 - month2 : day1 - day2;
    });

    const now = new Date().getTime();
    let processedDates = sortedDates.map(date => ({
      id: date,
      render: dates[date].datesAvailable > 0 && now < dates[date].unix,
      ...dates[date],
      ...this.getColor(availability[date]),
    }));

    if (meFinalized && otherFinalized) {
      processedDates = processedDates.map(date => ({
        ...date,
        render: date.render && date.btnClass === 'both-button',
        btnClass: this.getFinalizedColor(date.id),
      }));
    }

    this.setState({ processedDates });
    this.checkFilled(processedDates);
  };

  checkFilled = processedDates => {
    const notFilled = processedDates.every(
      ({ btnClass, render }) =>
        !render || btnClass === 'partner-button' || btnClass === 'blue-button',
    );
    this.props.setFilled(!notFilled);
  };

  updateAvailability = (dateId, available) => {
    const { firebase, matchId, uid } = this.props;
    firebase.update('/matches/' + matchId + '/availability/' + dateId, {
      [uid]: !available,
    });
  };

  onClick = (dateId, available) => {
    const { meFinalized, otherFinalized, setDateId } = this.props;

    if (!meFinalized) {
      this.updateAvailability(dateId, available);
    }

    if (meFinalized && otherFinalized) {
      setDateId(dateId);
    }
  };

  getColor = available => {
    const { otherUid, uid } = this.props;
    let btnClass = 'blue-button';
    let currentAvailability = false;

    if (available) {
      if (available[otherUid] && available[uid]) {
        btnClass = 'both-button';
        currentAvailability = true;
      } else if (!available[otherUid] && available[uid]) {
        btnClass = 'you-button';
        currentAvailability = true;
      } else if (available[otherUid] && !available[uid]) {
        btnClass = 'partner-button';
        currentAvailability = false;
      }
    }
    return { btnClass, currentAvailability };
  };

  getFinalizedColor = dateId => {
    if (dateId === this.props.dateId) {
      return 'you-button';
    }
    return 'blue-button';
  };

  render() {
    const { meFinalized, otherFinalized, requested } = this.props;

    if (!requested) {
      return (
        <div style={{ height: 200 }}>
          <Loading />
        </div>
      );
    }

    const { processedDates } = this.state;
    const notRendered = processedDates.every(date => !date.render);

    if (notRendered) {
      if (meFinalized && otherFinalized) {
        return (
          <div style={{ color: 'red' }}>
            There are currently no dates both of you can make. Try changing your
            availability.
          </div>
        );
      }

      return (
        <div style={{ color: 'red' }}>
          Unfortunately, there are no dates available at this time.
        </div>
      );
    }

    return (
      <div css={datesStyle}>
        {processedDates.map(date => {
          const {
            btnClass,
            currentAvailability,
            day,
            id,
            place,
            render,
          } = date;

          if (!render) {
            return null;
          }

          return (
            <button
              className={'date ' + btnClass}
              key={id}
              onClick={() => this.onClick(id, currentAvailability)}
            >
              {place.toUpperCase()} {day}
            </button>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state, _props) => {
  const { availability, dates } = state.firebase.data;
  const { requested } = state.firebase;

  return {
    availability,
    dates,
    requested: requested.availability && requested.dates,
  };
};

export default compose(
  firebaseConnect(props => [
    {
      path: '/dates',
      storeAs: 'dates',
      queryParams: [
        'orderByChild=involvedSchools',
        `equalTo=${props.involvedSchools}`,
      ],
    },
    {
      path: `/matches/${props.matchId}/availability`,
      storeAs: 'availability',
    },
  ]),
  connect(mapStateToProps),
)(Dates);
