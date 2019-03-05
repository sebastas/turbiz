import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { ChangePassword } from './components/ChangePassword';
import {OrderOverview} from "./components/OrderOverview";
import { Ordertime } from "./components/leieintervall";

// import createHashHistory from 'history/createHashHistory';
// const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path={"/"} component={Login}/>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/register"} component={Register}/>
        <Route exact path={"/account/:user/edit"} component={ChangePassword}/>
        <Route exact path={"/overview"} component={OrderOverview}/>
        <Route exact path={"/otime"} component={Ordertime}/>
      </div>
    </HashRouter>,
  document.getElementById('root')
);
