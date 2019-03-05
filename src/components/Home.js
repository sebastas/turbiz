import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';
import { Topnav } from './Topnav';
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
      <div>
        <Topnav />
        <h1>Home</h1>
        <button type="button" className="btn btn-outline-primary btn-rounded waves-effect" onClick={this.Status}>Status</button>
      </div>
    )
  }

  Status() {
    history.push("/Status")
  }
    render() {
        return(
            <div className="gradient">
                <Topnav/>
                <div>
                    <div id="container">
                        <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.bestilling}>Bestillingsoversikt</button>
                        <button type="button" id ="knapp" className="btn btn-primary btn-lg knapp" onClick={this.statusUtstyr}>Status utstyr</button>
                        <button type="button" id="knapp" className="btn btn-primary btn-lg knapp">Utstyrsregistrering</button>
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
}
