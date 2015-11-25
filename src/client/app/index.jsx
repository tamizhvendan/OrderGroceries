import React from 'react';
import {render} from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import LandingPage from './landingPage.jsx';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Login from './login.jsx';
import Auth0Lock from 'auth0-lock';
import StoreHome from './grocerystore/home.jsx';
import auth from './auth.js'

class App extends React.Component {
  componentWillMount () {
    this.lock = new Auth0Lock(config.auth0.clientID, config.auth0.domain);
    let authHash = this.lock.parseHash(window.location.hash);
    if (authHash && authHash.id_token) {
      auth.login(authHash.id_token);
    }
    let token = auth.getIdToken();
    if (!!token) {
      this.setState({idToken: token});
      this.props.history.replaceState({}, '/store-home');
    }
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
      <Route path="store-home" component={StoreHome} name="storeHome" onEnter={auth.requireAuth}/>
    </Route>
  </Router>
);

render(router, document.getElementById("app"));
