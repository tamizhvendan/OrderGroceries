import React from 'react';
import { Modal} from 'react-bootstrap';
import RegistrationForm from './registrationForm.jsx';

class RegisterGroceryStore extends React.Component{

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="medium" autoFocus={true}>
        <Modal.Header>
          <Modal.Title>Register Your Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegistrationForm onCancel={this.props.onHide}/>
        </Modal.Body>
        <Modal.Footer>
          <p>Registration is free for a limited time!</p>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default RegisterGroceryStore;
