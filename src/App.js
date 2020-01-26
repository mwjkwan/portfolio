// import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

// function App () {

//   return (
    // <div className="PageApp">
    //   <Sidebar leftSidebar={<NavigationBar />}>
    //     <Route path="/app/faq" component={PageAbout} />
    //     <Route path="/app/press" component={PagePress} />
    //     <Route path="/app/gender_policy" component={PageGender} />
    //   </Sidebar>
    // </div>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import Sidebar from './components/Sidebar';

import NavigationBar from './pages/NavigationBar';
import PageAbout from './pages/PageAbout';
import PageGender from './pages/PageGender';
import PagePress from './pages/PagePress';

export default function App() {
  return (
    <Router>
      <div>
        <div className="PageApp">
          <Sidebar leftSidebar={<NavigationBar />}>
            <Link to="/app">Gender</Link>
            <Link to="/app/about">FAQ</Link>
            <Link to="/app/topics">Press</Link>
            {/* <Route path="/app/faq" component={PageAbout} />
            <Route path="/app/press" component={PagePress} />
            <Route path="/app/gender_policy" component={PageGender} /> */}
          </Sidebar>
        </div>
        <Switch>
          <Route path="/">
            <PageGender />
          </Route>
          <Route path="/about">
            <PageAbout />
          </Route>
          <Route path="/press">
            <PagePress />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
