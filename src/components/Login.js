import * as React from 'react';
import { Component } from 'react-simplified';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Login extends Component {

  render() {
    return(
      <div>
        <div className="wrapper fadeInDown">
          <div id="formContent">

            <div className="fadeIn first">
              <img src="../src/logo.png" id="icon" alt="User Icon"/>
              <h3>TurBiz Portal</h3>
              <h5>AS Sykkelutleie</h5>
            </div>

            <form>
              <input type="text" id="login" className="fadeIn second" name="login" placeholder="Brukernavn" />
              <input type="password" id="password" className="fadeIn third" name="login" placeholder="Passord" />
              <input type="submit" className="fadeIn fourth" value="Logg inn" onClick={this.validate}/>
            </form>
          </div>
        </div>
      </div>
    )
  }

  validate() {
    history.push("/home");
  }
}