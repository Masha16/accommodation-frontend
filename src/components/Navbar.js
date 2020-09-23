import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service'
 
class navbar extends Component {

  state = { loggedInUser: null }

  service = new AuthService()

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
    })
  }
  
  render () {
    if(this.state.loggedInUser){
      return(
        <div>
        <nav id="nav-bar">
          
            <div className="nav">
           
            <Link to="/accommodation" className="left">Available accommodation</Link>
            <Link to="/accommodationcreate" className="left">Make a new accommodation</Link>
            <Link to="/profile" className="left">Profile page</Link>
            
              <Link to='/'>
                <button className="logout" onClick={() => this.logoutUser()}>Logout</button>
              </Link>
              </div>
        </nav>
        <p className="welcome">Welcome, {this.state.loggedInUser.username}!</p>
        </div>
      )
    } else {
      return (
        <div>
        {/* <nav className="nav-style">
          <ul>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav> */}
        </div>
      )
    }
    }
}
 
export default navbar;