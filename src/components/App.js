import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import MainContainer from "../containers/MainContainer";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/home">
          <MainContainer />
        </Route>
      </Switch>
    </>
  );
};

export default App;
