import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Routes
import Landing from "../layout/Landing";
import Alert from "../layout/Alert";
import Login from "../layout/Login";
import Dashboard from "../dashboard/Dashboard";

export const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Routes;
