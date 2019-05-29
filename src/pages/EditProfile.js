import React, { Component } from 'react'
import profile from '../lib/profile-service'
import { withAuth } from "../lib/AuthProvider";

class EditProfile extends Component {
  state = {
    projects: [],
    occupation: "",
    description: "",
    imgUrl: "",
    disable: true,
    clickedEdit: false,
    //clickedAddProject: false
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    console.log('in handleSubmit')
    event.preventDefault();
    const { occupation, description, imgUrl } = this.state;
    
    profile.editProfile({ occupation, description, imgUrl })
      .then((data) => {
        this.setState({
          occupation: data.occupation,
          description: data.description,
          clickedEdit: false
        },()=> {this.redirect()})
      })
      .catch((error) => console.log(error))
  }

  fileOnchange = (event) => {
    console.log('state in fileOnChange', this.state.imgUrl)
    console.log('in fileOnChange')
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    profile.addImage(uploadData)
      .then((imgUrl) => {
        console.log('api response', imgUrl)
        console.log('state in fileOnChange', this.state.imgUrl)
        this.setState({
          imgUrl,
          disable: false
        })
        console.log('state in fileOnChange', this.state.imgUrl)
      })
      .catch((error) => console.log(error))
  }

  redirect = () => {
    console.log('in redirect')
    return (this.props.history.push('/profile'))
  }
  render() {
    const { occupation, description, disable } = this.state
    return (
      
      <div className="profile-container">
            <form onSubmit={this.handleSubmit}>
            <div className="input-container">
              <label name="occupation">occupation</label>
              <input type="text" value={occupation} name="occupation" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label name="description">Description</label>
              <input type="text" value={description} name="description" onChange={this.handleChange}></input>
              </div>
              <div className="input-container">
              <label>Image</label>
              <input type="file" onChange={this.fileOnchange}></input>
              </div>
              {disable ? <input type="submit" disabled></input> : <input type="submit"></input>}

            </form>
            <button onClick={this.redirect}>Cancel</button>
          </div>
      
    )
  }
}

export default withAuth(EditProfile)
