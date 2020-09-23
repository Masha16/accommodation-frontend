import React, { Component } from 'react';
import axios from 'axios';
import ListAccom from './accommodation/ListAccom'

class ProfilePage extends Component {
    state = {}

        getOwnPost = () => {
            const { params } = this.props.match;
            console.log(this.props.loggedInUser._id)
            axios.get(`http://localhost:5000/api/profile/${this.props.loggedInUser._id}`, {withCredentials:true})
            .then(accommodation => {
                
                this.setState({listOfAccom: accommodation.data})
        
    })
            .catch((err)=>{
                console.log(err)
            })
    

    }

    componentDidMount() {
        this.getOwnPost()
    }


    render() {
        return (
            <div>
                {this.state.listOfAccom ? this.state.listOfAccom.map((accom, index) => ( <div key={index}>
                  <h3>{accom.postname}</h3>
                  <p>City: {accom.city}</p>
                  <p>Size: {accom.size}</p>
                  <p>Price: {accom.price}</p>
                  <p>Brief description: {accom.description}</p>
                <hr/>
              </div>)) : null}                
              {/* {this.state.listOfAccom.map(accom => {
            return (
              <div>
                  <h3>{accom.postname}</h3>
                  <p>City: {accom.city}</p>
                  <p>Size: {accom.size}</p>
                  <p>Price: {accom.price}</p>
                  <p>Brief description: {accom.description}</p>
                <hr/>
              </div>
            )})} */}

        <h1> Hello from {this.props.loggedInUser.username} </h1>
            </div>
            
        )
    }
}

export default ProfilePage