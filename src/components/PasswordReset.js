import React, { Component } from 'react';
import Input from '../components/Input';

export default class PageSettingsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { resetPassword: false, reset0: '', reset1: '', reset2: '' };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  resetPasswordFields = () =>
    this.setState({
      resetPassword: false,
      reset0: '',
      reset1: '',
      reset2: '',
    });

  updatePassword = () => {
    const { auth, reauthenticate } = this.props;
    const { reset0, reset1 } = this.state;
    reauthenticate(reset0)
      .then(() => {
        auth()
          .currentUser.updatePassword(reset1)
          .then(() => {
            alert('Password Reset!');
            this.resetPasswordFields();
          })
          .catch(error => {
            alert('PASSWORD RESET FAILED: ' + error.message);
            this.resetPasswordFields();
          });
      })
      .catch(error => {
        alert('PASSWORD RESET FAILED ' + error.message);
        this.resetPasswordFields();
      });
  };

  render() {
    const { resetPassword, reset0, reset1, reset2 } = this.state;
    const works = reset0 && reset1 === reset2 && reset1.length > 6;

    return (
      <div>
        <br />
        <div>
          <h5>Password</h5>
          {!resetPassword && (
            <button onClick={() => this.setState({ resetPassword: true })}>
              Reset Password
            </button>
          )}
        </div>
        {resetPassword && (
          <div>
            <Input
              handleInputChange={this.handleInputChange}
              name="reset0"
              placeholder="Old Password"
              type="password"
              value={this.state.reset0}
            />
            <br />
            <Input
              handleInputChange={this.handleInputChange}
              name="reset1"
              placeholder="New Password"
              type="password"
              value={this.state.reset1}
            />
            <br />
            <Input
              handleInputChange={this.handleInputChange}
              name="reset2"
              placeholder="Confirm New Password"
              type="password"
              value={this.state.reset2}
            />
            <button
              onClick={() => this.updatePassword()}
              style={{
                marginTop: 20,
                opacity: works ? 1 : 0.8,
                pointerEvents: works ? 'auto' : 'none',
                marginBottom: 0,
              }}
            >
              Confirm Password Change
            </button>
            <br />
            <br />
            <button onClick={() => this.setState({ resetPassword: false })}>
              Cancel Reset
            </button>
          </div>
        )}
      </div>
    );
  }
}
