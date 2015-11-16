import alt from '../../alt';
import axios from 'axios';

class RegistrationActions {
    register(args){
      this.actions.registrationInProgress();
      return (dispatch) => {
        axios
          .post('/api/grocerystore', args)
          .then(res => this.actions.registrationSuccess(res.data))
          .catch(res => {
            if (res.status === 400) {
              this.actions.registraionValidationFailed(res.data)
            }
            this.actions.registrationFailed(res.data)
          })
      }
    }

    registraionValidationFailed(err) {
      this.dispatch(err);
    }
    registrationFailed(err) {
      this.dispatch(err);
    }
    registrationSuccess(user) {
      this.dispatch(user);
    }
    registrationInProgress() {
      this.dispatch();
    }

}

export const actions = alt.createActions(RegistrationActions);

class RegistrationStore {
    constructor(){
      this.state = {
        backendValidationErrors : {},
        isRegistrationInProgress : false,
        user : {},
        isRegistrationFailed : false
      }
      this.bindActions(actions);
    }

    registrationSuccess(user) {
      this.setState({
        user : user,
        isRegistrationInProgress : false
      });
    }

    registraionValidationFailed(err) {
      this.setState({
        backendValidationErrors : err,
        isRegistrationInProgress : false
      });
    }

    registrationFailed (res) {
        this.setState({
          isRegistrationFailed : true,
          isRegistrationInProgress : false,
        })
      }
    }

    registrationInProgress() {
      this.setState({
        isRegistrationInProgress : true,
        backendValidationErrors : [],
        user: {},
        isRegistrationFailed : false
      })
    }
}

export const store = alt.createStore(RegistrationStore);
