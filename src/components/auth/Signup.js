import React, { Component } from 'react';
import AuthService from './auth-service';
import { Link } from 'react-router-dom';
 
class Signup extends Component {
 
  state = { username: '', password: '', email: "" }
 
  service = new AuthService()
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const email= this.state.email;
   
    this.service.signup(username, password, email)
    .then( response => {
        this.setState({
            username: "", 
            password: "",
            email: "",
        });
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
      <div class="login">
        <div class="login-container">
        <form onSubmit={this.handleFormSubmit}>
        <input type="text" name="email" placeholder="Your email.." value={this.state.email} onChange={ e => this.handleChange(e)}/>
          
          <input type="text" name="username" placeholder="Create username..." value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          
          <input type="password" name="password" placeholder="Create a password..." value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>
        <p>Already have account? >
            <Link to={"/"}> Login</Link>
        </p>
        
        </div>

        
      </div>
    )
  }
}
 
export default Signup;