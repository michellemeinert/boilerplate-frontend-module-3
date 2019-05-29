import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'

class StrangersProfile extends Component {
  state = {
    occupation: "",
    description: "",
    imgUrl: ""
  }

  getStrangersProfile = () => {
    console.log('props in getprofile', this.props)
    const { id } = this.props.match.params;
    
    profile.getStrangersProfile(id)
    .then((data)=> {
      console.log('data in get profile', data)
      const { occupation, description, imgUrl } = data;
      this.setState({
        occupation,
        description,
        imgUrl
      })
      console.log(this.state)
    })
    .catch((err)=> console.log(err))
  }

  componentDidMount() {
    console.log('inside componentDidMount')
   this.getStrangersProfile()
   console.log(this.state)
     
  }

  render() {
    console.log(this.state)
    const { occupation, description, imgUrl } = this.state
    return (
      <div className="profile-container">
            <div >            
              <h2>{occupation}</h2>
              <img src={imgUrl} alt="lala" className="profile-pic"/>
              <p className="description-container">{description}</p>
            </div>
         
      </div> 
    );
  }
}


export default withAuth(StrangersProfile);
