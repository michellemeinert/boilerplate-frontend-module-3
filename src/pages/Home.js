import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";


class Home extends Component {
  state = {
    projects: [],
    redirect: false
  }

  getAllProjects = () => {
    project.getProjectsDashboard()
      .then((data) => {
        console.log('data in home',  data)
        this.setState({
          projects: data
        })
      })
      .catch((err) => console.log(err))
  }

  joinProject = (id) => {
    console.log(this.props)
    project.addContributors(id)
      .then((data) => {
        
        this.setState({
          projects: data.projects,
          redirect: true
        },()=>{this.redirectAfterSumbit()})
      })
      .catch((err) => console.log(err))

  }

  componentDidMount() {
    this.getAllProjects()
  }

  redirectAfterSumbit = () => {
    if(this.state.redirect) {
    return this.props.history.push('/projects') 
   }
 
  }

  render() {
    console.log('state in home', this.state)
    console.log('props in home', this.props)
    // this.getAllProjects()
    const {projects } = this.state
    return (
      <div>
        <div className="projects-container">

          {projects.length > 0 && projects.map((project, index) => {
            return (
              <div key={index} className="projects-container">
                <h2>{project.projectname}</h2>
                <p>owner: {project.owner ? project.owner.username:""}</p>
            
                <p>contributors: {project.contributors[0] ? project.contributors[0].username : ""}</p>
                <p>description: {project.description}</p>
               
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
