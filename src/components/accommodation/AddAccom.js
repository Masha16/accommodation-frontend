 import React, { Component } from 'react';
import axios from 'axios';
import service from '../../api/service';
 
class AddAccom extends Component {
  state = { postname: "", city: "", size: "", description: "", price: "", imageUrl: "" }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const postname = this.state.postname;
    const city = this.state.city;
    const size = this.state.size;
    const description = this.state.description;
    const price = this.state.price;
    const imageUrl = this.state.imageUrl;
    axios.post("http://localhost:5000/api/accommodationcreate", { postname, city, size, description, price, imageUrl }, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        this.setState({postname: "", city: "", size: "", description: "", price: "", imageUrl: "", isUrl: false });
    })
    .catch( error => console.log(error) )
  }
 
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url, isUrl: true });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
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
          <input type="file" name="imageUrl" onChange={(e) => this.handleFileUpload(e)} /> <br/>
          {this.state.isUrl ? <button type="submit">Submit</button> : <button disabled type="submit">Submit</button> }
        </form>
      </div>
    )
  }
}
 
export default AddAccom;