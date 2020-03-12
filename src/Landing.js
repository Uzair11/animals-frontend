import React, {Component} from 'react';
import * as CONSTANTS from './Constants'
import axios from 'axios';

class LandingPage extends Component {
	constructor(){
		super()
		this.state = {
			currentAnimalFocused: -1,
			updateText: '',
			fetchedData: [],
		}
	}

	render(){
      return (
        <div className="App">
          <h1>My dogs and cats</h1>
          <table>
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Type </th>
                    <th>Date-Of-Birth</th>
                    <th>Update-Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.generateTable()}
            </tbody>
          </table>
          <br/>
          <span style={{fontSize:12}}> To add animal, Please use admin interface. <br/>
                                       Admin interface: <a href={CONSTANTS.BASE_URL}>{CONSTANTS.BASE_URL}</a>
          </span>


          <br/><br/>
          <button onClick={this.logout}>Log out</button>
        </div>
      );
  }

  componentDidMount(){
    this.fetchData()
  }

  generateTable = () => {
    var rows = []

    for(var i=0; i<this.state.fetchedData.length; i++) {
        rows.push(<tr><td> </td></tr>)
        rows.push(
            <tr key={this.state.fetchedData[i].id}>
                <td>{this.state.fetchedData[i].name} </td>
                <td>{this.state.fetchedData[i].type === 1 ? 'Cat' : 'Dog'}</td>
                <td>{this.state.fetchedData[i].dob}</td>
                <td>
                    <input  placeholder="Update name"
                            onChange={this.updateNameInputChange}
                            id={this.state.fetchedData[i].id}
                            value={this.state.fetchedData[i].id == this.state.currentAnimalFocused ?  this.state.updateText : '' }
                            onClick={this.updateNameInputClick}/>
                    <button id={this.state.fetchedData[i].id} onClick={this.updateNameButtonClick}>Update</button>
                </td>
                <td><button id={this.state.fetchedData[i].id} onClick={this.deleteAnimalButtonClick}>Delete</button></td>
            </tr>
        )
    }
    return rows
  }

  updateNameInputChange = (e) => {
        this.setState({updateText: e.target.value})
    }
  updateNameInputClick = (e) => {
    this.setState({currentAnimalFocused: e.target.id})
  }

  updateNameButtonClick = (e) => {
    const authStr = 'Bearer '.concat(this.props.token);
    const data = {name: this.state.updateText}
    const headers = { 'Authorization': authStr }
    axios.patch(CONSTANTS.BASE_URL + CONSTANTS.ANIMALS_URL + e.target.id, data, {headers: headers
    })
    .then((response) => {
        console.log(response);
        this.fetchData()
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  deleteAnimalButtonClick = (e) => {
    const authStr = 'Bearer '.concat(this.props.token);
    axios.delete(CONSTANTS.BASE_URL + CONSTANTS.ANIMALS_URL + e.target.id, {
        headers: { 'Authorization': authStr }
    })
    .then((response) => {
        console.log(response);
        this.fetchData()
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  fetchData = () => {
    const authStr = 'Bearer '.concat(this.props.token);
    axios.get(CONSTANTS.BASE_URL + CONSTANTS.ANIMALS_URL, {
        headers: { 'Authorization': authStr }
    })
    .then((response) => {
        this.setState({fetchedData: response.data})
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  logout = () => {
    sessionStorage.removeItem('token')
    this.props.setUserProps('', '', '')
  }
}



export default LandingPage;
