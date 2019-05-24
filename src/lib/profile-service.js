import axios from "axios";

class Profile {
  constructor() {
    this.profile = axios.create({
      baseURL: "http://localhost:5000/profile",
      withCredentials: true
    });
  }

  editProfile = (data) => {
    return this.profile.put('/edit', data)
    .then((data)=> data)
  }

  addImage = (image) => {
    return this.profile.post('/image', image)
    .then(({data}) => data)
  }

  addProject = (project) => {
    return this.profile.post('/addProject', project)
    .then((data)=> data)
  }

  getProjects = () => {
    return this.profile.get('/')
  }
  
}

const profile = new Profile();

export default profile;