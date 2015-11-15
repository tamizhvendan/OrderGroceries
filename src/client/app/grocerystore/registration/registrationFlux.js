import alt from '../../alt';
import axios from 'axios';

class RegistrationActions {
    register(args){
      this.actions.registrationInProgress();
      return (dispatch) => {
        axios
          .post('/api/grocerystore', args)
          .then(res => dispatch(res))
          .catch(res => dispatch(res))
      }
    }

    registrationInProgress() {
      this.dispatch();
    }
}



export const actions = alt.createActions(RegistrationActions);

class RegistrationStore {
    constructor(){
      this.bindActions(actions);
      this.state = {
        showRegisterStoreForm : true,
        backendValidationErrors : {},
        isRegistrationInProgress : false
      }
    }
    register(registrationResponse) {

      if (registrationResponse.status === 200) {
        this.setState({
          showRegisterStoreForm : false,
          isRegistrationInProgress : false
        });
      } else if (registrationResponse.status === 400){
        this.setState({
          backendValidationErrors : registrationResponse.data,
          isRegistrationInProgress : false
        });
      }
    }

    registrationInProgress() {
      this.setState({isRegistrationInProgress : true, backendValidationErrors : []})
    }
}

export const store = alt.createStore(RegistrationStore);
