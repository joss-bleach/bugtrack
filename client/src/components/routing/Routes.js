import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Routes
import Landing from "../layout/Landing";
import Alert from "../layout/Alert";
import Login from "../layout/Login";
import Dashboard from "../dashboard/Dashboard";
import Project from "../project/Project";

export const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exaptch path="/project/:id" component={Project} />
      </Switch>
    </div>
  );
};

export default Routes;
