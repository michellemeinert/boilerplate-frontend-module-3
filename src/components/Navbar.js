import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="nav-container">
        <button>
        <Link to="/projects" className="link">connectDev</Link>
        </button>
        {isLoggedin ? (
          <>
            <Link to="/menu" className="link menu">
             <span></span>
              <span></span>
              <span></span>
              
          </Link>
            {/* <button>
            <Link to="/profile" className="link">{user.username}</Link>
            </button>
            <button onClick={logout}>Logout</button> */}
          </>
        ) : (
          <div className="nav-container">
         
            <button>
              <Link to="/login" className="link">Login</Link>
            </button>
            <button>
              <Link to="/signup" className="link">Signup</Link>
            </button>
            </div>
        
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);