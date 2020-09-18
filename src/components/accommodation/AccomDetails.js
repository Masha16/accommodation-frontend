import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
 
class AccomDetails extends Component {
    state = {}
 
    componentDidMount(){
        this.getOneAccom();
    }
   
    getOneAccom = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/accommodation/${params.id}`)
        .then( responseFromApi =>{
            const Accommodation = responseFromApi.data;
            this.setState(Accommodation);
        })
        .catch((err)=>{
            console.log(err)
        })
    }
   
    render(){
      return(
        <div>
          <h1>{this.state.postname}</h1>
          <p>{this.state.city}</p>
          <p>{this.state.size}</p>
          <p>{this.state.description}</p>
          <Link to={'/accommodation'}>Back to available accommodation</Link>
        </div>
      )
    }
}
 
export default AccomDetails;