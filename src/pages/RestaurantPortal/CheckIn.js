/** @jsx jsx **/

import { Component } from 'react';
import { jsx, css } from '@emotion/core';

import Input from '../components/Input';
import ConfirmationBox from './components/ConfirmationBox';
import Header from '../components/Header';

const checkInStyle = css`
  font-weight: bold;

  .conf-container {
    margin: 20px auto;
  }

  button {
    max-width: 106px;
    height: 33px;
    background: #545353;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.05em;
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

export default class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      display: false,
      errorMessage: '',
      valid: null,
    };
  }

  handleInputChange = event => {
    const code = event.target.value;

    this.setState({
      code,
      display: false,
      errorMessage: '',
      valid: null,
    });
  };

  onClick = async () => {
    const { code } = this.state;

    if (code === '') {
      this.setState({
        valid: false,
        display: true,
        errorMessage: 'Please enter a confirmation code.',
      });
      return;
    }

    const today = new Date(
      new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
      }),
    );

    const day = today.getMonth() + 1 + '/' + today.getDate();

    const codeSnapshot = await this.props.firebase
      .ref('codes')
      .child(code)
      .once('value');

    const codeValue = codeSnapshot.val();

    if (!codeValue) {
      this.setState({
        valid: false,
        display: true,
        errorMessage: code + ' is an invalid code.',
      });
      return;
    }

    const { claimed, date: dateId } = codeValue;

    if (claimed) {
      this.setState({
        valid: false,
        display: true,
        errorMessage: `${code} has been checked-in already.`,
      });
      return;
    }

    const dateSnapshot = await this.props.firebase
      .ref('dates')
      .child(dateId)
      .once('value');

    const date = dateSnapshot.val();

    if (!date || date.place !== this.props.restaurantInformation.name) {
      this.setState({
        valid: false,
        display: true,
        errorMessage: code + ' is an invalid code.',
      });
      return;
    }

    if (date.day === day) {
      await this.props.firebase.ref(`/codes/${code}`).update({ claimed: true });
      this.setState({
        valid: true,
        display: true,
        errorMessage: '',
      });
    } else {
      this.setState({
        valid: false,
        display: true,
        errorMessage:
          'Wrong day! ' + code + ' is a valid code on ' + date.day + '.',
      });
    }
  };

  render() {
    return (
      <div className="CheckIn" css={checkInStyle}>
        <Header>CHECK-IN</Header>
        <br />
        <b>
          Please do not check a date in unless both people are physically
          present!
        </b>

        <div className="conf-container">
          <Input
            handleInputChange={this.handleInputChange}
            name="code"
            placeholder="ABC123"
            text="Type in confirmation code:"
            type="text"
          />

          <br />

          <button onClick={this.onClick}>&#10004;&nbsp;Verify</button>
        </div>

        <ConfirmationBox {...this.state} />

        <br />
      </div>
    );
  }
}
