import React from "react";
import Sidebar from './components/Sidebar';
import NavigationBar from './pages/NavigationBar';
import PageAbout from './pages/PageAbout'
import PageProjects from './pages/PageProjects'
import Datamatch from './pages/projects/Datamatch'
import HarvardOpenDataProject from './pages/projects/HarvardOpenDataProject'
import LayoutAlgo from './pages/projects/LayoutAlgo'
import CS51 from './pages/projects/CS51'
import 'styles/styles.scss';

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
    const prefix = '';

    return (
      <Router>
        <div className="Page">
          <Sidebar leftSidebar={<NavigationBar />}>
            <Switch>
              <Route
                exact
                path={`/`}
                render={() => <PageAbout />}
              />
              <Route
                exact
                path={`${prefix}/projects`}
                render={() => <PageProjects />}
              />
              <Route
                exact
                path={`${prefix}/multimedia`}
                render={() => <div>Multimedia</div>}
              />
              <Route
                exact
                path={`${prefix}/writing`}
                render={() => <div>Papers</div>}
              />
              <Route
                exact
                path={`${prefix}/resume`}
                render={() => <div>Resume</div>}
              />
              <Route
                exact
                path={`${prefix}/projects/datamatch`}
                render={() => <Datamatch />}
              />
              <Route
                exact
                path={`${prefix}/projects/hodp`}
                render={() => <HarvardOpenDataProject />}
              />
              <Route
                exact
                path={`${prefix}/projects/page-layout-algorithm`}
                render={() => <LayoutAlgo />}
              />
              <Route
                exact
                path={`${prefix}/projects/cs51`}
                render={() => <CS51 />}
              />
            </Switch>
          </Sidebar>
        </div>
      </Router>
    );
  }
}

export default App;