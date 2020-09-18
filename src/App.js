import React from 'react';
import './App.css';
import AccomList from './components/accommodation/ListAccom'
import AccomDetails from './components/accommodation/AccomDetails'
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
      <Route exact path="/accommodation" component={AccomList}/>
      <Route exact path="/accommodation/:id" component={AccomDetails} />
      </Switch>
     
     
    </div>
  );
}

export default App;
