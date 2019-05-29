import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'
//import SearchBar from '../components/SearchBar'

class SearchResults extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props,
      filteredData: this.props,
      oneProfile: null
    }
  }

  getStrangersProfile = () => {
    const { id } = this.props.match.params;
    profile.getStrangersProfile(id)
    .then((data)=> {
      this.setState({
        oneProfile: data
      })
    })
    .catch((err)=> console.log(err))
  }

  // getData = () => {
  //   profile.getAllUsers()
  //     .then((data) => {
  //       console.log('data in getAllUSers', data)
  //       const { query } = this.state;
  //       const filteredData = data.filter(element => {
  //         return element.username.toLowerCase().includes(query.toLowerCase());
  //       });

  //       this.setState({
  //         data,
  //         filteredData
  //       });
  //     })
  //     .catch((err) => console.log(err))
  // }



  // componentWillMount() {
  //   this.getData();
  // }

  
  render() {
    return (
      <div>
      
      <div>{this.state.filteredData.map(i => <button onClick={this.getStrangersProfile}>{i.username}</button>)}</div>
      </div>
    )
  }
}

export default withAuth(SearchResults )


