import * as React from 'react';
import { Component } from 'react-simplified';
import { userService} from '../services/user-service';
import { Topnav } from './Topnav';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export class Register extends Component {

  name = "";
  email = "";
  number = "";
  username = "";
  password = "";
  userExists = false;
  users = [];
  isComplete = true;

  render() {

    return(
      <div>
        <Topnav/>
        <div className="container">
          <div className="row main">
            <div className="main-login main-center">
              <form className="form-horizontal">

                <div className="form-group">
                  <label htmlFor="name" className="cols-sm-2 control-label">Fullt navn</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"/></span>
                      <input type="text" className="form-control" name="name" id="name" placeholder="Fullt navn" required={true}
                             onChange={event => (this.name = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="cols-sm-2 control-label">Epost</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-envelope fa" aria-hidden="true"/></span>
                      <input type="text" className="form-control" name="email" id="email" placeholder="Epost" required={true}
                             onChange={event => (this.email = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="cols-sm-2 control-label">Telefon</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-phone fa-lg" aria-hidden="true"/></span>
                      <input type="text" className="form-control" name="phone" id="phone"
                             placeholder="Telefonnummer" required={true} onChange={event => (this.number = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username" className="cols-sm-2 control-label">Brukernavn</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-users fa" aria-hidden="true"/></span>
                      <input type="text" className="form-control" name="username" id="username"
                             placeholder="Brukernavn" required={true} onChange={event => (this.validateUser(event))}/>
                    </div>
                  </div>
                </div>
                <p style={{display: this.userExists ? 'block' : 'none', color: 'red'}}>Brukernavnet finnes fra før</p>

                <div className="form-group">
                  <label htmlFor="password" className="cols-sm-2 control-label">Passord</label>
                  <div className="cols-sm-10">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"/></span>
                      <input type="password" className="form-control" name="password" id="password"
                             placeholder="Passord" required={true} onChange={event => (this.password = event.target.value)}/>
                    </div>
                  </div>
                </div>

                <p style={{display: this.isComplete ? 'none' : 'block', color: 'red'}}>Vennligst fyll inn all info</p>
                <div className="form-group ">
                  <button type="button" className="btn btn-primary btn-lg btn-block login-button" id="createUser" onClick={this.create}>Opprett bruker</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  mounted() {
    userService.getUsers(users => {
      this.users = users;
    });
  }

  validateUser(event) {
    this.username = event.target.value;
    for (let user of this.users) {
      if (user.brukernavn === this.username) {
        this.userExists = true;
        return;
      } else {
        this.userExists = false;
      }
    }
  }

  create() {
    this.isComplete = this.name.length > 0 && this.email.length > 0 && this.number.length === 8 &&
      this.username.length > 0 && this.password.length > 4;

    if (this.isComplete && !this.userExists) {
      userService.addUser(this.name, this.email, this.number, this.username, this.password, () => {
        history.push("/home");
      });
    }
  }
}