import * as React from 'react';
import { Component } from 'react-simplified';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

// Top navigationbar with link to Home and also some quick-settings
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
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Innstillinger
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


  changePassword() {
    history.push("/account/"+ localStorage.getItem("account") + "/edit");
  }

  /**
   * Clears the localStorage and redirects to Login to allow another user sign-in
   */
  logOut() {
    localStorage.clear();
    history.push("/");
  }
}
