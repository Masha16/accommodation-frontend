import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
 
class Login extends Component {
  state = { username: '', password: '' }
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.service.login(username, password)
    .then( response => {
        this.setState({ username: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <div class="login" >
        
        <div class="login-container">
        

        <form onSubmit={this.handleFormSubmit} >
          
          <input type="text" name="username"  placeholder="Your username" value={this.state.username} onChange={ e => this.handleChange(e)}/> <br/>
          
          <input name="password" value={this.state.password} placeholder="Your password" onChange={ e => this.handleChange(e)} /> <br/>
          
          <input type="submit" value="Login" /><br/>
        </form>
        <p>Don't have account? > 
            <Link to={"/signup"}>Signup</Link>
        </p>
        </div>
      </div>
    )
  }
}
 
export default Login;