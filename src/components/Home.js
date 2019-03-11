import * as React from 'react';
import { Component } from 'react-simplified';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Home extends Component {

  render() {
    return(
      <div className="gradient">
        <Topnav/>
        <div>
          <div id="container">
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.bestilling}>Bestillingsoversikt</button>
            <button type="button" id ="knapp" className="btn btn-primary btn-lg knapp" onClick={this.statusUtstyr}>Status utstyr</button>
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.utstyrReg}>Utstyrsregistrering</button>
          </div>
        </div>
      </div>
    )
  }

  bestilling() {
    history.push("/order/overview");
  }

  statusUtstyr() {
    history.push("/status");
  }
  utstyrReg() {
    history.push("/registrer");
  }
}
