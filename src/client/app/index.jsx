import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import LandingPage from './landingPage.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';


class App extends React.Component {  
  render () {
    return <div>{this.props.children}</div>;
  }
}

const router = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
    </Route>
  </Router>
);

render(router, document.getElementById("app"));
