import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import BurgerMenu from '../pages/BurgerMenu'

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
            <Link to="/menu" className="link">xo</Link>
            {/* <button>
            <Link to="/profile" className="link">{user.username}</Link>
            </button>
            <button onClick={logout}>Logout</button> */}
          </>
        ) : (
          <>
            <button>
              <Link to="/login" className="link">Login</Link>
            </button>
            <button>
              <Link to="/signup" className="link">Signup</Link>
            </button>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(Navbar);