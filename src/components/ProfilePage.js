import React, { Component } from 'react';
import axios from 'axios';
import ListAccom from './accommodation/ListAccom'

class ProfilePage extends Component {
    state = {}

        getOwnPost = (accommodation) => {
            if(this.props.loggedInUser && accommodation.owner === this.props.loggedInUser._id) {
                return (
                    <div>
                        {this.state.postname && this.props.loggedInUser}
                    </div>
                )
            }


    }


    render() {
        return (
            {this.getOwnPost}
        )
    }
}

export default ProfilePage