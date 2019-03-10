import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';
import { Ordertime } from './leieintervall';
import { Status } from './Status';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Home extends Component {

  mounted() {
    if (account === "") {
      history.push("/");
    }
  }

  render() {
    return(
      <div className="gradient">
        <Topnav/>
        <div>
          <div id="container">
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.bestilling}>Bestillingsoversikt</button>
            <button type="button" id ="knapp" className="btn btn-primary btn-lg knapp" onClick={this.statusUtstyr}>Status utstyr</button>
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.utstyrReg}>Utstyrsregistrering</button>
            <button onClick={this.datepick} className="knapp">Date</button>
          </div>
        </div>
      </div>
    )
  }

  bestilling() {
    history.push("/overview");
  }

  statusUtstyr() {
    history.push("/status");
  }
  utstyrReg() {
    history.push("/registrer");
  }
  datepick() {
    history.push("/date");
  }
}
