import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import profileProjects from "./pages/profileProjects";
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
            <PrivateRoute exact path="/projects" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/projects" component={profileProjects}/>
            <PrivateRoute exact path="/profile/projects/addProject" component={AddProject}/>
            <PrivateRoute path={`/projects/:id/editProject`} component={EditProject}/>

          </Switch> 
        </div>
      </AuthProvider>
    );
  }
}

export default App;
