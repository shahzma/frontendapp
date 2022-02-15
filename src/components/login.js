
import React, { Component} from 'react';
// import {useNavigate} from 'react-router-dom';
// import { Navigate } from "react-router-dom";
import {Navigate} from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props)
        let loggedIn = false
        this.state = {
            credentials: {username: '', password: ''},
            loggedIn
        }
    }


//   state = {
//     credentials: {username: '', password: ''},
//     loggedIn
//   }

  login = event => {
      event.preventDefault()// to stop submit form from immedeatly moving on without waiting for result
      console.log(this.state.credentials)
    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then(
        data => data.json()
        )
    .then(
      data => {
        this.props.userLogin(data.token);
        this.setState({loggedIn: true})
        console.log(this.state.loggedIn)
        // this.props.navigate('/reportlist')
      }
    )
    .catch( error => console.error(error))
    // <Navigate to="/reportlist"/>
  }

//   register = event => {
//     fetch('http://127.0.0.1:8000/api/users/', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify(this.state.credentials)
//     })
//     .then( data => data.json())
//     .then(
//       data => {
//         console.log(data.token);
//       }
//     )
//     .catch( error => console.error(error))
//   }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }


  render() {
        if(this.state.loggedIn){
            return <Navigate to = "/reportlist"/>
        }
    return (
        <form onSubmit={this.login}>
            <div className='form-inner'>
                <h2>User Login</h2>
                <div className='form-group'>
                    <label htmlFor='username'>UserName</label>
                    <input type = 'text' name = 'username' id='username' value={this.state.credentials.username} onChange={this.inputChanged}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type = 'password' name = 'password' id='password' value={this.state.credentials.password} onChange={this.inputChanged}/>
                </div>
                <input type = 'submit' value = 'Login'/>
            </div>

        </form>

    );
  }
}

export default Login;