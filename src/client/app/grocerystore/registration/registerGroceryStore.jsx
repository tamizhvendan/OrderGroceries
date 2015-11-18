import React from 'react';
import { Modal} from 'react-bootstrap';
import RegistrationForm from './registrationForm.jsx';
import AltContainer from 'alt-container';
import {store, actions} from './registrationFlux.js';

class RegisterGroceryStore extends React.Component {

  componentWillReceiveProps(newProps) {
    if (!this.props.showRegisterStoreForm && newProps.showRegisterStoreForm) {
      return;
    }

    if (this.props.showRegisterStoreForm && !newProps.showRegisterStoreForm) {
      return;
    }

    if (Object.keys(newProps.user).length) {
      newProps.onSuccess(newProps.user);
      return;
    }
    if (newProps.isRegistrationFailed) {
      newProps.OnFailure();
      return;
    }
  }

  render () {
      return (<RegistrationForm {...this.props} />);
  }
};

class RegisterGroceryStoreContainer extends React.Component {

  render() {
    return (
      <AltContainer store={store} actions={actions}>
        <RegisterGroceryStore {...this.props}/>
      </AltContainer>
    );
  }
}

export default RegisterGroceryStoreContainer;
