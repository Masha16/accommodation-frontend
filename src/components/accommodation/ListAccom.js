import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddAccom from './AddAccom'; 
 
class AccomList extends Component {
  state = { listOfAccom: [] }
 
  getAllAccom = () =>{
    axios.get(`http://localhost:5000/api/accommodation`)
    .then(responseFromApi => {
      this.setState({
        listOfAccom: responseFromApi.data
      })
    })
  }
 
  componentDidMount() {
    this.getAllAccom();
  }
 
  render(){
    return(
      <div>
        <div style={{width: '60%', float:"left"}}>
          { this.state.listOfAccom.map( accom => {
            return (
              <div key={accom._id}>
                <Link to={`/accommodation/${accom._id}`}>
                  <h3>{accom.postname}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            )})
          }
        </div>
        <div style={{width: '40%', float:"right"}}>
            <AddAccom getData={() => this.getAllAccom()}/> {/* <== !!! */}
        </div>
      </div>
    )
  }
}
 
export default AccomList;