import React from "react";
import Sidebar from './components/Sidebar';
import NavigationBar from './pages/NavigationBar';

import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const mql = window.matchMedia(`(min-width: 800px)`);
 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };
 
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }
 
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }
 
  render() {
    const prefix = '/restaurant';

    return (
      <Router>
        {/* <Sidebar
          sidebar={<b>Sidebar content</b>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
        >
          <b>Main content</b>
      </Sidebar> */}
        <div className="Page">
          <Sidebar leftSidebar={<NavigationBar />}>
            <Switch>
              <Route
                exact
                path={prefix}
                render={() => <div>Home</div>}
              />
              <Route
                exact
                path={`${prefix}/check-in`}
                render={() => <div>School</div>}
              />
              <Route
                exact
                path={`${prefix}/stats`}
                render={() => <div>Stats</div>}
              />
            </Switch>
          </Sidebar>
        </div>
      </Router>
    );
  }
}

export default App;