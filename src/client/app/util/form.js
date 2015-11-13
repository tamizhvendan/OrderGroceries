import {Form} from 'react-bootstrap-validation';

export default class CustomForm extends Form {
  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.backendValidationErrors)){
        this.setState({
          isValid : false,
          invalidInputs: Object.assign(this.state.invalidInputs, newProps.backendValidationErrors)
        });
    }
  }
}
