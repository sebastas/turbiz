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
          <div id="confirmationMsg">

          <div id="containerlogo">
          <img src="../src/logo.png" id="icon" alt="User Icon"/>
          </div>

          </div>
          <div id="container">
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.bestilling} >Bestillingsoversikt</button>
            <button type="button" id ="knapp" className="btn btn-primary btn-lg knapp" onClick={this.statusUtstyr}>Status utstyr</button>
            <button type="button" id="knapp" className="btn btn-primary btn-lg knapp" onClick={this.utstyrReg}>Utstyrsregistrering</button>
          <div>
          </div>
          <div id="container2">
          <button type="button" id="knapp1" className="btn btn-primary btn-lg knapp" onClick={this.employees}
          style={{display: localStorage.getItem("account") === "admin" ? "" : "none"}}>Ansattoversikt</button>
          <button type="button" id="knapp1" className="btn btn-primary btn-lg knapp" onClick={this.locations}
            style={{display: localStorage.getItem("account") === "admin" ? "" : "none"}}>Stedsoversikt</button>
          </div>

          </div>
        </div>
      </div>
    )
  }

  mounted() {
    // Remove new order info from localstorage
    localStorage.removeItem("customer");
    localStorage.removeItem("equipment");
    localStorage.removeItem("time");
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
  employees() {
    history.push("/employeesOverview");
  }
  locations() {
    history.push("/locationOverview");
  }
}
