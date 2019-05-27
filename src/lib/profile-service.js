import axios from "axios";

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: "http://localhost:5000/profile",
      withCredentials: true
    });
  }
  getProfile = () => {
    return this.profile.get('/')
    .then(({data}) => data)
  }
  editProfile = (data) => {
    return this.profile.put('/edit', data)
    .then(({data}) => data)
  }

  addImage = (image) => {
    return this.profile.post('/image', image)
    .then(({image}) => image)
  }

  addProject = (project) => {
    return this.profile.post('/projects/addProject', project)
    .then(({data}) => data)
  }

  // getProjects = () => {
  //   return this.profile.get('/')
  //   .then(({data}) => data)
  // }
  
}

const profile = new Profile();

export default profile;