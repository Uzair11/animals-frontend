import React, {Component} from 'react';
import * as CONSTANTS from './Constants'
import axios from 'axios';

class LoginPage extends Component {
	constructor(props){
		super(props)

		this.state = {
			email: '',
			password: '',
			error:'',
		}
	}

	render(){
		return(
			<div className="App">
		      <h1>Login Page</h1>
		        <label>Email:</label>
		        <input type="text" name="email" id="email" onChange={this.onEmailChange} value={this.state.email}/><br/><br/>
		        <label>Password:</label>
		        <input type="text" name="password" id="password" onChange={this.onPasswordChange} value={this.state.password}/><br/><br/>
		        <p>{this.state.error}</p>
		        <input type="submit" value="Submit" onClick={this.attemptLogin}/>
					<br/><br/>
		    </div>

		);
	}

	onEmailChange = (e) => {
		this.setState({email: e.target.value});
	}

	onPasswordChange = (e) => {
		this.setState({password: e.target.value});
	}

	attemptLogin = (e) => {
      axios.post(CONSTANTS.BASE_URL + CONSTANTS.LOGIN_URL, {
          email: this.state.email,
	    		password: this.state.password,
        })
        .then((response) => {
          console.log(response);
          this.setState({error: ''})
          sessionStorage.setItem('token',response.data.token)
          this.props.setUserProps(response.data.token, response.data.id, response.data.email)
        })
        .catch((error) => {
          console.log(error);
          this.setState({error: 'Login failed. Please check email and credentials and try again.'})
      });
	}

}

export default LoginPage;
