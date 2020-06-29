import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router";

import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

// Views
import Routes from "./components/Routing/Routes";
import Navigation from "./views/navigation/Navigation";
import PageFooter from "./views/layout/PageFooter";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Navigation />
    <Switch>
      <Route component={Routes} />
    </Switch>
    <PageFooter />
  </Router>,
  document.getElementById("root")
);
