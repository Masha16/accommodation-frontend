import React, { Component } from 'react';
import './App.css';
import AccomList from './components/accommodation/ListAccom'
import AddAccom from './components/accommodation/AddAccom'
import AccomDetails from './components/accommodation/AccomDetails'
import Navbar from './components/Navbar';
import Signup from './components/auth/Signup'
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/auth-service';
import Login from './components/auth/Login'
import ProfilePage from './components/ProfilePage';
import ProtectedRoute from './components/auth/protected-route';

class App extends Component  {
  
  state = { loggedInUser: null }

  service = new AuthService()
 
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render () {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
          <Route user={this.state.loggedInUser} exact path="/accommodation" component={AccomList}/>
          <Route user={this.state.loggedInUser} path="/accommodationcreate" component={AddAccom}/>
          <ProtectedRoute user={this.state.loggedInUser} path="/accommodation/:id" component={AccomDetails} />
          <ProtectedRoute user={this.state.loggedInUser} path="/profile" component={ProfilePage} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path='/' render={() => <Login getUser={this.getTheUser}/>}/>
            <Route user={this.state.loggedInUser} path="/accommodation" component={AccomList}/>
            <Route user={this.state.loggedInUser} path="/accommodationcreate" component={AddAccom}/>
            <ProtectedRoute user={this.state.loggedInUser} path="/accommodation/:id" component={AccomDetails} />
            <ProtectedRoute  user={this.state.loggedInUser} path="/profile" component={ProfilePage} />
          </Switch>
        </div>
      );
    }
}
}

export default App;
