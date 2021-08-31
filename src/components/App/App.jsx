import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import {PATCHES} from "../../utils";
import Main from "../Main/Main";
import Login from "../Login/Login";
import Info from "../Info/Info";
import Profile from "../Profile/Profile";
import Table from "../Table/Table";
import history from "../../history";

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path={PATCHES.MAIN}>
          <Main/>
        </Route>
        <Route exact path={PATCHES.LOGIN}>
          <Login/>
        </Route>
        <Route exact path={PATCHES.INFO}>
          <Info/>
        </Route>
        <Route exact path={PATCHES.PROFILE}>
          <Profile/>
        </Route>
        <Route exact path={PATCHES.TABLE}>
          <Table/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
