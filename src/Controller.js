import React, {Component} from 'react';
import * as CONSTANTS from './Constants'
import LoginPage from './Login';
import LandingPage from './Landing';
import axios from 'axios';

class Controller extends Component {
	constructor(props){
		super(props)
		this.state = {
			user_token: sessionStorage.getItem('token'),
			user_id: '',
			user_email:'',
		}
	}

  loginCallback = (token, id, email) => {
    this.setState({user_token:token, user_id: id, user_email:email})
  }

  render(){
    if (this.state.user_token === '' || this.state.user_token == null) {
      return(<LoginPage setUserProps={this.loginCallback}/>)
    }
    else {
      return(<LandingPage setUserProps={this.loginCallback} token={this.state.user_token} />)
    }
	}



}

export default Controller;
