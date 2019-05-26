import React, { Component } from 'react'
import profile from '../lib/profile-service'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";
import {Link} from 'react-router-dom'

class Home extends Component {
  state = {
    projects: []
  }

  getAllProjects = () => {
    project.getProjectsDashboard()
    .then((data)=>{
      this.setState({
        projects: data
      })
    })
    .catch((err)=> console.log(err))
  }

  // componentDidMount(){
  //   this.getAllProjects()
  //   .then((data)=>{
  //     this.setState({
  //       projects: data 
  //     })
  //   })
  // }

  render() {
    this.getAllProjects()
    const {projects} = this.state
    return (
      <div>
       <h3>welcome home, {this.props.user.username}</h3>
       <div>
        {projects && projects.map((project, index) => {
                return (
                  <div key={index}>
                    <h2>{project.projectname}</h2>
                    <p>{project.owner}</p>
                    <p>{project.description}</p>
                  </div>
                )
        })} 
       </div>
      </div>
    )
  }
}

export default withAuth(Home)
