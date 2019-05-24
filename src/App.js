import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import editProfile from "./pages/editProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />
          </div>
          <div>
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/profile" component={Profile} />
            {/* <PrivateRoute path="/profile/edit" component={editProfile} /> */}

          </Switch> 
        </div>
      </AuthProvider>
    );
  }
}

export default App;
