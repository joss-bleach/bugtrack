import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Routes
import Landing from "../layout/Landing";
import Alert from "../layout/Alert";
import Login from "../layout/Login";
import Dashboard from "../dashboard/Dashboard";
import Project from "../project/Project";
import NewProject from "../project/NewProject";

export const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/project/:id" component={Project} />
        <PrivateRoute exact path="/new-project" component={NewProject} />
      </Switch>
    </div>
  );
};

export default Routes;
