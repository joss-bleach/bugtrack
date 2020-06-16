import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Landing from "../layout/Landing";

export const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Landing} />
      </Switch>
    </div>
  );
};

export default Routes;
