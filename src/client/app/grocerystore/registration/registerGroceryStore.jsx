import React from 'react';
import { Modal} from 'react-bootstrap';
import RegistrationForm from './registrationForm.jsx';
import AltContainer from 'alt-container';
import {store, actions} from './registrationFlux.js';

class RegisterGroceryStore extends React.Component {

  componentWillReceiveProps(newProps) {
    if (this.isRegistrationFormOpening(this.props, newProps)
          || this.isRegistrationFormClosing(this.props, newProps)) {
      return;
    }

    if (this.isRegistrationSucceeded(newProps)) {
      newProps.onSuccess(newProps.user);
      return;
    }

    if (newProps.isRegistrationFailed) {
      newProps.OnFailure();
      return;
    }
  }

  isRegistrationSucceeded(newProps) {
    return !!Object.keys(newProps.user).length;
  }

  isRegistrationFormClosing(oldProps, newProps) {
    return oldProps.showRegisterStoreForm && !newProps.showRegisterStoreForm;
  }

  isRegistrationFormOpening (oldProps, newProps) {
    return !oldProps.showRegisterStoreForm && newProps.showRegisterStoreForm;
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
