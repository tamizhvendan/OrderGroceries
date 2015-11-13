import React from 'react';
import { Modal} from 'react-bootstrap';
import RegistrationForm from './registrationForm.jsx';
import AltContainer from 'alt-container';
import {store, actions} from './registrationFlux.js';

class RegisterGroceryStore extends React.Component {

  render () {
    if (this.props.showRegisterStoreForm) {
      return (<RegistrationForm show={this.props.show}
                      onSubmit={this.props.register}
                      onHide={this.props.onHide}
                      onCancel={this.props.onHide}
                      backendValidationErrors={this.props.backendValidationErrors}/>);
    } else {
      return null;
    }
  }
};

class RegisterGroceryStoreContainer extends React.Component {
  render() {
    return (
      <AltContainer store={store} actions={actions}>
        <RegisterGroceryStore onHide={this.props.onHide} show={this.props.show}/>
      </AltContainer>
    );
  }
}

export default RegisterGroceryStoreContainer;
