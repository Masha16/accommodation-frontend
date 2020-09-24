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
            <div className="accommodation-post">
                
                {this.state.listOfAccom ? this.state.listOfAccom.map((accom, index) => ( <div key={index}>
                <br/>
                <hr />
                  <h3>{accom.postname}</h3>
                  <img src={accom.imageUrl} alt="/" className="image-list"/>
                  <p> <span>{accom.city}</span> 
                   <span>{accom.size} sq.m.</span>
                   <span>{accom.price} Euro</span></p>
                    <br />
                  <p>{accom.description}</p>
                  <br/>
                  
              </div>)) : null}  
                           
            </div>
            
        )
    }
}

export default ProfilePage