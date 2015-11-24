import {Form} from 'react-bootstrap-validation';

class CustomForm extends Form {
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

export default CustomForm;
