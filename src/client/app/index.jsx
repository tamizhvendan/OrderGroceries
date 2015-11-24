import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import LandingPage from './landingPage.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Login from './login.jsx';
import Auth0Lock from 'auth0-lock';

class App extends React.Component {
  componentWillMount () {
    this.lock = new Auth0Lock(config.auth0.clientID, config.auth0.domain);
    this.setState({idToken: this.getIdToken()});
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    let authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
        return null;
      }
    }
    return idToken;
  }

  render () {
    return <div>{this.props.children}</div>;
  }
}

const router = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="login" component={Login} name="login"/>
    </Route>
  </Router>
);

render(router, document.getElementById("app"));
