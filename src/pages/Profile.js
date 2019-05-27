import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'
//import project from '../lib/project-service'
import {Link} from 'react-router-dom'


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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { occupation, description } = this.state;
    
    profile.editProfile({ occupation, description })
      .then((data) => {
        this.setState({
          occupation: data.occupation,
          description: data.description,
          clickedEdit: false
        })
      })
      .catch((error) => console.log(error))
  }

  fileOnchange = (event) => {
    console.log('state in fileOnChange', this.state.imgUrl)
    console.log('in fileOnChange')
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    profile.addImage(uploadData)
      .then((imgUrl) => {
        console.log('state in fileOnChange', this.state.imgUrl)
        this.setState({
          imgUrl,
          disable: false
        })
        console.log('state in fileOnChange', this.state.imgUrl)
      })
      .catch((error) => console.log(error))
  }

  clickedEditChange = () => {
    console.log("hi michelle :Ü")
    this.setState({
      clickedEdit: true
    })
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
    const { occupation, description, disable, clickedEdit, imgUrl } = this.state
    return (
      <div>
        {clickedEdit ? (
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
          </div>
        ) : (
            <div className="profile-container">
             
              <h2>{occupation}</h2>
              <p className="description-container">{description}</p>
              <img src={imgUrl} alt="lala" />
              <button onClick={this.clickedEditChange}>Edit</button>
              <button>
              <Link to="/profile/projects" className="link">view projects</Link>
              </button>
            </div>
          )}
      </div>
    );
  }
}


export default withAuth(Profile);

