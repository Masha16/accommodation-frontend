import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import EditAccom from './EditAccom';
import AddRequest from '../requests/AddRequest'
 
class AccomDetails extends Component {
    state = {}
 
    componentDidMount(){
        this.getOneAccom();
    }
   
    getOneAccom = () => {
        const { params } = this.props.match;
        axios.get(`http://localhost:5000/api/accommodation/${params.id}`, {withCredentials:true})
        .then( responseFromApi =>{
            const Accommodation = responseFromApi.data;
            this.setState(Accommodation);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

    renderEditForm = () => {
      if(!this.state.postname){
        this.getOneAccom();
      } else {
        return <EditAccom theAccom={this.state} getTheAccom={this.getOneAccom} {...this.props} />
        }}

        

        deleteAccom = () => {
          const { params } = this.props.match;
          axios.delete(`http://localhost:5000/api/accommodation/${params.id}`, {withCredentials:true})
          .then( () =>{
              this.props.history.push('/accommodation');         
          })
          .catch((err)=>{
              console.log(err)
          })
        }


        renderAddRequestForm = () => {
          if(!this.state.postname){
              this.getOneAccom();
            } else {     
              return <AddRequest theAccom={this.state} getTheAccom={this.getOneAccom} />
            }
        }


        ownershipCheck = (accommodation) => {
          if(this.props.loggedInUser && accommodation.owner === this.props.loggedInUser._id){
            return (
              <div>
                <div>{this.renderEditForm()} </div>
                <button onClick={() => this.deleteAccom(this.state._id)}>Delete accommodation post</button>
              </div>
            )
          } 
        }


   
        render(){
          return(
            <div>
              <h1>{this.state.postname}</h1>
              <p>{this.state.city} </p>
              <p>{this.state.size} </p>
              <p>{this.state.description}</p>
              { this.state.requests && this.state.requests.map((request, index) => {
            return(
                <div key={ index }>
                
                    <Link to={`/accommodation/${this.state._id}/requests/${request._id}`}> 
                        { request.requestDesc}
                    </Link>
                </div>
            )
            
        }) }    
              <div >
              {this.ownershipCheck(this.state)}
              </div>
              <br/>
             <div>{this.renderAddRequestForm()} </div>
              
              <br/>
              <Link to={'/accommodation'}>Back to accommodation posts</Link>
            </div>
          )
          }
}
 
export default AccomDetails;