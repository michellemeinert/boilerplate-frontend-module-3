import React, { Component } from 'react'
import project from '../lib/project-service'
import { withAuth } from "../lib/AuthProvider";

class OneProject extends Component {
  constructor(props){
    super(props)
    this.state = {
      project: props.oneProject,
      isContributor: false
    }
  }

  joinProject = (id) => {
    console.log('props before joinProject', this.props)
    
         project.addContributors(id)
    
          .then(() => {
            this.setState({
              isContributor: true
            }, () => this.props.getAllProjects())
          })
          .catch((err) => console.log(err))
      }
    
  
  

  removeContributor = (id) => {
    console.log('props before remove ', this.props)
    // if(this.state.project.contributors[0]){
    //   if(this.state.project.contributors[0].username === this.props.user.username) {
        project.removeContributor(id)
        .then(() => {
          this.setState({
            isContributor: false
          }, () => this.props.getAllProjects())
        })
        .catch((err) => console.log(err))
      // } else {
      //   return;
      // }
    //}
  }

     getProject = () => {
     const { id } = this.props.match.params;
     project.getOneProject(id)
     .then((data) => {
       console.log('data in project',  data)
       this.setState({
         project: data
       })
     })
     .catch((err) => console.log(err))
   }

   componentDidUpdate(prevProps){
      if(prevProps !== this.props){
        this.setState({
          project: this.props.oneProject
        })
      }
   }

   componentDidMount() {
 
   if(this.state.project.contributors[0]){
    if(this.state.project.contributors[0].username === this.props.user.username){
      this.setState({ isContributor: true })
     } 
    } 
   }

  render() {
   
    const {project, isContributor} = this.state
    return (
      <div>
         <h2>{project.projectname}</h2>
                <p>owner: {project.owner ? project.owner.username:""}</p>
            
                <p>contributors: 
                  {/* {project.contributors[0] ? project.contributors[0].username : ""} */}
                  {project.contributors.length > 0 ? project.contributors[0].username : ""} 
                </p>
                <p>description: {project.description}</p>

                {  isContributor ? (
                  <button onClick={()=>{this.removeContributor(project._id); console.log(this.state, project._id)}}>Cancel Contribution :-)</button>
                ) : (
                  <button onClick={()=>{this.joinProject(project._id); console.log(this.state, project._id)}}>Join Project</button>
                  
                ) } 
      </div>
    )
  }
}

export default withAuth(OneProject)
