import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

function AnonRoute({ component: Component, isLoggedin, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if(!isLoggedin){
          return <Component {...props} />
        } else {
          return <Redirect to="/profile" />
        }
      }     
      }
    />
  );
}

export default withAuth(AnonRoute);
