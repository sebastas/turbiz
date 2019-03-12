import * as React from 'react';
import { Component } from 'react-simplified';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Topnav extends Component {

  render() {
      return (
        <div id="navbar">
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#/home">TurBiz
              <span className="fa fa-home fa-lg" style={{marginLeft: '7.5px'}}/>
            </a>
            <span className="navbar-text"> Logget inn som: {localStorage.getItem("account")} </span>
            <div className="btn-group dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Instillinger
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={this.addUser}
                   style={{display: localStorage.getItem("account") === "admin" ? "block" : "none"}}>Ny ansatt</a>
                <a className="dropdown-item" onClick={this.employees}
                   style={{display: localStorage.getItem("account") === "admin" ? "block" : "none"}}>Ansattoversikt</a>
                <a className="dropdown-item" onClick={this.addPlace}
                   style={{display: localStorage.getItem("account") === "admin" ? "block" : "none"}}>Nytt sted</a>
                <a className="dropdown-item" onClick={this.changePassword}>Endre passord</a>
                <a className="dropdown-item" onClick={this.logOut}>Logg ut</a>
              </div>
            </div>
          </nav>
        </div>
      )
  }

  addUser() {
    history.push("/register")
  }

  changePassword() {
    history.push("/account/"+ localStorage.getItem("account") + "/edit")
  }

  logOut() {
    localStorage.clear();
    history.push("/");
  }

  addPlace() {
    history.push("/newPlace");
  }

  employees() {
    history.push("/employeesOverview");
  }
}
