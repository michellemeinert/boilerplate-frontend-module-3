import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import profile from '../lib/profile-service'

class SearchBar extends Component {
  state = {
    query: '',
    data: [],
    filteredData: []
  }

  // handleInputChange = event => {
  //   const query = event.target.value;

  //   this.setState(prevState => {
  //     const filteredData = prevState.data.filter(element => {
  //       return element.username.toLowerCase().includes(query.toLowerCase());
  //     });

  //     return {
  //       query,
  //       filteredData
  //     };
  //   });
  // };

  // getData = () => {
  //   profile.getProfile()
  //   .then((data) => {
  //     const { query } = this.state;
  //       const filteredData = data.filter(element => {
  //         return element.username.toLowerCase().includes(query.toLowerCase());
  //       });

  //       this.setState({
  //         data,
  //         filteredData
  //       });
  //     })
  //   .catch((err) => console.log(err))
  // }



// componentWillMount() {
//     this.getData();
// }

  render() {
    return (
      <div className="searchForm">
        <form>
          <input
            placeholder="Search for..."
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        <div>{this.state.filteredData.map(i => <p>{i.username}</p>)}</div>
      </div>
    )
  }
}

export default withAuth(SearchBar)
