import * as React from 'react';
import { Component } from 'react-simplified';
import { account } from './Login';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Navbar extends Component {

  render() {
    if (account === "admin") {
      return (
        <div id="navbar">
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#/home">TurBiz</a>
            <span className="navbar-text"> Logget inn som: {account} </span>
            <div className="btn-group dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Instillinger
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={this.addUser}>Ny ansatt</a>
                <a className="dropdown-item" onClick={this.changePassword}>Endre passord</a>
                <a className="dropdown-item" onClick={this.logOut}>Logg ut</a>
              </div>
            </div>
          </nav>
        </div>
      )
    } else {
      return(
        <div id="navbar">
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#/home">TurBiz</a>
            <span className="navbar-text"> Logget inn som: {account} </span>
            <div className="btn-group dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Instillinger
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" onClick={this.changePassword}>Endre passord</a>
                <a className="dropdown-item" onClick={this.logOut}>Logg ut</a>
              </div>
            </div>
          </nav>
        </div>
      )
    }
  }
  addUser() {

  }

  changePassword() {

  }

  logOut() {
    history.push("/");
  }
}


