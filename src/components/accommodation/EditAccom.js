import React, { Component } from 'react';
import axios from 'axios';
 
class EditAccom extends Component {
  state = {
    postname: this.props.theAccom.postname, 
    city: this.props.theAccom.city,
    size: this.props.theAccom.size,
    description: this.props.theAccom.description, 
    price: this.props.theAccom.price,
    isShowing: false
  }
  
  handleFormSubmit = (event) => {
    const postname = this.state.postname;
    const city = this.state.city;
    const size = this.state.size;
    const description = this.state.description;
    const price = this.state.price
 
    event.preventDefault();
 
    axios.put(`http://localhost:5000/api/accommodation/${this.props.theAccom._id}`, { postname, city, size, description, price }, {withCredentials:true})
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

  showEditAccomPost = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Edit form</h3>
                  <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="postname" value={this.state.postname} onChange={e => this.handleChangeTitle(e)}/>

          <label>City:</label>
          <input type="text" name="city" value={this.state.city} onChange={e => this.handleChangeCity(e)}/>

          <label>Size:</label>
          <input type="text" name="size" value={this.state.size} onChange={e => this.handleChangeSize(e)}/>

          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />

          <label>Price:</label>
          <input type="text" name="price" value={this.state.size} onChange={e => this.handleChangePrice(e)}/>
          
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
        <button onClick={() => this.toggleForm()}> Edit post with this accommodation </button>
        {this.showEditAccomPost()}
          <hr/>
      </div>
    )
  }
}

export default EditAccom