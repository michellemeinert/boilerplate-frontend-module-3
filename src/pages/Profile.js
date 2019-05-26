import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'
import project from '../lib/project-service'
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
      .then(() => {
        this.setState({
          occupation,
          description,
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
    const {occupation, description, imgUrl} = this.props.user
    this.setState({
      occupation,
      description,
      imgUrl
    })
  }

//  clickedAddProjectChange = () => {
//    this.setState({
//      clickedAddProject: true
//    })
//  }

//  setProjects = () => {
//    console.log('in setProjects')
//    console.log(this.state)
//   //  const {projects} = this.props.user.projects
//    project.getProjectsProfile()
//    .then((data)=>{
//     this.setState({
//       projects: [data.projects]
//     })
//     console.log('new state', data.projects)
//    })
//    .catch((err)=> console.log(err))
//  }

//  componentWillMount() {
//    this.setProjects()
//     .then((data)=>{
//     this.setState({
//       projects: [data.projects]
//     })
//     console.log('new state', data.projects)
//    })
//    .catch((err)=> console.log(err))
//  }

  render() {
    console.log(this.state)
    const { occupation, description, disable, clickedEdit, imgUrl } = this.state
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
             
              <h2>{occupation}</h2>
              <p>{description}</p>
              <img src={imgUrl} alt="lala" />
              {/* {projects && projects.map((project, index) => {
                return (
                  <div key={index}>
                    <h2>{project.projectname}</h2>
                    <p>{project.owner}</p>
                    <p>{project.description}</p>
                  </div>
                )
              })} */}
            </div>
          )}
        <button onClick={this.clickedEditChange}>Edit</button>
        <Link to="/profile/projects" >view projects</Link>
      </div>
    );
  }
}


export default withAuth(Profile);

