import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import OneProject from './OneProject' 
import { withAuth } from "../lib/AuthProvider";


class Home extends Component {

  state = {
    projects: [],
    //isContributor: false

  }

  // checkIfContributor = (id) => {
  //     if (this.state.project.contributors[0].username === this.props.user.username || this.state.project.owner.username === this.props.user.username) {
  //       return true
  //     } else {
  //       return false       
  //     }
  //   }
  


  getAllProjects = (props) => {
    project.getProjectsDashboard()
      .then((data) => {
        console.log('data in home', data)
        this.setState({
          projects: data
        })
      })
      .catch((err) => console.log(err))
  }

  // joinProject = (id) => {
  //   console.log(this.props)
  //   if (this.checkIfContributor(this.props.user._id)) {

  //     project.addContributors(id)

  //       .then(() => {
  //         this.setState({
  //           isContributor: true
  //         })
  //         this.getAllProjects()

  //       })
  //       .catch((err) => console.log(err))
  //   }

  // }



  // removeContributor = (id) => {
  //   if (!this.checkIfContributor(this.props.user._id)) {
  //     project.removeContributor(id)
  //       .then(() => {
  //         this.setState({
  //           isContributor: false
  //         })
  //         this.getAllProjects()
  //       })
  //       .catch((err) => console.log(err))
  //   }

  // }



  componentDidMount() {
    this.getAllProjects()
  }

  render() {
    console.log('state in home', this.state)
    console.log('props in home', this.props)
    // this.getAllProjects()
    const { projects } = this.state
    return (
      <div>
     

         <div className="projects-container">

          {projects && projects.map((oneProject, index) => {
            return (
                <div>

              <OneProject oneProject={oneProject} getAllProjects={this.getAllProjects}/>
              {/* <div key={index} className="projects-container">
                <h2>{project.projectname}</h2>
                <p>owner: {project.owner ? project.owner.username : ""}</p>

                <p>contributors: {project.contributors[0] ? project.contributors[0].username : ""}</p>
                <p>description: {project.description}</p>

                {isContributor ? (
                  <button onClick={() => { this.removeContributor(project._id); console.log(this.state, project._id) }}>Cancel Contribution :-)</button>
                ) : (
                    <button onClick={() => { this.joinProject(project._id); console.log(this.state, project._id) }}>Join Project</button>

                  )} */}
              </div>
            )
          })}
        </div> 
      </div>
    )
  }
}

export default withAuth(Home)
