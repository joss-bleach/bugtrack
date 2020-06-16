import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Navbar from "./components/layout/Navbar";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";

function App() {
  return (
    <Fragment>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Fragment>
  );
}

export default App;
