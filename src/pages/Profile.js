import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'

class Profile extends Component {
  state = {
    projects: [],
    occupation: "",
    description: "",
    imgUrl: "",
    diasable: true,
    clickedEdit: false
      }
      handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
          [name]: value
        })
      }
    
      handleSubmit = (event) => {
        event.preventDefault();
        const {occupation, description} = this.state;
        profile.editProfile({occupation, description})
        .then((data) => {
          this.setState({
            projects: [...this.state.projects, data],
            clickedEdit: false
          })
        })
        .catch((error) => console.log(error))
      }
    
      fileOnchange = (event) => {
        const file = event.target.files[0];
        const uploadData = new FormData()
        uploadData.append('photo', file)
    
        profile.addImage(uploadData)
        .then((imgUrl) => {
          this.setState({
            imgUrl,
            disable: false,
          })
        })
        .catch((error) => console.log(error))
      }

      clickedEditChange = () => {
        this.setState({
          clickedEdit: true
        })
      }



  render() {
    const { occupation, description, projects, disable, clickedEdit, imgUrl } = this.state
    return (
      <div>
        {clickedEdit ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label name="occupation">occupation</label>
              <input type="text" value={occupation} name="occupation" onChange={this.handleChange}></input>
              <label name="description">Description</label>
              <input type="text" value={description} name="description" onChange={this.handleChange}></input>
              <label>Image</label>
              <input type="file" onChange={this.fileOnchange}></input>
              {disable ? <input type="submit" disabled></input> : <input type="submit"></input>}
            </form>
          </div>
        ) : (
            <div>
              <h1>Welcome {this.props.user.username}</h1>
              <h2>{occupation}</h2>
              <p>{description}</p>
              <img src={imgUrl} alt="lala" />
              {projects && projects.map((project, index) => {
                return (
                  <div key={index}>
                    <h2>{project.projectname}</h2>
                    <p>{project.description}</p>
                  </div>
                )
              })}
            </div>
          )}
        <button onClick={this.clickedEditChange}> Edit</button>
      </div>
    );
  }
}

export default withAuth(Profile);
  
