import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();


export class Login extends Component {

  loggedIn = false;
  username = "";
  password = "";
  users = [];
  wrongPass = false;

  render() {
    return(
      <div className="gradient">
        <div className="wrapper fadeInDown">
          <div id="formContent">

            <div className="fadeIn first">
              <img src="../src/logo.png" id="icon" alt="User Icon"/>
              <h3 className="titleFont">TurBiz Portal</h3>
              <h5 className="titleFont">AS Sykkelutleie</h5>
            </div>

            <form onSubmit={event => event.preventDefault()}>
              <input type="text" id="username" className="fadeIn second" name="login" placeholder="Brukernavn" onChange={event => (this.username = event.target.value)}/>
              <input type="password" id="password" className="fadeIn third" name="login" placeholder="Passord" onChange={event => (this.password = event.target.value)} />
              <p style={{display: this.wrongPass ? 'block' : 'none', color: 'red'}}>Feil brukernavn eller passord</p>
              <input type="submit" className="fadeIn fourth" value="Logg inn" onClick={this.validate} />
            </form>
          </div>
        </div>
      </div>
    )
  }

  mounted() {
    // Get list of users
    userService.getUsers(users => {
      this.users = users;
    });
  }

  /**
   * Iterates through list of users to check if input matches any username/password combinations. Stores logged-in
   * account name in localStorage.
   */
  validate() {
    for (let user of this.users) {
      if (this.username === user.brukernavn && this.password === user.passord) {
        this.loggedIn = true;
        this.wrongPass = false;
        localStorage.setItem("account", this.username);
      } else {
        this.wrongPass = true;
      }
    }
    if (this.loggedIn) {
      history.push("/home");
    }
  }
}
