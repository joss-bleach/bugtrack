import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Landing from "../layout/Landing";
import Alert from "../layout/Alert";
import Login from "../layout/Login";

export const Routes = () => {
  return (
    <div className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default Routes;
