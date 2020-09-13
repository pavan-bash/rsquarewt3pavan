import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeType from "./HomeType";
import HomeValue from "./HomeValue";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route path="/value">
            <HomeValue />
          </Route>
          <Route path="/">
            <HomeType />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
