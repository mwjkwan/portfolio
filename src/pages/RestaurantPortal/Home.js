/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';
import Loading from '../components/Loading';

const checkInStyle = css`
  // font-weight: bold;

  .conf-container {
    margin: 20px auto;
  }

  p {
    margin-bottom: 1em;
  }

  button {
    max-width: 170px;
    margin-right: 1em;
    margin-bottom: 1em;
    padding: 0.1em;
    height: 25px;
  }

  input {
    max-width: 359px;
    height: 40px;
    border: none;
    background: #f4f2f2;
    font-family: 'Apercu-light';
    display: flex;
    align-items: center;
    letter-spacing: 0.05em;

    color: #545353;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  getDate = dateId => this.props.firebase.ref(`/dates/${dateId}`).once('value');

  async componentDidMount() {
    if (this.state.loading) {
      const { dates } = this.props.restaurantInformation;
      const datePromises = Object.keys(dates).map(date =>
        this.getDate(dates[date]),
      );
      const dateSnapshots = await Promise.all(datePromises);

      let dateObjects = {};
      dateSnapshots.forEach(
        snapshot => (dateObjects[snapshot.key] = snapshot.val()),
      );
      this.setState({ dateObjects, loading: false });
    }
  }

  renderDateSchedule() {
    const { dates } = this.props.restaurantInformation;
    const { dateObjects } = this.state;
    const orderedDays = Object.keys(dates).sort((a, b) => {
      const [month1, day1] = a.split('-').map(s => parseInt(s));
      const [month2, day2] = b.split('-').map(s => parseInt(s));
      return month1 !== month2 ? month1 - month2 : day1 - day2;
    });

    return (
      <div>
        <b>Date schedule:</b>
        <table>
          <tbody>
            <tr>
              <th>
                <b>Date</b>
              </th>
              <th>
                <b>Claimed</b>
              </th>
              <th>
                <b>Allotted</b>
              </th>
            </tr>
            {orderedDays.map(date => {
              const [month, day] = date.split('-');
              const dateString = new Date(
                `${month}/${day}/2020`,
              ).toDateString();
              const dayOfWeek = dateString.split(' ')[0];
              const { datesAllotted = 0, datesAvailable = 0 } = dateObjects[
                dates[date]
              ];

              return (
                <tr key={date}>
                  <td>{`${month}/${day} (${dayOfWeek})`}</td>
                  <td>{datesAllotted - datesAvailable}</td>
                  <td>{datesAllotted}</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <b>Total</b>
              </td>
              <td>
                <b>
                  {Object.values(dateObjects).reduce(
                    (total, { datesAllotted, datesAvailable }) =>
                      total + datesAllotted - datesAvailable,
                    0,
                  )}
                </b>
              </td>
              <td>
                <b>
                  {Object.values(dateObjects).reduce(
                    (total, { datesAllotted, datesAvailable }) =>
                      total + datesAllotted,
                    0,
                  )}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  renderButtons() {
    return (
      <div>
        <button onClick={() => this.props.history.push('/restaurant/check-in')}>
          CHECK-IN ONLINE
        </button>
        <button
          onClick={() =>
            this.props.history.push('/restaurant/confirmation-codes')
          }
        >
          PRINT TODAY'S CODES
        </button>
      </div>
    );
  }

  renderInfo() {
    const {
      contractDescription,
      dateDescription,
    } = this.props.restaurantInformation;

    return (
      <div>
        <p>
          <b>Date description: </b>
          {dateDescription || <div>Placeholder description.</div>}
        </p>
        <p>
          <b>Contract description: </b>
          {contractDescription || (
            <div>
              No contract description found! Contact{' '}
              <a href="mailto:cupids@datamatch.me">cupids@datamatch.me</a>.
            </div>
          )}
        </p>
        {this.renderDateSchedule()}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="RestaurantHome" css={checkInStyle}>
        <Header>RESTAURANT PORTAL</Header>
        <p>
          <b>Welcome to the restaurant portal!</b>
          <br />
          You can print confirmation codes below, or see the agreement you
          negotiated with the Datamatch team in more detail.
          <br />
          Contact us at{' '}
          <a href="mailto:cupids@datamatch.me">cupids@datamatch.me</a> if you’d
          like to make changes.
        </p>
        {this.renderButtons()}
        {this.renderInfo()}
      </div>
    );
  }
}

export default withRouter(Home);
