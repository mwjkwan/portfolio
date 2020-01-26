import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <div
        style={{
          color: 'white',
          fontSize: '1.5em',
          fontWeight: 600,
          letterSpacing: '0.2em',
          backgroundColor: '#BD574E',
          boxShadow: '0.15em 0.15em #dedef0',
          padding: '0.1em 0.3em',
          marginBottom: '0.5em',
          display: 'inline-block',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
