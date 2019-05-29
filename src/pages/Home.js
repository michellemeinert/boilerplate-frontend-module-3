import React, { Component } from 'react'
//import profile from '../lib/profile-service'
import project from '../lib/project-service'
import OneProject from './OneProject' 
import SearchBar from "./../components/SearchBar";
import { withAuth } from "../lib/AuthProvider";


class Home extends Component {

  state = {
    projects: [],
    startedSearching: false
  }

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

  componentDidMount() {
    this.getAllProjects()
  }

  render() {
    console.log('state in home', this.state)
    console.log('props in home', this.props)
    const { projects } = this.state
    return (
      <div>
      <SearchBar /> 
      {}    
         <div className="projects-container">
          {projects && projects.map((oneProject, index) => {
            return (
                <div>
              <OneProject oneProject={oneProject} getAllProjects={this.getAllProjects}/>
              </div>
            )
          })}
        </div> 
      </div>
    )
  }
}

export default withAuth(Home)
