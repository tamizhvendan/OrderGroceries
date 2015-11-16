import {Form,ValidatedInput} from 'react-bootstrap-validation';
import groceryStoreSchema from '../../../../schema/groceryStore.js';
import revalidator from 'revalidator';
import React from 'react';
import {Modal, ButtonInput, Row, Col} from 'react-bootstrap';

class MyForm extends Form {
  componentWillReceiveProps(newProps) {
    if (this.hasErrors(newProps.backendValidationErrors)) {
      this.setState({
        isValid : false,
        invalidInputs : Object.assign(this.state.invalidInputs, newProps.backendValidationErrors)
      });
    }
  }
  componentDidUpdate() {
    if (this.hasErrors(this.props.backendValidationErrors)) {
      this.props.handleBackendValidationErrors(this.props.backendValidationErrors);
    }
  }

  hasErrors(errors) {
    return Object.keys(errors).length != 0;
  }
}

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props);
    this.validateAll = this.validateAll.bind(this);
  }

  validateAll (values) {
    //return true;
    let res = revalidator.validate(values, groceryStoreSchema);
    if (res.valid) {
        return true;
    }

    let errors = res.errors.reduce((errors, error) => {
        errors[error.property] = error.message;
        return errors;
    }, {});
    let fields = Object.keys(errors);
    this.refs[fields[0]].getInputDOMNode().focus();
    return errors;
  }

  handleBackendValidationErrors (errors) {
    let fields = Object.keys(errors);
    this.refs[fields[0]].getInputDOMNode().focus();
  }

  onSubmit(args) {
    if (this.props.isRegistrationInProgress) {
      return;
    } else {
      this.props.onSubmit(args);
    }
  }

  render () {
    let registerLabel = "Register"
    if (this.props.isRegistrationInProgress) {
        registerLabel = "Please wait...";
    }
    let form = (
      <MyForm validateAll={this.validateAll}
          onValidSubmit={this.onSubmit.bind(this)}
          backendValidationErrors={this.props.backendValidationErrors}
          handleBackendValidationErrors={this.handleBackendValidationErrors.bind(this)}>
        <ValidatedInput type='text' label='Store Name' name='storeName' ref='storeName' bsSize="small" autoFocus/>
        <ValidatedInput type='text' label='Email' name='email' ref='email' wrapperClassName="small" />
        <ValidatedInput type='password' label='Password' name='password' ref='password'/>
        <ValidatedInput type='password' label='Confirm Password' name='confirmPassword' ref='confirmPassword'/>
        <ValidatedInput type='text' label='Address Line 1' name='addressLine1' ref='addressLine1'/>
        <ValidatedInput type='text' label='Address Line 2' name='addressLine2' ref='addressLine2'/>
        <ValidatedInput type='text' label='Zip Code' name='zipCode' ref='zipCode'/>
        <ValidatedInput type='text' label='Mobile Number' name='mobile' ref='mobile'/>
        <Row>
            <Col xs={3} xsOffset={4}>
              <ButtonInput type='submit' bsStyle='primary' value={registerLabel} />
            </Col>
            <Col xs={3} xsOffset={1}>
              <ButtonInput type='button' bsStyle='default' value='Cancel' onClick={this.props.onCancel}/>
            </Col>
        </Row>
      </MyForm>
    );
    if (this.props.isRegistrationFailed) {
      form = <p>Registration Failed</p>
    }
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} bsSize="medium">
        <Modal.Header>
          <Modal.Title>Register Your Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form}
        </Modal.Body>
        <Modal.Footer>
          <p>Registration is free for a limited time!</p>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RegistrationForm;
