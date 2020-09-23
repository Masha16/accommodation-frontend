import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
class AccomList extends Component {
  state = { listOfAccom: [] }
 
  getAllAccom = () =>{
    axios.get(`http://localhost:5000/api/accommodation`, {withCredentials:true})
    .then(responseFromApi => {
      this.setState({
        listOfAccom: responseFromApi.data
      })
    })
  }
 
  componentDidMount() {
    this.getAllAccom();
  }

  sortByPriceHL= ()=> {
    const accomCopy = [...this.state.listOfAccom];
    accomCopy.sort((a,b) => b.price-a.price)
    this.setState({listOfAccom: accomCopy})
    }

  
    sortByPriceLH= ()=> {
      const accomCopy = [...this.state.listOfAccom];
      accomCopy.sort((a,b) => a.price-b.price)
      this.setState({listOfAccom: accomCopy})
      }



 
  render(){
    return(
      <div>

        <div className="sorting-buttons">
        <button className="sorting" onClick={this.sortByPriceHL}> Sort by price from high to low </button>
        <button className="sorting" onClick={this.sortByPriceLH}> Sort by price from low to high</button>
        </div>


        <div className="accommodation-post">
          { this.state.listOfAccom.map( accom => {
            return (
              <div key={accom._id}>
                <Link to={`/accommodation/${accom._id}`}>
                  <h3>{accom.postname}</h3>
                </Link>
                <p>City: {accom.city}</p>
                  <p>Size: {accom.size}</p>
                  <p>Price: {accom.price} </p>
                  <p>Brief description: {accom.description}</p>
                <hr/>
              </div>
            )})
          }
        </div>
    
      </div>
    )
  }
}
 
export default AccomList;