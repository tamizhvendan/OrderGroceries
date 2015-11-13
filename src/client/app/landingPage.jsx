import React from 'react'
import {Link} from 'react-router'
import {Button, ButtonToolbar} from 'react-bootstrap';
import {App, Page, Navbar, Hero, Footer} from 'neal-react';
import RegisterGroceryStore from './grocerystore/registration/registerGroceryStore.jsx';

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
  }

  openRegisterStore () {
    this.setState({showRegisterStoreForm : true});
  }

  closeRegisterStore () {
    this.setState({showRegisterStoreForm : false});
  }

  render () {
    return (
      <Page>
        <Navbar brand={brandName}>

        </Navbar>
        <Hero backgroundImage="public/img/hero-bg-01.jpg"
            className="text-center">
            <h1 className="display-1"> Order Groceries from your own comfort</h1>
            <p className="lead">Add item(s) -> Select Store -> Place Order -> Relax</p>
            <ButtonToolbar>
              <Button bsStyle="primary">Order Groceries</Button>
              <Button bsStyle="success" onClick={this.openRegisterStore}>Register Your Store</Button>
              <RegisterGroceryStore show={this.state.showRegisterStoreForm} onHide={this.closeRegisterStore}/>
            </ButtonToolbar>
        </Hero>
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
