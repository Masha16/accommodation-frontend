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
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
          <Route exact path="/accommodation" component={AccomList}/>
          <Route exact path="/accommodationcreate" component={AddAccom}/>
          <Route exact path="/accommodation/:id" component={AccomDetails} />
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
            <Route exact path="/accommodation" component={AccomList}/>
            <Route exact path="/accommodationcreate" component={AddAccom}/>
            <Route exact path="/accommodation/:id" component={AccomDetails} />
          </Switch>
        </div>
      );
    }
}
}

export default App;
