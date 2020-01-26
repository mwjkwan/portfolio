/** @jsx jsx */

import { Component } from 'react';
import { jsx, css } from '@emotion/core';
import ReactLoading from 'react-loading';
import { feedbackUrl } from 'constants/Feedback';

const emailStyle = css`
  button {
    &:hover {
      text-decoration: none !important;
    }
  }
`;

export default class EmailForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', loading: false };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const scriptUrl = feedbackUrl;
    const url = `${scriptUrl}?callback=ctrlq&email=${
      this.state.email
    }&sheet=${'Interest'}`;
    fetch(url, { mode: 'no-cors' }).then(
      () => {
        this.setState({ sent: true, loading: false });
      },
      () => {
        this.setState({ error: true, loading: false });
      },
    );
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div
        className="email"
        style={{ justifyContent: this.props.center ? 'center' : 'flex-start' }}
        css={emailStyle}
      >
        <div style={{ textAlign: 'center' }}>
          {!this.state.sent ? (
            !this.state.loading ? (
              <form
                onSubmit={this.onFormSubmit}
                style={{ display: 'flex', maxWidth: 300, margin: '0 auto' }}
              >
                <input
                  onChange={this.onInputChange}
                  placeholder={'Enter your email'}
                  type="email"
                  name="email"
                  required
                  style={{ background: 'white' }}
                />
                <button
                  style={{
                    width: 50,
                    background: 'black',
                    color: 'white',
                    fontSize: 20,
                  }}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </form>
            ) : (
              <ReactLoading
                type={'bubbles'}
                width={30}
                height={30}
                color={'black'}
              />
            )
          ) : (
            <div style={{ marginLeft: 5, marginRight: 5 }}>
              {"Thank you! We'll reach out soon 😎"}
            </div>
          )}
        </div>
      </div>
    );
  }
}
