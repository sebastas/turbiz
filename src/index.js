import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { account, Login } from './components/Login';
import { Home } from './components/Home';
import { Register } from './components/Register';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student



ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path={"/"} component={Login}/>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/register"} component={Register}/>
      </div>
    </HashRouter>,
  document.getElementById('root')
);
