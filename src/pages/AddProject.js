// seperate page to add projects , will use profile service
import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";
//import {Link} from 'react-router-dom'


class AddProject extends Component {
  state = {
    owner: "",
    projectname: "",
    description: "",
    contributors: [],
    lookingFor: ""
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    console.log('in handleSubmit')
    event.preventDefault();
    const { projectname, description, owner, lookingFor} = this.state;
    project.addProject({ projectname, description, owner, lookingFor })
      .then(() => {
        this.setState({
          projectname,
          description,
          lookingFor,
          owner: this.props.user.username
        }) 
      })
      .catch((error) => console.log(error))
  }

  componentDidMount() {
    console.log('state in didMount', this.state)
    const { projectname, description, lookingFor } = this.state
    this.setState({
      projectname,
      description,
      lookingFor,
      owner: this.props.user.username,
    })
  }



  render() {
    console.log('state in render', this.state)
    const { projectname, description, lookingFor } = this.state
    return (
      <div>
          <div>
            <form onSubmit={
              this.handleSubmit
              }>
              <label name="projectname">Projectname</label>
              <input type="text" value={projectname} name="projectname" onChange={this.handleChange}></input>
              <label name="description">Description</label>
              <input type="text" value={description} name="description" onChange={this.handleChange}></input>
              <label name="lookingFor">lookingFor(oppucation)</label>
              <input type="text" value={lookingFor} name="lookingFor" onChange={this.handleChange}></input>
              <input type="submit"/>
            </form>
          </div>    
      </div>
    )
  }
}

export default withAuth(AddProject);