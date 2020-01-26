import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

import { feedbackUrl } from 'constants/Feedback';

class PageFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = { feedback: '' };
  }

  onFormSubmit = e => {
    e.preventDefault();
    const scriptUrl = feedbackUrl;
    const url = `${scriptUrl}?callback=ctrlq&name=${this.props.name}&email=${
      this.props.email
    }&feedback=${this.state.feedback}&sheet=${'Feedback'}`;
    fetch(url, { mode: 'no-cors' }).then(
      () => {
        this.setState({ sent: true });
      },
      () => {
        this.setState({ error: true });
      },
    );
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.name);
    return (
      <div className="PageFeedback">
        <div className="header">FEEDBACK</div>
        <br />
        <div>
          We're constantly trying to iterate on and improve Datamatch. Feel free
          to send us your thoughts on how we can improve the product for you and
          what problems you'd like for us to solve!
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          {!this.state.sent ? (
            <form onSubmit={this.onFormSubmit}>
              <textarea
                onChange={this.onInputChange}
                placeholder="Your thoughts.."
                type="feedback"
                name="feedback"
                required
                style={{ width: '100%', height: 300 }}
              />
              <br />
              <br />
              <button>Send your feedback!</button>
            </form>
          ) : (
            <div>
              Thank you for your feedback! We'll try our best to address any
              concerns!
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { email } = state.firebase.auth;
  const { name } = state.firebase.profile;
  return { email, name };
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(PageFeedback);
