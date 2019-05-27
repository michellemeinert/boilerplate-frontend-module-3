import axios from "axios";

class Project {
  constructor() {
    this.project = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }

  editProject = (data, _id) => {
    return this.project.put(`projects/${_id}/editProject`, data)
    .then(({data}) => data)
  }

  deleteProject = (_id) => {
    return this.project.delete(`/projects/${_id}`)
  }

  addProject = (project) => {
    return this.project.post('/profile/projects/addProject', project)
    .then(({data}) => data)
  }

  getProjectsDashboard = () => {
   return this.project.get('/projects')
   .then(({data}) => data)
  }
  
  getProjectsProfile = () => {
    return this.project.get('/profile/projects')
    .then(({data}) => data)
  }
  
  addContributors = (projectId) => {
    return this.project.put(`/projects/${projectId}/contributors`)
    .then(({data}) => data)
  }
  
}

const project = new Project();

export default project;