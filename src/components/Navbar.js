import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class navbar extends Component {

  state = { loggedInUser: null }

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
        <nav className="nav-style">
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
           
            <li><Link to="/accommodation" style={{ textDecoration: 'none' }}>Available accommodation</Link></li>
            <li><Link to="/accommodationcreate" style={{ textDecoration: 'none' }}>Make a new accommodation</Link></li>
            <li>
              <Link to='/'>
                <button onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
        
          
          </ul>
        </nav>
      )
    } else {
      return (
        <div>
        <nav className="nav-style">
          <ul>
            <li><Link to='/signup' style={{ textDecoration: 'none' }}>Signup</Link></li>
          </ul>
        </nav>
        </div>
      )
    }
    }
}
 
export default navbar;