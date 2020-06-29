import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

// Views
import Landing from "../../views/layout/Landing/Landing";
import Register from "../../views/auth/Register";
import Login from "../../views/auth/Login";
import Alert from "../../components/Alert/Alert";

export const Routes = () => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
