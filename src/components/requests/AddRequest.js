import React, { Component } from 'react';
import axios from 'axios';
 
class AddRequest extends Component {
  state = { requestDesc: "", isShowing: false } // `isShowing` will help us to toggle add task form
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const requestDesc = this.state.requestDesc;
    const accomID = this.props.theAccom._id; // <== we need to know to which project the created task belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing project 
                                                // by its id in the task model on the server side ( project: {type: Schema.Types.ObjectId, ref: 'Project'})
    
    // { title, description, projectID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post("http://localhost:5000/api/requests", {requestDesc, accomID })
    .then( () => {
          // after submitting the form, retrieve project one more time so the new task is displayed as well 
          //              |
        this.props.getTheAccom();
        this.setState({requestDesc: ""});
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }
 
  showAddRequestForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Add Request</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Write your request here:</label>
                  <textarea name="requestDesc" value={this.state.requestDesc} onChange={ e => this.handleChange(e)} />
                  
                  <input type="submit" value="Submit" />
                  </form>
            </div>
          )
    }
  }
 
  render(){
    return(
      <div>
            <hr/>
            <button onClick={() => this.toggleForm()}> Add request for this accommodation </button>
            { this.showAddRequestForm() }
      </div>
    )
  }
}
 
export default AddRequest;