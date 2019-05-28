import React, { Component } from 'react'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";
import {Link} from 'react-router-dom'

class profileProjects extends Component {
  state = {
    profileProjects: [],

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
    console.log('state in profile',this.state)
   const {profileProjects} = this.state
    return (
      <div>
        
       <div className="projects-container">
         {profileProjects && profileProjects.map((project, index) => {
                return (
                  <div key={index} className="projects-container">
                    <h2>{project.projectname}</h2>
                    <p>{project.description}</p>
                    <button>
                      <Link to={`/projects/${project._id}/editProject`} className="link">edit Project</Link>
                    </button>
                  </div>
                )
        })}  
       </div>
      </div>
    )
  }
}

export default withAuth(profileProjects)