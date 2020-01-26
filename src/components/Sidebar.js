import React, { Component } from 'react';
import { jsx, css } from '@emotion/core';
import ReactDom from 'react-dom';
import { withRouter } from 'react-router';
import FontAwesome from 'react-fontawesome';

import Sidebar from 'react-sidebar';

var leftSidebar = 250;
var center = 400;

const sidebarStyle = css`
  .SidebarContent {
    text-align: left;
    padding: 20px;
    min-width: 300px;
    min-height: 100%;
    position: relative;

    .Navbar {
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      padding: 10px 20px;
      // border-bottom: 1px solid rgb(243, 243, 243);
      background: white;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      background: #f9a9a5;
    }
  }

  .Sidebar {
    width: 250px;
    text-align: left;
    background: #f9a9a5;
    overflow: visible;

    a {
      font-family: 'Apercu-light';
      letter-spacing: 1px;
    }

    div {
      font-family: 'Apercu-light';
      letter-spacing: 1px;
    }
  }
`;

class MySidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.myRef = React.createRef();
    this.state = {
      leftSidebarOpen: false,
      leftSidebarDocked: true,
      transitions: false,
    };
  }

  updateWindowDimensions() {
    this.setState(state => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        leftSidebarDocked: window.innerWidth > leftSidebar + center,
        leftSidebarOpen:
          window.innerWidth > leftSidebar + center
            ? false
            : state.leftSidebarOpen,
      };
    });
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.timer = setTimeout(() => this.setState({ transitions: true }), 100);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
    window.clearTimeout(this.timer);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      ReactDom.findDOMNode(this.myRef.current).scrollIntoView();
    }
  }

  renderMobile() {
    return (
      <div className={'Navbar'}>
        {!this.state.leftSidebarDocked ? (
          <div
            onClick={() => this.setState({ leftSidebarOpen: true })}
            style={{
              marginBottom: 0,
              cursor: 'pointer',
              paddingTop: 0,
              width: 15,
            }}
          >
              <FontAwesome name={'fas-fa-bars'} style={{ fontSize: 24, color: '#000000' }} />
              HELLO
            <i className={'fas fa-bars'} style={{ fontSize: 24, color: '#000000' }}></i>
          </div>
        ) : (
          <div style={{ height: 61 }} />
        )}
        {!this.state.leftSidebarDocked ?
            <div>
                <div>MELISSA KWAN</div>
            </div> : <div />}
        <div style={{ width: 15 }} />
      </div>
    );
  }

  renderSidebarContent() {
    const mobile = !this.state.leftSidebarDocked;
    return (
      <div
        style={{
          backgroundColor: '#F9A9A5',
          padding: mobile ? 0 : '2em',
          minHeight: '100vh',
        }}
      >
        <div
          className={'SidebarContent'}
          style={{
            backgroundColor: 'white',
            padding: '2em',
            minHeight: '90vh',
          }}
        >
          {mobile && this.renderMobile()}
          <div
            style={{
              marginTop: mobile ? 61 : 0,
              paddingTop: mobile ? 20 : 0,
              // height: mobile ? "calc(100% - 45px)": "auto",
              overflowY: mobile ? 'auto' : 'hidden',
              overflowX: 'hidden',
              position: 'relative',
            }}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div css={sidebarStyle}>
        <Sidebar
          transitions={this.state.transitions}
          sidebar={
            <div
              onClick={() => this.setState({ leftSidebarOpen: false })}
              style={{ height: 'calc(100% - 30px)' }}
            >
              {this.props.leftSidebar}
            </div>
          }
          open={this.state.leftSidebarOpen}
          docked={this.state.leftSidebarDocked}
          onSetOpen={open => this.setState({ leftSidebarOpen: open })}
          styles={{
            sidebar: { width: leftSidebar, zIndex: 201, overflowY: 'auto' },
            root: { width: '100%' },
          }}
          sidebarClassName={'Sidebar'}
          shadow={false}
        >
          <div ref={this.myRef} />
          {this.renderSidebarContent()}
        </Sidebar>
      </div>
    );
  }
}

export default withRouter(MySidebar);