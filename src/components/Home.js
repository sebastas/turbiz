import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';

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
      <div>
        <Topnav />

        <div id="container">
        <button type="button" id="knapp" class="btn btn-primary btn-lg" onClick={this.bestilling}>Bestillingsoversikt</button>
        <button type="button" id ="knapp" class="btn btn-primary btn-lg" onClick={this.statusUtstyr}>Status utstyr</button>
        <button type="button" id="knapp" class="btn btn-primary btn-lg">Utstyrsregistrering</button>
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
}
