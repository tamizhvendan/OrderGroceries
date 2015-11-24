import React from 'react'
import {Link} from 'react-router'
import {Button, ButtonToolbar, NavBrand} from 'react-bootstrap';
import {App, Page, Navbar, Hero, Footer, NavItem} from 'neal-react';
import RegisterGroceryStore from './grocerystore/registration/registerGroceryStore.jsx';

var ReactToastr = require("react-toastr");
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

let brandName = "Order Groceries";

let businessAddress = (
  <address>
    <strong>{brandName}</strong><br/>
    Plot No C2, AGS Colony I Cross Street<br/>
    Chennai, TN, India 600041<br/>
  </address>
);

class LandingPage extends React.Component{

  constructor(props){
    super(props);
    this.state = { showRegisterStoreForm : false }
    this.openRegisterStore = this.openRegisterStore.bind(this);
    this.closeRegisterStore = this.closeRegisterStore.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.notifyRegistrationSuccess = this.notifyRegistrationSuccess.bind(this);
    this.notifyRegistrationFailure = this.notifyRegistrationFailure.bind(this);
  }

  showLogin() {
    this.props.history.replaceState({}, '/login');
  }

  openRegisterStore () {
    this.setState({showRegisterStoreForm : true});
  }

  closeRegisterStore () {
    this.setState({showRegisterStoreForm : false});
  }

  notifyRegistrationFailure() {
    this.closeRegisterStore();
    this.refs.container.failure(
      "An unexpected error has happened",
      "Registration Failure", {
      timeOut: 10000,
      extendedTimeOut: 5000
    });
  }

  notifyRegistrationSuccess(user) {
    this.closeRegisterStore();
    this.refs.container.success(
      "Check your inbox to verify your email address.",
      "Registration Success", {
      timeOut: 10000,
      extendedTimeOut: 5000
    });
  }

  render () {
    return (
      <Page>
        <Navbar brand="Order Groceries">
          <NavItem><Link to="login" className="nav-link">Login</Link></NavItem>
        </Navbar>
        <Hero backgroundImage="public/img/hero-bg-01.jpg"
            className="text-center">
            <h1 className="display-1"> Order Groceries from your comfort</h1>
            <p className="lead">Add item(s) -> Select Store -> Place Order -> Relax</p>
            <ButtonToolbar>
              <Button bsStyle="primary" onClick={this.showLogin}>Order Groceries</Button>
              <Button bsStyle="success" onClick={this.openRegisterStore}>Register Your Store</Button>
              <RegisterGroceryStore showRegisterStoreForm={this.state.showRegisterStoreForm}
                                    onHide={this.closeRegisterStore}
                                    onSuccess={this.notifyRegistrationSuccess}
                                    onFailure={this.notifyRegistrationFailure}/>
            </ButtonToolbar>
        </Hero>
        <ToastContainer ref="container"
                        toastMessageFactory={ToastMessageFactory}
                        className="toast-top-right" />
        <Footer brandName={brandName}
            twitterUrl="http://www.twitter.com/tamizhvendan"
            githubUrl="https://github.com/tamizhvendan/OrderGroceries"
            address={businessAddress}>
        </Footer>
      </Page>
    );
  }
}

export default LandingPage;
