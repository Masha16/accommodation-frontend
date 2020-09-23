 import React, { Component } from 'react';
import axios from 'axios';
 
class AddAccom extends Component {
  state = { postname: "", city: "", size: "", description: "", price: "" }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const postname = this.state.postname;
    const city = this.state.city;
    const size = this.state.size;
    const description = this.state.description;
    const price = this.state.price;
    axios.post("http://localhost:5000/api/accommodationcreate", { postname, city, size, description, price }, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        this.setState({postname: "", city: "", size: "", description: "", price: ""});
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }
 
  render(){
    return(
      <div className="form-container">
        <form onSubmit={this.handleFormSubmit}>
          
          <input type="text" name="postname" placeholder="Name of the post" value={this.state.postname} onChange={ e => this.handleChange(e)}/><br/>
          <input type="text" name="city" placeholder="City" value={this.state.city} onChange={ e => this.handleChange(e)}/><br/>
          <input type="text" name="size" placeholder="Size" value={this.state.size} onChange={ e => this.handleChange(e)}/><br/>
          <textarea name="description" placeholder="Description" value={this.state.description} onChange={ e => this.handleChange(e)} /><br/>
          <input type="text" name="price" placeholder="Price" value={this.state.price} onChange={ e => this.handleChange(e)}/><br/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
 
export default AddAccom;