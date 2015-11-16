import React from 'react';
import { Modal} from 'react-bootstrap';
import RegistrationForm from './registrationForm.jsx';
import AltContainer from 'alt-container';
import {store, actions} from './registrationFlux.js';

class RegisterGroceryStore extends React.Component {

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.user).length) {
      this.props.onSuccess(newProps.user);
    }
    if (newProps.isRegistrationFailed) {
      this.props.OnFailure();
    }
  }

  render () {

      return (<RegistrationForm show={this.props.show}
                      onSubmit={this.props.register}
                      onHide={this.props.onHide}
                      onCancel={this.props.onHide}
                      backendValidationErrors={this.props.backendValidationErrors}
                      isRegistrationInProgress={this.props.isRegistrationInProgress}
                      />);
  }
};

class RegisterGroceryStoreContainer extends React.Component {
  render() {
    return (
      <AltContainer store={store} actions={actions}>
        <RegisterGroceryStore
            onHide={this.props.onHide}
            show={this.props.show}
            onSuccess={this.props.onSuccess}
            onFailure={this.props.onFailure}/>
      </AltContainer>
    );
  }
}

export default RegisterGroceryStoreContainer;
