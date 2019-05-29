import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'


class Profile extends Component {
  state = {
    projects: [],
    occupation: "",
    description: "",
    imgUrl: "",
    disable: true,
    clickedEdit: false,
    //clickedAddProject: false
  }

  componentDidMount() {

    profile.getProfile()
    .then((data)=>{
      console.log(data)
      const { occupation, description, imgUrl } = data;
      this.setState({
        occupation,
        description,
        imgUrl
      })
    })
     
  }



  render() {
    console.log(this.state)
    const { occupation, description, imgUrl } = this.state
    return (
      <div className="profile-container">
        {/* {clickedEdit ? (
          <div className="profile-container">
            <form onSubmit={this.handleSubmit}>
            <div className="input-container">
              <label name="occupation">occupation</label>
              <input type="text" value={occupation} name="occupation" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label name="description">Description</label>
              <input type="text" value={description} name="description" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label>Image</label>
              <input type="file" onChange={this.fileOnchange}></input>
              </div>
              {disable ? <input type="submit" disabled></input> : <input type="submit"></input>}

            </form>
            <button onClick={this.cancelEdit}>Cancel</button>
          </div>
        ) : ( */}
            <div >
             
              <h2>{occupation}</h2>
              <img src={imgUrl} alt="lala" className="profile-pic"/>
              <p className="description-container">{description}</p>
            </div>
         
      </div> 
    );
  }
}


export default withAuth(Profile);

