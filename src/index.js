import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { ChangePassword } from './components/ChangePassword';
<<<<<<< HEAD

import { leggTilUtstyr } from './components/leggTilUtstyr';
import { leggTilSykkel } from './components/leggTilSykkel';

=======
>>>>>>> 4afd5c0298d9bf8258a92a266e909179b8a6caaf
import { Status } from './components/Status';
import { SyklerStatus } from './components/Status';
import { TilbehorStatus } from './components/Status';
import { BicycleEdit } from './components/Status';
import { EquipmentEdit } from './components/Status';
<<<<<<< HEAD
import { OrderOverview } from './components/OrderOverview';
import { Ordertime } from './components/leieintervall';
import { OrderDetails } from './components/OrderDetails';
import { Registrer } from './components/EqReg';
import { BicycleReg } from './components/EqReg';
import { EqReg } from './components/EqReg';
import { AddKunde } from './components/Addkunde';
import { VelgUtstyr } from './components/VelgUtstyr';
=======
import {OrderOverview} from "./components/OrderOverview";
import { Ordertime } from "./components/leieintervall";
import {OrderDetails} from "./components/OrderDetails";
import {Registrer} from "./components/EqReg";
import {BicycleReg} from "./components/EqReg";
import {EqReg} from "./components/EqReg";

>>>>>>> 4afd5c0298d9bf8258a92a266e909179b8a6caaf

// import createHashHistory from 'history/createHashHistory';
// const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

ReactDOM.render(
<<<<<<< HEAD
  <HashRouter>
    <div>
      <Route exact path={'/'} component={Login} />
      <Route exact path={'/home'} component={Home} />
      <Route exact path={'/register'} component={Register} />
      <Route exact path={'/account/:user/edit'} component={ChangePassword} />
      <Route exact path={'/status'} component={Status} />
      <Route exact path={'/syklerStatus'} component={SyklerStatus} />
      <Route exact path={'/tilbehorStatus'} component={TilbehorStatus} />
      <Route path={'/syklerStatus/:id/edit'} component={BicycleEdit} />
      <Route path={'/tilbehorStatus/:id/edit'} component={EquipmentEdit} />
      <Route exact path={'/overview'} component={OrderOverview} />
      <Route exact path={'/overview/:id'} component={OrderDetails} />
      <Route exact path={'/otime'} component={Ordertime} />
      <Route exact path={'/registrer'} component={Registrer} />
      <Route exact path={'/bicycleReg'} component={BicycleReg} />
      <Route exact path={'/eqReg'} component={EqReg} />
      <Route extact path={'/velgUtstyr'} component={VelgUtstyr} />
    </div>
  </HashRouter>,
=======
    <HashRouter>
      <div>
        <Route exact path={"/"} component={Login}/>
        <Route exact path={"/home"} component={Home}/>
        <Route exact path={"/register"} component={Register}/>
        <Route exact path={"/account/:user/edit"} component={ChangePassword}/>
        <Route exact path={"/status"} component={Status}/>
        <Route exact path={"/syklerStatus"} component={SyklerStatus}/>
        <Route exact path={"/tilbehorStatus"} component={TilbehorStatus}/>
        <Route path={"/syklerStatus/:id/edit"} component={BicycleEdit}/>
        <Route path={"/tilbehorStatus/:id/edit"} component={EquipmentEdit}/>
        <Route exact path={"/overview"} component={OrderOverview}/>
        <Route exact path={"/overview/:id"} component={OrderDetails}/>
        <Route exact path={"/otime"} component={Ordertime}/>
        <Route exact path={"/registrer"} component={Registrer}/>
        <Route exact path={"/bicycleReg"} component={BicycleReg}/>
        <Route exact path={"/eqReg"} component={EqReg}/>
      </div>
    </HashRouter>,
>>>>>>> 4afd5c0298d9bf8258a92a266e909179b8a6caaf
  document.getElementById('root')
);
