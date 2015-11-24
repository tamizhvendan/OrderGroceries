import React from 'react';
import Auth0Lock from 'auth0-lock';

class Login extends React.Component {
  componentWillMount () {
      this.lock = new Auth0Lock(config.auth0.clientID, config.auth0.domain);
      this.lock.on('close', () => {
        this.props.history.replaceState({},'/');
      })
      this.lock.show();
  }

  render() {
    return <p></p>;
  }

}

export default Login;
