import {ValidatedInput} from 'react-bootstrap-validation';
import groceryStoreSchema from '../../../../schema/groceryStore.js';
import revalidator from 'revalidator';
import React from 'react';
import {ButtonInput, Row, Col} from 'react-bootstrap';
import Form from '../../util/form.js';


class RegistrationForm extends React.Component {
  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.state = {validatonErrors : []}
  }
  submit (values) {
    alert('Success!');
    //this.setState({validatonErrors : {email : 'email address already exists'}})
  }
  validateAll (values) {
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
  render () {
    return (
      <Form validateAll={this.validateAll} onValidSubmit={this.submit}
          backendValidationErrors={this.state.validatonErrors}>
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
