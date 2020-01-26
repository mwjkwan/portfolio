/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';

import Header from '../components/Header';
import Loading from '../components/Loading';

const checkInStyle = css`
  font-weight: bold;

  .conf-container {
    margin: 20px auto;
  }

  p {
    margin-bottom: 1em;
  }

  button {
    max-width: 300px;
    margin-right: 1em;
    margin-bottom: 1em;
    padding: 0.1em;
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

export default class ConfirmationCodes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      codes: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const today = new Date(
      new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
      }),
    );

    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateId = this.props.restaurantInformation.dates[`${month}-${day}`];

    if (!dateId) {
      this.setState({ codes: [], day, loading: false });
      return;
    }

    const codeSnapshot = await this.props.firebase
      .ref('/codes')
      .orderByChild('date')
      .equalTo(dateId)
      .once('value');
    const codes = codeSnapshot.val() || [];

    this.setState({ codes, day, loading: false, month });
  }

  render() {
    const { loading, codes, day, month } = this.state;
    const { name } = this.props.restaurantInformation;

    if (loading) {
      return <Loading />;
    }

    const displayDate = `${month}/${day}`;

    return (
      <div className="RestaurantHome" css={checkInStyle}>
        <Header>
          {displayDate} {name.toUpperCase()} CONFIRMATION CODES
        </Header>
        <div>
          <b>Confirmation Codes</b>
          <table>
            <tbody>
              {Object.keys(codes).map(code => (
                <tr key={code}>
                  <td>{code}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {codes.length === 0 && (
            <div>No codes found for today, {displayDate}!</div>
          )}
        </div>
      </div>
    );
  }
}
