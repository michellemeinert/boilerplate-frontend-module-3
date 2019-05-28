import React, { Component } from 'react'
import { withAuth } from "../lib/AuthProvider";
import {Link} from 'react-router-dom'

class BurgerMenu extends Component {


  render() {
    const {logout} = this.props;
    return (
      <div>
       
          <div className="login-container">
          <button onClick={()=> this.props.history.push('/projects')}>X</button>
          <Link to="/profile" className="link">view profile</Link>
          <Link to="/profile/edit" className="link">edit profile</Link>
          <Link to="/profile/projects" className="link">view your projects</Link>
          <Link to="/profile/projects/addProject" className="link">add project</Link>
          <button onClick={logout}>logout</button>
          </div>

        
      </div>
    )
  }
}

export default withAuth(BurgerMenu)
