import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, firebaseConnect } from 'react-redux-firebase';

class Chat extends Component {
  state = { message: '', hide: true };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      // behavior: "smooth"
    });
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage = () => {
    if (this.state.message.length > 0) {
      this.props.updateMessages(this.state.message);
      this.props.unreadMessage(this.props.otherUid, true);
      this.props.unreadMessage(this.props.uid, false);
      this.setState({ message: '' });
    }
  };

  render() {
    if (this.state.hide) {
      return (
        <div style={{ width: '100%', position: 'relative' }}>
          {this.props.matchObject[this.props.uid] && (
            <div
              style={{
                position: 'absolute',
                top: -10,
                right: -10,
                width: 25,
                height: 25,
                background: '#EC4E55',
                borderRadius: '50%',
              }}
            />
          )}
          <button
            onClick={() => {
              this.setState({ hide: false });
              this.props.unreadMessage(this.props.uid, false);
            }}
            style={{ fontFamily: 'apercu-light' }}
          >
            open chat
          </button>
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
      );
    }

    return (
      <div
        style={{
          background: 'white',
          boxShadow: '0 1px 4px rgba(0, 0, 0, .3)',
        }}
      >
        <div style={{ height: 40, width: '100%', background: 'grey' }}>
          <button
            style={{ float: 'right', fontFamily: 'apercu-light' }}
            onClick={() => this.setState({ hide: true })}
          >
            close chat
          </button>
        </div>
        <div
          style={{
            height: 400,
            width: '100%',
            overflow: 'auto',
            border: '1px solid #DADDE1',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              padding: 20,
              borderBottom: '1px solid #DADDE1',
              fontFamily: 'apercu-light',
            }}
          >
            Plan your hangout! Or chat about life!
          </div>
          {this.props.messages &&
            this.props.messages.map((message, index) => {
              return (
                <div
                  key={message.key}
                  style={{
                    padding: 10,
                    borderBottom: '1px solid #DADDE1',
                    flexWrap: 'wrap',
                    fontFamily: 'apercu-light',
                    // textAlign: this.props.name === message.value.name ? "left" : "right"
                  }}
                >
                  <div style={{ fontSize: 10, opacity: 0.8 }}>
                    {message.value.name}
                  </div>
                  <div style={{ fontFamily: 'apercu-light' }}>
                    {message.value.text}
                  </div>
                </div>
              );
            })}
          <div
            style={{ float: 'left', clear: 'both' }}
            ref={el => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <div style={{ display: 'flex' }}>
          <input
            placeholder={'Type a message'}
            value={this.state.message}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                this.sendMessage();
              }
            }}
            onChange={event => {
              this.setState({
                message: event.target.value,
              });
            }}
            style={{ fontFamily: 'apercu-light' }}
          />
          <button
            style={{
              width: 100,
              height: 50,
              background: '#EC4E55',
              fontFamily: 'apercu-light',
            }}
            onClick={this.sendMessage}
          >
            send
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  var name = state.firebase.profile.name; // + " " + state.firebase.profile.last;
  var messages = state.firebase.ordered.messages;
  var actualmessages = messages && messages[props.match];
  // var actualmessages = messages && messages[props.survey] && messages[props.survey][props.match]
  return {
    messages: actualmessages,
    updateMessages: text => {
      props.firebase.push('/messages/' + props.match, {
        text: text,
        name: name,
        time:
          (actualmessages &&
            actualmessages.length &&
            actualmessages[actualmessages.length - 1].value.time + 1) ||
          0,
      });
      //Timestamps for reason don't work for time, idk why
    },
  };
};

export default compose(
  firebaseConnect(props => [
    {
      path: '/messages/' + props.match,
      // path: props.match,
      // storeAs: "messages",
      queryParams: ['orderByChild=time', 'limitToLast=100'],
    },
  ]),
  firestoreConnect(),
  connect(mapStateToProps),
)(Chat);
