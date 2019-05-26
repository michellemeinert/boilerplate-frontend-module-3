import React, { Component } from 'react'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";
import {Link} from 'react-router-dom'

class profileProjects extends Component {
  state = {
    profileProjects: []
  }

  getProfileProjects = () => {
    project.getProjectsProfile()
    .then((data)=>{
      this.setState({
        profileProjects: data.projects
      })
    })
    .catch((err)=> console.log(err))
  }

   componentDidMount(){
     this.getProfileProjects()
   }

  render() {
    console.log(this.state)
   const {profileProjects} = this.state
    return (
      <div>
       <div className="projects-container">
         {profileProjects && profileProjects.map((project, index) => {
                return (
                  <div key={index} className="projects-container">
                    <h2>{project.projectname}</h2>
                    <p>{project.owner}</p>
                    <p>{project.description}</p>
                  </div>
                )
        })}  
       </div>
       <button>
       <Link to="/profile/projects/addProject" className="link">add Project</Link>
       </button>
      </div>
    )
  }
}

export default withAuth(profileProjects)