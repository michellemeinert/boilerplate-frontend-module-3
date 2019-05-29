import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom"
import profile from '../lib/profile-service'

class SearchBar extends Component {
  state = {
    query: '',
    data: [],
    filteredData: [],
    startedSearching: false
  }

  handleInputChange = event => {
    const query = event.target.value;

    this.setState(prevState => {
      const filteredData = prevState.data.filter(element => {
        return element.username.toLowerCase().includes(query.toLowerCase());
      });
      return {
        query,
        filteredData,
        startedSearching: true
      };
    });
  };

  getData = () => {
    profile.getAllUsers()
      .then((data) => {
        console.log('data in getAllUSers', data)
        const { query } = this.state;
        const filteredData = data.filter(element => {
          return element.username.toLowerCase().includes(query.toLowerCase());
        });

        this.setState({
          data,
          filteredData
        });
      })
      .catch((err) => console.log(err))
  }

  getStrangersProfile = () => {
    console.log('props in stranger', this.props)
    const {id} = this.state.data._id
    this.props.history.push(`/profile/${id}`)
  }

  componentWillMount() {
    this.getData();
  }

  render() {

    return (
      <div className="search-container">
        
        <form>
          <input
            placeholder="search for someone"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
        { this.state.query.length !== 0 ?  (<div className="search-results">{this.state.filteredData.map(i => <Link to={`/profile/${i._id}`}>{i.username}</Link>)}</div>): null}
      </div>
    )
  }
}

export default withAuth(SearchBar)
