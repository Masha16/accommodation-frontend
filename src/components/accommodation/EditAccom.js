import React, { Component } from 'react';
import axios from 'axios';
import service from '../../api/service';
 
class EditAccom extends Component {
  state = {
    postname: this.props.theAccom.postname, 
    city: this.props.theAccom.city,
    size: this.props.theAccom.size,
    description: this.props.theAccom.description, 
    price: this.props.theAccom.price,
    imageUrl: this.props.theAccom.imageUrl,
    isShowing: false
  }
  
  handleFormSubmit = (event) => {
    const postname = this.state.postname;
    const city = this.state.city;
    const size = this.state.size;
    const description = this.state.description;
    const price = this.state.price;
    const imageUrl = this.state.imageUrl;
 
    event.preventDefault();
 
    axios.put(`http://localhost:5000/api/accommodation/${this.props.theAccom._id}`, { postname, city, size, description, price, imageUrl }, {withCredentials:true})
    .then( () => {
        this.props.getAllAccom();
    
        this.props.history.push('/accommodation');    
    })
    .catch( error => console.log(error) )
  }
 
  toggleForm = () => {
    if(!this.state.isShowing){
        this.setState({isShowing: true});
    } else {
      this.setState({isShowing: false});
    }
}

  handleChangeTitle = (event) => {  
    this.setState({
      postname:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }

  handleChangeCity = (event) => {  
    this.setState({
      city:event.target.value
    })
  }

  handleChangeSize = (event) => {  
    this.setState({
      size:event.target.value
    })
  }

  handleChangePrice = (event) => {  
    this.setState({
      price:event.target.value
    })
  }

  handleChangeImage= e => {
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


  showEditAccomPost = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Edit form</h3>
                  <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="postname" value={this.state.postname} onChange={e => this.handleChangeTitle(e)}/>

          <input type="file" name="imageUrl"  onChange={e => this.handleChangeImage(e)}/>

          <label>City:</label>
          <input type="text" name="city" value={this.state.city} onChange={e => this.handleChangeCity(e)}/>

          <label>Size:</label>
          <input type="text" name="size" value={this.state.size} onChange={e => this.handleChangeSize(e)}/>

          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />

          <label>Price:</label>
          <input type="text" name="price" value={this.state.price} onChange={e => this.handleChangePrice(e)}/>
          
          <input type="submit" value="Submit" />
        </form>
            </div>
          )
    }
  }  



  render(){
    return (
      <div>
        <hr />
        <button className="button-details" onClick={() => this.toggleForm()}> Edit post with this accommodation </button>
        {this.showEditAccomPost()}
          <hr/>
      </div>
    )
  }
}

export default EditAccom