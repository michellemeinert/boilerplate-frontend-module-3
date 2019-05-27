import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";


class Home extends Component {
  state = {
    projects: []
  }

  getAllProjects = () => {
    project.getProjectsDashboard()
      .then((data) => {
        this.setState({
          projects: data
        })
      })
      .catch((err) => console.log(err))
  }

  joinProject = (id) => {
    console.log(this.props)
    //this.props.match.params._idProject, this.props.match.params._idUser
    project.addContributors(id)
      .then((data) => {
        
        this.setState({
          projects: data.projects
        })
      })
      .catch((err) => console.log(err))

  }

  componentDidMount() {
    this.getAllProjects()
  }

  render() {
    console.log(this.state)
    // this.getAllProjects()
    const { projects } = this.state
    return (
      <div>
        <div className="projects-container">
          {projects && projects.map((project, index) => {
            return (
              <div key={index} className="projects-container">
                <h2>{project.projectname}</h2>
                <p>{project.owner}</p>
                <p>{project.description}</p>
               
                <button onClick={()=>{this.joinProject(project._id)}}>Join Project</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withAuth(Home)
