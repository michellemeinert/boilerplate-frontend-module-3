import React, { Component } from "react";
import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import PreLogin from "./pages/PreLogin";
import SearchBar from "./components/SearchBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
import EditProfile from "./pages/EditProfile";
import profileProjects from "./pages/profileProjects";
import Signup from "./pages/Signup";
import BurgerMenu from "./pages/BurgerMenu";
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
          
          {/* <SearchBar /> */}
          </div>
          <div>
          <Switch>

            <AnonRoute exact path="/" component={PreLogin} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute exact path="/projects" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/profile/projects" component={profileProjects}/>
            <PrivateRoute exact path="/profile/projects/addProject" component={AddProject}/>
            <PrivateRoute path={`/projects/:id/editProject`} component={EditProject}/>
            <PrivateRoute exact path={`/profile/edit`} component={EditProfile}/>
            <PrivateRoute exact path={`/menu`} component={BurgerMenu}/>

          </Switch> 
        </div>
      </AuthProvider>
    );
  }
}

export default App;
