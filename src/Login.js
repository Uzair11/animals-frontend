import React, {Component} from 'react';
import * as CONSTANTS from './Constants'
import axios from 'axios';

class LoginPage extends Component {
	constructor(props){
		super(props)

		this.state = {
			loginEmail: '',
			loginPassword: '',
			loginError:'',
			signupEmail: '',
			signupPassword: '',
			signupMessage: '',
		}
	}

	render(){
		return(
			<div className="App">
			  <div className="Login">
		        <h1>Login</h1>
                <label>Email:</label>
                <input type="text" name="email" id="email" onChange={this.onLoginEmailChange} value={this.state.loginEmail}/><br/><br/>
                <label>Password:</label>
                <input type="text" name="password" id="password" onChange={this.onLoginPasswordChange} value={this.state.loginPassword}/><br/><br/>
                <p>{this.state.loginError}</p>
                <input type="submit" value="Submit" onClick={this.attemptLogin}/>
                <br/><br/>
			  </div>
			  <div className="Signup">
                <h1>Signup</h1>
                <label>Email:</label>
                <input type="text" name="email" id="email" onChange={this.onSignupEmailChange} value={this.state.signupEmail}/><br/><br/>
                <label>Password:</label>
                <input type="text" name="password" id="password" onChange={this.onSignupPasswordChange} value={this.state.signupPassword}/><br/><br/>
                <p>{this.state.signupMessage}</p>
                <input type="submit" value="Submit" onClick={this.attemptSignup}/>
                <br/><br/>
			  </div>
		    </div>

		);
	}

	onLoginEmailChange = (e) => {
		this.setState({loginEmail: e.target.value});
	}

	onLoginPasswordChange = (e) => {
		this.setState({loginPassword: e.target.value});
	}

	onSignupEmailChange = (e) => {
		this.setState({signupEmail: e.target.value});
	}

	onSignupPasswordChange = (e) => {
		this.setState({signupPassword: e.target.value});
	}

	attemptLogin = (e) => {
      axios.post(CONSTANTS.BASE_URL + CONSTANTS.LOGIN_URL, {
          email: this.state.loginEmail,
	    		password: this.state.loginPassword,
        })
        .then((response) => {
          console.log(response);
          this.setState({loginError: ''})
          sessionStorage.setItem('token',response.data.token)
          this.props.setUserProps(response.data.token, response.data.id, response.data.email)
        })
        .catch((error) => {
          console.log(error);
          this.setState({loginError: 'Login failed. Please check email and credentials and try again.'})
      });
	}

	attemptSignup = (e) => {
      axios.post(CONSTANTS.BASE_URL + CONSTANTS.SIGNUP_URL, {
          email: this.state.signupEmail,
	      password: this.state.signupPassword,
        })
        .then((response) => {
          console.log(response);
          this.setState({signupMessage: 'Signup Successful. Please login to continue'})

        })
        .catch((error) => {
          console.log(error);
          this.setState({signupMessage: 'Signup failed. Please ensure entering correct email address.'})
      });
	}
}

export default LoginPage;
