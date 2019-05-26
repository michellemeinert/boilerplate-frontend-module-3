import axios from "axios";

class Project {
  constructor() {
    this.project = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  }

  editProject = (data) => {
    return this.project.put('/profile/editProject', data)
    .then(({data}) => data)
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
}

const project = new Project();

export default project;