// seperate page to add projects , will use profile service
import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";
import {Redirect} from 'react-router-dom'


class AddProject extends Component {
  state = {
    owner: "",
    projectname: "",
    description: "",
    contributors: [],
    lookingFor: "",
    redirect: false
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
    const { projectname, description, owner, lookingFor, redirect} = this.state;
    project.addProject({ projectname, description, owner, lookingFor, redirect})
      .then(() => {
        this.setState({
          projectname,
          description,
          lookingFor,
          owner: this.props.user.username,
          redirect: true
        },()=>{this.redirectAfterSumbit()}) 
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
      redirect: false
    })
  }

  redirectAfterSumbit = () => {
   if(this.state.redirect) {
   return this.props.history.push('/profile/projects') 
  }

 }

  render() {
    console.log('state in render', this.state)
    const { projectname, description, lookingFor } = this.state
    return (
      <div>
          <div className="login-container">
            <form onSubmit={
              this.handleSubmit 
              //this.redirectAfterSumbit
              }>
              <div className="input-container">
              <label name="projectname">Projectname</label>
              <input type="text" value={projectname} name="projectname" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label name="description">Description</label>
              <input type="text" value={description} name="description" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label name="lookingFor">lookingFor(oppucation)</label>
              <input type="text" value={lookingFor} name="lookingFor" onChange={this.handleChange}></input>
              </div>
              <input type="submit"/>
            </form>
          </div>    
      </div>
    )
  }
}

export default withAuth(AddProject);