import {ValidatedInput, Form} from 'react-bootstrap-validation';
import groceryStoreSchema from '../../../schema/groceryStore.js';
import revalidator from 'revalidator';
import React from 'react';
import {ButtonInput, Row, Col} from 'react-bootstrap';

class RegistrationForm extends React.Component {
  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }
  submit (values) {
    alert('Success!');
    console.log(values);
  }
  validateAll (values) {
    let res = revalidator.validate(values, groceryStoreSchema);
    if (res.valid) {
        return true;
    }
    console.log(res.errors);
    return res.errors.reduce((errors, error) => {
        errors[error.property] = error.message;
        return errors;
    }, {});
  }
  render () {
    return (
      <Form validateAll={this.validateAll} onValidSubmit={this.submit}>
        <ValidatedInput type='text' label='Store Name' name='storeName' bsSize="small"/>
        <ValidatedInput type='text' label='Email' name='email' wrapperClassName="small"/>
        <ValidatedInput type='password' label='Password' name='password' />
        <ValidatedInput type='password' label='Confirm Password' name='confirmPassword' />
        <ValidatedInput type='text' label='Address Line 1' name='addressLine1' />
        <ValidatedInput type='text' label='Address Line 2' name='addressLine2' />
        <ValidatedInput type='text' label='Zip Code' name='zipCode' />
        <ValidatedInput type='text' label='Mobile Number' name='mobile' />
        <Row>
            <Col xs={3} xsOffset={4}>
              <ButtonInput type='submit' bsStyle='primary' value='Register' />
            </Col>
            <Col xs={3} xsOffset={1}>
              <ButtonInput type='button' bsStyle='default' value='Cancel' onClick={this.props.onCancel}/>
            </Col>
        </Row>

      </Form>
    );
  }
}

export default RegistrationForm;
