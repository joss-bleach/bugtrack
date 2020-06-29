import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

// Views
import Landing from "../../views/layout/Landing/Landing";
import Register from "../../views/auth/Register";
import Login from "../../views/auth/Login";

export const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
