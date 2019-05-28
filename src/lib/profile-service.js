import axios from "axios";

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }
  getProfile = () => {
    return this.profile.get('/profile')
    .then(({data}) => data)
  }
  editProfile = (data) => {
    return this.profile.put('/profile/edit', data)
    .then(({data}) => data)
  }

  addImage = (image) => {
    return this.profile.post('/profile/image', image)
    .then(({image}) => image)
  }

  addProject = (project) => {
    return this.profile.post('/profile/projects/addProject', project)
    .then(({data}) => data)
  }

  // getProjects = () => {
  //   return this.profile.get('/')
  //   .then(({data}) => data)
  // }
  
}

const profile = new Profile();

export default profile;